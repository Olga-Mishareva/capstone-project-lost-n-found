import Head from "next/head";
import { Inter } from "@next/font/google";

import GlobalStyle from "@/styles";
import { TitleBar } from "@/components/TitleBar";
import { Layout } from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
