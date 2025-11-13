// src/Utilis/SeoHead.js
import Head from "next/head";

const SeoHead = ({ title, description, keywords, image, url }) => {
  const defaultTitle = "Blazing Render Creation Hub LLP | Web & App Dev Agency";
  const defaultDescription = "Custom digital solutions built with React, Next.js, Node.js, and more. BRC HUB is your one-stop destination for modern app development.";
  const defaultKeywords = "Web development, Mobile apps, React, Next.js, BRC HUB, Blazing Render, India dev agency, full-stack services";
  const defaultImage = "/og-image.png"; // Replace with your real OG image path
  const defaultUrl = "https://thebrchub.tech";

  return (
    <Head>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#2cb1ff" />
      <meta name="author" content="Blazing Render Creation Hub LLP" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url || defaultUrl} />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Head>
  );
};

export default SeoHead;
