import React, { useEffect, useRef } from 'react';
import { Philosopher } from '../types';

interface DetailModalProps {
  philosopher: Philosopher | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ philosopher, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (philosopher) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [philosopher, onClose]);

  if (!philosopher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="bg-parchment w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative flex flex-col animate-fadeInUp"
      >
        {/* Header Image Area */}
        <div className="h-48 bg-stone-200 relative overflow-hidden shrink-0">
          <img 
             src={`https://picsum.photos/seed/${philosopher.id * 123}/800/400`} 
             alt={philosopher.name}
             className="w-full h-full object-cover filter sepia-[0.4] contrast-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-parchment to-transparent"></div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full text-stone-800 transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 pt-2">
          <div className="flex flex-col items-center -mt-16 mb-6 relative z-10">
            <div className="w-24 h-24 rounded-full border-4 border-parchment shadow-md overflow-hidden bg-white">
               <img 
                src={`https://picsum.photos/seed/${philosopher.id * 123}/200/200`} 
                alt={philosopher.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-serif font-bold text-ink mt-3 text-center">{philosopher.name}</h2>
            <span className="text-accent font-semibold text-sm tracking-wide">{philosopher.years}</span>
            <span className="px-3 py-1 bg-stone-200 text-stone-700 text-xs rounded-full mt-2 font-medium">
              {philosopher.schoolOfThought}
            </span>
          </div>

          <div className="space-y-6 text-stone-800">
            <section>
              <h3 className="text-lg font-serif font-bold border-b border-stone-300 pb-2 mb-3 text-ink">理论核心 (Core Theory)</h3>
              <p className="leading-relaxed text-justify text-stone-700">
                {philosopher.detailedTheory}
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <h3 className="text-lg font-serif font-bold border-b border-stone-300 pb-2 mb-3 text-ink">代表著作 (Major Works)</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-stone-700">
                    {philosopher.majorWorks.map((work, idx) => (
                      <li key={idx} className="italic">{work}</li>
                    ))}
                  </ul>
               </div>
               <div>
                  <h3 className="text-lg font-serif font-bold border-b border-stone-300 pb-2 mb-3 text-ink">名言 (Key Quotes)</h3>
                  <div className="space-y-3">
                    {philosopher.keyQuotes.map((quote, idx) => (
                      <blockquote key={idx} className="border-l-4 border-accent pl-4 italic text-sm text-stone-600 bg-stone-50 py-2 pr-2 rounded-r">
                        "{quote}"
                      </blockquote>
                    ))}
                  </div>
               </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};