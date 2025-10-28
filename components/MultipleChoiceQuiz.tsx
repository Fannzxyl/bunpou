import React, { useEffect, useMemo, useState } from 'react';
import type { VocabularyWord } from '../types';
import { useTranslation } from '../src/i18n';

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
  const { t, get } = useTranslation();
  const quizCommon = get<{
    loading: {
      multipleChoice: string;
      matching: string;
      fillBlank: string;
      flashcards: string;
      typing: string;
    };
    backToMenu: string;
    restart: string;
    scorePrefix: string;
    progressPrefix: string;
  }>('quizCommon');
  const mcCopy = get<{
    badge: string;
    finishedTitle: string;
    finishedSummary: string;
    prompt: string;
    instruction: string;
  }>('multipleChoice');

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
      <div className="rounded-3xl border border-soft bg-surface-soft p-8 text-center text-muted shadow-soft">
        {quizCommon.loading.multipleChoice}
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="space-y-6 rounded-3xl border border-soft bg-surface-soft p-6 text-center text-primary shadow-soft sm:p-8">
        <h2 className="text-3xl font-semibold text-strong">{mcCopy.finishedTitle}</h2>
        <p className="text-lg text-strong">
          {t('multipleChoice.finishedSummary', { score, total: QUIZ_LENGTH })}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={restartQuiz}
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-inverse shadow-soft transition hover:opacity-95"
          >
            {quizCommon.restart}
          </button>
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-soft px-6 py-3 text-sm font-semibold text-muted transition hover:border-strong hover:text-primary"
          >
            {quizCommon.backToMenu}
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = Math.round((currentQuestionIndex / QUIZ_LENGTH) * 100);

  const getButtonClass = (option: string) => {
    if (selectedAnswer === null) {
      return 'border border-soft bg-surface text-primary hover:border-strong hover:bg-surface-soft';
    }

    if (option === currentQuestion.answer) {
      return 'border border-emerald-400 bg-emerald-400/90 text-inverse shadow-soft';
    }

    if (option === selectedAnswer && !isCorrect) {
      return 'border border-rose-500 bg-rose-500/80 text-inverse shadow-soft';
    }

    return 'border border-soft bg-surface-soft text-muted';
  };

  return (
    <div className="space-y-8 rounded-3xl border border-soft bg-surface-soft p-6 text-primary shadow-soft sm:p-8">
      <header className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.38em] text-muted">{mcCopy.badge}</span>
            <h2 className="text-2xl font-semibold text-strong sm:text-3xl">
              {t('quizCommon.progressPrefix', { current: currentQuestionIndex + 1, total: QUIZ_LENGTH })}
            </h2>
          </div>
          <p className="text-sm text-muted">
            {quizCommon.scorePrefix}:{' '}
            <span className="font-semibold text-strong">{score}</span>
          </p>
        </div>
        <div className="relative h-2 overflow-hidden rounded-full bg-surface">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent-soft))' }}
          />
        </div>
      </header>

      <div className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">{mcCopy.prompt}</p>
        <p className="text-xs text-muted">{mcCopy.instruction}</p>
        <p className="font-mono text-4xl font-semibold text-strong sm:text-5xl">{currentQuestion.question}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            className={`w-full rounded-xl px-5 py-4 text-left text-base font-semibold transition ${getButtonClass(
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
          className="text-sm font-semibold text-muted transition hover:text-primary"
        >
          {quizCommon.backToMenu}
        </button>
      </div>
    </div>
  );
};

export default MultipleChoiceQuiz;
