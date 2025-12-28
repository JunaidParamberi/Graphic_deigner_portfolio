import React from 'react';

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 50 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Abstract J shape with circuit node */}
    <path 
      d="M15 10V35C15 40.5228 19.4772 45 25 45C30.5228 45 35 40.5228 35 35V25" 
      stroke="url(#logo_grad_1)" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    
    {/* Interlocking P shape */}
    <path 
      d="M35 10H25C19.4772 10 15 14.4772 15 20" 
      stroke="url(#logo_grad_2)" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    
    {/* Digital Dot Accent */}
    <circle cx="35" cy="15" r="3" style={{ fill: 'var(--color-ice)' }} className="animate-pulse" />
    
    <defs>
      <linearGradient id="logo_grad_1" x1="15" y1="10" x2="35" y2="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%" style={{ stopColor: 'var(--color-electric)', transition: 'stop-color 0.5s ease' }}/>
        <stop offset="100%" style={{ stopColor: 'var(--color-violet)', transition: 'stop-color 0.5s ease' }}/>
      </linearGradient>
      <linearGradient id="logo_grad_2" x1="35" y1="10" x2="15" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" style={{ stopColor: 'var(--color-violet)', transition: 'stop-color 0.5s ease' }}/>
        <stop offset="100%" style={{ stopColor: 'var(--color-electric)', transition: 'stop-color 0.5s ease' }}/>
      </linearGradient>
    </defs>
  </svg>
);