import React, { useEffect, useState } from 'react';
import { CheckCircle2, Trophy, Clock, Target, ArrowRight, Eye, RefreshCw, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CaseData, Suspect } from '../types';
import { sound } from '../utils/audio';

interface CaseResultScreenProps {
  caseData: CaseData;
  isCorrect: boolean;
  score: number;
  accuracy: number;
  timeTaken: string;
  accusedSuspect: Suspect;
  onNextCase: () => void;
  onReviewCase: () => void;
}

export const CaseResultScreen: React.FC<CaseResultScreenProps> = ({
  caseData,
  isCorrect,
  score,
  accuracy,
  timeTaken,
  accusedSuspect,
  onNextCase,
  onReviewCase,
}) => {
  const [showConfession, setShowConfession] = useState(false);

  useEffect(() => {
    sound.playCaseSolved();
    if (isCorrect) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#34d399', '#38bdf8', '#fbbf24', '#f43f5e'],
        });
      } catch {
        // confetti fallback
      }
    }
  }, [isCorrect]);

  return (
    <div 
      id="case-result-screen"
      className="flex flex-col justify-between h-full bg-slate-950 text-slate-100 select-none overflow-y-auto p-5"
    >
      <div className="space-y-6 max-w-sm mx-auto w-full my-auto py-2">
        {/* Neon Badge Header */}
        <div className="text-center">
          <div
            className={`inline-block py-2 px-6 rounded-2xl border-2 tracking-widest font-black uppercase text-sm sm:text-base shadow-2xl ${
              isCorrect
                ? 'border-emerald-400 bg-emerald-950/40 text-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.3)] animate-pulse'
                : 'border-rose-500 bg-rose-950/40 text-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.3)]'
            }`}
          >
            {isCorrect ? 'CASE SOLVED!' : 'CASE FAILED!'}
          </div>
        </div>

        {/* Culprit Profile Reveal Card */}
        <div className="flex flex-col items-center text-center p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden mb-3 border-2 border-slate-700 shadow-md">
            <img
              src={accusedSuspect.avatar}
              alt={accusedSuspect.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter contrast-110"
            />
          </div>

          <h3 className="text-base font-bold text-white">
            The culprit is {accusedSuspect.name}
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-0.5">{accusedSuspect.role}</p>

          <p className="text-xs text-slate-300 leading-relaxed mt-3 px-2 font-medium">
            {isCorrect
              ? caseData.reconstruction.summary
              : `${accusedSuspect.name} has a verified alibi. The true perpetrator was not identified with conclusive evidence.`}
          </p>

          {isCorrect && (
            <button
              onClick={() => {
                sound.playTap();
                setShowConfession(!showConfession);
              }}
              className="mt-3 text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showConfession ? 'Hide Confession' : 'Read Suspect Confession'}</span>
            </button>
          )}

          {showConfession && (
            <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs italic font-serif leading-relaxed text-left">
              {caseData.reconstruction.culpritConfession}
            </div>
          )}
        </div>

        {/* Stats Grid: Time Taken, Score, Accuracy (Matching Mockup!) */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              Time Taken
            </span>
            <span className="text-sm font-bold text-white font-mono mt-1 block">
              {timeTaken}
            </span>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              Score
            </span>
            <span className="text-sm font-bold text-amber-400 font-mono mt-1 block">
              {score} / 500
            </span>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              Accuracy
            </span>
            <span className="text-sm font-bold text-emerald-400 font-mono mt-1 block">
              {accuracy}%
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons (Next Case & View Details) */}
      <div className="space-y-2.5 max-w-sm mx-auto w-full pt-4">
        <button
          id="next-case-btn"
          onClick={() => {
            sound.playTap();
            onNextCase();
          }}
          className="w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(14,165,233,0.35)] flex items-center justify-center gap-2"
        >
          <span>Next Case</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <button
          id="result-review-btn"
          onClick={() => {
            sound.playTap();
            onReviewCase();
          }}
          className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs tracking-wide text-slate-300 bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800 transition-colors flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          <span>View Investigation Details</span>
        </button>
      </div>
    </div>
  );
};
