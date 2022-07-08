import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { wrapper } from "../../app/store";

import { Stack, Typography, Box } from "@mui/material";

/* Profile Imports */
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import {
  useGetProfileByIdQuery,
  getProfileById,
  getRunningOperationPromises,
} from "../../services/profiles";

/* Blog Imports */
import {
  getBlogsByUserId,
  useGetBlogsByUserIdQuery,
} from "../../services/blogs";
import BlogCard from "../../components/BlogCard/BlogCard";

/* BlogPost Imports */
import {
  getBlogPostsByUserId,
  useGetBlogPostsByUserIdQuery,
} from "../../services/blogPosts";
import BlogPostCard from "../../components/BlogPostCard/BlogPostCard";

type PageProps = {};

const Page: NextPage = (props: PageProps) => {
  /* Get the User's Id from the router */
  const router = useRouter();
  const { id } = router.query;

  /* Query the User's Profile */
  const profileQueryResult = useGetProfileByIdQuery({
    id: id as string,
  });

  /* Query the User's Blogs */
  const blogsQueryResult = useGetBlogsByUserIdQuery({
    id: id as string,
  });

  /* Query the User's BlogPosts */
  const blogPostsQueryResult = useGetBlogPostsByUserIdQuery({
    id: id as string,
  });

  /* Get the User's Profile */
  const profileSection = () => {
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
  const blogsSection = () => {
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
  const blogPostSection = () => {
    if (blogPostsQueryResult.isLoading) {
      return <div>Loading Blog Posts...</div>;
    }

    if (blogPostsQueryResult.error) {
      return <div>Error Loading Blog Posts...</div>;
    }

    if (blogPostsQueryResult.data) {
      return (
        <Stack direction="column" gap={2}>
          {blogPostsQueryResult.data.map((blogPost, blogPostIndex) => {
            return (
              <BlogPostCard
                key={`blogPostCard-${blogPostIndex}`}
                blogPost={blogPost}
              />
            );
          })}
        </Stack>
      );
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" component="div">
        Profile
      </Typography>

      <Box>{profileSection()}</Box>

      <Typography variant="h6" component="div">
        Blogs
      </Typography>

      <Box>{blogsSection()}</Box>

      <Typography variant="h6" component="div">
        Blog Posts
      </Typography>

      <Box>{blogPostSection()}</Box>
    </Box>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.params?.id;

    // TODO: Check whether the profile exists
    store.dispatch(
      getProfileById.initiate({
        id: id as string,
      })
    );

    store.dispatch(
      getBlogsByUserId.initiate({
        id: id as string,
      })
    );

    store.dispatch(
      getBlogPostsByUserId.initiate({
        id: id as string,
      })
    );

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

export default Page;
