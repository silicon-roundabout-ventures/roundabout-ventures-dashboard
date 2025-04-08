
import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

const TeamMember = ({ 
  name, 
  role, 
  description,
  imageSrc,
  linkedin = null,
  twitter = null,
  github = null,
  blog = null
}) => (
  <div className="flex flex-col items-center">
    <div className="w-32 h-32 md:w-36 md:h-36 overflow-hidden rounded-full border-2 border-white/20 mb-4">
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-srv-dark flex items-center justify-center text-white">
          {name.charAt(0)}
        </div>
      )}
    </div>
    <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
    <p className="text-srv-yellow text-sm mb-2">{role}</p>
    <p className="text-white/80 text-sm text-center max-w-xs mb-3">{description}</p>
    
    <div className="flex space-x-3">
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-srv-yellow transition-colors">
          <Linkedin size={18} />
        </a>
      )}
      {twitter && (
        <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-srv-yellow transition-colors">
          <Twitter size={18} />
        </a>
      )}
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-srv-yellow transition-colors">
          <Github size={18} />
        </a>
      )}
      {blog && (
        <a href={blog} target="_blank" rel="noopener noreferrer" className="text-white hover:text-srv-yellow transition-colors">
          <span className="code-text">{'</>'}</span>
        </a>
      )}
    </div>
  </div>
);

const WhoWeAre = () => {
  // Team data
  const teamData = {
    leads: [
      {
        name: "Francesco Perticarari",
        role: "General Partner",
        description: "Technical founder with expertise in deep tech and venture capital",
        linkedin: "https://www.linkedin.com/in/fperticarari/",
        twitter: "https://twitter.com/francesco_srv",
        github: "https://github.com/fpert041",
        blog: "https://blog.francescoperticarari.com"
      }
    ],
    partners: [
      {
        name: "Olivia Nicoletti, PhD",
        role: "Nanophysicist and Tech Spinout Expert",
        description: "Ex Cambridge Enterprise",
        linkedin: "https://www.linkedin.com/in/olivia-nicoletti-phd-6307724/"
      },
      {
        name: "Ralph King",
        role: "Exited CTO & Tech Whiz",
        description: "Building our VC superpowers",
        linkedin: "https://www.linkedin.com/in/ralph-king/"
      },
      {
        name: "Maria Grazia Vigliotti, PhD",
        role: "AI, Blockchain & Cybersecurity Expert",
        description: "Angel investor & Entrepreneur",
        linkedin: "https://www.linkedin.com/in/mgvigliotti/"
      }
    ]
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">&lt;Who We Are/&gt;</h1>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/70 backdrop-blur-sm p-8 rounded-lg mb-12 border border-white/10">
            <p className="text-xl text-white mb-10">
              We are a Community-Driven VC firm backing{" "}
              <span className="text-srv-yellow">Deep Tech and Big Data</span>{" "}
              startups at{" "}
              <span className="text-srv-pink">pre-seed</span> and{" "}
              <span className="text-srv-pink">seed</span>,
              leveraging our community of 15,000 founders and engineers and
              our live pitching competitions that over the years featured
              winners now worth over £6 Billion.
            </p>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-8">&lt;What makes us unique/&gt;</h2>
          
          <ul className="text-lg text-white space-y-6 list-disc pl-6 mb-12">
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
          
          <h2 className="text-3xl font-bold text-white mb-8">&lt;Our Mission/&gt;</h2>
          
          <div className="max-w-4xl mx-auto text-lg text-white space-y-6 mb-12">
            <p>
              <span className="text-srv-yellow mr-2">⚙️</span> 
              We are building a new kind of financial institution at the
              intersection of{" "}
              <span className="text-srv-pink">
                Venture, Science and Community
              </span>
              . We provide investment capital, community connections and
              hands-on support to seed founders.
            </p>
            
            <p>
              <span className="text-srv-yellow mr-2">💪</span> 
              Our mission is to help technical founding teams building
              solutions based on{" "}
              <span className="text-srv-pink">computer</span> or{" "}
              <span className="text-srv-pink">
                physical sciences
              </span>{" "}
              that are solving large-scale global problems.
            </p>
          </div>
          
          {/* Team Section */}
          <h2 className="text-3xl font-bold text-white mb-10">&lt;Team/&gt;</h2>
          
          {/* General Partner */}
          <div className="mb-16">
            <div className="grid grid-cols-1 place-items-center">
              {teamData.leads.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>

          {/* Venture Partners */}
          <h3 className="text-2xl font-bold text-white mb-8">Venture.Partners()</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center mb-20">
            {teamData.partners.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
