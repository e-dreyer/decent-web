import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NexusGenObjects } from "../../generated/nexus-typegen";
import { gql } from "graphql-request";

/* API for Profile related queries and Mutations*/
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://decent-web.herokuapp.com/api/graphql",
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    /* Get Profile by ID*/
    getProfileById: builder.query<NexusGenObjects["Profile"], string>({
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

    getAllProfiles: builder.query<NexusGenObjects["Profile"][], void>({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: gql`
            query {
              profiles {
                id
              }
            }
          `,
        },
      }),
      transformResponse: (
        response: { data: { profiles: NexusGenObjects["Profile"][] } },
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
