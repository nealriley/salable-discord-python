import config from "@config/config.json";
import theme from "@config/theme.json";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { SalableProvider } from "/components/salable";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import "styles/style.scss";

const App = ({ Component, pageProps }) => {
  // default theme setup

  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const [fontcss, setFontcss] = useState();
  useEffect(() => {
    fetch(
      `https://fonts.googleapis.com/css2?family=${pf}${
        sf ? "&family=" + sf : ""
      }&display=swap`
    ).then((res) => res.text().then((css) => setFontcss(css)));
  }, [pf, sf]);

  // google tag manager (gtm)
  const tagManagerArgs = {
    gtmId: config.params.tag_manager_id,
  };
  useEffect(() => {
    setTimeout(() => {
      process.env.NODE_ENV === "production" &&
        config.params.tag_manager_id &&
        TagManager.initialize(tagManagerArgs);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `${fontcss}`,
          }}
        />
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <script dangerouslySetInnerHTML={{__html: `
            (function(I,n,f,o,b,i,p){
            I[b]=I[b]||function(){(I[b].q=I[b].q||[]).push(arguments)};
            I[b].t=1*new Date();i=n.createElement(f);i.async=1;i.src=o;
            p=n.getElementsByTagName(f)[0];p.parentNode.insertBefore(i,p)})
            (window,document,'script','https://livechat.infobip.com/widget.js','liveChat');

            liveChat('init', '490b5be2-4b6e-4589-bd76-84a1c04a952d');`}}/>  
      </Head>
      <ClerkProvider {...pageProps}>
        <SalableProvider {...pageProps}>
            <Component {...pageProps} />
          </SalableProvider>
      </ClerkProvider>
    </>
  );
};

export default App;
