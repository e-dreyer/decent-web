import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import {HYDRATE} from 'next-redux-wrapper'

import { NexusGenFieldTypes } from "../types/types";

/* API for Profile related queries and Mutations*/
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_DATABASE,
  }),
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    /* Get Profile by ID*/
    getProfileById: builder.query<NexusGenFieldTypes["Profile"], string>({
      query: (id) => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`
          query profile($id:ID!) {
            profile(id: ${id}) {
              id
            }
          }`,
        },
      }),

      providesTags: ["Profile"],
    }),

    getAllProfiles: builder.query<NexusGenFieldTypes["Profile"][], void>({
      query: () => ({
        url: "/graphql",
        method: "POST",
        body: {
          query: gql`
            query {
              allProfiles {
                id
                bio
                user {
                  id
                  username
                }
              }
            }
          `,
        },
      }),
      transformResponse: (
        response: { data: { allProfiles: NexusGenFieldTypes["Profile"][] } },
        meta,
        arg
      ) => {
        return response.data.allProfiles;
      },

      providesTags: ["Profile"],
    }),
  }),
});


export const { useGetProfileByIdQuery, useGetAllProfilesQuery, util: {getRunningOperationPromises} } = profileApi;
export const {getAllProfiles, getProfileById} = profileApi.endpoints
