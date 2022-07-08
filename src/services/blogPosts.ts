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
      query: (blogPostByIdInput: NexusGenInputs["BlogPostByIdInput"]) => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`
            query BlogPostById($blogPostByIdInput: BlogPostByIdInput!) {
              blogPostById(blogPostByIdInput: $blogPostByIdInput) {
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
            blogPostByIdInput,
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
        blogPostsByUserIdInput: NexusGenInputs["BlogPostsByUserIdInput"]
      ) => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`
            query BlogPostsByUserId(
              $blogPostsByUserIdInput: BlogPostsByUserIdInput!
            ) {
              blogPostsByUserId(
                blogPostsByUserIdInput: $blogPostsByUserIdInput
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
            blogPostsByUserIdInput,
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
      query: (blogPostsByBlogIdInput: NexusGenInputs["BlogPostsByBlogIdInput"]) => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`query BlogPostsByBlogId($blogPostsByBlogIdInput: BlogPostsByBlogIdInput!) {
            blogPostsByBlogId(blogPostsByBlogIdInput: $blogPostsByBlogIdInput) {
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
            blogPostsByBlogIdInput
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
        console.log(response)
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
