import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Login } from './pages/Login'
import Navbar from './components/Navbar'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Coures'
import MyLearing from './pages/student/MyLearing'
import Profile from './pages/student/Profile'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import AddCourse from './pages/admin/course/AddCourse'
import CourseTable from './pages/admin/course/CourseTable'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lectures/CreateLecture'
import Editlecture from './pages/admin/lectures/Editlecture'
import CourseDetails from './pages/student/CourseDetails'
import CourseProgress from './pages/student/CourseProgress'

function App() {
  const appRouter=createBrowserRouter([
    {
      path:"/",
      element:<MainLayout/>,
      children:[
        {
          path:"/",
          element:(
          <>
           <HeroSection/>
           <Courses/>
          </>
          ),
        },
        {
          path:"login",
          element:<Login/>
        },
        {
          path:"my-learing",
          element:<MyLearing/>
        },
        {
          path:"profile",
          element:<Profile/>
        },
        {
          path:"course-details/:courseId",
          element:<CourseDetails/>
        },
        {
          path:"course-progress/:courseId",
          element:<CourseProgress/>
        },
        {
          path:"admin",
          element:<Sidebar/>,
          children:[
            {
            path:"dashboard",
            element:<Dashboard/>
            },
            {
              path:"course",
              element:<CourseTable/>
            },
            {
              path:"course/create",
              element:<AddCourse/>
            },
            {
              path:"course/:courseId",
              element:<EditCourse/>
            },
            {
              path:"course/:courseId/lecture",
              element:<CreateLecture/>
            },
            {
              path:"course/:courseId/lecture/:lectureId",
              element:<Editlecture/>
            }
          ],
        }
      ],
      
    },
  ]);
 
  return (
    <main>
       <RouterProvider router={appRouter}/>
    </main>
  )
}

export default App
