import React, { useState } from 'react';
import { UserProfile, Achievement } from '../types';
import { Shield, Award, Edit3, ChevronRight, Trophy, Zap, Clock, Target, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface ProfileScreenProps {
  user: UserProfile;
  achievements: Achievement[];
  onOpenAchievements: () => void;
  onUpdateName: (newName: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  achievements,
  onOpenAchievements,
  onUpdateName,
}) => {
  const [activeTab, setActiveTab] = useState<'Stats' | 'Achievements'>('Stats');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  const completedCount = achievements.filter((a) => a.completed).length;

  return (
    <div id="profile-screen" className="flex flex-col h-full bg-slate-950 text-slate-100 select-none overflow-y-auto pb-6">
      {/* Profile Header */}
      <div className="p-6 flex flex-col items-center text-center bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-900 relative">
        <button
          id="profile-edit-btn"
          onClick={() => {
            sound.playTap();
            setIsEditing(!isEditing);
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          aria-label="Edit Profile"
        >
          <Edit3 className="w-4 h-4" />
        </button>

        {/* Avatar */}
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 p-0.5 shadow-xl">
            <img
              src={user.avatar}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-amber-400 text-slate-950 shadow-md">
            <Shield className="w-3.5 h-3.5 fill-slate-950" />
          </div>
        </div>

        {/* Name and Rank Title */}
        {isEditing ? (
          <div className="flex items-center gap-2 mt-1">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="px-3 py-1 bg-slate-900 border border-sky-500 rounded-lg text-sm text-white text-center focus:outline-none"
            />
            <button
              onClick={() => {
                sound.playTap();
                onUpdateName(tempName || 'Detective');
                setIsEditing(false);
              }}
              className="px-2.5 py-1 bg-sky-500 text-slate-950 text-xs font-bold rounded-lg"
            >
              Save
            </button>
          </div>
        ) : (
          <h2 className="text-xl font-bold text-white tracking-wide">{user.name}</h2>
        )}

        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/40 border border-amber-500/40 px-3 py-0.5 rounded-full mt-1.5">
          {user.title}
        </span>
      </div>

      {/* Tabs: Stats | Achievements */}
      <div className="px-5 pt-4">
        <div className="grid grid-cols-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
          {(['Stats', 'Achievements'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={`profile-tab-${tab.toLowerCase()}`}
                onClick={() => {
                  sound.playTap();
                  setActiveTab(tab);
                }}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  isActive
                    ? 'bg-slate-800 text-sky-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-5 space-y-5">
        {activeTab === 'Stats' ? (
          <>
            {/* Stats Breakdown Grid (Matching mockup!) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Cases Solved
                </span>
                <span className="text-2xl font-bold text-white font-mono mt-2">
                  {user.casesSolved}
                </span>
              </div>

              <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Accuracy
                </span>
                <span className="text-2xl font-bold text-emerald-400 font-mono mt-2">
                  {user.accuracy}%
                </span>
              </div>

              <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Total Score
                </span>
                <span className="text-2xl font-bold text-amber-400 font-mono mt-2">
                  {user.totalScore.toLocaleString()}
                </span>
              </div>

              <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Hints Used
                </span>
                <span className="text-2xl font-bold text-sky-400 font-mono mt-2">
                  {user.hintsUsed}
                </span>
              </div>

              <div className="col-span-2 p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Average Case Time
                    </span>
                    <span className="text-sm font-bold text-white font-mono">
                      {user.averageTime}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  Optimal Speed
                </span>
              </div>
            </div>

            {/* Rank Progress Bar (Matching mockup!) */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Rank Progress
                    </span>
                    <h4 className="text-xs font-bold text-white">{user.title}</h4>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-amber-400">
                  {user.currentExp} / {user.maxExp}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#f59e0b]"
                  style={{
                    width: `${Math.min(100, (user.currentExp / user.maxExp) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          /* Achievements tab preview */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Earned Badges ({completedCount}/{achievements.length})
              </span>
              <button
                onClick={() => {
                  sound.playTap();
                  onOpenAchievements();
                }}
                className="text-xs text-sky-400 hover:text-sky-300 font-semibold"
              >
                View Full Wall
              </button>
            </div>

            <div className="space-y-2.5">
              {achievements.map((a) => (
                <div
                  key={a.id}
                  className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        a.completed
                          ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40'
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}
                    >
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">{a.title}</h5>
                      <p className="text-[11px] text-slate-400">{a.description}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      a.completed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {a.completed ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
