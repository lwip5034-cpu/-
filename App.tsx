import React, { useState, useEffect } from 'react';
import { fetchTimelineData } from './services/geminiService';
import { TimelineData, Philosopher, LoadingState } from './types';
import { TimelineNode } from './components/TimelineNode';
import { DetailModal } from './components/DetailModal';

const App: React.FC = () => {
  const [data, setData] = useState<TimelineData | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<Philosopher | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const loadData = async () => {
    setLoadingState(LoadingState.LOADING);
    setErrorMsg('');
    try {
      const result = await fetchTimelineData();
      setData(result);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setLoadingState(LoadingState.ERROR);
      setErrorMsg('无法加载数据。请检查 API Key 配置或网络连接。');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-parchment text-ink font-sans selection:bg-accent selection:text-white pb-20 print:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-parchment/90 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all print:relative print:border-none">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-ink tracking-tight">
              法哲学史 <span className="text-accent font-light italic text-xl ml-2 print:text-ink">Jurisprudence Timeline</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-stone-500 hidden sm:block print:hidden">
              Powered by Gemini 2.5
            </div>
            {/* Print Button */}
            {loadingState === LoadingState.SUCCESS && (
              <button 
                onClick={handlePrint}
                className="print-hidden flex items-center gap-2 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md text-sm font-medium transition-colors border border-stone-300"
                title="Save as PDF / Print"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span className="hidden sm:inline">保存/分享</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12 print:py-4">
        {loadingState === LoadingState.LOADING && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <div className="w-16 h-16 border-4 border-stone-200 border-t-accent rounded-full animate-spin"></div>
            <p className="text-lg text-stone-600 font-serif animate-pulse">正在构建历史长河... Generating Timeline...</p>
          </div>
        )}

        {loadingState === LoadingState.ERROR && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
            <div className="text-5xl mb-4">📜</div>
            <h2 className="text-xl font-bold text-red-800 mb-2">Something went wrong</h2>
            <p className="text-stone-600 mb-6">{errorMsg}</p>
            <button 
              onClick={loadData}
              className="px-6 py-2 bg-accent text-white rounded-full hover:bg-stone-700 transition-colors shadow-lg hover:shadow-xl font-medium"
            >
              Retry / 重试
            </button>
          </div>
        )}

        {loadingState === LoadingState.SUCCESS && data && (
          <div className="relative">
             {/* Introduction Text */}
             <div className="text-center mb-16 max-w-2xl mx-auto print:mb-8">
               <p className="text-stone-600 leading-relaxed italic border-l-4 border-accent pl-6 py-2 text-left bg-white/50 rounded-r-lg print:bg-transparent print:text-black">
                 "法学是关于神事和人事的事情的知识，是正义和非正义的科学。" 
                 <br/>
                 <span className="text-sm font-bold not-italic mt-2 block">— 查士丁尼《法学阶梯》</span>
               </p>
             </div>

            {/* Vertical Line Container */}
            <div className="relative">
              {/* The main vertical line */}
              <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-stone-300 to-transparent h-full hidden md:block print:block print:bg-stone-300 print:left-8"></div>
              
              <div className="space-y-0">
                {data.philosophers.map((philosopher, index) => (
                  <TimelineNode 
                    key={philosopher.id}
                    philosopher={philosopher}
                    index={index}
                    isLast={index === data.philosophers.length - 1}
                    onSelect={setSelectedPhilosopher}
                  />
                ))}
              </div>
              
              {/* End Mark */}
              <div className="flex justify-center mt-12 print:hidden">
                <div className="w-3 h-3 bg-accent rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal - Hidden during print */}
      <div className="print-hidden">
        <DetailModal 
          philosopher={selectedPhilosopher} 
          onClose={() => setSelectedPhilosopher(null)} 
        />
      </div>

    </div>
  );
};

export default App;