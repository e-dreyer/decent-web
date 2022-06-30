import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userApi } from "../services/users";
import { profileApi } from "../services/profiles";
import { blogApi } from "../services/blogs";
import { blogPostApi } from "../services/blogPosts";
import { blogCommentApi } from "../services/blogComments";

import sessionReducer from "../features/session/sessionSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [blogPostApi.reducerPath]: blogPostApi.reducer,
    [blogCommentApi.reducerPath]: blogCommentApi.reducer,
    session: sessionReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(profileApi.middleware)
      .concat(blogApi.middleware)
      .concat(blogPostApi.middleware)
      .concat(blogCommentApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
