import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

interface SEOProps {
  title: string
  description: string
  image?: string
  pathname?: string
}

const SEO: React.FC<SEOProps> = ({ title, description, image, pathname = "/" }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          socialImage
        }
      }
    }
  `)

  const url = `${site.siteMetadata.siteUrl}${pathname}`
  const imgUrl = image
    ? `${site.siteMetadata.siteUrl}${image}`
    : `${site.siteMetadata.siteUrl}${site.siteMetadata.socialImage}`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Open Graph */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:type" content="website" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgUrl} />
    </>
  )
}

export default SEO
