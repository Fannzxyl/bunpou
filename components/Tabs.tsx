import React, { useEffect, useMemo, useState } from 'react';
import { grammarData } from '../data/grammar';
import { vocabularyData } from '../data/vocabulary';
import GrammarCard from './GrammarCard';
import VocabularyCard from './VocabularyCard';
import QuizView from './QuizView';
import type { VocabularyWord } from '../types';

type Tab = 'grammar' | 'vocabulary' | 'quiz';

const tabHash: Record<Tab, string> = {
  grammar: 'materi',
  vocabulary: 'kosakata',
  quiz: 'kuis',
};

const tabMeta: Record<
  Tab,
  {
    badge: string;
    label: string;
    heading: string;
    description: string;
  }
> = {
  grammar: {
    badge: 'G',
    label: 'Grammar',
    heading: 'Tata Bahasa Inti untuk Ujian',
    description: 'Buka kartu interaktif untuk memahami fungsi partikel, pola kalimat, dan contoh penerapan langsung.',
  },
  vocabulary: {
    badge: 'V',
    label: 'Vocabulary',
    heading: 'Kelola Kosakata Tematik',
    description: 'Filter berdasarkan kategori, cari lewat romaji maupun arti, lalu hafalkan dengan kartu beranimasi.',
  },
  quiz: {
    badge: 'Q',
    label: 'Quiz',
    heading: 'Latihan Interaktif & Gamified',
    description:
      'Uji pemahaman dengan pilihan ganda, permainan mencocokkan, serta latihan isi rumpang untuk menguatkan memori.',
  },
};

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('grammar');
  const [searchTerm, setSearchTerm] = useState('');

  const groupedVocabulary = useMemo(() => {
    return vocabularyData.reduce((acc, word) => {
      (acc[word.category] = acc[word.category] || []).push(word);
      return acc;
    }, {} as Record<string, VocabularyWord[]>);
  }, []);

  const filteredVocabulary = useMemo(() => {
    if (!searchTerm.trim()) {
      return groupedVocabulary;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered: Record<string, VocabularyWord[]> = {};

    for (const category in groupedVocabulary) {
      const words = groupedVocabulary[category].filter(
        (word) =>
          word.romaji.toLowerCase().includes(lowercasedFilter) ||
          word.japanese.toLowerCase().includes(lowercasedFilter) ||
          word.indonesian.toLowerCase().includes(lowercasedFilter)
      );

      if (words.length > 0) {
        filtered[category] = words;
      }
    }
    return filtered;
  }, [searchTerm, groupedVocabulary]);

  const vocabularyCategoryCount = useMemo(() => Object.keys(groupedVocabulary).length, [groupedVocabulary]);
  const totalVocabulary = useMemo(() => vocabularyData.length, []);

  const highlightStats = useMemo(
    () => [
      {
        label: 'Kategori',
        value: vocabularyCategoryCount,
        detail: 'Tema belajar paling sering keluar di TKA.',
      },
      {
        label: 'Kartu Kosakata',
        value: totalVocabulary,
        detail: 'Tap kartu untuk membuka arti & latihan kilat.',
      },
      {
        label: 'Mode Kuis',
        value: 3,
        detail: 'Pilihan ganda, matching game, & isi rumpang.',
      },
    ],
    [totalVocabulary, vocabularyCategoryCount]
  );

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);

    if (tab !== 'vocabulary') {
      setSearchTerm('');
    }

    const hash = tabHash[tab];
    if (hash && typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${hash}`);
      window.requestAnimationFrame(() => {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const hasVocabularyResults = useMemo(
    () => Object.keys(filteredVocabulary).length > 0,
    [filteredVocabulary]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const applyHash = () => {
      const hash = window.location.hash.replace('#', '');
      const entry = (Object.entries(tabHash) as Array<[Tab, string]>).find(([, value]) => value === hash);
      if (entry) {
        setActiveTab(entry[0]);
        if (entry[0] !== 'vocabulary') {
          setSearchTerm('');
        }
      }
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'grammar':
        return (
          <div className="grid gap-4">
            {grammarData.map((point, index) => (
              <GrammarCard key={index} point={point} />
            ))}
          </div>
        );
      case 'vocabulary':
        return (
          <div className="space-y-8">
            <div className="sticky top-28 z-10">
              <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/30 backdrop-blur-xl">
                <label htmlFor="search" className="sr-only">
                  Cari kosakata
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m0 0a7 7 0 10-9.9-9.9 7 7 0 009.9 9.9z"
                    />
                  </svg>
                  <input
                    id="search"
                    type="search"
                    placeholder="Cari romaji, kana, atau arti bahasa Indonesia..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/80 py-3 pl-12 pr-16 text-sm text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-800/90 px-3 py-1 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Tips: kombinasikan pencarian dengan kategori untuk fokus ke tema tertentu.
                </p>
              </div>
            </div>

            {hasVocabularyResults ? (
              <div className="space-y-12">
                {Object.entries(filteredVocabulary).map(([category, words]) => (
                  <section key={category} aria-label={category} className="space-y-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-cyan-300">{category}</h2>
                        <p className="text-sm text-slate-400">Jumlah kartu: {words.length}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {words.map((word, index) => (
                        <VocabularyCard key={`${word.romaji}-${index}`} word={word} index={index} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-8 text-center text-slate-400">
                <p className="text-lg font-semibold text-slate-200">Tidak ada hasil yang cocok.</p>
                <p className="mt-2 text-sm">
                  Coba gunakan kata kunci lain atau bersihkan pencarian untuk melihat semua kategori.
                </p>
              </div>
            )}
          </div>
        );
      case 'quiz':
        return <QuizView />;
      default:
        return null;
    }
  };

  return (
    <section id="materi" className="space-y-6">
      <div className="glass-panel space-y-8 p-6 sm:p-8">
        <div id="kosakata" className="sr-only" aria-hidden="true" />
        <div id="kuis" className="sr-only" aria-hidden="true" />
        <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
              Mode Pembelajaran
            </span>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">{tabMeta[activeTab].heading}</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {tabMeta[activeTab].description}
            </p>
          </div>
          <dl className="grid w-full gap-3 text-center text-sm text-slate-300 sm:grid-cols-3 lg:w-auto">
            {highlightStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-800/60 bg-slate-950/70 px-5 py-4 shadow-inner shadow-slate-950/30"
              >
                <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">{stat.label}</dt>
                <dd className="mt-2 text-2xl font-semibold text-sky-300">{stat.value}</dd>
                <dd className="mt-2 text-[0.7rem] leading-relaxed text-slate-500">{stat.detail}</dd>
              </div>
            ))}
          </dl>
        </header>

        <nav className="flex flex-wrap items-center gap-3" aria-label="Tab Navigasi" role="tablist">
          {(Object.keys(tabMeta) as Tab[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="tab-content"
                className={`pill-button flex items-center gap-3 transition ${isActive ? 'pill-button--active' : ''}`}
                onClick={() => handleTabChange(tab)}
              >
                <span className={`text-lg font-semibold ${isActive ? 'text-slate-900' : 'text-slate-200'}`}>
                  {tabMeta[tab].badge}
                </span>
                <span className={`text-xs tracking-[0.3em] uppercase ${isActive ? 'text-slate-900/70' : 'text-slate-500'}`}>
                  {tabMeta[tab].label}
                </span>
              </button>
            );
          })}
        </nav>

        <div id="tab-content" role="tabpanel" className="space-y-6">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default Tabs;
