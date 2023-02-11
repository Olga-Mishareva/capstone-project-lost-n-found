import Head from "next/head";
import { Inter } from "@next/font/google";
import { SWRConfig } from "swr";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

import GlobalStyle from "@/styles";
import { Layout } from "@/components/Layout";
import fetcher from "@/lib/fetcher";

const inter = Inter({ subsets: ["latin"], variable: "--inter-font" });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const pathName = usePathname();

  const [listView, setListView] = useState(false);
  const [clickPosition, setClickPosition] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  function handleOpenPopup() {
    setShowPopup(true);
  }

  function handleClosePopup() {
    setShowPopup(false);
  }

  function getCoordinates(data) {
    setClickPosition(data);
  }

  function handleToggleView() {
    setListView((prevView) => !prevView);
  }

  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher }}>
        <div className={inter.className}>
          <Head>
            <title>Lost-n-Found</title>
          </Head>
          <GlobalStyle />
          <Layout
            onToggle={handleToggleView}
            listView={listView}
            pathName={pathName}
          >
            <Component
              {...pageProps}
              listView={listView}
              onPosition={getCoordinates}
              clickPosition={clickPosition}
              showPopup={showPopup}
              onShowPopup={handleOpenPopup}
              onClosePopup={handleClosePopup}
            />
          </Layout>
        </div>
      </SWRConfig>
    </SessionProvider>
  );
}
