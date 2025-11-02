"use client";
import { useEffect, useState } from "react";

interface Question {
  _id: string;
  question: string;
  options: string[];
  answer: string;
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetch("/api/questions")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">Practice Questions</h1>

      {questions.map((q, i) => (
        <div key={q._id} className="border p-4 rounded mb-4">
          <p className="font-semibold">{i+1}. {q.question}</p>
          {q.options.map((op, index) => (
            <button 
              key={index}
              className="block w-full text-left p-2 border rounded mt-2 hover:bg-gray-100"
              onClick={() => alert(q.answer === op ? "✅ Correct!" : "❌ Wrong")}
            >
              {op}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
