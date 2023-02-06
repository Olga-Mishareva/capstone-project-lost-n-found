import Head from "next/head";
import { Inter } from "@next/font/google";
import { SWRConfig } from "swr";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import GlobalStyle from "@/styles";
import { Layout } from "@/components/Layout";
import fetcher from "@/lib/fetcher";

const inter = Inter({ subsets: ["latin"], variable: "--inter-font" });

export default function App({ Component, pageProps }) {
  const [showViewButton, setShowViewButton] = useState(false);
  const [listView, setListView] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    if (pathName === "/") {
      setShowViewButton(true);
    } else setShowViewButton(false);
  }, [pathName]);

  function handleToggleView() {
    setListView((prevView) => !prevView);
  }

  return (
    <SWRConfig value={{ fetcher }}>
      <div className={inter.className}>
        <Head>
          <title>Lost-n-Found</title>
        </Head>
        <GlobalStyle />
        <Layout
          onToggle={handleToggleView}
          listView={listView}
          showViewButton={showViewButton}
        >
          <Component {...pageProps} listView={listView} />
        </Layout>
      </div>
    </SWRConfig>
  );
}
