import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class Doc extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <script> </script> {/* Fixes load animation flash - must be immediately after opening body tag */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}