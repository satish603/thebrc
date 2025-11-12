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

import { useEffect } from 'react'; // 🟣 kept (you can remove if unused)

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // // 🛠️ Debug code to find overflowing elements
  // useEffect(() => {
  //   const all = document.querySelectorAll('*');
  //   all.forEach((el) => {
  //     if (el.scrollWidth > window.innerWidth) {
  //       el.style.outline = '2px solid red'; // 🔴 Visually highlight
  //       console.warn('🚨 Overflowing element found:', el);
  //     }
  //   });
  // }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      {/* Sitewide scripts (moved from _document.js) */}
      {/* Google Tag (gtag) */}
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

      {/* JSON-LD organization schema */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "BRC Hub LLP",
            url: "https://thebrchub.tech",
            logo: "https://thebrchub.tech/og-image.png",
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
