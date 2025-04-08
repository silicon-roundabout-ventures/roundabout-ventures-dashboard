
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
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
    
    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(window.innerWidth / 10, 120); // Match the 120 value from GitHub
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 0.5,
          speedX: (Math.random() - 0.5) * 0.9,
          speedY: (Math.random() - 0.5) * 0.9,
          color: '#a7a7a7', // Match the color from GitHub
          opacity: Math.random() * 0.5 + 0.1
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
        ctx.fillStyle = `rgba(167, 167, 167, ${particle.opacity})`;
        ctx.fill();
        
        // Connect nearby particles with lines - using 130px distance as in GitHub
        connectParticles(particle, i);
      });
    };
    
    // Connect particles with lines if they're close enough
    const connectParticles = (particle: Particle, index: number) => {
      for (let j = index + 1; j < particles.length; j++) {
        const otherParticle = particles[j];
        const distance = Math.sqrt(
          Math.pow(particle.x - otherParticle.x, 2) +
          Math.pow(particle.y - otherParticle.y, 2)
        );
        
        if (distance < 130) { // Match the 130 distance from GitHub
          ctx.beginPath();
          ctx.strokeStyle = `rgba(167, 167, 167, ${0.4 * (1 - distance / 130)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      drawParticles();
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
    <div className="particles-container">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0"
        style={{ 
          opacity: 0.9,
          zIndex: 1
        }}
      />
    </div>
  );
};

export default ParticleBackground;
