import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NexusGenObjects } from "../../generated/nexus-typegen";
import { gql } from "graphql-request";

/* API for BlogComment related queries and Mutations*/
export const blogCommentApi = createApi({
  reducerPath: "blogCommentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://decent-web.herokuapp.com/api/graphql",
  }),
  tagTypes: ["BlogComment"],
  endpoints: (builder) => ({
    /* Get BlogComment by ID*/
    getBlogCommentById: builder.query<NexusGenObjects["BlogComment"], string>({
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

    getAllBlogComments: builder.query<NexusGenObjects["BlogComment"][], void>({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: gql`
            query {
              blogComments {
                id
              }
            }
          `,
        },
      }),
      transformResponse: (
        response: { data: { blogComments: NexusGenObjects["BlogComment"][] } },
        meta,
        arg
      ) => {
        return response.data.blogComments;
      },

      providesTags: ["BlogComment"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetBlogCommentByIdQuery, useGetAllBlogCommentsQuery } = blogCommentApi;
