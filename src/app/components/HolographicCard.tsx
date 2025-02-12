'use client'

import React, { useState } from 'react';
import Logo from './Logo';
import StatueOfLiberty from './StatueOfLiberty';

const HolographicCard = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [hypotenuse, setHypotenuse] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [audio] = useState(typeof Audio !== 'undefined' ? new Audio('/card-flip.mp3') : null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSpinning) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Calculate rotation (maximum 45 degrees) - account for flipped state
    const rotateX = ((e.clientY - rect.top) / rect.height - 0.5) * -45;
    const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 45;
    
    // Calculate hypotenuse for light effect intensity
    const h = Math.sqrt(Math.pow((x - 50) / 50, 2) + Math.pow((y - 50) / 50, 2));
    
    setMousePosition({ x, y });
    // Add 180 degrees to Y rotation if card is flipped
    setRotation(prev => ({ 
      ...prev, 
      x: rotateX,
      y: rotateY + (isFlipped ? 180 : 0)
    }));
    setHypotenuse(h);
  };

  const handleMouseLeave = () => {
    // Animate rotation back to origin more smoothly
    setRotation(prev => ({ 
      ...prev, 
      x: 0, 
      y: isFlipped ? 180 : 0  // Keep 180 degrees if flipped
    }));
    // Gradually reset other effects
    setMousePosition({ x: 50, y: 50 });
    setHypotenuse(0);
    setIsHovered(false);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isSpinning) {
      setIsSpinning(true);
      setRotation(prev => ({
        ...prev,
        y: prev.y + 360
      }));
      setTimeout(() => setIsSpinning(false), 1200);
    }
  };

  const handleClick = () => {
    // Play sound
    if (audio) {
      audio.currentTime = 0;
      audio.volume = 0.5;
      audio.play().catch(() => {
        console.log('Audio playback failed');
      });
    }

    // Simplified flip logic - always add or subtract 180 degrees
    setIsFlipped(prev => !prev);
    setRotation(() => ({
      x: 0,
      y: isFlipped ? 0 : 180, // Simply toggle between 0 and 180
      z: 0
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-black p-8 relative">
      <div className="w-80 h-[30rem]" style={{ perspective: '1500px' }}>
        <div 
          className="relative w-full h-full rounded-xl cursor-pointer select-none"
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleMouseLeave();
          }}
          style={{
            transformStyle: 'preserve-3d',
            transform: `
              rotateX(${rotation.x}deg)
              rotateY(${rotation.y}deg)
              rotateZ(${rotation.z}deg)
              translateZ(0px)
            `,
            transition: isSpinning 
              ? 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1.5)'
              : 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1.2)', // Same transition for both flip and tilt
          }}
        >
          {/* Card depth/thickness */}
          <div 
            className="absolute inset-0 rounded-xl"
            style={{
              transform: 'translateZ(-4px)',
              background: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(30,30,30,0.9))',
              boxShadow: 'inset 0 0 3px rgba(255,255,255,0.1)',
            }}
          />

          {/* Front of card */}
          <div 
            className="absolute inset-0 rounded-xl"
            style={{
              transform: 'translateZ(0.5px)',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Embossed grid pattern */}
            <div 
              className="absolute inset-0 rounded-xl"
              style={{
                background: `
                  linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px),
                  linear-gradient(0deg, rgba(255,255,255,.03) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
                opacity: 1,
              }}
            />
            
            {/* Card base */}
            <div 
              className="absolute inset-0 rounded-xl"
              style={{
                background: 'linear-gradient(45deg, #000000, #1a1a1a)',
                boxShadow: `
                  inset 0 0 0 1px rgba(255,255,255,0.05),
                  inset 0 0 0 1px rgba(255,255,255,0.025),
                  0 0 ${20 + hypotenuse * 30}px rgba(255, 255, 255, ${0.02 + hypotenuse * 0.05}),
                  0 0 ${40 + hypotenuse * 50}px rgba(255, 161, 158, ${0.01 + hypotenuse * 0.05}),
                  0 0 ${60 + hypotenuse * 70}px rgba(130, 255, 213, ${0.01 + hypotenuse * 0.05}),
                  0 0 ${80 + hypotenuse * 90}px rgba(148, 241, 255, ${0.01 + hypotenuse * 0.05})`,
                animation: 'rgb-shift 10s linear infinite',
                transition: 'box-shadow 3s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            />
            
            {/* Holographic layer */}
            <div 
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{
                background: `
                  repeating-linear-gradient(
                    55deg,
                    rgba(255, 161, 158, 0.5) 0%,
                    rgba(85, 178, 255, 0.5) 20%,
                    rgba(255, 199, 146, 0.5) 40%,
                    rgba(130, 255, 213, 0.5) 60%,
                    rgba(253, 170, 240, 0.5) 80%,
                    rgba(148, 241, 255, 0.5) 100%
                  )
                `,
                backgroundSize: '400% 400%',
                backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                opacity: Math.max(0.1, (1 - hypotenuse) * 0.5),
                mixBlendMode: 'color-dodge',
                transition: 'all 2s cubic-bezier(0.23, 1, 0.32, 1)',
                animation: 'rgb-shift 8s linear infinite',
              }}
            />
            
            {/* Primary shine effect */}
            <div 
              className="absolute inset-0 rounded-xl overflow-hidden"
              style={{
                background: `
                  radial-gradient(
                    circle at ${mousePosition.x}% ${mousePosition.y}%,
                    rgba(255, 255, 255, 0.15) 0%,
                    rgba(255, 255, 255, 0.12) 10%,
                    rgba(255, 255, 255, 0.09) 20%,
                    rgba(255, 255, 255, 0.06) 30%,
                    rgba(255, 255, 255, 0.03) 40%,
                    transparent 50%
                  )
                `,
                opacity: isHovered ? Math.max(0.15, (1 - hypotenuse) * 0.3) : 0,
                mixBlendMode: 'plus-lighter',
                filter: 'blur(8px) brightness(1.5)',
                transition: 'all 2s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            />

            {/* Content */}
            <div className="relative h-full p-5 text-white overflow-hidden hover:scale-[1.01] transform transition-transform duration-700 ease-out">
              {/* Date and Logo at top */}
              <div className="flex flex-row justify-between">
                <span className="text-white font-mono font-semibold uppercase tracking-wider text-[0.625rem] pt-[0.125rem] animate-[fadeIn_0.7s_ease-out_0.1s]">INTERNSHIP</span>
                <Logo />
              </div>

              {/* Statue of Liberty */}
              <div className="absolute -bottom-32 -right-5">
                <StatueOfLiberty 
                  className="text-white h-[40rem] mix-blend-soft-light opacity-10" 
                  style={{
                    filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.3))',
                  }}
                />
              </div>    

              {/* Name and title at bottom */}
              <div className="absolute bottom-8 inset-x-5">
                <div className="flex flex-col my-20">
                  <h2 className="text-5xl bg-gradient-to-r from-white to-gray-600 bg-clip-text text-transparent tracking-tight leading-normal animate-[fadeIn_0.7s_ease-out_0.3s] motion-reduce:animate-none">
                    {/* unkerned heading for comparison*/}
                    {/* <span>floguo</span> */}
                    <span style={{ letterSpacing: '-0.05em' }}>f</span>
                    <span style={{ letterSpacing: '-0.04em' }}>l</span>
                    <span style={{ letterSpacing: '-0.02em' }}>o</span>
                    <span style={{ letterSpacing: '-0.08em' }}>g</span>
                    <span style={{ letterSpacing: '-0.05em' }}>u</span>
                    <span style={{ letterSpacing: '-0.03em' }}>o</span>
                  </h2>
                  <p className="font-mono font-semibold uppercase tracking-wider text-[0.625rem] animate-[fadeIn_0.7s_ease-out_0.4s]">
                    Design Engineering
                  </p>
                </div>
              </div>

              {/* Date at bottom */}
              <div className="absolute bottom-5 inset-x-5">
                <div className="flex flex-row justify-between items-center">
                  <span className="text-white font-mono font-semibold uppercase tracking-wider text-[0.625rem]">
                    Summer 2025
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div 
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              transform: 'rotateY(180deg) translateZ(0.5px)',
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(to bottom, #000000, #111111)',
              boxShadow: `
                inset 0 0 0 1px rgba(255,255,255,0.1),
                inset 0 0 0 2px rgba(255,255,255,0.05),
                0 0 ${20 + hypotenuse * 30}px rgba(255, 255, 255, ${0.02 + hypotenuse * 0.05}),
                0 0 ${40 + hypotenuse * 50}px rgba(255, 161, 158, ${0.01 + hypotenuse * 0.05}),
                0 0 ${60 + hypotenuse * 70}px rgba(130, 255, 213, ${0.01 + hypotenuse * 0.05}),
                0 0 ${80 + hypotenuse * 90}px rgba(148, 241, 255, ${0.01 + hypotenuse * 0.05})`,
                animation: 'rgb-shift 10s linear infinite',
                transition: 'box-shadow 3s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              {/* Radial rays background */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `repeating-conic-gradient(
                    from 0deg,
                    rgba(0, 0, 0, 0) 0deg,
                    rgba(0, 0, 0, 0) 5deg,
                    rgba(255, 255, 255, 0.03) 5deg,
                    rgba(0, 0, 0, 0) 10deg
                  )`,
                  transform: 'scale(2)',
                  transformOrigin: 'center',
                  opacity: 0.2,
                }}
              />
              
              {/* Color gradient overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(120deg, rgba(0, 183, 255, 0.15), rgba(255, 48, 255, 0.15), rgba(255, 198, 0, 0.15))',
                  mixBlendMode: 'overlay',
                }}
              />
              
              {/* Vercel triangle */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Vercel triangle - equilateral */}
                <div 
                  className="w-24 h-24 relative hover:scale-110 transition-transform duration-700"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))',
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(45deg, #fff, #f5f5f5)',
                      clipPath: 'polygon(50% 0%, 100% 86.6%, 0% 86.6%)',
                    }}
                  />
                </div>
              </div>

              {/* Ambient glow */}
              <div 
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  mixBlendMode: 'overlay',
                  animation: 'pulse 4s ease-in-out infinite',
                }}
              />

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float1" style={{ left: '10%', top: '20%' }} />
                <div className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float2" style={{ left: '70%', top: '50%' }} />
                <div className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-float3" style={{ left: '40%', top: '80%' }} />
              </div>
            </div>
          </div>
        </div>

      {/* X link - sticky footer */}
      <a 
        href="https://x.com/floguo" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-4 text-white opacity-30 font-mono font-semibold uppercase tracking-wider text-[0.5rem] hover:opacity-50 transition-opacity duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
      >
        X.COM/FLOGUO
      </a>

      <style jsx global>{`
        @keyframes rgb-shift {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default HolographicCard;