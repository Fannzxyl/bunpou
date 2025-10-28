import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import type { VocabularyWord } from '../types';

interface VocabularyCardProps {
  word: VocabularyWord;
  index: number;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({ word, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    delay: (index % 20) * 30, // Stagger animation
  });

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      ref={ref}
      className={`group [perspective:1000px] cursor-pointer transition-all duration-500 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-36 transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        } group-hover:scale-105 transition-transform duration-300`}
      >
        {/* Front of the card */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-slate-800 rounded-lg shadow-lg border border-slate-700 p-4 flex flex-col justify-center items-center text-center">
          <p className="text-2xl sm:text-3xl font-bold text-white font-serif">{word.japanese}</p>
          <p className="text-sm sm:text-base text-slate-400 mt-1">{word.romaji}</p>
        </div>

        {/* Back of the card */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-sky-800 rounded-lg shadow-lg border border-sky-700 p-4 flex flex-col justify-center items-center text-center">
          <p className="text-xl sm:text-2xl font-semibold text-white">{word.indonesian}</p>
        </div>
      </div>
    </div>
  );
};

export default VocabularyCard;