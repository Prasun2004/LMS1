import BuyCourseButton from '@/components/BuyCourseButton';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator';
import { useGetCourseDetailsWithStatusQuery } from '@/features/api/purchaseApi';
import { BadgeInfo, PlayCircle } from 'lucide-react'
import React from 'react'
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';

export default function CourseDetails() {
    const params =useParams();
    const courseId =params.courseId;
     const navigate =useNavigate();
    const {data,isLoading,isError} =useGetCourseDetailsWithStatusQuery(courseId);

   
   
    if (isLoading) {
        return <h1>Loading....</h1>
    }
    if (isError) {
        return <h1>Fail to Get Course.</h1>
    }
  
    const continueHandler = ()=>{
        if (data?.purchased) {
            navigate(`/course-progress/${courseId}`);
        }else{
            alert("please purchase course");
        }
    }
  return (
    <div className='space-y-5'>
       <div className='bg-[#2D2F31] text-white'>
          <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'> 
             <h1 className='font-bold text-2xl md:text-3xl'>{data?.course?.courseTitle}</h1>
             <p className='text-base md:text-lg '>{data?.course?.subTitle}</p>
             <p>Creted by<span className='text-[#c0c4fc] underline italic'>{data?.course?.creator?.name}</span></p>
             <div className='flex item-center gap-2 text-sm'>
                <BadgeInfo size={16}/>
                <p>Last Updated { data?.course?.createdAt.split("T")[0]}</p>
             </div>
             <p>Students Enrolled :{data?.course?.enrolledStudents.length}</p>
          </div>
       </div>
        <div className='max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10'>
          <div className='w-full lg:w-1/2 space-y-5'>
            <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
            <p className='text-sm'>
               {data?.course?.description}
            </p>
            <Card>
                <CardHeader>
                    <CardTitle>{data?.course?.courseTitle}</CardTitle>
                    <CardDescription>{data?.course?.lectures.length}</CardDescription>
                </CardHeader>
                <CardContent className='space-y-3'>
                   {
                    data?.course?.lectures.map((lecture,index)=>(
                        <div key={index} className='flex item-center gap-3 text-sm'>
                           <span>
                            {
                               lecture.isPreviewFree  ?( <PlayCircle/>) :(<Lock size={14}/> )
                            }
                           </span>
                           <p>{lecture.lectureTitle}</p>
                        </div>
                    ))
                   }
                </CardContent>
            </Card>
          </div>
        <div className='w-full lg:w-1/3'>
           <Card>
            <CardContent className='p-4 flex flex-col'>
                <div className='w-full aspect-video mb-4'> 
                   <ReactPlayer
                    width='100%'
                    height='100%'
                    url={data?.course?.lectures[0].videoUrl}
                    controls={true}
                   />
                </div>
                <h1>{data?.course?.lectures?.lectureTitle}</h1>
                <Separator className="my-2"/>
                 <h1 className='text-lg md:text-xl font-semibold'>{data?.course?.coursePrice}</h1>
            </CardContent>
            <CardFooter className='flex justify-center p-4'>
                {
                    data?.purchased ? (
                        <Button className='w-full' onClick={continueHandler}>
                        Continue Course
                    </Button>
                    ) : (
                        <Button className='w-full'>
                        <BuyCourseButton courseId={courseId}/>
                    </Button>
                    )
                }
            </CardFooter>
           </Card>
        </div>
       </div>
    </div>
  )
}
