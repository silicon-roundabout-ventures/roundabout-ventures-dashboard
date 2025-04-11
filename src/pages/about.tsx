
import React from 'react';
import ParticleBackground from '../components/common/ParticleBackground';
import Layout from '../components/common/Layout';

const AboutContent = () => {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <ParticleBackground />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-mono">&lt;About Us/&gt;</h1>
            <p className="text-srv-gray">
              We are an early-stage venture capital fund based in London, UK.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-8 mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-white/80 mb-6">
              At Silicon Roundabout Ventures, we believe in the power of technology to transform industries and improve lives. Our mission is to identify, invest in, and support the most promising early-stage technology companies that have the potential to make a significant impact.
            </p>
            <p className="text-white/80">
              We're passionate about working with founders who are not just building businesses, but are solving real problems and creating meaningful change in the world. Our goal is to be the investor we wish we had when we were building companies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Our Approach</h2>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-start">
                  <span className="text-srv-teal mr-2">•</span>
                  <span><strong className="text-white">Early-stage focus:</strong> We invest at pre-seed and seed stages, typically as the first institutional investor.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-srv-teal mr-2">•</span>
                  <span><strong className="text-white">Sector-agnostic:</strong> We invest across various sectors, including deep tech, healthtech, fintech, and more.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-srv-teal mr-2">•</span>
                  <span><strong className="text-white">Hands-on support:</strong> Beyond capital, we provide strategic guidance, network access, and operational support.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-srv-teal mr-2">•</span>
                  <span><strong className="text-white">Long-term perspective:</strong> We're committed to supporting our portfolio companies for the long haul.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Our Values</h2>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-start">
                  <span className="text-srv-teal mr-2">•</span>
                  <span><strong className="text-white">Integrity:</strong> We believe in transparency, honesty, and doing what's right, even when it's difficult.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-srv-teal mr-2">•</span>
                  <span><strong className="text-white">Collaboration:</strong> We work closely with founders, other investors, and ecosystem partners.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-srv-teal mr-2">•</span>
                  <span><strong className="text-white">Innovation:</strong> We embrace new ideas and approaches, both in our investment strategy and operations.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-srv-teal mr-2">•</span>
                  <span><strong className="text-white">Diversity:</strong> We value diverse perspectives and are committed to building an inclusive ecosystem.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="bg-srv-blue/20 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-5xl">👤</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Team Member {i}</h3>
                  <p className="text-srv-teal">Position</p>
                  <p className="text-white/80 mt-2">
                    Brief bio about the team member and their background.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <Layout title="About - Roundabout Ventures">
      <AboutContent />
    </Layout>
  );
};

export default About;
