const Parser = require('rss-parser');
const parser = new Parser();

(async () => {
    try {
        const feed = await parser.parseURL('https://blog.siliconroundabout.ventures/feed');
        console.log('Feed title:', feed.title);
        if (feed.items.length > 0) {
            console.log('First item structure keys:', Object.keys(feed.items[0]));
            console.log('First item enclosure:', feed.items[0].enclosure);
            console.log('First item content snippet:', feed.items[0].contentSnippet?.substring(0, 50));
            // Check for image in content
            const content = feed.items[0].content || feed.items[0]['content:encoded'];
            const imgMatch = content?.match(/<img[^>]+src="([^">]+)"/);
            console.log('Image from content:', imgMatch ? imgMatch[1] : 'None');
        }
    } catch (err) {
        console.error(err);
    }
})();
