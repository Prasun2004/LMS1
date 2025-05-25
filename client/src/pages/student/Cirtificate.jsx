import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useGetCourseProgressQuery } from '@/features/api/courseProgressApi';
import { useParams } from 'react-router-dom';

export default function CertificateViewer() {
  const params=useParams();
  const courseId=params.courseId;
  const {user}=useSelector(store =>store.auth); 
   
  const {data,isLoading,isError,refetch} = useGetCourseProgressQuery(courseId);

  const [username, setUsername] = useState(user.name);
 // const [course, setCourse] = useState();
  const course =data?.data?.courseDetails?.courseTitle;
  console.log(data,course);
  const [downloadUrl, setDownloadUrl] = useState('');
  const handleGenerate = async () => {
    const res = await axios.post('http://localhost:8080/certificate/generate', {
      username,
      course,
    });
    setDownloadUrl(res.data.downloadUrl);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-xl bg-white text-center">
      <h1 className="text-2xl font-bold mb-4">Generate Certificate</h1>
      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate Certificate
      </button>

      {downloadUrl && (
        <div className="mt-5">
          <a
            href={`http://localhost:8080${downloadUrl}`}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Certificate
          </a>
        </div>
      )}
    </div>
  );
}
