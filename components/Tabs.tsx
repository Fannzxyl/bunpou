import React, { useState, useMemo } from 'react';
import { grammarData } from '../data/grammar';
import { vocabularyData } from '../data/vocabulary';
import GrammarCard from './GrammarCard';
import VocabularyCard from './VocabularyCard';
import QuizView from './QuizView';
import type { VocabularyWord } from '../types';

type Tab = 'grammar' | 'vocabulary' | 'quiz';

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
    if (!searchTerm) {
      return groupedVocabulary;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered: Record<string, VocabularyWord[]> = {};

    for (const category in groupedVocabulary) {
      const words = groupedVocabulary[category].filter(
        word =>
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


  const renderContent = () => {
    switch (activeTab) {
      case 'grammar':
        return (
          <div className="space-y-4">
            {grammarData.map((point, index) => (
              <GrammarCard key={index} point={point} />
            ))}
          </div>
        );
      case 'vocabulary':
        return (
          <div>
            <div className="mb-6 sticky top-[88px] z-10 bg-slate-900/80 backdrop-blur-md p-4 -mx-4 rounded-md">
                 <input
                    type="text"
                    placeholder="Cari kosakata (romaji, kana, arti)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
            </div>
            <div className="space-y-12">
              {Object.entries(filteredVocabulary).map(([category, words]) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-cyan-400 border-b-2 border-slate-700 pb-2 mb-6">{category}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {words.map((word, index) => (
                      <VocabularyCard key={word.romaji} word={word} index={index} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'quiz':
        return <QuizView />;
      default:
        return null;
    }
  };

  const getTabClass = (tab: Tab) =>
    `px-4 py-2 text-sm md:text-base font-semibold rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 ${
      activeTab === tab ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
    }`;

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
        <button onClick={() => setActiveTab('grammar')} className={getTabClass('grammar')}>
          Tata Bahasa (文法)
        </button>
        <button onClick={() => setActiveTab('vocabulary')} className={getTabClass('vocabulary')}>
          Kosakata (語彙)
        </button>
        <button onClick={() => setActiveTab('quiz')} className={getTabClass('quiz')}>
          Kuis (クイズ)
        </button>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default Tabs;