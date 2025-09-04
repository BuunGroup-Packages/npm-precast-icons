import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function SEO({
  title = 'Precast Icons | 4000+ Beautiful SVG Icons Library',
  description = 'Beautiful, customizable icons for modern web development. 4000+ high-quality icons for React, Vue, Svelte and more.',
  keywords = 'icons, svg icons, react icons, vue icons, svelte icons, web development, UI icons, precast icons',
  image = '/og-image.png',
  url = 'https://icons.precast.dev',
}: SEOProps) {
  const fullTitle =
    title === 'Precast Icons | 4000+ Beautiful SVG Icons Library'
      ? title
      : `${title} | Precast Icons`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Buun Group" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
