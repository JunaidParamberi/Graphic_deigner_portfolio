import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { PROJECTS } from '../../constants';
import { Project } from '../../types';
import { ArrowUpRight, ArrowRight, Disc, Scan } from 'lucide-react';
import { Magnetic } from '../UI/Magnetic';

interface WorksProps {
  onSelectProject: (project: Project) => void;
}

const ProjectCard = ({ project, onSelect, className, index }: { project: Project, onSelect: (p: Project) => void, className?: string, index: number }) => {
    
    const categoryLabels: Record<string, string> = {
        'coding': 'Creative Engineering',
        'graphic': 'Graphic Design',
        'motion': 'Motion Graphics',
        'photo-video': 'Lens Media'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            onClick={() => onSelect(project)}
            className={`group project-card relative h-full min-h-[500px] w-full bg-navy cursor-none overflow-hidden rounded-2xl border border-white/5 ${className}`}
        >
            {/* 1. Image Layer with RGB Shift Effect on Hover */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Base Image */}
                <motion.div 
                    className="absolute inset-0 z-10 transition-transform duration-700 group-hover:scale-105"
                >
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-60 grayscale-[0.5] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    />
                </motion.div>

                {/* Laser Scan Line Effect */}
                <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div 
                        className="w-full h-[20%] bg-gradient-to-b from-transparent via-electric/30 to-transparent"
                        initial={{ top: '-20%' }}
                        animate={{ top: '120%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                </div>

                {/* Red Channel - Shifts Left */}
                <div 
                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300 mix-blend-screen translate-x-0 group-hover:-translate-x-2"
                    style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
                
                {/* Blue Channel - Shifts Right */}
                <div 
                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300 mix-blend-screen translate-x-0 group-hover:translate-x-2"
                    style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
            </div>

            {/* 2. Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 z-30 bg-gradient-to-t from-midnight via-midnight/50 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

            {/* 3. Content Layer (HUD Style) */}
            <div className="absolute inset-0 z-40 p-8 flex flex-col justify-between">
                
                {/* Top: Tech Badge & Number */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                         <span className="font-mono text-[10px] text-electric uppercase tracking-widest border border-electric/20 bg-electric/5 px-2 py-1 rounded backdrop-blur-md">
                            {categoryLabels[project.filterCategory] || project.filterCategory}
                         </span>
                    </div>
                    
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/20 backdrop-blur-md group-hover:bg-electric group-hover:text-black transition-colors duration-300">
                        <ArrowUpRight size={18} />
                    </div>
                </div>

                {/* Bottom: Title & Specs */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    
                    {/* Animated Line */}
                    <div className="w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-electric to-violet mb-6 transition-all duration-700 ease-out" />

                    <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-[0.9]">
                        {project.title}
                    </h3>

                    <div className="flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <p className="text-sm text-white/70 line-clamp-2 max-w-md font-light">
                            {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-[9px] font-mono text-electric uppercase tracking-widest px-2 py-1 border-l border-white/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Hover Border Glow */}
            <div className="absolute inset-0 z-50 border-2 border-electric opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none mix-blend-overlay" />
            
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-electric opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-electric opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50" />
        </motion.div>
    );
};

export const Works: React.FC<WorksProps> = ({ onSelectProject }) => {
  return (
    <section id="works" className="py-32 bg-midnight relative z-10 overflow-hidden">
       
       {/* Background Ambience */}
       <div className="absolute top-[20%] left-0 w-[50vw] h-[50vw] bg-electric/5 rounded-full blur-[150px] pointer-events-none" />
       
       <div className="max-w-7xl mx-auto px-4 md:px-10">
           
           {/* Section Header */}
           <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 border-b border-white/5 pb-8">
              <div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 mb-4 text-electric font-mono text-xs uppercase tracking-widest"
                  >
                     <Disc size={12} className="animate-spin-slow" />
                     <span>Selected Archives</span>
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-display font-bold text-5xl md:text-8xl text-white tracking-tighter"
                  >
                    FEATURED <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20">PROJECTS</span>
                  </motion.h2>
              </div>

              <div className="hidden md:block">
                  <Magnetic strength={0.3}>
                    <a href="#all-works" className="group flex items-center gap-4 px-8 py-12 rounded-full border border-white/10 hover:border-electric/50 hover:bg-electric/5 transition-all duration-300">
                        <span className="font-display font-bold text-xl text-white group-hover:text-electric transition-colors">View All Works</span>
                        <div className="w-12 h-12 rounded-full bg-white text-midnight flex items-center justify-center group-hover:bg-electric group-hover:scale-110 transition-all duration-300">
                            <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform duration-300" />
                        </div>
                    </a>
                  </Magnetic>
              </div>
           </div>

           {/* The Grid */}
           <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              {PROJECTS.filter(p => p.featured).slice(0, 6).map((project, index) => (
                <div key={project.id} className={`${project.gridArea || 'md:col-span-6'}`}>
                    <ProjectCard 
                        project={project}
                        onSelect={onSelectProject}
                        index={index}
                    />
                </div>
              ))}
              
              {/* Last card is a 'More' link in the grid flow for mobile/tablet feel */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-6 min-h-[500px] rounded-2xl border border-white/5 bg-white/5 hover:bg-electric/10 transition-colors flex flex-col items-center justify-center gap-6 group cursor-pointer md:hidden"
                onClick={() => window.location.hash = '#all-works'}
              >
                 <div className="w-20 h-20 rounded-full bg-midnight border border-white/10 flex items-center justify-center text-white group-hover:border-electric group-hover:text-electric transition-all">
                    <ArrowRight size={32} />
                 </div>
                 <span className="font-display font-bold text-2xl text-white">View Complete Archive</span>
              </motion.div>
           </div>
           
       </div>
    </section>
  );
};