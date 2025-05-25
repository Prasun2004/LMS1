import { useChangeScoreMutation, useGetCourseProgressQuery, useGetScoreQuery } from "@/features/api/courseProgressApi.js";
import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

const quizQuestions = [
  {
    question: "1. What does CPU stand for?",
    options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Utility"],
    answer: "Central Processing Unit",
  },
  {
    question: "2. Which language is primarily used for web development?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML",
  },
  {
    question: "3. What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
    answer: "O(log n)",
  },
  {
    question: "4. Which protocol is used to send emails?",
    options: ["HTTP", "SMTP", "FTP", "SNMP"],
    answer: "SMTP",
  },
  {
    question: "5. Which data structure uses FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
  },
  {
    question: "6. What is an example of an operating system?",
    options: ["Intel", "Linux", "BIOS", "Oracle"],
    answer: "Linux",
  },
  {
    question: "7. Which one is a NoSQL database?",
    options: ["MySQL", "Oracle", "MongoDB", "PostgreSQL"],
    answer: "MongoDB",
  },
  {
    question: "8. What is the full form of URL?",
    options: ["Uniform Resource Locator", "Uniform Reference Link", "Universal Resource Link", "Unified Resource Locator"],
    answer: "Uniform Resource Locator",
  },
  {
    question: "9. Which gate gives output only when all inputs are 1?",
    options: ["OR", "AND", "XOR", "NOR"],
    answer: "AND",
  },
  {
    question: "10. What is the binary equivalent of decimal 10?",
    options: ["1010", "1100", "1001", "1111"],
    answer: "1010",
  }
];

export default function Game() {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
   const params =useParams();
  const navigate=useNavigate();
  const {courseId} = params;
  const [timeLeft, setTimeLeft] = useState(600); // 600 seconds = 10 minutes

 useEffect(() => {
  if (score !== null) return; // Stop the timer after submission

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        handleSubmitAuto(); // Auto submit
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer); // Cleanup
}, [score]);

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const handleSubmitAuto = async () => {
  let score = 0;
  quizQuestions.forEach((q, i) => {
    if (answers[i] === q.answer) score++;
  });
  await changeScore({ courseId, score });
  setScore(score);
};
   const [changeScore,{data, isSuccess,error}] =useChangeScoreMutation();
   const {data:scoredata,isLoading,isSuccess:ScoreSucess,isError} =useGetScoreQuery(courseId);
  
   console.log(scoredata);
   console.log(data,isSuccess);
  const handleOptionChange = (qIndex, selectedOption) => {
    setAnswers({ ...answers, [qIndex]: selectedOption });
  };

 
  const handleSubmit = async(e) => {
    e.preventDefault();
    let score = 0;
    quizQuestions.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });
      console.log(score);
      await changeScore({courseId,score});

    setScore(score);
   // setAnswers({});
   
  };
  
  const handleCertificateClick =(e)=>{
      e.preventDefault();
     navigate(`/course-progress/${courseId}/cirtificate`);
  }

  console.log(score);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
        You have to pass at least 80%
      </h1>
      <div className="text-center text-xl font-bold text-blue-700">
  Time Left: {formatTime(timeLeft)}
</div>


      <form className="space-y-8">
        {quizQuestions.map((q, index) => (
          <div key={index}>
            <h2 className="font-semibold mb-2">{q.question}</h2>
            <div className="space-y-1">
              {q.options.map((option, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleOptionChange(index, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
        >
          Submit
        </button>

        {score !== null && (
          <div className="mt-4 text-xl text-center font-semibold">
            You scored {score} / {quizQuestions.length} -{" "}
            {score >= 8 ? (
              <span className="text-green-600">Pass ✅</span>
            ) : (
              <span className="text-red-600">Fail ❌</span>
            )}
          </div>
        )}
         {(score >= 8 || scoredata?.courseProgress?.pass)  && (
          <div className="mt-6 text-center">
            <button
              onClick={handleCertificateClick}
              className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
            >
              Get Certificate
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
