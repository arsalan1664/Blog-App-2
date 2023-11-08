import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Blog {
  id: string;
  username: string;
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
  blogs: any[]; // Assuming these are the actual blog objects
}

export interface BlogsResponse {
  message: string;
  success: boolean;
  blogcount: number;
  blog: any[]; // Update this to the appropriate blog type
}

export interface UserBlogsResponse {
  message: string;
  success: boolean;
  userBlog: Blog;
}

export interface UserId {
  id: string;
}

export const apiBlogSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ubiquitous-space-engine-j6479g67x5pfpgvq-8080.app.github.dev',
  }),
  tagTypes: ['Blog'],
  endpoints: (build) => ({
    getAllBlogs: build.query<BlogsResponse, void>({
      query: () => '/api/v1/blog/all-blog',
      providesTags: ['Blog'],
    }),
    getMyBlogs: build.query<UserBlogsResponse, string>({
      query: (id) => `/api/v1/blog/user-blog/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    // postLogin: build.mutation<loginValues, loginValues>({
    //     query: (values) => ({
    //         url: "/api/v1/user/login",
    //         method: "POST",
    //         body: values
    //     })
    // }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetMyBlogsQuery,
  // usePostLoginMutation,
} = apiBlogSlice;
