import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { PROJECTS } from '../../constants';
import { Project } from '../../types';
import { Filter, ArrowLeft } from 'lucide-react';

interface AllWorksProps {
    onSelectProject: (project: Project) => void;
    onBack: () => void;
}

export const AllWorks: React.FC<AllWorksProps> = ({ onSelectProject, onBack }) => {
    const categories = [
        { id: 'all', label: 'Master Archive' },
        { id: 'coding', label: 'Creative Engineering' },
        { id: 'graphic', label: 'Graphic Design' },
        { id: 'motion', label: 'Motion Graphics' },
        { id: 'photo-video', label: 'Lens Media' },
    ];

    const [filter, setFilter] = useState('all');

    const filteredProjects = filter === 'all' 
        ? PROJECTS 
        : PROJECTS.filter(p => p.filterCategory === filter);

    // Helper to get professional label
    const getCategoryLabel = (filterCat: string) => {
        const cat = categories.find(c => c.id === filterCat);
        return cat ? cat.label : filterCat;
    };

    return (
        <div className="min-h-screen bg-midnight pt-32 pb-20 px-4 md:px-10">
            <Helmet>
                <title>All Works | Junaid Paramberi</title>
                <meta name="description" content="Browse the complete collection of design, motion, and coding projects by Junaid Paramberi." />
            </Helmet>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
                    <div>
                        <button 
                            onClick={onBack}
                            className="group flex items-center gap-2 text-white/50 hover:text-electric mb-6 transition-colors text-xs uppercase tracking-widest"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                        </button>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-display font-bold text-5xl md:text-7xl text-white"
                        >
                            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-violet">Works</span>
                        </motion.h1>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2 md:gap-4">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                                    filter === cat.id 
                                    ? 'bg-electric text-midnight border-electric' 
                                    : 'bg-transparent text-white/60 border-white/10 hover:border-white/40'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group cursor-pointer"
                                onClick={() => onSelectProject(project)}
                            >
                                <div className="aspect-square rounded-2xl overflow-hidden relative mb-4 border border-white/5 bg-navy">
                                    <img 
                                        src={project.image} 
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                    
                                    <div className="absolute top-4 right-4 bg-midnight/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                        <span className="text-[10px] text-electric uppercase tracking-widest">
                                            {getCategoryLabel(project.filterCategory)}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-display font-bold text-white group-hover:text-electric transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/40 text-sm mt-1 line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 text-white/30 font-mono">
                        No projects found in this category.
                    </div>
                )}
            </div>
        </div>
    );
};