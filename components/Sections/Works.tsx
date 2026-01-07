
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../types';
import { ArrowUpRight, ArrowRight, Disc } from 'lucide-react';
import { Magnetic } from '../UI/Magnetic';
import { Skeleton } from '../UI/Skeleton';

interface WorksProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const ProjectCard = ({ project, onSelect, className, index }: { project: Project, onSelect: (p: Project) => void, className?: string, index: number }) => {
    const Motion = motion as any;
    const [imageLoaded, setImageLoaded] = useState(false);
    
    const categoryLabels: Record<string, string> = {
        'coding': 'Creative Engineering',
        'graphic': 'Visual Systems',
        'motion': 'Kinetic Design',
        'photo-video': 'Lens Media'
    };

    return (
        <Motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: index * 0.05 }}
            onClick={() => onSelect(project)}
            className={`group project-card relative h-full min-h-[450px] md:min-h-[500px] w-full bg-navy cursor-none overflow-hidden rounded-2xl border border-white/5 ${className}`}
        >
            <div className="absolute inset-0 overflow-hidden">
                {!imageLoaded && (
                    <Skeleton className="absolute inset-0 z-10 rounded-none" />
                )}
                <Motion.div 
                    className={`absolute inset-0 z-10 transition-all duration-1000 group-hover:scale-105 ${imageLoaded ? 'opacity-60 grayscale-[0.5] group-hover:grayscale-0 group-hover:opacity-100' : 'opacity-0'}`}
                >
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover" 
                        onLoad={() => setImageLoaded(true)}
                    />
                </Motion.div>
                
                {/* Scanline Effect */}
                <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Motion.div 
                        className="w-full h-[20%] bg-gradient-to-b from-transparent via-electric/30 to-transparent" 
                        initial={{ top: '-20%' }} 
                        animate={{ top: '120%' }} 
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} 
                    />
                </div>
            </div>

            <div className="absolute inset-0 z-30 bg-gradient-to-t from-midnight via-midnight/50 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
            
            <div className="absolute inset-0 z-40 p-6 md:p-8 flex flex-col justify-between text-left">
                <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] md:text-[10px] text-electric uppercase tracking-widest border border-electric/20 bg-electric/5 px-2 py-1 rounded backdrop-blur-md">
                        {categoryLabels[project.filterCategory] || project.filterCategory}
                    </span>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/20 backdrop-blur-md group-hover:bg-electric group-hover:text-midnight transition-colors duration-300">
                        <ArrowUpRight size={16} />
                    </div>
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-electric to-violet mb-4 md:mb-6 transition-all duration-700 ease-out" />
                    <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-2 md:mb-4 leading-[0.9] uppercase tracking-tighter">
                        {project.title}
                    </h3>
                    
                    <div className="flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <p className="text-xs md:text-sm text-white/70 line-clamp-2 max-w-md font-light leading-relaxed">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-[8px] md:text-[9px] font-mono text-electric uppercase tracking-widest px-2 py-1 border-l border-white/20 bg-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Motion.div>
    );
};

export const Works: React.FC<WorksProps> = ({ projects, onSelectProject }) => {
  const Motion = motion as any;
  
  const featuredProjects = useMemo(() => {
    return projects
      .filter(p => p.featured)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? b.id.localeCompare(a.id)));
  }, [projects]);
  
  return (
    <section id="works" className="py-32 bg-midnight relative z-10 overflow-hidden">
       <div className="max-w-7xl mx-auto px-4 md:px-10">
           
           <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 border-b border-white/5 pb-8 text-left">
              <div>
                  <Motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    className="flex items-center gap-2 mb-4 text-electric font-mono text-xs uppercase tracking-widest"
                  >
                     <Disc size={12} className="animate-spin-slow" />
                     <span>Featured Work</span>
                  </Motion.div>
                  <Motion.h2 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    className="font-display font-bold text-5xl md:text-8xl text-white tracking-tighter"
                  >
                    SELECTED <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20">PROJECTS</span>
                  </Motion.h2>
              </div>

              <div className="hidden md:block">
                  <Magnetic strength={0.3}>
                    <button 
                        onClick={() => window.location.hash = '#all-works'} 
                        className="group flex items-center gap-4 px-8 py-10 rounded-full border border-white/10 hover:border-electric/50 hover:bg-electric/5 transition-all duration-300"
                    >
                        <span className="font-display font-bold text-lg text-white group-hover:text-electric transition-colors uppercase tracking-tight">Full Archive</span>
                        <div className="w-10 h-10 rounded-full bg-white text-midnight flex items-center justify-center group-hover:bg-electric group-hover:scale-110 transition-all duration-300">
                            <ArrowRight size={18} className="group-hover:-rotate-45 transition-transform duration-300" />
                        </div>
                    </button>
                  </Magnetic>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {featuredProjects.map((project, index) => {
                  const spanClass = project.gridArea || 'md:col-span-6';

                  return (
                    <Motion.div 
                      key={project.id}
                      layout
                      className={`${spanClass}`}
                    >
                        <ProjectCard 
                          project={project} 
                          onSelect={onSelectProject} 
                          index={index} 
                        />
                    </Motion.div>
                  );
                })}
              </AnimatePresence>

              <Motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                className="md:col-span-12 min-h-[300px] rounded-2xl border border-white/5 bg-white/5 hover:bg-electric/10 transition-colors flex flex-col items-center justify-center gap-4 group cursor-pointer md:hidden" 
                onClick={() => window.location.hash = '#all-works'}
              >
                 <div className="w-16 h-16 rounded-full bg-midnight border border-white/10 flex items-center justify-center text-white group-hover:border-electric group-hover:text-electric transition-all">
                    <ArrowRight size={28} />
                 </div>
                 <span className="font-display font-bold text-xl text-white uppercase tracking-tighter">Enter Full Archives</span>
              </Motion.div>
           </div>
       </div>
    </section>
  );
};
