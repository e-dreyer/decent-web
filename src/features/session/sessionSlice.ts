import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { z } from "zod";

import { User, Profile } from "../../types";

const StatusEnum = z.enum(["pending", "fulfilled", "rejected"]);
type StatusEnum = z.infer<typeof StatusEnum>;

const SessionState = z.object({
  user: User.optional(),
  profile: Profile.optional(),
  loggedIn: z.boolean(),
  status: StatusEnum,
  error: z.string(),
});

type SessionState = z.infer<typeof SessionState>;

// Define the initial state using that type
const initialState: SessionState = {
  user: undefined,
  profile: undefined,
  loggedIn: false,
  status: StatusEnum.parse("fulfilled"),
  error: "",
};

export const fetchCurrentUserProfile = createAsyncThunk<
  Profile | undefined,
  User
>("session/fetchCurrentUserProfile", async (user: User) => {
  const response = await fetch(
    `http://localhost:5000/api/users/${user.id}/profile`
  );
  const data = await response.json();
  const parseResult = Profile.safeParse(data[0]);

  if (parseResult.success) {
    return parseResult.data;
  }

  return undefined;
});

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loggedIn = true;
    },

    logOut: (state) => {
      state.user = undefined;
      state.loggedIn = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUserProfile.fulfilled, (state, { payload }) => {
      state.status = StatusEnum.parse("fulfilled");
      state.profile = payload;

      if (!payload) {
        state.error = "PROFILE_DOES_NOT_EXIST";
      }
    });

    builder.addCase(fetchCurrentUserProfile.pending, (state) => {
      state.status = StatusEnum.parse("pending");
      state.error = "";
    });

    builder.addCase(fetchCurrentUserProfile.rejected, (state) => {
      state.status = StatusEnum.parse("rejected");
      state.profile = undefined;
      state.error = "FAILED_TO_FETCH_PROFILE";
    });
  },
});

export const { logIn, logOut } = sessionSlice.actions;

export default sessionSlice.reducer;
