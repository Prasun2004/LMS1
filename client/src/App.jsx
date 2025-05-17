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
import SearchPage from './pages/student/SearchPage'
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoute'
import PurchaseCourseProtectedRoute from './components/PurchaseCourseProtected'
import { ThemeProvider } from './components/ThemeProvider'

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
          element:<AuthenticatedUser>
            <Login/>
          </AuthenticatedUser>
        },
        {
          path:"my-learing",
          element:<ProtectedRoute><MyLearing/></ProtectedRoute>
        },
        {
          path:"course/search",
          element:<ProtectedRoute><SearchPage/></ProtectedRoute>
        },
        {
          path:"profile",
          element:<ProtectedRoute>
            <Profile/>
            </ProtectedRoute>
        },
        {
          path:"course-details/:courseId",
          element:<ProtectedRoute><CourseDetails/></ProtectedRoute>
        },
        {
          path:"course-progress/:courseId",
          element:<ProtectedRoute>
            {/* <PurchaseCourseProtectedRoute> */}
               <CourseProgress/>
            {/* </PurchaseCourseProtectedRoute> */}
           </ProtectedRoute>
        },
        {
          path:"admin",
          element:<AdminRoute><Sidebar/></AdminRoute>,
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
      <ThemeProvider>
         <RouterProvider router={appRouter}/>
      </ThemeProvider>
    </main>
  )
}

export default App
