/**
 * OptimizedImage Component
 * 
 * A wrapper component for Gatsby's image optimization features
 * Automatically selects between GatsbyImage, StaticImage, or regular img tags
 * based on the image source and context
 */
import React from 'react';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';

interface OptimizedImageProps {
  /** Image data from Gatsby's GraphQL query or path */
  image: IGatsbyImageData | string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional CSS class name */
  className?: string;
  /** Optional image loading strategy */
  loading?: 'eager' | 'lazy';
  /** Optional object-fit value */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Optional placeholder type */
  placeholder?: 'blurred' | 'dominant-color' | 'traced-svg' | 'none';
  /** Optional image width */
  width?: number | string;
  /** Optional image height */
  height?: number | string;
  /** Optional callback when image is loaded */
  onLoad?: () => void;
  /** Optional callback when image fails to load */
  onError?: () => void;
}

/**
 * Optimized image component that automatically selects the appropriate
 * image component based on the provided image data
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  image,
  alt,
  className = '',
  loading = 'lazy',
  objectFit = 'cover',
  placeholder = 'blurred',
  width,
  height,
  onLoad,
  onError,
}) => {
  // Handle Gatsby image data
  if (typeof image !== 'string') {
    const gatsbyImage = getImage(image);
    
    if (gatsbyImage) {
      return (
        <GatsbyImage
          image={gatsbyImage}
          alt={alt}
          className={className}
          imgClassName={`object-${objectFit}`}
          loading={loading}
          onLoad={onLoad}
          onError={onError}
        />
      );
    }
  }
  
  // Handle string URLs and fallbacks
  const style: React.CSSProperties = {
    objectFit,
    width: width || '100%',
    height: height || '100%',
  };
  
  return (
    <img
      src={typeof image === 'string' ? image : ''}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default OptimizedImage;
