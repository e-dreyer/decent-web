import { Stack } from '@mui/material';
import React from 'react'
import PostCard from '../../components/PostCard/PostCard';
import { useGetAllBlogPostsQuery } from '../../services/blogPosts';

function PostsPage() {
  const postsQuery = useGetAllBlogPostsQuery()

  if (postsQuery.isLoading) {
    return <div>Loading Posts...</div>
  }

  if (postsQuery.error) {
    return <div>Error Loading Posts...</div>
  }
  
  if (postsQuery.data) {
    return (
      <Stack direction="column" gap={2} sx={{width: "100%"}}>
        {
          postsQuery?.data.map((post, postIndex) => {
            return <PostCard key={`postCard-${postIndex}`} post={post}/>
          })
        }
      </Stack>
    )
  }

  return null
}

export default PostsPage;