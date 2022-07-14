import React from 'react'
import { NextPage } from 'next'
import { wrapper } from '../../app/store'

import { Stack } from '@mui/material'

/* UserCard Imports */
import UserCard from '../../components/UserCard/UserCard'
import { getAllUsersBasic, useGetAllUsersBasicQuery, getRunningOperationPromises } from '../../services/users'

const Page: NextPage = () => {
  const usersQueryResult = useGetAllUsersBasicQuery()

  if (usersQueryResult.isLoading) {
    return <div>Loading Users...</div>
  }

  if (usersQueryResult.error) {
    return <div>Error Loading Users...</div>
  }

  if (usersQueryResult.data) {
    return (
      <Stack direction="column" gap={2} sx={{ width: '100%' }}>
        {usersQueryResult?.data.map((user, userIndex) => {
          return <UserCard key={`userCard-${userIndex}`} user={user} />
        })}
      </Stack>
    )
  }

  return null
}

// removed context as a prop as it is unused
export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(getAllUsersBasic.initiate())

  await Promise.all(getRunningOperationPromises())

  return {
    props: {},
  }
})

export default Page
