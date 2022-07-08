import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { wrapper } from "../../app/store";

import { Stack, Typography, Box } from "@mui/material";

import ProfileCard from "../../components/ProfileCard/ProfilCard";
import {
  useGetProfileByIdQuery,
  getProfileById,
  getRunningOperationPromises,
} from "../../services/profiles";
import {
  getBlogsByUserId,
  useGetBlogsByUserIdQuery,
} from "../../services/blogs";
import BlogCard from "../../components/BlogCard/BlogCard";
import { getBlogPostsByUserId, useGetBlogPostsByUserIdQuery } from "../../services/blogPosts";
import PostCard from "../../components/PostCard/PostCard";

type PageProps = {};

const Page: NextPage = (props: PageProps) => {
  /* Get the User's Id from the router */
  const router = useRouter();
  const { id } = router.query;

  /* Query the User's Profile */
  const profileQueryResult = useGetProfileByIdQuery({
    id: parseInt(id as string, 10),
  });

  /* Query the User's Blogs */
  const blogsQueryResult = useGetBlogsByUserIdQuery({
    userId: parseInt(id as string, 10),
  });

  /* Query the User's BlogPosts */
  const blogPostsQueryResult = useGetBlogPostsByUserIdQuery({
    userId: parseInt(id as string, 10)
  })
 
  /* Get the User's Profile */
  const profile = () => {
    if (profileQueryResult.isLoading) {
      return <div>Loading Profiles...</div>;
    }

    if (profileQueryResult.error) {
      return <div>Error Loading Profiles</div>;
    }

    if (profileQueryResult.data) {
      return (
        <ProfileCard key={`profileCard`} profile={profileQueryResult.data} />
      );
    }
  };

  /* Get the User's Blogs */
  const blogs = () => {
    if (blogsQueryResult.isLoading) {
      return <div>Loading Blogs...</div>;
    }

    if (blogsQueryResult.error) {
      return <div>Error Loading Blogs</div>;
    }

    if (blogsQueryResult.data) {
      return (
        <Stack direction="column" gap={2}>
          {blogsQueryResult.data.map((blog, blogIndex) => {
            return <BlogCard key={`blogCard-${blogIndex}`} blog={blog} />;
          })}
        </Stack>
      );
    }
  };

  /* Get the User's BlogPosts */
  const posts = () => {
    if (blogPostsQueryResult.isLoading) {
      return <div>Loading Blog Posts...</div>
    }

    if (blogPostsQueryResult.error) {
      return <div>Error Loading Blog Posts...</div>
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
  };

  return (
    <Box sx={{width: "100%"}}>
    <Typography variant="h6" component="div">
      Profile
    </Typography>

    {profile()}

    <Typography variant="h6" component="div">
      Blogs
    </Typography>
  
    {blogs()}

    <Typography variant="h6" component="div">
      Posts
    </Typography>

    {posts()}
    </Box>
  )
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(
      getProfileById.initiate({
        id: parseInt(context.params?.id as string, 10),
      })
    );

    store.dispatch(
      getBlogsByUserId.initiate({
        userId: parseInt(context.params?.id as string, 10),
      })
    );

    store.dispatch(
      getBlogPostsByUserId.initiate({
        userId: parseInt(context.params?.id as string, 10),
      })
    );

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

export default Page;
