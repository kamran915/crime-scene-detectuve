import React, { useState } from 'react';
import { X, Play, Pause, Camera, MapPin, Clock, Tag, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { EvidenceItem } from '../types';
import { sound } from '../utils/audio';

interface EvidenceDetailScreenProps {
  evidence: EvidenceItem;
  onClose: () => void;
  onAddToBoard: () => void;
  onGoToSuspects: () => void;
}

export const EvidenceDetailScreen: React.FC<EvidenceDetailScreenProps> = ({
  evidence,
  onClose,
  onAddToBoard,
  onGoToSuspects,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div 
      id="evidence-detail-screen"
      className="flex flex-col h-full bg-slate-950 text-slate-100 select-none overflow-y-auto"
    >
      {/* Top Bar with Security Timestamp and Close */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-900 bg-slate-950/90 backdrop-blur sticky top-0 z-20">
        <div className="flex items-center gap-2 font-mono text-xs text-amber-400">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>00:35-04-12 21:42:17</span>
        </div>

        <button
          id="close-evidence-detail-btn"
          onClick={() => {
            sound.playTap();
            onClose();
          }}
          className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="p-5 space-y-5 flex-1">
        {/* Visual Inspection Viewport */}
        <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col justify-between p-3">
          {/* Scanline overlay for forensic effect */}
          <div className="absolute inset-0 cctv-scanlines pointer-events-none opacity-40 z-10" />

          {/* Top Camera HUD */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-emerald-400">
            <div className="flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              <span>CAM_04 [REAR_LAB]</span>
            </div>
            <div className="bg-black/60 px-2 py-0.5 rounded border border-emerald-500/30">
              1080P • 30FPS • NIGHT_IR
            </div>
          </div>

          {/* Graphic Artwork Simulation inside viewfinder */}
          <div className="absolute inset-0 flex items-center justify-center">
            {evidence.previewType === 'cctv' ? (
              <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-900 via-emerald-950/20 to-slate-950">
                {/* Silhouette intruder */}
                <div className="relative flex flex-col items-center opacity-85 transform translate-y-3">
                  <div className="w-10 h-10 rounded-full bg-slate-950 border border-emerald-400/40 shadow-inner" />
                  <div className="w-20 h-28 bg-slate-900 rounded-t-xl border border-emerald-400/30 shadow-lg -mt-1" />
                  <div className="w-12 h-4 bg-amber-400/30 blur-sm -mt-2" />
                </div>
                {/* Motion detection bounding box */}
                <div className="absolute w-32 h-44 border-2 border-dashed border-rose-500/80 rounded-lg flex items-start justify-end p-1">
                  <span className="text-[9px] font-mono bg-rose-500 text-white px-1 font-bold">TARGET 98%</span>
                </div>
              </div>
            ) : evidence.previewType === 'footprint' ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-900">
                <div className="w-20 h-36 border-2 border-amber-500/50 rounded-full rotate-12 flex flex-col items-center justify-around p-2 opacity-80 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <div className="w-14 h-4 bg-amber-500/20 rounded-full" />
                  <div className="w-12 h-4 bg-amber-500/20 rounded-full" />
                  <div className="w-10 h-4 bg-amber-500/20 rounded-full" />
                  <div className="w-14 h-8 bg-amber-500/20 rounded-b-xl" />
                </div>
                {/* Metric ruler */}
                <div className="absolute bottom-3 left-4 right-4 h-5 border-t border-b border-sky-400/60 font-mono text-[9px] text-sky-400 flex justify-between items-center px-1">
                  <span>0 cm</span>
                  <span>| | | |</span>
                  <span>15 cm</span>
                  <span>| | | |</span>
                  <span>30 cm</span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-900">
                <FileText className="w-16 h-16 text-sky-400 opacity-60" />
              </div>
            )}
          </div>

          {/* Bottom Playback Bar */}
          <div className="relative z-10 bg-black/75 backdrop-blur rounded-xl p-2 flex items-center justify-between gap-3 text-xs font-mono text-slate-300 border border-slate-800">
            <button
              onClick={() => {
                sound.playTap();
                setIsPlaying(!isPlaying);
              }}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-white"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-sky-400 h-full w-2/3 rounded-full" />
            </div>
            <span>000/0115</span>
          </div>
        </div>

        {/* Clue Details Card */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">{evidence.name}</h3>
            {evidence.important && (
              <span className="bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Important
              </span>
            )}
          </div>

          {/* Key-Value Metadata Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-y border-slate-800/80 py-2.5">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Tag className="w-3.5 h-3.5 text-slate-500" />
              <span>Type: <strong className="text-slate-200 font-semibold">{evidence.type}</strong></span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Time: <strong className="text-slate-200 font-semibold">{evidence.time}</strong></span>
            </div>

            <div className="col-span-2 flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>Location: <strong className="text-slate-200 font-semibold">{evidence.location}</strong></span>
            </div>
          </div>

          {/* Description */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Forensic Observation
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {evidence.description}
            </p>
          </div>

          {evidence.notes && (
            <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200 space-y-1">
              <span className="font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider text-amber-400">
                <ShieldAlert className="w-3.5 h-3.5" /> Detective Notes
              </span>
              <p>{evidence.notes}</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            id="detail-add-to-board-btn"
            onClick={() => {
              sound.playTap();
              onAddToBoard();
            }}
            className="py-3.5 px-4 rounded-xl font-bold text-xs tracking-wide text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <span>Pin to Board</span>
          </button>

          <button
            id="detail-confront-suspects-btn"
            onClick={() => {
              sound.playTap();
              onGoToSuspects();
            }}
            className="py-3.5 px-4 rounded-xl font-bold text-xs tracking-wide text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <span>Confront Suspects</span>
          </button>
        </div>
      </div>
    </div>
  );
};
