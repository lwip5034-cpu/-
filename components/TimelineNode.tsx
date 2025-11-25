import React from 'react';
import { Philosopher } from '../types';

interface TimelineNodeProps {
  philosopher: Philosopher;
  index: number;
  isLast: boolean;
  onSelect: (p: Philosopher) => void;
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({ philosopher, index, isLast, onSelect }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`timeline-item flex flex-col md:flex-row items-center w-full mb-12 relative group print:mb-8 print:block`}>
      {/* Center Line for Desktop - hidden on mobile */}
      
      {/* Content Side */}
      <div className={`w-full md:w-5/12 ${isEven ? 'md:order-1 md:text-right md:pr-8' : 'md:order-3 md:text-left md:pl-8'} flex flex-col items-center md:items-start order-2 mt-4 md:mt-0 print:w-full print:pl-16 print:text-left print:items-start`}>
        <div 
          className={`
            timeline-card bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-stone-200 w-full relative
            ${isEven ? 'md:items-end' : 'md:items-start'}
            print:shadow-none print:border-stone-300
          `}
          onClick={() => onSelect(philosopher)}
        >
           {/* Mobile Connectors (Top vertical line if not first) */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 h-4 w-0.5 bg-stone-300 md:hidden print:hidden"></div>
           
          <div className="text-accent font-bold text-sm tracking-widest uppercase mb-1 print:text-black">{philosopher.years}</div>
          <h3 className="text-2xl font-serif font-bold text-ink mb-1">{philosopher.name}</h3>
          <div className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs rounded-full mb-3 print:border print:border-stone-300">
            {philosopher.schoolOfThought}
          </div>
          <p className="text-stone-600 text-sm leading-relaxed line-clamp-3 print:line-clamp-none print:text-black">
            {philosopher.shortSummary}
          </p>
          <div className="print-hidden mt-4 text-accent text-xs font-semibold uppercase tracking-wider flex items-center gap-1 justify-center md:justify-start w-full">
            <span>点击查看详情</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Avatar / Center Point - Hidden in print to simplify layout */}
      <div className="order-1 md:order-2 flex flex-col items-center z-10 relative print-avatar print:hidden">
        <button 
          onClick={() => onSelect(philosopher)}
          className="relative group focus:outline-none"
          aria-label={`View details for ${philosopher.name}`}
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg overflow-hidden relative z-10 transition-transform duration-300 transform group-hover:scale-110 group-hover:border-accent">
            <img 
              src={`https://picsum.photos/seed/${philosopher.id * 123}/200/200`} 
              alt={philosopher.name}
              className="w-full h-full object-cover filter sepia-[.3] group-hover:sepia-0 transition-all duration-500"
            />
          </div>
          {/* Pulse effect */}
          <div className="absolute top-0 left-0 w-full h-full rounded-full bg-accent opacity-0 group-hover:animate-ping -z-0"></div>
        </button>
      </div>

      {/* Print-only dot */}
      <div className="hidden print:block absolute left-8 top-8 w-4 h-4 bg-stone-400 rounded-full border-2 border-white transform -translate-x-1/2 z-20"></div>

      {/* Empty Spacer for alternating layout */}
      <div className={`w-full md:w-5/12 order-3 ${isEven ? 'md:order-3' : 'md:order-1'} hidden md:block print:hidden`}></div>
    </div>
  );
};