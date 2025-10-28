import React, { FormEvent, useMemo, useState } from 'react';
import type { VocabularyWord } from '../types';
import { useTranslation } from '../src/i18n';

interface TypingDrillProps {
  words: VocabularyWord[];
  onBack: () => void;
}

const PROMPT_LENGTH = 10;

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const TypingDrill: React.FC<TypingDrillProps> = ({ words, onBack }) => {
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
  const typingCopy = get<{
    title: string;
    instruction: string;
    placeholder: string;
    correct: string;
    check: string;
    incorrect: string;
    finishedTitle: string;
    finishedSummary: string;
  }>('typing');

  const prompts = useMemo(() => shuffleArray(words).slice(0, PROMPT_LENGTH), [words]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentPrompt = prompts[currentIndex];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentPrompt) {
      return;
    }

    const trimmed = inputValue.trim().toLowerCase();
    const target = currentPrompt.indonesian.trim().toLowerCase();

    if (trimmed === target) {
      setFeedback('correct');
      setScore((value) => value + 1);
      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= prompts.length) {
          setIsFinished(true);
        } else {
          setCurrentIndex(nextIndex);
          setInputValue('');
          setFeedback(null);
        }
      }, 800);
    } else {
      setFeedback('incorrect');
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setInputValue('');
    setFeedback(null);
    setScore(0);
    setIsFinished(false);
  };

  if (!currentPrompt && !isFinished) {
    return (
      <div className="rounded-3xl border border-soft bg-surface-soft p-8 text-center text-muted shadow-soft">
        {quizCommon.loading.typing}
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="space-y-6 rounded-3xl border border-soft bg-surface-soft p-6 text-center text-primary shadow-soft sm:p-8">
        <h2 className="text-3xl font-semibold text-strong">{typingCopy.finishedTitle}</h2>
        <p className="text-lg text-strong">{t('typing.finishedSummary', { score, total: prompts.length })}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={restart}
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

  return (
    <section className="space-y-6 rounded-3xl border border-soft bg-surface-soft p-6 text-primary shadow-soft sm:p-8">
      <header className="space-y-3 text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.38em] text-muted">{typingCopy.title}</span>
        <h2 className="text-2xl font-semibold text-strong sm:text-3xl">
          {t('quizCommon.progressPrefix', { current: currentIndex + 1, total: prompts.length })}
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{typingCopy.instruction}</p>
      </header>

      <div className="glass-panel flex flex-col items-center gap-4 rounded-3xl p-8 text-center">
        <p className="font-mono text-3xl font-semibold text-strong sm:text-4xl">{currentPrompt?.japanese}</p>
        <p className="text-sm text-muted">{currentPrompt?.romaji}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder={typingCopy.placeholder}
          className="w-full rounded-2xl border border-soft bg-surface px-6 py-3 text-primary placeholder:text-muted focus:border-strong focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
        />
        {feedback && (
          <p
            className={`text-sm font-semibold ${
              feedback === 'correct' ? 'text-strong' : 'text-muted'
            }`}
          >
            {feedback === 'correct' ? typingCopy.correct : typingCopy.incorrect}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-inverse shadow-soft transition hover:opacity-95"
          >
            {typingCopy.check}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-semibold text-muted transition hover:text-primary"
          >
            {quizCommon.backToMenu}
          </button>
        </div>
      </form>
    </section>
  );
};

export default TypingDrill;




