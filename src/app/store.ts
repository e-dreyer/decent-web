import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { userApi } from '../services/users'
import { blogApi } from '../services/blogs'
import { blogPostApi } from '../services/blogPosts'
import { blogCommentApi } from '../services/blogComments'

export const makeStore = () =>
  configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
      [blogApi.reducerPath]: blogApi.reducer,
      [blogPostApi.reducerPath]: blogPostApi.reducer,
      [blogCommentApi.reducerPath]: blogCommentApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(blogApi.middleware)
        .concat(blogPostApi.middleware)
        .concat(blogCommentApi.middleware),
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
})
