
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export const CustomCursor = () => {
  const Motion = motion as any;
  const [variant, setVariant] = useState('default');
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [trail, setTrail] = useState<{x: number, y: number, id: number}[]>([]);
  const requestRef = useRef<number>(0);
  const trailRef = useRef<{x: number, y: number}[]>([]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);

      trailRef.current.push({ x: e.clientX, y: e.clientY });
      if (trailRef.current.length > 15) {
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

  useEffect(() => {
    let idCounter = 0;
    
    const loop = () => {
       setTrail(prev => {
          const lastPoint = trailRef.current[trailRef.current.length - 1];
          if (!lastPoint) return prev;

          const newTrail = [...prev, { ...lastPoint, id: idCounter++ }];
          if (newTrail.length > 8) newTrail.shift();
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
      height: 110,
      width: 110,
      backgroundColor: "#B026FF",
      opacity: 0.95,
      border: "none",
      mixBlendMode: "normal" as any,
    }
  };

  return (
    <>
        <Motion.div
            className="hidden md:flex fixed top-0 left-0 z-[9999] pointer-events-none rounded-full items-center justify-center backdrop-blur-md"
            style={{ x: cursorX, y: cursorY }}
            variants={variants}
            animate={variant}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
            <AnimatePresence mode="wait">
                {variant === 'project' && (
                    <Motion.span 
                        initial={{ opacity: 0, y: 8, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.8 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="text-white text-[11px] font-display font-black uppercase tracking-[0.3em]"
                    >
                        View
                    </Motion.span>
                )}
            </AnimatePresence>
            
            <div className="absolute w-1.5 h-1.5 bg-electric rounded-full shadow-[0_0_10px_#00F0FF]" />
        </Motion.div>

        {trail.map((point) => (
            <Motion.div
                key={point.id}
                className="hidden md:block fixed top-0 left-0 z-[9998] pointer-events-none rounded-full bg-electric mix-blend-screen"
                style={{ 
                    left: point.x, 
                    top: point.y,
                    width: 2.5, 
                    height: 2.5 
                }}
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.4 }}
            />
        ))}
    </>
  );
};
