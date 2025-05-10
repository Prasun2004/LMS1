import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const categories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "fullstack development", label: "Fullstack Development" },
  { id: "mern stack development", label: "MERN Stack Development" },
  { id: "backend development", label: "Backend Development" },
  { id: "javascript", label: "Javascript" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
];

export default function Filter() {

    const handleCategory=(categoryId)=>{

    }
  return (
    <div className='w-full md:w-[20%]'>
        <div className='flex-items-center justify-between'>
          <h1 className='font-semibold text-lg md:text-xl'>Filter option</h1>
          <Select>
            <SelectTrigger>
                <SelectValue placeholder="sort by"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Sort By Price</SelectLabel>
                <SelectItem value='low'>Low to High</SelectItem>
                <SelectItem value='high'>High to Low</SelectItem>
                </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Separator className='my-4'/>
        <div>
         <h1 className='font-semibold mb-2'>CATEGORY</h1> 
            {
                categories.map((cattegory)=>(
                    <div className='flex items-center space-x-2 my-2'>
                      <Checkbox id={cattegory.id} onCheckedChange={()=>handleCategory(cattegory.id)}/>
      <Label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
       {cattegory.label}
      </Label>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
