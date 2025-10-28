import React, { useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import type { GrammarPoint } from '../types';

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
      className={`rounded-2xl border border-slate-800/70 bg-slate-950/75 shadow-lg shadow-slate-950/30 transition-all duration-700 ease-out ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        className="flex w-full flex-col gap-4 rounded-2xl bg-transparent px-6 py-5 text-left transition hover:bg-slate-900/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-300/90">
          <span className="rounded-full border border-sky-500/25 bg-sky-500/10 px-3 py-1 text-[0.65rem] text-sky-200">
            {primaryLabel}
          </span>
          {secondaryLabel && <span className="text-slate-500">{secondaryLabel}</span>}
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">{point.title}</h3>
            {(point.hiragana || point.reading) && (
              <p className="text-sm text-slate-400">
                {point.hiragana && <span className="font-mono text-slate-200">{point.hiragana}</span>}
                {point.reading && (
                  <span className="ml-2 rounded-full bg-slate-900/70 px-2 py-0.5 text-xs uppercase tracking-[0.3em] text-slate-400">
                    {point.reading}
                  </span>
                )}
              </p>
            )}
          </div>

          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300">
            <ExpandIcon expanded={isExpanded} />
          </span>
        </div>
      </button>

      <div className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="min-h-0 border-t border-slate-800/70 px-6 pb-6 pt-4 text-sm leading-relaxed text-slate-300">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <section className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300/90">Fungsi</h4>
              <p className="text-base leading-relaxed text-slate-200">{point.function}</p>
            </section>

            <section className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300/90">
                Contoh Kalimat
              </h4>
              <ul className="space-y-3">
                {point.examples.map((example, index) => (
                  <li
                    key={`${example.japanese}-${index}`}
                    className="rounded-2xl border border-slate-800/70 bg-slate-950/70 px-4 py-3 shadow-inner shadow-slate-950/30"
                  >
                    <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
                      <span>{example.source}</span>
                    </div>
                    <p className="mt-2 font-mono text-lg leading-snug text-slate-100">{example.japanese}</p>
                    <p className="mt-1 text-sm italic text-slate-400">&ldquo;{example.translation}&rdquo;</p>
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
