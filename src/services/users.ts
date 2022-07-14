import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { gql } from 'graphql-request'
import { HYDRATE } from 'next-redux-wrapper'

import { NexusGenFieldTypes, NexusGenInputs } from '../types/types'

/* API for User related queries and Mutations*/
export const userApi = createApi({
  reducerPath: 'userApi',

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_GRAPHQL_DATABASE,
  }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },

  tagTypes: ['User'],

  endpoints: (builder) => ({
    /* Get All Users Basic */
    getAllUsersBasic: builder.query<NexusGenFieldTypes['User'][], void>({
      query: () => ({
        url: '/graphql',

        method: 'POST',

        body: {
          query: gql`
            query {
              allUsers {
                id
                email
                name
                username
                image
                bio
              }
            }
          `,
        },
      }),

      transformResponse: (response: { data: { allUsers: NexusGenFieldTypes['User'][] } }) => {
        return response.data.allUsers
      },

      providesTags: ['User'],
    }),

    /* Get All Users Extensive */
    getAllUsersExtensive: builder.query<NexusGenFieldTypes['User'][], void>({
      query: () => ({
        url: '/graphql',

        method: 'POST',

        body: {
          query: gql`
            query {
              allUsers {
                id
                email
                name
                username
                image
                bio
                createdAt
                updatedAt
              }
            }
          `,
        },
      }),

      transformResponse: (response: { data: { allUsers: NexusGenFieldTypes['User'][] } }) => {
        return response.data.allUsers
      },

      providesTags: ['User'],
    }),

    /* Get User by Id */
    getUserById: builder.query<NexusGenFieldTypes['User'], NexusGenInputs['UserByIdInput']>({
      query: (data: NexusGenInputs['UserByIdInput']) => ({
        url: '/graphql',

        method: 'POST',

        body: {
          query: gql`
            query ($data: UserByIdInput!) {
              userById(data: $data) {
                id
                email
                name
                username
                image
                bio
                createdAt
                updatedAt
              }
            }
          `,

          variables: {
            data,
          },
        },
      }),

      transformResponse: (response: { data: { userById: NexusGenFieldTypes['User'] } }) => {
        return response.data.userById
      },

      providesTags: ['User'],
    }),

    /* Get User by Email*/
    getUserByEmail: builder.query<NexusGenFieldTypes['User'], NexusGenInputs['UserByEmailInput']>({
      query: (data: NexusGenInputs['UserByEmailInput']) => ({
        url: '/graphql',

        method: 'POST',

        body: {
          query: gql`
            query ($data: UserByEmailInput!) {
              userByEmail(data: $data) {
                id
                email
                name
                username
                image
                bio
                createdAt
                updatedAt
              }
            }
          `,

          variables: {
            data,
          },
        },
      }),

      transformResponse: (response: { data: { userByEmail: NexusGenFieldTypes['User'] } }) => {
        return response.data.userByEmail
      },

      providesTags: ['User'],
    }),
  }),
})

export const {
  useGetAllUsersBasicQuery,
  useGetAllUsersExtensiveQuery,
  useGetUserByIdQuery,
  useGetUserByEmailQuery,
  util: { getRunningOperationPromises },
} = userApi

export const { getAllUsersBasic, getAllUsersExtensive, getUserById, getUserByEmail } =
  userApi.endpoints
