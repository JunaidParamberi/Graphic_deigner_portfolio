import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [variant, setVariant] = useState('default');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
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
    };
  }, [mouseX, mouseY]);

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
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center backdrop-blur-sm"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      variants={variants}
      animate={variant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      {variant === 'project' && (
        <span className="text-white text-[10px] font-bold uppercase tracking-widest">View</span>
      )}
    </motion.div>
  );
};