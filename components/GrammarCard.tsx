import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import type { GrammarPoint } from '../types';

interface GrammarCardProps {
  point: GrammarPoint;
}

const ExpandIcon: React.FC<{ expanded: boolean }> = ({ expanded }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-6 h-6 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);


const GrammarCard: React.FC<GrammarCardProps> = ({ point }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`bg-slate-800 rounded-lg shadow-lg border border-slate-700 overflow-hidden transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center p-5 text-left bg-slate-800 hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex-1">
          <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider">{point.part}</p>
          <h3 className="text-xl font-bold text-white mt-1">{point.title}</h3>
        </div>
        <ExpandIcon expanded={isExpanded} />
      </button>

      {isExpanded && (
        <div className="p-5 border-t border-slate-700 bg-slate-800/50">
          <div className="mb-4">
            <h4 className="font-semibold text-cyan-300 mb-2">Fungsi:</h4>
            <p className="text-slate-300 leading-relaxed">{point.function}</p>
          </div>
          <div>
            <h4 className="font-semibold text-cyan-300 mb-3">Contoh:</h4>
            <ul className="space-y-3">
              {point.examples.map((example, index) => (
                <li key={index} className="border-l-4 border-slate-600 pl-4">
                  <p className="font-mono text-lg text-slate-100">{example.japanese}</p>
                  <p className="text-slate-400 italic">"{example.translation}"</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrammarCard;