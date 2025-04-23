import Head from 'next/head';
<meta property="og:image" content="https://thebrchub.com/og-image.png" />

const Heads = () => {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>Blazing Render Creation Hub | Web, App & VFX Solutions</title>
      <meta name="title" content="Blazing Render Creation Hub | Web, App & VFX Solutions" />
      <meta name="description" content="BRC Hub is a full-stack creative agency offering sleek websites, apps, UI/UX, animations, and VFX. Powered by React, Next.js, Node, Flutter & more." />
      <meta name="keywords" content="BRC Hub, Web development agency, Animation studio India, VFX services, Frontend design, React Next.js agency, UI UX design, Digital agency Bangalore, Web design, Creative tech studio, web development, app development, UI/UX design, VFX agency, Next.js, React.js, Flutter, Node.js, TypeScript, custom software, BRC Hub, ballari, karnakata" />
      <meta name="author" content="Blazing Render Creation Hub LLP" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.thebrchub.com/" />
      <meta property="og:title" content="Blazing Render Creation Hub | Web, VFX & Animation Studio" />
      <meta property="og:description" content="We fuse design and code to create stunning websites, interfaces, VFX, and animation that convert ideas into digital reality." />
      <meta property="og:image" content="/public/og-image.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.thebrchub.com/" />
      <meta property="twitter:title" content="Blazing Render Creation Hub | Web, VFX & Animation Studio" />
      <meta property="twitter:description" content="BRC Hub delivers cutting-edge digital experiences through design, animation, web development and VFX." />
      <meta property="twitter:image" content="/public/og-image.png" />

    {/* Open Graph (for social sharing previews) */}
    <meta property="og:url" content="https://thebrchub.com" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Blazing Render Creation Hub LLP | Web, App & VFX Solutions" />
      <meta property="og:description" content="We design and develop fully customized websites, mobile apps, and VFX solutions using the latest tech — from React and Next.js to Flutter and TypeScript." />
      <meta property="og:image" content="https://thebrchub.com/og-image.png" /> {/* Replace with actual OG image URL if available */}


      {/* Favicon */}
      <link rel="icon" href="/public/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" />

      <meta property="og:image" content="https://thebrchub.com/og-image.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

       {/* SEO Boosters */}
  <meta name="robots" content="index, follow" />
  <meta name="keywords" content="Web development, Mobile apps, React, Next.js, BRC HUB, Blazing Render, India development agency, custom web solutions" />
  <meta name="theme-color" content="#2cb1ff" />
  <script type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Blazing Render Creation Hub LLP",
  "url": "https://www.thebrchub.com",
  "logo": "https://www.thebrchub.com/og-image.png",
  "sameAs": ["https://www.instagram.com/thebrchub","https://twitter.com/thebrchub", "https://www.facebook.com/thebrchub", "https://www.linkedin.com/company/thebrchub",
  "https://youtube.com/@TheBRCHub"],
  "description": "A creative agency offering web, mobile app, animation, and VFX solutions."
}
`}
</script>


    </Head>
  );
};

export default Heads;
