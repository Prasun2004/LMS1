import React, { useState } from 'react'
import SingleCourse from './SingleCourse';

export default function MyLearing() {
    const [isLoading,setIsLoading]=useState(false);
    const mylearing=[];
  return (
    <div className='max-w-xl mx-auto my-24 px-4 md:px-0'>
     <h1 className='font-bold text-2xl'>My Learing</h1>
     <div className='my-5'>
      {
        isLoading ? (
            <MyLearningSkeleton/>
        ) : mylearing.length === 0 
        ? (<p>You are not enrollen any course</p> ) :(
            mylearing.map((course,index)=><SingleCourse key={index} course={course}/>)
        )
      }
     </div>
    </div>
  )
}

const MyLearningSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
        ></div>
      ))}
    </div>
  );
