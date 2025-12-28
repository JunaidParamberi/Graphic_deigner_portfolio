import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed right-0 top-0 bottom-0 w-1.5 z-50 flex flex-col justify-center pointer-events-none hidden md:flex">
      <div className="h-[40vh] w-[1px] bg-white/10 relative">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-electric to-violet origin-top"
          style={{ scaleY, height: '100%' }}
        />
      </div>
    </div>
  );
};