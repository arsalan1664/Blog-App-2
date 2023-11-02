import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

export interface loginValues {
    email: string,
    passward: string
}
export interface registerValues {
    username: string
    email: string,
    passward: string
}
export interface user {
    message: string,
    success: boolean,
    user: []
}
export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://8080-arsalan1664-codespacesb-vld4116o9wh.ws-us105.gitpod.io'
    }),
    endpoints: (build) => ({
        getUser: build.query < string, string > ({
            query: () => `/api/v1/user/all-users`
        }),
        postLogin: build.mutation < loginValues, loginValues > ({
            query: (values) => ({
                url: "/api/v1/user/login",
                method: "POST",
                body: values
            })
        }),
        postRegister: build.mutation < registerValues,registerValues > ({
            query: (values) => ({
                url: "/api/v1/user/register",
                method: "POST",
                body: values
            })
        })
    })
})

export const {
    useGetUserQuery,
    usePostLoginMutation,
    usePostRegisterMutation,
} = apiSlice
