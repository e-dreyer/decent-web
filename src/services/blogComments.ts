import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import {HYDRATE} from 'next-redux-wrapper'

import { NexusGenFieldTypes, NexusGenInputs} from "../types/types";

/* API for BlogComment related queries and Mutations*/
export const blogCommentApi = createApi({
  reducerPath: "blogCommentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_DATABASE,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["BlogComment"],
  endpoints: (builder) => ({
    /* Get BlogComment by ID*/
    getBlogCommentById: builder.query<
      NexusGenFieldTypes["BlogComment"],
      NexusGenInputs["BlogCommentByIdInput"]
    >({
      query: (
        blogCommentByIdInput: NexusGenInputs["BlogCommentByIdInput"]
      ) => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`
            query BlogCommentById(
              $blogCommentByIdInput: BlogCommentByIdInput!
            ) {
              blogCommentById(blogCommentByIdInput: $blogCommentByIdInput) {
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
            blogCommentByIdInput,
          },
        },
      }),
      transformResponse: (
        response: {
          data: { blogCommentById: NexusGenFieldTypes["BlogComment"] };
        },
        meta,
        arg
      ) => {
        return response.data.blogCommentById;
      },

      providesTags: ["BlogComment"],
    }),

    getAllBlogComments: builder.query<
      NexusGenFieldTypes["BlogComment"][],
      void
    >({
      query: () => ({
        url: "/graphql",
        method: "POST",
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
          data: { allBlogComments: NexusGenFieldTypes["BlogComment"][] };
        },
        meta,
        arg
      ) => {
        return response.data.allBlogComments;
      },

      providesTags: ["BlogComment"],
    }),
  }),
});

export const { useGetBlogCommentByIdQuery, useGetAllBlogCommentsQuery, util: {getRunningOperationPromises}} = blogCommentApi;
export const {getAllBlogComments, getBlogCommentById} = blogCommentApi.endpoints
