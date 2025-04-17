import React from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

type CircularImageBaseProps = {
  alt: string;
  size?: number; // Size in pixels
  className?: string;
  borderColor?: string;
  objectPosition?: string; // Control image focus point
};

type CircularImageProps = CircularImageBaseProps & (
  | { image: IGatsbyImageData; imageSrc?: undefined; initials?: undefined }
  | { imageSrc: string; image?: undefined; initials?: undefined }
  | { initials: string; image?: undefined; imageSrc?: undefined }
  | { image?: undefined; imageSrc?: undefined; initials?: undefined }
);

/**
 * A component to display circular images consistently throughout the site
 * Handles sizing, border styling, and image fitting in one component
 * Works with GatsbyImage, standard <img>, or falls back to initials
 */
export function CircularImage({
  image,
  imageSrc,
  initials,
  alt,
  size = 160,
  className = '',
  borderColor = 'border-white/20',
  objectPosition = 'center center'
}: CircularImageProps) {
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    minWidth: `${size}px`,
    minHeight: `${size}px`
  };

  return (
    <div
      className={`rounded-full overflow-hidden bg-srv-dark border ${borderColor} ${className}`}
      style={containerStyle}
    >
      {image ? (
        <GatsbyImage
          image={image}
          alt={alt}
          className="w-full h-full"
          imgClassName="w-full h-full object-cover"
          style={{ objectPosition }}
        />
      ) : imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ objectPosition }}
        />
      ) : initials ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-800 text-3xl font-bold text-white">
          {initials}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-800"></div>
      )}
    </div>
  );
}

