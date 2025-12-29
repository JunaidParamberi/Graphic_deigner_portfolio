import React from 'react';
import { motion } from 'framer-motion';
import { CLIENTS } from '../../constants';
import { ArrowUpRight, Crosshair } from 'lucide-react';

export const Clients = () => {
  return (
    <section className="py-20 md:py-32 border-t border-white/5 bg-midnight relative overflow-hidden">
        {/* Background ambience */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl opacity-20 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-electric/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-violet/10 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 mb-2 text-electric font-mono text-xs uppercase tracking-widest"
                    >
                        <Crosshair size={14} />
                        <span>Trusted Network</span>
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-display font-bold text-4xl md:text-5xl text-white"
                    >
                        SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">COLLABORATIONS</span>
                    </motion.h2>
                </div>
                <p className="text-white/40 text-sm max-w-md text-right hidden md:block leading-relaxed">
                    Partnering with visionary companies to define visual identities and deliver high-impact digital experiences.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                {CLIENTS.map((client, i) => (
                    <motion.div
                        key={client.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative bg-midnight p-8 md:p-10 hover:bg-navy/30 transition-colors duration-500 cursor-default"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest group-hover:text-electric transition-colors">
                                0{i + 1}
                            </span>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                                <ArrowUpRight size={16} className="text-electric" />
                            </div>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
                            {client.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-[1px] w-4 bg-white/10 group-hover:w-8 group-hover:bg-electric transition-all duration-500" />
                            <span className="text-xs font-mono text-white/50 uppercase tracking-wider group-hover:text-white transition-colors">
                                {client.role}
                            </span>
                        </div>

                        <p className="text-white/40 text-sm leading-relaxed max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                            {client.description}
                        </p>

                        {/* Hover Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-transparent to-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
};
