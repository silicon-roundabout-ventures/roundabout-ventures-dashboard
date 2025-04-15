import React from 'react';
import { Link } from 'gatsby';
import ParticleBackground from '../components/common/ParticleBackground';
import Layout from '../components/common/Layout';

const ForInvestorsContent = () => {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">&lt;For Investors/&gt;</h1>
          <p className="text-lg text-srv-gray max-w-2xl mx-auto">
            If you are interested in exposure to next generation technology builders from Europe on a mission to build titanic global companies, let us know.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-srv-dark/70 backdrop-blur-sm p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">&lt;Join Our Fund/&gt;</h2>
            <p className="text-white mb-6">
              Silicon Roundabout Ventures offers a unique opportunity for investors to access a highly curated portfolio of <span className='text-srv-yellow'>deeptech</span> startups from the UK and Europe, in critical sectors that are reshaping our world during this century, such as <span className='text-srv-pink'>Computing </span>, <span className='text-srv-pink'>Defence</span>, and <span className='text-srv-pink'>Energy</span>. Our techical backgrounds and <span className='text-srv-yellow'>community-driven approach</span> allows us to meet and assess founders very early on that others may miss.
            </p>

            <p className="text-white mb-6">
              We like to work and invest for people who share our values. While our current fund is closed to new clients, we encourage prospective LPs to express their interest in advance, so that we can get to know potential investors in future funds early on.
            </p>

            <h3 className="text-xl font-bold text-white mt-8 mb-4">&lt;Key Benefits/&gt;</h3>
            <ul className="list-disc pl-6 mb-8 text-white space-y-3">
              <li>Access to some of the most transformative pre-seed and seed stage deeptech startups in Europe</li>
              <li>Proprietary deal flow from our 15,000+ community</li>
              <li>Technical team and agile soloGP approach</li>
              <li>Quarterly LP updates and community meetings</li>
              <li>Community of fellow angels and LPs looking for outsized growth: We got backing by 50+ active angel investors plus the likes of Molten Ventures (LSE:GROW), Multiple Capital, and exited founders and operators including 1 Nasdaq listed & 3 unicorn companies.</li> 
              <li>Co-investment opportunities in select portfolio companies</li>
            </ul>
            
            <div className="mt-8 text-center mb-12">
              <Link
                to="/lpenquiries"
                className="bg-white hover:bg-gray-200 text-srv-dark font-medium py-3 px-8 rounded-md transition-colors inline-block"
              >
                Express Interest in Becoming an LP
              </Link>
            </div>

            <br />

            <p className="text-white mb-6 text-sm">
            <i>Silicon Roundabout Ventures Advisers Ltd is regulated in the UK by the Financial Conduct Authority, Small UK AIFM license n# 969137</i>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

const ForInvestors = () => {
  return (
    <Layout title="For Investors - Roundabout Ventures">
      <ForInvestorsContent />
    </Layout>
  );
};

export default ForInvestors;
