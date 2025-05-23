import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { Button } from "@/components/parts/button";
import ParticleBackground from '@/components/layouts/ParticleBackground';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/layouts/Layout';
import { GlassCard } from "@/components/parts/GlassCard";
import { Section } from "@/components/parts/Section";
import { FeatureCard } from '@/components/parts/FeatureCard';
import { CircularImage } from '@/components/parts/CircularImage';
import ImageSlider from '@/components/sections/ImageSlider';
import TypedAnimationWrapper from '@/components/parts/TypedAnimationWrapper';
import ScrollChevrons from '@/components/parts/ScrollChevrons';
import SEO from '@/components/SEO';

// Content component to separate from layout
const IndexContent = () => {
  // Fetch community images for the Who We Are section
  const data = useStaticQuery(graphql`
    query {
      communityImage1: file(relativePath: { eq: "community/community-franpitch-square.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 160, height: 160, layout: CONSTRAINED, quality: 100)
        }
      }
      communityImage2: file(relativePath: { eq: "community/community-meetup-square.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 160, height: 160, layout: CONSTRAINED, quality: 100)
        }
      }
      communityImage3: file(relativePath: { eq: "community/community-womanpitch-square.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 160, height: 160, layout: CONSTRAINED, quality: 100)
        }
      }
    }
  `);
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[100vh] text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            &lt;Silicon Roundabout Ventures/&gt;
          </h1>
          
          <div className="font-mono text-xl md:text-2xl mb-12 text-white w-full max-w-4xl mx-auto px-4">
            {/* Professional typing animation using Typed.js */}
            <TypedAnimationWrapper
              strings={[
                'Investing(<span class="text-srv-yellow">First</span>) <span class="text-srv-pink">in</span> { Frontier_Technology.<span class="text-srv-yellow">Founders</span> } <span class="text-srv-pink">building</span> the future Computing &amp; Physical <span class="text-srv-yellow">Infrastructure</span>'
              ]}
              typeSpeed={40}
              startDelay={800}
              showCursor={true}
              cursorChar="|"
              className="font-mono"
              loop={false}
            />
          </div>
        
          <div className="flex flex-wrap gap-4 justify-center mt-4 px-4 w-full">
            <Button asChild size="lg" className="bg-srv-teal text-black hover:bg-srv-teal/80">
              <Link to="/portfolio">
                Live Portfolio Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-srv-pink text-srv-pink hover:bg-srv-pink/20">
              <Link to="/whoweare">
                About Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {/* Animated scroll chevrons */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <ScrollChevrons targetId="who-we-are" />
          </div>
        </div>
      </div>
      
      {/* Who We Are Section with Tech Image Slider */}
      <div id="who-we-are" className="relative">
        {/* Technology image slider background */}
        <ImageSlider 
          imagePathPattern="community\/technologies"
          transitionSpeed={4000}
          overlayOpacity={70}
        />
        
        {/* Content overlay */}
        <div className="relative z-20 py-24">
          <Section background="transparent" title="Who we are">
            <div className="flex flex-col space-y-6 mb-12">
              <div className="flex items-start">
                <span className="text-srv-teal text-2xl mr-3 mt-1">⚛️</span>
                <p className="text-xl text-white">
                  We are a Community-Driven VC firm backing{" "}
                  <span className="text-srv-yellow">Deep Tech</span>{" "}
                  startups from Europe at{" "}
                  <span className="text-srv-pink">pre-seed</span> and{" "}
                  <span className="text-srv-pink">seed</span> stages.
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="text-srv-teal text-2xl mr-3 mt-1">👥</span>
                <p className="text-xl text-white">
                  Leveraging our community of 15,000 founders and engineers and
                  live pitching competitions featuring winners now worth over £7 Billion.
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="text-srv-teal text-2xl mr-3 mt-1">🔬️</span>
                <p className="text-xl text-white">
                  We spot fundamental <span className="text-srv-yellow">Computing</span>, <span className="text-srv-yellow">Defence</span> and <span className="text-srv-yellow">Energy</span> companies led by <span className="text-srv-pink">contrarian scientists and engineers</span>.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-around gap-10 mb-16">
              {/* Community images using our specialized CircularImage component */}
              {data.communityImage1?.childImageSharp?.gatsbyImageData && (
                <CircularImage 
                  image={data.communityImage1.childImageSharp.gatsbyImageData} 
                  alt="Community member presenting" 
                  size={180} 
                />
              )}
              
              {data.communityImage2?.childImageSharp?.gatsbyImageData && (
                <CircularImage 
                  image={data.communityImage2.childImageSharp.gatsbyImageData} 
                  alt="Community meetup" 
                  size={180} 
                />
              )}
              
              {data.communityImage3?.childImageSharp?.gatsbyImageData && (
                <CircularImage 
                  image={data.communityImage3.childImageSharp.gatsbyImageData} 
                  alt="Community presenter pitching" 
                  size={180} 
                />
              )}
            </div>
            
            <div className="text-center">
              <Link to="/apply">
                <Button variant="outline" className="border-srv-yellow text-srv-yellow hover:bg-srv-yellow hover:text-black">
                  Apply for funding<ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Add scroll chevrons at the bottom of the Who We Are section */}
            <div className="flex justify-center mt-10 mb-6">
              <ScrollChevrons targetId="our-mission" />
            </div>
          </Section>
        </div>
      </div>
     
      {/* Our Mission Section */}
      <div id="our-mission"></div>
      <Section title="Our Mission">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <GlassCard>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-srv-yellow text-2xl mr-3 flex-shrink-0">💎</span>
                <p className="text-white">
                  Building a new kind of financial institution at the intersection of{" "}
                  <span className="text-srv-pink">Venture Capital</span>,{" "}
                  <span className="text-srv-pink">Science</span> and{" "}
                  <span className="text-srv-pink">Community</span>.
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="text-srv-yellow text-2xl mr-3 flex-shrink-0">💸</span>
                <p className="text-white">
                  Providing super-early investment capital to deeply technical founders based in Europe.
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="text-srv-yellow text-2xl mr-3 flex-shrink-0">📲</span>
                <p className="text-white">
                  We let our founders build but always keep one WhatsApp away, —24/7.
                </p>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-srv-yellow text-2xl mr-3 flex-shrink-0">🔍</span>
                <p className="text-white">
                  We see this VC firm as a search function to spot <span className="text-srv-pink">unusually exceptional</span> technical founders from all over Europe.
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="text-srv-yellow text-2xl mr-3 flex-shrink-0">💻</span>
                <p className="text-white">
                  Focusing on Europe-based enterprises in{" "}
                  <span className="text-srv-pink">Computing</span>,{" "}
                  <span className="text-srv-pink">Defence</span> and{" "}
                  <span className="text-srv-pink">Energy</span>.
                </p>
              </div>
              
              <div className="flex items-start">
                <span className="text-srv-yellow text-2xl mr-3 flex-shrink-0">🚀</span>
                <p className="text-white">
                  Capturing and shaping exceptionally disruptive technolgy growth trends.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 font-mono">
            &lt;We write 1st cheques in Next-Generation technology startups/&gt;
          </h3>
          
          <div className="grid grid-cols-1 text-srv-yellow md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              title={<>[ <span className="text-srv-pink">Deeply Technical</span> ]</>}
              description="Leveraging in-house science and engineering expertise to challenge the status-quo"
            />
            
            <FeatureCard 
              title={<>&#123; <span className="text-srv-pink">Infrastructural</span> &#125;</>}
              description="They solve large scale global problems at a 'picks and shovel' infrastructure level"
            />
            
            <FeatureCard 
              title={<>· <span className="text-srv-pink">Defensible</span> ·</>}
              description="They build fundamental hardware or low level software tech with a strong IP moat against challengers"
            />
            
            <FeatureCard 
              title={<>/ <span className="text-srv-pink">Trend-Setting</span> /</>}
              description="Disrupt internationally the way an industry operates (1B+ potential revenue in 10+ years)"
            />
            
            <FeatureCard 
              title={<>&lt; <span className="text-srv-pink">Global Impact</span> &gt;</>}
              description="Focused on solving key infrastructural challenges in areas like Computing, Climate or Health, and Defence"
            />
            
            <GlassCard className="flex items-center justify-center p-10">
              <Link to="/buildinginpublic">
                <Button className="bg-srv-yellow text-black hover:bg-srv-yellow/80">
                  Read our Build in Public blog
                </Button>
              </Link>
            </GlassCard>
          </div>
        </div>
      </Section>
    </div>
  );
};

// Gatsby page component
const IndexPage = () => {
  return (
    <Layout title="Roundabout Ventures">
      <IndexContent />
    </Layout>
  );
};

export default IndexPage;
export { IndexContent };

// Add SEO metadata for this page using Gatsby's built-in Head API
export const Head = () => (
  <SEO
    title="Roundabout Ventures"
    description="Silicon Roundabout Ventures - Investing in Deep Tech and Big Data startups"
    image="/images/previews/og-index.png"
  />
);
