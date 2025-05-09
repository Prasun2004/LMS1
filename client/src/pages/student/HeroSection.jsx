import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

export default function HeroSection() {
  return (
    <div className='bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center'>
     <div className='max-w 3xl mx-auto'>
       <h1 className='text-white text-4xl font-bold mb-4'>Find the best course</h1>
       <p className='text-gray-200 dark:text-gray-400 mb-8'>ygjukl;ojiuygtguiophgjkopkiuygfgthujiokpkiuhgyfhjuiophgu</p>
       <form action="" className='flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w xl mx-auto mb-6'>
        <Input
         type="text"
         placeholder="search course"
         className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder:geay-400 dark:placeholder-gray-500"
        />
        <Button className='bg-gray-600 dark:bg-gray-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:bg-blue-800'>
          Search
        </Button>
       </form>
       <Button className="bg-white dark:bg-gray-800 text-blue-800 rounded-full hover:gray-200"> Explore</Button>
     </div>
    </div>
  )
}
