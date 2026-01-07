
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowDown, Scan, Boxes, Activity, Code, Layers, MousePointer2, Sparkles } from 'lucide-react';
import { Magnetic } from '../UI/Magnetic';

// --- Professional Graphic Design Components ---

const DesignSchematic: React.FC<{ index: number, mouseX: any, mouseY: any }> = ({ index, mouseX, mouseY }) => {
    const Motion = motion as any;
    const x = useTransform(mouseX, [-1, 1], [index * -50, index * 50]);
    const y = useTransform(mouseY, [-1, 1], [index * -40, index * 40]);
    const rotate = useTransform(mouseX, [-1, 1], [index * -10, index * 10]);

    const drawings = [
        // Bezier Path schematic
        <svg width="240" height="240" viewBox="0 0 240 240" className="opacity-15 group-hover:opacity-40 transition-opacity duration-700">
            <path d="M40 120 Q 120 20 200 120 T 360 120" stroke="#00F0FF" strokeWidth="0.5" fill="none" strokeDasharray="4 4" />
            <rect x="38" y="118" width="4" height="4" fill="#00F0FF" />
            <rect x="198" y="118" width="4" height="4" fill="#00F0FF" />
            <circle cx="120" cy="70" r="2" fill="#B026FF" />
            <line x1="120" y1="70" x2="120" y2="120" stroke="#B026FF" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>,
        // Grid System schematic
        <svg width="180" height="180" viewBox="0 0 100 100" className="opacity-10 group-hover:opacity-30 transition-opacity duration-700">
            <rect x="0" y="0" width="100" height="100" stroke="#E0E0FF" strokeWidth="0.1" fill="none" />
            <line x1="0" y1="25" x2="100" y2="25" stroke="#E0E0FF" strokeWidth="0.1" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#E0E0FF" strokeWidth="0.1" />
            <line x1="0" y1="75" x2="100" y2="75" stroke="#E0E0FF" strokeWidth="0.1" />
            <rect x="30" y="30" width="40" height="40" stroke="#B026FF" strokeWidth="0.5" fill="none" />
            <path d="M30 30 L70 70 M70 30 L30 70" stroke="#B026FF" strokeWidth="0.2" />
        </svg>,
        // Color Theory Fragment
        <svg width="120" height="120" viewBox="0 0 100 100" className="opacity-20 group-hover:opacity-50">
            <circle cx="50" cy="50" r="40" stroke="#00F0FF" strokeWidth="0.5" strokeDasharray="5 2" fill="none" />
            <circle cx="50" cy="50" r="10" fill="#B026FF" />
            <path d="M50 10 L50 90 M10 50 L90 50" stroke="#white" strokeWidth="0.1" />
        </svg>
    ];

    const positions = ["top-[15%] right-[12%]", "bottom-[30%] left-[8%]", "top-[42%] left-[10%]"];

    return (
        <Motion.div 
            style={{ x, y, rotateZ: rotate }}
            className={`absolute ${positions[index % positions.length]} z-0 pointer-events-none group`}
        >
            {drawings[index % drawings.length]}
        </Motion.div>
    );
};

const MediaShard: React.FC<{ image: string, index: number, mouseX: any, mouseY: any }> = ({ image, index, mouseX, mouseY }) => {
    const Motion = motion as any;
    const x = useTransform(mouseX, [-1, 1], [index * -25, index * 25]);
    const y = useTransform(mouseY, [-1, 1], [index * -20, index * 20]);
    const rotate = useTransform(mouseX, [-1, 1], [index * -6, index * 6]);
    
    const positions = [
        "top-[12%] left-[10%] w-32 h-44 md:w-52 md:h-72",
        "top-[8%] right-[15%] w-44 h-32 md:w-72 md:h-52",
        "bottom-[20%] left-[15%] w-40 h-40 md:w-60 md:h-60",
        "bottom-[12%] right-[10%] w-32 h-44 md:w-52 md:h-72",
        "top-[35%] right-[2%] w-24 h-32 md:w-44 md:h-56",
    ];

    return (
        <Motion.div 
            style={{ x, y, rotateZ: rotate }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.35, scale: 1 }}
            whileHover={{ opacity: 0.9, scale: 1.05, zIndex: 50 }}
            transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
            className={`absolute ${positions[index % positions.length]} z-0 group project-card pointer-events-auto cursor-none`}
        >
            <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-navy/40 backdrop-blur-md shadow-2xl transition-all duration-700 group-hover:border-electric/50 group-hover:shadow-electric/30">
                <img src={image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-tr from-midnight/60 via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-electric" />
                    <span className="text-[7px] font-mono text-white/40 uppercase tracking-[0.2em]">OBJ_0{index + 1}</span>
                </div>
            </div>
        </Motion.div>
    );
};

const DecryptText: React.FC<{ text: string }> = ({ text }) => {
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
        }, 35);
        
        return () => clearInterval(interval);
    }, [text]);

    return <span>{displayText}</span>;
};

