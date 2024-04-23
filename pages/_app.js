import Layout from "@/components/Layout/Layout";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import React, { useEffect, useState } from "react";
import { StyledToastContainer } from "@/components/Toast/Toast.styled";
import { ModalProvider } from "@/lib/useModal";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";
import { SessionProvider, getSession } from "next-auth/react";
import { DataProvider } from "@/lib/useData";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import {
  toggleTheme,
  defaultTheme,
  lightTheme,
  darkTheme,
} from "@/lib/colorThemes";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [colorTheme, setColorTheme] = useState(defaultTheme);

  async function getUserTheme() {
    const session = await getSession();
    return session?.user?.colorTheme || "light";
  }

  function toggleColorTheme() {
    const newTheme = toggleTheme(colorTheme.theme);
    setColorTheme(newTheme);
  }
  useEffect(() => {
    const fetchTheme = async () => {
      const userTheme = await getUserTheme();
      const theme = {
        theme: userTheme,
        colors: userTheme === "light" ? lightTheme : darkTheme,
      };
      setColorTheme(theme);
    };
    fetchTheme();
  }, []);

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
