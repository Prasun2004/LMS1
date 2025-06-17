
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '@/features/api/courseApi'
import JoditEditor from 'jodit-react'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function CourseTab() {
   const isPublish =true;
   //const isLoading=false;
   const editor=useRef(null);
   const params =useParams();
   const courseId=params.courseId;
   
   const [editCourse,{data,isLoading,isSuccess,error}]=useEditCourseMutation(courseId);

   //console.log(data);

   
   const [description,setDescription] =useState("");

   const [input,setInput]=useState({
      courseTitle:"",
      subTitle:"",
      category:"",
      courseLevel:"",
      coursePrice:"",
      courseThumbnail:""
   });

   const [image,setImage]=useState("");

   const navigate =useNavigate();

   const {data:coursebyData,isLoading:coursebyLoading,refetch} =useGetCourseByIdQuery(courseId,{refetchOnMountOrArgChange:true});

   const [publishCourse,{}]=usePublishCourseMutation();

   console.log(coursebyData);

   const changeEventHandler=(e)=>{
     const {name,value} =e.target;
     setInput({...input ,[name]:value});
   };

   const selectCategory=(val)=>{
    setInput({...input, category:val});
   }

   const selectCourse=(val)=>{
    setInput({...input, courseLevel:val});
   }

   const selectFile=(e)=>{
     const file=e.target.files?.[0];
     if (file) {
        setInput({...input, courseThumbnail:file});
        const fileReader =new FileReader();
        fileReader.onloadend =()=>{
           setImage(fileReader.result || input.courseThumbnail);
        }
        fileReader.readAsDataURL(file);
     }
   };
   
   const updateCourseHandler = async()=>{
    
    const formData=new FormData();
     
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    
    //console.log(input);
    await editCourse(  {formData,courseId} );
   }

   useEffect(()=>{
    if (isSuccess) {
    //  console.log(isSuccess);
      toast.success("successfully create");
      if (error) {
        toast.error("fail to update");
      }
    }
   },[isSuccess,error])

   const course =coursebyData?.course;
   console.log(course?.description);

   const publishStatusHandler=async(action)=>{
        try {
            const response = await publishCourse({courseId ,query :action});

            if (response?.data) {
              refetch();
               toast.success("successfuly publish");
            }
        } catch (error) {
           console.error(error);
        }
   }

   useEffect(()=>{
      setInput({
      courseTitle:course?.courseTitle,
      subTitle:course?.subTitle,
      description:course?.description,
      category:course?.category,
      courseLevel:course?.courseLevel,
      coursePrice:course?.coursePrice,
      courseThumbnail:course?.courseThumbnail
      })
   },[course])

   if (coursebyLoading) {
     return <Loader2 className='h-4 w-4 animate-spin'/>
   }

  return (
    <Card>
    <CardHeader className='flex flex-row jutify-between'>
        <div>
            <CardTitle>Basic Course Information</CardTitle>
            <CardDescription>
                Make Change to your course here
                Provide a clear and engaging description of your course. 
                Include what learners will gain, key topics covered, and who the course is for. 
                A well-written description helps attract and inform potential students.
            </CardDescription>
        </div>
        <div className='space-x-2'>
            <Button variant="outline" disabled={coursebyData?.course.lectures.length===0} onClick={()=>publishStatusHandler(coursebyData?.course?.isPublish ? "false" :"true" )}>
               {
                coursebyData?.course?.isPublish ? "UnPublish" :"Publish"
               }
            </Button>
            <Button>
                Remove Course
            </Button>
        </div>
    </CardHeader>
    <CardContent>
        <div className='span-y-4'>
           <div>
             <Label className="mt-5 mb-3">Course Title</Label>
             <Input
              type='text'
              name='courseTitle'
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="ex. fullstack developer"
             />
           </div>
           <div>
             <Label className="mt-5 mb-3">Sub Title</Label>
             <Input
              type='text'
              name='subTitle'
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="ex. fullstack developer"
             />
           </div>
           <div>
           <Label className="mt-5 mb-3">Description</Label>
             {/* <Input
              type='text'
              name='description'
              value={input.description}
              onChange={changeEventHandler}
              placeholder="ex. fullstack developer"
             /> */}
             <JoditEditor
              ref={editor}
              value={description}
              onChange={newContent=>setDescription(newContent)}
             />
              {(course?.description || description) && (
        <div className="mt-6" >
          <div
            className="border p-4 rounded prose max-w-none"
            dangerouslySetInnerHTML={{ __html: course?.description || description }}
          />
        </div>
      )}
           </div>
           <div className='flex items-center gap-5'>
            <div>
            <Label className="mt-5 mb-3">Category</Label>
          <Select value={input.category} onValueChange={selectCategory}>
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
            <div>
              <Label className="mt-5 mb-3">Course Level</Label>
                        <Select value={input.courseLevel} onValueChange={selectCourse}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Course Level</SelectLabel>
                              <SelectItem value="Beginner">Beginner</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Advance">Advance</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
            </div>
            <div>
              <Label className="mt-5 mb-3">Price</Label>
              <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              placeholder="100"
              className="w-fit"
              />
            </div>
           </div>
           <div>
              <Label className="mt-5 mb-3">Course Thumbail</Label>
              <Input
               type="file"
               accepts="image/*"
               className="w-fit"
               onChange={selectFile}
              />
              {
                (image || input.courseThumbnail)   && (
                  <img src={image || input?.courseThumbnail} className='e-64 my-2'/>
                )
              }
            </div>
            <div className="mt-5 mb-3">
              <Button variant="outline" onClick={()=>navigate("/admin/course")} className="mr-2">Cancel</Button>
              <Button disabled={isLoading} onClick={updateCourseHandler}>
                {
                  isLoading ? (
                      <>
                       <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                      </>
                  ) :"Submit"
                }
              </Button>
            </div>
        </div>
    </CardContent>
    </Card>
  )
}
