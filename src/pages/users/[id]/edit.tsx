import React from 'react'
import { NextPage } from 'next'
import { wrapper } from '../../../app/store'
import { useRouter } from 'next/router'

import { Avatar, Typography } from '@mui/material'

import {
  getUserById,
  useGetUserByIdQuery,
  getRunningOperationPromises,
} from '../../../services/users'

import { getBlogsByUserId } from '../../../services/blogs'

import { getBlogPostsByUserId } from '../../../services/blogPosts'

const Page: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const usersQueryResult = useGetUserByIdQuery({ id: id as string })

  const formData = () => {
    if (usersQueryResult.isLoading) {
      return <div>Loading Users...</div>
    }

    if (usersQueryResult.error) {
      return <div>Error Loading Users...</div>
    }

    if (usersQueryResult.data) {
      return (
        <>
          <Avatar
            alt="User Profile Image"
            src={usersQueryResult.data.image ?? ''}
            sx={{ width: 250, height: 250 }}
          />

          <Typography variant="h6" component="div" sx={{ mr: 'auto' }}>
            {`Name: ${usersQueryResult.data.name}`}
          </Typography>

          <Typography variant="h6" component="div" sx={{ mr: 'auto' }}>
            {`Email: ${usersQueryResult.data.email}`}
          </Typography>

          <Typography variant="h6" component="div" sx={{ mr: 'auto' }}>
            {`Username: ${usersQueryResult.data.username}`}
          </Typography>

          <Typography variant="h6" component="div" sx={{ mr: 'auto' }}>
            {`Bio: ${usersQueryResult.data.bio}`}
          </Typography>
        </>
      )
    }
  }

  return <> {formData()} </>
}

// removed context as a prop as it is unused
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const id = context.params?.id

  store.dispatch(getUserById.initiate({ id: id as string }))

  store.dispatch(getBlogsByUserId.initiate({ id: id as string }))

  store.dispatch(getBlogPostsByUserId.initiate({ id: id as string }))

  await Promise.all(getRunningOperationPromises())

  return {
    props: {},
  }
})

export default Page
