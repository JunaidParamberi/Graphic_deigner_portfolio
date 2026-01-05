
import React, { useState, useEffect } from 'react';
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

import { AllWorks } from './components/Pages/AllWorks';
import { Project, Experience, Client, Overview } from './types';
import { db, fetchCollection, fetchDocument } from './firebase';

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

  // Fetch data from Firebase
  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsData, experiencesData, clientsData, profileData, skillsData] = await Promise.all([
          fetchCollection('projects'),
          fetchCollection('experience'),
          fetchCollection('clients'),
          fetchDocument('settings', 'profile'), // Points to settings > profile as requested
          fetchDocument('settings', 'skills')
        ]);

        setProjects(projectsData as Project[]);
        setExperiences(experiencesData as Experience[]);
        setClients(clientsData as Client[]);
        setOverview(profileData as Overview);
        setSkills((skillsData as any)?.list || []);
        
        // Brief delay to ensure preloader feels smooth
        setTimeout(() => setIsLoading(false), 1000);
      } catch (error) {
        console.error("Error fetching Firebase data:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle URL Hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      if (hash === '#all-works') {
          setView('all-works');
          setSelectedProject(null);
      } else if (hash.startsWith('#project-')) {
        const projectId = hash.replace('#project-', '');
        const project = projects.find(p => p.id === projectId);
        if (project) {
          setSelectedProject(project);
        }
      } else {
         setView('home');
         if (!hash.includes('project-')) {
            setSelectedProject(null);
         }
      }
    };

    if (projects.length > 0) {
      handleHashChange();
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [projects]);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    window.location.hash = `project-${project.id}`;
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    if (view === 'all-works') {
        window.location.hash = 'all-works';
    } else {
        window.location.hash = '';
        if (window.location.hash === '#') {
            try {
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
            } catch (e) {}
        }
    }
  };

  const handleBackToHome = () => {
      window.location.hash = '';
      setView('home');
  };

  return (
    <div className="bg-midnight min-h-screen text-white selection:bg-electric selection:text-black">
      <CustomCursor />

      
      <Helmet>
        <title>Junaid Paramberi | Creative Technologist & Visual Storyteller</title>
        <meta name="description" content="Bridging the gap between raw data and luxury visual storytelling through graphic design, motion, and code." />
        <link rel="canonical" href="https://junaidparamberi.com/" />
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
                        <Clients clients={clients} />
                        <Works projects={projects} onSelectProject={handleSelectProject} />
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
