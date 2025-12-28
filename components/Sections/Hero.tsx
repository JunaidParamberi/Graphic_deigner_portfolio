import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Magnetic } from '../UI/Magnetic';

export const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation for spotlight
  const springConfig = { damping: 25, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        // Calculate percentage for gradient center
        const xPct = (e.clientX / window.innerWidth) * 100;
        const yPct = (e.clientY / window.innerHeight) * 100;
        mouseX.set(xPct);
        mouseY.set(yPct);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const elem = document.getElementById('works');
    elem?.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState({}, '', '#works');
  };

  return (
    <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-midnight">
      
      {/* Dynamic Background Spotlight - using CSS variables */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none transition-colors duration-500"
        style={{
            background: `radial-gradient(circle at ${springX.get()}% ${springY.get()}%, var(--color-navy) 0%, var(--color-midnight) 40%)`
        }}
      >
        {/* Animated Noise Overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.1] animate-noise mix-blend-overlay"></div>
      </motion.div>

      {/* Floating Blobs (Decoration) */}
      <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-electric/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-violet/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      {/* Kinetic Typography */}
      <div 
        className="relative z-10 text-center px-4 mix-blend-screen w-full flex flex-col items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }} 
          className="text-electric font-sans uppercase tracking-[0.2em] text-[10px] md:text-base mb-4 md:mb-8"
        >
          Creative Technologist & Graphic Designer
        </motion.h2>

        {/* Responsive Typography using Viewport Units (vw) */}
        <h1 className="font-display font-black leading-none tracking-tighter w-full text-center">
          <div className="overflow-hidden">
            <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className={`block text-[13vw] md:text-9xl text-ice ${isHovered ? 'liquid-text' : ''}`}
            >
                JUNAID
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className={`block text-[9vw] md:text-9xl text-transparent bg-clip-text bg-chrome-gradient ${isHovered ? 'liquid-text' : ''}`}
            >
                PARAMBERI
            </motion.span>
          </div>
        </h1>
      </div>

      {/* Intro Description */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-8 md:mt-12 text-white/60 max-w-xs md:max-w-md text-center font-sans text-xs md:text-base px-6 relative z-10 leading-relaxed"
      >
        Bridging the gap between raw data and luxury visual storytelling through graphic design, motion, and code.
      </motion.p>

      {/* Magnetic Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 md:bottom-12 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <Magnetic>
          <a 
            href="#works" 
            onClick={handleScroll}
            className="flex flex-col items-center gap-2 group p-4"
          >
            <span className="text-[10px] uppercase tracking-widest text-electric group-hover:text-violet transition-colors">Explore</span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-electric transition-colors">
              <ArrowDown size={16} className="text-white group-hover:text-electric" />
            </div>
          </a>
        </Magnetic>
      </motion.div>
    </section>
  );
};