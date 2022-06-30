import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Blog } from "../types";

// Define a service using a base URL and expected endpoints
export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getBlogById: builder.query<Blog, string>({
      query: (id) => `blogs/${id}`,
      transformResponse: (response: { blog: Blog }, meta, arg) => {
        return response["blog"];
      },
      providesTags: ["Blog"],
    }),
    getAllBlogs: builder.query<Blog[], void>({
      query: () => "blogs",
      transformResponse: (response: { blogs: Blog[] }, meta, arg) => {
        return Object.values(response["blogs"]);
      },
      providesTags: ["Blog"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetBlogByIdQuery, useGetAllBlogsQuery } = blogApi;
