import Layout from "@/components/Layout/Layout";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import React, { useEffect, useState } from "react";
import { StyledToastContainer } from "@/components/Toast/Toast.styled";
import { ModalProvider } from "@/lib/useModal";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";
import { SessionProvider } from "next-auth/react";
import { DataProvider } from "@/lib/useData";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import { toggleTheme, defaultTheme } from "@/lib/colorThemes";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  function toggleColorTheme(theme) {
    const newTheme = toggleTheme(theme);

    setColorTheme(newTheme);
  }

  const [colorTheme, setColorTheme] = useState(defaultTheme);

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={{ ...colorTheme, toggleColorTheme }}>
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
