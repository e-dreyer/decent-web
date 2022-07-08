import React from "react";
import { NextPage } from "next";
import { wrapper } from "../../app/store";

import { Stack } from "@mui/material";

/* BlogPost Imports */
import BlogPostCard from "../../components/BlogPostCard/BlogPostCard";
import {
  useGetAllBlogPostsQuery,
  getAllBlogPosts,
  getRunningOperationPromises,
} from "../../services/blogPosts";

type PageProps = {};

const Page: NextPage = (props: PageProps) => {
  const blogsQueryResult = useGetAllBlogPostsQuery();

  if (blogsQueryResult.isLoading) {
    return <div>Loading Posts...</div>;
  }

  if (blogsQueryResult.error) {
    return <div>Error Loading Posts...</div>;
  }

  if (blogsQueryResult.data) {
    return (
      <Stack direction="column" gap={2} sx={{ width: "100%" }}>
        {blogsQueryResult?.data.map((blogPost, blogPostIndex) => {
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

  return null;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getAllBlogPosts.initiate());

    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

export default Page;
