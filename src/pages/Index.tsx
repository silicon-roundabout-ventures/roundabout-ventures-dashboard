
import React from 'react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="flex-grow flex items-center pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in">
              Silicon Roundabout Ventures
            </h1>
            <p className="text-xl text-srv-gray mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Early-stage venture capital fund investing in exceptional founders building innovative solutions across various industries.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link 
                to="/portfolio" 
                className="bg-srv-teal hover:bg-srv-teal/80 text-white font-medium py-3 px-8 rounded-md transition-colors"
              >
                View Portfolio
              </Link>
              <Link 
                to="/apply" 
                className="bg-transparent hover:bg-srv-blue/20 text-white border border-srv-teal font-medium py-3 px-8 rounded-md transition-colors"
              >
                Apply for Funding
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Investment Focus Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-srv-blue/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Investment Focus</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Deep Tech',
                description: 'Investing in technologies that push the boundaries of what's possible, from AI and machine learning to quantum computing.',
                icon: '🧠'
              },
              {
                title: 'HealthTech',
                description: 'Supporting innovative healthcare solutions that improve patient outcomes and transform the healthcare industry.',
                icon: '⚕️'
              },
              {
                title: 'CleanTech',
                description: 'Funding sustainable technologies that address climate change and promote a greener future.',
                icon: '🌱'
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-srv-dark to-srv-blue/90 rounded-lg shadow p-6 transform transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-srv-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-srv-blue to-srv-teal rounded-lg shadow p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Scale Your Startup?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              We're not just investors. We're partners who will help you navigate the challenges of building a successful company.
            </p>
            <Link 
              to="/apply" 
              className="inline-block bg-white hover:bg-gray-100 text-srv-blue font-medium py-3 px-8 rounded-md transition-colors"
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
