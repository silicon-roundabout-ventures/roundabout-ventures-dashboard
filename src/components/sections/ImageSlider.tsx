import React from 'react';

interface HeroBackgroundProps {
  className?: string;
}

// Simple background component using CSS background
const HeroBackground: React.FC<HeroBackgroundProps> = ({ className }) => {
  return (
    <div className={`relative w-full h-[50vh] overflow-hidden rounded-lg ${className}`}>
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent z-10" />
      
      {/* CSS Background approach */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/community/events/build15.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
    </div>
  );
};

export default HeroBackground;
