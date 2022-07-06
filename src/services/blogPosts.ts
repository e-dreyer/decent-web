import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NexusGenFieldTypes } from "../../generated/nexus-typegen";
import { gql } from "graphql-request";

/* API for BlogPost related queries and Mutations*/
export const blogPostApi = createApi({
  reducerPath: "blogPostApi",
  baseQuery: fetchBaseQuery({
    
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_DATABASE,
  }),
  tagTypes: ["BlogPost"],
  endpoints: (builder) => ({
    /* Get BlogPost by ID*/
    getBlogPostById: builder.query<NexusGenFieldTypes["BlogPost"], string>({
      query: (id) => ({
        url: "",
        method: "POST",
        body: {
          query: gql`
          query blogPost($id:ID!) {
            blogPost(id: ${id}) {
              id
            }
          }`,
        },
      }),

      providesTags: ["BlogPost"],
    }),

    getAllBlogPosts: builder.query<NexusGenFieldTypes["BlogPost"][], void>({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: gql`
            query {
              blogPosts {
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
        response: { data: { blogPosts: NexusGenFieldTypes["BlogPost"][] } },
        meta,
        arg
      ) => {
        return response.data.blogPosts;
      },

      providesTags: ["BlogPost"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetBlogPostByIdQuery, useGetAllBlogPostsQuery } = blogPostApi;
