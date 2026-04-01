
import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Client } from '../../types';
import { Hexagon } from 'lucide-react';

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
    <section className="py-16 md:py-20 bg-midnight relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 border-b border-white/5 pb-6">
                <div className="text-left">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mb-3 text-electric font-mono text-xs uppercase tracking-widest">
                        <Hexagon size={12} className="fill-current" />
                        <span>Client Roster</span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="font-display font-bold text-3xl md:text-5xl text-white">
                        SELECTED <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/40">PARTNERS</span>
                    </motion.h2>
                </div>
                <p className="text-white/40 text-xs md:text-sm max-w-xs text-right hidden md:block leading-relaxed">
                    Trusted client collaborations across design, motion, and digital product work.
                </p>
            </div>

            <div ref={containerRef} onMouseMove={handleMouseMove} className="group relative rounded-xl border border-white/5 bg-white/5 overflow-hidden">
                <motion.div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100" style={{ background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(0, 240, 255, 0.15), transparent 80%)` }} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-midnight/80 backdrop-blur-sm">
                    {clients.map((client, i) => (
                        <div key={client.id} className="group/card relative bg-midnight p-5 md:p-6 hover:bg-navy/40 transition-colors duration-500 text-left min-h-[120px]">
                            <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover/card:opacity-100" style={{ background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(176, 38, 255, 0.05), transparent 80%)` }} />
                            <div className="relative z-10 h-full flex items-center justify-center">
                                <h3 className="text-lg md:text-xl font-display font-bold text-white leading-tight text-center">
                                    {client.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
  );
};
