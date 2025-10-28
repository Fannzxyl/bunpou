import React, { useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import type { GrammarPoint } from '../types';
import { useTranslation } from '../src/i18n';

interface GrammarCardProps {
  point: GrammarPoint;
}

const ExpandIcon: React.FC<{ expanded: boolean }> = ({ expanded }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
  </svg>
);

const GrammarCard: React.FC<GrammarCardProps> = ({ point }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t } = useTranslation();

  const { primaryLabel, secondaryLabel } = useMemo(() => {
    if (!point.part.includes(':')) {
      return { primaryLabel: point.part, secondaryLabel: '' };
    }
    const [primary, ...rest] = point.part.split(':');
    return { primaryLabel: primary.trim(), secondaryLabel: rest.join(':').trim() };
  }, [point.part]);

  return (
    <article
      ref={ref}
      className={`rounded-2xl border border-soft bg-surface-soft text-primary shadow-soft transition-all duration-700 ease-out ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        className="flex w-full flex-col gap-4 rounded-2xl bg-transparent px-6 py-5 text-left transition hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.28em] text-muted">
          <span className="rounded-full border border-soft bg-surface px-3 py-1 text-[0.65rem] text-muted">
            {primaryLabel}
          </span>
          {secondaryLabel && <span className="text-muted">{secondaryLabel}</span>}
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-strong">{point.title}</h3>
            {(point.hiragana || point.reading) && (
              <p className="text-sm text-muted">
                {point.hiragana && <span className="font-mono text-primary">{point.hiragana}</span>}
                {point.reading && (
                  <span className="ml-2 rounded-full bg-surface px-2 py-0.5 text-xs uppercase tracking-[0.3em] text-muted">
                    {point.reading}
                  </span>
                )}
              </p>
            )}
          </div>

          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-soft bg-surface text-muted">
            <ExpandIcon expanded={isExpanded} />
          </span>
        </div>
      </button>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ${
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 border-t border-soft px-6 pb-6 pt-4 text-sm leading-relaxed text-muted">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <section className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                {t('grammarCard.functionLabel')}
              </h4>
              <p className="text-base leading-relaxed text-primary">{point.function}</p>
            </section>

            <section className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                {t('grammarCard.examplesLabel')}
              </h4>
              <ul className="space-y-3">
                {point.examples.map((example, index) => (
                  <li
                    key={`${example.japanese}-${index}`}
                    className="rounded-2xl border border-soft bg-surface px-4 py-3"
                  >
                    <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                      <span>{example.source}</span>
                    </div>
                    <p className="mt-2 font-mono text-lg leading-snug text-primary">{example.japanese}</p>
                    <p className="mt-1 text-sm italic text-muted">&ldquo;{example.translation}&rdquo;</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
};

export default GrammarCard;
