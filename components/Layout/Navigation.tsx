import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from '../UI/Magnetic';
import { Logo } from '../UI/Logo';
import { Menu, X, Palette } from 'lucide-react';

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);

  const themes = ['default', 'gold', 'crimson'];

  const toggleTheme = () => {
    const nextIndex = (themeIndex + 1) % themes.length;
    setThemeIndex(nextIndex);
    const theme = themes[nextIndex];
    
    if (theme === 'default') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
  };

  const links = [
      { name: 'About', href: '#about' },
      { name: 'Journey', href: '#journey' },
      { name: 'Works', href: '#works' },
      { name: 'Visual Lab', href: '#all-works' },
      { name: 'Contact', href: '#contact' }
  ];

  // Handle Active Link Highlighting
  useEffect(() => {
    const handleScroll = () => {
        if (window.location.hash === '#all-works') {
            setActiveSection('all-works');
            return;
        }

        const sections = ['about', 'journey', 'works', 'contact'];
        let current = '';
        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 200 && rect.bottom >= 200) {
                    current = section;
                }
            }
        }
        if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href === '#all-works') {
        window.location.hash = 'all-works';
        setActiveSection('all-works');
        return;
    }

    if (window.location.hash === '#all-works') {
        window.location.hash = ''; 
        setTimeout(() => {
            const targetId = href.replace('#', '');
            const elem = document.getElementById(targetId);
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState({}, '', href);
        } else if (targetId === 'about') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    setActiveSection(href.replace('#', ''));
  };

  const handleLogoClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('about');
  };

  return (
    <>
        {/* Logo - Fixed Top Left */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed top-6 left-6 md:top-8 md:left-10 z-50 pointer-events-auto"
        >
            <Magnetic strength={0.2}>
                <a href="#about" onClick={handleLogoClick} className="block group">
                    <Logo className="w-10 h-10 md:w-14 md:h-14 drop-shadow-[0_0_15px_var(--color-electric)] group-hover:drop-shadow-[0_0_25px_var(--color-violet)] transition-all duration-300" />
                </a>
            </Magnetic>
        </motion.div>

        {/* Desktop Navigation - Fixed Top Right */}
        <motion.nav 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="fixed top-8 right-10 z-40 hidden md:flex items-center gap-4 pointer-events-none"
        >
            {/* Nav Links */}
            <div className="bg-navy/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 flex gap-4 pointer-events-auto shadow-2xl shadow-violet/10">
                {links.map((link) => {
                    const isActive = activeSection === link.href.replace('#', '');
                    return (
                        <Magnetic key={link.name} strength={0.3}>
                            <a 
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors relative group block ${isActive ? 'text-electric' : 'text-white/60 hover:text-electric'}`}
                            >
                                {link.name}
                                <span className={`absolute bottom-1 left-4 right-4 h-[1px] bg-electric transition-all duration-300 ${isActive ? 'w-[calc(100%-2rem)]' : 'w-0 group-hover:w-[calc(100%-2rem)]'}`} />
                            </a>
                        </Magnetic>
                    );
                })}
            </div>

            {/* Theme Toggle */}
            <Magnetic strength={0.2}>
                <button 
                    onClick={toggleTheme}
                    className="w-10 h-10 rounded-full bg-navy/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-electric hover:bg-white/10 transition-all pointer-events-auto shadow-lg active:scale-95"
                    title="Switch Theme"
                >
                    <Palette size={16} />
                </button>
            </Magnetic>
        </motion.nav>

        {/* Mobile Navigation Toggle (Top Right) */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed top-6 right-6 z-50 md:hidden pointer-events-auto flex gap-3"
        >
            <button 
                onClick={toggleTheme}
                className="w-12 h-12 rounded-full bg-navy/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:scale-95 transition-transform shadow-lg"
            >
                <Palette size={20} />
            </button>
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-12 h-12 rounded-full bg-navy/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white active:scale-95 transition-transform shadow-lg"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </motion.div>

        {/* Mobile Fullscreen Menu */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: '-100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '-100%' }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-40 bg-midnight/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
                >
                    <div className="flex flex-col gap-8 text-center">
                        {links.map((link, i) => {
                            const isActive = activeSection === link.href.replace('#', '');
                            return (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <a 
                                        href={link.href}
                                        onClick={(e) => handleLinkClick(e, link.href)}
                                        className={`font-display font-black text-4xl uppercase tracking-tighter ${isActive ? 'text-electric' : 'text-white'}`}
                                    >
                                        {link.name}
                                    </a>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </>
  );
};