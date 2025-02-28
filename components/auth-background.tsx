'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  style: {
    left: string;
    top: string;
    width: string;
    height: string;
    opacity: string;
    animationDelay: string;
    animationDuration: string;
  };
}

export function AuthBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const starCount = 100; // Increased star count
    const generatedStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        // Random sizes for stars
        width: `${Math.max(1, Math.random() * 3)}px`,
        height: `${Math.max(1, Math.random() * 3)}px`,
        opacity: `${Math.max(0.2, Math.random() * 0.7)}`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${Math.random() * 20 + 10}s`, // Longer animation duration
      },
    }));
    setStars(generatedStars);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-indigo-950/30" />
      
      {/* Add subtle glow effects */}
      <div className="absolute top-1/3 -left-1/4 size-1/2 bg-indigo-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/3 -right-1/4 size-1/2 bg-purple-500/10 blur-[120px] rounded-full" />
      
      {/* Stars with enhanced styling */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div 
            key={star.id} 
            className="absolute rounded-full bg-white animate-twinkle" 
            style={star.style} 
          />
        ))}
      </div>
      
      {/* Add subtle grid lines for depth - Fixed conflicting classnames */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(to right, #8882 1px, transparent 1px), linear-gradient(to bottom, #8882 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
