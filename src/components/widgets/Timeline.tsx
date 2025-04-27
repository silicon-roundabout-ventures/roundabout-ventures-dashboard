import React, { useEffect, useRef } from 'react';

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize refs array with the correct length
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items.length]);

  // Set up intersection observer for scroll animations
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, options);

    // Observe all timeline items
    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      itemRefs.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, [items.length]);

  return (
    <div className={`relative ${className}`} ref={timelineRef}>
      {/* Vertical line */}
      <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-srv-teal/40 transform -translate-x-1/2 z-0"></div>
      
      {/* Timeline Items */}
      <div className="relative z-10">
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`flex flex-col md:flex-row items-start md:items-center relative mb-12 opacity-0 translate-y-8 transition-all duration-700 ease-out ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            {/* Year */}
            <div className="md:w-1/2 flex md:justify-end md:pr-12 mb-4 md:mb-0">
              <div 
                className={`px-4 py-2 rounded-full text-white font-bold ${
                  item.highlight ? 'bg-srv-teal' : 'bg-srv-dark/70 border border-white/20'
                }`}
              >
                {item.year}
              </div>
            </div>
            
            {/* Circle on timeline */}
            <div className="absolute left-5 md:left-1/2 top-0 w-5 h-5 bg-srv-yellow rounded-full transform -translate-x-1/2 border-4 border-black z-20"></div>
            
            {/* Content */}
            <div className="md:w-1/2 md:pl-12 pl-10">
              <div className="bg-srv-dark/70 backdrop-blur-sm p-6 rounded-lg border border-white/10 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-srv-gray">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
