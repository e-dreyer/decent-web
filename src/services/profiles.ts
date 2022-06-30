import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Profile } from "../types";

// Define a service using a base URL and expected endpoints
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfileById: builder.query<Profile, string>({
      query: (id) => `profiles/${id}`,
      providesTags: ["Profile"],
      transformResponse: (response: { profile: Profile }, meta, arg) => {
        return response["profile"];
      },
    }),

    getAllProfiles: builder.query<Profile[], void>({
      query: () => "profiles",
      transformResponse: (response: { profiles: Profile[] }, meta, arg) => {
        return Object.values(response["profiles"]);
      },
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<
      Profile,
      Partial<Profile> & Pick<Profile, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `profiles/${id}`,
        method: "PATCH",
        body: { id, ...patch },
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProfileByIdQuery,
  useGetAllProfilesQuery,
  useUpdateProfileMutation,
} = profileApi;
