import React, { useState, useEffect, useMemo } from 'react';
import type { VocabularyWord } from '../types';

interface MultipleChoiceQuizProps {
  words: VocabularyWord[];
  onBack: () => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({ words, onBack }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const QUIZ_LENGTH = 10;

  const generateQuestions = useMemo(() => {
     return () => {
        const shuffledWords = shuffleArray(words);
        const selectedWords = shuffledWords.slice(0, QUIZ_LENGTH);

        return selectedWords.map(correctWord => {
            const wrongOptions = shuffledWords
                .filter(w => w.romaji !== correctWord.romaji)
                .slice(0, 3)
                .map(w => w.indonesian);
            
            const options = shuffleArray([...wrongOptions, correctWord.indonesian]);
            
            return {
                question: correctWord.japanese,
                options,
                answer: correctWord.indonesian
            };
        });
     }
  }, [words]);

  useEffect(() => {
    setQuestions(generateQuestions());
  }, [generateQuestions]);

  const handleAnswer = (option: string) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(option);
    const correct = option === questions[currentQuestionIndex].answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      if (currentQuestionIndex < QUIZ_LENGTH - 1) {
        setCurrentQuestionIndex(i => i + 1);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setQuestions(generateQuestions());
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setIsFinished(false);
  };

  if (questions.length === 0) {
    return <div>Loading quiz...</div>;
  }

  if (isFinished) {
    return (
      <div className="text-center p-6 sm:p-8 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Kuis Selesai!</h2>
        <p className="text-lg sm:text-xl md:text-2xl text-cyan-400 mb-8">Skor Akhir Kamu: <span className="font-bold">{score} / {QUIZ_LENGTH}</span></p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={restartQuiz} className="w-full sm:w-auto bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
            Ulangi Kuis
            </button>
            <button onClick={onBack} className="w-full sm:w-auto bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
            Kembali
            </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const getButtonClass = (option: string) => {
    if (selectedAnswer === null) {
      return "bg-slate-700 hover:bg-slate-600";
    }
    if (option === currentQuestion.answer) {
      return "bg-green-600"; // Always show correct answer
    }
    if (option === selectedAnswer && !isCorrect) {
      return "bg-red-600"; // Show wrong selection
    }
    return "bg-slate-700 opacity-50";
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-slate-800 rounded-lg shadow-lg border border-slate-700 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-cyan-300">Pilihan Ganda</h2>
        <p className="text-lg font-semibold text-white">{currentQuestionIndex + 1} / {QUIZ_LENGTH}</p>
      </div>
      <div className="mb-8 text-center">
        <p className="text-sm sm:text-base text-slate-400 mb-2">Apa arti dari kata ini?</p>
        <p className="text-4xl sm:text-5xl font-bold text-white font-serif break-words">{currentQuestion.question}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            className={`w-full text-left p-4 rounded-lg text-white font-semibold transition-all duration-300 text-base sm:text-lg ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
       <div className="mt-8 text-center">
          <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors">
            Keluar dari Kuis
          </button>
        </div>
    </div>
  );
};

export default MultipleChoiceQuiz;