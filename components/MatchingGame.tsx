import React, { useEffect, useState } from 'react';
import type { VocabularyWord } from '../types';

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
      <div className="space-y-6 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 text-center shadow-lg shadow-slate-950/30 sm:p-8">
        <h2 className="text-3xl font-semibold text-white">Hebat! Semua pasangan berhasil ditemukan!</h2>
        <p className="text-lg text-cyan-300">Total langkah: {moves}</p>
        <p className="text-sm text-slate-400">
          Ulangi permainan untuk memetakan kosa kata lain atau lanjut ke mode kuis berikutnya.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={setupGame}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:shadow-2xl"
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

  return (
    <div className="space-y-8 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 shadow-lg shadow-slate-950/30 sm:p-8">
      <header className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">Matching Game</span>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Cocokkan pasangan hingga selesai
            </h2>
          </div>
          <div className="text-sm text-slate-400">
            <p>
              Langkah: <span className="font-semibold text-cyan-300">{moves}</span>
            </p>
            <p>
              Cocok: <span className="font-semibold text-cyan-300">{matchedPairs.length}</span> / {GAME_PAIRS}
            </p>
          </div>
        </div>
        <div className="relative h-2 overflow-hidden rounded-full bg-slate-800/60">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 to-sky-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:gap-3 lg:gap-4">
        {cards.map((card, index) => {
          const isMatched = matchedPairs.includes(card.id);
          const isSelected = selectedIndices.includes(index);
          const isVisible = isMatched || isSelected;

          let buttonClass =
            'border-slate-800/70 bg-slate-950/75 text-slate-100 hover:border-sky-500/40 hover:bg-slate-900/70';
          if (isMatched) {
            buttonClass = 'border-emerald-500/60 bg-emerald-500/20 text-emerald-200 shadow-inner shadow-emerald-500/30';
          } else if (isSelected) {
            buttonClass =
              'border-sky-500/70 bg-sky-500/25 text-sky-100 shadow-lg shadow-sky-500/20';
          }

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
              className={`aspect-square w-full rounded-2xl border px-2 text-center text-sm font-semibold transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${buttonClass}`}
            >
              {isVisible ? card.content : '?'}
            </button>
          );
        })}
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

export default MatchingGame;
