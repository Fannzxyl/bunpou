import React from 'react';
import { grammarData } from '../data/grammar';
import { vocabularyData } from '../data/vocabulary';

const totalGrammarPoints = grammarData.length;
const totalVocabularyWords = vocabularyData.length;
const totalCategories = new Set(vocabularyData.map((word) => word.category)).size;

const Header: React.FC = () => {
  return (
    <header className="relative z-20 border-b border-white/5 bg-slate-950/40 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-sky-300/90">
            Bunpou Toolkit
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Rangkuman Bunpou &amp; Kosakata TKA
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Ringkasan materi kelas internasional yang paling sering keluar di ujian. Susun jadwal belajar, dalami
            contoh kalimat, lalu uji diri dengan kuis interaktif kapan pun kamu butuh.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <a className="pill-button pill-button--active" href="#materi">
              Mulai Eksplor Materi
            </a>
            <a className="pill-button" href="#kuis">
              Langsung ke Mode Kuis
            </a>
          </div>
        </div>

        <aside className="w-full max-w-lg lg:w-80">
          <div className="glass-panel h-full p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
              Snapshot Belajar
            </p>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-center text-sm text-slate-300">
              <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 px-3 py-4 shadow-inner shadow-black/20">
                <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">Grammar</dt>
                <dd className="mt-2 text-xl font-semibold text-sky-300">{totalGrammarPoints}</dd>
              </div>
              <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 px-3 py-4 shadow-inner shadow-black/20">
                <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">Kosakata</dt>
                <dd className="mt-2 text-xl font-semibold text-teal-300">{totalVocabularyWords}</dd>
              </div>
              <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 px-3 py-4 shadow-inner shadow-black/20">
                <dt className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">Kategori</dt>
                <dd className="mt-2 text-xl font-semibold text-cyan-300">{totalCategories}</dd>
              </div>
            </dl>
            <p className="mt-5 text-xs leading-relaxed text-slate-500">
              Tip: update data setelah sesi belajar supaya statistik tetap relevan dengan fokus kamu selanjutnya.
            </p>
          </div>
        </aside>
      </div>
    </header>
  );
};

export default Header;
