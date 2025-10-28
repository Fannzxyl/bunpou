
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-lg shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
          Rangkuman Bunpou & Kosakata TKA
        </h1>
        <p className="text-center text-slate-400 mt-1 text-sm md:text-base">
          Materi Penting untuk Menghafal Tata Bahasa & Kosakata Bahasa Jepang
        </p>
      </div>
    </header>
  );
};

export default Header;
