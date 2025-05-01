import { useState, useEffect } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Menu, X, Github, Linkedin, Youtube } from 'lucide-react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

interface NavbarProps {
  location?: {
    pathname: string;
  };
}

export default function Navbar({ location }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Query the logo image using GraphQL
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "siliconroundabout/srv_logo_dash.png" }) {
        childImageSharp {
          gatsbyImageData(height: 40, layout: FIXED, placeholder: BLURRED)
        }
      }
    }
  `);
  
  const logoImage = getImage(data.logo);
  
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
    { name: 'Building in Public', path: '/buildinginpublic' },
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
          ? "bg-black shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            {/* Logo wrapper with fixed dimensions */}
            <div className="h-10 w-auto">
              {logoImage && (
                <GatsbyImage
                  image={logoImage}
                  alt="Silicon Roundabout Ventures"
                  className="h-10 w-auto"
                />
              )}
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm transition-colors duration-200 hover:text-srv-teal ${
                  pathname === link.path 
                    ? 'text-srv-teal font-medium' 
                    : hasScrolled || isMenuOpen || pathname !== "/" 
                      ? 'text-srv-light' 
                      : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Media Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://www.linkedin.com/company/siliconroundabout-ventures" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`hover:text-srv-teal transition-colors ${
                hasScrolled || isMenuOpen || pathname !== "/" ? 'text-srv-light' : 'text-white'
              }`}
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="https://github.com/silicon-roundabout-ventures" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`hover:text-srv-teal transition-colors ${
                hasScrolled || isMenuOpen || pathname !== "/" ? 'text-srv-light' : 'text-white'
              }`}
            >
              <Github size={18} />
            </a>
            <a 
              href="https://www.youtube.com/@siliconroundabout" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`hover:text-srv-teal transition-colors ${
                hasScrolled || isMenuOpen || pathname !== "/" ? 'text-srv-light' : 'text-white'
              }`}
            >
              <Youtube size={18} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden focus:outline-none transition-colors ${
              hasScrolled || isMenuOpen || pathname !== "/" ? 'text-srv-light' : 'text-white'
            }`}
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
                  className={`text-base transition-colors duration-200 hover:text-srv-teal ${
                    pathname === link.path 
                      ? 'text-srv-teal font-medium' 
                      : 'text-white'
                  }`}
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Social Media Icons - Mobile */}
              <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                <a href="https://www.linkedin.com/company/siliconroundabout-ventures" target="_blank" rel="noopener noreferrer" className="text-white hover:text-srv-teal transition-colors">
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
}
