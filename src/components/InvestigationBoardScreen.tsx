import React, { useState } from 'react';
import { ChevronLeft, Share2, Pin, Check, Plus, AlertCircle, ArrowRight } from 'lucide-react';
import { CaseData, EvidenceItem, Suspect } from '../types';
import { sound } from '../utils/audio';

interface InvestigationBoardScreenProps {
  caseData: CaseData;
  collectedEvidenceIds: string[];
  boardConnections: Array<{ fromId: string; toId: string }>;
  onBack: () => void;
  onGoToVerdict: () => void;
  onSelectEvidence: (evidence: EvidenceItem) => void;
  onSelectSuspect: (suspect: Suspect) => void;
}

export const InvestigationBoardScreen: React.FC<InvestigationBoardScreenProps> = ({
  caseData,
  collectedEvidenceIds,
  boardConnections,
  onBack,
  onGoToVerdict,
  onSelectEvidence,
  onSelectSuspect,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Evidence' | 'Suspects' | 'Connections'>('All');
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

  const collectedEvidences = caseData.evidenceList.filter((e) =>
    collectedEvidenceIds.includes(e.id)
  );

  return (
    <div 
      id="investigation-board-screen"
      className="flex flex-col h-full bg-slate-950 text-slate-100 select-none overflow-hidden"
    >
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-900 bg-slate-950/90 backdrop-blur z-20">
        <div className="flex items-center gap-3">
          <button
            id="board-back-btn"
            onClick={() => {
              sound.playTap();
              onBack();
            }}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors"
            aria-label="Go Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5">
            <Pin className="w-4 h-4 text-amber-400 fill-amber-400/30" />
            <h2 className="text-base font-bold text-white tracking-wide">Investigation Board</h2>
          </div>
        </div>

        <button
          id="board-go-to-verdict-btn"
          onClick={() => {
            sound.playTap();
            onGoToVerdict();
          }}
          className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95"
        >
          <span>Verdict</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Corkboard Pinboard Area */}
      <div className="relative flex-1 w-full corkboard-bg overflow-y-auto p-4 sm:p-6 shadow-inner border-y border-amber-950">
        {/* Subtle grid pins texture */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Board Content Grid */}
        <div className="relative z-10 space-y-6 max-w-lg mx-auto pb-8">
          {/* Section: Prime Suspects row (Polaroid style) */}
          {(activeFilter === 'All' || activeFilter === 'Suspects') && (
            <div>
              <div className="flex items-center gap-2 mb-3 bg-black/60 px-3 py-1 rounded-lg w-max backdrop-blur border border-amber-900/50">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-200">
                  Suspects Dossier
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {caseData.suspects.map((suspect) => {
                  const isAhmed = suspect.id === 'ahmed';
                  return (
                    <div
                      key={suspect.id}
                      onClick={() => {
                        sound.playTap();
                        onSelectSuspect(suspect);
                      }}
                      className={`relative bg-amber-50 text-slate-950 p-2.5 pb-3 rounded-lg shadow-xl cursor-pointer transform hover:-translate-y-1 transition-all ${
                        isAhmed ? 'ring-2 ring-rose-500 rotate-[-1deg]' : 'rotate-[1deg]'
                      }`}
                    >
                      {/* Red Push Pin */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-600 border border-rose-900 shadow-md flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-60" />
                      </div>

                      {/* Photo */}
                      <div className="w-full h-24 rounded overflow-hidden bg-slate-900 mb-2">
                        <img
                          src={suspect.avatar}
                          alt={suspect.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter contrast-110"
                        />
                      </div>

                      <div className="text-center">
                        <p className="font-['Cinzel'] font-bold text-xs truncate leading-tight">
                          {suspect.name}
                        </p>
                        <p className="text-[10px] font-mono text-slate-600 font-medium">
                          {suspect.role}
                        </p>
                      </div>

                      {/* Red connection string badge */}
                      {isAhmed && (
                        <div className="absolute -bottom-2 right-2 bg-rose-600 text-white text-[9px] font-mono px-1.5 py-0.5 rounded shadow">
                          Prime Link
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Red Connecting String Simulation */}
          {(activeFilter === 'All' || activeFilter === 'Connections') && (
            <div className="relative my-2 py-2 flex items-center justify-center">
              <div className="w-full h-0.5 bg-rose-600/80 shadow-[0_0_8px_#e11d48]" />
              <div className="absolute bg-rose-600 text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-rose-400">
                FORENSIC CONNECTIONS ESTABLISHED
              </div>
            </div>
          )}

          {/* Section: Evidence Notes (Sticky notes & evidence tags) */}
          {(activeFilter === 'All' || activeFilter === 'Evidence') && (
            <div>
              <div className="flex items-center gap-2 mb-3 bg-black/60 px-3 py-1 rounded-lg w-max backdrop-blur border border-amber-900/50">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-200">
                  Collected Clues & Forensic Reports ({collectedEvidences.length}/{caseData.evidenceList.length})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {collectedEvidences.map((evidence) => {
                  return (
                    <div
                      key={evidence.id}
                      onClick={() => {
                        sound.playTap();
                        onSelectEvidence(evidence);
                      }}
                      className="relative bg-slate-900/95 text-slate-100 p-3 rounded-xl border border-amber-500/30 shadow-2xl cursor-pointer hover:border-sky-400 transition-all flex flex-col justify-between"
                    >
                      {/* Yellow / brass push pin */}
                      <div className="absolute -top-1.5 left-3 w-3 h-3 rounded-full bg-amber-400 border border-amber-700 shadow" />

                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 mb-1">
                          <span>{evidence.type}</span>
                          <span>{evidence.time}</span>
                        </div>
                        <h5 className="font-bold text-xs text-white line-clamp-1">
                          {evidence.name}
                        </h5>
                        <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {evidence.description}
                        </p>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[9px] font-mono text-slate-400">
                        <span className="text-sky-400 font-semibold">Inspect</span>
                        <span>{evidence.important ? '★ Critical' : 'Detail'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Filter Navigation Tabs (Matching image #15: Evidence, Suspects, Connections) */}
      <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-900 flex items-center justify-around z-20">
        {(['All', 'Evidence', 'Suspects', 'Connections'] as const).map((tab) => {
          const isActive = activeFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                sound.playTap();
                setActiveFilter(tab);
              }}
              className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(14,165,233,0.3)]'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
};
