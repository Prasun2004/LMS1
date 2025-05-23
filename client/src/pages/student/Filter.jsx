import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'

const categories = [
  { id: "Next JS", label: "Next JS" },
  { id: "Data Science", label: "Data Science" },
  { id: "Frontend Development", label: "Frontend Development" },
  { id: "Fullstack Development", label: "Fullstack Development" },
  { id: "Mern Stack Development", label: "MERN Stack Development" },
  { id: "Backend Development", label: "Backend Development" },
  { id: "Javascript", label: "Javascript" },
  { id: "Python", label: "Python" },
  { id: "Docker", label: "Docker" },
  { id: "MongoDB", label: "MongoDB" },
  { id: "Html", label: "HTML" },
];

export default function Filter({handleFilterChange}) {

    const [selectedCategories,setSelectedCategories]=useState([]);
    const [sortByPrice,setSortByPrice]=useState("");

    const handleCategory=(categoryId)=>{
       setSelectedCategories( (prevCategories)=>{
         const newCategories = prevCategories.includes(categoryId) ? prevCategories.filter((id)=> id!==categoryId) : [...prevCategories,categoryId] ;
         handleFilterChange(newCategories,sortByPrice);
         return newCategories;
        }
       )
    };

    const selectByPriceHandler =(selectedvalue)=>{
        setSortByPrice(selectedvalue);
        handleFilterChange(selectedCategories,selectedvalue);
    }
  return (
    <div className='w-full md:w-[20%]'>
        <div className='flex-items-center justify-between'>
          <h1 className='font-semibold text-lg md:text-xl'>Filter option</h1>
          <Select onValueChange={selectByPriceHandler}>
            <SelectTrigger>
                <SelectValue placeholder="sort by"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Sort By Price</SelectLabel>
                <SelectItem value='low'>High to Low</SelectItem>
                <SelectItem value='high'>Low to High</SelectItem>
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
