import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BlogComment } from "../types";

// Define a service using a base URL and expected endpoints
export const blogCommentApi = createApi({
  reducerPath: "blogCommentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["BlogComment"],

  endpoints: (builder) => ({
    getBlogCommentById: builder.query<BlogComment, string>({
      query: (id) => `blogComments/${id}`,
      transformResponse: (
        response: { blogComment: BlogComment },
        meta,
        arg
      ) => {
        return response["blogComment"];
      },
    }),

    getAllBlogComments: builder.query<BlogComment[], void>({
      query: () => "blogComments",
      transformResponse: (
        response: { blogComments: BlogComment[] },
        meta,
        arg
      ) => {
        return response["blogComments"];
      },
      providesTags: ["BlogComment"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetBlogCommentByIdQuery, useGetAllBlogCommentsQuery } =
  blogCommentApi;
