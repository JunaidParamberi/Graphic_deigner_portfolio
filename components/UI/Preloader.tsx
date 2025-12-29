import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const WORDS = ["IGNITING", "SYNCHRONIZING", "ASSEMBLING", "RENDERING", "ONLINE"];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isExit, setIsExit] = useState(false);

  useEffect(() => {
    // Non-linear loading simulation
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Random jump
        const jump = Math.floor(Math.random() * 5) + 1;
        const next = prev + jump;
        
        // Update text based on progress milestones
        if (next > 20 && next < 40) setTextIndex(1);
        if (next > 40 && next < 60) setTextIndex(2);
        if (next > 60 && next < 80) setTextIndex(3);
        if (next >= 90) setTextIndex(4);

        return next > 100 ? 100 : next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 100) {
      // Trigger exit animation sequence
      const exitTimer = setTimeout(() => {
          setIsExit(true);
          // Complete after animation
          setTimeout(onComplete, 1000); 
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [count, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-midnight flex items-center justify-center overflow-hidden cursor-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
        {/* Background Noise/Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        {/* The Singularity Container */}
        <div className="relative flex flex-col items-center justify-center z-10">
            
            {/* 1. The Core (Sun) */}
            <motion.div
                animate={isExit ? { scale: 50, opacity: 0 } : { scale: [1, 1.1, 1] }}
                transition={isExit ? { duration: 0.8, ease: "circIn" } : { repeat: Infinity, duration: 2 }}
                className="relative w-4 h-4 md:w-6 md:h-6 bg-white rounded-full shadow-[0_0_60px_20px_rgba(0,240,255,0.4)] z-20"
            >
                 <div className="absolute inset-0 bg-electric blur-md rounded-full" />
            </motion.div>

            {/* 2. Orbital Rings */}
            {!isExit && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Ring 1 - Progress */}
                    <svg className="w-64 h-64 md:w-80 md:h-80 -rotate-90 transform">
                        <circle 
                            cx="50%" cy="50%" r="48%" 
                            fill="none" 
                            stroke="#1A1A2E" 
                            strokeWidth="1" 
                        />
                        <motion.circle 
                            cx="50%" cy="50%" r="48%" 
                            fill="none" 
                            stroke="url(#gradient)" 
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: count / 100 }}
                            transition={{ duration: 0.1, ease: "linear" }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#00F0FF" />
                                <stop offset="100%" stopColor="#B026FF" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Ring 2 - Decoration Spinner */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-white/5 rounded-full w-48 h-48 md:w-60 md:h-60 m-auto border-t-electric/20 border-r-transparent"
                    />
                    
                    {/* Ring 3 - Counter Spinner */}
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-white/5 rounded-full w-32 h-32 md:w-40 md:h-40 m-auto border-b-violet/30 border-l-transparent"
                    />
                </div>
            )}

            {/* 3. Typography */}
            {!isExit && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute mt-32 md:mt-40 text-center"
                >
                    <div className="overflow-hidden h-8 mb-2">
                         <motion.div
                            key={textIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="font-mono text-xs md:text-sm text-electric/80 uppercase tracking-[0.3em]"
                         >
                            {WORDS[textIndex]}
                         </motion.div>
                    </div>
                    
                    <div className="font-display font-bold text-4xl md:text-6xl text-white tracking-tighter tabular-nums">
                        {count}%
                    </div>
                </motion.div>
            )}

        </div>

        {/* 4. Supernova Flash Layer (White-out) */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={isExit ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.6 }}
            className="absolute inset-0 bg-white z-[10000] pointer-events-none"
        />

        {/* 5. Corner Accents */}
        {!isExit && (
            <>
                <div className="absolute top-10 left-10 text-[10px] font-mono text-white/20">
                    LAT: 24.4539° N <br/>
                    LNG: 54.3773° E
                </div>
                <div className="absolute bottom-10 right-10 text-[10px] font-mono text-white/20 text-right">
                    MEMORY: 64TB <br/>
                    STATUS: OPTIMAL
                </div>
            </>
        )}

    </motion.div>
  );
};