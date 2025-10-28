import React, { useState } from 'react';
import MultipleChoiceQuiz from './MultipleChoiceQuiz';
import MatchingGame from './MatchingGame';
import FillInTheBlankQuiz from './FillInTheBlankQuiz';
import { vocabularyData } from '../data/vocabulary';

type QuizType = 'multiple-choice' | 'matching-game' | 'fill-in-the-blank' | null;

const QuizView: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType>(null);

  const startQuiz = (quizType: QuizType) => {
    setSelectedQuiz(quizType);
  };

  const resetQuizSelection = () => {
    setSelectedQuiz(null);
  };

  if (selectedQuiz === 'multiple-choice') {
    return <MultipleChoiceQuiz words={vocabularyData} onBack={resetQuizSelection} />;
  }

  if (selectedQuiz === 'matching-game') {
    return <MatchingGame words={vocabularyData} onBack={resetQuizSelection} />;
  }

  if (selectedQuiz === 'fill-in-the-blank') {
    return <FillInTheBlankQuiz onBack={resetQuizSelection} />;
  }

  return (
    <div className="text-center p-8 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
      <h2 className="text-3xl font-bold text-white mb-4">Pilih Mode Kuis</h2>
      <p className="text-slate-400 mb-8">Uji pemahaman kosakatamu dengan permainan seru!</p>
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6">
        <button
          onClick={() => startQuiz('multiple-choice')}
          className="w-full md:w-64 bg-sky-600 hover:bg-sky-500 text-white font-bold py-4 px-6 rounded-lg transition-transform transform hover:scale-105"
        >
          Pilihan Ganda
        </button>
        <button
          onClick={() => startQuiz('matching-game')}
          className="w-full md:w-64 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-6 rounded-lg transition-transform transform hover:scale-105"
        >
          Mencocokkan Kata
        </button>
        <button
          onClick={() => startQuiz('fill-in-the-blank')}
          className="w-full md:w-64 bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 px-6 rounded-lg transition-transform transform hover:scale-105"
        >
          Lengkapi Kalimat
        </button>
      </div>
    </div>
  );
};

export default QuizView;
