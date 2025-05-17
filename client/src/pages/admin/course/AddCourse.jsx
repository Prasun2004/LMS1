import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

export default function AddCourse() {
  const [courseTitle,setCourseTitle]=useState("");
  const [category,setCategory]=useState("");
  const navigate =useNavigate();
  //const isLoading=false;

  const [createCourse,{data,isLoading,error,isSuccess}]=useCreateCourseMutation();

  const createhandleCourse =async()=>{
     //  console.log(category,courseTitle);
       await createCourse({category,courseTitle});
  }

  const selectedCategory =(value)=>{
    setCategory(value);
  }

  useEffect(()=>{
      if (isSuccess) {
       // console.log(data);
        toast.success("Successful create");
        navigate("/admin/course");
      }
      if (error) {
      //  console.log(error),
        toast.error("fail to create");
      }
  },[isSuccess,error])

  return (
    <div className="flex-1 mx-10 ">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Let's add Course </h1>
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
            placeholder="your course name"
            onChange={(e)=>setCourseTitle(e.target.value)}
          />
          <Label>Category</Label>
          <Select onValueChange={selectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Fullstack Development">
                  Fullstack Development
                </SelectItem>
                <SelectItem value="MERN Stack Development">
                  MERN Stack Development
                </SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={()=>(navigate("/admin/course"))}>Back</Button>
          <Button disabled={isLoading} onClick={createhandleCourse}>
            {
              isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              ) :"Create"
            }
          </Button>
        </div>
      </div>
    </div>
  );
}
