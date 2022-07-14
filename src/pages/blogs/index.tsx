import React from 'react'
import { NextPage } from 'next'
import { wrapper } from '../../app/store'

import { Stack } from '@mui/material'

/* Blog Import */
import BlogCard from '../../components/BlogCard/BlogCard'
import { useGetAllBlogsQuery, getAllBlogs, getRunningOperationPromises } from '../../services/blogs'

export const Page: NextPage = () => {
  const blogsQueryResult = useGetAllBlogsQuery()

  if (blogsQueryResult.isLoading) {
    return <div>Loading Blogs...</div>
  }

  if (blogsQueryResult.error) {
    return <div>Error Loading Blogs...</div>
  }

  if (blogsQueryResult.data) {
    return (
      <Stack direction="column" gap={2} sx={{ width: '100%' }}>
        {blogsQueryResult?.data.map((blog, blogIndex) => {
          return <BlogCard key={`blogCard-${blogIndex}`} blog={blog} />
        })}
      </Stack>
    )
  }

  return null
}

// removed context as a prop as it is unused
export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  store.dispatch(getAllBlogs.initiate())

  await Promise.all(getRunningOperationPromises())

  return {
    props: {},
  }
})

export default Page
