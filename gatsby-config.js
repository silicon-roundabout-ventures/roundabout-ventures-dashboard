module.exports = {
  siteMetadata: {
    title: `Roundabout Ventures`,
    description: `Community-Driven VC firm backing Deep Tech and Big Data startups`,
    author: `@roundaboutvc`,
    siteUrl: `https://roundabout.ventures`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // Temporarily removed manifest plugin until we have proper icons
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `roundabout-ventures`,
    //     short_name: `roundabout`,
    //     start_url: `/`,
    //     background_color: `#191c22`,
    //     theme_color: `#88c0d0`,
    //     display: `minimal-ui`,
    //     // Comment out the icon for now until we have a valid icon file
    //     // icon: `public/favicon.ico`,
    //   },
    // },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-emotion`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
} 