import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE, SKILLS, LANGUAGES } from '../../constants';

export const Journey = () => {
  return (
    <section id="journey" className="min-h-screen bg-midnight relative py-20 px-4 md:px-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute right-0 top-1/3 w-1/2 h-full bg-gradient-to-l from-navy to-transparent opacity-50 -z-10"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Narrative */}
        <div className="lg:col-span-5 relative">
            <div className="sticky top-24">
                <motion.h2 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="font-display font-bold text-5xl md:text-6xl text-white mb-8"
                >
                    The <br/> <span className="text-electric">Journey</span>
                </motion.h2>
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                   I began my creative journey as a graphic designer, fascinated by how typography, color, and layout influence perception. Over time, my work expanded into photography, video editing, and motion graphics—not to replace design, but to strengthen it. Working across events, corporate projects, and digital campaigns taught me how brands live beyond logos: in presentations, social media, print materials, and real-world environments. Today, my focus is firmly on graphic design and visual identity, using my multimedia background to create cohesive, purposeful, and professional design systems that work consistently across digital and print platforms.
                </p>

                <div className="mb-8">
                    <h3 className="text-electric uppercase tracking-widest text-sm font-bold mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {SKILLS.map((skill, i) => (
                            <span key={i} className="px-3 py-1 border border-white/10 rounded-full text-xs text-white/80 bg-white/5 hover:border-electric transition-colors">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-violet uppercase tracking-widest text-sm font-bold mb-4">Languages</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-white/60 font-mono">
                        {LANGUAGES.join(" / ")}
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: Timeline */}
        <div className="lg:col-span-7 space-y-12 pl-0 md:pl-8 border-l border-white/10 relative">
            {EXPERIENCE.map((exp, index) => (
                <motion.div 
                    key={exp.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8"
                >
                    {/* Dot on Timeline */}
                    <div className={`absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full ${exp.type === 'work' ? 'bg-electric' : 'bg-violet'} ring-4 ring-midnight shadow-[0_0_10px_rgba(0,240,255,0.5)]`} />
                    
                    <span className="inline-block px-2 py-1 bg-white/5 rounded text-[10px] uppercase tracking-wider text-white/50 mb-2">
                        {exp.period}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-electric transition-colors">
                        {exp.role}
                    </h3>
                    <h4 className={`text-lg mb-3 font-medium ${exp.type === 'work' ? 'text-electric' : 'text-violet'}`}>
                        {exp.company}
                    </h4>
                    <p className="text-white/60 font-light leading-relaxed max-w-xl">
                        {exp.description}
                    </p>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};