import React from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';

function App() {
  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <Tabs />
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Built for effective learning. © 2024</p>
      </footer>
    </div>
  );
}

export default App;
