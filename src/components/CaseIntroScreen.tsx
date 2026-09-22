import React from 'react';
import { ChevronLeft, MapPin, AlertCircle, Play, ShieldAlert, Users, Footprints } from 'lucide-react';
import { CaseData } from '../types';
import { sound } from '../utils/audio';

interface CaseIntroScreenProps {
  caseData: CaseData;
  onBack: () => void;
  onStart: () => void;
}

export const CaseIntroScreen: React.FC<CaseIntroScreenProps> = ({
  caseData,
  onBack,
  onStart,
}) => {
  return (
    <div id="case-intro-screen" className="flex flex-col justify-between h-full bg-slate-950 text-slate-100 select-none overflow-y-auto">
      {/* Top Banner Image with Back Button */}
      <div className="relative w-full h-64 sm:h-72 bg-slate-900 flex-shrink-0">
        <img
          src={caseData.coverImage}
          alt={caseData.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter brightness-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/60" />

        {/* Top bar back button */}
        <button
          id="case-intro-back-btn"
          onClick={() => {
            sound.playTap();
            onBack();
          }}
          className="absolute top-4 left-4 p-2 rounded-xl bg-slate-950/80 backdrop-blur border border-slate-800 text-slate-200 hover:text-white transition-colors"
          aria-label="Go Back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Case Badge on Banner */}
        <div className="absolute bottom-4 left-5 right-5">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-slate-950/80 px-2.5 py-1 rounded-md border border-amber-500/40 inline-block mb-1.5">
            CASE #{caseData.caseNumber}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
            {caseData.title}
          </h1>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-5 space-y-4 flex-1">
        {/* Location & Difficulty pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Location: <strong className="text-white font-medium">{caseData.location}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <span>Difficulty:</span>
            <span
              className={`font-semibold px-2 py-0.5 rounded-md text-[11px] ${
                caseData.difficulty === 'Easy'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : caseData.difficulty === 'Medium'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}
            >
              {caseData.difficulty}
            </span>
          </div>
        </div>

        {/* Synopsis */}
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Case Briefing</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {caseData.synopsis}
          </p>
        </div>

        {/* Objectives Breakdown */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-slate-900/40 border border-slate-800 p-3 rounded-xl flex items-center gap-2.5">
            <Footprints className="w-4 h-4 text-sky-400" />
            <div className="text-[11px]">
              <div className="text-slate-400">Evidence</div>
              <div className="font-bold text-white">{caseData.evidenceList.length} Hidden Clues</div>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-3 rounded-xl flex items-center gap-2.5">
            <Users className="w-4 h-4 text-amber-400" />
            <div className="text-[11px]">
              <div className="text-slate-400">Persons of Interest</div>
              <div className="font-bold text-white">{caseData.suspects.length} Suspects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="p-5 pt-2 border-t border-slate-900 bg-slate-950">
        <button
          id="start-investigation-btn"
          onClick={() => {
            sound.playTap();
            onStart();
          }}
          className="w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(14,165,233,0.35)] flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Start Investigation</span>
        </button>
      </div>
    </div>
  );
};
