import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { wrapper } from "../../app/store";

import { Stack } from "@mui/material";

import PostCard from "../../components/PostCard/PostCard";

import { useGetBlogPostByIdQuery, getBlogPostById, getRunningOperationPromises} from '../../services/blogPosts'

type PageProps = {

}

const getQueryParameters = (id: any) => {
  return {
    id: parseInt(id as string, 10)
  }
}

const Page: NextPage = (props: PageProps) => {
  const router = useRouter()
  const {id} = router.query

  const result = useGetBlogPostByIdQuery(getQueryParameters(id))

  if (result.isLoading) {
    return <div>Loading Post...</div>
  }

  if (result.error) {
    return <div>Error Loading Post...</div>
  }

  if (result.data) {
    return (
        <PostCard key={`postCard`} post={result.data}/>
    )
  }

  return null
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(
      getBlogPostById.initiate(getQueryParameters(context.params?.id))
    );
    await Promise.all(getRunningOperationPromises());

    return {
      props: {},
    };
  }
);

export default Page;
