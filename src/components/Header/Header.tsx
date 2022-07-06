import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link';
import React from 'react'

function Header() {
  return (
    <AppBar>
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 900,
            letterSpacing: ".2rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Decent
        </Typography>

        {/* Navigation buttons */}
        <Box component="nav" sx={{ ml: "auto" }}>
          <Stack direction="row" gap={2}>
            <Link href="/blogs">
              <Button color="inherit">Blogs</Button>
            </Link>

            <Link href="/posts">
              <Button color="inherit">Posts</Button>
            </Link>

            <Link href="/profiles">
              <Button color="inherit">Profiles</Button>
            </Link>

            <Link href="/">
              <Button variant="outlined" color="inherit">
                Logout
              </Button>
            </Link>

            <Link href="/login">
              <Button variant="outlined" color="inherit">
                Login
              </Button>
            </Link>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header