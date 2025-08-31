import { type ReactNode } from 'react'
import { Helmet } from 'react-helmet'

interface ReactHelmetMetadata {
  children: ReactNode
  pageURL: string
  title?: string
  description?: string
  imageURL?: string
}

export const ReactHelmetMetadata = (props: ReactHelmetMetadata) => {
  const { title, children, description, imageURL, pageURL } = props

  return (
    <div>
      <Helmet>
        {/* Primary Meta Tags  */}
        <title>{title || 'Books'}</title>
        <meta name="title" content="Book" />
        <meta name="description" content={description} />

        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageURL} />
        <meta property="og:title" content={title || 'Books'} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageURL} />

        {/* Twitter  */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageURL} />
        <meta property="twitter:title" content={title || 'Books'} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={imageURL} />
      </Helmet>
      {children}
    </div>
  )
}
