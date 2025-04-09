module.exports = {
  siteMetadata: {
    title: `Roundabout Ventures`,
    description: `Community-Driven VC firm backing Deep Tech and Big Data startups`,
    author: `@roundaboutvc`,
    siteUrl: `https://roundabout.ventures`,
  },
  plugins: [
    // Gatsby v5 has built-in Head API, so react-helmet is redundant
    // See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
    
    // Core image processing plugins
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    
    // Source filesystem for images and other static assets
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    
    // Styling plugins
    `gatsby-plugin-postcss`,
    
    // TypeScript support
    `gatsby-plugin-typescript`,
    
    // Uncomment when we have proper icons
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `roundabout-ventures`,
    //     short_name: `roundabout`,
    //     start_url: `/`,
    //     background_color: `#191c22`,
    //     theme_color: `#88c0d0`,
    //     display: `minimal-ui`,
    //     icon: `src/images/favicon.png`, // This path is relative to the root of the site.
    //   },
    // },
  ],
} 