import React from 'react';
import { graphql, PageProps } from 'gatsby';
import ParticleBackground from '@/components/layouts/ParticleBackground';
import { Button } from "@/components/parts/button";
import Layout from '@/components/layouts/Layout';
import { Link } from 'gatsby';
import { ArrowRight } from 'lucide-react';
import SubstackFeed from '@/components/widgets/SubstackFeed';

interface BuildingInPublicProps extends PageProps {
  data: {
    allSubstackPost: {
      nodes: Array<{
        title: string;
        link: string;
        pubDate: string;
        contentSnippet?: string;
      }>
    }
  }
}

const BuildingInPublicContent: React.FC<{ posts: any[] }> = ({ posts }) => {
  return (
    <div className="min-h-screen pt-28 pb-16">
      <ParticleBackground />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">&lt;Building in Public/&gt;</h1>
          <p className="text-lg text-srv-gray max-w-2xl mx-auto">
            Sharing our journey as we build Silicon Roundabout Ventures.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-black/70 backdrop-blur-sm border border-white/10 p-8 rounded-lg mb-12">
            <p className="text-xl text-white mb-6 text-center">
              Every month Silicon Roundabout Ventures GP, Francesco Perticarari, sends this public list the (almost identical)
              update sent to our LPs. Exclusive perks, information, and sensitive information may need to be redacted,
              but as much as possible is shared publicly.
            </p>

            <div className="italic text-center border-l-4 border-srv-yellow pl-4 py-2 my-8 text-white">
              <p className="mb-2">"Francesco is blazing the trail, so that others can run along the path."</p>
              <p className="text-srv-gray">─ Dave Neumann, Molten Ventures FoF Team & Silicon Roundabout Ventures LP</p>
            </div>

            <div className="text-center mb-8">
              <p className="text-white mb-4">Get the next report in your inbox:</p>
              <a
                href="https://blog.siliconroundabout.ventures/subscribe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="default" size="lg" className="bg-srv-yellow text-black hover:bg-srv-yellow/80">
                  New Articles Release Signup
                </Button>
              </a>
            </div>

            <h2 className="text-2xl font-bold text-white mb-12 text-center">&lt;Latest Posts/&gt;</h2>

            {/* Substack Feed */}
            <SubstackFeed posts={posts} />

            <div className="text-center mt-12">
              <p className="text-white mb-6">Check out more articles and Sign up:</p>
              <a
                href="https://blog.siliconroundabout.ventures"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" size="lg" className="border-srv-yellow text-srv-yellow hover:bg-srv-yellow hover:text-black">
                  View All Posts
                </Button>
              </a>
            </div>
          </div>

          {/* Call to action */}
          <div className="flex flex-wrap gap-4 justify-center mt-6 mb-12 px-4 w-full">
            <Button asChild size="lg" className="bg-srv-teal text-black hover:bg-srv-teal/80">
              <Link to="/apply">
                Apply For Funding <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="border-srv-pink text-srv-pink hover:bg-srv-pink/20">
              <Link to="/lpenquiries">
                LP Enquiries <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

const BuildingInPublic: React.FC<BuildingInPublicProps> = ({ data }) => {
  return (
    <Layout title="Building in Public Blog">
      <BuildingInPublicContent posts={data.allSubstackPost.nodes} />
    </Layout>
  );
};

export const query = graphql`
  query BuildingInPublicQuery {
    allSubstackPost(sort: { pubDate: DESC }, limit: 8) {
      nodes {
        title
        link
        pubDate
        contentSnippet
        image
      }
    }
  }
`

export default BuildingInPublic;
