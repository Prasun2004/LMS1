import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useCreateCheechoutSessionMutation } from '@/features/api/purchaseApi'
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function BuyCourseButton({courseId}) {
  const [ createCheechoutSession,{data,isSuccess,isError,error,isLoading,}] =useCreateCheechoutSessionMutation();

  useEffect(()=>{
    if (isSuccess) {
      //console.log(isSuccess);
      toast.success("successful");
      if (data?.url) {
         window.location.href=data.url
      }else{
        toast.error("invalid response from server");
      }
    }
    if (isError) {
     //  console.log(isError);
       toast.error("fail to create checkout");
    }
    
  },[data,isSuccess,isError,error]);

 // console.log(data);

  const purchaseCourseHandler = async ()=>{
  //  console.log(courseId);
    await createCheechoutSession(courseId)
  }
  return (
        <Button disabled={isLoading} className='w-full' onClick={purchaseCourseHandler}>
            {
              isLoading ? (
                <>
                 <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                </>
              ) :"Purchase Course"
            }
        </Button>
  )
}
