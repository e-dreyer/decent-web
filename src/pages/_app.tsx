import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import CssBaseline from "@mui/material/CssBaseline";

import Layout from "../components/layout";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const { wrapper } = require("../app/store");

export function App({ Component, pageProps }: AppPropsWithLayout) {

  return (
    <>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
    </>
  );
}

export default wrapper.withRedux(App);