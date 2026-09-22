import React from 'react';
import { ChevronLeft, MapPin, Clock, ArrowRight, ShieldAlert } from 'lucide-react';
import { CaseData } from '../types';
import { sound } from '../utils/audio';

interface CaseSelectScreenProps {
  cases: CaseData[];
  activeCaseId: string;
  onBack: () => void;
  onSelectCase: (caseId: string) => void;
}

export const CaseSelectScreen: React.FC<CaseSelectScreenProps> = ({
  cases,
  activeCaseId,
  onBack,
  onSelectCase,
}) => {
  return (
    <div id="case-select-screen" className="flex flex-col h-full bg-slate-950 text-slate-100 select-none overflow-y-auto">
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
        <button
          id="case-select-back-btn"
          onClick={() => {
            sound.playTap();
            onBack();
          }}
          className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors"
          aria-label="Go Back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-bold text-white tracking-wide">Select a Case</h2>
      </div>

      {/* Case List */}
      <div className="p-5 space-y-4">
        {cases.map((c) => {
          const isActive = c.id === activeCaseId;
          const diffBadge =
            c.difficulty === 'Easy'
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              : c.difficulty === 'Medium'
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              : 'bg-rose-500/20 text-rose-400 border-rose-500/40';

          return (
            <div
              key={c.id}
              id={`select-case-item-${c.id}`}
              onClick={() => {
                sound.playTap();
                onSelectCase(c.id);
              }}
              className={`group cursor-pointer rounded-2xl p-3.5 border transition-all flex gap-3.5 items-center ${
                isActive
                  ? 'bg-slate-900/90 border-sky-500/60 shadow-[0_0_20px_rgba(14,165,233,0.15)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-950">
                <img
                  src={c.coverImage}
                  alt={c.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-300"
                />
                <span className={`absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded border ${diffBadge}`}>
                  {c.difficulty}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-400 font-semibold tracking-wider">
                    CASE {c.caseNumber}
                  </span>
                  {isActive && (
                    <span className="text-[10px] text-sky-400 font-semibold bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-800/60">
                      Active
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                  {c.title}
                </h4>

                <div className="flex items-center gap-1 text-[11px] text-slate-400 truncate">
                  <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" />
                  <span className="truncate">{c.location}</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono pt-1">
                  <Clock className="w-3 h-3 text-slate-500 flex-shrink-0" />
                  <span>{Math.floor(c.targetTimeSeconds / 60)} mins investigation limit</span>
                </div>
              </div>

              <div className="p-2 text-slate-500 group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
