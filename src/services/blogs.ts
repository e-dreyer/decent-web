import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import {HYDRATE} from 'next-redux-wrapper'

import { NexusGenFieldTypes } from "../types/types";

/* API for Blog related queries and Mutations*/
export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_DATABASE,
  }),
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    /* Get Blog by ID*/
    getBlogById: builder.query<NexusGenFieldTypes ["Blog"], string>({
      query: (id) => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`
          query blog($id:ID!) {
            blog(id: ${id}) {
              id
              createdAt
              updatedAt
              author {
                username
              }
              authorId
              name
              description
            }
          }`,
        },
      }),

      providesTags: ["Blog"],
    }),

    getAllBlogs: builder.query<NexusGenFieldTypes["Blog"][], void>({
      query: () => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`
            query {
              allBlogs {
                id
                createdAt
                updatedAt
                author {
                  username
                  id
                }
                name
                description

              }
            }
          `,
        },
      }),
      transformResponse: (
        response: { data: { allBlogs: NexusGenFieldTypes["Blog"][] } },
        meta,
        arg
      ) => {
        return response.data.allBlogs;
      },

      providesTags: ["Blog"],
    }),
  }),
});

export const { useGetBlogByIdQuery, useGetAllBlogsQuery , util: {getRunningOperationPromises}} = blogApi;
export const {getAllBlogs, getBlogById} = blogApi.endpoints

