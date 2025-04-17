/**
 * WhoWeAreSection Component
 * 
 * A section component for the Who We Are page
 * Displays team information, timeline, and company story
 */
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';
import { Linkedin, Github, Globe, ArrowRight } from 'lucide-react';
import { XLogo } from '../icons/XLogo';
import { CircularImage } from '../ui/CircularImage';
import Timeline from '../about/Timeline';
import { Button } from '../ui/button';

// Define team types directly in this file until we refactor more
interface TeamMember {
  name: string;
  role: string;
  description: string | React.ReactNode;
  image?: any; // Gatsby image data
  imageSrc?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  github?: string | null;
  blog?: string | null;
}

interface TeamData {
  leads: TeamMember[];
  partners: TeamMember[];
  advisors?: TeamMember[];
}

interface WhoWeAreSectionProps {
  /** Additional CSS class name */
  className?: string;
}

/**
 * Section component for the Who We Are page
 */
const WhoWeAreSection: React.FC<WhoWeAreSectionProps> = ({ 
  className = "" 
}) => {
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
        description: <>I'm a computer scientist who built the largest European deeptech meetup (15k members) and ended up investing as an angel in the sector. Some of my angel portfolio companies are now clocking £40m+ in revenue or part of national security contracts, but in deeptech that's still early days.<br/><br/>
        In 2023 I launched Silicon Roundabout Ventures as a soloGP fund in the UK from which I'm now investing from. We focus on writing first cheques in pre-seed and angel rounds (which we sometimes lead). I closed the fund at just over its £5m target and got backing by the likes of Molten Ventures (LSE:GROW), Multiple Capital, and exited founders and operators including 1 Nasdaq listed & 3 unicorn companies.<br/><br/>
        My mission? To build Europe's first community-driven and truly pan-European VC firm built by technical folks exclusively for deeptech pre-seed and seed founders.<br/><br/>
        Public keynote speaker and guest lecturer on deeptech and VC at the likes of Super Venture / Super Return (Berlin), Mobile World Congress (Barcelona), Hello Tomorrow (Paris), London Tech Week, The London Institute of Banking and Finance (London), ASP (Politecnico di Milano, Italy), the European GNSS Agency (Prague).</>,
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
    <div className={`min-h-screen space-y-16 ${className}`}>
      <div className="container mx-auto z-10 relative px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-16">
          &lt;Who We Are/&gt;
        </h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Mission Section */}
          <div className="bg-card/70 backdrop-blur-sm p-8 rounded-lg mb-12 border border-border/20 shadow-lg">
            <p className="text-xl mb-10">
              We are a Community-Driven VC firm backing{" "}
              <span className="text-srv-yellow">Deep Tech</span>{" "}
              founders with extreme conviction at{" "}
              <span className="text-srv-pink">pre-seed</span> and{" "}
              <span className="text-srv-pink">seed</span> stages.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-srv-teal">⚛️</span> Our Mission
                </h3>
                <p>
                  To build Europe's first community-driven and truly pan-European 
                  VC firm by technical folks for technical founders.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-srv-teal">🔬</span> Our Focus
                </h3>
                <p>
                  Cutting-edge Computer Science and Deep Tech backing the most promising scientists and engineers.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="h-0.5 w-12 bg-srv-teal"></span>
              <span className="text-muted-foreground">Our values guide everything we do</span>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <div className="bg-black/30 rounded-lg px-4 py-2 text-white border border-srv-teal/20">
                <span className="text-srv-teal mr-2">●</span> Technical first
              </div>
              <div className="bg-black/30 rounded-lg px-4 py-2 text-white border border-srv-teal/20">
                <span className="text-srv-teal mr-2">●</span> Community driven
              </div>
              <div className="bg-black/30 rounded-lg px-4 py-2 text-white border border-srv-teal/20">
                <span className="text-srv-teal mr-2">●</span> Science backing
              </div>
              <div className="bg-black/30 rounded-lg px-4 py-2 text-white border border-srv-teal/20">
                <span className="text-srv-teal mr-2">●</span> Transparent
              </div>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-10">
              &lt;The Team/&gt;
            </h2>
            
            {/* General Partner */}
            <div className="mb-16">
              <h3 className="text-xl font-bold text-srv-teal mb-6 text-center">General Partner</h3>
              <div className="flex justify-center">
                {teamData.leads.map((member: TeamMember, index: number) => (
                  <TeamMemberCard key={index} {...member} />
                ))}
              </div>
            </div>
            
            {/* Venture Partners */}
            <div>
              <h3 className="text-xl font-bold text-srv-teal mb-6 text-center">Venture Partners</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
                {teamData.partners.map((member: TeamMember, index: number) => (
                  <TeamMemberCard key={index} {...member} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Timeline Section */}
          <div className="bg-card/70 backdrop-blur-sm p-8 rounded-lg mb-12 border border-border/20 shadow-lg">
            <h2 className="text-2xl font-bold mb-8 text-center">Our Journey</h2>
            <Timeline 
              items={[
                {
                  year: '2011',
                  title: 'Silicon Roundabout Begins',
                  description: 'First Silicon Roundabout meetup of engineers, scientists, builders and founders near the Old Street Roundabout in London.'
                },
                {
                  year: '2016',
                  title: 'First Pitching Event',
                  description: 'First main show and tell pitching event for the community.'
                },
                {
                  year: '2017',
                  title: 'DeepTech Focus',
                  description: 'Community focus specialises on deeptech, from advanced software to hardware and science startups.'
                },
                {
                  year: '2019',
                  title: 'First Investment',
                  description: "Francesco's first angel cheque into a community startup."
                },
                {
                  year: '2020',
                  title: 'Going Hybrid',
                  description: 'Community goes hybrid because of Covid forcing it online and its doors suddenly open to the whole of Europe.'
                },
                {
                  year: '2022',
                  title: 'Fund Vision',
                  description: "Francesco drops his engineering career and pursuits to focus entirely on investing and launching 'a deeptech fund as a business soul for our community'."
                },
                {
                  year: '2023',
                  title: 'Our Fund Launches',
                  description: 'Silicon Roundabout Ventures starts operations with a warehoused investment and a first closing in December 2022.',
                  highlight: true
                },
                {
                  year: '2024',
                  title: 'Fund 1 Closes',
                  description: 'Silicon Roundabout Ventures fund 1 closes just above its £5m target and its first investment, Anaphite, closes its Series A follow on round.'
                }
              ]}
            />
          </div>
          
          {/* CTA Section */}
          <div className="flex justify-center gap-4 flex-wrap mb-12">
            <Button asChild size="lg" className="bg-srv-teal text-black hover:bg-srv-teal/80">
              <Link to="/portfolio">
                View Our Portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-srv-pink text-srv-pink hover:bg-srv-pink/20">
              <Link to="/community">
                Join Our Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * TeamMemberCard component for displaying team members
 */
const TeamMemberCard: React.FC<TeamMember> = ({
  name,
  role,
  description,
  image = null,
  imageSrc = null,
  linkedin = null,
  twitter = null,
  github = null,
  blog = null
}) => {
  const [showDetails, setShowDetails] = React.useState(false);
  
  const toggleDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDetails(!showDetails);
  };
  
  return (
    <div className="flex flex-col items-center">
      {image && (
        <CircularImage 
          image={image.childImageSharp.gatsbyImageData}
          alt={name}
          size={120}
          className="mb-4"
        />
      )}
      {!image && imageSrc && (
        <div className="w-32 h-32 overflow-hidden rounded-full border-2 border-border/40 mb-4">
          <img 
            src={imageSrc} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {!image && !imageSrc && (
        <div className="w-32 h-32 overflow-hidden rounded-full border-2 border-border/40 mb-4 flex items-center justify-center bg-background text-3xl font-bold">
          {name.charAt(0)}
        </div>
      )}
      
      <h3 className="text-lg font-bold mb-1">{name}</h3>
      <p className="text-srv-teal text-sm mb-2">{role}</p>
      
      <div className={`text-muted-foreground text-sm text-center max-w-xs mb-3 overflow-hidden transition-all duration-300 ${typeof description === 'string' && description.length > 100 && !showDetails ? 'max-h-20' : 'max-h-[2000px]'}`}>
        {description}
      </div>
      
      {typeof description === 'string' && description.length > 100 && (
        <button 
          onClick={toggleDetails}
          className="mt-2 text-srv-teal text-sm hover:underline focus:outline-none mb-3"
          aria-expanded={showDetails}
        >
          {showDetails ? 'Show less' : 'Read more'}
        </button>
      )}
      
      <div className="flex space-x-3">
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-srv-teal transition-colors">
            <Linkedin size={18} />
          </a>
        )}
        {twitter && (
          <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-srv-teal transition-colors">
            <XLogo size={18} />
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-srv-teal transition-colors">
            <Github size={18} />
          </a>
        )}
        {blog && (
          <a href={blog} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-srv-teal transition-colors">
            <Globe size={18} />
          </a>
        )}
      </div>
    </div>
  );
};

export default WhoWeAreSection;
