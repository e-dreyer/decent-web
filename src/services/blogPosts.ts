import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BlogPost } from "../types";

// Define a service using a base URL and expected endpoints
export const blogPostApi = createApi({
  reducerPath: "blogPostApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["BlogPost"],

  endpoints: (builder) => ({
    getBlogPostById: builder.query<BlogPost, string>({
      query: (id) => `blogPosts/${id}`,
      transformResponse: (response: { blogPost: BlogPost }, meta, arg) => {
        return response["blogPost"];
      },
      providesTags: ["BlogPost"],
    }),
    getAllBlogPosts: builder.query<BlogPost[], void>({
      query: () => "blogPosts",
      transformResponse: (response: { blogPosts: BlogPost[] }, meta, arg) => {
        return response["blogPosts"];
      },
      providesTags: ["BlogPost"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetBlogPostByIdQuery, useGetAllBlogPostsQuery } = blogPostApi;
