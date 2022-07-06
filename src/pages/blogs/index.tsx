import { Stack } from '@mui/material';
import React from 'react'
import BlogCard from '../../components/BlogCard/BlogCard';
import { useGetAllBlogsQuery } from '../../services/blogs'

function BlogsPage() {
  const blogsQuery = useGetAllBlogsQuery();

  if (blogsQuery.isLoading) {
    return <div>Loading Blogs...</div>;
  }

  if (blogsQuery.error) {
    return <div>Error Loading Blogs...</div>;
  }

  if (blogsQuery.data) {
    return (
      <Stack direction="column" gap={2} sx={{ width: "100%" }}>
        {blogsQuery?.data.map((blog, blogIndex) => {
          return <BlogCard key={`blogCard-${blogIndex}`} blog={blog} />;
        })}
      </Stack>
    );
  
}

return null;
}

export default BlogsPage