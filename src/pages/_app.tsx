import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'

import CssBaseline from '@mui/material/CssBaseline'

import Layout from '../components/layout'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

import { wrapper } from '../app/store'

export function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  return (
    <>
      <SessionProvider session={session}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}

export default wrapper.withRedux(App)
