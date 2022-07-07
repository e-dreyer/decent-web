import React from "react";
import { NextPage } from "next";
import { wrapper } from "../../app/store";

import { Stack } from "@mui/material";

import BlogCard from '../../components/BlogCard/BlogCard';
import { useGetAllBlogsQuery, getAllBlogs, getRunningOperationPromises } from '../../services/blogs'

type PageProps = {};

export const Page: NextPage = (props: PageProps) => {
  const result = useGetAllBlogsQuery();

  if (result.isLoading) {
    return <div>Loading Blogs...</div>;
  }

  if (result.error) {
    return <div>Error Loading Blogs...</div>;
  }

  if (result.data) {
    return (
      <Stack direction="column" gap={2} sx={{ width: "100%" }}>
        {result?.data.map((blog, blogIndex) => {
          return <BlogCard key={`blogCard-${blogIndex}`} blog={blog} />;
        })}
      </Stack>
    );
  
}

return null;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getAllBlogs.initiate());
    await Promise.all(getRunningOperationPromises())

    return {
      props: {}
    }
  }
)

export default Page