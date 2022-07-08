import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import {HYDRATE} from 'next-redux-wrapper'

import { NexusGenFieldTypes, NexusGenInputs} from "../types/types";

/* API for Blog related queries and Mutations*/
export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_DATABASE,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    /* Get Blog by ID*/
    getBlogById: builder.query<
      NexusGenFieldTypes["Blog"],
      NexusGenInputs["BlogByIdInput"]
    >({
      query: (blogByIdInput: NexusGenInputs["BlogByIdInput"]) => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`
            query BlogById($blogByIdInput: BlogByIdInput!) {
              blogById(blogByIdInput: $blogByIdInput) {
                id
                createdAt
                updatedAt
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
            blogByIdInput,
          },
        },
      }),
      transformResponse: (
        response: { data: { blogById: NexusGenFieldTypes["Blog"] } },
        meta,
        arg
      ) => {
        return response.data.blogById;
      },

      providesTags: ["Blog"],
    }),

    /* Get All Blogs for a specific User Id */
    getBlogsByUserId: builder.query<
      NexusGenFieldTypes["Blog"][],
      NexusGenInputs["BlogsByUserIdInput"]
    >({
      query: (blogsByUserIdInput: NexusGenInputs["BlogsByUserIdInput"]) => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`
            query BlogsByUserId($blogsByUserIdInput: BlogsByUserIdInput!) {
              blogsByUserId(blogsByUserIdInput: $blogsByUserIdInput) {
                id
                createdAt
                updatedAt
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
            blogsByUserIdInput,
          },
        },
      }),
      transformResponse: (
        response: { data: { blogsByUserId: NexusGenFieldTypes["Blog"][] } },
        meta,
        arg
      ) => {
        return response.data.blogsByUserId;
      },

      providesTags: ["Blog"],
    }),

    /* Get All Blogs */
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
                name
                description
                author {
                  id
                  username
                }
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

export const { useGetBlogByIdQuery, useGetAllBlogsQuery, useGetBlogsByUserIdQuery , util: {getRunningOperationPromises}} = blogApi;
export const {getAllBlogs, getBlogById, getBlogsByUserId} = blogApi.endpoints

