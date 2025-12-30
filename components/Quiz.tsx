
import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { fetchQuestions } from '../services/geminiService';
import { FALLBACK_QUESTIONS } from '../constants';

interface QuizProps {
  level: number;
  onCorrect: () => void;
  onClose: () => void;
}

const Quiz: React.FC<QuizProps> = ({ level, onCorrect, onClose }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      const data = await fetchQuestions(level);
      if (data && data.length > 0) {
        setQuestions(data);
      } else {
        // Shuffle fallback questions
        setQuestions([...FALLBACK_QUESTIONS].sort(() => Math.random() - 0.5));
      }
      setLoading(false);
    };
    loadQuestions();
  }, [level]);

  const handleAnswer = (index: number) => {
    if (feedback) return;

    if (index === questions[currentIndex].correctIndex) {
      setFeedback('correct');
      setTimeout(() => {
        onCorrect();
        setFeedback(null);
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          // Re-load more if finished batch
          loadQuestions();
        }
      }, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const loadQuestions = async () => {
    setLoading(true);
    const data = await fetchQuestions(level);
    setQuestions(data.length > 0 ? data : [...FALLBACK_QUESTIONS].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-kids text-blue-600">Generating fun questions...</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="fixed inset-0 bg-blue-50 z-50 flex flex-col items-center justify-center p-4">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-3xl font-bold"
      >
        ✕
      </button>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            {currentQ.category}
          </span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-kids text-gray-800 mb-8">
          {currentQ.text}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {currentQ.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={!!feedback}
              className={`
                p-4 text-xl font-bold rounded-2xl border-b-4 transition-all
                ${feedback === 'correct' && idx === currentQ.correctIndex 
                  ? 'bg-green-500 text-white border-green-700 animate-bounce' 
                  : feedback === 'wrong' && idx !== currentQ.correctIndex
                  ? 'bg-gray-100 text-gray-400 border-gray-200 opacity-50'
                  : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50 active:translate-y-1 active:border-b-0'
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {feedback === 'wrong' && (
          <p className="mt-4 text-red-500 font-bold animate-pulse text-lg">Oops! Try again! 💡</p>
        )}
        {feedback === 'correct' && (
          <p className="mt-4 text-green-500 font-bold animate-pulse text-lg">Great Job! ⭐</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
