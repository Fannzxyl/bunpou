import React from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import { useTranslation } from './src/i18n';

function App() {
  const { get } = useTranslation();
  const steps = get<Array<{ badge: string; title: string; description: string }>>('app.steps');
  const footerNote = get<string>('app.footerNote');
  const footerMotivation = get<string>('app.footerMotivation');

  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-primary">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-32 right-10 h-80 w-80 rounded-full blur-3xl opacity-30 sm:h-[26rem] sm:w-[26rem]"
          style={{ background: 'var(--accent)' }}
        />
        <div
          className="absolute bottom-[-6rem] left-[12%] h-72 w-72 rounded-full blur-3xl opacity-25 sm:h-[22rem] sm:w-[22rem]"
          style={{ background: 'var(--accent-soft)' }}
        />
        <div
          className="absolute inset-x-0 top-1/2 h-64 scale-150 blur-3xl opacity-20"
          style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
        />
      </div>

      <Header />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 sm:px-6 lg:px-8">
        <section className="grid gap-4 text-sm leading-relaxed text-muted sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step: { badge: string; title: string; description: string }) => (
            <article key={step.badge} className="glass-panel p-6 transition duration-500 hover:-translate-y-1 hover:shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">{step.badge}</p>
              <h2 className="mt-3 text-lg font-semibold text-strong">{step.title}</h2>
              <p className="mt-2 text-muted">{step.description}</p>
            </article>
          ))}
        </section>

        <Tabs />
      </main>

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-12 text-sm sm:px-6">
        <div className="glass-panel flex flex-col items-center justify-between gap-3 rounded-2xl px-6 py-4 text-muted sm:flex-row">
          <p className="text-center text-xs sm:text-sm text-muted">{footerNote}</p>
          <span className="text-xs sm:text-sm text-strong">{footerMotivation}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
