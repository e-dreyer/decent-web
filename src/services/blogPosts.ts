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
                author {
                  id
                  username
                }
                title
                content
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

export const { useGetBlogPostByIdQuery, useGetAllBlogPostsQuery, util: {getRunningOperationPromises} } = blogPostApi;
export const {getAllBlogPosts, getBlogPostById} = blogPostApi.endpoints
