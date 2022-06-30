import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NexusGenObjects } from "../../generated/nexus-typegen";
import { gql } from "graphql-request";

/* API for User related queries and Mutations*/
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://decent-web.herokuapp.com/api/graphql",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    /* Get User by ID*/
    getUserById: builder.query<NexusGenObjects["User"], string>({
      query: (id) => ({
        url: "",
        method: "POST",
        body: {
          query: gql`
          query user($id:ID!) {
            user(id: ${id}) {
              id
            }
          }`,
        },
      }),

      providesTags: ["User"],
    }),

    getAllUsers: builder.query<NexusGenObjects["User"][], void>({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: gql`
            query {
              users {
                id
              }
            }
          `,
        },
      }),
      transformResponse: (
        response: { data: { users: NexusGenObjects["User"][] } },
        meta,
        arg
      ) => {
        return response.data.users;
      },

      providesTags: ["User"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetUserByIdQuery, useGetAllUsersQuery } = userApi;
