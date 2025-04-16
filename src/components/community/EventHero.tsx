import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

interface EventHeroProps {
  className?: string;
}

const EventHero: React.FC<EventHeroProps> = ({ className }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: {relativePath: {regex: "/community/events/.*\\\\.(png|jpg|jpeg)$/"}}) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(
                width: 1200
                quality: 90
                placeholder: BLURRED
                formats: [AUTO, WEBP]
              )
            }
          }
        }
      }
    }
  `);

  // Define a type for our image data
  type ImageData = {
    path: string;
    gatsbyImage: any; // Using any here since the GatsbyImage type is complex
  };

  // Extract images from the query result
  const images: ImageData[] = data.allFile.edges.map(({ node }: any) => ({
    path: node.relativePath,
    gatsbyImage: getImage(node)
  }));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Images will transition every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return; // Don't set up transitions if we only have one image
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) {
    return <div className={`relative w-full h-[50vh] bg-black/30 ${className}`} />;
  }

  return (
    <div className={`relative w-full h-[50vh] overflow-hidden rounded-lg ${className}`}>
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent z-10" />
      
      {/* Images */}
      {images.map((image: ImageData, index: number) => (
        <div
          key={image.path}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentImageIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {image.gatsbyImage && (
            <GatsbyImage
              image={image.gatsbyImage}
              alt={`Community event ${index + 1}`}
              className="w-full h-full"
              objectFit="cover"
              objectPosition="center"
            />
          )}
        </div>
      ))}
      
      {/* Navigation dots - only show if there's more than one image */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {images.map((_: ImageData, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentImageIndex === index 
                  ? 'bg-srv-teal w-4' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventHero;
