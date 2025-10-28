import React, { useState } from 'react';
import MultipleChoiceQuiz from './MultipleChoiceQuiz';
import MatchingGame from './MatchingGame';
import FillInTheBlankQuiz from './FillInTheBlankQuiz';
import { vocabularyData } from '../data/vocabulary';

type QuizType = 'multiple-choice' | 'matching-game' | 'fill-in-the-blank' | null;

const quizOptions: Array<{
  id: Exclude<QuizType, null>;
  title: string;
  description: string;
  gradient: string;
}> = [
  {
    id: 'multiple-choice',
    title: 'Pilihan Ganda',
    description: 'Jawab 10 soal arti kosakata dengan waktu santai. Cocok untuk review cepat.',
    gradient: 'from-sky-500/85 to-cyan-400/85',
  },
  {
    id: 'matching-game',
    title: 'Mencocokkan Kata',
    description: 'Temukan pasangan romaji & arti. Melatih memori visual sekaligus recall cepat.',
    gradient: 'from-violet-500/85 to-sky-500/85',
  },
  {
    id: 'fill-in-the-blank',
    title: 'Lengkapi Kalimat',
    description: 'Uji pemahaman partikel dengan kalimat rumpang dari materi grammar.',
    gradient: 'from-emerald-500/85 to-teal-400/85',
  },
];

const QuizView: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType>(null);

  const handleStartQuiz = (quizType: Exclude<QuizType, null>) => {
    setSelectedQuiz(quizType);
  };

  const handleBackToMenu = () => {
    setSelectedQuiz(null);
  };

  if (selectedQuiz === 'multiple-choice') {
    return <MultipleChoiceQuiz words={vocabularyData} onBack={handleBackToMenu} />;
  }

  if (selectedQuiz === 'matching-game') {
    return <MatchingGame words={vocabularyData} onBack={handleBackToMenu} />;
  }

  if (selectedQuiz === 'fill-in-the-blank') {
    return <FillInTheBlankQuiz onBack={handleBackToMenu} />;
  }

  return (
    <section className="space-y-6 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 shadow-lg shadow-slate-950/30 sm:p-8">
      <header className="space-y-3 text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">Mode Kuis</span>
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Pilih Mode Latihan Kamu</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Setiap mode memuat 10 soal acak. Mulai dari pemanasan ringan sampai latihan fokus partikel - sesuaikan dengan
          kebutuhan sesi belajar kamu hari ini.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-3">
        {quizOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleStartQuiz(option.id)}
            className={`group relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/70 p-6 text-left text-slate-100 shadow-lg shadow-slate-950/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950`}
          >
            <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${option.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
            <div className="flex h-full flex-col gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{option.description}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-sky-200 transition group-hover:gap-3">
                Mulai sekarang
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>
      <footer className="rounded-2xl border border-slate-800/70 bg-slate-950/80 px-5 py-4 text-sm text-slate-400 shadow-inner shadow-slate-950/30">
        Progress kamu tersimpan di kepala sendiri - ambil jeda 5 menit setiap sesi kuis supaya memori jangka panjangnya
        lebih lengket.
      </footer>
    </section>
  );
};

export default QuizView;
