
import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Client } from '../../types';
import { ArrowUpRight, Hexagon } from 'lucide-react';

interface ClientsProps {
  clients: Client[];
}

export const Clients: React.FC<ClientsProps> = ({ clients }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <section className="py-24 md:py-32 bg-midnight relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-white/5 pb-8">
                <div className="text-left">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mb-3 text-electric font-mono text-xs uppercase tracking-widest">
                        <Hexagon size={12} className="fill-current" />
                        <span>Alliance Network</span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="font-display font-bold text-4xl md:text-5xl text-white">
                        SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">PARTNERS</span>
                    </motion.h2>
                </div>
                <p className="text-white/40 text-sm max-w-xs text-right hidden md:block leading-relaxed">
                    Collaborating with industry leaders to engineer visual systems that scale.
                </p>
            </div>

            <div ref={containerRef} onMouseMove={handleMouseMove} className="group relative rounded-xl border border-white/5 bg-white/5 overflow-hidden">
                <motion.div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100" style={{ background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(0, 240, 255, 0.15), transparent 80%)` }} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-midnight/80 backdrop-blur-sm">
                    {clients.map((client, i) => (
                        <div key={client.id} className="group/card relative bg-midnight p-8 md:p-12 hover:bg-navy/40 transition-colors duration-500 text-left">
                            <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover/card:opacity-100" style={{ background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(176, 38, 255, 0.05), transparent 80%)` }} />
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex items-center gap-2">
                                            <span className="h-[1px] w-3 bg-white/20 group-hover/card:bg-electric transition-colors" />
                                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest group-hover/card:text-electric transition-colors">0{i + 1}</span>
                                        </div>
                                        <div className="opacity-0 group-hover/card:opacity-100 -translate-x-2 group-hover/card:translate-x-0 transition-all duration-300">
                                            <ArrowUpRight size={18} className="text-electric" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-white mb-2">{client.name}</h3>
                                    <span className="text-xs font-mono text-electric/70 uppercase tracking-wider mb-4 block">{client.role}</span>
                                </div>
                                <div className="mt-8 pt-8 border-t border-white/5 transform translate-y-4 opacity-0 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500">
                                    <p className="text-white/50 text-sm leading-relaxed">{client.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};
