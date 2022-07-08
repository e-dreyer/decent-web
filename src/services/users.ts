import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import { HYDRATE } from "next-redux-wrapper";

import { NexusGenFieldTypes, NexusGenInputs} from "../types/types";

/* API for User related queries and Mutations*/
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_DATABASE,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["User"],
  endpoints: (builder) => ({
    /* Get User by ID*/
    getUserById: builder.query<NexusGenFieldTypes["User"], NexusGenInputs["UserByIdInput"]>({
      query: (data: NexusGenInputs["UserByIdInput"]) => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`
            query ($data: UserByIdInput!) {
              userById(data: $data) {
                id
                createdAt
                updatedAt
                username
                email
                profile {
                  id
                }
              }
            }
          `,
          variables: {
            data
          }
        },
      }),
      transformResponse: (
        response: { data: { userById: NexusGenFieldTypes["User"] } },
        meta,
        arg
      ) => {
        return response.data.userById;
      },

      providesTags: ["User"],
    }),

    /* Get All Users */
    getAllUsers: builder.query<NexusGenFieldTypes["User"][], void>({
      query: () => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`
            query {
              allUsers {
                id
                createdAt
                updatedAt
                username
                profile {
                  id
                }
              }
            }
          `,
        },
      }),
      transformResponse: (
        response: { data: { allUsers: NexusGenFieldTypes["User"][] } },
        meta,
        arg
      ) => {
        return response.data.allUsers;
      },

      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  util: { getRunningOperationPromises },
} = userApi;
export const { getAllUsers, getUserById } = userApi.endpoints;
