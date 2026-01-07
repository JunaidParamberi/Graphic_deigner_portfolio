
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Zap, Hexagon, Circle, Square } from 'lucide-react';

const ARTIFACTS = [
    { type: 'circle', color: 'bg-electric', icon: Circle, label: 'UI_NODE' },
    { type: 'square', color: 'bg-violet', icon: Square, label: 'BLOCK_DATA' },
    { type: 'triangle', color: 'bg-white', icon: Zap, label: 'SIGNAL' },
    { type: 'hexagon', color: 'bg-electric/40', icon: Hexagon, label: 'ARCH_STRUCT' },
];

export const DesignGame = () => {
    const Motion = motion as any;
    const [elements, setElements] = useState<{ id: number, x: number, y: number, type: number }[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const spawnElement = (e?: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e ? e.clientX - rect.left : Math.random() * rect.width;
        const y = e ? e.clientY - rect.top : -100;

        setElements(prev => [
            ...prev, 
            { id: Date.now(), x, y, type: Math.floor(Math.random() * ARTIFACTS.length) }
        ].slice(-15)); // Keep only last 15 elements for performance
    };

    const clearCanvas = () => setElements([]);

    return (
        <section id="playground" className="relative h-[80vh] w-full bg-midnight py-20 overflow-hidden border-y border-white/5">
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[size:30px_30px]" />
            
            <div className="max-w-7xl mx-auto px-6 h-full flex flex-col items-center justify-between relative z-10 pointer-events-none">
                <div className="text-center">
                    <span className="text-electric font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block">Interactive Laboratory</span>
                    <h2 className="font-display font-black text-5xl md:text-7xl text-white tracking-tighter uppercase">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-violet">Design Sandbox</span>
                    </h2>
                    <p className="text-white/40 text-xs md:text-sm font-mono mt-4 max-w-md mx-auto uppercase tracking-widest">
                        Click anywhere to inject design data into the gravity field.
                    </p>
                </div>

                <div className="flex gap-4 pointer-events-auto">
                    <button 
                        onClick={() => spawnElement()}
                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white uppercase tracking-widest hover:bg-electric hover:text-midnight transition-all"
                    >
                        <Zap size={14} /> Inject Data
                    </button>
                    <button 
                        onClick={clearCanvas}
                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white uppercase tracking-widest hover:bg-white hover:text-midnight transition-all"
                    >
                        <RefreshCw size={14} /> Reset Field
                    </button>
                </div>
            </div>

            <div 
                ref={containerRef}
                onClick={spawnElement}
                className="absolute inset-0 z-0 cursor-none"
            >
                <AnimatePresence>
                    {elements.map((el) => {
                        const artifact = ARTIFACTS[el.type];
                        return (
                            <Motion.div
                                key={el.id}
                                initial={{ opacity: 0, scale: 0, x: el.x - 25, y: el.y - 25 }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: 1,
                                    y: window.innerHeight * 0.7, // Simulated gravity
                                    rotateZ: Math.random() * 360
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ 
                                    type: "spring", 
                                    damping: 15, 
                                    stiffness: 40,
                                    duration: 2 
                                }}
                                drag
                                dragConstraints={containerRef}
                                className={`absolute w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center rounded-2xl border border-white/10 ${artifact.color} bg-opacity-10 backdrop-blur-md cursor-grab active:cursor-grabbing shadow-2xl`}
                            >
                                <artifact.icon className="text-white mb-2" size={24} />
                                <span className="text-[6px] font-mono text-white/40 uppercase tracking-tighter">{artifact.label}</span>
                                
                                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-electric animate-pulse" />
                            </Motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Ambient Labels */}
            <div className="absolute top-10 left-10 pointer-events-none opacity-20 font-mono text-[8px] text-white space-y-2">
                <div>PHYSICS_ENGINE: ACTIVE</div>
                <div>ENTITY_COUNT: {elements.length}</div>
                <div>GRAVITY: 9.81 m/s²</div>
            </div>
        </section>
    );
};
