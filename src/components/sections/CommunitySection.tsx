/**
 * CommunitySection Component
 * 
 * Section component for the Community page
 * Displays community information, upcoming events, and calendars
 */
import React from 'react';
import { Link } from 'gatsby';
import ImageSlider from '../common/ImageSlider';
import EventsCalendar from '../data-display/EventsCalendar';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

interface CommunitySectionProps {
  /** Additional CSS class name */
  className?: string;
}

/**
 * Main section component for the Community page
 */
const CommunitySection: React.FC<CommunitySectionProps> = ({ 
  className = "" 
}) => {
  return (
    <div className={`min-h-screen space-y-16 ${className}`}>
      {/* Hero Section with Background Image */}
      <div className="relative mb-16">
        <div className="w-full h-[50vh] overflow-hidden rounded-lg relative">
          {/* Use the reusable ImageSlider component */}
          <ImageSlider 
            imagePathPattern="community\/events"
            transitionSpeed={4000}
            overlayOpacity={50}
          />
          
          {/* Text content */}
          <div className="absolute inset-0 flex items-center justify-center flex-col z-20">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 px-4 text-center">&lt;Community/&gt;</h1>
            <p className="text-lg text-white max-w-2xl mx-auto px-4 text-center bg-black/40 backdrop-blur-sm p-4 rounded-lg">
              Join our vibrant community of founders, engineers, and investors passionate about deep tech and innovation.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-5xl mx-auto">
          {/* Events Section */}
          <div className="bg-card/70 backdrop-blur-sm p-8 rounded-lg mb-12 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">&lt;Upcoming Events/&gt;</h2>
            <p className="mb-6">Connect with like-minded innovators and industry leaders at our upcoming events.</p>
            
            {/* Fund & LP Events Calendar */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold">Fund & LP Events:</h3>
              <EventsCalendar 
                calendarId="cal-LtL994FHFsKgfPv"
                title="Silicon Roundabout Events"
                height={400}
              />
            </div>
            
            {/* Community Events Calendar */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Community Events:</h3>
              <EventsCalendar 
                calendarId="cal-LbyWro3ZdQSojJX"
                title="Silicon Roundabout x Frontier Deep Tech Events"
                height={400}
              />
            </div>
          </div>

          {/* Build in Public CTA */}
          <div className="flex justify-center mb-16">
            <Button asChild size="lg" className="bg-srv-yellow hover:bg-srv-yellow/80 text-black">
              <Link to="/buildinginpublic">
                Hear about new events through our Build in Public blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {/* Community Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card/70 backdrop-blur-sm p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-srv-teal mb-2">15,000+</div>
              <div className="text-lg">Community Members</div>
            </div>
            <div className="bg-card/70 backdrop-blur-sm p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-srv-teal mb-2">50+</div>
              <div className="text-lg">Events Per Year</div>
            </div>
            <div className="bg-card/70 backdrop-blur-sm p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-srv-teal mb-2">£7B+</div>
              <div className="text-lg">Portfolio Valuation</div>
            </div>
          </div>
          
          {/* Join the Community Section */}
          <div className="bg-card/70 backdrop-blur-sm p-8 rounded-lg mb-12 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">&lt;Join Our Community/&gt;</h2>
            <p className="mb-6">
              Silicon Roundabout Ventures is not just a VC firm – we're a community of technologists, entrepreneurs, and investors
              united by a passion for deep tech innovation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-srv-teal text-srv-teal hover:bg-srv-teal/20"
              >
                <a href="https://twitter.com/SiliconRTech" target="_blank" rel="noopener noreferrer">
                  Follow Us on Twitter
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-srv-teal text-srv-teal hover:bg-srv-teal/20"
              >
                <a href="https://www.linkedin.com/company/silicon-roundabout-ventures" target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
