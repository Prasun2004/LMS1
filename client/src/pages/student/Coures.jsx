import { Skeleton } from '@/components/ui/skeleton';
import React, { useState } from 'react'
import SingleCourse from './SingleCourse';
import { useGetPublishedCourseQuery } from '@/features/api/courseApi';

export default function Courses() {
    const {data,isLoading,isSuccess,isError}=useGetPublishedCourseQuery();
    
    console.log(data);
    if(isError) return 
  return (
    <div className='bg-gray-50 dark:bg-[#141414]'>
         <div className='max-w-7xl mx-auto p-6'>
             <h2 className='font-bold text-3xl text-center mb-10'>Our Courses</h2>
             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
             {
                isLoading?  (
                    Array.from({ length: 4 }).map((_, index) => (
                      <CourseSkeleton key={index} />
                    ))
                  ) :(
                     data?.courses?.map((course,index)=><SingleCourse course={course} key={index}/>)
                  )
             }
             </div>
         </div>
    </div>
  )
}

const CourseSkeleton = () => {
    return (
      <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
        <Skeleton className="w-full h-36" />
        <div className="px-5 py-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    );
  };
