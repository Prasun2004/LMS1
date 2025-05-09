import { Button } from '@/components/ui/button'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import { useGetCreatorCourseQuery } from '@/features/api/courseApi';
import { Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function CourseTable() {

    const navigate =useNavigate();
    const {data,isLoading}=useGetCreatorCourseQuery();
    
    if (isLoading) {
      return <h1>Loading .....</h1>
    }
    
    console.log(data);
   
       
  return (
    <div>
        <Button onClick={()=>navigate(`create`)}>Add Course</Button>
        <Table>
      <TableCaption>A list of your recent Course</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.course.map((course) => (
          <TableRow key={course._id}>
            <TableCell className="font-medium">{course?.coursePrice || "NA"}</TableCell>
            <TableCell>
              <Badge>
              {course?.isPublish ? "Publish" :"draft"}
              </Badge>
              </TableCell>
            <TableCell>{course.courseTitle}</TableCell>
            <TableCell className="text-right">
              <Button size='sm' variant='ghost' onClick={()=>navigate(`${course._id}`)}>
                <Edit/>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}
