import React, { MouseEvent, useState } from 'react';
import { Linkedin, Github, Globe, ArrowRight } from 'lucide-react';
import { XLogo } from '@/images/icons/XLogo';
import Layout from '@/components/layouts/Layout';
import ParticleBackground from '@/components/layouts/ParticleBackground';
import { CircularImage } from '@/components/parts/CircularImage';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';
import Timeline from '@/components/widgets/Timeline';
import { Button } from '@/components/parts/button';
import SEO from '@/components/parts/SEO';
import { HeadFC } from 'gatsby';

interface TeamMemberProps {
  name: string;
  role: string;
  description: string | React.ReactNode;
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
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const toggleDetails = (e: MouseEvent) => {
    e.preventDefault();
    setShowDetails(!showDetails);
  };
  
  return (
    <div className="flex-col-center">
      {image && (
        <CircularImage 
          image={image.childImageSharp.gatsbyImageData}
          alt={name}
          size={120}
          className="mb-4"
        />
      )}
      {!image && (
        <div className="w-32 h-32 md:w-36 md:h-36 overflow-hidden rounded-full border-2 border-[#4c566a]/40 mb-4">
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex-center bg-gray-800 text-3xl font-bold text-white">
              {name.charAt(0)}
            </div>
          )}
        </div>
      )}
      <h3 className="heading-3 text-white mb-1">{name}</h3>
      <p className="text-srv-teal text-sm mb-2">{role}</p>
      
      <div className={`text-srv-gray text-sm text-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mb-3 overflow-hidden transition-all duration-300 ${typeof description === 'string' && description.length > 100 && !showDetails ? 'max-h-20' : 'max-h-[2000px]'}`}>
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
};

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
        description: <>I'm a computer scientist who built the largest European deeptech meetup (15k members) and ended up investing as an angel in the sector. Some of my angel portfolio companies are now clocking £40m+ in revenue or part of national security contracts, but in deeptech that's still early days. In total I wrote 17 personal cheques including the likes of edge & GPU cloud leader <b><u><a href="https://ori.io">Ori Industries</a></u></b>, Quantum Photonics pioneer <b><u><a href="https://aegiq.com">Aegiq</a></u></b>, or holography world-leader <b><u><a href="https://www.vividq.com">Vivid-Q</a></u></b>.<br/><br/>
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
                We back founders starting out in Europe who are "sub-0.1% of the population" type of{" "}
                <span className="text-srv-yellow">exceptional</span>,{" "}
                obsessively building novel technology companies for the long term in critical areas like{" "}
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
            
            {/* Team Section */}
            <h2 className="text-3xl font-bold text-white mb-10 font-mono">&lt;Team/&gt;</h2>
            
            {/* General Partner */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">General Partner</h3>
              <div className="max-w-4xl mx-auto w-full">
                {teamData.leads.map((member, index) => (
                  <TeamMember key={index} {...member} />
                ))}
              </div>
            </div>

            {/* Venture Partners */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Venture Partners</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {teamData.partners.map((member, index) => (
                  <div key={index} className="flex justify-center">
                    <TeamMember {...member} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Our Story Timeline Section */}
            <h2 className="text-3xl font-bold text-white mb-10 font-mono">&lt;Our Story/&gt;</h2>
            
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
                  description: "Francesco drops his engineering career and pursuits to focus entirely on investing and launching 'a deeptech fund as a business soul for our community'.",
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
                },
                {
                  year: 'Now',
                  title: 'Building the Future',
                  description: 'We continue our journey building a new kind of financial institution at the intersection of Venture Capital, Science and Community!',
                  highlight: true
                }
              ]}
              className="mb-16"
            />
            
            {/* Call to action */}
          <div className="flex flex-wrap gap-4 justify-center mt-6 mb-12 px-4 w-full">
            <Button asChild size="lg" className="bg-srv-teal text-black hover:bg-srv-teal/80">
              <Link to="/buildinginpublic">
                Check out our Build in Public blog <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-srv-pink text-srv-pink hover:bg-srv-pink/20">
              <Link to="/portfolio">
                The people we backed so far <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const Head: HeadFC = () => (
  <SEO
    title="Who We Are - Silicon Roundabout Ventures"
    description="Learn about our investment philosophy and team"
    image="/images/previews/og-whoweare.png"
  />
)

export default WhoWeAre;
export { TeamMember };
