import React from 'react';
import { grammarData } from '../data/grammar';
import { vocabularyData } from '../data/vocabulary';
import SettingsPanel from './SettingsPanel';
import { useTranslation } from '../src/i18n';

const totalGrammarPoints = grammarData.length;
const totalVocabularyWords = vocabularyData.length;
const totalCategories = new Set(vocabularyData.map((word) => word.category)).size;

const Header: React.FC = () => {
  const { get } = useTranslation();
  const headerCopy = get<{
    toolkitLabel: string;
    title: string;
    description: string;
    exploreCta: string;
    quizCta: string;
    snapshotTitle: string;
    grammarLabel: string;
    vocabularyLabel: string;
    categoriesLabel: string;
    tip: string;
  }>('header');

  return (
    <header className="relative z-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
        <div className="flex-1 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-soft bg-surface-soft px-4 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-muted">
              {headerCopy.toolkitLabel}
            </span>
            <SettingsPanel />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-strong sm:text-4xl lg:text-5xl">
            {headerCopy.title}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {headerCopy.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <a className="pill-button pill-button--active" href="#materi">
              {headerCopy.exploreCta}
            </a>
            <a className="pill-button" href="#kuis">
              {headerCopy.quizCta}
            </a>
          </div>
        </div>

        <aside className="w-full max-w-lg lg:w-80">
          <div className="glass-panel h-full space-y-5 p-6 text-sm text-muted">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted">
              {headerCopy.snapshotTitle}
            </p>
            <dl className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-2xl border border-soft bg-surface-soft px-3 py-4">
                <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                  {headerCopy.grammarLabel}
                </dt>
                <dd className="mt-2 text-xl font-semibold text-strong">{totalGrammarPoints}</dd>
              </div>
              <div className="rounded-2xl border border-soft bg-surface-soft px-3 py-4">
                <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                  {headerCopy.vocabularyLabel}
                </dt>
                <dd className="mt-2 text-xl font-semibold text-strong">{totalVocabularyWords}</dd>
              </div>
              <div className="rounded-2xl border border-soft bg-surface-soft px-3 py-4">
                <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                  {headerCopy.categoriesLabel}
                </dt>
                <dd className="mt-2 text-xl font-semibold text-strong">{totalCategories}</dd>
              </div>
            </dl>
            <p className="text-xs leading-relaxed text-muted">
              {headerCopy.tip}
            </p>
          </div>
        </aside>
      </div>
    </header>
  );
};

export default Header;
