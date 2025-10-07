import { Helmet } from "react-helmet-async";

const SEO = ({
  title: customTitle,
  description: customDescription,
  keywords: customKeywords,
  ogImage: customOgImage,
  twitterImage: customTwitterImage,
  url: customUrl,
  schema,
}: {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  twitterImage?: string;
  url?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}) => {
  const defaultTitle = "Nadun Malwenna - Portfolio";
  const defaultDescription =
    "Explore the portfolio of Nadun Malwenna, a passionate software engineer specializing in full-stack development, mobile applications, and creating innovative web solutions.";
  const defaultKeywords =
    "Nadun Malwenna, portfolio, software engineer, full-stack developer, mobile developer, web development, React, Node.js, JavaScript, TypeScript, personal projects, programming, coding";
  const defaultOgImage = "https://hewagenkm.com/og-image.png";
  const defaultTwitterImage = "https://hewagenkm.com/og-image.png";
  const defaultUrl = "https://hewagenkm.com";

  const formattedTitle = customTitle
    ? `${customTitle}`
    : defaultTitle;
  const description = customDescription || defaultDescription;
  const keywords = customKeywords || defaultKeywords;
  const ogImage = customOgImage || defaultOgImage;
  const twitterImage = customTwitterImage || defaultTwitterImage;
  const url = customUrl || defaultUrl;

  return (
    <Helmet>
      {/* Basic */}
      <meta charSet="utf-8" />
      <meta httpEquiv="Content-Language" content="en" />
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Nadun Malwenna" />
      <meta name="copyright" content="Nadun Malwenna" />
      <meta name="application-name" content="Nadun Malwenna" />
      <meta name="apple-mobile-web-app-title" content="Nadun Malwenna" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={formattedTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={twitterImage} />

      {/* JSON-LD Schema */}
      {schema &&
        (Array.isArray(schema) ? (
          schema.map((s, i) => (
            <script key={i} type="application/ld+json">
              {JSON.stringify(s)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
    </Helmet>
  );
};

export default SEO;
