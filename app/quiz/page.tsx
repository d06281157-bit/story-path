'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { questions, Dimension } from '@/lib/quizData';
import { ChevronLeft } from 'lucide-react';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<Dimension, number>>({
    OldStreet: 0,
    Nature: 0,
    Culture: 0,
    Lifestyle: 0,
  });

  const question = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionClick = (value: Dimension) => {
    const newScores = { ...scores, [value]: scores[value] + 1 };
    setScores(newScores);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Encode scores to URL search params to pass to result page
      const searchParams = new URLSearchParams();
      Object.entries(newScores).forEach(([key, value]) => {
        searchParams.append(key, value.toString());
      });
      router.push(`/result?${searchParams.toString()}`);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FFF9F2] animate-fade-in relative max-w-2xl mx-auto w-full bg-white/50 rounded-3xl shadow-sm my-4 md:my-10 border border-white overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
        <div
          className="h-full bg-terracotta transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center p-6 pt-8">
        <p className="text-xs text-gray-500 tracking-widest">問題 {currentQuestionIndex + 1} / {questions.length}</p>
        <p className="text-xs text-gray-400">{Math.round(progress)}%</p>
      </div>

      {/* Question */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <h2 className="text-xl font-bold text-[#2C2C2C] leading-normal mb-6 text-center">
          {question.questionText}
        </h2>

        <div className="rounded-2xl overflow-hidden mb-6 shadow-sm border border-gray-100">
          <Image
            src={`/Quiz-${currentQuestionIndex + 1}.png`}
            alt={`Quiz Question ${currentQuestionIndex + 1}`}
            width={600}
            height={400}
            className="w-full h-auto object-contain bg-white"
            priority
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option.value)}
              className="bg-white p-4 rounded-xl shadow-sm border border-transparent hover:border-terracotta/30 hover:shadow-md transition-all text-left group"
            >
              <p className="text-gray-700 text-sm leading-relaxed group-hover:text-terracotta transition-colors">
                {option.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-400 hover:text-gray-600 transition-colors text-sm px-4 py-2 rounded-full border border-gray-300"
        >
          <ChevronLeft size={16} className="mr-1" />
          返回 BACK
        </button>
      </div>
    </div>
  );
}
