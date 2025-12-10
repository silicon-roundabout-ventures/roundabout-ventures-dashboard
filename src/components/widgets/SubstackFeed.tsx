import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/parts/Card";
import { Button } from "@/components/parts/button";
import { ExternalLink, Calendar } from 'lucide-react';

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
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
          ? post.contentSnippet.substring(0, 120) + '...'
          : 'Read more on our blog...';

        return (
          <Card key={index} className="bg-black/40 border-white/10 flex flex-col h-full hover:border-srv-yellow/50 transition-colors duration-300">
            <CardHeader>
              <div className="flex items-center text-xs text-srv-gray mb-2">
                <Calendar className="w-3 h-3 mr-1" />
                {date}
              </div>
              <CardTitle className="text-lg text-white font-bold leading-tight line-clamp-2">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-300 line-clamp-3">
                {snippet}
              </p>
            </CardContent>
            <CardFooter>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="ghost" className="w-full justify-between text-srv-yellow hover:text-white hover:bg-white/10">
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
