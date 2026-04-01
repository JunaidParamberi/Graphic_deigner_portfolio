
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CustomCursor } from './components/Layout/CustomCursor';
import { Navigation } from './components/Layout/Navigation';
import { Hero } from './components/Sections/Hero';
import { Journey } from './components/Sections/Journey';
import { Clients } from './components/Sections/Clients';
import { Works } from './components/Sections/Works';
import { Contact } from './components/Sections/Contact';
import { ProjectModal } from './components/UI/ProjectModal';
import { Preloader } from './components/UI/Preloader';
import { ScrollProgress } from './components/UI/ScrollProgress';
import { ParticleBackground } from './components/UI/ParticleBackground';
import { AllWorks } from './components/Pages/AllWorks';
import { Project, Experience, Client, Overview } from './types';
import { db, fetchCollection, fetchDocument } from './firebase';
import { SITE_URL } from './constants';
import { Analytics } from '@vercel/analytics/react';

function absoluteImageUrl(url: string): string {
  if (!url) return `${SITE_URL}/assets/images/cover.png`;
  if (/^https?:\/\//i.test(url)) return url;
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${SITE_URL}${path}`;
}

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [view, setView] = useState<'home' | 'all-works'>('home');
  const [isLoading, setIsLoading] = useState(true);

  // State for dynamic data
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [overview, setOverview] = useState<Overview | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const returnUrlRef = useRef<{ search: string; hash: string } | null>(null);

  // Fetch data from Firebase
  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsData, experiencesData, clientsData, profileData, skillsData] = await Promise.all([
          fetchCollection('projects'),
          fetchCollection('experience'),
          fetchCollection('clients'),
          fetchDocument('settings', 'profile'), 
          fetchDocument('settings', 'skills')
        ]);

        setProjects(projectsData as Project[]);
        setExperiences(experiencesData as Experience[]);
        setClients(clientsData as Client[]);
        setOverview(profileData as Overview);
        setSkills((skillsData as any)?.list || []);
        
        setTimeout(() => setIsLoading(false), 1000);
      } catch (error) {
        console.error("Error fetching Firebase data:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Sync URL (hash or path /project/:id) to state
  useEffect(() => {
    const syncFromUrl = () => {
      const hash = window.location.hash;
      const pathMatch = window.location.pathname.match(/^\/project\/([^/]+)\/?$/);

      if (hash === '#all-works') {
        setView('all-works');
        setSelectedProject(null);
        return;
      }
      if (pathMatch) {
        const projectId = pathMatch[1];
        const project = projects.find(p => String(p.id) === projectId);
        if (project) {
          setSelectedProject(project);
          setView('home');
        }
        return;
      }
      if (hash.startsWith('#project-')) {
        const projectId = hash.replace('#project-', '');
        const project = projects.find(p => String(p.id) === projectId);
        if (project) {
          setSelectedProject(project);
        }
        setView('home');
        return;
      }
      setView('home');
      setSelectedProject(null);
    };

    if (projects.length > 0) {
      syncFromUrl();
    }
    window.addEventListener('hashchange', syncFromUrl);
    window.addEventListener('popstate', syncFromUrl);
    return () => {
      window.removeEventListener('hashchange', syncFromUrl);
      window.removeEventListener('popstate', syncFromUrl);
    };
  }, [projects]);

  const handleSelectProject = (project: Project) => {
    returnUrlRef.current = { search: window.location.search, hash: window.location.hash };
    setSelectedProject(project);
    const id = String(project.id);
    window.history.pushState({}, '', `/project/${id}`);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    if (view === 'all-works' && returnUrlRef.current) {
      const { search, hash } = returnUrlRef.current;
      const path = '/' + search + (hash || '#all-works');
      window.history.replaceState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      returnUrlRef.current = null;
    } else if (view === 'all-works') {
      window.history.replaceState({}, '', '/#all-works');
      window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
      window.history.replaceState({}, '', '/');
    }
  };

  const handleBackToHome = () => {
    window.history.replaceState({}, '', '/');
    setView('home');
  };

  return (
    <div className="bg-midnight min-h-screen text-white selection:bg-electric selection:text-black">
      <Analytics debug={false} />
      <CustomCursor />
      <ParticleBackground />
      
      <Helmet>
        {selectedProject ? (
          <>
            <title>{selectedProject.title} | Junaid Paramberi</title>
            <meta name="description" content={selectedProject.description} />
            <link rel="canonical" href={`${SITE_URL}/project/${selectedProject.id}`} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={`${SITE_URL}/project/${selectedProject.id}`} />
            <meta property="og:title" content={`${selectedProject.title} | Junaid Paramberi`} />
            <meta property="og:description" content={selectedProject.description} />
            <meta property="og:image" content={absoluteImageUrl(selectedProject.image)} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="Junaid Paramberi" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={`${SITE_URL}/project/${selectedProject.id}`} />
            <meta name="twitter:title" content={`${selectedProject.title} | Junaid Paramberi`} />
            <meta name="twitter:description" content={selectedProject.description} />
            <meta name="twitter:image" content={absoluteImageUrl(selectedProject.image)} />
            <meta name="twitter:image:alt" content={selectedProject.title} />
          </>
        ) : (
          <>
            <title>Junaid Paramberi | Creative Technologist & Visual Storyteller</title>
            <meta name="description" content="Bridging the gap between raw data and luxury visual storytelling through graphic design, motion, and code." />
            <link rel="canonical" href={`${SITE_URL}/`} />
          </>
        )}
      </Helmet>

      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => {}} />}
      </AnimatePresence>

      {!isLoading && (
        <>
            <Navigation />
            <ScrollProgress />
            
            <main className="relative z-10">
                {view === 'home' ? (
                    <>
                        <div id="about">
                            <Hero />
                        </div>
                        <Journey 
                          experiences={experiences} 
                          skills={skills} 
                          overview={overview} 
                        />
                        <Works projects={projects} onSelectProject={handleSelectProject} />
                        <Clients clients={clients} />
                        <Contact />
                    </>
                ) : (
                    <AllWorks 
                        projects={projects}
                        onSelectProject={handleSelectProject} 
                        onBack={handleBackToHome}
                    />
                )}
            </main>

            <ProjectModal 
                project={selectedProject} 
                onClose={handleCloseProject} 
            />
        </>
      )}
    </div>
  );
}

export default App;
