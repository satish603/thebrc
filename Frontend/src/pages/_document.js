// src/pages/_document.js
import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "Emotion";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Emotion insertion point */}
          <meta name="emotion-insertion-point" content="" />

          {/* Light/Dark favicons (served from /public)
              - favicon-light.png should be the dark-coloured logo (visible on light backgrounds)
              - favicon-dark.png should be the light-coloured logo (visible on dark backgrounds)
              Browsers that support prefers-color-scheme will pick the correct one.
          */}
          <link rel="icon" href="/favicon-light.png" media="(prefers-color-scheme: light)" />
          <link rel="icon" href="/favicon-dark.png" media="(prefers-color-scheme: dark)" />
          {/* fallback */}
          <link rel="shortcut icon" href="/favicon-light.png" />

          {/* emotion SSR styles */}
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
