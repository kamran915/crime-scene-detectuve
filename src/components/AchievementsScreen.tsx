import React from 'react';
import { ChevronLeft, Trophy, CheckCircle2, Lock, Sparkles, Award } from 'lucide-react';
import { Achievement } from '../types';
import { sound } from '../utils/audio';

interface AchievementsScreenProps {
  achievements: Achievement[];
  onBack: () => void;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
  achievements,
  onBack,
}) => {
  return (
    <div id="achievements-screen" className="flex flex-col h-full bg-slate-950 text-slate-100 select-none overflow-y-auto">
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            id="achievements-back-btn"
            onClick={() => {
              sound.playTap();
              onBack();
            }}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors"
            aria-label="Go Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-white tracking-wide">Achievements</h2>
        </div>

        <div className="flex items-center gap-1 text-xs font-mono text-amber-400">
          <Trophy className="w-3.5 h-3.5" />
          <span>
            {achievements.filter((a) => a.completed).length}/{achievements.length} Unlocked
          </span>
        </div>
      </div>

      {/* Achievements List */}
      <div className="p-5 space-y-3.5">
        {achievements.map((item) => {
          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3.5 ${
                item.completed
                  ? 'bg-slate-900/90 border-amber-500/30 shadow-lg shadow-amber-950/20'
                  : 'bg-slate-900/40 border-slate-800/80 opacity-70'
              }`}
            >
              <div className="flex items-center gap-3.5">
                {/* Medal Icon Badge */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    item.completed
                      ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'bg-slate-800 text-slate-600 border border-slate-700'
                  }`}
                >
                  {item.completed ? (
                    <Award className="w-6 h-6 stroke-[2.5]" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-snug">{item.description}</p>
                </div>
              </div>

              {/* Status Tag */}
              <div className="flex-shrink-0">
                <span
                  className={`text-[10px] font-mono px-2.5 py-1 rounded-full uppercase font-bold tracking-wider ${
                    item.completed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {item.completed ? 'Completed' : 'In progress'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
