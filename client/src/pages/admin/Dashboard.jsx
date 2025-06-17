import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetPublishedCourseQuery } from '@/features/api/courseApi'
import { useGetPurchaseCourseQuery } from '@/features/api/purchaseApi'
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);

   useEffect(() => {
    // Check on load
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));

    checkDark();

    // Optional: Listen for theme change
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const textColor = isDark ? "#ffffff" : "#1f2937"; // white or slate-800
  const gridColor = isDark ? "#4b5563" : "#e0e0e0";  // gray-600 or light grid
  const lineColor = "#4a90e2";

  const {data,isSuccess,isError,isLoading}=useGetPurchaseCourseQuery();

  if (isLoading) {
     return <h1>Loading...</h1>
  }

  if (isError) {
    return <h1 className='text-red-500'>Fail to get Purchase Course</h1>
  }
  
  
  const {purchasedCourse} =data || [];

  const courseData =purchasedCourse.map((course)=>({
    name:course.courseId.courseTitle,
    price:course.courseId.coursePrice
  }))
  
  const totalRevenue = purchasedCourse.reduce((acc,element) => acc+(element.amount || 0), 0);

  const totalSales = purchasedCourse.length;
  return (
    <div className=' grid gap-6 grid-cols-1 sm:grid-cls-2 sm:grid-cols-3 lg:grid-cols-4'>
      <Card className='shadow-lg hover:-xl transition-shadow duration-300'>
        <CardHeader>
            Totals Sales
        </CardHeader>
        <CardContent>
          <p className='text-3xl font-bold text-blue-600'>{totalSales}</p>
        </CardContent>
      </Card>
      <Card className='shadow-lg hover:-xl transition-shadow duration-300'>
        <CardHeader>
            Totals Renuve
        </CardHeader>
        <CardContent>
          <p className='text-3xl font-bold text-blue-600'>{totalRevenue}</p>
        </CardContent>
      </Card>
      {/* Course Prices Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700 dark:text-white">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
      <LineChart data={courseData}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="name"
          stroke={textColor}
          angle={-30}
          textAnchor="end"
          interval={0}
        />
        <YAxis stroke={textColor} />
        <Tooltip
          contentStyle={{ backgroundColor: isDark ? "#1f2937" : "#ffffff", color: textColor }}
          formatter={(value, name) => [`₹${value}`, name]}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke={lineColor}
          strokeWidth={3}
          dot={{ stroke: lineColor, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
