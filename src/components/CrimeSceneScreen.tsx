import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Pause, Play, Lightbulb, Search, Check, AlertCircle, Sparkles, Eye, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CaseData, EvidenceItem, ScreenType } from '../types';
import { sound } from '../utils/audio';

interface CrimeSceneScreenProps {
  caseData: CaseData;
  collectedEvidenceIds: string[];
  hintsRemaining: number;
  onBack: () => void;
  onCollectEvidence: (evidence: EvidenceItem) => void;
  onUseHint: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const CrimeSceneScreen: React.FC<CrimeSceneScreenProps> = ({
  caseData,
  collectedEvidenceIds,
  hintsRemaining,
  onBack,
  onCollectEvidence,
  onUseHint,
  onNavigate,
}) => {
  const [seconds, setSeconds] = useState(272); // 04:32 default
  const [isPaused, setIsPaused] = useState(false);
  const [activeHintEvidenceId, setActiveHintEvidenceId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [flashEffect, setFlashEffect] = useState(false);

  // Timer interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleHotspotClick = (evidence: EvidenceItem) => {
    sound.playEvidenceFound();
    setFlashEffect(true);
    setTimeout(() => setFlashEffect(false), 250);

    const isAlreadyCollected = collectedEvidenceIds.includes(evidence.id);
    if (!isAlreadyCollected) {
      onCollectEvidence(evidence);
    } else {
      setFeedbackMsg(`Inspecting: ${evidence.name}`);
      setTimeout(() => setFeedbackMsg(null), 2000);
      onCollectEvidence(evidence);
    }
  };

  const handleHintClick = () => {
    if (hintsRemaining <= 0) {
      alert('No hints remaining!');
      return;
    }
    const uncollected = caseData.evidenceList.find(
      (e) => !collectedEvidenceIds.includes(e.id)
    );
    if (!uncollected) {
      alert('All evidence in this crime scene has already been collected!');
      return;
    }
    sound.playHint();
    onUseHint();
    setActiveHintEvidenceId(uncollected.id);
    setFeedbackMsg(`Hint: ${uncollected.hintText}`);
    setTimeout(() => {
      setActiveHintEvidenceId(null);
      setFeedbackMsg(null);
    }, 4000);
  };

  return (
    <div 
      id="crime-scene-screen"
      className="relative flex flex-col h-full bg-slate-950 text-slate-100 select-none overflow-hidden"
    >
      {/* Flash Effect on discovery */}
      {flashEffect && (
        <div className="absolute inset-0 bg-white/40 pointer-events-none z-50 transition-opacity duration-200" />
      )}

      {/* Top Navigation & Status Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-900 bg-slate-950/95 backdrop-blur z-30">
        <div className="flex items-center gap-3">
          <button
            id="crime-scene-back-btn"
            onClick={() => {
              sound.playTap();
              onBack();
            }}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors"
            aria-label="Go Back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Evidence:</span>
            <span className="text-xs font-bold font-mono text-sky-400">
              {collectedEvidenceIds.length}/{caseData.evidenceList.length}
            </span>
          </div>
        </div>

        {/* Timer & Pause */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl font-mono text-xs font-bold text-amber-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>{formatTimer(seconds)}</span>
          </div>

          <button
            id="crime-scene-pause-btn"
            onClick={() => {
              sound.playTap();
              setIsPaused(!isPaused);
            }}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            aria-label={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? <Play className="w-4 h-4 fill-slate-400" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Feedback Banner notification */}
      {feedbackMsg && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-14 left-4 right-4 z-40 bg-sky-950/95 border border-sky-500 text-sky-200 text-xs px-4 py-2.5 rounded-xl shadow-2xl flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400 flex-shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        </motion.div>
      )}

      {/* Interactive Crime Scene Canvas Viewport */}
      <div className="relative flex-1 w-full bg-slate-950 overflow-hidden">
        {/* Crime Scene Realistic Backdrop Illustration */}
        <div className="absolute inset-0 select-none">
          <img
            src={caseData.coverImage}
            alt="Crime Scene Area"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.65] contrast-125"
          />
          {/* Moody vignette & investigation darkness */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(2,6,23,0.7)_90%)]" />

          {/* Crime Scene Caution Tape Overlay */}
          <div className="absolute top-12 -left-12 rotate-[-12deg] pointer-events-none opacity-80">
            <div className="crime-tape-stripe py-1 px-16 text-[9px] font-black text-slate-950 tracking-widest shadow-lg">
              POLICE INVESTIGATION • DO NOT CROSS
            </div>
          </div>
        </div>

        {/* Hotspots for all Evidence in the scene */}
        {caseData.evidenceList.map((evidence) => {
          const isCollected = collectedEvidenceIds.includes(evidence.id);
          const isHintActive = activeHintEvidenceId === evidence.id;

          return (
            <div
              key={evidence.id}
              id={`hotspot-${evidence.id}`}
              onClick={() => handleHotspotClick(evidence)}
              style={{
                top: `${evidence.position.y}%`,
                left: `${evidence.position.x}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              {/* Sonar Pulse if Hint Active */}
              {isHintActive && (
                <div className="absolute -inset-4 rounded-full bg-amber-400/40 animate-ping pointer-events-none" />
              )}

              {/* Pulsing Clue Pin */}
              <div
                className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-125 ${
                  isCollected
                    ? 'bg-emerald-500/80 border-2 border-emerald-300 text-slate-950 shadow-[0_0_15px_#10b981]'
                    : isHintActive
                    ? 'bg-amber-400 border-2 border-yellow-200 text-slate-950 shadow-[0_0_25px_#f59e0b] scale-110 animate-bounce'
                    : 'bg-sky-500/80 border-2 border-sky-300 text-slate-950 shadow-[0_0_15px_rgba(14,165,233,0.8)] animate-pulse'
                }`}
              >
                {isCollected ? (
                  <Check className="w-5 h-5 stroke-[3]" />
                ) : (
                  <Search className="w-5 h-5 stroke-[2.5]" />
                )}
              </div>

              {/* Label tooltip on hover */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-slate-950/90 border border-slate-700 text-slate-200 text-[10px] font-bold px-2 py-1 rounded-md shadow-xl z-30">
                {evidence.name} {isCollected && '✓'}
              </div>
            </div>
          );
        })}

        {/* Ambient Grid overlay and flashlight crosshairs */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="px-4 py-3 bg-slate-950/95 border-t border-slate-900 backdrop-blur z-30 flex items-center justify-between gap-2">
        {/* Hint Button */}
        <button
          id="crime-scene-hint-btn"
          onClick={handleHintClick}
          className="flex items-center gap-2 py-2 px-3.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 hover:bg-slate-850 hover:text-amber-200 text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <Lightbulb className="w-4 h-4 text-amber-400 fill-amber-400/20" />
          <span>Hint ({hintsRemaining})</span>
        </button>

        {/* Navigation Quick Links */}
        <div className="flex items-center gap-2">
          <button
            id="jump-to-suspects-btn"
            onClick={() => {
              sound.playTap();
              onNavigate('suspects');
            }}
            className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Suspects
          </button>

          <button
            id="jump-to-board-btn"
            onClick={() => {
              sound.playTap();
              onNavigate('investigation-board');
            }}
            className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Board
          </button>

          <button
            id="jump-to-verdict-btn"
            onClick={() => {
              sound.playTap();
              onNavigate('final-verdict');
            }}
            className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] active:scale-95"
          >
            Verdict
          </button>
        </div>
      </div>
    </div>
  );
};
