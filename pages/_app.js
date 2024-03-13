import Layout from "@/components/Layout/Layout";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import { useState, useRef } from "react";
import React from "react";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
import { StyledToastContainer } from "@/components/Toast/Toast.styled";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <StyledToastContainer />
      <Layout>
        <SWRConfig value={{ fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
      </Layout>
    </>
  );
}
