
import React from 'react';
import ParticleBackground from '../components/ParticleBackground';

const WhoWeAre = () => {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">&lt;Who We Are/&gt;</h1>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-srv-dark/70 backdrop-blur-sm p-8 rounded-lg mb-12">
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
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
