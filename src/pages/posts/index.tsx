import React from "react";
import { NextPage } from "next";
import { wrapper } from "../../app/store";

import { Stack } from "@mui/material";

import PostCard from '../../components/PostCard/PostCard';
import { useGetAllBlogPostsQuery, getAllBlogPosts, getRunningOperationPromises } from '../../services/blogPosts';

type PageProps = {

}

const Page: NextPage = (props: PageProps) => {
  const result = useGetAllBlogPostsQuery()

  if (result.isLoading) {
    return <div>Loading Posts...</div>
  }

  if (result.error) {
    return <div>Error Loading Posts...</div>
  }
  
  if (result.data) {
    return (
      <Stack direction="column" gap={2} sx={{width: "100%"}}>
        {
          result?.data.map((post, postIndex) => {
            return <PostCard key={`postCard-${postIndex}`} post={post}/>
          })
        }
      </Stack>
    )
  }

  return null
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getAllBlogPosts.initiate());
    await Promise.all(getRunningOperationPromises());

    return {
      props: {}
    }
  }
)

export default Page;