import { useGetCourseDetailsWithStatusQuery } from "@/features/api/purchaseApi";
import CourseProgress from "@/pages/student/CourseProgress";
import { useParams, Navigate } from "react-router-dom" ;


const PurchaseCourseProtectedRoute=({Children})=>{
    const {courseId} =useParams();
    const {data,isLoading}=useGetCourseDetailsWithStatusQuery(courseId);
    console.log(data);
    if (isLoading) {
        return <p>Loading....</p>
    }
    return data?.purchased ? <CourseProgress/> : <Navigate to={`/course-details/${courseId}`}/> 
}

export default PurchaseCourseProtectedRoute;