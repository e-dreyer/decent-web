import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import { HYDRATE } from 'next-redux-wrapper'

import { NexusGenFieldTypes, NexusGenInputs } from '../types/types'

/* API for Blog related queries and Mutations*/
export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_DATABASE,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ['Blog'],
  endpoints: (builder) => ({
    /* Get All Blogs */
    getAllBlogs: builder.query<NexusGenFieldTypes['Blog'][], void>({
      query: () => ({
        url: '/graphql',

        method: 'POST',

        body: {
          query: gql`
            query {
              allBlogs {
                id
                name
                description

                author {
                  id
                  name
                  username
                  email
                }
              }
            }
          `,
        },
      }),

      transformResponse: (response: { data: { allBlogs: NexusGenFieldTypes['Blog'][] } }) => {
        return response.data.allBlogs
      },

      providesTags: ['Blog'],
    }),

    /* Get Blog by ID*/
    getBlogById: builder.query<NexusGenFieldTypes['Blog'], NexusGenInputs['BlogByIdInput']>({
      query: (data: NexusGenInputs['BlogByIdInput']) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: gql`
            query BlogById($data: BlogByIdInput!) {
              blogById(data: $data) {
                id
                name
                description

                author {
                  id
                  username
                }
              }
            }
          `,

          variables: {
            data,
          },
        },
      }),

      transformResponse: (response: { data: { blogById: NexusGenFieldTypes['Blog'] } }) => {
        return response.data.blogById
      },

      providesTags: ['Blog'],
    }),

    /* Get All Blogs for a specific User Id */
    getBlogsByUserId: builder.query<
      NexusGenFieldTypes['Blog'][],
      NexusGenInputs['BlogsByUserIdInput']
    >({
      query: (data: NexusGenInputs['BlogsByUserIdInput']) => ({
        url: '/graphql',

        method: 'POST',

        body: {
          query: gql`
            query BlogsByUserId($data: BlogsByUserIdInput!) {
              blogsByUserId(data: $data) {
                id
                name
                description

                author {
                  id
                  username
                }
              }
            }
          `,

          variables: {
            data,
          },
        },
      }),

      transformResponse: (response: { data: { blogsByUserId: NexusGenFieldTypes['Blog'][] } }) => {
        return response.data.blogsByUserId
      },

      providesTags: ['Blog'],
    }),
  }),
})

export const {
  useGetBlogByIdQuery,
  useGetAllBlogsQuery,
  useGetBlogsByUserIdQuery,
  util: { getRunningOperationPromises },
} = blogApi

export const { getAllBlogs, getBlogById, getBlogsByUserId } = blogApi.endpoints
