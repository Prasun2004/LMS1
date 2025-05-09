import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PURCHASE_API="http://localhost:8080/purchase";

export const purchaseApi =createApi({
    reducerPath:"purchaseApi",
    baseQuery:fetchBaseQuery({
        baseUrl:PURCHASE_API,
        credentials:'include'
    }),
    endpoints:(builder)=>({
        createCheechoutSession:builder.mutation({
            query:(courseId)=>({
                url:"/cheeckout/create-cheeckout-session",
                method:"POST",
                body:{courseId}
            })
        }),
        getCourseDetailsWithStatus: builder.query({
            query:(courseId)=>({
                url:`/course/${courseId}/details-with-status`,
                method:"GET"
            })
        }),
        getPurchaseCourse: builder.query({
            query:()=>({
                url:"/",
                method:"GET"
            })
        }),
    })
})

export const {useCreateCheechoutSessionMutation,useGetCourseDetailsWithStatusQuery,useGetPurchaseCourseQuery} =purchaseApi