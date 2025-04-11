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
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

// Content component to separate from layout
const IndexContent = () => {
  // Fetch community images for the Who We Are section
  const data = useStaticQuery(graphql`
    query {
      communityImage1: file(relativePath: { eq: "community/community-franpitch-square.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 120, height: 120, layout: FIXED, quality: 100)
        }
      }
      communityImage2: file(relativePath: { eq: "community/community-meetup-square.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 120, height: 120, layout: FIXED, quality: 100)
        }
      }
      communityImage3: file(relativePath: { eq: "community/community-womanpitch-square.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 120, height: 120, layout: FIXED, quality: 100)
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
            <span>Connecting (</span>
            <span className="text-srv-yellow">Capital</span>) &#123;
            {" "}<span className="text-srv-pink">with</span>{" "}
            Next-Generation.<span className="text-srv-yellow">Technologies</span>
            {" "}<span className="text-srv-pink">in</span> Computer & Physical{" "}
            <span className="text-srv-yellow">Science</span>
            {" "}&#125;
          </div>
        
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-srv-teal text-black hover:bg-srv-teal/80">
              <Link to="/portfolio">
                Our Portfolio <ArrowRight className="ml-2 h-4 w-4" />
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
          winners now worth over £6 Billion.
        </p>
        
        <div className="flex flex-wrap justify-around gap-10 mb-16">
          <IconCircle>
            <div className="rounded-full overflow-hidden w-[120px] h-[120px]">
              {data.communityImage1?.childImageSharp?.gatsbyImageData && (
                <GatsbyImage 
                  image={data.communityImage1.childImageSharp.gatsbyImageData} 
                  alt="Community member presenting" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </IconCircle>
          <IconCircle>
            <div className="rounded-full overflow-hidden w-[120px] h-[120px]">
              {data.communityImage2?.childImageSharp?.gatsbyImageData && (
                <GatsbyImage 
                  image={data.communityImage2.childImageSharp.gatsbyImageData} 
                  alt="Community meetup" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </IconCircle>
          <IconCircle>
            <div className="rounded-full overflow-hidden w-[120px] h-[120px]">
              {data.communityImage3?.childImageSharp?.gatsbyImageData && (
                <GatsbyImage 
                  image={data.communityImage3.childImageSharp.gatsbyImageData} 
                  alt="Community presenter pitching" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </IconCircle>
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
              <span className="text-srv-pink">Venture, Science and Community</span>. 
              We provide investment capital, community connections and hands-on support to seed founders.
            </p>
          </GlassCard>
          
          <GlassCard>
            <div className="text-srv-yellow text-2xl mb-4">💪</div>
            <p className="text-white text-lg">
              Our mission is to help technical founding teams building solutions based on{" "}
              <span className="text-srv-pink">computer</span> or{" "}
              <span className="text-srv-pink">physical sciences</span>{" "}
              that are solving large-scale global problems.
            </p>
          </GlassCard>
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 font-mono">
            &lt;We write 1st cheques in Next-Generation technology startups/&gt;
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              title={<>[ <span className="text-srv-pink">Technical</span> ]</>}
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
