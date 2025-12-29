import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Magnetic } from '../UI/Magnetic';
import { Logo } from '../UI/Logo';
import { Sparkles, Menu, X, Disc, Aperture, Layers, Zap, Archive, Hexagon, Activity } from 'lucide-react';

// --- Components ---

const AudioWaveform = () => (
    <div className="flex items-center gap-[2px] h-3 mx-2 opacity-50">
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                className="w-[1.5px] bg-electric rounded-full"
                animate={{ 
                    height: [3, 10, 5, 12, 3],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.1,
                    repeatType: "mirror"
                }}
            />
        ))}
    </div>
);

const NavItem = ({ link, isActive, isHovered, onClick }: any) => {
    return (
        <button
            onClick={onClick}
            className="relative h-9 flex items-center justify-center px-3 z-10 group outline-none"
        >
            {/* Hover Glitch Background */}
            <div className="absolute inset-0 bg-white/5 skew-x-12 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-md" />

            {/* Icon (Visible when collapsed & inactive) */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${!isHovered && !isActive ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
                <link.icon size={14} className="text-white/40" />
            </div>

            {/* Text (Visible when active OR hovered) */}
            <div className={`relative flex flex-col items-center transition-all duration-500 ${isActive || isHovered ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-3 blur-sm'}`}>
                <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap ${isActive ? 'text-midnight' : 'text-white'}`}>
                    {link.name}
                </span>
                {/* Decorative dots for active state */}
                {isActive && (
                    <motion.div 
                        layoutId="active-dot" 
                        className="absolute -bottom-1 w-0.5 h-0.5 bg-midnight rounded-full" 
                    />
                )}
            </div>
        </button>
    );
};

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  const themes = ['default', 'gold', 'crimson'];

  // Scroll Hide Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
      const previous = scrollY.getPrevious() ?? 0;
      if (latest > previous && latest > 150 && !isHovered) {
          setIsHidden(true);
      } else {
          setIsHidden(false);
      }
  });

  // Active Section Spy
  useEffect(() => {
    const handleScroll = () => {
        if (window.location.hash === '#all-works') {
            setActiveSection('all-works');
            return;
        }
        const sections = ['about', 'journey', 'works', 'contact'];
        let current = 'about';
        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                // Trigger when section is in middle of viewport
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    current = section;
                }
            }
        }
        if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextIndex = (themeIndex + 1) % themes.length;
    setThemeIndex(nextIndex);
    const theme = themes[nextIndex];
    if (theme === 'default') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
  };

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');

    if (targetId === 'all-works') {
         window.location.hash = 'all-works';
         setActiveSection('all-works');
         window.scrollTo({ top: 0, behavior: 'smooth' });
         return;
    }
    
    if (window.location.hash === '#all-works') {
        window.location.hash = ''; 
        setTimeout(() => {
            const elem = document.getElementById(targetId);
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        const elem = document.getElementById(targetId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        try { window.history.pushState({}, '', href); } catch (e) {}
    }
    setActiveSection(targetId);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      try { window.location.hash = ''; } catch (e) {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('about');
  };

  const links = [
      { name: 'About', href: '#about', icon: Aperture },
      { name: 'Journey', href: '#journey', icon: Layers },
      { name: 'Works', href: '#works', icon: Zap },
      { name: 'Archives', href: '#all-works', icon: Archive },
      { name: 'Contact', href: '#contact', icon: Activity }
  ];

  return (
    <>
        {/* --- Logo (Fixed Top Left) --- */}
        <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="fixed top-6 left-6 z-50 pointer-events-auto"
        >
            <Magnetic strength={0.2}>
                <a href="#about" onClick={handleLogoClick} className="group relative block">
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Logo className="w-10 h-10 relative z-10 drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                </a>
            </Magnetic>
        </motion.div>

        {/* --- The Nexus Strip (Desktop) --- */}
        <motion.nav 
            variants={{
                visible: { y: 0, filter: "blur(0px)" },
                hidden: { y: -100, filter: "blur(10px)" }
            }}
            initial="visible"
            animate={isHidden ? "hidden" : "visible"}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 right-6 -translate-x-1/2 z-40 hidden md:flex flex-col items-center pointer-events-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* The Main Bar */}
            <motion.div 
                layout
                className="relative flex items-center h-11 p-1 bg-midnight/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] overflow-hidden"
                style={{ borderRadius: 22 }}
            >
                {/* Animated Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                
                {/* Audio Visualizer (System Status) */}
                <div className="pl-3 pr-2 border-r border-white/10 h-4 flex items-center">
                    <AudioWaveform />
                </div>

                {/* Navigation Items */}
                <div className="flex items-center gap-0.5 mx-1">
                    {links.map((link) => {
                        const isActive = activeSection === link.href.replace('#', '');
                        
                        return (
                            <div key={link.name} className="relative">
                                {/* The "Energy Shard" - Active Background (Glow Removed) */}
                                {isActive && (
                                    <motion.div
                                        layoutId="nexus-active"
                                        className="absolute inset-0 bg-gradient-to-r from-electric to-violet rounded-full z-0"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                
                                <NavItem 
                                    link={link}
                                    isActive={isActive}
                                    isHovered={isHovered}
                                    onClick={(e: any) => handleLinkClick(e, link.href)}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Theme Toggle */}
                <div className="pl-1.5 border-l border-white/10 h-4 flex items-center">
                     <button 
                        onClick={toggleTheme}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all ml-1"
                    >
                        <Sparkles size={12} className={themeIndex !== 0 ? "text-electric fill-electric" : ""} />
                    </button>
                </div>

            </motion.div>
            
            {/* Decorative Connection Line to Top of Screen */}
            <motion.div 
                initial={{ height: 0 }}
                animate={{ height: isHidden ? 0 : 24 }}
                className="w-[1px] bg-gradient-to-b from-white/0 to-white/10 absolute -top-6"
            />
        </motion.nav>


        {/* --- Mobile Trigger (Bottom Right) --- */}
        {/* Moving to bottom right allows easier thumb access on large phones and differentiates from standard top-right menus */}
        <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="fixed top-5 right-8   z-50 md:hidden pointer-events-auto"
        >
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="group relative w-14 h-14 rounded-full bg-midnight border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden"
            >
                {/* Button Background Pulse */}
                <div className="absolute inset-0 bg-electric/10 rounded-full scale-0 group-active:scale-150 transition-transform duration-500" />
                
                <div className="relative z-10 text-white group-hover:text-electric transition-colors">
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </div>

                {/* Orbiting Ring */}
                <svg className="absolute inset-0 w-full h-full animate-spin-slow opacity-30 pointer-events-none">
                    <circle cx="50%" cy="50%" r="48%" fill="none" stroke="currentColor" strokeDasharray="4 4" className="text-white" />
                </svg>
            </button>
        </motion.div>

        {/* --- Mobile "Slit Scan" Menu --- */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="fixed inset-0 z-40 bg-midnight/95 backdrop-blur-3xl flex flex-col md:hidden"
                >
                    <div className="flex-1 flex flex-col justify-center px-8 relative overflow-hidden">
                        
                        {/* Background Data Stream */}
                        <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-electric/20 to-transparent" />
                        <div className="absolute top-0 left-8 w-[1px] h-full bg-white/5" />

                        <div className="space-y-8 relative z-10">
                            {links.map((link, i) => {
                                const isActive = activeSection === link.href.replace('#', '');
                                return (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                    >
                                        <a 
                                            href={link.href}
                                            onClick={(e) => handleLinkClick(e, link.href)}
                                            className="block group"
                                        >
                                            <div className="flex items-baseline gap-4 mb-2">
                                                <span className="font-mono text-xs text-electric/50">0{i+1}</span>
                                                <span className={`text-4xl font-display font-black uppercase tracking-tighter transition-all duration-300 ${isActive ? 'text-white translate-x-4' : 'text-white/20 group-hover:text-white'}`}>
                                                    {link.name}
                                                </span>
                                            </div>
                                            {/* Line decoration */}
                                            <div className={`h-[1px] bg-electric transition-all duration-500 ${isActive ? 'w-full opacity-50' : 'w-0 opacity-0 group-hover:w-12 group-hover:opacity-50'}`} />
                                        </a>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Theme Toggles Mobile */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 flex gap-4"
                        >
                            <span className="text-xs font-mono text-white/40 uppercase tracking-widest self-center mr-4">System Theme</span>
                            {themes.map((t, i) => (
                                <button
                                    key={t}
                                    onClick={() => {
                                        setThemeIndex(i);
                                        if (t === 'default') document.documentElement.removeAttribute('data-theme');
                                        else document.documentElement.setAttribute('data-theme', t);
                                    }}
                                    className={`w-8 h-8 rounded border flex items-center justify-center transition-colors ${i === themeIndex ? 'border-electric bg-electric/20 text-electric' : 'border-white/10 text-white/20'}`}
                                >
                                    <Hexagon size={14} className={i === themeIndex ? "fill-current" : ""} />
                                </button>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </>
  );
};