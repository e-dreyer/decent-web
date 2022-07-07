import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NexusGenFieldTypes } from "../types/types";
import { gql } from "graphql-request";

/* API for BlogComment related queries and Mutations*/
export const blogCommentApi = createApi({
  reducerPath: "blogCommentApi",
  baseQuery: fetchBaseQuery({
    
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_DATABASE,
  }),
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

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetBlogCommentByIdQuery, useGetAllBlogCommentsQuery } = blogCommentApi;
