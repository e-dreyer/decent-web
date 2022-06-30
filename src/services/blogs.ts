import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NexusGenObjects } from "../../generated/nexus-typegen";
import { gql } from "graphql-request";

/* API for Blog related queries and Mutations*/
export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://decent-web.herokuapp.com/api/graphql",
  }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    /* Get Blog by ID*/
    getBlogById: builder.query<NexusGenObjects["Blog"], string>({
      query: (id) => ({
        url: "",
        method: "POST",
        body: {
          query: gql`
          query blog($id:ID!) {
            blog(id: ${id}) {
              id
            }
          }`,
        },
      }),

      providesTags: ["Blog"],
    }),

    getAllBlogs: builder.query<NexusGenObjects["Blog"][], void>({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: gql`
            query {
              blogs {
                id
              }
            }
          `,
        },
      }),
      transformResponse: (
        response: { data: { blogs: NexusGenObjects["Blog"][] } },
        meta,
        arg
      ) => {
        return response.data.blogs;
      },

      providesTags: ["Blog"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetBlogByIdQuery, useGetAllBlogsQuery } = blogApi;
