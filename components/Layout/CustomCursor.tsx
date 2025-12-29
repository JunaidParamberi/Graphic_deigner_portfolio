import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [variant, setVariant] = useState('default');
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for the main cursor
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Trail logic
  const [trail, setTrail] = useState<{x: number, y: number, id: number}[]>([]);
  const requestRef = useRef<number>(0);
  const trailRef = useRef<{x: number, y: number}[]>([]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Update main cursor motion values
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);

      // Add point to trail ref for the animation loop
      trailRef.current.push({ x: e.clientX, y: e.clientY });
      if (trailRef.current.length > 20) {
        trailRef.current.shift();
      }
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setVariant('button');
      } else if (target.closest('.project-card')) {
        setVariant('project');
      } else {
        setVariant('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHoverStart);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHoverStart);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mouseX, mouseY]);

  // Trail Animation Loop
  useEffect(() => {
    let idCounter = 0;
    
    const loop = () => {
       setTrail(prev => {
          // Add the latest point from the ref if it moved
          const lastPoint = trailRef.current[trailRef.current.length - 1];
          if (!lastPoint) return prev;

          // Only add a new trail dot if we moved enough (optimization)
          const newTrail = [...prev, { ...lastPoint, id: idCounter++ }];
          
          // Keep trail short
          if (newTrail.length > 12) newTrail.shift();
          return newTrail;
       });
       requestRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); }
  }, []);

  const variants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: "transparent",
      border: "1px solid #00F0FF",
      mixBlendMode: "difference" as any,
    },
    button: {
      height: 64,
      width: 64,
      backgroundColor: "#E0E0FF",
      border: "none",
      mixBlendMode: "difference" as any,
    },
    project: {
      height: 80,
      width: 80,
      backgroundColor: "#B026FF",
      opacity: 0.8,
      border: "none",
      mixBlendMode: "normal" as any,
    }
  };

  return (
    <>
        {/* Main Cursor */}
        <motion.div
            className="hidden md:flex fixed top-0 left-0 z-[9999] pointer-events-none rounded-full items-center justify-center backdrop-blur-sm"
            style={{ x: cursorX, y: cursorY }}
            variants={variants}
            animate={variant}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
            {variant === 'project' && (
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">View</span>
            )}
            
            {/* Inner Core Dot */}
            <div className="absolute w-1 h-1 bg-electric rounded-full" />
        </motion.div>

        {/* Quantum Trail */}
        {trail.map((point, index) => (
            <motion.div
                key={point.id}
                className="hidden md:block fixed top-0 left-0 z-[9998] pointer-events-none rounded-full bg-electric mix-blend-screen"
                style={{ 
                    left: point.x, 
                    top: point.y,
                    width: 4, 
                    height: 4 
                }}
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.5 }}
            />
        ))}
    </>
  );
};