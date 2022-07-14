import React from 'react'
import { NextPage } from 'next'
import { wrapper } from '../../app/store'
import { useRouter } from 'next/router'

import { Stack, Typography } from '@mui/material'

/* UserCard Imports */
import UserCard from '../../components/UserCard/UserCard'
import {
  getUserById,
  useGetAllUsersBasicQuery,
  getRunningOperationPromises,
} from '../../services/users'

import BlogCard from '../../components/BlogCard/BlogCard'
import { getBlogsByUserId, useGetBlogsByUserIdQuery } from '../../services/blogs'

import BlogPostCard from '../../components/BlogPostCard/BlogPostCard'
import { getBlogPostsByUserId, useGetBlogPostsByUserIdQuery } from '../../services/blogPosts'

const Page: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const usersQueryResult = useGetAllUsersBasicQuery()
  const blogsQueryResult = useGetBlogsByUserIdQuery({ id: id as string })
  const blogPostsQueryResult = useGetBlogPostsByUserIdQuery({ id: id as string })

  const userData = () => {
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
  }

  const blogsData = () => {
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
  }

  const blogPostData = () => {
    if (blogPostsQueryResult.isLoading) {
      return <div>Loading Blog Posts...</div>
    }

    if (blogPostsQueryResult.error) {
      return <div>Error Loading Blog Posts...</div>
    }

    if (blogPostsQueryResult.data) {
      return (
        <Stack direction="column" gap={2} sx={{ width: '100%' }}>
          {blogPostsQueryResult?.data.map((blogPost, blogPostIndex) => {
            return <BlogPostCard key={`blogPostCard-${blogPostIndex}`} blogPost={blogPost} />
          })}
        </Stack>
      )
    }
  }

  return (
    <>
      <Typography variant="h6" component="div">
        Profile
      </Typography>

      {userData()}

      <Typography variant="h6" component="div">
        Blogs
      </Typography>

      {blogsData()}

      <Typography variant="h6" component="div">
        Blog Posts
      </Typography>

      {blogPostData()}
    </>
  )
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
