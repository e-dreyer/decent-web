import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import {HYDRATE} from 'next-redux-wrapper'

import { NexusGenFieldTypes } from "../types/types";

/* API for BlogComment related queries and Mutations*/
export const blogCommentApi = createApi({
  reducerPath: "blogCommentApi",
  baseQuery: fetchBaseQuery({
    
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_DATABASE,
  }),
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ["BlogComment"],
  endpoints: (builder) => ({
    /* Get BlogComment by ID*/
    getBlogCommentById: builder.query<NexusGenFieldTypes["BlogComment"], string>({
      query: (id) => ({
        url: "",
        method: "POST",
        body: {
          query: gql`
          query blogComment($id:ID!) {
            blogComment(id: ${id}) {
              id
            }
          }`,
        },
      }),

      providesTags: ["BlogComment"],
    }),

    getAllBlogComments: builder.query<NexusGenFieldTypes["BlogComment"][], void>({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: gql`
            query {
              allBlogComments {
                id
              }
            }
          `,
        },
      }),
      transformResponse: (
        response: { data: { allBlogComments: NexusGenFieldTypes["BlogComment"][] } },
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
