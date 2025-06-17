import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label";
import {  useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/api/courseApi';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Lecture from './Lecture';

export default function CreateLecture() {
    const params=useParams();
    const courseId=params.courseId;
    const navigate =useNavigate();

    const [lectureTitle,setLectureTitle]=useState("");
     
     const [createLecture,{data,isLoading,isSuccess,error}]=useCreateLectureMutation();

     const {data:lectureData,isLoading:lectureLoading,isError:lectureError,refetch}=useGetCourseLectureQuery(courseId);

    // console.log(lectureData);
     
     //console.log(data);
     const createLectureHandler= async()=>{
       // console.log(lectureTitle);
         await createLecture({lectureTitle,courseId});
     } 

    //  const gotoquiz =()=>{
    //   navigate("addquiz")
    //  }

     useEffect(()=>{
        if (isSuccess) {
           // console.log(isLoading);
            refetch();
            toast.success("create successful");
        }
        if (error) {
            //console.log(error);
            toast.error("fail to create");
        }
     },[isSuccess,error])
  return (
    <div className="flex-1 mx-10 ">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Let's add Lecture </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
          necessitatibus quisquam nesciunt aut vel eveniet. Doloremque minima
          eius pariatur libero error rem laborum aperiam velit nisi quibusdam
          corporis, expedita recusandae.
        </p>
      </div>
      <div className="space-y-4">
        <div className="">
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={lectureTitle}
            placeholder="your course name"
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to Course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create Lecture"
            )}
          </Button>
          {/* <Button onClick={gotoquiz}>
            Go to Quiz
          </Button> */}
        </div>
        <div className="mt-24">
          {lectureLoading ? (
            <p>lecture is loading</p>
          ) : lectureError ? (
            <p>Fail to load lectures</p>
          ) : lectureData?.lectures.length === 0 ? (
            <p>No lecture found</p>
          ) : (
            lectureData.lectures.map((lecture,idx)=>(
              <Lecture key={courseId} lecture={lecture} index={idx}/>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
