import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { Button } from "../components/ui/button";
import ParticleBackground from '../components/common/ParticleBackground';
import { ArrowRight } from 'lucide-react';
import Layout from "../components/common/Layout";
import { CodeBlock, CodeLine } from "../components/ui/CodeBlock";
import { GlassCard } from "../components/ui/GlassCard";
import { Section } from "../components/ui/Section";
import { Hero, HeroHeading } from '../components/ui/Hero';
import { Container, InnerContainer } from '../components/ui/Container';
import { IconCircle } from '../components/ui/IconCircle';
import { FeatureCard } from '../components/ui/FeatureCard';
import { CircularImage } from '../components/ui/CircularImage';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

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
        <div className="flex flex-col items-center justify-center min-h-[90vh] text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            &lt;Silicon Roundabout Ventures/&gt;
          </h1>
          
          <div className="font-mono text-xl md:text-2xl mb-8 text-white">
            <span>Investing(</span>
            <span className="text-srv-yellow">First</span>)
            {" "}<span className="text-srv-pink">in</span>{" "}
            &#123;{" "}Frontier_Technology.<span className="text-srv-yellow">Founders</span>{" "}&#125;
            {" "}<span className="text-srv-pink">building</span> the future Computing & Physical{" "}
            <span className="text-srv-yellow">Infrastructure</span>
            {" "}
          </div>
        
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-srv-teal text-black hover:bg-srv-teal/80">
              <Link to="/apply">
                Apply For Funding <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-srv-pink text-srv-pink hover:bg-srv-pink/20">
              <Link to="/whoweare">
                About Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Who We Are Section */}
      <Section background="dark" title="Who we are">
        <p className="text-xl text-white mb-12">
          We are a Community-Driven VC firm backing{" "}
          <span className="text-srv-yellow">Deep Tech and Big Data</span>{" "}
          startups at{" "}
          <span className="text-srv-pink">pre-seed</span> and{" "}
          <span className="text-srv-pink">seed</span>,
          leveraging our community of 15,000 founders and engineers and
          our live pitching competitions that over the years featured
          winners now worth over £7 Billion.
        </p>
        <p className="text-xl text-white mb-12">
          Our main focus is on spotting fundamental <span className="text-srv-yellow">Computing</span>, <span className="text-srv-yellow">Defence</span> and <span className="text-srv-yellow">Energy</span> companies led by <span className="text-srv-pink">contrarian scientists and engineers</span> who obsess over society's biggest problems and are "in it" for the long haul.
        </p>
        
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
          <Link to="/whoweare">
            <Button variant="outline" className="border-srv-yellow text-srv-yellow hover:bg-srv-yellow hover:text-black">
              Learn More About Us
            </Button>
          </Link>
        </div>
      </Section>
      
      {/* Our Mission Section */}
      <Section title="Our Mission">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <GlassCard>
            <div className="text-srv-yellow text-2xl mb-4">⚙️</div>
            <p className="text-white text-lg">
              We are building a new kind of financial institution at the intersection of{" "}
              <span className="text-srv-pink">Venture Capital</span>,{" "}
              <span className="text-srv-pink">Science</span> and{" "}
              <span className="text-srv-pink">Community</span>. 
              We provide super-early investment capital, community connections, and a "always one whatsapp away" partnership.
            </p>
          </GlassCard>
          
          <GlassCard>
            <div className="text-srv-yellow text-2xl mb-4">💪</div>
            <p className="text-white text-lg">
              Our mission is to build a search function to spot <span className="text-srv-pink">unusually exceptional</span> technical founders building enterprises primarily in{" "}
              <span className="text-srv-pink">Computing</span>,{" "}
              <span className="text-srv-pink">Defence</span> or{" "}
              <span className="text-srv-pink">Energy</span>, which can capture and help shape exceptionally disruptive growth trends.
            </p>
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
              <Link to="/portfolio">
                <Button className="bg-srv-yellow text-black hover:bg-srv-yellow/80">
                  View Our Portfolio
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
  <>
    <title>Roundabout Ventures</title>
    <meta name="description" content="Silicon Roundabout Ventures - Investing in Deep Tech and Big Data startups" />
  </>
);
