import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowDown, Globe, Zap, Cpu, Code, Command } from 'lucide-react';
import { Magnetic } from '../UI/Magnetic';

// Decrypt Text Effect Component
const DecryptText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
    const [displayText, setDisplayText] = useState('');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    
    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(text.split('').map((char, index) => {
                if (index < iteration) return text[index];
                return characters[Math.floor(Math.random() * characters.length)];
            }).join(''));

            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
        
        // Start delay
        const timeout = setTimeout(() => {}, delay);
        return () => { clearInterval(interval); clearTimeout(timeout); };
    }, [text, delay]);

    return <span>{displayText}</span>;
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking normalized (-1 to 1) for Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Raw pixels for spotlight mask
  const mouseXPx = useMotionValue(0);
  const mouseYPx = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalized coordinates (-1 to 1)
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    
    mouseX.set(x);
    mouseY.set(y);
    
    // Pixel coordinates relative to container (for mask)
    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseXPx.set(clientX - rect.left);
        mouseYPx.set(clientY - rect.top);
    }
  };

  // Smooth springs for movement
  const springConfig = { damping: 20, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax layers movement
  const moveTextX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const moveTextY = useTransform(smoothY, [-1, 1], [-20, 20]);
  
  const moveBackX = useTransform(smoothX, [-1, 1], [15, -15]);
  const moveBackY = useTransform(smoothY, [-1, 1], [15, -15]);

  // Chromatic Aberration Offsets (Red/Blue Split)
  const rX = useTransform(smoothX, [-1, 1], [-4, 4]);
  const rY = useTransform(smoothY, [-1, 1], [-4, 4]);
  const bX = useTransform(smoothX, [-1, 1], [4, -4]);
  const bY = useTransform(smoothY, [-1, 1], [4, -4]);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const elem = document.getElementById('works');
    elem?.scrollIntoView({ behavior: 'smooth' });
    try {
        window.history.pushState({}, '', '#works');
    } catch (e) {}
  };

  return (
    <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-midnight perspective-1000"
    >
      {/* 1. Dynamic Background Grid with Warp */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
            x: moveBackX,
            y: moveBackY,
            scale: 1.1 // Prevent edges showing on move
        }}
      >
         {/* Base Grid (Dim) */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
         
         {/* Spotlight Reveal Grid (Bright & Colored) */}
         <motion.div 
            className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.15)_1px,transparent_1px)] bg-[size:50px_50px]"
            style={{
                maskImage: useMotionTemplate`radial-gradient(circle 450px at ${mouseXPx}px ${mouseYPx}px, black 0%, transparent 100%)`,
                WebkitMaskImage: useMotionTemplate`radial-gradient(circle 450px at ${mouseXPx}px ${mouseYPx}px, black 0%, transparent 100%)`
            }}
         />
      </motion.div>

      {/* 2. Floating Abstract Shapes & Artifacts (Depth) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Top Left Orb */}
          <motion.div 
            style={{ x: useTransform(smoothX, [-1, 1], [40, -40]), y: useTransform(smoothY, [-1, 1], [40, -40]) }}
            className="absolute top-[15%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-violet/10 blur-[100px] opacity-50" 
          />
          {/* Bottom Right Orb */}
          <motion.div 
            style={{ x: useTransform(smoothX, [-1, 1], [-40, 40]), y: useTransform(smoothY, [-1, 1], [-40, 40]) }}
            className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-electric/10 blur-[100px] opacity-50" 
          />
          
          {/* Floating Icons/Elements */}
          <motion.div 
            style={{ x: useTransform(smoothX, [-1, 1], [-20, 20]), y: useTransform(smoothY, [-1, 1], [-30, 10]) }}
            className="absolute top-1/3 left-[20%] opacity-[0.07]"
          >
             <Code size={64} className="text-white rotate-12" />
          </motion.div>
          <motion.div 
            style={{ x: useTransform(smoothX, [-1, 1], [30, -30]), y: useTransform(smoothY, [-1, 1], [20, -50]) }}
            className="absolute bottom-1/4 right-[20%] opacity-[0.07]"
          >
             <Command size={80} className="text-white -rotate-12" />
          </motion.div>
      </div>

      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full flex flex-col items-center"
      >
        {/* Status Badge */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-10"
        >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(0,240,255,0.1)] hover:bg-white/10 transition-colors group cursor-default">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-electric"></span>
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/90 group-hover:text-electric transition-colors">
                    Available for New Projects
                </span>
            </div>
        </motion.div>

        {/* Main Title with Cyber-Kinetic Chromatic Aberration */}
        <div className="relative mb-10 select-none perspective-500 w-full max-w-full">
            {/* Red Channel (Rear) */}
            <motion.div 
                style={{ x: rX, y: rY }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-50 mix-blend-screen"
                aria-hidden="true"
            >
                <h1 className="font-display font-black text-[10vw] sm:text-[12vw] md:text-9xl leading-[0.85] tracking-tighter text-[#FF0055] blur-[1px]">
                    <span className="block">JUNAID</span>
                    <span className="block">PARAMBERI</span>
                </h1>
            </motion.div>

            {/* Cyan Channel (Rear) */}
            <motion.div 
                style={{ x: bX, y: bY }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-50 mix-blend-screen"
                aria-hidden="true"
            >
                <h1 className="font-display font-black text-[10vw] sm:text-[12vw] md:text-9xl leading-[0.85] tracking-tighter text-[#00F0FF] blur-[1px]">
                    <span className="block">JUNAID</span>
                    <span className="block">PARAMBERI</span>
                </h1>
            </motion.div>

            {/* Main White Text (Foreground) */}
            <motion.div style={{ x: moveTextX, y: moveTextY }} className="relative z-10">
                <h1 className="font-display font-black text-[10vw] sm:text-[12vw] md:text-9xl leading-[0.85] tracking-tighter text-white mix-blend-normal drop-shadow-2xl">
                    <span className="block relative">
                         <DecryptText text="JUNAID" delay={200} />
                         {/* Animated Underline decoration */}
                         <motion.div 
                             initial={{ scaleX: 0 }}
                             animate={{ scaleX: 1 }}
                             transition={{ delay: 1.5, duration: 1, ease: "circOut" }}
                             className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-electric to-transparent opacity-70"
                         />
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
                         <DecryptText text="PARAMBERI" delay={1000} />
                    </span>
                </h1>
            </motion.div>
        </div>

        {/* Enhanced Glassmorphic Roles Ticker */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4"
        >
            {[
                { icon: Globe, text: "Digital Product Design" },
                { icon: Zap, text: "Creative Development" },
                { icon: Cpu, text: "Visual Storytelling" }
            ].map((item, i) => (
                <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm transition-all duration-300 group cursor-default shadow-lg hover:shadow-electric/10"
                >
                    <item.icon size={16} className="text-white/40 group-hover:text-electric transition-colors" />
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{item.text}</span>
                </motion.div>
            ))}
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <Magnetic strength={0.3}>
          <a 
            href="#works" 
            onClick={handleScroll}
            className="flex flex-col items-center gap-3 group p-4 opacity-50 hover:opacity-100 transition-opacity duration-500"
          >
            <span className="text-[9px] uppercase tracking-[0.2em] text-white group-hover:text-electric transition-colors">Initialize System</span>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-electric/50 group-hover:shadow-[0_0_20px_var(--color-electric)] transition-all bg-white/5 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-electric/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <ArrowDown size={18} className="text-white group-hover:text-electric relative z-10 transition-colors" />
            </div>
          </a>
        </Magnetic>
      </motion.div>
    </section>
  );
};