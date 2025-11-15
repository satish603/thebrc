import Head from 'next/head';

const Heads = () => {
  return (
    <Head>

      {/* PRIMARY META */}
      <title>Blazing Render Creation Hub | Web, App & VFX Solutions</title>
      <meta name="title" content="Blazing Render Creation Hub | Web, App & VFX Solutions" />
      <meta
        name="description"
        content="BRC Hub is a full-stack creative agency offering sleek websites, apps, UI/UX, animations, and VFX. Powered by React, Next.js, Node, Flutter & more."
      />
      <meta
        name="keywords"
        content="BRC Hub, Web development agency, Animation studio India, VFX services, React Next.js agency, UI UX design, web development, app development, custom software"
      />
      <meta name="author" content="Blazing Render Creation Hub LLP" />

      {/* OG / SOCIAL SHARE */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.thebrchub.tech" />
      <meta property="og:title" content="Blazing Render Creation Hub LLP | Web, App & VFX Solutions" />
      <meta
        property="og:description"
        content="We design and develop fully customized websites, mobile apps, and VFX solutions using modern technology."
      />
      <meta property="og:image" content="https://thebrchub.tech/og-image.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Blazing Render Creation Hub | Web, App & VFX Solutions" />
      <meta name="twitter:description" content="Creative tech studio delivering apps, websites, VFX and UI design." />
      <meta name="twitter:image" content="https://thebrchub.tech/og-image.png" />

      {/* ← NEW — AUTO FAVICON SWITCHING */}
      <link
        rel="icon"
        href="/favicon-light.png"
        media="(prefers-color-scheme: light)"
      />
      <link
        rel="icon"
        href="/favicon-dark.png"
        media="(prefers-color-scheme: dark)"
      />
      {/* fallback */}
      <link rel="icon" href="/favicon-light.png" />

      {/* THEME COLOR */}
      <meta name="theme-color" content="#2cb1ff" />

      {/* SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Blazing Render Creation Hub LLP",
            "url": "https://www.thebrchub.tech",
            "logo": "https://thebrchub.tech/og-image.png",
            "sameAs": [
              "https://www.instagram.com/thebrchub",
              "https://twitter.com/thebrchub",
              "https://www.facebook.com/thebrchub",
              "https://www.linkedin.com/company/thebrchub",
              "https://youtube.com/@TheBRCHub"
            ],
            "description": "A creative agency offering web, mobile app, animation, and VFX solutions."
          }
        `,
        }}
      />
    </Head>
  );
};

export default Heads;
