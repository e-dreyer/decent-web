import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { wrapper } from "../../app/store";

import { Box, Stack, Typography } from "@mui/material";

import BlogCard from "../../components/BlogCard/BlogCard";
import {
  useGetBlogByIdQuery,
  getBlogById,
  getRunningOperationPromises,
} from "../../services/blogs";
import { getBlogPostsByBlogId, useGetBlogPostsByBlogIdQuery } from "../../services/blogPosts";
import PostCard from "../../components/PostCard/PostCard";

type PageProps = {};

const Page: NextPage = (props: PageProps) => {
  /* Get the Blog's Id from the router */
  const router = useRouter();
  const { id } = router.query;

  /* Query the Blog by Id */
  const blogsQueryResult = useGetBlogByIdQuery({
    id: parseInt(id as string, 10)
  });

  /* Query the Blog's Posts */
  const blogPostsQueryResult = useGetBlogPostsByBlogIdQuery({
    id: parseInt(id as string, 10)
  })

  /* Get the Blog */
  const blog = () => {
    if (blogsQueryResult.isLoading) {
      return <div>Loading Blog...</div>
    }

    if (blogsQueryResult.error) {
      return <div>Error Loading Blog...</div>
    }

    if (blogsQueryResult.data) {
    return <BlogCard key={`blogCard`} blog={blogsQueryResult.data} />;
    }
  }

  /* Get the Blog's Posts */
  const blogPosts = () => {
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
            return <PostCard key={`blogPostCard-${blogPostIndex}`} post={blogPost}/>
          })}
        </Stack>
      )
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" component="div">
        Blog
      </Typography>

      {blog()}

      <Typography variant="h6" component="div">
        Posts
      </Typography>

      {blogPosts()}
    </Box>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(
      getBlogById.initiate({
        id: parseInt(context.params?.id as string, 10)
      })
    );

    store.dispatch(getBlogPostsByBlogId.initiate({
      id: parseInt(context.params?.id as string, 10)
    }))

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

export default Page;
