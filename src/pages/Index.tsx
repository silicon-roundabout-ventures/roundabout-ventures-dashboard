
import React from 'react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="flex-grow flex items-center pt-20 z-10 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in text-center">
              Silicon Roundabout Ventures
            </h1>
            
            <div className="mt-6 mb-10 text-xl text-center animate-fade-in font-mono" style={{ animationDelay: '0.2s' }}>
              <p className="text-white leading-relaxed">
                Connecting (<span className="text-srv-yellow">Capital</span>) &#123; <br />
                &nbsp; <span className="text-srv-pink">with</span> <br />
                &nbsp;&nbsp;&nbsp; Next-Generation.<span className="text-srv-yellow">Technologies</span> <br />
                &nbsp; <span className="text-srv-pink">in </span> Computer & Physical <br />
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; <span className="text-srv-yellow">Science</span> <br />
                &#125;
              </p>
            </div>
            
            <div className="flex justify-center mt-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link 
                to="/apply" 
                className="bg-white hover:bg-gray-200 text-srv-dark font-medium py-3 px-8 rounded-md transition-colors"
              >
                Apply for Funding
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Who We Are Section */}
      <section className="py-16 bg-srv-dark/80 backdrop-blur-sm z-10 relative mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-6">&lt;Who we are/&gt;</h2>
          
          <p className="text-lg text-white mb-10">
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
      </section>
      
      {/* Investment Focus Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-black/70 z-10 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">&lt;Our Mission/&gt;</h2>
          
          <div className="max-w-4xl mx-auto text-lg text-white space-y-6">
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
            
            <p>
              <span className="text-srv-yellow mr-2">🚀</span> 
              If you are a{" "}
              <span className="text-srv-yellow">
                deep tech or big data
              </span>{" "}
              entrepreneur based in the UK or Europe, get in touch and{" "}
              <Link to="/apply" className="text-white underline hover:text-srv-yellow">
                apply for funding
              </Link>
              . We'd like to see if we can help you.
            </p>
          </div>
        </div>
      </section>
      
      {/* What Makes Us Unique Section */}
      <section className="py-16 bg-srv-dark/80 backdrop-blur-sm z-10 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8">&lt;What makes us unique/&gt;</h2>
          
          <ul className="text-lg text-white space-y-6 max-w-4xl mx-auto list-disc pl-6">
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
        </div>
      </section>
      
      {/* Next-Generation Technology Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-black/70 z-10 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            &lt;We write 1st cheques in Next-Generation technology startups/&gt;
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            <div className="text-center bg-gradient-to-br from-srv-dark to-black rounded-lg p-6 transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-white mb-3">
                &#91; <span className="text-red-500">Technical</span> &#93;
              </h3>
              <p className="text-srv-gray">
                Leveraging in-house science and engineering expertise to challenge the status-quo
              </p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-srv-dark to-black rounded-lg p-6 transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-white mb-3">
                &#123; <span className="text-red-500">Infrastructural</span> &#125;
              </h3>
              <p className="text-srv-gray">
                They solve large scale global problems at a "picks and shovel" infrastructure level
              </p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-srv-dark to-black rounded-lg p-6 transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-white mb-3">
                &#183; <span className="text-red-500">Defensible</span> &#183;
              </h3>
              <p className="text-srv-gray">
                They build fundamental hardware or low level software tech with a strong IP moat against challengers
              </p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-srv-dark to-black rounded-lg p-6 transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-white mb-3">
                &#47; <span className="text-red-500">Trend-Setting</span> &#47;
              </h3>
              <p className="text-srv-gray">
                Disrupt internationally the way an industry operates (1B+ potential revenue in 10+ years)
              </p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-srv-dark to-black rounded-lg p-6 transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-white mb-3">
                &#60; <span className="text-red-500">Global Impact</span> &#62;
              </h3>
              <p className="text-srv-gray">
                Focused on solving key infrastructural challenges in areas like Computing, Climate or Health, and Defence
              </p>
            </div>
            
            <div className="flex justify-center items-center">
              <Link
                to="/portfolio"
                className="bg-srv-yellow hover:bg-srv-yellow/80 text-black font-medium py-3 px-8 rounded-md transition-colors"
              >
                View Our Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 z-10 relative">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-black to-srv-yellow/80 rounded-lg shadow p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Scale Your Startup?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              We're not just investors. We're partners who will help you navigate the challenges of building a successful company.
            </p>
            <Link 
              to="/apply" 
              className="inline-block bg-white hover:bg-gray-100 text-black font-medium py-3 px-8 rounded-md transition-colors"
            >
              Apply for Funding
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
