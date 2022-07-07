import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { wrapper } from "../../app/store";

import { Stack } from "@mui/material";

import BlogCard from "../../components/BlogCard/BlogCard";
import {
  useGetBlogByIdQuery,
  getBlogById,
  getRunningOperationPromises,
} from "../../services/blogs";

type PageProps = {};

const getQueryParameters = (id: any) => {
  return {
    id: parseInt(id as string, 10),
  };
};

const Page: NextPage = (props: PageProps) => {
  const router = useRouter();
  const { id } = router.query;

  const result = useGetBlogByIdQuery(getQueryParameters(id));

  if (result.isLoading) {
    return <div>Loading Blog...</div>;
  }

  if (result.error) {
    return <div>Error Loading Blog...</div>;
  }

  if (result.data) {
    return (
        <BlogCard key={`blogCard`} blog={result.data} />
    );
  }

  return null;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(
      getBlogById.initiate(getQueryParameters(context.params?.id))
    );
    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

export default Page;
