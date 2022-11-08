import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class RootDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => <App {...props} />,
      });

    const initialProps = await Document.getInitialProps(ctx);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    return {
      ...initialProps,
      baseUrl,
    };
  }

  render() {
    const { baseUrl, locale } = this.props;

    return (
      <Html lang={locale}>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href={`${baseUrl}/icon.png`} />
          <link rel="icon" type="image/png" href={`${baseUrl}/favicon.ico`} sizes="32x32 16x16" />
          <meta charSet="utf-8" />
          <noscript>Please enable JavaScript for the correct behavior of web pages.</noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
