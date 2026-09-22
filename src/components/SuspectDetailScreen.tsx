import React, { useState } from 'react';
import { ChevronLeft, MessageSquare, AlertTriangle, ShieldCheck, HelpCircle, ArrowRight, Eye, Send } from 'lucide-react';
import { Suspect, CaseData, EvidenceItem } from '../types';
import { sound } from '../utils/audio';

interface SuspectDetailScreenProps {
  suspect: Suspect;
  caseData: CaseData;
  collectedEvidenceIds: string[];
  onBack: () => void;
  onViewAllEvidence: () => void;
  onAccuseSuspect: (suspectId: string) => void;
}

export const SuspectDetailScreen: React.FC<SuspectDetailScreenProps> = ({
  suspect,
  caseData,
  collectedEvidenceIds,
  onBack,
  onViewAllEvidence,
  onAccuseSuspect,
}) => {
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(
    suspect.interrogation.length > 0 ? suspect.interrogation[0].id : null
  );

  const connectedEvidences = caseData.evidenceList.filter((e) =>
    suspect.connectedEvidenceIds.includes(e.id)
  );

  return (
    <div 
      id="suspect-detail-screen"
      className="flex flex-col h-full bg-slate-950 text-slate-100 select-none overflow-y-auto"
    >
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
        <button
          id="suspect-detail-back-btn"
          onClick={() => {
            sound.playTap();
            onBack();
          }}
          className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors"
          aria-label="Go Back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-base font-bold text-white tracking-wide">Suspect Profile</h2>
        <div className="w-8" />
      </div>

      <div className="p-5 space-y-5">
        {/* Suspect Header Card */}
        <div className="flex flex-col items-center text-center p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden mb-3 border-2 border-slate-700 shadow-lg">
            <img
              src={suspect.avatar}
              alt={suspect.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-95"
            />
          </div>

          <h3 className="text-xl font-bold text-white">{suspect.name}</h3>
          <span className="text-xs font-mono text-sky-400 font-semibold bg-sky-950/60 px-2.5 py-0.5 rounded-full border border-sky-800/60 mt-1">
            {suspect.role}
          </span>
          <p className="text-xs text-slate-400 max-w-xs mt-2">{suspect.bio}</p>
        </div>

        {/* Motive & Alibi */}
        <div className="grid grid-cols-1 gap-2.5">
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 flex-shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Suspected Motive
              </span>
              <p className="text-xs text-slate-200 font-medium mt-0.5">{suspect.motive}</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Claimed Alibi
              </span>
              <p className="text-xs text-emerald-300 font-medium mt-0.5">{suspect.alibi}</p>
            </div>
          </div>
        </div>

        {/* Evidence Connection Section (Matching Mockup!) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Evidence Connection
            </h4>
            <span className="text-[11px] font-mono text-slate-400">
              {connectedEvidences.length} linked clues
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {connectedEvidences.length > 0 ? (
              connectedEvidences.map((item) => {
                const isFound = collectedEvidenceIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`p-2 rounded-xl border flex flex-col items-center text-center space-y-1 ${
                      isFound
                        ? 'bg-slate-900 border-sky-500/50 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center">
                      <Eye className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <span className="text-[10px] font-bold truncate w-full">{item.name}</span>
                    <span className="text-[9px] font-mono text-slate-400">{isFound ? 'Discovered' : 'Pending'}</span>
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 py-3 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
                No direct physical evidence links this suspect to the scene.
              </div>
            )}
          </div>
        </div>

        {/* Interactive Interrogation / Questioning Room */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span>Interrogation Records</span>
          </div>

          <div className="space-y-2">
            {suspect.interrogation.map((qa) => {
              const isOpen = activeQuestionId === qa.id;
              return (
                <div
                  key={qa.id}
                  className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      sound.playTap();
                      setActiveQuestionId(isOpen ? null : qa.id);
                    }}
                    className="w-full p-3 text-left flex items-center justify-between text-xs font-semibold text-white hover:text-sky-300 transition-colors"
                  >
                    <span className="pr-2">{qa.question}</span>
                    <span className="text-xs text-sky-400 flex-shrink-0 font-mono">
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-3 pt-1 border-t border-slate-800 bg-slate-950/60 text-xs text-slate-300 leading-relaxed font-mono">
                      <span className="text-amber-400 font-bold block mb-1">SUSPECT RESPONSE:</span>
                      {qa.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2.5">
          <button
            id="view-all-evidence-btn"
            onClick={() => {
              sound.playTap();
              onViewAllEvidence();
            }}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-xs tracking-wide text-white bg-slate-900 hover:bg-slate-850 border border-slate-850 transition-colors flex items-center justify-center gap-2"
          >
            <span>View All Evidence</span>
          </button>

          <button
            id="accuse-suspect-btn"
            onClick={() => {
              sound.playTap();
              onAccuseSuspect(suspect.id);
            }}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-xs tracking-wide text-white bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Accuse {suspect.name} in Verdict</span>
          </button>
        </div>
      </div>
    </div>
  );
};
