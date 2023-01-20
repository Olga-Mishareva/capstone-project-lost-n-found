import Head from "next/head";
import styled from "styled-components";

import { TitleBar } from "./TitleBar";

export function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Lost-n-Found</title>
      </Head>
      <TitleBar></TitleBar>
      <main>{children}</main>
    </div>
  );
}
