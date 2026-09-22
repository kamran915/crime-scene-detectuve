import React from 'react';
import { Bell, ArrowRight, Search, Shield, ChevronRight, Play } from 'lucide-react';
import { CaseData, UserProfile, ScreenType } from '../types';
import { sound } from '../utils/audio';

interface HomeScreenProps {
  user: UserProfile;
  cases: CaseData[];
  activeCase: CaseData;
  collectedEvidenceCount: number;
  onSelectCase: (caseId: string) => void;
  onContinueActiveCase: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  cases,
  activeCase,
  collectedEvidenceCount,
  onSelectCase,
  onContinueActiveCase,
  onNavigate,
}) => {
  return (
    <div id="home-screen" className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto pb-6 select-none">
      {/* Top Header with User Profile */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
        <div 
          onClick={() => {
            sound.playTap();
            onNavigate('profile');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border-2 border-amber-400/80 shadow-md group-hover:scale-105 transition-transform"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">{user.name}</h3>
              <Shield className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            </div>
            <p className="text-[11px] text-amber-400 font-medium tracking-wide">{user.title}</p>
          </div>
        </div>

        <button
          id="home-notifications-btn"
          onClick={() => {
            sound.playTap();
            alert('Notifications: New forensic briefing available for Case #1');
          }}
          className="relative p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>
      </div>

      <div className="px-5 pt-4 space-y-5">
        {/* Banner Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-4 shadow-xl">
          <div className="absolute -right-4 -bottom-6 opacity-10 pointer-events-none">
            <Search className="w-36 h-36 text-amber-400" />
          </div>
          <div className="relative z-10 flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-lg bg-amber-400/20 flex items-center justify-center">
              <Search className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <h2 className="font-['Cinzel'] text-sm font-black tracking-wider text-amber-400">
              CRIME SCENE DETECTIVE
            </h2>
          </div>
          <p className="text-xs text-slate-300 tracking-wide font-medium mt-1">
            Solve Cases • Find Clues • Become the Best
          </p>
        </div>

        {/* Continue Case Hero Card */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Continue Case
            </h4>
            <span className="text-[11px] font-mono text-sky-400 bg-sky-950/60 border border-sky-800/60 px-2 py-0.5 rounded-md">
              In Progress
            </span>
          </div>

          <div
            id="continue-case-card"
            onClick={() => {
              sound.playTap();
              onContinueActiveCase();
            }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-700/80 p-4 shadow-xl hover:border-sky-500/60 transition-all active:scale-[0.99]"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                  Case {activeCase.caseNumber}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                  {activeCase.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {collectedEvidenceCount}/{activeCase.evidenceList.length} evidence found
                </p>
              </div>

              <div className="w-11 h-11 rounded-full bg-sky-500 group-hover:bg-sky-400 text-slate-950 flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.4)] group-hover:scale-110 transition-all flex-shrink-0">
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-4 overflow-hidden">
              <div
                className="bg-sky-400 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.max(15, (collectedEvidenceCount / activeCase.evidenceList.length) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Available Cases Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Available Cases
            </h4>
            <button
              id="see-all-cases-btn"
              onClick={() => {
                sound.playTap();
                onNavigate('cases');
              }}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-0.5"
            >
              <span>See All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {cases.map((c) => {
              const diffColor =
                c.difficulty === 'Easy'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : c.difficulty === 'Medium'
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-rose-500/20 text-rose-400 border-rose-500/40';

              return (
                <div
                  key={c.id}
                  id={`case-card-${c.id}`}
                  onClick={() => {
                    sound.playTap();
                    onSelectCase(c.id);
                  }}
                  className="group relative cursor-pointer overflow-hidden rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all p-2.5 flex flex-col justify-between"
                >
                  <div className="relative h-24 w-full rounded-lg overflow-hidden mb-2 bg-slate-950">
                    <img
                      src={c.coverImage}
                      alt={c.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter brightness-85 group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className={`absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded border ${diffColor}`}>
                      {c.difficulty}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 font-mono">Case {c.caseNumber}</span>
                    <h5 className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                      {c.title}
                    </h5>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{c.location}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Launch Investigation Button */}
        <div className="pt-2">
          <button
            id="start-quick-investigation-btn"
            onClick={() => {
              sound.playTap();
              onContinueActiveCase();
            }}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-xs tracking-wider uppercase text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 active:scale-[0.99] transition-all shadow-[0_4px_16px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Enter Crime Scene: Case #{activeCase.caseNumber}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
