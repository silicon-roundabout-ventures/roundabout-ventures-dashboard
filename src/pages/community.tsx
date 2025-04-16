
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import ParticleBackground from '../components/common/ParticleBackground';
import Layout from '../components/common/Layout';

const CommunityContent = () => {
  // Query for all event images
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: {relativePath: {regex: "/community\\/events/"}}, sort: {name: ASC}) {
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
  const eventImages = data.allFile.edges.map(({ node }: any) => 
    node.childImageSharp ? getImage(node) : null
  ).filter(Boolean);
  
  // State for the current image in the slider
  const [currentImage, setCurrentImage] = React.useState(0);
  
  // Set up auto-rotation for slider
  React.useEffect(() => {
    if (eventImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % eventImages.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [eventImages.length]);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <ParticleBackground />
      
      {/* Hero Section with Background Image */}
      <div className="relative mb-16">
        <div className="w-full h-[50vh] overflow-hidden rounded-lg relative">
          {/* Slider Images */}
          {eventImages.map((image: any, index: number) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                currentImage === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {image && (
                <GatsbyImage
                  image={image}
                  alt={`Community event ${index + 1}`}
                  className="w-full h-full"
                  objectFit="cover"
                  objectPosition="center"
                />
              )}
            </div>
          ))}
          
          {/* Navigation Dots */}
          {eventImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
              {eventImages.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImage === index 
                      ? 'bg-srv-teal w-4' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent z-10" />
          
          {/* Text content */}
          <div className="absolute inset-0 flex items-center justify-center flex-col z-20">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 px-4 text-center">&lt;Community/&gt;</h1>
            <p className="text-lg text-white max-w-2xl mx-auto px-4 text-center bg-black/40 backdrop-blur-sm p-4 rounded-lg">
              Join our vibrant community of founders, engineers, and investors passionate about deep tech and innovation.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-srv-dark/70 backdrop-blur-sm p-8 rounded-lg mb-12">
           <h2 className="text-2xl font-bold text-white mb-6">&lt;Upcoming Events/&gt;</h2>
            <p className="text-white mb-6">Connect with like-minded innovators and industry leaders at our upcoming events.</p>
            <h3 className="text-xl font-bold text-white mb-6">Fund & LP Events:</h3>
            <div className="h-[400px] overflow-hidden rounded-lg relative">
              <div className="absolute inset-x-0 top-0 flex justify-center pt-6 z-10 pointer-events-none">
                <div className="animate-pulse-slow text-srv-teal bg-black/70 px-6 py-3 rounded-lg backdrop-blur-sm">Loading events calendar...</div>
              </div>
              {/* Embed lu.ma events here */}
              <iframe 
                src="https://lu.ma/embed/calendar/cal-LtL994FHFsKgfPv/events" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{ borderRadius: '8px', border: 'none' }}
                allowFullScreen
                title="Silicon Roundabout Events"
                aria-hidden="false"
                tabIndex={0}
                className="relative z-0"
                onLoad={(e) => {
                  // Hide the loading indicator when iframe is loaded
                  const parent = e.currentTarget.parentElement;
                  if (parent && parent.firstChild) {
                    (parent.firstChild as HTMLElement).style.display = 'none';
                  }
                }}
                />
            </div>
            <br />
            <h3 className="text-xl font-bold text-white mb-6">Community Events:</h3>
            <div className="h-[400px] overflow-hidden rounded-lg relative">
              <div className="absolute inset-x-0 top-0 flex justify-center pt-6 z-10 pointer-events-none">
                <div className="animate-pulse-slow text-srv-teal bg-black/70 px-6 py-3 rounded-lg backdrop-blur-sm">Loading community events...</div>
              </div>
              <iframe 
                src="https://lu.ma/embed/calendar/cal-LbyWro3ZdQSojJX/events" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{ borderRadius: '8px', border: 'none' }}
                allowFullScreen
                title="Silicon Roundabout x Frontier Deep Tech Events"
                className="relative z-0"
                onLoad={(e) => {
                  // Hide the loading indicator when iframe is loaded
                  const parent = e.currentTarget.parentElement;
                  if (parent && parent.firstChild) {
                    (parent.firstChild as HTMLElement).style.display = 'none';
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Community = () => {
  return (
    <Layout title="Community - Roundabout Ventures">
      <CommunityContent />
    </Layout>
  );
};

export default Community;
