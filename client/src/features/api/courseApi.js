import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_URL="http://localhost:8080/course";

export const courseApi = createApi({
    reducerPath:"courseApi",
    tagTypes:['Refetch_Creator_Course'],
    baseQuery:fetchBaseQuery({
        baseUrl: COURSE_URL,
        credentials:"include"
    }),

    endpoints:(builder)=>({
        createCourse:builder.mutation({
            query:({courseTitle,category})=>({
                url:"/",
                method:"POST",
                body:{category,courseTitle}
            }),
            invalidatesTags:['Refetch_Creator_Course','Refetch_Lecture'],
        }),
        getSearchCourse :builder.query({
            query:({query,categories, sortByPrice})=>{
                let queryString = `/search?query=${encodeURIComponent(query)}`
                if (categories && categories.length>0) {
                     const categoriesStirng= categories.map(encodeURIComponent).join(",")
                     queryString+=`&categories=${categoriesStirng}`
                }
                if (sortByPrice) {
                    queryString+=`&sortByPrice=${encodeURIComponent(sortByPrice)}`;
                }

                return {
                 url: queryString,
                method:"GET"
                }

            }
        }),
        getPublishedCourse:builder.query({
            query:()=>({
                url:'/published-course',
                method:"GET"
            })
        }),
        getCreatorCourse:builder.query({
            query:()=>({
                url:"/",
                method:"GET",
            }),
            providesTags:['Refetch_Creator_Course'],
        }),
        editCourse :builder.mutation({
            query:({formData,courseId})=>({
               url: `/${courseId}`,
               method:"PUT",
               body:formData
            }),
            invalidatesTags:['Refetch_Creator_Course'],
        }),

        getCourseById:builder.query({
            query:(courseId)=>({
                url:`/${courseId}`,
                method:"GET"    
            }),
        }),
        createLecture: builder.mutation({
            query:({lectureTitle,courseId})=>({
                url:`/${courseId}/lecture`,
                method:"POST",
                body:{lectureTitle}
            }),
        }),
        getCourseLecture:builder.query({
            query:(courseId)=>({
                url:`/${courseId}/lecture`,
                method:"GET"    
            }),
            providesTags:['Refetch_Lecture']
        }),
        editLecture:builder.mutation({
            query:({lectureTitle,ispreviewFree,videoInfo,courseId,lectureId})=>({
               url:`${courseId}/lecture/${lectureId}`,
               method:"POST",
               body:{lectureTitle,ispreviewFree,videoInfo}
            }),
        }),
        removeLecture:builder.mutation({
            query:(lectureId)=>({
               url:`/lecture/${lectureId}`,
               method:"DELETE"
            }),
            invalidatesTags:['Refetch_Lecture']
        }),
        getLectureById:builder.query({
            query:(lectureId)=>({
                url:`/lecture/${lectureId}`,
                method:"GET"
            }),
        }),
        publishCourse: builder.mutation({
            query:({query,courseId})=>({
                 url:`/${courseId}?publish=${query}`,
                 method:"PATCH"
            }),
        }),
    }),
});

export const {
    useCreateCourseMutation,
    useGetCreatorCourseQuery,
    useEditCourseMutation,
    useGetCourseByIdQuery,
    useCreateLectureMutation,
    useGetCourseLectureQuery,
    useEditLectureMutation,
    useRemoveLectureMutation,
    useGetLectureByIdQuery,
    usePublishCourseMutation,
    useGetPublishedCourseQuery,
    useGetSearchCourseQuery
} =courseApi