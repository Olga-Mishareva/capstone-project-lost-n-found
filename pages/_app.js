import Head from "next/head";
import { Inter } from "@next/font/google";
import { SWRConfig } from "swr";

import GlobalStyle from "@/styles";
import { Layout } from "@/components/Layout";
import fetcher from "@/lib/fetcher";

const inter = Inter({ subsets: ["latin"], variable: "--inter-font" });

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className={inter.className}>
        <Head>
          <title>Lost-n-Found</title>
        </Head>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SWRConfig>
  );
}
