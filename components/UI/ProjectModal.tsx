import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { X, Cpu, Palette, Layout, Images, Maximize2, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

// Moved outside to prevent re-creation on render
const TechMarkings = () => (
  <div className="absolute inset-0 pointer-events-none border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
      {/* Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-electric" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-electric" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-electric" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-electric" />
      
      {/* Center Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
          <div className="w-full h-[1px] bg-electric/50" />
          <div className="h-full w-[1px] bg-electric/50 absolute" />
      </div>
  </div>
);

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [project]);

  // Lightbox Keyboard Navigation
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

  // Dynamic Layout Engine: Calculates grid layout to prevent orphans/gaps
  const layoutConfig = useMemo(() => {
    if (!project?.gallery) return [];
    
    const layouts: { span: string, height: string }[] = [];
    let remaining = project.gallery.length;
    let processed = 0;

    while (remaining > 0) {
        // 1. Hero Image (First one) - Always Cinematic Full Width
        if (processed === 0) {
            layouts.push({ span: "md:col-span-12", height: "h-[50vh] md:h-[80vh]" });
            remaining--;
            processed++;
            continue;
        }

        // 2. Logic for remaining items to ensure perfect rows
        if (remaining === 1) {
            // Last single item -> Full Width to fill row
            layouts.push({ span: "md:col-span-12", height: "h-[50vh] md:h-[80vh]" });
            remaining--;
        } 
        else if (remaining === 2) {
            // Pair -> Asymmetric Split (7+5)
            layouts.push({ span: "md:col-span-7", height: "h-[40vh] md:h-[60vh]" });
            layouts.push({ span: "md:col-span-5", height: "h-[40vh] md:h-[60vh]" });
            remaining -= 2;
        } 
        else if (remaining === 3) {
            // Triplet -> Equal Split (4+4+4)
            layouts.push({ span: "md:col-span-4", height: "h-[40vh] md:h-[50vh]" });
            layouts.push({ span: "md:col-span-4", height: "h-[40vh] md:h-[50vh]" });
            layouts.push({ span: "md:col-span-4", height: "h-[40vh] md:h-[50vh]" });
            remaining -= 3;
        } 
        else {
            // > 3 items remaining: Decide based on parity to avoid orphans downstream
            // If even remaining (e.g., 4), take 2. If odd (e.g., 5), take 3.
            if (remaining % 2 === 0) {
                // Take 2 (Asymmetric)
                // Alternate the split direction for variety based on row index
                const isAlternate = processed % 3 === 0; 
                if (isAlternate) {
                     layouts.push({ span: "md:col-span-5", height: "h-[40vh] md:h-[60vh]" });
                     layouts.push({ span: "md:col-span-7", height: "h-[40vh] md:h-[60vh]" });
                } else {
                     layouts.push({ span: "md:col-span-7", height: "h-[40vh] md:h-[60vh]" });
                     layouts.push({ span: "md:col-span-5", height: "h-[40vh] md:h-[60vh]" });
                }
                remaining -= 2;
            } else {
                // Take 3 (Equal)
                layouts.push({ span: "md:col-span-4", height: "h-[40vh] md:h-[50vh]" });
                layouts.push({ span: "md:col-span-4", height: "h-[40vh] md:h-[50vh]" });
                layouts.push({ span: "md:col-span-4", height: "h-[40vh] md:h-[50vh]" });
                remaining -= 3;
            }
        }
        processed = layouts.length; // Update processed count based on accumulated layouts
    }
    return layouts;
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
        <Helmet>
            <title>{project.title} | Junaid Paramberi</title>
            <meta name="description" content={project.description} />
            <meta property="og:title" content={`${project.title} | Case Study`} />
            <meta property="og:description" content={project.description} />
            <meta property="og:image" content={project.image} />
        </Helmet>
        <motion.div
            key="modal-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-midnight/95 backdrop-blur-2xl overflow-y-auto overflow-x-hidden"
        >
            {/* Navigation / Close */}
            <div className="fixed top-0 left-0 right-0 z-[110] flex justify-between items-center p-6 md:p-8 pointer-events-none">
                <div className="pointer-events-auto bg-black/20 backdrop-blur-md border border-white/5 px-4 py-2 rounded-full">
                   <span className="text-xs font-mono text-electric uppercase tracking-widest">
                      Project Case Study // {project.id.toUpperCase()}
                   </span>
                </div>
                
                <button 
                    onClick={onClose}
                    className="pointer-events-auto p-4 rounded-full bg-electric/10 hover:bg-electric text-electric hover:text-black border border-electric/20 transition-all duration-300 backdrop-blur-md group"
                >
                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>

            <div className="w-full min-h-screen pb-32">
                {/* 1. Ultra-Wide Cinematic Hero */}
                <div className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden flex items-end">
                    <motion.div 
                        layoutId={`project-image-${project.id}`}
                        className="absolute inset-0 w-full h-full"
                    >
                         <img src={project.image} className="w-full h-full object-cover" alt="Hero" />
                         <div className="absolute inset-0 bg-midnight/40 mix-blend-multiply" />
                         <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
                    </motion.div>
                    
                    {/* Giant Typography Overlay */}
                    <div className="relative z-10 w-full px-4 md:px-10 pb-10 md:pb-0 overflow-hidden">
                        <motion.h1 
                            layoutId={`project-title-${project.id}`}
                            className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mix-blend-difference tracking-tighter uppercase break-words"
                        >
                            {project.title}
                        </motion.h1>
                        <div className="flex items-center gap-4 mt-8 mb-12">
                            <span className="h-[1px] w-24 bg-electric" />
                            <span className="text-electric font-mono text-sm md:text-lg uppercase tracking-widest">
                                {project.category}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. Deconstructed Info Grid */}
                <div className="max-w-[90rem] mx-auto px-4 md:px-10 mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    {/* Left: Project Specs (Sticky Removed) */}
                    <div className="lg:col-span-4 relative">
                        <div className="space-y-12 border-l border-white/10 pl-8">
                            <div>
                                <h3 className="flex items-center gap-2 text-white/50 text-xs font-mono uppercase tracking-widest mb-4">
                                    <Cpu size={14} /> The Brief
                                </h3>
                                <p className="text-white text-xl md:text-2xl font-light leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-electric text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Layout size={10} /> Framework
                                    </h4>
                                    <p className="text-white font-display text-lg">{project.specs.grid}</p>
                                </div>
                                <div>
                                    <h4 className="text-electric text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Zap size={10} /> Typography
                                    </h4>
                                    <p className="text-white font-display text-lg leading-tight">{project.specs.typography}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-electric text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Palette size={10} /> Chromatic Data
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.specs.colors.map((c, i) => (
                                        <div key={i} className="group relative cursor-crosshair">
                                            <div 
                                                className="w-12 h-12 rounded bg-white shadow-lg border border-white/10 transition-transform hover:scale-110 hover:z-10"
                                                style={{ backgroundColor: c }} 
                                            />
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-mono">
                                                {c}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="pt-8 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full border border-white/10 text-xs text-white/60 hover:text-white hover:border-white/40 transition-colors">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Narrative (Gallery moved out) */}
                    <div className="lg:col-span-8">
                         {/* Narrative Cards */}
                         <div className="space-y-16">
                            {['challenge', 'execution', 'result'].map((key, i) => {
                                // Safe access to narrative keys
                                const narrativeText = project.narrative ? (project.narrative as any)[key] : '';
                                if (!narrativeText) return null;
                                
                                return (
                                    <motion.div 
                                        key={key}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="relative group pl-8 md:pl-0"
                                    >
                                        <span className="absolute -left-4 md:-left-16 top-0 text-6xl md:text-8xl font-black text-white/5 font-display select-none group-hover:text-electric/10 transition-colors">
                                            0{i + 1}
                                        </span>
                                        <h3 className="text-electric font-mono text-sm uppercase tracking-widest mb-4 relative z-10">
                                            // {key}
                                        </h3>
                                        <p className="text-white/80 text-lg leading-loose font-light relative z-10">
                                            {narrativeText}
                                        </p>
                                    </motion.div>
                                );
                            })}
                         </div>
                    </div>
                </div>

                {/* 3. Avant-Garde Gallery Layout (Dynamic Engine - Full Width) */}
                {project.gallery && project.gallery.length > 0 && (
                    <div className="max-w-[90rem] mx-auto px-4 md:px-10 mt-32 space-y-32">
                        <div className="flex items-center gap-4 text-white/20">
                            <div className="h-[1px] flex-1 bg-current" />
                            <span className="font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                                <Images size={14} /> Visual Output
                            </span>
                            <div className="h-[1px] flex-1 bg-current" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            {project.gallery.map((item, index) => {
                                // Use the dynamically calculated layout config with fallback
                                const layout = layoutConfig[index] || { span: "md:col-span-12", height: "h-[60vh]" };

                                return (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, y: 100 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-10%" }}
                                        transition={{ duration: 0.7, ease: "easeOut" }}
                                        className={`${layout.span} relative group cursor-zoom-in`}
                                        onClick={() => setLightboxIndex(index)}
                                    >
                                        {/* Decorative Background Number */}
                                        <div className="absolute -top-12 -left-4 md:-left-12 text-[8rem] md:text-[12rem] font-black text-white/5 font-display leading-none z-0 group-hover:text-electric/5 transition-colors duration-500">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </div>

                                        {/* Image Container with Rounded Corners */}
                                        <div className={`relative w-full ${layout.height} overflow-hidden bg-navy border border-white/5 group-hover:border-electric/30 transition-colors z-10 rounded-2xl`}>
                                            {item.type === 'video' ? (
                                                <video 
                                                    autoPlay muted loop playsInline
                                                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                                                    src={item.url}
                                                />
                                            ) : (
                                                <img 
                                                    src={item.url} 
                                                    alt={`Gallery item ${index}`}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            )}
                                            
                                            {/* Color Overlay Effect on Hover */}
                                            <div className="absolute inset-0 bg-violet/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            
                                            {/* Technical Markings Component */}
                                            <TechMarkings />

                                            {/* Image Metadata Badge */}
                                            <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                                <div className="bg-black/80 backdrop-blur text-electric text-[10px] font-mono px-2 py-1 border border-white/10 uppercase tracking-wider rounded">
                                                    {item.type === 'video' ? 'MOV_422' : 'IMG_RAW'}
                                                </div>
                                                <div className="bg-white/10 backdrop-blur text-white text-[10px] font-mono px-2 py-1 border border-white/10 uppercase tracking-wider rounded">
                                                    1920x1080
                                                </div>
                                                <div className="bg-electric/20 backdrop-blur text-electric text-[10px] font-mono px-2 py-1 border border-white/10 uppercase tracking-wider rounded">
                                                    <Maximize2 size={10} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Caption / Ornament below image */}
                                        <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className={`h-1 w-4 ${i === 0 ? 'bg-electric' : 'bg-white/10'} rounded-full`} />
                                                ))}
                                            </div>
                                            <span className="text-[10px] font-mono text-white/30 uppercase">
                                                Fig. {index + 1}
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Footer / Contact Action */}
                <div className="mt-32 border-t border-white/10 pt-20 text-center">
                    <p className="text-white/40 font-mono text-xs uppercase tracking-widest mb-6">Interested in this project?</p>
                    <a href="mailto:junaidparamberi@gmail.com" className="inline-block text-4xl md:text-6xl font-display font-black text-white hover:text-electric transition-colors">
                        Let's Discuss
                    </a>
                </div>
            </div>
        </motion.div>

        {/* Lightbox Overlay */}
        <AnimatePresence>
            {lightboxIndex !== null && project.gallery && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
                    onClick={() => setLightboxIndex(null)} // Close on click outside
                >
                    {/* Controls */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
                        className="absolute top-8 right-8 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
                    >
                        <X size={24} />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
                        className="absolute left-4 md:left-8 p-4 rounded-full bg-white/5 hover:bg-electric hover:text-midnight text-white transition-colors z-50 group border border-white/10"
                    >
                        <ChevronLeft size={32} className="group-active:scale-90 transition-transform" />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
                        className="absolute right-4 md:right-8 p-4 rounded-full bg-white/5 hover:bg-electric hover:text-midnight text-white transition-colors z-50 group border border-white/10"
                    >
                        <ChevronRight size={32} className="group-active:scale-90 transition-transform" />
                    </button>

                    {/* Image Content */}
                    <div 
                        className="w-full h-full p-4 md:p-20 flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image area
                    >
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={lightboxIndex}
                                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="relative max-w-full max-h-full"
                            >
                                {project.gallery[lightboxIndex].type === 'video' ? (
                                    <video 
                                        controls autoPlay 
                                        className="max-w-full max-h-[85vh] rounded-xl shadow-2xl border border-white/10"
                                        src={project.gallery[lightboxIndex].url}
                                    />
                                ) : (
                                    <img 
                                        src={project.gallery[lightboxIndex].url} 
                                        alt="" 
                                        className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
                                    />
                                )}
                                
                                {/* Lightbox Caption */}
                                <div className="absolute -bottom-12 left-0 w-full text-center">
                                    <span className="text-white/50 font-mono text-xs uppercase tracking-widest">
                                        Asset {lightboxIndex + 1} / {project.gallery.length}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};