import Layout from "@/components/Layout/Layout";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import React from "react";
import { StyledToastContainer } from "@/components/Toast/Toast.styled";
import { ModalProvider } from "@/lib/useModal";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";
import { DataProvider } from "@/lib/useData";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  return (
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
  );
}
