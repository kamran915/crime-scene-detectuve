import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Footprints, Search, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const ONBOARDING_SLIDES = [
  {
    id: 1,
    title: 'Explore the Crime Scene',
    subtitle: 'Find hidden evidence, collect clues and uncover the truth.',
    icon: Search,
    color: 'from-amber-500 to-yellow-400',
    accentBorder: 'border-amber-500/30',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80',
    graphicType: 'scene'
  },
  {
    id: 2,
    title: 'Analyze the Evidence',
    subtitle: 'Examine clues, connect the dots and build your case.',
    icon: Footprints,
    color: 'from-sky-500 to-blue-400',
    accentBorder: 'border-sky-500/30',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=80',
    graphicType: 'evidence'
  },
  {
    id: 3,
    title: 'Find the Culprit',
    subtitle: 'Question suspects, analyze motives and solve the mystery.',
    icon: Users,
    color: 'from-emerald-500 to-teal-400',
    accentBorder: 'border-emerald-500/30',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80',
    graphicType: 'suspects'
  }
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    sound.playTap();
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    sound.playTap();
    onComplete();
  };

  const slide = ONBOARDING_SLIDES[currentSlide];

  return (
    <div 
      id="onboarding-screen"
      className="relative flex flex-col justify-between h-full min-h-[640px] w-full bg-slate-950 text-slate-100 p-6 select-none overflow-hidden"
    >
      {/* Top bar with Skip button */}
      <div className="flex items-center justify-between z-10 w-full pt-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Case Briefing</span>
        </div>
        <button
          id="onboarding-skip-btn"
          onClick={handleSkip}
          className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-100 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Slide Carousel Content */}
      <div className="relative my-auto flex flex-col items-center text-center max-w-sm mx-auto w-full z-10 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="flex flex-col items-center w-full"
          >
            {/* Visual Graphic Card */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-8 rounded-3xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-900 group">
              <img 
                src={slide.image} 
                alt={slide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-80 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Floating thematic badge overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/70 shadow-lg">
                <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${slide.color} text-slate-950 shadow-md`}>
                  <slide.icon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Phase 0{slide.id}</p>
                  <p className="text-xs text-slate-300 font-medium">{slide.title}</p>
                </div>
              </div>
            </div>

            {/* Typography */}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              {slide.title}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed px-4 max-w-xs font-normal">
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation & Controls */}
      <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-6 z-10 pb-4">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2" aria-label="Slide Indicator">
          {ONBOARDING_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                sound.playTap();
                setCurrentSlide(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide 
                  ? 'w-7 bg-sky-400 shadow-[0_0_10px_#38bdf8]' 
                  : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          id="onboarding-next-btn"
          onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(14,165,233,0.35)] flex items-center justify-center gap-2"
        >
          <span>{currentSlide === ONBOARDING_SLIDES.length - 1 ? 'Get Started' : 'Next'}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
