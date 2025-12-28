import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT } from '../../constants';
import { Magnetic } from '../UI/Magnetic';
import { Logo } from '../UI/Logo';

export const Contact = () => {
  return (
    <section id="contact" className="min-h-[80vh] bg-midnight relative flex items-center justify-center overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
        
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
            <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="font-display font-black text-5xl md:text-7xl text-white mb-12"
            >
                Let's Build the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-violet">Future Visuals</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <Magnetic>
                    <a href={`mailto:${CONTACT.email}`} className="flex flex-col items-center gap-4 group p-6 rounded-2xl hover:bg-white/5 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-navy border border-white/10 flex items-center justify-center text-electric group-hover:scale-110 transition-transform">
                            <Mail size={20} />
                        </div>
                        <span className="text-sm text-white/60 group-hover:text-white">{CONTACT.email}</span>
                    </a>
                </Magnetic>
                
                <Magnetic>
                    <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="flex flex-col items-center gap-4 group p-6 rounded-2xl hover:bg-white/5 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-navy border border-white/10 flex items-center justify-center text-violet group-hover:scale-110 transition-transform">
                            <Phone size={20} />
                        </div>
                        <span className="text-sm text-white/60 group-hover:text-white">{CONTACT.phone}</span>
                    </a>
                </Magnetic>

                <Magnetic>
                    <div className="flex flex-col items-center gap-4 group p-6 rounded-2xl hover:bg-white/5 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-navy border border-white/10 flex items-center justify-center text-ice group-hover:scale-110 transition-transform">
                            <MapPin size={20} />
                        </div>
                        <span className="text-sm text-white/60 group-hover:text-white">{CONTACT.location}</span>
                    </div>
                </Magnetic>
            </div>

            <footer className="flex flex-col items-center gap-6 text-white/20 text-xs font-mono uppercase tracking-widest">
                <div className="opacity-50 hover:opacity-100 transition-opacity duration-500">
                    <Logo className="w-12 h-12" />
                </div>
                <span>© {new Date().getFullYear()} Junaid Paramberi. Crafted with React & Tailwind.</span>
            </footer>
        </div>
    </section>
  );
};