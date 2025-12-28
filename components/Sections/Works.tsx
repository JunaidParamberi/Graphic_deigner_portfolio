import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../constants';
import { Project } from '../../types';

interface WorksProps {
  onSelectProject: (project: Project) => void;
}

export const Works: React.FC<WorksProps> = ({ onSelectProject }) => {
  return (
    <section id="works" className="py-24 px-4 md:px-10 bg-midnight relative">
       <div className="max-w-7xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-4xl md:text-6xl text-white"
          >
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-violet">Works</span>
          </motion.h2>
       </div>

       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px]">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`project-card-${project.id}`}
              className={`project-card relative group rounded-3xl overflow-hidden cursor-none border border-white/5 bg-navy ${project.gridArea || 'md:col-span-6'}`}
              onClick={() => onSelectProject(project)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background Image */}
              <motion.img
                layoutId={`project-image-${project.id}`}
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent opacity-90" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-start z-10">
                <motion.span 
                   layoutId={`project-cat-${project.id}`}
                   className="text-electric text-xs font-bold uppercase tracking-widest mb-2"
                >
                  {project.category}
                </motion.span>
                <motion.h3 
                  layoutId={`project-title-${project.id}`}
                  className="text-3xl md:text-4xl font-display font-bold text-white mb-4"
                >
                  {project.title}
                </motion.h3>
                <div className="flex gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-1 rounded border border-white/20 text-white/60 bg-white/5 backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
       </div>
    </section>
  );
};
