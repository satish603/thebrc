import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script'; // ✅ import Script
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from 'Emotion';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="emotion-insertion-point" content="" />
                    <link rel="shortcut icon" href="/static/favicon.ico" />

                    {/* ✅ Google Tag using Next.js Script */}
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

                    {/* ✅ JSON-LD */}
                    <Script
                        type="application/ld+json"
                        id="organization-schema"
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
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        ...initialProps,
        emotionStyleTags,
    };
};
