import React from 'react'
import { TextField, Autocomplete } from '@mui/material'
import { useGetBlogsByUserIdQuery } from '../../services/blogs'

type BlogAutocompleteProps = {
  userId: string
  parentCallback: (blogId: string) => void
}

const BlogAutocomplete = (props: BlogAutocompleteProps) => {
  const blogsQueryResult = useGetBlogsByUserIdQuery({ id: props.userId })

  const blogs = () => {
    /* If the query is still loading */
    if (blogsQueryResult.isLoading) {
      return []
    }

    /* If there is an error with the query */
    if (blogsQueryResult.error) {
      return []
    }

    /* If the query is successful and the blogs are available */
    if (blogsQueryResult.data) {
      return blogsQueryResult.data.map((blog) => {
        return { label: blog.name, blogId: blog.id }
      })
    }

    /* Otherwise always return an empty array */
    return []
  }

  return (
    <Autocomplete
      id="blogAutocomplete"
      options={blogs()}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      renderInput={(params) => <TextField {...params} label="Blogs" />}
      onChange={(e, value) => props.parentCallback(value?.blogId || '')}
    />
  )
}

export default BlogAutocomplete
