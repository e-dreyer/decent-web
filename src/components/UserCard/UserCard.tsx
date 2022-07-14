import React from 'react'
import { Box, CardContent, Typography } from '@mui/material'

import CardWrapper from '../CardWrapper/CardWrapper'

import { NexusGenFieldTypes } from '../../types/types'

import Link from 'next/link'

type UserCardProps = {
  user: NexusGenFieldTypes['User']
}

function UserCard(props: UserCardProps) {
  return (
    <CardWrapper>
      <>
        <CardContent>
          <Box>
            <Link href={`/users/${props.user.id}`} passHref>
              <Typography variant="h6" component="a" sx={{ textDecoration: 'none' }}>
                {props.user.name}
              </Typography>
            </Link>
          </Box>

          <Typography variant="body1" component="p">
            {props.user.bio}
          </Typography>
        </CardContent>
      </>
    </CardWrapper>
  )
}

export default UserCard
