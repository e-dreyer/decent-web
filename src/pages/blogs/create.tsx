import React from 'react'
import { NextPage } from 'next'

import { useSession } from 'next-auth/react'

import { useForm, SubmitHandler } from 'react-hook-form'

import { TextField, Stack, Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'

import { useCreateNewBlogMutation } from '../../services/blogs'

/* Input for React-hook-from */
type CreateBlogFormInput = {
  blogName: string
  blogDescription: string
}

export const Page: NextPage = () => {
  /* NextAuth session */
  const session = useSession()

  /* React-hook-from */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateBlogFormInput>()

  /* Hook responsible for the mutation */
  const [createBlogTrigger, createBlogResult] = useCreateNewBlogMutation()

  /* Handle the submition of the CreateBlogForm */
  const onSubmit: SubmitHandler<CreateBlogFormInput> = (data) => {
    if (session.status === 'authenticated' && session.data.user) {
      const createBlogInput = {
        // @ts-expect-error id does not exist on user
        authorId: session.data.user.id as string,
        name: data.blogName,
        description: data.blogDescription,
      }

      createBlogTrigger({ ...createBlogInput })
    }
  }

  /* Get the loading status of the CreateBlogButton */
  const getButtonLoadingStatus = () => {
    /* If the hook hasn't been triggered yet */
    if (createBlogResult.status === 'uninitialized') {
      return false
    }

    /* If the hook has been triggered but is still pending */
    if (createBlogResult.status === 'pending') {
      return true
    }

    return false
  }

  /* Get the disabled status of the CreateBlogButton */
  const getButtonDisabledStatus = () => {
    /* If the hook has been triggered and was successful */
    if (createBlogResult.status === 'fulfilled') {
      return true
    }

    return false
  }

  const createBlogForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" gap={2} sx={{ width: '100%' }}>
          <TextField
            id="create-blog-name"
            label="name"
            variant="outlined"
            {...register('blogName', { required: true })}
          />
          {errors.blogName && <span>Name of the Blog is required</span>}

          <TextField
            id="create-blog-description"
            label="description"
            variant="outlined"
            {...register('blogDescription', { required: true })}
          />
          {errors.blogDescription && <span>Description of the Blog is required</span>}

          <LoadingButton
            loading={getButtonLoadingStatus()}
            disabled={getButtonDisabledStatus()}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
            type="submit">
            Create Blog
          </LoadingButton>
        </Stack>
      </form>
    )
  }

  return createBlogForm()
}

export default Page
