import React, { useMemo, useState } from 'react';
import type { VocabularyWord } from '../types';
import { useTranslation } from '../src/i18n';

interface FlashcardDrillProps {
  words: VocabularyWord[];
  onBack: () => void;
}

const CARD_LENGTH = 12;

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const FlashcardDrill: React.FC<FlashcardDrillProps> = ({ words, onBack }) => {
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
  const flashCopy = get<{
    title: string;
    instruction: string;
    reveal: string;
    next: string;
    previous: string;
    remembered: string;
    retry: string;
    finishedTitle: string;
    finishedSummary: string;
  }>('flashcards');

  const [shuffleSeed, setShuffleSeed] = useState(0);
  const cards = useMemo(() => shuffleArray(words).slice(0, CARD_LENGTH), [words, shuffleSeed]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [results, setResults] = useState<Record<string, 'remembered' | 'retry'>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentCard = cards[currentIndex];

  const handleReveal = () => {
    setShowMeaning(true);
  };

  const handleMark = (status: 'remembered' | 'retry') => {
    if (!currentCard) {
      return;
    }

    const updatedResults = { ...results, [currentCard.romaji]: status };
    setResults(updatedResults);

    if (currentIndex === cards.length - 1) {
      setIsFinished(true);
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    const nextCard = cards[nextIndex];
    setShowMeaning(Boolean(nextCard && updatedResults[nextCard.romaji]));
  };

  const handlePrevious = () => {
    if (currentIndex === 0) {
      return;
    }
    const nextIndex = currentIndex - 1;
    setCurrentIndex(nextIndex);
    const nextCard = cards[nextIndex];
    setShowMeaning(Boolean(nextCard && results[nextCard.romaji]));
  };

  const handleNext = () => {
    if (currentIndex >= cards.length - 1) {
      return;
    }
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    const nextCard = cards[nextIndex];
    setShowMeaning(Boolean(nextCard && results[nextCard.romaji]));
  };

  const restart = () => {
    setShuffleSeed((value) => value + 1);
    setCurrentIndex(0);
    setShowMeaning(false);
    setResults({});
    setIsFinished(false);
  };

  const rememberedCount = Object.values(results).filter((status) => status === 'remembered').length;
  const retryCount = Object.values(results).filter((status) => status === 'retry').length;

  if (!currentCard && !isFinished) {
    return (
      <div className="rounded-3xl border border-soft bg-surface-soft p-5 text-center text-muted shadow-soft sm:p-8">
        {quizCommon.loading.flashcards}
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="space-y-6 rounded-3xl border border-soft bg-surface-soft p-5 text-center text-primary shadow-soft sm:p-8">
        <h2 className="text-3xl font-semibold text-strong">{flashCopy.finishedTitle}</h2>
        <p className="text-lg text-strong">
          {t('flashcards.finishedSummary', { remembered: rememberedCount, retry: retryCount })}
        </p>
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
    <section className="space-y-6 rounded-3xl border border-soft bg-surface-soft p-5 text-primary shadow-soft sm:p-8">
      <header className="space-y-3 text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.38em] text-muted">{flashCopy.title}</span>
        <h2 className="text-2xl font-semibold text-strong sm:text-3xl">
          {t('quizCommon.progressPrefix', { current: currentIndex + 1, total: cards.length })}
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{flashCopy.instruction}</p>
      </header>

      <div className="glass-panel relative flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-3xl p-8 text-center">
        <p className="font-mono text-3xl font-semibold text-strong sm:text-4xl">{currentCard.japanese}</p>
        <p className="text-sm text-muted">{currentCard.romaji}</p>
        {showMeaning ? (
          <p className="text-lg font-semibold text-strong sm:text-xl">{currentCard.indonesian}</p>
        ) : (
          <button
            type="button"
            onClick={handleReveal}
            className="pill-button pill-button--active text-[0.65rem]"
          >
            {flashCopy.reveal}
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="pill-button"
          >
            {flashCopy.previous}
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex >= cards.length - 1}
            className="pill-button"
          >
            {flashCopy.next}
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleMark('remembered')}
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-semibold text-inverse shadow-soft transition hover:opacity-95"
          >
            {flashCopy.remembered}
          </button>
          <button
            type="button"
            onClick={() => handleMark('retry')}
            className="inline-flex items-center justify-center rounded-full border border-soft px-5 py-2 text-sm font-semibold text-muted transition hover:border-strong hover:text-primary"
          >
            {flashCopy.retry}
          </button>
        </div>
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
    </section>
  );
};

export default FlashcardDrill;

