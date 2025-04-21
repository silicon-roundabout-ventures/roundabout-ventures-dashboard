import React from 'react';
import { Link } from 'gatsby';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-white/10 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4 font-mono">&lt;Connect/&gt;</h3>
            <p className="text-srv-gray mb-4">
              Early-stage venture capital fund investing in deep tech and big data startups that shape the future of industry.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/siliconroundabt" target="_blank" rel="noopener noreferrer" className="text-srv-gray hover:text-srv-yellow transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/company/siliconroundabout/" target="_blank" rel="noopener noreferrer" className="text-srv-gray hover:text-srv-yellow transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/SiliconRoundabout" target="_blank" rel="noopener noreferrer" className="text-srv-gray hover:text-srv-yellow transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4 font-mono">Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-srv-gray hover:text-srv-yellow transition-colors">Home</Link></li>
              <li><Link to="/whoweare" className="text-srv-gray hover:text-srv-yellow transition-colors">Who We Are</Link></li>
              <li><Link to="/portfolio" className="text-srv-gray hover:text-srv-yellow transition-colors">Portfolio</Link></li>
              <li><Link to="/buildinginpublic" className="text-srv-gray hover:text-srv-yellow transition-colors">Building in Public</Link></li>
              <li><Link to="/community" className="text-srv-gray hover:text-srv-yellow transition-colors">Community</Link></li>
              <li><Link to="/forinvestors" className="text-srv-gray hover:text-srv-yellow transition-colors">For Investors</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4 font-mono">Contact</h3>
            <address className="not-italic text-srv-gray">
              <p>London, UK</p>
              <p className="mt-2">
                hello [at] siliconroundabout [dot] ventures
              </p>
              <div className="mt-4 inline-block px-4 py-2 border border-srv-yellow/30 rounded text-srv-yellow">
                <Link to="/apply">
                  Apply for Funding →
                </Link>
              </div>
            </address>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-white/10 text-center text-srv-gray">
          <p className="font-mono">/* &copy; {currentYear} Silicon Roundabout Ventures Advisers Ltd. All rights reserved. */</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
