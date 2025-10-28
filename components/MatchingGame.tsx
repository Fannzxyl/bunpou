import React, { useEffect, useState } from 'react';
import type { VocabularyWord } from '../types';
import { useTranslation } from '../src/i18n';

interface MatchingGameProps {
  words: VocabularyWord[];
  onBack: () => void;
}

interface Card {
  id: string;
  content: string;
  type: 'japanese' | 'indonesian';
}

const GAME_PAIRS = 6;

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const MatchingGame: React.FC<MatchingGameProps> = ({ words, onBack }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
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
  const matchingCopy = get<{
    title: string;
    subtitle: string;
    finishedTitle: string;
    finishedSummary: string;
    stepsLabel: string;
    matchesLabel: string;
  }>('matchingGame');

  const setupGame = () => {
    const gameWords = shuffleArray(words).slice(0, GAME_PAIRS);

    const gameCards: Card[] = [];
    gameWords.forEach((word) => {
      gameCards.push({ id: word.romaji, content: word.japanese, type: 'japanese' });
      gameCards.push({ id: word.romaji, content: word.indonesian, type: 'indonesian' });
    });

    setCards(shuffleArray(gameCards));
    setSelectedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsFinished(false);
  };

  useEffect(() => {
    setupGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]);

  useEffect(() => {
    if (selectedIndices.length !== 2) return;

    const [firstIndex, secondIndex] = selectedIndices;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    setMoves((count) => count + 1);

    if (firstCard.id === secondCard.id) {
      setMatchedPairs((prev) => [...prev, firstCard.id]);
      setSelectedIndices([]);
    } else {
      const timer = window.setTimeout(() => {
        setSelectedIndices([]);
      }, 900);
      return () => window.clearTimeout(timer);
    }
  }, [selectedIndices, cards]);

  useEffect(() => {
    if (matchedPairs.length > 0 && matchedPairs.length === GAME_PAIRS) {
      const timer = window.setTimeout(() => {
        setIsFinished(true);
      }, 400);
      return () => window.clearTimeout(timer);
    }
  }, [matchedPairs]);

  const progress = Math.round((matchedPairs.length / GAME_PAIRS) * 100);

  if (isFinished) {
    return (
      <div className="space-y-6 rounded-3xl border border-soft bg-surface-soft p-6 text-center text-primary shadow-soft sm:p-8">
        <h2 className="text-3xl font-semibold text-strong">{matchingCopy.finishedTitle}</h2>
        <p className="text-lg text-strong">{t('matchingGame.finishedSummary', { moves })}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={setupGame}
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
    <div className="space-y-8 rounded-3xl border border-soft bg-surface-soft p-6 text-primary shadow-soft sm:p-8">
      <header className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.38em] text-muted">{matchingCopy.title}</span>
            <h2 className="text-2xl font-semibold text-strong sm:text-3xl">{matchingCopy.subtitle}</h2>
          </div>
          <div className="text-sm text-muted">
            <p>
              {matchingCopy.stepsLabel}: <span className="font-semibold text-strong">{moves}</span>
            </p>
            <p>
              {matchingCopy.matchesLabel}: <span className="font-semibold text-strong">{matchedPairs.length}</span> / {GAME_PAIRS}
            </p>
          </div>
        </div>
        <div className="relative h-2 overflow-hidden rounded-full bg-surface">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--accent), var(--accent-soft))',
            }}
          />
        </div>
      </header>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:gap-3 lg:gap-4">
        {cards.map((card, index) => {
          const isMatched = matchedPairs.includes(card.id);
          const isSelected = selectedIndices.includes(index);
          const isVisible = isMatched || isSelected;

          let buttonClass =
            'border border-soft bg-surface text-primary transition hover:border-strong hover:bg-surface-soft';
          const buttonStyle: React.CSSProperties = {};
          if (isMatched) {
            buttonClass = 'border border-emerald-400 bg-emerald-400/20 text-strong shadow-soft';
            buttonStyle.backgroundColor = 'rgba(34, 197, 94, 0.2)';
          } else if (isSelected) {
            buttonClass = 'border bg-accent-soft text-strong shadow-soft';
            buttonStyle.borderColor = 'var(--accent)';
            buttonStyle.backgroundColor = 'var(--accent-soft)';
          }

          const displayValue = isVisible ? card.content : '?';

          return (
            <button
              key={`${card.id}-${index}`}
              type="button"
              onClick={() => {
                if (selectedIndices.length >= 2 || isMatched || selectedIndices.includes(index)) {
                  return;
                }
                setSelectedIndices((prev) => [...prev, index]);
              }}
              disabled={isMatched || selectedIndices.length === 2}
              className={`aspect-square w-full rounded-2xl px-2 text-center text-sm font-semibold transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 ${buttonClass}`}
              style={buttonStyle}
            >
              {displayValue}
            </button>
          );
        })}
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

export default MatchingGame;

