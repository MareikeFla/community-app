import Layout from "@/components/Layout/Layout";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import { useState, useRef } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const dialogElement = useRef();

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
    setModalInfo({
      message,
      textButtonClose,
      textButtonConfirm,
      onConfirm,
      onClose,
    });
    dialogElement.current.showModal();
  };
  const onClose = function () {
    dialogElement.current.close();
  };

  return (
    <>
      <GlobalStyle />
      <Layout>
        <SWRConfig value={{ fetcher }}>
          <Component
            {...pageProps}
            openModal={openModal}
            modalInfo={modalInfo}
            dialogElement={dialogElement}
          />
        </SWRConfig>
      </Layout>
    </>
  );
}
