import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Adjust speed here

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (count === 100) {
      // Small delay before triggering completion to let user see 100%
      const timeout = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [count, onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[1000] bg-midnight flex items-center justify-center overflow-hidden"
    >
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-chrome-gradient opacity-5 mix-blend-screen" />
        
        <div className="relative z-10 flex flex-col items-center">
             <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-white/40 font-mono text-sm uppercase tracking-widest mb-4"
             >
                System Loading
             </motion.div>
             
             <div className="text-8xl md:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                {count}%
             </div>

             <motion.div 
                className="w-64 h-1 bg-white/10 mt-8 rounded-full overflow-hidden"
             >
                <motion.div 
                    className="h-full bg-electric"
                    initial={{ width: 0 }}
                    animate={{ width: `${count}%` }}
                />
             </motion.div>
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5" />
            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/5" />
        </div>
    </motion.div>
  );
};