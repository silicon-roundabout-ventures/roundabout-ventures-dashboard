
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-srv-dark border-t border-white/10 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Silicon Roundabout Ventures</h3>
            <p className="text-srv-gray mb-4">
              Early-stage venture capital fund investing in technology startups that shape the future of industry.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/siliconroundabt" target="_blank" rel="noopener noreferrer" className="text-srv-gray hover:text-srv-yellow transition-colors">
                Twitter
              </a>
              <a href="https://www.linkedin.com/company/siliconroundabout/" target="_blank" rel="noopener noreferrer" className="text-srv-gray hover:text-srv-yellow transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-srv-gray hover:text-srv-yellow transition-colors">Home</Link></li>
              <li><Link to="/who-we-are" className="text-srv-gray hover:text-srv-yellow transition-colors">Who We Are</Link></li>
              <li><Link to="/portfolio" className="text-srv-gray hover:text-srv-yellow transition-colors">Portfolio</Link></li>
              <li><Link to="/building-in-public" className="text-srv-gray hover:text-srv-yellow transition-colors">Building in Public</Link></li>
              <li><Link to="/community" className="text-srv-gray hover:text-srv-yellow transition-colors">Community</Link></li>
              <li><Link to="/for-investors" className="text-srv-gray hover:text-srv-yellow transition-colors">For Investors</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
            <address className="not-italic text-srv-gray">
              <p>London, UK</p>
              <p className="mt-2">
                <a href="mailto:info@siliconroundabout.ventures" className="hover:text-srv-yellow transition-colors">
                  info@siliconroundabout.ventures
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-white/10 text-center text-srv-gray">
          <p>&copy; {currentYear} Silicon Roundabout Ventures. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
