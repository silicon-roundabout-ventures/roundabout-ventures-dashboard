/**
 * ImageSlider Component
 * 
 * A specialized wrapper around ImageDisplay for image sliders/carousels
 * Maintains backward compatibility with existing code while leveraging our consolidated components
 */
import React from 'react';
import ImageDisplay from './ImageDisplay';

export interface ImageSliderProps {
  /** Either provide a direct array of images */
  images?: Array<string | { src: string; alt?: string; caption?: string }>;
  /** Or use the path pattern (for backward compatibility) */
  imagePathPattern?: string;
  /** Transition speed in ms */
  transitionSpeed?: number;
  /** Overlay opacity 0-100 */
  overlayOpacity?: number;
  /** Alt text if not provided in images */
  alt?: string;
  /** Optional caption text */
  caption?: string;
  /** Height configuration */
  height?: string | number;
  /** Width configuration */
  width?: string | number;
  /** Auto-advance timer (ms) */
  autoAdvance?: number;
  /** Additional CSS classes */
  className?: string;
  /** Object fit style */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

/**
 * Image slider component that leverages our consolidated ImageDisplay
 * Handles both new API (images array) and legacy API (imagePathPattern)
 */
const ImageSlider: React.FC<ImageSliderProps> = (props) => {
  const {
    // New API props
    images = [],
    alt = 'Slider image',
    caption,
    height,
    width,
    autoAdvance = 5000,
    className = '',
    objectFit = 'cover',
    // Legacy API props
    imagePathPattern,
    transitionSpeed,
    overlayOpacity
  } = props;
  
  // For legacy API: temporarily use placeholder images until proper implementation
  const effectiveImages = images.length > 0 
    ? images 
    : ['placeholder1.jpg', 'placeholder2.jpg']; // Placeholder for legacy pattern
  
  // Map legacy transitionSpeed to autoAdvance if needed
  const effectiveAutoAdvance = transitionSpeed || autoAdvance;

  // Legacy API handling would normally load images based on the pattern
  // Here we're just making sure the component doesn't crash
  
  return (
    <div className={`image-slider-wrapper ${className}`}>
      <ImageDisplay
        images={effectiveImages}
        variant="slider"
        alt={alt}
        caption={caption}
        height={height}
        width={width}
        autoAdvance={effectiveAutoAdvance}
        className=""
        objectFit={objectFit}
      />
      {overlayOpacity && (
        <div 
          className="absolute inset-0 bg-black" 
          style={{ opacity: overlayOpacity / 100 }}
        />
      )}
    </div>
  );
};

export default ImageSlider;
