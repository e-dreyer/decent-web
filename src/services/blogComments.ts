import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { HYDRATE } from 'next-redux-wrapper';

import { NexusGenFieldTypes, NexusGenInputs } from '../types/types';

/* API for BlogComment related queries and Mutations*/
export const blogCommentApi = createApi({
  reducerPath: 'blogCommentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_DATABASE,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['BlogComment'],
  endpoints: (builder) => ({
    /* Get BlogComment by ID*/
    getBlogCommentById: builder.query<
      NexusGenFieldTypes['BlogComment'],
      NexusGenInputs['BlogCommentByIdInput']
    >({
      query: (data: NexusGenInputs['BlogCommentByIdInput']) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: gql`
            query BlogCommentById($data: BlogCommentByIdInput!) {
              blogCommentById(data: $data) {
                id
                createdAt
                updatedAt
                content
                author {
                  id
                  username
                }
                blogPost {
                  id
                }
                parent {
                  id
                }
              }
            }
          `,
          variables: {
            data,
          },
        },
      }),
      transformResponse: (
        response: {
          data: { blogCommentById: NexusGenFieldTypes['BlogComment'] };
        },
        meta,
        arg
      ) => {
        return response.data.blogCommentById;
      },

      providesTags: ['BlogComment'],
    }),

    /* Get BlogComments by Post Id */
    getBlogCommentsByPostId: builder.query<
      NexusGenFieldTypes['BlogComment'][],
      NexusGenInputs['BlogCommentsByPostIdInput']
    >({
      query: (data: NexusGenInputs['BlogCommentsByPostIdInput']) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: gql`
            query BlogCommentsByPostId($data: BlogCommentsByPostIdInput!) {
              blogCommentsByPostId(data: $data) {
                id
                createdAt
                updatedAt
                author {
                  id
                  username
                }
                blogPost {
                  id
                  blog {
                    id
                    name
                  }
                }
                content
                parent {
                  id
                }
                blogComments {
                  id
                }
              }
            }
          `,
          variables: {
            data,
          },
        },
      }),
      transformResponse: (
        response: {
          data: { blogCommentsByPostId: NexusGenFieldTypes['BlogComment'][] };
        },
        meta,
        arg
      ) => {
        return response.data.blogCommentsByPostId;
      },

      providesTags: ['BlogComment'],
    }),

    /* Get All BlogComments */
    getAllBlogComments: builder.query<NexusGenFieldTypes['BlogComment'][], void>({
      query: () => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: gql`
            query {
              allBlogComments {
                id
                createdAt
                updatedAt
                content
                author {
                  id
                  username
                }
                blogPost {
                  id
                }
                parent {
                  id
                }
              }
            }
          `,
        },
      }),
      transformResponse: (
        response: {
          data: { allBlogComments: NexusGenFieldTypes['BlogComment'][] };
        },
        meta,
        arg
      ) => {
        return response.data.allBlogComments;
      },

      providesTags: ['BlogComment'],
    }),
  }),
});

export const {
  useGetBlogCommentByIdQuery,
  useGetAllBlogCommentsQuery,
  useGetBlogCommentsByPostIdQuery,
  util: { getRunningOperationPromises },
} = blogCommentApi;
export const { getAllBlogComments, getBlogCommentById, getBlogCommentsByPostId } =
  blogCommentApi.endpoints;
