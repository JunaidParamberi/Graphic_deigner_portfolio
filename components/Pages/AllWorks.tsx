
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Project } from '../../types';
import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '../UI/Skeleton';

interface AllWorksProps {
    projects: Project[];
    onSelectProject: (project: Project) => void;
    onBack: () => void;
}

const ProjectItem = ({ project, onSelect, getCategoryLabel }: { project: Project, onSelect: (p: Project) => void, getCategoryLabel: (c: string) => string }) => {
    const Motion = motion as any;
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Motion.div 
            layout 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }} 
            transition={{ duration: 0.3 }} 
            className="group cursor-pointer text-left" 
            onClick={() => onSelect(project)}
        >
            <div className="aspect-square rounded-2xl overflow-hidden relative mb-4 border border-white/5 bg-navy">
                {!imageLoaded && <Skeleton className="absolute inset-0 z-10 rounded-none" />}
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${imageLoaded ? 'opacity-80 group-hover:opacity-100' : 'opacity-0'}`} 
                    onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute top-4 right-4 z-20 bg-midnight/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-[10px] text-electric uppercase tracking-widest">{getCategoryLabel(project.filterCategory)}</span>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-display font-bold text-white group-hover:text-electric transition-colors">{project.title}</h3>
                <p className="text-white/40 text-sm mt-1 line-clamp-2">{project.description}</p>
            </div>
        </Motion.div>
    );
};

export const AllWorks: React.FC<AllWorksProps> = ({ projects, onSelectProject, onBack }) => {
    const Motion = motion as any;
    const categories = [
        { id: 'all', label: 'Master Archive' },
        { id: 'coding', label: 'Creative Engineering' },
        { id: 'graphic', label: 'Visual Systems' },
        { id: 'motion', label: 'Kinetic Design' },
        { id: 'photo-video', label: 'Lens Media' },
    ];

    const [filter, setFilter] = useState('all');

    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.filterCategory === filter);

    const getCategoryLabel = (filterCat: string) => {
        const cat = categories.find(c => c.id === filterCat);
        return cat ? cat.label : filterCat;
    };

    return (
        <div className="min-h-screen bg-midnight pt-32 pb-20 px-4 md:px-10">
            <Helmet>
                <title>All Works | Junaid Paramberi</title>
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 text-left">
                    <div>
                        <button onClick={onBack} className="group flex items-center gap-2 text-white/50 hover:text-electric mb-6 transition-colors text-xs uppercase tracking-widest">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                        </button>
                        <Motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-5xl md:text-7xl text-white">
                            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-violet">Works</span>
                        </Motion.h1>
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-4">
                        {categories.map(cat => (
                            <button key={cat.id} onClick={() => setFilter(cat.id)} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${filter === cat.id ? 'bg-electric text-midnight border-electric' : 'bg-transparent text-white/60 border-white/10 hover:border-white/40'}`}>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <Motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
  {filteredProjects.map((project) => (
    <motion.div
      key={project.id}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <ProjectItem
        project={project}
        onSelect={onSelectProject}
        getCategoryLabel={getCategoryLabel}
      />
    </motion.div>
  ))}
</AnimatePresence>

                </Motion.div>
                {filteredProjects.length === 0 && <div className="text-center py-20 text-white/30 font-mono">No projects found.</div>}
            </div>
        </div>
    );
};
