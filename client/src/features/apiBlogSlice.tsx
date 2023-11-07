import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'


export interface blogs {
    message: string,
    success: boolean,
    blogcount: number,
    blog: []
}



export const apiBlogSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://ubiquitous-space-engine-j6479g67x5pfpgvq-8080.app.github.dev',
    }),
    endpoints: (build) => ({
        getAllBlogs: build.query<blogs,void>({
            query: () => `/api/v1/blog/all-blog`
        }),
        // postLogin: build.mutation<loginValues, loginValues>({
        //     query: (values) => ({
        //         url: "/api/v1/user/login",
        //         method: "POST",
        //         body: values
        //     })
        // }),
    })
})

export const {
    useGetAllBlogsQuery,
    // usePostLoginMutation,
} = apiBlogSlice