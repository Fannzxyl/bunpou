import React from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 right-10 h-80 w-80 rounded-full bg-sky-500/25 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
        <div className="absolute bottom-[-6rem] left-[12%] h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl sm:h-[22rem] sm:w-[22rem]" />
        <div className="absolute inset-x-0 top-1/2 h-64 scale-150 bg-gradient-to-r from-transparent via-sky-500/10 to-transparent blur-3xl" />
      </div>

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 sm:px-6 lg:px-8">
        <section className="grid gap-4 text-sm leading-relaxed text-slate-300 sm:grid-cols-2 lg:grid-cols-3">
          <article className="glass-panel p-6 shadow-sky-500/10 transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/20">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300/80">Langkah 1</p>
            <h2 className="mt-3 text-lg font-semibold text-slate-100">Kuasi Partikel Dasar</h2>
            <p className="mt-2 text-slate-400">
              Buka kartu interaktif untuk memahami fungsi partikel, pola, dan contoh kalimat yang siap dipakai.
            </p>
          </article>
          <article className="glass-panel p-6 shadow-teal-400/10 transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-400/20">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-300/80">Langkah 2</p>
            <h2 className="mt-3 text-lg font-semibold text-slate-100">Bangun Kosakata Aktif</h2>
            <p className="mt-2 text-slate-400">
              Filter kosakata berdasarkan kategori, latih pengucapan, dan hafalkan arti dengan kartu beranimasi.
            </p>
          </article>
          <article className="glass-panel p-6 shadow-cyan-500/10 transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/20 lg:col-span-1 sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/80">Langkah 3</p>
            <h2 className="mt-3 text-lg font-semibold text-slate-100">Uji Diri &amp; Ulangi</h2>
            <p className="mt-2 text-slate-400">
              Tiga mode kuis menjaga progres belajar tetap menantang - mulai dari pilihan ganda hingga lengkapi kalimat.
            </p>
          </article>
        </section>

        <Tabs />
      </main>

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 text-sm text-slate-500 sm:px-6">
        <div className="glass-panel flex flex-col items-center justify-between gap-3 rounded-2xl px-6 py-4 sm:flex-row">
          <p className="text-center text-xs sm:text-sm">
            Dibangun untuk membantu persiapan JLPT &amp; ujian sekolah. Terakhir diperbarui 2024.
          </p>
          <span className="text-xs text-slate-500 sm:text-sm">Tetap semangat belajar!</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
