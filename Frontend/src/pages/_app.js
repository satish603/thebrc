import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
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

import { useEffect } from 'react'; // 🟣 Add this

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // 🛠️ Debug code to find overflowing elements
  useEffect(() => {
    const all = document.querySelectorAll('*');
    all.forEach((el) => {
      if (el.scrollWidth > window.innerWidth) {
        el.style.outline = '2px solid red'; // 🔴 Visually highlight
        console.warn('🚨 Overflowing element found:', el);
      }
    });
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
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
