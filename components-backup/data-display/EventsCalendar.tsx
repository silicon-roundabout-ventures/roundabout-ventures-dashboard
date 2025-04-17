/**
 * EventsCalendar Component
 * 
 * A wrapper component for displaying Lu.ma event calendars
 * with consistent styling and loading states
 */
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface EventsCalendarProps {
  /** Lu.ma calendar ID */
  calendarId: string;
  /** Title for the calendar (used for accessibility) */
  title: string;
  /** Height of the calendar in pixels */
  height?: number;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Component for embedding Lu.ma event calendars with loading states
 */
const EventsCalendar: React.FC<EventsCalendarProps> = ({
  calendarId,
  title,
  height = 400,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Build the iframe URL using the calendar ID
  const calendarUrl = `https://lu.ma/embed/calendar/${calendarId}/events`;
  
  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`} style={{ height: `${height}px` }}>
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 bg-black/70 px-6 py-3 rounded-lg">
            <Loader2 className="h-5 w-5 animate-spin text-srv-teal" />
            <span className="text-srv-teal">Loading events calendar...</span>
          </div>
        </div>
      )}
      
      {/* Lu.ma calendar iframe */}
      <iframe 
        src={calendarUrl} 
        width="100%" 
        height="100%" 
        frameBorder="0" 
        style={{ borderRadius: '8px', border: 'none' }}
        allowFullScreen
        title={title}
        className="relative z-0"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default EventsCalendar;
