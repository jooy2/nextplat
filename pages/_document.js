import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import React from 'react';

export default class RootDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => <App {...props} />,
    });

    const initialProps = await Document.getInitialProps(ctx);
    const { language } = ctx.req;

    return {
      ...initialProps,
      ...language,
    };
  }

  render() {
    return (
      <Html lang={this.props.language}>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=Edge" key="X-UA-Compatible" />
          <link rel="apple-touch-icon" sizes="180x180" href="https://example.com/icon.png" />
          <link rel="icon" type="image/png" href="https://example.com/favicon.ico" sizes="32x32 16x16" />
          <meta charSet="utf-8" />
          <noscript>
            JavaScript가 비활성화되었습니다. 사이트 동작이 원활하지 못할 수 있습니다.
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
