import Layout from "@/components/Layout/Layout";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import { useState, useRef } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const hook = useRef();

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
      hook.current.close();
    };
    setModalInfo({
      message,
      textButtonClose,
      textButtonConfirm,
      onConfirm,
      onClose,
    });
    hook.current.showModal();
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
            hook={hook}
          />
        </SWRConfig>
      </Layout>
    </>
  );
}
