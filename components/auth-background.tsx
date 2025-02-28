'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  style: {
    left: string;
    top: string;
    animationDelay: string;
  };
}

export function AuthBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const starCount = 50;
    const generatedStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
      },
    }));
    setStars(generatedStars);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-zinc-900" />
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div key={star.id} className="star" style={star.style} />
        ))}
      </div>
    </div>
  );
}
