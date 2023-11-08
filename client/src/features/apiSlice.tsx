import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

export interface loginValuesRes {
    email: string,
    passward: string,
    user: any
}
export interface loginValuesReq {
    email: string,
    passward: string,
}
export interface registerValues {
    username: string
    email: string,
    passward: string
}
export interface userTypes {
    message: string,
    success: boolean,
    user: any[],
}
export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://ubiquitous-space-engine-j6479g67x5pfpgvq-8080.app.github.dev',
        
    }),
    tagTypes: ['user'], 
    endpoints: (build) => ({
        getUser: build.query < userTypes, void > ({
            query: () => `/api/v1/user/all-users`,
            providesTags: ['user'],
        }),
        postLogin: build.mutation < loginValuesRes, loginValuesReq > ({
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

