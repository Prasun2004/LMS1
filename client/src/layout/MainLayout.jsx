import Navbar from '@/components/Navbar.jsx'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <div className='flex-1 mt-16'>
            <Outlet/>
        </div>
    </div>
  )
}
