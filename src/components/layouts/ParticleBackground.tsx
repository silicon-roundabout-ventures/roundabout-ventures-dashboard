import React, { useRef, useEffect } from 'react';
import ClientOnly from './ClientOnly';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

// The actual particle background implementation
const ParticleBackgroundContent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Check if we're in a browser environment
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reset particles when resizing
      initParticles();
    };
    
    // Check if device is mobile or has reduced motion preference
    const isMobileDevice = () => window.innerWidth < 768;
    const prefersReducedMotion = () => 
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize particles - optimize for mobile
    const initParticles = () => {
      particles = [];
      // Reduce particle count for mobile devices and respect user preference for reduced motion
      const isLowPower = isMobileDevice() || prefersReducedMotion();
      const particleCount = isLowPower 
        ? Math.min(window.innerWidth / 20, 40) // Significantly fewer particles for mobile
        : Math.min(window.innerWidth / 9, 150); // Regular count for desktop
      
      const particleSpeed = isLowPower ? 0.5 : 0.9; // Slower movement on mobile
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (isLowPower ? 2.5 : 3.5) + 0.5, // Slightly smaller particles on mobile
          speedX: (Math.random() - 0.5) * particleSpeed,
          speedY: (Math.random() - 0.5) * particleSpeed,
          // Use code editor theme colors for particles with slightly higher intensity
          color: Math.random() > 0.7 ? '#61AFEF' : Math.random() > 0.5 ? '#56B6C2' : Math.random() > 0.3 ? '#C678DD' : '#546E7A',
          opacity: Math.random() * 0.5 + 0.2 // Higher opacity for better visibility
        });
      }
    };
    
    // Draw particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw each particle
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Check boundaries and reverse direction if needed
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
        
        // Draw the particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
        
        // Connect nearby particles with lines
        connectParticles(particle, i);
      });
    };
    
    // Connect particles with lines if they're close enough - optimized for performance
    const connectParticles = (particle: Particle, index: number) => {
      // Skip some connections on mobile to improve performance
      const isMobile = isMobileDevice();
      const connectionDistance = isMobile ? 100 : 130;
      const skipFactor = isMobile ? 2 : 1; // Skip every other particle on mobile for connections
      
      for (let j = index + skipFactor; j < particles.length; j += skipFactor) {
        const otherParticle = particles[j];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(167, 167, 167, ${0.4 * (1 - distance / connectionDistance)})`;
          ctx.lineWidth = isMobile ? 0.5 : 1; // Thinner lines on mobile
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    };
    
    // Animation loop with throttling for mobile
    let lastTime = 0;
    const frameInterval = isMobileDevice() ? 1000/30 : 1000/60; // Lower FPS on mobile (30fps vs 60fps)
    
    const animate = (timestamp = 0) => {
      const deltaTime = timestamp - lastTime;
      
      if (deltaTime >= frameInterval) {
        lastTime = timestamp - (deltaTime % frameInterval);
        drawParticles();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize and start the animation
    handleResize();
    window.addEventListener('resize', handleResize);
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="particles-container fixed inset-0 w-full h-full pointer-events-none">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0"
        style={{ 
          opacity: 1, // Full opacity for the canvas
          zIndex: -1
        }}
      />
    </div>
  );
};

// Main component that uses ClientOnly to prevent SSR issues
const ParticleBackground = () => {
  return (
    <ClientOnly fallback={<div className="particles-container" />}>
      <ParticleBackgroundContent />
    </ClientOnly>
  );
};

export default ParticleBackground;
