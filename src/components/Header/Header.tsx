import Link from 'next/link'
import React from 'react'

import { Box } from '@mui/system'
import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import { useSession, signIn, signOut } from 'next-auth/react'

function Header() {
  // removed data because it is unused
  const { data: session, status } = useSession()

  const logInButton = () => {
    if (status === 'unauthenticated') {
      return (
        <Link href="/api/auth/signin">
          <LoadingButton
            variant="outlined"
            color="inherit"
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}>
            Login
          </LoadingButton>
        </Link>
      )
    }
    return null
  }

  const logOutButton = () => {
    if (status !== 'unauthenticated') {
      return (
        <Link href="/api/auth/signout">
          <LoadingButton
            loading={status === 'loading'}
            variant="outlined"
            color="inherit"
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}>
            Logout
          </LoadingButton>
        </Link>
      )
    }
    return null
  }

  const profileButton = () => {
    // @ts-expect-error id not defined on user
    if (status === 'authenticated' && session.user.id) {
      return (
        // @ts-expect-error id not defined on user
        <Link href={`/users/${session.user.id}`}>
          <Button variant="outlined" color="inherit">
            Profile
          </Button>
        </Link>
      )
    }
    return null
  }

  return (
    <AppBar>
      <Toolbar>
        {/* Logo */}
        <Link href="/">
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 900,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            Decent
          </Typography>
        </Link>

        {/* Navigation buttons */}
        <Box component="nav" sx={{ ml: 'auto' }}>
          <Stack direction="row" gap={2}>
            <Link href="/blogs">
              <Button color="inherit">Blogs</Button>
            </Link>

            <Link href="/posts">
              <Button color="inherit">Posts</Button>
            </Link>

            <Link href="/users">
              <Button color="inherit">Users</Button>
            </Link>
            {logInButton()}

            {logOutButton()}

            {profileButton()}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
