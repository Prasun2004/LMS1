import { Edit } from 'lucide-react'
import React from 'react'
import { useNavigate,useParams } from 'react-router-dom'


export default function Lecture({lecture,courseId,index}) {
   
   
   
    const navigate=useNavigate();
    const goToUpdateLecture = async()=>{
         navigate(`${lecture._id}`)
    }
  return (
    <div className='flex items-center justify-between bg-[#F7F9FA] dark:bg[#1F1F1F] px-4 py-2 rounded-md my-2'>
       <h1 className='font-bold text-gray-800  dark:text-black'>Lecture - {index+1}:{lecture.lectureTitle}</h1>
       <Edit size={20} onClick={goToUpdateLecture}
       className='cursor-pointer text-gray-600 dark:text-black hover:text-blue-600 dark:hover:text-blue-400'/>
    </div>
  )
}
