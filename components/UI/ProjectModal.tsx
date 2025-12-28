import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Palette, Layout, Images } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
            key="modal-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-midnight/95 backdrop-blur-xl overflow-y-auto"
        >
            {/* Close Button */}
            <button 
            onClick={onClose}
            className="fixed top-8 right-8 z-[110] p-4 rounded-full bg-white/10 hover:bg-electric/20 text-white hover:text-electric transition-colors backdrop-blur-md"
            >
            <X size={24} />
            </button>

            <div className="w-full min-h-screen pb-20">
                {/* Hero Section of Modal */}
                <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
                    <motion.img 
                        layoutId={`project-image-${project.id}`}
                        src={project.image} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-4xl">
                        <motion.span 
                            layoutId={`project-cat-${project.id}`}
                            className="text-electric font-mono text-sm uppercase tracking-widest mb-4 block"
                        >
                            {project.category}
                        </motion.span>
                        <motion.h1 
                            layoutId={`project-title-${project.id}`}
                            className="text-5xl md:text-8xl font-display font-black text-white mb-6"
                        >
                            {project.title}
                        </motion.h1>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-10 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: DNA Spec Sheet */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-navy border border-white/5 p-8 rounded-2xl">
                            <h3 className="text-white font-display text-2xl font-bold mb-6 flex items-center gap-2">
                                <Cpu size={20} className="text-violet" /> System DNA
                            </h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-white/40 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Palette size={12} /> Colors
                                    </h4>
                                    <div className="flex gap-3">
                                        {project.specs.colors.map((c, i) => (
                                            <div key={i} className="group relative">
                                                <div 
                                                    className="w-8 h-8 rounded-full border border-white/10 shadow-lg"
                                                    style={{ backgroundColor: c }} 
                                                />
                                                <span className="absolute -bottom-6 left-0 text-[10px] text-white opacity-0 group-hover:opacity-100 whitespace-nowrap bg-black p-1 rounded">
                                                    {c}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="text-white/40 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Layout size={12} /> Grid System
                                    </h4>
                                    <p className="text-white text-sm font-mono">{project.specs.grid}</p>
                                </div>

                                <div>
                                    <h4 className="text-white/40 text-xs uppercase tracking-widest mb-2">Typography</h4>
                                    <p className="text-white text-sm font-mono border-l-2 border-electric pl-3">{project.specs.typography}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Narrative */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="grid gap-12">
                            <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="border-t border-white/10 pt-8"
                            >
                                <h3 className="text-electric font-bold uppercase tracking-widest mb-4 text-sm">The Challenge</h3>
                                <p className="text-white/80 text-xl leading-relaxed">{project.narrative.challenge}</p>
                            </motion.div>

                            <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="border-t border-white/10 pt-8"
                            >
                                <h3 className="text-violet font-bold uppercase tracking-widest mb-4 text-sm">The Execution</h3>
                                <p className="text-white/80 text-xl leading-relaxed">{project.narrative.execution}</p>
                            </motion.div>

                            <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="border-t border-white/10 pt-8"
                            >
                                <h3 className="text-ice font-bold uppercase tracking-widest mb-4 text-sm">The Result</h3>
                                <p className="text-white/80 text-xl leading-relaxed">{project.narrative.result}</p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Gallery Section */}
                {project.gallery && project.gallery.length > 0 && (
                    <div className="max-w-7xl mx-auto px-4 md:px-10 mt-20">
                        <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
                            <Images className="text-electric" size={32} />
                            <h3 className="text-3xl font-display font-bold text-white">
                                Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-violet">Gallery</span>
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {project.gallery.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative group rounded-2xl overflow-hidden border border-white/5 bg-navy aspect-video"
                                >
                                    {item.type === 'video' ? (
                                        <video 
                                            controls
                                            className="w-full h-full object-cover"
                                            src={item.url}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <>
                                            <img 
                                                src={item.url} 
                                                alt={`Gallery Asset ${index + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />
                                        </>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};