import React, { useState } from 'react';
import MultipleChoiceQuiz from './MultipleChoiceQuiz';
import MatchingGame from './MatchingGame';
import FillInTheBlankQuiz from './FillInTheBlankQuiz';
import FlashcardDrill from './FlashcardDrill';
import TypingDrill from './TypingDrill';
import { vocabularyData } from '../data/vocabulary';
import { useTranslation } from '../src/i18n';

type QuizType = 'multiple-choice' | 'matching-game' | 'fill-in-the-blank' | 'flashcards' | 'typing-drill' | null;
type QuizMode = { id: Exclude<QuizType, null>; title: string; description: string; gradient: string };

const QuizView: React.FC = () => {
  const { get } = useTranslation();
  const quizCopy = get<{ heading: string; description: string; footnote: string; ctaLabel: string; modes: QuizMode[] }>(
    'quizMenu'
  );
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType>(null);

  const handleStartQuiz = (quizType: Exclude<QuizType, null>) => {
    setSelectedQuiz(quizType);
  };

  const handleBackToMenu = () => {
    setSelectedQuiz(null);
  };

  if (selectedQuiz === 'multiple-choice') {
    return <MultipleChoiceQuiz words={vocabularyData} onBack={handleBackToMenu} />;
  }

  if (selectedQuiz === 'matching-game') {
    return <MatchingGame words={vocabularyData} onBack={handleBackToMenu} />;
  }

  if (selectedQuiz === 'fill-in-the-blank') {
    return <FillInTheBlankQuiz onBack={handleBackToMenu} />;
  }

  if (selectedQuiz === 'flashcards') {
    return <FlashcardDrill words={vocabularyData} onBack={handleBackToMenu} />;
  }

  if (selectedQuiz === 'typing-drill') {
    return <TypingDrill words={vocabularyData} onBack={handleBackToMenu} />;
  }

  return (
    <section className="space-y-6 rounded-3xl border border-soft bg-surface-soft p-6 text-primary shadow-soft sm:p-8">
      <header className="space-y-3 text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.38em] text-muted">Quiz Hub</span>
        <h2 className="text-2xl font-semibold text-strong sm:text-3xl">{quizCopy.heading}</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{quizCopy.description}</p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {quizCopy.modes.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleStartQuiz(option.id)}
            className="group relative overflow-hidden rounded-3xl border border-soft bg-surface p-6 text-left text-primary transition-all duration-500 hover:-translate-y-1 hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2"
          >
            <div
              className={`absolute inset-0 -z-10 bg-gradient-to-br ${option.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-70`}
            />
            <div className="flex h-full flex-col gap-4">
              <div>
                <h3 className="text-lg font-semibold text-strong">{option.title}</h3>
                <p className="mt-2 text-sm text-muted">{option.description}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
                {quizCopy.ctaLabel}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>
      <footer className="rounded-2xl border border-soft bg-surface px-5 py-4 text-sm text-muted">
        {quizCopy.footnote}
      </footer>
    </section>
  );
};

export default QuizView;
