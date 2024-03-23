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
    }),

    getUser: builder.query<UserEntity, { id: number }>({
      query: ({ id }) => `users/${id}`,
      transformResponse: (response: GetUserResponse) => ({
        ...response.data,
        name: `${response.data.first_name} ${response.data.last_name}`,
      }),
    }),
  }),
})

export const { useGetUsersQuery, useGetUserQuery } = api
