import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { HYDRATE } from 'next-redux-wrapper';

import { NexusGenFieldTypes, NexusGenInputs } from '../types/types';

/* API for Profile related queries and Mutations*/
export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_DATABASE,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    /* Get Profile by ID*/
    getProfileById: builder.query<
      NexusGenFieldTypes['Profile'],
      NexusGenInputs['ProfileByIdInput']
    >({
      query: (data: NexusGenInputs['ProfileByIdInput']) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: gql`
            query ProfileById($data: ProfileByIdInput!) {
              profileById(data: $data) {
                id
                createdAt
                updatedAt
                bio
                user {
                  id
                  username
                }
              }
            }
          `,
          variables: {
            data,
          },
        },
      }),
      transformResponse: (
        response: { data: { profileById: NexusGenFieldTypes['Profile'] } },
        meta,
        arg
      ) => {
        return response.data.profileById;
      },

      providesTags: ['Profile'],
    }),

    /* Get All Profiles */
    getAllProfiles: builder.query<NexusGenFieldTypes['Profile'][], void>({
      query: () => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: gql`
            query {
              allProfiles {
                id
                createdAt
                updatedAt
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
        response: { data: { allProfiles: NexusGenFieldTypes['Profile'][] } },
        meta,
        arg
      ) => {
        return response.data.allProfiles;
      },

      providesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetProfileByIdQuery,
  useGetAllProfilesQuery,
  util: { getRunningOperationPromises },
} = profileApi;
export const { getAllProfiles, getProfileById } = profileApi.endpoints;
