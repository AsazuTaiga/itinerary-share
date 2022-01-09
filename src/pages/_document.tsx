import { Html, Head, Main, NextScript } from "next/document";

const Docuemnt = () => {
  return (
    <Html>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="旅程シェア" />
        <meta property="og:url" content="https://www.itineraryshare.app/" />
        <meta property="og:sit_name" content="旅程シェア" />
        <meta
          property="og:description"
          content="さっと旅程を作成して、シェアしましょう！"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/ogp.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Docuemnt;
