import React from 'react'
import { Box, CardContent, Typography, IconButton, CardActions } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'

import CardWrapper from '../CardWrapper/CardWrapper'

import { NexusGenFieldTypes } from '../../types/types'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

type UserCardProps = {
  user: NexusGenFieldTypes['User']
}

function UserCard(props: UserCardProps) {
  const { data: session, status } = useSession()

  const editButton = () => {
    // @ts-expect-error user does not exist on session
    if (status === 'authenticated' && session.user.id === props.user.id) {
      return (
        // @ts-expect-error user does not exist on session
        <Link href={`/users/${session.user.id}/edit`}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
      )
    }
    return null
  }

  return (
    <CardWrapper>
      <>
        <CardContent>
          {/* Title */}
          <Box>
            <Link href={`/users/${props.user.id}`} passHref>
              <Typography variant="h6" component="a" sx={{ textDecoration: 'none' }}>
                {props.user.name}
              </Typography>
            </Link>
          </Box>

          {/* Bio */}
          <Typography variant="body1" component="p">
            {props.user.bio}
          </Typography>
        </CardContent>

        {/* Buttons */}
        <CardActions> {editButton()} </CardActions>
      </>
    </CardWrapper>
  )
}

export default UserCard
