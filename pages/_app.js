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

const light = {
  base: "#fff", // --color_cards
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
  eleven: "#4fb386", // --toastify-color-success
  gradientOne: "linear-gradient(to top right, #fea554, #ff5e62)", // --color_sunset
  categoryOne: "#ec495d", // --color_activism
  categoryTwo: "#a269b6", // --color_art
  categoryThree: "#22a5cb", // --color_education
  categoryFour: "#98bb4f", // --color_sport
  shadowOne: "rgba(91, 95, 98, 0.2)", // --shadow_card
  shadowTwo: "rgba(91, 95, 98, 0.24)", // --shadow_round-button
};

const dark = {
  base: "#111111", // --color_base
  one: "#1a1a1a", // --color_body
  two: "#0f0f0f", // --color_pale-grey
  three: "#2e2e2e", // --color_light-grey
  four: "#9a9e9f", // --color_grey
  five: "#b3b7b9", // --color_night
  six: "#8f9294", // --color_midnight
  seven: "#ffb169", //  --color_light-orange
  eight: "#ff9957", // --color_orange
  nine: "#f9847c", // --color_light-red
  ten: "#ff6e63", // --color_red
  eleven: "#4fb386", // --toastify-color-success
  gradientOne: "linear-gradient(to top right, #fea554, #ff5e62)", // --color_sunset
  categoryOne: "#ec495d", // --color_activism
  categoryTwo: "#a269b6", // --color_art
  categoryThree: "#22a5cb", // --color_education
  categoryFour: "#98bb4f", // --color_sport
  shadowOne: "rgba(91, 95, 98, 0.2)", // --shadow_card
  shadowTwo: "rgba(91, 95, 98, 0.24)", // --shadow_round-button
};

const theme = {
  info: "dark",
  colors: light,
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
