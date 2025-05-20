import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useCompleteCourseMutation, useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectureProgressMutation } from '@/features/api/courseProgressApi'
import { CheckCircle, CirclePlay } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function CourseProgress() {

  const params =useParams();
  const navigate=useNavigate("");
  const {courseId} = params;
  console.log(courseId);
  const {data,isLoading,isError,refetch} = useGetCourseProgressQuery(courseId);
  const [updateLectureProgress] =useUpdateLectureProgressMutation();
  const [completeCourse,{data:markCompleteData, isSuccess:completedSucess}] =useCompleteCourseMutation();
  const [inCompleteCourse,{data:markinCompleteData,isSuccess:inCompleteSucess}]=useInCompleteCourseMutation();

 
 console.log(data);

  useEffect(()=>{
    if (completedSucess) {
      refetch();
     console.log(markCompleteData);
      // toast.success("completed sucessfully")
    }
    if (inCompleteCourse) {
      refetch();
     console.log(markinCompleteData);
      // toast.success("incomplete sucessfully");
    }

  },[completedSucess,inCompleteSucess])

  
   const [currentLecture,setCurrentLecture]=useState(null);

   const initalLecture =currentLecture || data?.data?.courseDetails?.lectures[0];

   const isLectureCompleted =(lectureId)=>{
      return data?.data?.progress.some((prog)=>prog.lectureId === lectureId && prog.viewed);
   }

   const hanldeLectureProgress = async(lectureId)=>{
      await updateLectureProgress({courseId,lectureId});
      refetch();
   }

   const handleSelectLecture=(lecture)=>{
    setCurrentLecture(lecture);
    hanldeLectureProgress(lecture._id);
   }

   const handleCompleteCourse =async()=>{
       await completeCourse(courseId);
   }

   const handleinCompleteCourse =async()=>{
       await inCompleteCourse(courseId);
   }

   
   const handlegame=()=>{
      navigate(`/course-progress/${courseId}/game`);
   }

  if (isLoading) {
  
    return <p>Loading...</p> ;
  }

  if (isError) {
   
    return <p>Fail to get course details</p>;
  }
 
  return (
    <div className='max-w-7xl mx-auto p-4'>
      <div className='flex justify-between mb-4' >
        <h1 className='text-2xl font-bold'>{data?.data?.courseDetails?.courseTitle}</h1>
         <div>
             <Button onClick={data?.data?.completed ? handleinCompleteCourse :handleCompleteCourse} variant={data?.data?.completed ? "outline" :" default"}>
          {
             data?.data?.completed ? <div className='flex items-center'>
               <CheckCircle className='h-4 w-4 mr-2'/> 
               <span>Completed</span>
             </div> :
             "Mark as Completed"
          }
          </Button>
         </div>
        
      </div>
      <div className='flex mb-4' style={{justifyContent:"flex-end"}} >
        {
              data?.data?.completed &&  <Button onClick={handlegame}>Game</Button>
        }
         
      </div>
      
      <div className='flex flex-col md:flex-row hap-6'>
        <div className='flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4'>
        <div>
           <video
           src={currentLecture?.videoUrl || initalLecture?.videoUrl}
           controls
           className='w-full h-auto md:rounded-lg'
           onPlay={()=>hanldeLectureProgress(currentLecture?._id || initalLecture?._id)}
          />
        </div>
        <div className='mt-2'>
          <h3 className='font-medium text-lg'>{
          `Lecture ${data?.data?.courseDetails?.lectures.findIndex((lec)=>lec._id ===(currentLecture?._id || initalLecture?._id))+1} : ${currentLecture?.lectureTitle || initalLecture?.lectureTitle}`
          }</h3>
        </div>
        </div>
        <div className='flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md: pl-4 pt-0'>
           <h2 className='font-semibold text-xl mb-4'>Course lectures</h2>
           <div className='flex-1 overflow-y-auto'>
            {
             data?.data?.courseDetails?.lectures?.map((lecture,idx)=>(
              <Card key={idx} 
              className={`mb-3 hover:cursor-pointer transtion transform ${lecture?._id === currentLecture?._id ? 'bg-gray-200 dark:bg-gray-800' :'dark:bg-gray-800'}`} 
              onClick={()=>handleSelectLecture(lecture)}>
                <CardContent className='flex items-center justify-between p-4'>
                  <div className='flex item-center'>
                    {
                       isLectureCompleted(lecture?._id) ? (<CheckCircle className='text-green-500 mr-2'/>):(<CirclePlay className='text-gray-500 mr-2'/>)
                    }
                    <div>
                    <CardTitle className='text-lg font-medium'>
                      {lecture?.lectureTitle}
                    </CardTitle>
                  </div>
                  </div>
                  {
                    isLectureCompleted(lecture?._id) && <Badge variant='outline' className='bg-green-200 text-green-600'>
                    Completed
                  </Badge>
                  }
                  
                </CardContent>
              </Card>
             ))}
           </div>
        </div>
      </div>
    </div>
  )
}
