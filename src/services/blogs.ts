import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NexusGenFieldTypes } from "../types/types";
import { gql } from "graphql-request";

/* API for Blog related queries and Mutations*/
export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_DATABASE,
  }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    /* Get Blog by ID*/
    getBlogById: builder.query<NexusGenFieldTypes ["Blog"], string>({
      query: (id) => ({
        url: "",
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
        url: "",
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

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetBlogByIdQuery, useGetAllBlogsQuery } = blogApi;
