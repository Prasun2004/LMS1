import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

export const  ProtectedRoute =({children}) =>{
   const {isAuthenticated} =useSelector(store=>store.auth);

   if (!isAuthenticated) {
      return <Navigate to="/login"/>
   }

   return children;
}

export const  AuthenticatedUser =({children}) =>{
   const {user,isAuthenticated} =useSelector(store=>store.auth);
   
   if (isAuthenticated) {
      toast.success(`welcome back ${user?.name}`);
       
      return <Navigate to="/"/>
   }

   return children;
}

export const  AdminRoute =({children})=>{
    const {user,isAuthenticated} =useSelector(store=>store.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login"/>
    }

    if (user?.role !== "instructor") {
        return <Navigate to="/"/>
    }
    return children;

}

