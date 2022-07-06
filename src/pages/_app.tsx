import type { ReactElement, ReactNode } from "react";

import type { NextPage } from "next";
import type { AppProps } from "next/app";

import { store } from "../app/store";
import { Provider } from "react-redux";

import CssBaseline from "@mui/material/CssBaseline";

import Layout from "../components/layout";

import { ApolloProvider } from "@apollo/client";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  return (
    <>
        <Provider store={store}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
    </>
  );
}
