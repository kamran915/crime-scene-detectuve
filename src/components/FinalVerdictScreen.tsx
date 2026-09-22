import React, { useState } from 'react';
import { ChevronLeft, Check, AlertCircle, Gavel, ShieldCheck } from 'lucide-react';
import { CaseData, Suspect, EvidenceItem } from '../types';
import { sound } from '../utils/audio';

interface FinalVerdictScreenProps {
  caseData: CaseData;
  collectedEvidenceIds: string[];
  initialAccusedId?: string | null;
  onBack: () => void;
  onSubmitVerdict: (result: {
    accusedId: string;
    selectedEvidenceIds: string[];
    isCorrect: boolean;
    accuracy: number;
    score: number;
  }) => void;
}

export const FinalVerdictScreen: React.FC<FinalVerdictScreenProps> = ({
  caseData,
  collectedEvidenceIds,
  initialAccusedId,
  onBack,
  onSubmitVerdict,
}) => {
  const [selectedSuspectId, setSelectedSuspectId] = useState<string>(
    initialAccusedId || caseData.suspects[0]?.id || ''
  );
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState<string[]>([
    'cctv-footage',
    'phone-ping',
    'muddy-footprint',
  ]);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleEvidence = (id: string) => {
    sound.playTap();
    if (selectedEvidenceIds.includes(id)) {
      setSelectedEvidenceIds(selectedEvidenceIds.filter((item) => item !== id));
    } else {
      setSelectedEvidenceIds([...selectedEvidenceIds, id]);
    }
  };

  const handleSubmit = () => {
    if (!selectedSuspectId) {
      setErrorMsg('Please select a prime suspect!');
      return;
    }
    if (selectedEvidenceIds.length === 0) {
      setErrorMsg('Please select at least one piece of supporting evidence!');
      return;
    }

    sound.playGavel();

    const isCorrectSuspect = selectedSuspectId === caseData.culpritId;
    
    // Calculate accuracy based on correct culprit & crucial evidence selected
    const crucialSelected = selectedEvidenceIds.filter((id) =>
      caseData.crucialEvidenceIds.includes(id)
    ).length;
    
    const accuracy = isCorrectSuspect
      ? Math.round(75 + (crucialSelected / caseData.crucialEvidenceIds.length) * 22)
      : Math.round(20 + (crucialSelected / caseData.crucialEvidenceIds.length) * 20);

    const baseScore = isCorrectSuspect ? 425 : 120;
    const evidenceBonus = crucialSelected * 25;
    const finalScore = Math.min(500, baseScore + (isCorrectSuspect ? evidenceBonus / 3 : 0));

    onSubmitVerdict({
      accusedId: selectedSuspectId,
      selectedEvidenceIds,
      isCorrect: isCorrectSuspect,
      accuracy,
      score: Math.round(finalScore),
    });
  };

  return (
    <div 
      id="final-verdict-screen"
      className="flex flex-col justify-between h-full bg-slate-950 text-slate-100 select-none overflow-y-auto"
    >
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            id="verdict-back-btn"
            onClick={() => {
              sound.playTap();
              onBack();
            }}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors"
            aria-label="Go Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-white tracking-wide">Final Verdict</h2>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
          <Gavel className="w-3.5 h-3.5" />
          <span>Case Resolution</span>
        </div>
      </div>

      <div className="p-5 space-y-6 flex-1">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Question: Who committed the crime? */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
            Who committed the crime?
          </h3>

          <div className="space-y-2">
            {caseData.suspects.map((suspect) => {
              const isSelected = selectedSuspectId === suspect.id;
              return (
                <div
                  key={suspect.id}
                  id={`verdict-suspect-${suspect.id}`}
                  onClick={() => {
                    sound.playTap();
                    setSelectedSuspectId(suspect.id);
                    setErrorMsg('');
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-sky-950/80 border-sky-400 text-white shadow-[0_0_15px_rgba(14,165,233,0.25)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={suspect.avatar}
                      alt={suspect.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="text-sm font-bold">{suspect.name}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">{suspect.role}</p>
                    </div>
                  </div>

                  {/* Radio indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-sky-400 bg-sky-400 text-slate-950'
                        : 'border-slate-600 bg-slate-950'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-slate-950" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Supporting Evidence Checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Supporting Evidence
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              {selectedEvidenceIds.length} attached
            </span>
          </div>

          <div className="space-y-2">
            {caseData.evidenceList.map((evidence) => {
              const isChecked = selectedEvidenceIds.includes(evidence.id);
              const isCrucial = caseData.crucialEvidenceIds.includes(evidence.id);

              return (
                <div
                  key={evidence.id}
                  id={`verdict-evidence-${evidence.id}`}
                  onClick={() => toggleEvidence(evidence.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isChecked
                      ? 'bg-slate-900 border-emerald-500/70 text-white'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                          : 'border-slate-700 bg-slate-950'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div>
                      <p className="text-xs font-bold">{evidence.name}</p>
                      <span className="text-[10px] font-mono text-slate-500">
                        {evidence.type} • {evidence.location}
                      </span>
                    </div>
                  </div>

                  {evidence.important && (
                    <span className="text-[9px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded-full uppercase">
                      Critical
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-5 pt-3 border-t border-slate-900 bg-slate-950 sticky bottom-0 z-20">
        <button
          id="submit-verdict-btn"
          onClick={handleSubmit}
          className="w-full py-4 px-6 rounded-2xl font-bold text-sm tracking-wide text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 hover:from-emerald-300 hover:to-teal-300 active:scale-[0.99] transition-all shadow-[0_4px_25px_rgba(52,211,153,0.35)] flex items-center justify-center gap-2"
        >
          <Gavel className="w-4 h-4 fill-slate-950" />
          <span>Submit Verdict</span>
        </button>
      </div>
    </div>
  );
};
