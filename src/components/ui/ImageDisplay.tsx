/**
 * ImageDisplay Component
 * 
 * A unified image component with multiple variants:
 * - slider: For image carousels/sliders
 * - hero: For large hero images
 * - gallery: For image galleries
 * - tech: For technology logo displays with motion
 */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

// Simplified optimized image component without external dependencies
const OptimizedImage = ({ src, alt, objectFit, className, onLoad, onClick }: { 
  src: string; 
  alt: string; 
  objectFit: 'cover' | 'contain' | 'fill' | 'none'; 
  className?: string; 
  onLoad?: () => void; 
  onClick?: () => void;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('transition-opacity duration-300', className)}
      style={{ objectFit }}
      onLoad={onLoad}
      onClick={onClick}
      loading="lazy"
    />
  );
};

export interface ImageDisplayProps {
  /** Array of image sources or objects */
  images: Array<string | { src: string; alt?: string; caption?: string }>;
  /** Component variant */
  variant?: 'standard' | 'slider' | 'hero' | 'gallery' | 'tech';
  /** Alt text if not provided in images */
  alt?: string;
  /** Optional caption text */
  caption?: string;
  /** Height configuration */
  height?: string | number;
  /** Width configuration */
  width?: string | number;
  /** Auto-advance timer (ms) for sliders */
  autoAdvance?: number;
  /** Function to call when an image is clicked */
  onImageClick?: (index: number) => void;
  /** Additional CSS classes */
  className?: string;
  /** Object fit style */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  /** Optional overlay content */
  overlay?: React.ReactNode;
}

/**
 * Unified image display component with multiple variants
 */
export function ImageDisplay({
  images,
  variant = 'standard',
  alt = 'Image',
  caption,
  height,
  width,
  autoAdvance = 0,
  onImageClick,
  className = '',
  objectFit = 'cover',
  overlay
}: ImageDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Format images array to standardized format
  const formattedImages = images.map(img => 
    typeof img === 'string' ? { src: img, alt } : img
  );
  
  // Auto-advance functionality for sliders
  useEffect(() => {
    if (autoAdvance <= 0 || isHovering || variant !== 'slider') return;
    
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % formattedImages.length);
    }, autoAdvance);
    
    return () => clearInterval(timer);
  }, [autoAdvance, formattedImages.length, isHovering, variant]);
  
  // Navigation handlers
  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % formattedImages.length);
  };
  
  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + formattedImages.length) % formattedImages.length);
  };
  
  // Handle image click
  const handleImageClick = (index: number) => {
    if (onImageClick) {
      onImageClick(index);
    }
  };
  
  // Base styles based on variant
  const baseStyles = {
    standard: 'relative overflow-hidden rounded-lg',
    slider: 'relative overflow-hidden rounded-lg',
    hero: 'relative w-full overflow-hidden rounded-lg',
    gallery: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4',
    tech: 'relative overflow-hidden'
  };
  
  // Tech slider animation
  if (variant === 'tech') {
    return (
      <div 
        className={cn('w-full overflow-hidden', className)} 
        style={{ height: height || 'auto' }}
      >
        <div
          className="flex items-center gap-8 animate-marquee"
          style={{
            animation: 'marquee 20s linear infinite',
          }}
        >
          {/* Double the images for continuous loop effect */}
          {[...formattedImages, ...formattedImages].map((image, i) => (
            <div 
              key={`${image.src}-${i}`}
              className="flex-shrink-0 h-16 w-16 flex items-center justify-center"
            >
              <OptimizedImage
                src={image.src}
                alt={image.alt || 'Technology logo'}
                objectFit="contain"
                className="max-h-full max-w-full"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Gallery layout
  if (variant === 'gallery') {
    return (
      <div className={cn(baseStyles.gallery, className)}>
        {formattedImages.map((image, i) => (
          <div 
            key={`${image.src}-${i}`}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handleImageClick(i)}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt || `Gallery image ${i+1}`}
              objectFit={objectFit}
              className="w-full h-full transition-transform duration-300 hover:scale-105"
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  
  // Hero, slider, or standard layout
  return (
    <div
      ref={containerRef}
      className={cn(baseStyles[variant], className)}
      style={{ 
        height: height || (variant === 'hero' ? '500px' : '300px'),
        width: width || '100%'
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main image */}
      <OptimizedImage
        src={formattedImages[currentIndex].src}
        alt={formattedImages[currentIndex].alt || alt}
        objectFit={objectFit}
        className={cn(
          'w-full h-full transition-opacity duration-300',
          { 'cursor-pointer': !!onImageClick }
        )}
        onLoad={() => {}}
        onClick={() => handleImageClick(currentIndex)}
      />
      
      {/* Overlay content */}
      {overlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          {overlay}
        </div>
      )}
      
      {/* Caption */}
      {(caption || formattedImages[currentIndex].caption) && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
          {formattedImages[currentIndex].caption || caption}
        </div>
      )}
      
      {/* Navigation arrows for slider */}
      {variant === 'slider' && formattedImages.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          
          {/* Pagination indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {formattedImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors',
                  currentIndex === i ? 'bg-white' : 'bg-white/50'
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageDisplay;
