import Layout from '@/components/layouts/Layout';
import { VCInvestor } from '@/config/airtableConfig';
import SEO from '@/components/parts/SEO';
import { HeadFC } from 'gatsby';
import InvestorDirectory from '@/components/widgets/InvestorDirectory';
import ParticleBackground from '@/components/layouts/ParticleBackground';
import { Link } from 'gatsby';

interface InvestorsProps {
  pageContext: {
    investors: VCInvestor[];
  };
  location: any;
}

const Investors = ({ pageContext, location }: InvestorsProps) => {
  const allInvestors = pageContext.investors ?? [];

  return (
    <Layout title="Deeptech Investors - Silicon Roundabout Ventures" location={location}>
      <div className="min-h-screen pt-28 pb-16">
        <ParticleBackground />
        <div className="container mx-auto px-4">
          <InvestorDirectory
            investors={allInvestors}
            headerSlot={
              <>
                {/* Title */}
                <div className="mb-10 text-center">
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">&lt;Deeptech Investors/&gt;</h1>
                  <p className="text-white/90 max-w-2xl mx-auto mb-8">
                    Explore the deeptech VC firms, angels, and investors in our network.
                  </p>
                </div>
              </>
            }
          />
          <div className="flex justify-center mt-8">
            <Link
              to="/addinvestor/"
              className="px-4 py-2 rounded-full font-mono text-sm transition-all border bg-black/40 text-white border-white/20 hover:border-srv-teal/50"
            >
              + Add Your Firm
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const Head: HeadFC = ({ location }) => (
  <SEO
    title="Deeptech Investors - Silicon Roundabout Ventures"
    description="Explore the VC firms, angels, and investors we've co-invested alongside"
    pathname={location.pathname}
  />
);

export default Investors;
