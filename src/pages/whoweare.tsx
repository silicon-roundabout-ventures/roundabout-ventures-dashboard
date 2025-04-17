import React from 'react';
import { HeadFC, PageProps } from 'gatsby';
import Layout from '../components/layouts/Layout';
import ParticleBackground from '../components/common/ParticleBackground';
import WhoWeAreSection from '../components/sections/WhoWeAreSection';
import { Toaster } from 'sonner';

/**
 * Who We Are page component for displaying team information
 */
const WhoWeArePage: React.FC<PageProps> = ({ location }) => {
  return (
    <Layout location={location} title="Who We Are | Roundabout Ventures">
      {/* Particle background */}
      <div className="fixed inset-0 -z-10">
        <ParticleBackground />
      </div>
      
      {/* Main content */}
      <WhoWeAreSection />
      
      {/* Toast notifications */}
      <Toaster position="top-right" closeButton />
    </Layout>
  );
};

export default WhoWeArePage;

/**
 * Head component for SEO metadata
 */
export const Head: HeadFC = () => {
  return (
    <>
      <title>Who We Are | Roundabout Ventures</title>
      <meta name="description" content="We are a Community-Driven VC firm backing Deep Tech founders with extreme conviction at pre-seed and seed stages." />
      <meta property="og:title" content="Who We Are | Roundabout Ventures" />
      <meta property="og:description" content="Learn more about the Silicon Roundabout Ventures team and our mission to back deep tech founders." />
      <meta property="og:type" content="website" />
    </>
  );
};
