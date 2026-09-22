import React from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, AlertCircle, ShieldQuestion } from 'lucide-react';
import { Suspect, CaseData } from '../types';
import { sound } from '../utils/audio';

interface SuspectsScreenProps {
  caseData: CaseData;
  onBack: () => void;
  onSelectSuspect: (suspect: Suspect) => void;
}

export const SuspectsScreen: React.FC<SuspectsScreenProps> = ({
  caseData,
  onBack,
  onSelectSuspect,
}) => {
  return (
    <div 
      id="suspects-screen"
      className="flex flex-col h-full bg-slate-950 text-slate-100 select-none overflow-y-auto"
    >
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            id="suspects-back-btn"
            onClick={() => {
              sound.playTap();
              onBack();
            }}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors"
            aria-label="Go Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-white tracking-wide">Suspects</h2>
        </div>

        <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
          {caseData.suspects.length} Persons of Interest
        </span>
      </div>

      {/* Suspects Card List */}
      <div className="p-5 space-y-3.5">
        {caseData.suspects.map((suspect) => {
          return (
            <div
              key={suspect.id}
              id={`suspect-card-${suspect.id}`}
              onClick={() => {
                sound.playTap();
                onSelectSuspect(suspect);
              }}
              className="group cursor-pointer rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-sky-500/50 hover:bg-slate-900 transition-all p-3.5 flex items-center gap-3.5 shadow-lg active:scale-[0.99]"
            >
              {/* Suspect Mugshot Avatar */}
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-950 border border-slate-700">
                <img
                  src={suspect.avatar}
                  alt={suspect.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform"
                />
                {suspect.isCulprit && (
                  <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-slate-950 shadow-sm" />
                )}
              </div>

              {/* Suspect Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors truncate">
                    {suspect.name}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {suspect.role}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 truncate">
                  <span className="text-slate-500 font-semibold">Motive:</span>{' '}
                  <span className="text-slate-300">{suspect.motive}</span>
                </div>

                <div className="text-[11px] text-slate-400 truncate">
                  <span className="text-slate-500 font-semibold">Alibi:</span>{' '}
                  <span className="text-emerald-400/90">{suspect.alibi}</span>
                </div>
              </div>

              {/* Action arrow */}
              <div className="p-2 rounded-xl bg-slate-800/60 text-slate-400 group-hover:text-white group-hover:bg-sky-600 transition-all flex-shrink-0">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Advice Card */}
      <div className="mt-auto p-5">
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-3.5 flex items-start gap-2.5 text-xs text-slate-400">
          <ShieldQuestion className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p>
            Tap on any suspect to review their bio, analyze linked evidence, and conduct an interactive interrogation to test their alibi.
          </p>
        </div>
      </div>
    </div>
  );
};
