import React from 'react';
import { HeadFC, PageProps } from 'gatsby';
import Layout from '../components/core/Layout';
import ParticleBackground from '../components/ui/ParticleBackground';
import CommunitySection from '../components/sections/CommunitySection';
import { Toaster } from 'sonner';

/**
 * Community page component for displaying community information and events
 */
const CommunityPage: React.FC<PageProps> = ({ location }) => {

  return (
    <Layout location={location} title="Community | Roundabout Ventures">
      {/* Particle background */}
      <div className="fixed inset-0 -z-10">
        <ParticleBackground />
      </div>
      
      {/* Main content */}
      <CommunitySection />
      
      {/* Toast notifications */}
      <Toaster position="top-right" closeButton />
    </Layout>
  );
};

export default CommunityPage;

/**
 * Head component for SEO metadata
 */
export const Head: HeadFC = () => {
  return (
    <>
      <title>Community | Roundabout Ventures</title>
      <meta name="description" content="Join our vibrant community of founders, engineers, and investors passionate about deep tech and innovation." />
      <meta property="og:title" content="Community | Roundabout Ventures" />
      <meta property="og:description" content="Join our vibrant community of founders, engineers, and investors passionate about deep tech and innovation." />
      <meta property="og:type" content="website" />
    </>
  );
};
