import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, ArrowUpRight, Cpu, Activity } from 'lucide-react';
import { EXPERIENCE, SKILLS } from '../../constants';

// Clean, subtle border for professional cards
const CleanBorder = () => (
    <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none group-hover:border-electric/30 transition-colors duration-500" />
);

const MobileMissionControl = () => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="lg:hidden mb-16"
  >
     <div className="bg-navy/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        {/* Subtle top glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric/50 to-transparent opacity-50" />

        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-electric rounded-full animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Professional Profile</span>
            </div>
            <span className="text-[10px] text-white/40 font-mono">2024</span>
        </div>

        <p className="text-white/80 text-sm leading-relaxed font-light mb-6">
            Bridging the gap between raw data and luxury visual storytelling. A timeline of evolution from visual arts to creative engineering.
        </p>

        <div>
            <h3 className="text-white/40 font-mono text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
                <Cpu size={12} /> Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
                 {SKILLS.map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/70 font-medium">
                        {skill}
                    </span>
                 ))}
            </div>
        </div>
     </div>
  </motion.div>
);

export const Journey = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef} 
      id="journey" 
      className="relative min-h-screen bg-midnight py-24 md:py-32 px-4 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-20 md:mb-32">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex flex-col"
            >
                <span className="text-electric font-bold text-xs uppercase tracking-[0.2em] mb-4">
                    Experience
                </span>
                <h2 className="font-display font-bold text-4xl md:text-7xl text-white">
                    THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-white to-violet">JOURNEY</span>
                </h2>
            </motion.div>
        </div>

        <MobileMissionControl />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
          
          {/* Desktop Left: Sticky Sidebar */}
          <div className="lg:col-span-4 relative hidden lg:block">
            <div className="sticky top-32">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm"
                >
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4 text-white">
                            <Activity size={18} className="text-electric" />
                            <span className="font-bold text-xs uppercase tracking-widest">Overview</span>
                        </div>
                        <p className="text-white/60 font-light leading-relaxed text-sm">
                           A creative Graphic Designer and Visual Storyteller with 6+
years of experience across branding, photography, video
editing, and motion graphics. Experienced in delivering
end-to-end visual solutions, from concept and on-site
photography to post-production and final delivery for
digital and print platforms.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-sm text-white uppercase tracking-widest">
                             Core Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {SKILLS.map((skill, i) => (
                                <div 
                                    key={i}
                                    className="px-3 py-1.5 text-xs text-white/70 border border-white/10 rounded-lg hover:bg-white/5 hover:text-white transition-colors cursor-default"
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="lg:col-span-8 relative">
             
             {/* Simple, Elegant Line */}
             <div className="absolute left-[19px] md:left-[39px] top-0 bottom-0 w-[1px] bg-white/10 z-0">
                <motion.div 
                    style={{ scaleY, transformOrigin: "top" }}
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-electric to-transparent"
                />
             </div>

             <div className="space-y-12">
                {EXPERIENCE.map((exp, index) => (
                    <motion.div 
                        key={exp.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative pl-12 md:pl-32 group"
                    >
                        {/* Dot */}
                        <div className="absolute left-[13px] md:left-[33px] top-8 -translate-x-1/2 z-10">
                            <div className="w-3.5 h-3.5 bg-midnight border-2 border-white/30 rounded-full group-hover:border-electric group-hover:bg-electric transition-colors duration-300 shadow-[0_0_0_4px_var(--color-midnight)]" />
                        </div>

                        {/* Card */}
                        <div className="relative bg-navy/30 hover:bg-navy/50 backdrop-blur-sm p-8 rounded-2xl transition-all duration-300">
                            <CleanBorder />

                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 relative z-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${exp.type === 'work' ? 'text-electric' : 'text-violet'}`}>
                                            {exp.type}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-white mb-1">
                                        {exp.role}
                                    </h3>
                                    <div className="text-base text-white/60">
                                        {exp.company}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
                                    <Calendar size={12} className="text-white/40" />
                                    <span className="text-xs font-mono text-white/80">{exp.period}</span>
                                </div>
                            </div>

                            <p className="text-white/70 font-light leading-relaxed relative z-10">
                                {exp.description}
                            </p>

                            <div className="mt-6 flex items-center gap-2 text-electric opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Read More</span>
                                <ArrowUpRight size={14} />
                            </div>

                        </div>
                    </motion.div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};