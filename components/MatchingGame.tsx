import React, { useState, useEffect } from 'react';
import type { VocabularyWord } from '../types';

interface MatchingGameProps {
  words: VocabularyWord[];
  onBack: () => void;
}

interface Card {
  id: string; // e.g., word.romaji to link pairs
  content: string;
  type: 'japanese' | 'indonesian';
}

const GAME_PAIRS = 6; // This means 12 cards in total

// Helper to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const MatchingGame: React.FC<MatchingGameProps> = ({ words, onBack }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Function to set up or restart the game
  const setupGame = () => {
    // 1. Pick random words for the game
    const gameWords = shuffleArray(words).slice(0, GAME_PAIRS);
    
    // 2. Create card pairs (Japanese and Indonesian)
    const gameCards: Card[] = [];
    gameWords.forEach(word => {
      gameCards.push({ id: word.romaji, content: word.japanese, type: 'japanese' });
      gameCards.push({ id: word.romaji, content: word.indonesian, type: 'indonesian' });
    });
    
    // 3. Shuffle all cards and reset state
    setCards(shuffleArray(gameCards));
    setSelectedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsFinished(false);
  };

  // Setup the game on initial render
  useEffect(() => {
    setupGame();
  }, [words]);

  // Game logic to check for matches
  useEffect(() => {
    if (selectedIndices.length !== 2) return;

    const [firstIndex, secondIndex] = selectedIndices;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];
    
    setMoves(m => m + 1);

    if (firstCard.id === secondCard.id) {
      // It's a match!
      setMatchedPairs(prev => [...prev, firstCard.id]);
      setSelectedIndices([]);
    } else {
      // Not a match, flip back after a delay
      const timer = setTimeout(() => {
        setSelectedIndices([]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedIndices, cards]);

  // Check if the game is finished
  useEffect(() => {
    if (matchedPairs.length > 0 && matchedPairs.length === GAME_PAIRS) {
      const timer = setTimeout(() => {
        setIsFinished(true);
      }, 500); // Short delay before showing finish screen
      return () => clearTimeout(timer);
    }
  }, [matchedPairs]);

  const handleCardClick = (index: number) => {
    // Prevent clicking if 2 cards are already selected, or card is matched/already selected
    if (selectedIndices.length >= 2 || matchedPairs.includes(cards[index].id) || selectedIndices.includes(index)) {
      return;
    }
    setSelectedIndices(prev => [...prev, index]);
  };

  if (isFinished) {
    return (
      <div className="text-center p-8 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
        <h2 className="text-3xl font-bold text-white mb-4">Permainan Selesai!</h2>
        <p className="text-xl text-cyan-400 mb-6">Kamu menyelesaikannya dalam {moves} langkah.</p>
        <div className="flex justify-center gap-4">
          <button onClick={setupGame} className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105">
            Main Lagi
          </button>
          <button onClick={onBack} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105">
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-slate-800 rounded-lg shadow-lg border border-slate-700 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-cyan-300">Mencocokkan Kata</h2>
        <div className="text-left sm:text-right">
          <p className="text-lg font-semibold text-white">Langkah: {moves}</p>
          <p className="text-md text-slate-400">Cocok: {matchedPairs.length} / {GAME_PAIRS}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
        {cards.map((card, index) => {
          const isMatched = matchedPairs.includes(card.id);
          const isSelected = selectedIndices.includes(index);
          const isVisible = isMatched || isSelected;

          let buttonClass = 'bg-slate-700 hover:bg-slate-600 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20';
          if (isMatched) {
            buttonClass = 'bg-green-700 opacity-60 cursor-default';
          } else if (isSelected) {
            buttonClass = 'bg-sky-600 scale-105 shadow-lg shadow-cyan-500/20';
          }

          return (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              disabled={isMatched || selectedIndices.length === 2}
              className={`w-full aspect-square p-2 rounded-lg text-white font-semibold transition-all duration-300 flex justify-center items-center text-center text-base sm:text-lg md:text-xl break-all ${buttonClass}`}
            >
              {isVisible ? card.content : '?'}
            </button>
          );
        })}
      </div>

       <div className="mt-8 text-center">
        <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors">
          Keluar dari Permainan
        </button>
      </div>
    </div>
  );
};

export default MatchingGame;