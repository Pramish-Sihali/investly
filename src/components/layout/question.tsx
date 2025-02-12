"use client";

import React, { useState } from "react";
import axios from "axios";

const QuestionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle question submission
  const handleAskQuestion = async () => {
    if (!question.trim()) return; // Prevent empty questions
    setLoading(true);
    setAnswer("");

    try {
      const response = await axios.post("/api/ask-ai", { question });
      setAnswer(response.data.answer); // Set AI response
    } catch (error) {
      setAnswer("Error fetching response. Try again.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Question Button */}
      <button
        className="fixed bottom-4 right-4 bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300"
        onClick={() => setIsOpen(true)}
      >
        Questions?
      </button>

      {/* Modal for AI Chat */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-2">Ask a Question</h2>
            
            <textarea
              className="w-full border p-2 rounded-md"
              rows={3}
              placeholder="Type your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>

            <button
              className="bg-primary text-white px-4 py-2 rounded-md mt-2"
              onClick={handleAskQuestion}
              disabled={loading}
            >
              {loading ? "Asking..." : "Ask"}
            </button>

            {answer && (
              <p className="mt-4 p-2 bg-gray-100 rounded-md">{answer}</p>
            )}

            <button
              className="text-gray-500 mt-4 block mx-auto"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionButton;
