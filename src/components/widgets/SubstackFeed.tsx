import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/parts/Card";
import { Button } from "@/components/parts/button";
import { ExternalLink, Calendar } from 'lucide-react';

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  image?: string;
}

interface SubstackFeedProps {
  posts: SubstackPost[];
}

const SubstackFeed: React.FC<SubstackFeedProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p>No recent posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {posts.map((post, index) => {
        const date = new Date(post.pubDate).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

        // Clean up title if it contains HTML entities or extra spaces
        const title = post.title.trim();
        const snippet = post.contentSnippet
          ? post.contentSnippet.substring(0, 100) + '...'
          : 'Read more on our blog...';

        return (
          <Card key={index} className="bg-black/40 border-white/10 flex flex-col h-full hover:border-srv-yellow/50 transition-colors duration-300 overflow-hidden group">
            {/* Image Section */}
            <div className="w-full h-48 overflow-hidden bg-gray-900 border-b border-white/5 relative">
              {post.image ? (
                <img
                  src={post.image}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-srv-teal/10">
                  <span className="text-srv-teal text-4xl font-bold opacity-30">&lt;/&gt;</span>
                </div>
              )}
              <div className="absolute top-0 right-0 bg-black/60 backdrop-blur-sm px-3 py-1 m-2 rounded text-xs text-white font-mono border border-white/10">
                {date}
              </div>
            </div>

            <CardHeader className="pt-4 pb-2">
              <CardTitle className="text-lg text-white font-bold leading-tight line-clamp-2 min-h-[3rem]">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow pt-2">
              <p className="text-sm text-gray-400 line-clamp-3">
                {snippet}
              </p>
            </CardContent>
            <CardFooter className="pt-2 pb-4">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="ghost" className="w-full justify-between text-srv-yellow hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20">
                  Read Article <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default SubstackFeed;
