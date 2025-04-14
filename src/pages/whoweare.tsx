import React from 'react';
import { Linkedin, Github, Globe } from 'lucide-react';
import { XLogo } from '../components/icons/XLogo';
import Layout from '../components/common/Layout';
import ClientOnly from '../components/common/ClientOnly';
import ParticleBackground from '../components/common/ParticleBackground';
import { CircularImage } from '../components/ui/CircularImage';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  image?: any; // Updated to handle Gatsby image data
  imageSrc?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  github?: string | null;
  blog?: string | null;
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  role, 
  description,
  image = null,
  imageSrc = null,
  linkedin = null,
  twitter = null,
  github = null,
  blog = null
}) => (
  <div className="flex flex-col items-center justify-center">
    {/* Use our enhanced CircularImage component for better centering */}
    {image?.childImageSharp?.gatsbyImageData ? (
      <CircularImage
        image={image.childImageSharp.gatsbyImageData}
        alt={name}
        size={160} // Slightly larger size for better visibility
        borderColor="border-[#4c566a]/40"
        className="mb-4"
        objectPosition="center center" // Center the image properly
      />
    ) : imageSrc ? (
      <CircularImage
        imageSrc={imageSrc}
        alt={name}
        size={160}
        borderColor="border-[#4c566a]/40"
        className="mb-4"
        objectPosition="center center"
      />
    ) : (
      <CircularImage
        initials={name.charAt(0)}
        alt={name}
        size={160}
        borderColor="border-[#4c566a]/40"
        className="mb-4"
      />
    )}
    <h3 className="text-2xl font-bold text-white mb-1 text-center">{name}</h3>
    <p className="text-srv-teal text-sm mb-2 text-center">{role}</p>
    <p className="text-srv-gray text-sm text-center max-w-xs mb-3">{description}</p>
    
    <div className="flex space-x-3 justify-center">
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-srv-teal transition-colors">
          <Linkedin size={18} />
        </a>
      )}
      {twitter && (
        <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-srv-teal transition-colors">
          <XLogo size={18} />
        </a>
      )}
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-srv-teal transition-colors">
          <Github size={18} />
        </a>
      )}
      {blog && (
        <a href={blog} target="_blank" rel="noopener noreferrer" className="text-white hover:text-srv-teal transition-colors">
          <Globe size={18} />
        </a>
      )}
    </div>
  </div>
);

interface TeamData {
  leads: TeamMemberProps[];
  partners: TeamMemberProps[];
  advisors?: TeamMemberProps[];
}

const WhoWeAre = () => {
  // Fetch team member images
  const data = useStaticQuery(graphql`
    query {
      francescoImage: file(relativePath: { eq: "team/francesco-general-partner.jpeg" }) {
        childImageSharp {
          gatsbyImageData(width: 300, height: 300, transformOptions: {cropFocus: CENTER}, layout: CONSTRAINED, quality: 100)
        }
      }
      oliviaImage: file(relativePath: { eq: "team/olivia.jpeg" }) {
        childImageSharp {
          gatsbyImageData(width: 300, height: 300, transformOptions: {cropFocus: CENTER}, layout: CONSTRAINED, quality: 100)
        }
      }
      ralphImage: file(relativePath: { eq: "team/ralph-pic.jpeg" }) {
        childImageSharp {
          gatsbyImageData(width: 300, height: 300, transformOptions: {cropFocus: CENTER}, layout: CONSTRAINED, quality: 100)
        }
      }
      mariaImage: file(relativePath: { eq: "team/maria.jpeg" }) {
        childImageSharp {
          gatsbyImageData(width: 300, height: 300, transformOptions: {cropFocus: CENTER}, layout: CONSTRAINED, quality: 100)
        }
      }
    }
  `);
  
  // Team data
  const teamData: TeamData = {
    leads: [
      {
        name: "Francesco Perticarari",
        role: "General Partner",
        description: "Technical founder with expertise in deep tech and venture capital",
        image: data.francescoImage, // Using Gatsby image
        linkedin: "https://www.linkedin.com/in/fperticarari/",
        twitter: "https://twitter.com/francesco_srv",
        github: "https://github.com/fpert041",
        blog: "https://francescoperticarari.com"
      }
    ],
    partners: [
      {
        name: "Olivia Nicoletti, PhD",
        role: "Nanophysicist and Spinout Expert",
        description: "Ex Cambridge Enterprise",
        image: data.oliviaImage, // Using Gatsby image
        linkedin: "https://www.linkedin.com/in/olivia-nicoletti-phd-6307724/"
      },
      {
        name: "Ralph King",
        role: "Exited CTO & Tech Whiz",
        description: "Building our VC superpowers",
        image: data.ralphImage, // Using Gatsby image
        linkedin: "https://www.linkedin.com/in/ralph-king/"
      },
      {
        name: "Maria Grazia Vigliotti, PhD",
        role: "AI & Cybersecurity Expert",
        description: "Angel investor & Entrepreneur",
        image: data.mariaImage, // Using Gatsby image
        linkedin: "https://www.linkedin.com/in/mgvigliotti/"
      }
    ]
  };

  return (
    <Layout title="Who We Are | Roundabout Ventures">
      <div className="min-h-screen pt-28 pb-16">
        <ParticleBackground />
        
        <div className="container mx-auto z-10 relative">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-16">
            &lt;Who We Are/&gt;
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1e2127]/70 backdrop-blur-sm p-8 rounded-lg mb-12 border border-[#4c566a]/20">
              <p className="text-xl text-srv-light mb-10">
                We are a Community-Driven VC firm backing{" "}
                <span className="text-srv-yellow">Deep Tech</span>{" "}
                founders with extreme conviction at{" "}
                <span className="text-srv-pink">
                  pre-seed and seed{" "}
                </span>
                stages.
              </p>
              <p className="text-xl text-srv-light">
                We founders who are sub-0.1% of the population type of{" "}
                <span className="text-srv-yellow">exceptional</span>,{" "}
                obsessively building novel approaches that will matter in the long-term in critical areas like{" "}
                <span className="text-srv-pink">
                  Computing
                </span>
                ,{" "}
                <span className="text-srv-pink">
                  Defence
                </span>
                ,{" "}and{" "}
                <span className="text-srv-pink">
                  Energy
                </span>
                .
              </p>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-8 font-mono">&lt;What makes us unique/&gt;</h2>
            
            <ul className="text-lg text-srv-light space-y-6 list-disc pl-6 mb-12">
              <li>
                We run a 15k member strong tech meetup community,{" "}
                <span className="text-srv-yellow">
                  Silicon Roundabout
                </span>
                , which gives us direct access to 5000+ startups and has
                already helped grow 2 billion-dollar companies
              </li>
              
              <li>
                We all have{" "}
                <span className="text-srv-yellow">
                  technical backgrounds
                </span>
                , helping us select and support founders
              </li>
              
              <li>
                We offer our portfolio companies access to our Proprietary
                Ecosystem to help with{" "}
                <span className="text-srv-yellow">
                  specialist hiring and industry connections
                </span>
              </li>
            </ul>
            
            {/* Team Section */}
            <h2 className="text-3xl font-bold text-white mb-10 font-mono">&lt;Team/&gt;</h2>
            
            {/* General Partner */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">General Partner</h3>
              <div className="grid place-items-center">
                {teamData.leads.map((member, index) => (
                  <TeamMember key={index} {...member} />
                ))}
              </div>
            </div>

            {/* Venture Partners */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Venture Partners</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {teamData.partners.map((member, index) => (
                  <div key={index} className="flex justify-center">
                    <TeamMember {...member} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhoWeAre;
export { TeamMember };
