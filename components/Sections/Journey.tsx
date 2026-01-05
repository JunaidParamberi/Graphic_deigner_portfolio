
import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, ArrowUpRight, Cpu, Activity, TrendingUp } from 'lucide-react';
import { Experience, Overview } from '../../types';

interface JourneyProps {
  experiences: Experience[];
  skills: string[];
  overview: Overview | null;
}

const CleanBorder = () => (
    <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none group-hover:border-electric/30 transition-colors duration-500" />
);

const MobileMissionControl = ({ overview, skills }: { overview: Overview | null, skills: string[] }) => {
  // Fix: Cast motion to any to bypass environment-specific type issues
  const Motion = motion as any;
  return (
    <Motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="lg:hidden mb-16"
    >
       <div className="bg-navy/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric/50 to-transparent opacity-50" />
  
          <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-electric rounded-full animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">{overview?.title || "Professional Profile"}</span>
              </div>
              <span className="text-[10px] text-white/40 font-mono">{new Date().getFullYear()}</span>
          </div>
  
          <p className="text-white/80 text-sm leading-relaxed font-light mb-6">
              {overview?.description}
          </p>
  
          <div className="grid grid-cols-3 gap-2 mb-8">
              {overview?.stats.map((stat, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/5">
                      <div className="text-electric font-display font-bold text-sm mb-1">{stat.value}</div>
                      <div className="text-white/40 text-[8px] uppercase tracking-tighter">{stat.label}</div>
                  </div>
              ))}
          </div>
  
          <div>
              <h3 className="text-white/40 font-mono text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Cpu size={12} /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                   {skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-white/70 font-medium">
                          {skill}
                      </span>
                   ))}
              </div>
          </div>
       </div>
    </Motion.div>
  );
};

export const Journey: React.FC<JourneyProps> = ({ experiences, skills, overview }) => {
  // Fix: Cast motion to any to bypass environment-specific type issues
  const Motion = motion as any;
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
        
        <div className="mb-20 md:mb-32 text-left">
            <Motion.div 
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
            </Motion.div>
        </div>

        <MobileMissionControl overview={overview} skills={skills} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
          
          <div className="lg:col-span-4 relative hidden lg:block">
            <div className="sticky top-32">
                <Motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm text-left"
                >
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4 text-white">
                            <Activity size={18} className="text-electric" />
                            <span className="font-bold text-xs uppercase tracking-widest">{overview?.subtitle}</span>
                        </div>
                        <p className="text-white/60 font-light leading-relaxed text-sm mb-6">
                             {overview?.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                            {overview?.stats.map((stat, i) => (
                                <div key={i}>
                                    <div className="text-xl font-display font-bold text-white">{stat.value}</div>
                                    <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 pt-8 border-t border-white/5">
                        <h3 className="font-bold text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                             <TrendingUp size={12} /> Tech Ecosystem
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                                <div 
                                    key={i}
                                    className="px-3 py-1.5 text-[10px] text-white/70 border border-white/10 rounded-lg hover:bg-white/5 hover:text-white transition-colors cursor-default"
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                </Motion.div>
            </div>
          </div>

          <div className="lg:col-span-8 relative">
             <div className="absolute left-[19px] md:left-[39px] top-0 bottom-0 w-[1px] bg-white/10 z-0 overflow-hidden rounded-full">
                <Motion.div 
                    style={{ scaleY, transformOrigin: "top" }}
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-electric to-violet shadow-[0_0_20px_2px_rgba(0,240,255,0.5)]"
                />
             </div>

             <div className="space-y-12">
                {experiences.map((exp, index) => (
                    <Motion.div 
                        key={exp.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative pl-12 md:pl-32 group"
                    >
                        <div className="absolute left-[13px] md:left-[33px] top-8 -translate-x-1/2 z-10">
                            <div className="relative flex items-center justify-center">
                                <Motion.div 
                                    className="absolute w-12 h-12 bg-electric/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                                />
                                <div className="w-3.5 h-3.5 bg-midnight border-2 border-white/30 rounded-full group-hover:border-electric group-hover:bg-electric transition-all duration-300 z-10" />
                            </div>
                        </div>

                        <div className="relative bg-navy/30 hover:bg-navy/50 backdrop-blur-sm p-8 rounded-2xl transition-all duration-300 group-hover:-translate-y-1">
                            <CleanBorder />
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 relative z-10">
                                <div className="text-left">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${exp.type === 'work' ? 'text-electric' : 'text-violet'}`}>
                                            {exp.type}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-white mb-1">{exp.role}</h3>
                                    <div className="text-base text-white/60">{exp.company}</div>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit group-hover:border-electric/30 transition-colors shrink-0">
                                    <Calendar size={12} className="text-white/40 group-hover:text-electric transition-colors" />
                                    <span className="text-xs font-mono text-white/80">{exp.period}</span>
                                </div>
                            </div>
                            <p className="text-white/70 font-light leading-relaxed relative z-10 text-left">
                                {exp.description}
                            </p>
                            <div className="mt-6 flex items-center gap-2 text-electric opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                                <span className="text-[10px] font-bold uppercase tracking-widest">Case Study Available</span>
                                <ArrowUpRight size={14} />
                            </div>
                        </div>
                    </Motion.div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
