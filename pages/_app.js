import Layout from "@/components/Layout/Layout";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import { useState, useRef } from "react";
import React from "react";
import { StyledToastContainer } from "@/components/Toast/Toast.styled";
import { DataProvider } from "@/lib/DataContext";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const modalRef = useRef();
  const [modalInfo, setModalInfo] = useState({
    message: "",
    textButtonClose: "",
    textButtonConfirm: "",
    onConfirm: () => {},
    onClose: () => {},
  });

  const openModal = ({
    message,
    textButtonClose,
    textButtonConfirm,
    onConfirm,
  }) => {
    const onClose = function () {
      modalRef.current.close();
    };
    setModalInfo({
      message,
      textButtonClose,
      textButtonConfirm,
      onConfirm,
      onClose,
    });
    modalRef.current.showModal();
  };

  return (
    <>
      <GlobalStyle />
      <StyledToastContainer />
      <Layout>
        <DataProvider>
          <SWRConfig value={{ fetcher }}>
            <Component
              {...pageProps}
              openModal={openModal}
              modalInfo={modalInfo}
              modalRef={modalRef}
            />
          </SWRConfig>
        </DataProvider>
      </Layout>
    </>
  );
}
