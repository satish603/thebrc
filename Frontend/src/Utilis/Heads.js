import Head from 'next/head';
<meta property="og:image" content="https://thebrchub.com/og-image.png" />

const Heads = () => {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>Blazing Render Creation Hub | Web, VFX & Animation Studio</title>
      <meta name="title" content="Blazing Render Creation Hub | Web, VFX & Animation Studio" />
      <meta name="description" content="BRC Hub is a digital agency fusing technology and creativity to build websites, interfaces, animations, and VFX experiences that leave a mark. We bring your ideas to life with pixel-perfect precision." />
      <meta name="keywords" content="BRC Hub, Web development agency, Animation studio India, VFX services, Frontend design, React Next.js agency, UI UX design, Digital agency Bangalore, Web design, Creative tech studio" />
      <meta name="author" content="Blazing Render Creation Hub LLP" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.thebrchub.com/" />
      <meta property="og:title" content="Blazing Render Creation Hub | Web, VFX & Animation Studio" />
      <meta property="og:description" content="We fuse design and code to create stunning websites, interfaces, VFX, and animation that convert ideas into digital reality." />
      <meta property="og:image" content="/static/seo-banner.jpg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.thebrchub.com/" />
      <meta property="twitter:title" content="Blazing Render Creation Hub | Web, VFX & Animation Studio" />
      <meta property="twitter:description" content="BRC Hub delivers cutting-edge digital experiences through design, animation, web development and VFX." />
      <meta property="twitter:image" content="/static/seo-banner.jpg" />

      {/* Favicon */}
      <link rel="icon" href="/public/favicon.ico" />

      <meta property="og:image" content="https://thebrchub.com/og-image.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Head>
  );
};

export default Heads;
