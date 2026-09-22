import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EvidenceItem } from '../types';
import { CheckCircle2, Eye, LayoutGrid, X, AlertCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface EvidenceModalProps {
  isOpen: boolean;
  evidence: EvidenceItem | null;
  collectedList: EvidenceItem[];
  onClose: () => void;
  onViewDetails: (evidence: EvidenceItem) => void;
  onAddToBoard: (evidence: EvidenceItem) => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  isOpen,
  evidence,
  collectedList,
  onClose,
  onViewDetails,
  onAddToBoard,
}) => {
  if (!isOpen || !evidence) return null;

  return (
    <AnimatePresence>
      <div 
        id="evidence-modal-backdrop"
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4 select-none"
      >
        <motion.div
          id="evidence-collected-modal"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full max-w-md bg-slate-900 border-t sm:border border-slate-700/80 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <h3 className="text-base font-bold text-white tracking-wide">Evidence Collected</h3>
            </div>
            <button
              id="close-evidence-modal-btn"
              onClick={() => {
                sound.playTap();
                onClose();
              }}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Evidence Highlight Card */}
          <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {evidence.type} CLUE • {evidence.time}
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">{evidence.name}</h4>
              </div>

              {evidence.important && (
                <span className="bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0">
                  Important
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {evidence.description}
            </p>

            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 pt-1">
              <span className="text-amber-400">Location:</span> {evidence.location}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              id="evidence-view-details-btn"
              onClick={() => {
                sound.playTap();
                onViewDetails(evidence);
              }}
              className="py-3 px-4 rounded-xl font-bold text-xs tracking-wide text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4 text-sky-400" />
              <span>View Details</span>
            </button>

            <button
              id="evidence-add-to-board-btn"
              onClick={() => {
                sound.playTap();
                onAddToBoard(evidence);
              }}
              className="py-3 px-4 rounded-xl font-bold text-xs tracking-wide text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Add to Board</span>
            </button>
          </div>

          {/* Collected Evidence Row Carousel */}
          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Collected Evidence ({collectedList.length})
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {collectedList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.playTap();
                    onViewDetails(item);
                  }}
                  className={`flex-shrink-0 w-24 p-2 rounded-xl border cursor-pointer transition-all ${
                    item.id === evidence.id
                      ? 'bg-sky-950/60 border-sky-500 text-sky-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p className="text-[10px] font-bold line-clamp-1">{item.name}</p>
                  <span className="text-[9px] font-mono text-slate-500 block truncate">{item.type}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
