import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { Menu, X, Github, Twitter, Linkedin } from 'lucide-react';
import { StaticImage } from "gatsby-plugin-image"

// TypeScript interface for the component props
interface NavbarProps {
  location?: {
    pathname: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ location }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Default pathname if location is not provided (useful for testing/development)
  const pathname = location?.pathname || '/';

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Who We Are', path: '/whoweare' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Building in Public', path: '/building-in-public' },
    { name: 'Community', path: '/community' },
    { name: 'For Investors', path: '/forinvestors' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled || isMenuOpen || pathname !== "/"
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/9f56fce1-0e1b-474c-b7af-93e780482111.png" 
              alt="Silicon Roundabout Ventures" 
              className="h-10"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-srv-teal ${
                  pathname === link.path ? 'text-srv-pink' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Media Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://twitter.com/siliconroundabt" target="_blank" rel="noopener noreferrer" className="text-white hover:text-srv-teal transition-colors">
              <Twitter size={18} />
            </a>
            <a href="https://www.linkedin.com/company/siliconroundabout/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-srv-teal transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="https://github.com/SiliconRoundabout" target="_blank" rel="noopener noreferrer" className="text-white hover:text-srv-teal transition-colors">
              <Github size={18} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#191c22]/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-base font-medium transition-colors hover:text-srv-teal ${
                    pathname === link.path ? 'text-srv-pink' : 'text-white'
                  }`}
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Social Media Icons - Mobile */}
              <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                <a href="https://twitter.com/siliconroundabt" target="_blank" rel="noopener noreferrer" className="text-white hover:text-srv-teal transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="https://www.linkedin.com/company/siliconroundabout/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-srv-teal transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="https://github.com/SiliconRoundabout" target="_blank" rel="noopener noreferrer" className="text-white hover:text-srv-teal transition-colors">
                  <Github size={18} />
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
