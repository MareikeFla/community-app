import Layout from "@/components/Layout/Layout";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import React from "react";
import { StyledToastContainer } from "@/components/Toast/Toast.styled";
import { ModalProvider } from "@/lib/useModal";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";
import { SessionProvider } from "next-auth/react";
import { DataProvider } from "@/lib/useData";
import { ThemeProvider } from "styled-components";

import Head from "next/head";

const theme = {
  colors: {
    white: "#fff",
    one: "#f8f8f9",
    two: "#f5f5f5",
    three: "#d8d8d8",
    four: "#737678",
  },
  fonts: {},
  effects: {},
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Pin & Join</title>
        </Head>
        <DataProvider>
          <GlobalStyle />
          <StyledToastContainer />
          <Layout>
            <SWRConfig value={{ fetcher }}>
              <ModalProvider>
                <Component {...pageProps} />
                <ConfirmationModal />
              </ModalProvider>
            </SWRConfig>
          </Layout>
        </DataProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
