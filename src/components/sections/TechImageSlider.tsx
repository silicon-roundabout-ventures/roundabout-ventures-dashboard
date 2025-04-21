import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

interface TechImageSliderProps {
  className?: string;
}

const TechImageSlider: React.FC<TechImageSliderProps> = ({ className }) => {
  // Query for all technology images
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: {relativePath: {regex: "/community\\/technologies/"}}, sort: {name: ASC}) {
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
  
  // Extract image data from query results
  const techImages = data.allFile.edges.map(({ node }: any) => 
    node.childImageSharp ? getImage(node) : null
  ).filter(Boolean);
  
  // State for the current image in the slider
  const [currentImage, setCurrentImage] = React.useState(0);
  
  // Set up auto-rotation for slider (faster than community slider)
  React.useEffect(() => {
    if (techImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % techImages.length);
    }, 3000); // Change image every 3 seconds (faster than the 5 seconds used in the community slider)
    
    return () => clearInterval(interval);
  }, [techImages.length]);

  if (techImages.length === 0) {
    return <div className={`relative w-full h-full bg-black/50 ${className}`} />;
  }

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Slider Images */}
      {techImages.map((image: any, index: number) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            currentImage === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {image && (
            <GatsbyImage
              image={image}
              alt={`Technology ${index + 1}`}
              className="w-full h-full"
              objectFit="cover"
              objectPosition="center"
            />
          )}
        </div>
      ))}
      
      {/* Stronger darker overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70 z-10" />
    </div>
  );
};

export default TechImageSlider;
