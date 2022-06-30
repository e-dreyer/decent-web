import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types";

/* API for User related queries and Mutations*/
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://decent-apollo.herokuapp.com/api/",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    /* Get User by ID*/
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: "",
        method: "POST",
        body: {
          query: `
          query user($id:ID!) {
            user(id: ${id}) {
              id
            }
          }
            `,
        },
      }),

      providesTags: ["User"],
    }),

    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: `
              query {
                users {
                  id
                }
              }
                `,
        },
      }),
      transformResponse: (response: { data: { users: User[] } }, meta, arg) => {
        return response.data.users;
      },

      providesTags: ["User"],
    }),

    addUser: builder.mutation<User, string>({
      query: (id) => ({
        url: `users`,
        method: "POST",
        body: {
          id: id,
        },
        invalidatesTags: ["User"],
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetUserByIdQuery, useGetAllUsersQuery, useAddUserMutation } =
  userApi;
