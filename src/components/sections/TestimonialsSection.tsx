import React, { useEffect, useRef, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  accentColor: string;
  glowColor: string;
  imageKey: 'anmol' | 'hippos' | 'pahini';
  imagePosition?: string; // CSS object-position, e.g. '50% 30%' or 'left top'
}

// Row 1 — scrolls left→right (forward)
const row1: Testimonial[] = [
  {
    quote: "We decided to take investment from Silicon Roundabout Ventures for 2 reasons:… the network that Francesco brought, and… Francesco's own insights",
    name: "Anmol Manohar",
    role: "Co-founder & CEO",
    company: "Greenjets",
    accentColor: "text-srv-teal",
    glowColor: "rgba(156,220,252,0.2)",
    imageKey: "anmol",
  },
  {
    quote: "90% of VCs on X don’t have the balls to lead a round of a hardware company. This mf does. He rode with me on the airport train before I flew out of London just to support me before the next round.",
    name: "Kylin Shaw",
    role: "CEO",
    company: "Hippos Exoskeletons",
    accentColor: "text-srv-blue",
    glowColor: "rgba(86,157,214,0.2)",
    imageKey: "hippos",
    imagePosition: "50% 100%", //  horizontal% / vertical% (0% = left/top edge, 100% = right/bottom edge)
  },
  {
    quote: "Francesco has been one of Panakeia's earliest backers, and his support has meant a great deal",
    name: "Pahini Pandya",
    role: "Founder & CEO",
    company: "Panakeia",
    accentColor: "text-srv-yellow-light",
    glowColor: "rgba(220,220,170,0.2)",
    imageKey: "pahini"
    // imagePosition: "50% 50%", //  horizontal% / vertical% (0% = left/top edge, 100% = right/bottom edge)
  },
];

// Row 2 — scrolls right→left (reverse)
{ /*
const row2: Testimonial[] = [
  {
    quote: "The team at SRV don't just write cheques — they're on WhatsApp at 2am when production goes down. That's the investor every deep-tech founder needs.",
    name: "Kylin Shaw",
    role: "CEO",
    company: "Hippos Exoskeletons",
    accentColor: "text-srv-pink",
    glowColor: "rgba(197,134,192,0.2)",
    imageKey: "hippos",
  },
  {
    quote: "No other investor opened as many doors as SRV did in the first six months. Their community of 15,000 engineers is not a marketing number — it's real.",
    name: "Dr. Sarah Chen",
    role: "CEO & Co-founder",
    company: "QuantumEdge AI",
    accentColor: "text-srv-teal",
    glowColor: "rgba(156,220,252,0.2)",
    imageKey: "sarah",
  },
  {
    quote: "We went from lab to term sheet in under 90 days. The Silicon Roundabout pitch competition was the catalyst that made everything else possible.",
    name: "Priya Nair",
    role: "Co-founder & CSO",
    company: "DeepCell Bio",
    accentColor: "text-srv-pink",
    glowColor: "rgba(197,134,192,0.2)",
    imageKey: "pahini",
  },
];
*/}

interface ImageMap {
  anmol: IGatsbyImageData | null;
  hippos: IGatsbyImageData | null;
  pahini: IGatsbyImageData | null;
}

interface CardProps {
  t: Testimonial;
  idx: number;
  images: ImageMap;
}

