import { useGetCourseDetailsWithStatusQuery } from "@/features/api/purchaseApi";
import { useParams, Navigate } from "react-router-dom" ;


const PurchaseCourseProtectedRoute=({Children})=>{
    const {courseId} =useParams();
    const {data,isLoading}=useGetCourseDetailsWithStatusQuery(courseId);

    if (isLoading) {
        return <p>Loading....</p>
    }
    return data?.purchased ? Children : <Navigate to={`/course-details/${courseId}`}/> 
}

export default PurchaseCourseProtectedRoute;