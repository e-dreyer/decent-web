import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NexusGenFieldTypes } from "../../generated/nexus-typegen";
import { gql } from "graphql-request";

/* API for Profile related queries and Mutations*/
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_DATABASE,
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    /* Get Profile by ID*/
    getProfileById: builder.query<NexusGenFieldTypes["Profile"], string>({
      query: (id) => ({
        url: "",
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
        url: "",
        method: "POST",
        body: {
          query: gql`
            query {
              profiles {
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
        response: { data: { profiles: NexusGenFieldTypes["Profile"][] } },
        meta,
        arg
      ) => {
        return response.data.profiles;
      },

      providesTags: ["Profile"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetProfileByIdQuery, useGetAllProfilesQuery } = profileApi;
