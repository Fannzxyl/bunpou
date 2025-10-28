import React, { useEffect, useMemo, useState } from 'react';
import type { VocabularyWord } from '../types';

interface MultipleChoiceQuizProps {
  words: VocabularyWord[];
  onBack: () => void;
}

interface MultipleChoiceQuestion {
  question: string;
  options: string[];
  answer: string;
}

const QUIZ_LENGTH = 10;

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({ words, onBack }) => {
  const [questions, setQuestions] = useState<MultipleChoiceQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const generateQuestions = useMemo(() => {
    return () => {
      const shuffledWords = shuffleArray(words);
      const selectedWords = shuffledWords.slice(0, QUIZ_LENGTH);

      return selectedWords.map((correctWord) => {
        const wrongOptions = shuffleArray(
          shuffledWords.filter((w) => w.romaji !== correctWord.romaji)
        )
          .slice(0, 3)
          .map((w) => w.indonesian);

        const options = shuffleArray([...wrongOptions, correctWord.indonesian]);

        return {
          question: correctWord.japanese,
          options,
          answer: correctWord.indonesian,
        };
      });
    };
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
      setScore((value) => value + 1);
    }

    window.setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);

      if (currentQuestionIndex < QUIZ_LENGTH - 1) {
        setCurrentQuestionIndex((index) => index + 1);
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
    return (
      <div className="rounded-3xl border border-slate-800/70 bg-slate-950/70 p-8 text-center text-slate-300 shadow-lg shadow-slate-950/30">
        Membuat soal pilihan ganda...
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="space-y-6 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 text-center shadow-lg shadow-slate-950/30 sm:p-8">
        <h2 className="text-3xl font-semibold text-white">Bagus! Sesi selesai!</h2>
        <p className="text-lg text-cyan-300">
          Skor kamu <span className="font-bold text-white">{score}</span> dari {QUIZ_LENGTH} pertanyaan.
        </p>
        <p className="text-sm text-slate-400">
          Ulangi dengan kosakata berbeda atau lanjutkan ke mode kuis lain untuk memperkuat memori.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={restartQuiz}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:shadow-2xl"
          >
            Mainkan Lagi
          </button>
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-slate-700/70 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-sky-500/40 hover:text-white"
          >
            Kembali ke menu kuis
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = Math.round((currentQuestionIndex / QUIZ_LENGTH) * 100);

  const getButtonClass = (option: string) => {
    if (selectedAnswer === null) {
      return 'border-slate-800/70 bg-slate-950/80 text-slate-100 hover:border-sky-500/40 hover:bg-slate-900/80';
    }

    if (option === currentQuestion.answer) {
      return 'border-emerald-400/80 bg-emerald-500/90 text-slate-950 shadow-lg shadow-emerald-500/30';
    }

    if (option === selectedAnswer && !isCorrect) {
      return 'border-rose-500/70 bg-rose-500/80 text-slate-100 shadow-lg shadow-rose-500/20';
    }

    return 'border-slate-800/60 bg-slate-950/60 text-slate-500';
  };

  return (
    <div className="space-y-8 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 shadow-lg shadow-slate-950/30 sm:p-8">
      <header className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">Pilihan Ganda</span>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Pertanyaan {currentQuestionIndex + 1} dari {QUIZ_LENGTH}
            </h2>
          </div>
          <p className="text-sm text-slate-400">
            Skor sementara: <span className="font-semibold text-cyan-300">{score}</span>
          </p>
        </div>
        <div className="relative h-2 overflow-hidden rounded-full bg-slate-800/60">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Apa arti kata berikut?</p>
        <p className="font-mono text-4xl font-semibold text-white sm:text-5xl">{currentQuestion.question}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            className={`w-full rounded-xl border px-5 py-4 text-left text-base font-semibold shadow-sm transition ${getButtonClass(
              option
            )}`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold text-slate-400 transition hover:text-white"
        >
          Kembali ke menu kuis
        </button>
      </div>
    </div>
  );
};

export default MultipleChoiceQuiz;
