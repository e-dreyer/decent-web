import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import {HYDRATE} from 'next-redux-wrapper'

import { NexusGenFieldTypes, NexusGenInputs} from "../types/types";

/* API for BlogPost related queries and Mutations*/
export const blogPostApi = createApi({
  reducerPath: "blogPostApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_DATABASE,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["BlogPost"],
  endpoints: (builder) => ({
    /* Get BlogPost by ID*/
    getBlogPostById: builder.query<
      NexusGenFieldTypes["BlogPost"],
      NexusGenInputs["BlogPostByIdInput"]
    >({
      query: (data: NexusGenInputs["BlogPostByIdInput"]) => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`
            query BlogPostById($data: BlogPostByIdInput!) {
              blogPostById(data: $data) {
                id
                createdAt
                updatedAt
                title
                content
                published
                author {
                  id
                  username
                }
                blog {
                  id
                  name
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
        response: { data: { blogPostById: NexusGenFieldTypes["BlogPost"] } },
        meta,
        arg
      ) => {
        return response.data.blogPostById;
      },

      providesTags: ["BlogPost"],
    }),

    /* Get BlogPosts by User Id */
    getBlogPostsByUserId: builder.query<
      NexusGenFieldTypes["BlogPost"][],
      NexusGenInputs["BlogPostsByUserIdInput"]
    >({
      query: (
        data: NexusGenInputs["BlogPostsByUserIdInput"]
      ) => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`
            query BlogPostsByUserId(
              $data: BlogPostsByUserIdInput!
            ) {
              blogPostsByUserId(
                data: $data
              ) {
                id
                createdAt
                updatedAt
                author {
                  id
                  username
                }
                title
                content
                published
                blog {
                  id
                  name
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
          data: { blogPostsByUserId: NexusGenFieldTypes["BlogPost"][] };
        },
        meta,
        arg
      ) => {
        return response.data.blogPostsByUserId;
      },

      providesTags: ["BlogPost"],
    }),

    /* Get BlogPosts by Blog Id */
    getBlogPostsByBlogId: builder.query<NexusGenFieldTypes["BlogPost"][], NexusGenInputs["BlogPostsByBlogIdInput"]>({
      query: (data: NexusGenInputs["BlogPostsByBlogIdInput"]) => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`query BlogPostsByBlogId($data: BlogPostsByBlogIdInput!) {
            blogPostsByBlogId(data: $data) {
              id
              createdAt
              updatedAt
              author {
                id
                username
              }
              title
              content
              published
              blog {
                id
                name
              }
            }
          }`,
          variables: {
            data
          }
        }
      }),
      transformResponse: (
        response: {
          data: { blogPostsByBlogId: NexusGenFieldTypes["BlogPost"][] };
        },
        meta,
        arg
      ) => {
        return response.data.blogPostsByBlogId;
      },

      providesTags: ["BlogPost"],
    }),

    /* Get All BlogPosts */
    getAllBlogPosts: builder.query<NexusGenFieldTypes["BlogPost"][], void>({
      query: () => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`
            query {
              allBlogPosts {
                id
                createdAt
                updatedAt
                title
                content
                published
                author {
                  id
                  username
                }
                blog {
                  id
                  name
                }
              }
            }
          `,
        },
      }),
      transformResponse: (
        response: { data: { allBlogPosts: NexusGenFieldTypes["BlogPost"][] } },
        meta,
        arg
      ) => {
        return response.data.allBlogPosts;
      },

      providesTags: ["BlogPost"],
    }),
  }),
});

export const { useGetBlogPostByIdQuery, useGetAllBlogPostsQuery, useGetBlogPostsByUserIdQuery, useGetBlogPostsByBlogIdQuery, util: {getRunningOperationPromises} } = blogPostApi;
export const {getAllBlogPosts, getBlogPostById, getBlogPostsByUserId, getBlogPostsByBlogId} = blogPostApi.endpoints
