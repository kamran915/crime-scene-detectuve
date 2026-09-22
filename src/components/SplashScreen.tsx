import React, { useEffect, useState } from 'react';
import { Search, ShieldAlert, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 400);
          return 100;
        }
        return prev + 12;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div 
      id="splash-screen"
      className="relative flex flex-col justify-between items-center min-h-[640px] h-full w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white p-6 overflow-hidden select-none"
    >
      {/* Background Ambience & Silhouette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-950/40 via-slate-950/80 to-black pointer-events-none" />
      
      {/* Foggy detective illustration background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none overflow-hidden">
        <div className="w-96 h-96 rounded-full bg-sky-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-16 w-80 h-96 bg-gradient-to-t from-slate-950 to-transparent flex items-end justify-center">
          {/* Stylized detective silhouette */}
          <div className="relative flex flex-col items-center">
            {/* Fedora hat */}
            <div className="w-32 h-6 bg-slate-800 rounded-full shadow-lg" />
            <div className="w-20 h-10 bg-slate-800 -mt-3 rounded-t-xl" />
            {/* Trenchcoat shoulders */}
            <div className="w-48 h-44 bg-slate-800 rounded-t-3xl -mt-2 shadow-2xl border-t border-slate-700/50" />
          </div>
        </div>
      </div>

      {/* Top Crime Tape */}
      <div className="w-full -mx-6 rotate-[-2deg] shadow-lg transform -translate-y-2">
        <div className="crime-tape-stripe py-1.5 px-4 flex items-center justify-around text-slate-950 font-black text-xs tracking-widest uppercase border-y border-amber-500/60 shadow-md">
          <span className="flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> CRIME SCENE</span>
          <span>DO NOT CROSS</span>
          <span className="hidden sm:inline">POLICE LINE</span>
          <span className="flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> EVIDENCE SECURED</span>
        </div>
      </div>

      {/* Center Branding */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center my-auto px-4"
      >
        <div className="relative mb-5">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 p-0.5 shadow-[0_0_35px_rgba(245,158,11,0.4)]">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent" />
              <Search className="w-12 h-12 text-amber-400 stroke-[2.5]" />
              <Sparkles className="w-4 h-4 text-yellow-200 absolute top-2.5 right-2.5 animate-pulse" />
            </div>
          </div>
        </div>

        <h1 className="font-['Cinzel'] text-3xl sm:text-4xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 drop-shadow-md">
          CRIME SCENE
        </h1>
        <div className="flex items-center justify-center gap-2 mt-0.5">
          <h2 className="font-['Cinzel'] text-xl sm:text-2xl font-bold tracking-widest text-slate-100 uppercase">
            DETECTIVE
          </h2>
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
        </div>

        <p className="text-slate-400 text-sm mt-3 tracking-wide max-w-xs font-medium">
          Solve the clues. Find the truth.
        </p>
      </motion.div>

      {/* Bottom Loading Progress */}
      <div className="w-full max-w-xs relative z-10 flex flex-col items-center mb-6">
        <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-slate-700/60 shadow-inner">
          <motion.div 
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full shadow-[0_0_12px_#f59e0b]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between w-full mt-2 px-1 text-xs text-slate-400 font-mono">
          <span>Loading case files...</span>
          <span className="text-amber-400 font-bold">{progress}%</span>
        </div>

        <button
          id="skip-splash-btn"
          onClick={() => {
            sound.playTap();
            onFinish();
          }}
          className="mt-4 text-xs text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-wider py-1 px-3"
        >
          Tap to skip
        </button>
      </div>

      {/* Bottom Crime Tape */}
      <div className="w-full -mx-6 rotate-[1.5deg] shadow-lg transform translate-y-3">
        <div className="crime-tape-stripe py-1.5 px-4 flex items-center justify-around text-slate-950 font-black text-xs tracking-widest uppercase border-y border-amber-500/60 shadow-md">
          <span>INVESTIGATION IN PROGRESS</span>
          <span className="hidden sm:inline">RESTRICTED AREA</span>
          <span>CRIME SCENE DETECTIVE</span>
        </div>
      </div>
    </div>
  );
};
