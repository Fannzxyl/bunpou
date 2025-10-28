import React, { useCallback, useState } from 'react';
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
    delay: (index % 16) * 35,
  });

  const toggleFlip = useCallback(() => {
    setIsFlipped((previous) => !previous);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleFlip();
    }
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      onClick={toggleFlip}
      onKeyDown={handleKeyDown}
      className={`group relative h-44 cursor-pointer rounded-2xl border border-slate-800/70 bg-slate-950/75 shadow-lg shadow-slate-950/30 transition-all duration-500 ease-out [perspective:1200px] ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950`}
    >
      <div
        className={`relative h-full w-full rounded-2xl transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 px-4 text-center [backface-visibility:hidden]">
          <span className="absolute right-3 top-3 rounded-full border border-slate-700/80 bg-slate-900/70 px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.3em] text-slate-500">
            Tap untuk arti
          </span>
          <p className="font-mono text-2xl font-semibold text-white sm:text-3xl">{word.japanese}</p>
          <p className="text-sm text-slate-400">{word.romaji}</p>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-sky-500/90 to-cyan-400/90 px-4 text-center text-slate-950 shadow-inner shadow-sky-500/20 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-900/60">Arti</span>
          <p className="text-lg font-semibold sm:text-xl">{word.indonesian}</p>
        </div>
      </div>
    </div>
  );
};

export default VocabularyCard;
