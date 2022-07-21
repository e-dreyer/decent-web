import React, { useState } from 'react'
import { NextPage } from 'next'

import { useSession } from 'next-auth/react'

import { useForm, SubmitHandler } from 'react-hook-form'

import { TextField, Stack } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'

import { useCreateNewBlogPostMutation } from '../../services/blogPosts'

import BlogAutocomplete from '../../components/BlogAutocomplete/BlogAutocomplete'

/* Input for React-hook-from */
type CreateBlogPostFormInput = {
  authorId: string
  blogId: string
  title: string
  content: string
  published: boolean
}

export const Page: NextPage = () => {
  /* NextAuth session */
  const session = useSession()

  const [selectedBlog, setSelectedBlog] = useState<string>('')
  const setBlogCallback = (blogId: string) => {
    setSelectedBlog(blogId)
  }

  /* React-hook-from */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBlogPostFormInput>()

  /* Hook responsible for the mutation */
  const [createBlogPostTrigger, createBlogPostResult] = useCreateNewBlogPostMutation()

  /* Handle the submission of the CreateBlogForm */
  const onSubmit: SubmitHandler<CreateBlogPostFormInput> = (data) => {
    if (session.status === 'authenticated' && session.data.user) {
      const createBlogPostInput = {
        // @ts-expect-error id does not exist on user
        authorId: session.data.user.id as string,
        blogId: selectedBlog,
        title: data.title,
        content: data.content,
        published: true,
      }

      createBlogPostTrigger({ ...createBlogPostInput })
    }
  }

  /* Get the loading status of the CreateBlogButton */
  const getButtonLoadingStatus = () => {
    /* If the hook hasn't been triggered yet */
    if (createBlogPostResult.status === 'uninitialized') {
      return false
    }

    /* If the hook has been triggered but is still pending */
    if (createBlogPostResult.status === 'pending') {
      return true
    }

    return false
  }

  /* Get the disabled status of the CreateBlogButton */
  const getButtonDisabledStatus = () => {
    /* If the user is not logged in */
    if (!session || !session.data?.user) {
      return true
    }
    /* If the hook has been triggered and was successful */
    if (createBlogPostResult.status === 'fulfilled') {
      return true
    }

    return false
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" gap={2} sx={{ width: '100%' }}>
        {
          // @ts-expect-error id not defined on user
          session.data && session.data.user && (
            <BlogAutocomplete userId={session.data.user.id} parentCallback={setBlogCallback} />
          )
        }

        {selectedBlog === '' ? <span>Must select a blog</span> : null}

        <TextField
          id="create-blogPost-title"
          label="title"
          variant="outlined"
          {...register('title', { required: true })}
        />
        {errors.title && <span>Title of the Blog Post cannot be empty</span>}

        <TextField
          id="create-blogPost-content"
          label="content"
          variant="outlined"
          {...register('content', { required: true })}
        />
        {errors.content && <span>Content of the Blog Post cannot be empty</span>}

        <LoadingButton
          loading={getButtonLoadingStatus()}
          disabled={getButtonDisabledStatus()}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
          type="submit">
          Create Blog Post
        </LoadingButton>
      </Stack>
    </form>
  )
}

export default Page
