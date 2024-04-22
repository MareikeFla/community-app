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
    one: "#f8f8f9", // --color_body
    two: "#f5f5f5", // --color_pale-grey
    three: "#d8d8d8", // --color_light-grey
    four: "#737678", // --color_grey
    five: "#5b5f62", // --color_night
    six: "#434648", // --color_midnight
    seven: "#ffb169", //  --color_light-orange
    eight: "#ff9957", // --color_orange
    nine: "#f9847c", // --color_light-red
    ten: "#ff6e63", // --color_red
    gradientOne: "linear-gradient(to top right, #fea554, #ff5e62)", // --color_sunset
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
