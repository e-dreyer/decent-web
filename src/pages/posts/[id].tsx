import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { wrapper } from '../../app/store'

import { Box, Stack, Typography } from '@mui/material'

/* BlogPost Imports */
import BlogPostCard from '../../components/BlogPostCard/BlogPostCard'
import {
  useGetBlogPostByIdQuery,
  getBlogPostById,
  getRunningOperationPromises,
} from '../../services/blogPosts'

/* BlogComment Imports */
import CommentCard from '../../components/BlogCommentCard/BlogCommentCard'
import {
  getBlogCommentsByPostId,
  useGetBlogCommentsByPostIdQuery,
} from '../../services/blogComments'

const Page: NextPage = () => {
  /* Get the BlogPost's ID from the router */
  const router = useRouter()
  const { id } = router.query

  /* Query the BlogPost */
  const blogPostsQueryResult = useGetBlogPostByIdQuery({
    id: id as string,
  })

  /* Query the BlogPost's Comments */
  const blogCommentsQueryResult = useGetBlogCommentsByPostIdQuery({
    id: id as string,
  })

  const blogPostsSection = () => {
    if (blogPostsQueryResult.isLoading) {
      return <div>Loading Blog Posts...</div>
    }

    if (blogPostsQueryResult.error) {
      return <div>Error Loading Blog Posts...</div>
    }

    if (blogPostsQueryResult.data) {
      return <BlogPostCard key={`blogPostCard`} blogPost={blogPostsQueryResult.data} />
    }
  }

  const blogCommentsSection = () => {
    if (blogCommentsQueryResult.isLoading) {
      return <div>Loading Post Comments...</div>
    }

    if (blogCommentsQueryResult.error) {
      return <div>Error Loading Comments...</div>
    }

    if (blogCommentsQueryResult.data) {
      return (
        <Stack direction="column" gap={2}>
          {blogCommentsQueryResult.data.map((blogComment, blogCommentIndex) => {
            return <CommentCard key={`blogCommentCard-${blogCommentIndex}`} comment={blogComment} />
          })}
        </Stack>
      )
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" component="div">
        Post
      </Typography>

      <Box>{blogPostsSection()}</Box>

      <Typography variant="h6" component="div">
        Comments
      </Typography>

      <Box>{blogCommentsSection()}</Box>
    </Box>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const id = context.params?.id

  // TODO: Check whether the BlogPost exists
  store.dispatch(
    getBlogPostById.initiate({
      id: id as string,
    })
  )

  store.dispatch(
    getBlogCommentsByPostId.initiate({
      id: id as string,
    })
  )
  await Promise.all(getRunningOperationPromises())

  return {
    props: {},
  }
})

export default Page
