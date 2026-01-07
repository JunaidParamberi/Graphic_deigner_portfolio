
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { X, Cpu, Palette, Layout, Images, Maximize2, Zap, ChevronLeft, ChevronRight, ArrowUpRight, Hash, Compass } from 'lucide-react';
import { Project } from '../../types';
import { Skeleton } from './Skeleton';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const TechMarkings = () => (
  <div className="absolute inset-0 pointer-events-none border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-electric" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-electric" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-electric" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-electric" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
          <div className="w-full h-[1px] bg-electric/50" />
          <div className="h-full w-[1px] bg-electric/50 absolute" />
      </div>
  </div>
);

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const Motion = motion as any;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [galleryLoaded, setGalleryLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setHeroLoaded(false);
      setGalleryLoaded({});
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  useEffect(() => {
    if (lightboxIndex === null || !project?.gallery) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, project]);

  const navigateLightbox = (direction: number) => {
    if (lightboxIndex === null || !project?.gallery) return;
    const newIndex = (lightboxIndex + direction + project.gallery.length) % project.gallery.length;
    setLightboxIndex(newIndex);
  };

  const layoutConfig = useMemo(() => {
    if (!project?.gallery) return [];
    const layouts: { span: string, height: string }[] = [];
    let remaining = project.gallery.length;
    let processed = 0;
    while (remaining > 0) {
        if (processed === 0) {
            layouts.push({ span: "md:col-span-12", height: "h-[40vh] md:h-[80vh]" });
            remaining--;
            processed++;
            continue;
        }
        if (remaining === 1) {
            layouts.push({ span: "md:col-span-12", height: "h-[40vh] md:h-[80vh]" });
            remaining--;
        } else if (remaining === 2) {
            layouts.push({ span: "md:col-span-7", height: "h-[35vh] md:h-[60vh]" });
            layouts.push({ span: "md:col-span-5", height: "h-[35vh] md:h-[60vh]" });
            remaining -= 2;
        } else {
            layouts.push({ span: "md:col-span-4", height: "h-[30vh] md:h-[50vh]" });
            layouts.push({ span: "md:col-span-4", height: "h-[30vh] md:h-[50vh]" });
            layouts.push({ span: "md:col-span-4", height: "h-[30vh] md:h-[50vh]" });
            remaining -= 3;
        }
        processed = layouts.length; 
    }
    return layouts;
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
        <Helmet>
            <title>{project.title} | Junaid Paramberi</title>
        </Helmet>
        <Motion.div
            key={`modal-${project.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-midnight overflow-y-auto overflow-x-hidden scrollbar-hide"
        >
            <div className="fixed top-0 left-0 right-0 z-[120] flex justify-between items-center p-4 md:p-8 pointer-events-none">
                <Motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="pointer-events-auto bg-midnight/40 backdrop-blur-xl border border-white/5 px-3 py-1.5 md:px-4 md:py-2 rounded-full hidden sm:flex items-center gap-3"
                >
                   <Hash size={14} className="text-electric" />
                   <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">
                      {project.id}
                   </span>
                </Motion.div>
                <button 
                    onClick={onClose}
                    className="pointer-events-auto p-3 md:p-4 rounded-full bg-electric/10 hover:bg-electric text-electric hover:text-midnight border border-electric/20 transition-all duration-300 backdrop-blur-md group ml-auto"
                >
                    <X size={20} className="md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>

            <div className="w-full min-h-screen pb-32">
                <div className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden flex items-end">
                    <Motion.div 
                        layoutId={`project-image-${project.id}`}
                        className="absolute inset-0 w-full h-full"
                    >
                         {!heroLoaded && <Skeleton className="absolute inset-0 z-10 rounded-none" />}
                         <img 
                            src={project.image} 
                            className={`w-full h-full object-cover transition-opacity duration-1000 ${heroLoaded ? 'opacity-100' : 'opacity-0'}`} 
                            alt="Hero" 
                            onLoad={() => setHeroLoaded(true)}
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent" />
                    </Motion.div>
                    
                    <div className="relative z-10 w-full px-6 md:px-12 pb-8 md:pb-16 text-left">
                        <Motion.div
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <span className="inline-block px-3 py-1 bg-electric/20 border border-electric/30 rounded text-[10px] font-mono text-electric uppercase tracking-[0.2em] mb-4">
                             {project.category.split(',')[0]}
                          </span>
                          <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-black text-white tracking-tighter uppercase leading-[0.9]">
                              {project.title}
                          </h1>
                        </Motion.div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-6 relative z-20">
                   <Motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="bg-navy/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-wrap gap-8 md:gap-16"
                   >
                      <div className="flex-1 min-w-[120px]">
                         <span className="text-[9px] font-mono text-electric uppercase tracking-widest block mb-2">Framework</span>
                         <p className="text-white text-sm md:text-base font-medium">{project.specs.grid}</p>
                      </div>
                      <div className="flex-1 min-w-[120px]">
                         <span className="text-[9px] font-mono text-electric uppercase tracking-widest block mb-2">Typography</span>
                         <p className="text-white text-sm md:text-base font-medium">{project.specs.typography}</p>
                      </div>
                      <div className="flex-1 min-w-[120px]">
                         <span className="text-[9px] font-mono text-electric uppercase tracking-widest block mb-2">Status</span>
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-electric rounded-full animate-pulse" />
                            <p className="text-white text-sm md:text-base font-medium">Archived</p>
                         </div>
                      </div>
                   </Motion.div>
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    <div className="lg:col-span-5 text-left">
                        <Motion.div 
                           initial={{ opacity: 0, x: -20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           className="space-y-8"
                        >
                            <div className="flex items-center gap-4 text-white/30 font-mono text-[10px] uppercase tracking-widest">
                               <Compass size={14} className="text-electric" />
                               <span>Discovery Phase</span>
                               <div className="h-[1px] flex-1 bg-white/5" />
                            </div>
                            <h3 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight">
                                {project.description}
                            </h3>
                            
                            <div className="flex flex-wrap gap-2 pt-4">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-white/60">
                                      #{tag.toUpperCase()}
                                    </span>
                                ))}
                            </div>

                            {project.link && (
                                <div className="pt-6">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-4 px-8 py-4 bg-white text-midnight rounded-full transition-all duration-300 hover:bg-electric">
                                        <span className="font-display font-bold text-sm uppercase tracking-wider">Launch Project</span>
                                        <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform" />
                                    </a>
                                </div>
                            )}
                        </Motion.div>
                    </div>

                    <div className="lg:col-span-7 text-left">
                         <div className="space-y-12">
                            {['challenge', 'execution', 'result'].map((key, i) => {
                                const narrativeText = project.narrative ? (project.narrative as any)[key] : '';
                                if (!narrativeText) return null;
                                return (
                                    <Motion.div 
                                      key={key} 
                                      initial={{ opacity: 0, y: 30 }} 
                                      whileInView={{ opacity: 1, y: 0 }} 
                                      viewport={{ once: true }} 
                                      transition={{ delay: i * 0.1 }} 
                                      className="relative p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                                    >
                                        <span className="absolute -top-4 -left-4 w-12 h-12 flex items-center justify-center font-display font-black text-white/5 text-6xl">
                                          0{i + 1}
                                        </span>
                                        <h3 className="text-electric font-mono text-[10px] uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                                           <div className="w-1 h-1 bg-electric rotate-45" />
                                           {key}
                                        </h3>
                                        <p className="text-white/80 text-base md:text-lg leading-relaxed font-light">{narrativeText}</p>
                                    </Motion.div>
                                );
                            })}
                         </div>
                    </div>
                </div>

                {project.gallery && project.gallery.length > 0 && (
                    <div className="max-w-7xl mx-auto px-6 md:px-12 mt-32">
                        <div className="flex items-center gap-4 text-white/10 mb-16">
                            <span className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                               <Images size={14} className="text-electric" /> 
                               Production Outputs
                            </span>
                            <div className="h-[1px] flex-1 bg-current" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                            {project.gallery.map((item, index) => {
                                const layout = layoutConfig[index] || { span: "md:col-span-12", height: "h-[40vh]" };
                                return (
                                    <Motion.div 
                                      key={`${project.id}-gallery-${index}`} 
                                      initial={{ opacity: 0, y: 30 }} 
                                      whileInView={{ opacity: 1, y: 0 }} 
                                      viewport={{ once: true, margin: "-5%" }} 
                                      className={`${layout.span} relative group cursor-zoom-in text-left`} 
                                      onClick={() => setLightboxIndex(index)}
                                    >
                                        <div className={`relative w-full ${layout.height} overflow-hidden bg-navy border border-white/5 rounded-2xl group-hover:border-electric/40 transition-colors duration-500`}>
                                            {!galleryLoaded[index] && <Skeleton className="absolute inset-0 z-10 rounded-none" />}
                                            {item.type === 'video' ? (
                                                <video 
                                                    autoPlay muted loop playsInline 
                                                    className={`w-full h-full object-cover transition-opacity duration-1000 ${galleryLoaded[index] ? 'opacity-80 group-hover:opacity-100' : 'opacity-0'}`} 
                                                    src={item.url} 
                                                    onLoadedData={() => setGalleryLoaded(prev => ({ ...prev, [index]: true }))}
                                                />
                                            ) : (
                                                <img 
                                                    src={item.url} 
                                                    alt="" 
                                                    className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 ${galleryLoaded[index] ? 'opacity-80 group-hover:opacity-100' : 'opacity-0'}`} 
                                                    loading="lazy" 
                                                    onLoad={() => setGalleryLoaded(prev => ({ ...prev, [index]: true }))}
                                                />
                                            )}
                                            <TechMarkings />
                                            <div className="absolute top-4 left-4">
                                               <span className="bg-black/60 backdrop-blur px-2 py-1 text-[9px] font-mono text-white/50 border border-white/10 rounded uppercase">
                                                  {item.type.toUpperCase()} // 0{index + 1}
                                               </span>
                                            </div>
                                            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                               <div className="bg-electric text-midnight p-2 rounded-full">
                                                  <Maximize2 size={14} />
                                               </div>
                                            </div>
                                        </div>
                                    </Motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </Motion.div>

        <AnimatePresence>
            {lightboxIndex !== null && project.gallery && (
                <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-midnight/98 backdrop-blur-2xl flex items-center justify-center" onClick={() => setLightboxIndex(null)}>
                    <button onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }} className="absolute top-6 right-6 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-[210]"><X size={20} /></button>
                    
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[210] flex gap-4">
                        <button onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }} className="p-4 rounded-full bg-white/5 hover:bg-electric hover:text-midnight text-white transition-all"><ChevronLeft size={24} /></button>
                        <button onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }} className="p-4 rounded-full bg-white/5 hover:bg-electric hover:text-midnight text-white transition-all"><ChevronRight size={24} /></button>
                    </div>

                    <div className="w-full h-full p-4 md:p-20 flex items-center justify-center">
                        <AnimatePresence mode='wait'>
                            <Motion.div 
                              key={`lightbox-${lightboxIndex}`} 
                              initial={{ opacity: 0, scale: 0.95 }} 
                              animate={{ opacity: 1, scale: 1 }} 
                              exit={{ opacity: 0, scale: 0.95 }} 
                              className="relative max-w-full max-h-full flex items-center justify-center" 
                              onClick={(e: any) => e.stopPropagation()}
                            >
                                {project.gallery[lightboxIndex].type === 'video' ? (
                                    <video controls autoPlay className="max-w-[90vw] max-h-[80vh] rounded-xl shadow-2xl border border-white/10" src={project.gallery[lightboxIndex].url} />
                                ) : (
                                    <img src={project.gallery[lightboxIndex].url} alt="" className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10" />
                                )}
                            </Motion.div>
                        </AnimatePresence>
                    </div>
                </Motion.div>
            )}
        </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};
