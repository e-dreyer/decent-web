import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { wrapper } from "../../app/store";

import { Box, Stack, Typography } from "@mui/material";

import PostCard from "../../components/PostCard/PostCard";

import { useGetBlogPostByIdQuery, getBlogPostById, getRunningOperationPromises, useGetBlogPostsByUserIdQuery} from '../../services/blogPosts'
import { getBlogCommentsByPostId, useGetBlogCommentsByPostIdQuery } from "../../services/blogComments";
import CommentCard from "../../components/CommentCard/CommentCard";

type PageProps = {

}

const Page: NextPage = (props: PageProps) => {
  /* Get the BlogPost's ID from the router */
  const router = useRouter()
  const {id} = router.query

  /* Query the BlogPost */
  const blogPostsQueryResult = useGetBlogPostByIdQuery({
    id: parseInt(id as string, 10)
  })
 
  /* Query the BlogPost's Comments */
  const blogCommentsQueryResult = useGetBlogCommentsByPostIdQuery({
    id: parseInt(id as string, 10)
  })

  const post = () => {
    if (blogPostsQueryResult.isLoading) {
      return <div>Loading Blog Posts...</div>
    }

    if (blogPostsQueryResult.error) {
      return <div>Error Loading Blog Posts...</div>
    }

    if (blogPostsQueryResult.data) {
      return <PostCard key={`blogPostCard`} post={blogPostsQueryResult.data} />;
    }
  };

  const comments = () => {
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
            return <CommentCard key={`blogCommentCard-${blogCommentIndex}`} comment={blogComment}/>
          })}
        </Stack>
      )
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" component="div">
        Post
      </Typography>

      {post()}

      <Typography variant="h6" component="div">
        Comments
      </Typography>

      {comments()}
    </Box>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(
      getBlogPostById.initiate({
        id: parseInt(context.params?.id as string, 10)
      })
    );

    store.dispatch(getBlogCommentsByPostId.initiate({
      id: parseInt(context.params?.id as string, 10)
    }))
    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

export default Page;
