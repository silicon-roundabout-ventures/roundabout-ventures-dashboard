import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

interface ImageSliderProps {
  /** Pattern to match image paths (regex pattern as string) */
  imagePathPattern: string;
  /** Transition speed in milliseconds */
  transitionSpeed?: number;
  /** Overlay opacity (0-100) */
  overlayOpacity?: number;
  /** Custom class names */
  className?: string;
  /** Whether to include a loading indicator */
  showLoadingIndicator?: boolean;
  /** Custom loading text */
  loadingText?: string;
  /** Image quality (1-100) */
  imageQuality?: number;
  /** Max width for images */
  imageWidth?: number;
  /** Image placeholder type */
  placeholder?: 'dominantColor' | 'tracedSVG' | 'blurred' | 'none';
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  imagePathPattern,
  transitionSpeed = 5000,
  overlayOpacity = 50,
  className = '',
  showLoadingIndicator = false,
  loadingText = 'Loading images...',
  imageQuality = 90,
  imageWidth = 1200,
  placeholder = 'blurred',
}) => {
  // Validate inputs
  const opacity = Math.min(Math.max(overlayOpacity, 0), 100);
  const speed = Math.max(transitionSpeed, 1000);
  
  // Query for matching images based on the provided pattern
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: {relativePath: {regex: "/.*jpg|.*jpeg|.*png|.*webp/"}}, sort: {name: ASC}) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(width: 1200, quality: 90, placeholder: BLURRED)
            }
          }
        }
      }
    }
  `);
  
  // Filter images based on the provided pattern
  const regex = new RegExp(imagePathPattern);
  const matchingImages = data.allFile.edges
    .filter(({ node }: any) => regex.test(node.relativePath))
    .map(({ node }: any) => 
      node.childImageSharp ? getImage(node) : null
    )
    .filter(Boolean);
  
  // State for the current image in the slider
  const [currentImage, setCurrentImage] = useState(0);
  
  // Set up auto-rotation for slider
  useEffect(() => {
    if (matchingImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % matchingImages.length);
    }, speed);
    
    return () => clearInterval(interval);
  }, [matchingImages.length, speed]);

  if (matchingImages.length === 0) {
    return <div className={`relative w-full h-full bg-black/${opacity} ${className}`} />;
  }

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Slider Images */}
      {matchingImages.map((image: any, index: number) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            currentImage === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {image && (
            <GatsbyImage
              image={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full"
              objectFit="cover"
              objectPosition="center"
            />
          )}
        </div>
      ))}
      
      {/* Overlay for better text readability */}
      <div className={`absolute inset-0 bg-black/${opacity} z-10`} />
      
      {/* Loading indicator */}
      {showLoadingIndicator && (
        <div className="absolute inset-x-0 top-0 flex justify-center pt-6 z-20 pointer-events-none">
          <div className="animate-pulse-slow text-srv-teal bg-black/70 px-6 py-3 rounded-lg backdrop-blur-sm">
            {loadingText}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