const TestimonialCard: React.FC<CardProps> = ({ t, idx, images }) => {
  const imageData = images[t.imageKey];
  const initials = t.name.replace('Dr. ', '').split(' ').map((n) => n[0]).join('').slice(0, 2);

  return (
    <div
      className="flex-shrink-0 flex items-stretch gap-0 bg-srv-darkAlt rounded-xl overflow-hidden border border-srv-comment/20
                 hover:border-srv-comment/40 transition-all duration-300 cursor-default"
      style={{
        width: '480px',
        boxShadow: `0 4px 30px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Photo — left strip */}
      <div className="flex-shrink-0 w-52 relative overflow-hidden">
        {imageData ? (
          <GatsbyImage
            image={imageData}
            alt={t.name}
            className="w-full h-full"
            imgClassName="w-full h-full object-cover"
            imgStyle={{ objectPosition: t.imagePosition ?? 'center' }}
          />
        ) : (
          <div className={`w-full h-full bg-srv-panel flex items-center justify-center text-2xl font-bold font-mono ${t.accentColor}`}>
            {initials}
          </div>
        )}
        {/* Right-side gradient fade into card */}
        <div
          className="absolute inset-y-0 right-0 w-8 pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent, #1E1E1E)' }}
        />
        {/* Accent glow on left edge */}
        <div
          className="absolute inset-y-0 left-0 w-1 pointer-events-none rounded-l-xl"
          style={{ background: t.glowColor.replace('0.2', '0.7') }}
        />
      </div>

      {/* Quote — right side */}
      <div className="flex-1 flex flex-col justify-between p-5">
        {/* Large quote mark */}
        <div className={`text-3xl font-bold leading-none mb-2 font-mono ${t.accentColor} opacity-40 select-none`}>
          "
        </div>
        <p className="text-srv-light/80 text-sm leading-relaxed font-mono flex-1">
          {t.quote}
        </p>
        <div className="mt-4 pt-3 border-t border-srv-comment/15">
          <p className={`text-sm font-bold font-mono ${t.accentColor}`}>{t.name}</p>
          <p className="text-srv-comment text-xs font-mono mt-0.5">{t.role} · {t.company}</p>
        </div>
      </div>
    </div>
  );
};

// --- Infinite scrolling row ---
interface ScrollRowProps {
  cards: Testimonial[];
  direction: 'left' | 'right'; // 'left' = scrolls toward left (normal), 'right' = reverse
  speed?: number;
  images: ImageMap;
}

const ScrollRow: React.FC<ScrollRowProps> = ({ cards, direction, speed = 0.45, images }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animRef = useRef<number | null>(null);
  const posRef = useRef(0);

  // Duplicate cards for seamless loop
  const doubled = [...cards, ...cards];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = () => {
      if (!isPaused) {
        if (direction === 'left') {
          posRef.current += speed;
          const half = track.scrollWidth / 2;
          if (posRef.current >= half) posRef.current = 0;
          track.style.transform = `translateX(-${posRef.current}px)`;
        } else {
          posRef.current -= speed;
          const half = track.scrollWidth / 2;
          if (posRef.current <= -half) posRef.current = 0;
          track.style.transform = `translateX(${-half + Math.abs(posRef.current)}px)`;
        }
      }
      animRef.current = requestAnimationFrame(step);
    };

    // Start reverse row already offset by half so it looks natural
    if (direction === 'right') {
      posRef.current = 0;
    }

    animRef.current = requestAnimationFrame(step);
    return () => { if (animRef.current !== null) cancelAnimationFrame(animRef.current); };
  }, [isPaused, direction, speed]);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left fade */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10"
        style={{ background: 'linear-gradient(to right, #000000 0%, transparent 100%)' }}
      />
      {/* Right fade */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10"
        style={{ background: 'linear-gradient(to left, #000000 0%, transparent 100%)' }}
      />

      <div
        ref={trackRef}
        className="flex gap-4 will-change-transform"
        style={{ width: 'max-content', paddingLeft: '16px' }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${direction}-${t.name}-${i}`} t={t} idx={i} images={images} />
        ))}
      </div>
    </div>
  );
};

// --- Main Section ---
const TestimonialsSection: React.FC = () => {
  const data = useStaticQuery(graphql`
    query TestimonialsImages {
      anmol: file(relativePath: { eq: "testimonials/testimonial_anmol.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 208, height: 260, layout: CONSTRAINED, quality: 90)
        }
      }
      hippos: file(relativePath: { eq: "testimonials/testimonial_hippos.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 208, height: 260, layout: CONSTRAINED, quality: 90)
        }
      }
      pahini: file(relativePath: { eq: "testimonials/testimonial_pahini.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 208, height: 260, layout: CONSTRAINED, quality: 90)
        }
      }
    }
  `);

  const images: ImageMap = {
    anmol: data.anmol?.childImageSharp?.gatsbyImageData ?? null,
    hippos: data.hippos?.childImageSharp?.gatsbyImageData ?? null,
    pahini: data.pahini?.childImageSharp?.gatsbyImageData ?? null,
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(86,182,194,0.035) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <div className="container mx-auto px-4 mb-12 relative z-10">
        <div className="mb-2">
          <span className="text-srv-comment font-mono text-sm tracking-widest uppercase">
            // founder.testimonials
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white font-mono mb-2">
          &lt;What our founders say/&gt;
        </h2>
        <div className="h-px w-24 bg-gradient-to-r from-srv-teal to-transparent" />
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-4 relative z-10">
        <ScrollRow cards={row1} direction="left" speed={0.4} images={images} />
      </div>

      {/* Uncomment to enable Row 2 — scrolls right (opposite direction) */}
      {/*
      <div className="relative z-10">
        <ScrollRow cards={row2} direction="right" speed={0.35} images={images} />
      </div>
      */}
    </section>
  );
};

export default TestimonialsSection;
