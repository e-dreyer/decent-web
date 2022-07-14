import React, { ReactNode } from 'react'
import { Box } from '@mui/system'
import Header from './Header/Header'

type LayoutProps = {
  children: ReactNode
}

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Box>
        <Header />
        {/* Wrap the entire app in a box */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'stretch',
            flexDirection: 'column',
            alignItems: 'center',
            my: 15,
            width: '75%',
            mx: 'auto',
          }}>
          {props.children}
        </Box>
      </Box>
    </>
  )
}

export default Layout
