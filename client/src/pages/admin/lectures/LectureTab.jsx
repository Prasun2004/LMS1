import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation} from '@/features/api/courseApi'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function LectureTab() {

    const params=useParams();

    const {courseId,lectureId}=params;

    const [lectureTitle,setLectureTitle]=useState('');
    const [uploadInfo,setUploadInfo]=useState(null);
    const [isFree,setIsFree]=useState(false);
    const [mediaProgress,setMediaprogress]=useState(false);
    const [uploadProgress,setUploadProgress]=useState(0);
    const [btnDisable,setBtnDisable]=useState(true);

    const MEDIA_API="http://localhost:8080/media";


    const [editLecture,{data,isLoading,isSuccess,error}]=useEditLectureMutation();
    const [removeLecture,{isLoading:removeisLoading,isSuccess:removeisSuccess,error:removeError}]=useRemoveLectureMutation(lectureId);
    const {data:lectureData}=useGetLectureByIdQuery(lectureId);

    const lecture =lectureData?.lecture;

    useEffect(()=>{
        if (lecture) {
            setLectureTitle(lecture.lectureTitle);
            setIsFree(lecture.isPreviewFree);
            setUploadInfo(lecture.videoInfo);
        }
    },[lecture])
   console.log(data);
    const fileChangeHandler=async(e)=>{
        const file =e.target.files[0];
        if (file) {
            const formData=new FormData();
            formData.append("file",file);
            setMediaprogress(true);
            try {
                const res =await axios.post(`${MEDIA_API}/upload-video`,formData,{
                    onUploadProgress:({loaded,total})=>{
                        setUploadProgress(Math.round((loaded*100)/total));
                    }
                });
                if (res.data.success) {
                   console.log(res.data.success);
                    setUploadInfo({videoUrl:res.data.data.url,publicId:res.data.data.public_id});
                    setBtnDisable(false);
                    toast.success("video upload sucessful");
                }
            } catch (error) {
                //console.log(error);
                toast.error("video upload fail");
            }finally{
                setMediaprogress(false);
            }
        }
    }

    const editLectureHandler =async()=>{
        await editLecture({lectureTitle,videoInfo:uploadInfo,ispreviewFree:isFree,courseId,lectureId});

    }
   
    const removeLectureHandler =async()=>{
         await removeLecture(lectureId);
    }


    useEffect(()=>{
      if (isSuccess) {
      
        toast.success("edit successful");
      }
      if (removeisSuccess) {
        // console.log(removeisSuccess);
         toast.success("remove successful");
      }
      if (error) {
       // console.log(error);
        toast.error("fail to edit lecture");
      }
      if (removeError) {
        // console.log(removeError);
         toast.error("fail to remove");
      }
    },[isSuccess,error,removeError,removeisSuccess])

  return (
     <Card>
        <CardHeader>
            <div className='flex justify-between'>
                <CardTitle>Edit Lecture</CardTitle>
                <CardDescription>Make changes and click save</CardDescription>
            </div>
            <div className='flex items-center gap-2'>
                <Button variant='destructive' onClick={removeLectureHandler} disabled={removeisLoading}>
                   {
                    removeisLoading ? <>
                     <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                     please Wait
                    </> :"Remove Lecture"
                   }
                   </Button>
            </div>
        </CardHeader>
        <CardContent>
            <div>
                <Label className="mt-5 mb-3">Title</Label>
                 <Input
                 type='text'
                  placeholder="ex. Introduction"
                  value={lectureTitle}
                  onChange={e=>setLectureTitle(e.target.value)}
                 />
            </div>
            <div className='my-5'>
            <Label className="mt-5 mb-3">Video<span className='text-red-500'>*</span></Label>
                 <Input
                 type='file'
                 accept='video/*'
                  className='w-fit'
                  onChange={fileChangeHandler}
                 />
            </div>
            <div className='flex items-center space-x-2 my-5'>
            <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
            <Label htmlFor="airplane-mode">Is this Video Free</Label>
            </div>
            {
                mediaProgress && (
                    <div className='my-4'>
                        <Progress value={uploadProgress}/>
                      <p>{uploadProgress}% Uploaded</p>
                    </div>
                )
            }
            <div className='mt-4'>
               <Button onClick={editLectureHandler} disabled={isLoading}>
                {
                    isLoading ? <>
                     <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                    please Wait
                   </> :" Update Lecutre"
                }
               </Button>
            </div>
        </CardContent>
     </Card>
  )
}
