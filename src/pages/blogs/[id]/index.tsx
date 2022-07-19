import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { wrapper } from '../../../app/store'

import { Box, Stack, Typography } from '@mui/material'

/* Blog Import */
import BlogCard from '../../../components/BlogCard/BlogCard'
import { useGetBlogByIdQuery, getBlogById, getRunningOperationPromises } from '../../../services/blogs'

/* BlogPost Import */
import BlogPostCard from '../../../components/BlogPostCard/BlogPostCard'
import { getBlogPostsByBlogId, useGetBlogPostsByBlogIdQuery } from '../../../services/blogPosts'

const Page: NextPage = () => {
  /* Get the Blog's Id from the router */
  const router = useRouter()
  const { id } = router.query

  /* Query the Blog by Id */
  const blogsQueryResult = useGetBlogByIdQuery({
    id: id as string,
  })

  /* Query the Blog's Posts */
  const blogPostsQueryResult = useGetBlogPostsByBlogIdQuery({
    id: id as string,
  })

  /* Get the Blog */
  const blogSection = () => {
    if (blogsQueryResult.isLoading) {
      return <div>Loading Blog...</div>
    }

    if (blogsQueryResult.error) {
      return <div>Error Loading Blog...</div>
    }

    if (blogsQueryResult.data) {
      return <BlogCard key={`blogCard`} blog={blogsQueryResult.data} />
    }
  }

  /* Get the Blog's Posts */
  const blogPostsSection = () => {
    if (blogPostsQueryResult.isLoading) {
      return <div>Loading Posts...</div>
    }

    if (blogPostsQueryResult.error) {
      return <div>Error Loading Posts...</div>
    }

    if (blogPostsQueryResult.data) {
      return (
        <Stack direction="column" gap={2}>
          {blogPostsQueryResult.data.map((blogPost, blogPostIndex) => {
            return <BlogPostCard key={`blogPostCard-${blogPostIndex}`} blogPost={blogPost} />
          })}
        </Stack>
      )
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" component="div">
        Blog
      </Typography>

      <Box>{blogSection()}</Box>

      <Typography variant="h6" component="div">
        Posts
      </Typography>

      <Box>{blogPostsSection()}</Box>
    </Box>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const id = context.params?.id

  store.dispatch(
    getBlogById.initiate({
      id: id as string,
    })
  )

  store.dispatch(
    getBlogPostsByBlogId.initiate({
      id: id as string,
    })
  )

  await Promise.all(getRunningOperationPromises())

  return {
    props: {},
  }
})

export default Page
