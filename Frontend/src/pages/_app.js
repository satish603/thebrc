import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Script from 'next/script';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from 'Theme';
import createEmotionCache from 'Emotion';
const clientSideEmotionCache = createEmotionCache();

// Fonts
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />

        {/* ========== FAVICONS (THEME AWARE) ========== */}
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

        {/* Apple icon */}
        <link
          rel="apple-touch-icon"
          href="/logo-light.png"
        />

        {/* ========== SOCIAL META TAGS ========== */}
        <meta
          property="og:title"
          content="Blazing Render Creation Hub LLP"
        />
        <meta
          property="og:description"
          content="A full-stack creative agency building sleek websites, apps, UI/UX, branding, animation & VFX."
        />
        <meta
          property="og:image"
          content="https://thebrchub.tech/og-image.png"
        />
        <meta property="og:url" content="https://thebrchub.tech" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Google Tag */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-KH67ZDJMXC"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KH67ZDJMXC');
        `}
      </Script>

      {/* ========== ORGANIZATION JSON-LD (Google rich logo) ========== */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Blazing Render Creation Hub LLP",
            url: "https://thebrchub.tech",
            logo: "https://thebrchub.tech/logo-dark.png", // dark version for white backgrounds
            sameAs: [
              "https://www.linkedin.com/company/thebrchub",
              "https://www.instagram.com/thebrchub",
              "https://www.facebook.com/thebrchub",
              "https://www.youtube.com/@TheBRCHub",
            ],
          }),
        }}
      />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
