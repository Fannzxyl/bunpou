import React, { useCallback, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import type { VocabularyWord } from '../types';
import { useTranslation } from '../src/i18n';

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
  const { t } = useTranslation();

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
      className={`group vocab-card relative h-44 cursor-pointer rounded-2xl border border-soft bg-surface-soft text-primary shadow-soft transition-all duration-500 ease-out ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 sm:[perspective:1200px]`}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 sm:hidden">
        <p className="font-mono text-2xl font-semibold text-strong">{word.japanese}</p>
        <p className="text-sm text-muted">{word.romaji}</p>
        {isFlipped ? (
          <p className="text-lg font-semibold text-strong">{word.indonesian}</p>
        ) : (
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
            {t('vocabularyCard.flipHint')}
          </span>
        )}
      </div>
      <div
        className={`relative hidden h-full w-full rounded-2xl transition-transform duration-700 sm:block sm:[transform-style:preserve-3d] ${
          isFlipped ? 'sm:[transform:rotateY(180deg)]' : ''
        }`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border border-soft bg-surface px-4 text-center [backface-visibility:hidden]">
          <span className="absolute right-3 top-3 rounded-full border border-soft bg-surface px-2 py-0.5 text-[0.55rem] uppercase tracking-[0.3em] text-muted">
            {t('vocabularyCard.flipHint')}
          </span>
            <p className="font-mono text-2xl font-semibold text-strong sm:text-3xl">{word.japanese}</p>
            <p className="text-sm text-muted">{word.romaji}</p>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border border-soft bg-accent px-4 text-center text-inverse shadow-soft [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] opacity-80">
            {t('vocabularyCard.backLabel')}
          </span>
          <p className="text-lg font-semibold sm:text-xl">{word.indonesian}</p>
        </div>
      </div>
    </div>
  );
};

export default VocabularyCard;
