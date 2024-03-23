import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserEntity } from '../../types/UserEntity'

type GetUsersResponse = {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: Array<{
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
  }>
}

type GetUserResponse = {
  data: {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
  }
  support: unknown
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://reqres.in/api/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<UserEntity[], { page?: number }>({
      query: ({ page }) => (page ? `users?page=${page}` : 'users'),
      transformResponse: (response: GetUsersResponse) =>
        response.data.map((user) => ({
          ...user,
          name: `${user.first_name} ${user.last_name}`,
        })),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'User' as const, id })), 'User']
          : ['User'],
      merge: (currentCache = [], response, { arg: { page } }) => {
        if (!page) {
          return currentCache
        }
        // merge cache
        for (const user of response) {
          const i = currentCache.findIndex(({ id }) => id === user.id)
          if (i < 0) {
            // add new users to the cache
            currentCache.push(user)
          } else {
            // replace currentCache with updated users
            currentCache[i] = user
          }
        }
      },
      serializeQueryArgs: ({ endpointName }) => ({ endpointName }),
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page != null && currentArg?.page !== previousArg?.page,
    }),

    getUser: builder.query<UserEntity, { id: number }>({
      query: ({ id }) => `users/${id}`,
      transformResponse: (response: GetUserResponse) => ({
        ...response.data,
        name: `${response.data.first_name} ${response.data.last_name}`,
      }),
      providesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
  }),
})

export const { useGetUsersQuery, useGetUserQuery } = api