export const Hero = () => {
  const Motion = motion as any;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) * 2 - 1);
    mouseY.set((clientY / innerHeight) * 2 - 1);
  };

  const smoothX = useSpring(mouseX, { damping: 35, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 35, stiffness: 100 });

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const yScroll = useTransform(scrollY, [0, 400], [0, 100]);
  
  const artifacts = [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop",
  ];

  return (
    <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-midnight perspective-1000"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          <Motion.div 
            style={{ 
                x: useTransform(smoothX, [-1, 1], [-180, 180]), 
                y: useTransform(smoothY, [-1, 1], [-180, 180]) 
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-violet/5 rounded-full blur-[180px]"
          />

          {[0, 1, 2].map((i) => (
              <DesignSchematic key={i} index={i} mouseX={smoothX} mouseY={smoothY} />
          ))}
      </div>

      {/* Parallax Artifacts */}
      {artifacts.map((img, i) => (
          <MediaShard key={i} index={i} image={img} mouseX={smoothX} mouseY={smoothY} />
      ))}

      {/* Main Content Area */}
      <Motion.div 
        style={{ opacity, y: yScroll }}
        className="relative z-20 text-center px-4 max-w-7xl mx-auto w-full flex flex-col items-center pointer-events-none"
      >
        {/* Top Tagline */}
        <Motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 md:mb-14"
        >
            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/5 bg-midnight/30 backdrop-blur-3xl shadow-xl">
                <Sparkles size={14} className="text-electric" />
                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/80">
                     WHERE CODE MEETS <span className="text-electric">VISUAL POETRY</span>
                </span>

              
            </div>
        </Motion.div>

        {/* Hero Title - FIXED SIZE & SPACING */}
        <div className="relative mb-16 md:mb-20">
            <Motion.div 
                style={{ 
                    x: useTransform(smoothX, [-1, 1], [-12, 12]),
                    y: useTransform(smoothY, [-1, 1], [-12, 12]),
                }}
            >
                <h1 className="font-display font-black text-[10vw] md:text-9xl lg:text-[9rem] leading-[0.85] tracking-tighter uppercase text-white relative">
                    <span className="block opacity-95 drop-shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
                        <DecryptText text="JUNAID" />
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-electric via-white to-violet bg-300% animate-gradient-shift">
                        <DecryptText text="PARAMBERI" />
                    </span>
                    
                    <div className="absolute -right-8 top-1/2 -translate-y-1/2 rotate-90 hidden xl:block">
                        <span className="text-[9px] font-mono text-white/10 uppercase tracking-[1.2em]">PORTFOLIO_V3.0</span>
                    </div>
                </h1>
            </Motion.div>
        </div>

        {/* REPOSITIONED BADGES - Removed large purple background strip */}
        <Motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
        >
            {[
                { label: 'ENGINEERING', icon: Code, color: 'text-electric' },
                { label: 'MOTION', icon: Activity, color: 'text-violet' },
                { label: 'INTERFACE', icon: MousePointer2, color: 'text-white' }
            ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/5 bg-white/[0.04] backdrop-blur-2xl group pointer-events-auto cursor-none hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300">
                    <item.icon size={16} className={`${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-[10px] font-mono text-white/60 group-hover:text-white tracking-[0.2em] transition-colors">{item.label}</span>
                </div>
            ))}
        </Motion.div>
      </Motion.div>

      {/* Scroll Anchor - Adjusted position for better visibility */}
      <Motion.div 
        className="absolute bottom-6 md:bottom-8 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <Magnetic strength={0.4}>
          <a 
            href="#works" 
            className="flex flex-col items-center gap-4 group p-4 pointer-events-auto cursor-none"
            onClick={(e) => {
                e.preventDefault();
                document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-electric transition-all relative overflow-hidden bg-midnight/40 backdrop-blur-2xl">
              <ArrowDown size={22} className="text-white group-hover:text-electric group-hover:translate-y-1 transition-all" />
              <div className="absolute inset-0 bg-electric/10 scale-0 group-hover:scale-100 transition-transform rounded-full" />
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[8px] font-mono uppercase tracking-[0.5em] text-white/20 group-hover:text-white transition-colors">Initiate Protocol</span>
                <div className="w-px h-8 bg-gradient-to-b from-electric/40 to-transparent mt-2 group-hover:h-12 transition-all duration-500" />
            </div>
          </a>
        </Magnetic>
      </Motion.div>

      {/* HUD Elements Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none p-6 md:p-10 flex flex-col justify-between opacity-30">
          <div className="flex justify-between items-start">
              <Scan size={14} className="text-electric" />
              <Activity size={14} className="text-violet animate-pulse" />
          </div>
          <div className="flex justify-between items-end">
              <div className="text-[8px] font-mono text-white/20 tracking-widest uppercase">System: Stable</div>
              <Boxes size={22} className="text-white/10" />
          </div>
      </div>
    </section>
  );
};
