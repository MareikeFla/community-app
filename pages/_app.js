import Layout from "@/components/Layout/Layout";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import React from "react";
import { StyledToastContainer } from "@/components/Toast/Toast.styled";
import { DataProvider } from "@/lib/Data/DataContext";
import { ModalProvider } from "@/lib/useModal";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <StyledToastContainer />
      <Layout>
        <DataProvider>
          <SWRConfig value={{ fetcher }}>
            <ModalProvider>
              <Component
                {...pageProps}
                openModal={openModal}
                modalInfo={modalInfo}
                modalRef={modalRef}
              />
              <ConfirmationModal />
            </ModalProvider>
          </SWRConfig>
        </DataProvider>
      </Layout>
    </>
  );
}
