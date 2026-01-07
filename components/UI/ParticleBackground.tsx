import React, { useEffect, useRef } from 'react';

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    
    // Softer, more professional palette (Lower opacity)
    const colors = ['rgba(255, 255, 255, 0.3)', 'rgba(0, 240, 255, 0.2)', 'rgba(176, 38, 255, 0.2)']; 

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        // Very slow, ambient movement
        this.directionX = (Math.random() * 0.2) - 0.1;
        this.directionY = (Math.random() * 0.2) - 0.1;
        this.size = Math.random() * 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (!canvas) return;
        // Wrap around screen instead of bounce for smoother feel
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        this.x += this.directionX;
        this.y += this.directionY;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      // Reduce density for a cleaner look
      const numberOfParticles = (window.innerWidth * window.innerHeight) / 20000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        // Removed line connections for a cleaner, less "tech-demo" look
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};