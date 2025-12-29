import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CustomCursor } from './components/Layout/CustomCursor';
import { Navigation } from './components/Layout/Navigation';
import { Hero } from './components/Sections/Hero';
import { Journey } from './components/Sections/Journey';
import { Works } from './components/Sections/Works';
import { Contact } from './components/Sections/Contact';
import { ProjectModal } from './components/UI/ProjectModal';
import { Preloader } from './components/UI/Preloader';
import { ScrollProgress } from './components/UI/ScrollProgress';
import { AllWorks } from './components/Pages/AllWorks';
import { Project } from './types';
import { PROJECTS } from './constants';
import { Clients } from './components/Sections/Clients';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [view, setView] = useState<'home' | 'all-works'>('home');
  const [isLoading, setIsLoading] = useState(true);

  // Handle URL Hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      if (hash === '#all-works') {
          setView('all-works');
          setSelectedProject(null); // Close modal if open
      } else if (hash.startsWith('#project-')) {
        const projectId = hash.replace('#project-', '');
        const project = PROJECTS.find(p => p.id === projectId);
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

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    window.location.hash = `project-${project.id}`;
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    if (view === 'all-works') {
        window.history.pushState(null, '', '#all-works');
    } else {
        window.history.pushState(null, '', ' ');
    }
  };

  const handleBackToHome = () => {
      window.location.hash = '';
      setView('home');
  };

  return (
    <div className="bg-midnight min-h-screen text-white selection:bg-electric selection:text-black">
      <CustomCursor />
      
      {/* Default SEO for Home */}
      <Helmet>
        <title>Junaid Paramberi | Creative Technologist & Visual Storyteller</title>
        <meta name="description" content="Bridging the gap between raw data and luxury visual storytelling through graphic design, motion, and code." />
        <link rel="canonical" href="https://junaidparamberi.com/" />
      </Helmet>

      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
            <Navigation />
            <ScrollProgress />
            
            <main>
                {view === 'home' ? (
                    <>
                        {/* About/Hero Section */}
                        <div id="about">
                            <Hero />
                        </div>
                        
                        {/* Journey/Experience Section */}
                        <Journey />
                        
                        {/* Works/Portfolio Section */}
                        <Works onSelectProject={handleSelectProject} />


                        {/* Clients/Collaborations Section */}
                        <Clients />
                        
                        
                        {/* Contact Section */}
                        <Contact />
                    </>
                ) : (
                    <AllWorks 
                        onSelectProject={handleSelectProject} 
                        onBack={handleBackToHome}
                    />
                )}
            </main>

            {/* Detail Overlay */}
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