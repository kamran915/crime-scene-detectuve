/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenType, CaseData, EvidenceItem, Suspect, UserProfile, Achievement } from './types';
import { CASES_DATA, INITIAL_ACHIEVEMENTS } from './data/cases';
import { sound } from './utils/audio';

import { SplashScreen } from './components/SplashScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { AuthScreen } from './components/AuthScreen';
import { HomeScreen } from './components/HomeScreen';
import { CaseSelectScreen } from './components/CaseSelectScreen';
import { CaseIntroScreen } from './components/CaseIntroScreen';
import { CrimeSceneScreen } from './components/CrimeSceneScreen';
import { EvidenceModal } from './components/EvidenceModal';
import { EvidenceDetailScreen } from './components/EvidenceDetailScreen';
import { SuspectsScreen } from './components/SuspectsScreen';
import { SuspectDetailScreen } from './components/SuspectDetailScreen';
import { InvestigationBoardScreen } from './components/InvestigationBoardScreen';
import { FinalVerdictScreen } from './components/FinalVerdictScreen';
import { CaseResultScreen } from './components/CaseResultScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AchievementsScreen } from './components/AchievementsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { BottomNavBar } from './components/BottomNavBar';
import { Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';

export default function App() {
  // Screen management
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [history, setHistory] = useState<ScreenType[]>([]);
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // User Profile
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('csd_user');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      name: 'Moazam',
      title: 'Master Detective',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      casesSolved: 12,
      accuracy: 87,
      totalScore: 4250,
      hintsUsed: 8,
      averageTime: '10:24',
      currentExp: 4250,
      maxExp: 5000,
    };
  });

  // Settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Active Case State
  const [activeCaseId, setActiveCaseId] = useState<string>('case-1');
  const [collectedEvidenceMap, setCollectedEvidenceMap] = useState<Record<string, string[]>>({
    'case-1': ['cctv-footage', 'muddy-footprint'], // Pre-collected matching the 2/5 shown on screen
  });
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [boardConnections, setBoardConnections] = useState<Array<{ fromId: string; toId: string }>>([
    { fromId: 'cctv-footage', toId: 'ahmed' },
    { fromId: 'muddy-footprint', toId: 'ahmed' },
  ]);

  // Modals & Sub-screen targets
  const [modalEvidence, setModalEvidence] = useState<EvidenceItem | null>(null);
  const [detailEvidence, setDetailEvidence] = useState<EvidenceItem | null>(null);
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null);

  // Verdict Results
  const [verdictResult, setVerdictResult] = useState<{
    accusedId: string;
    selectedEvidenceIds: string[];
    isCorrect: boolean;
    accuracy: number;
    score: number;
  } | null>(null);

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  const activeCase = CASES_DATA.find((c) => c.id === activeCaseId) || CASES_DATA[0];
  const activeCollectedList = collectedEvidenceMap[activeCaseId] || [];

  // Navigate helper with history stack
  const navigateTo = (nextScreen: ScreenType) => {
    setHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(nextScreen);
  };

  const navigateBack = () => {
    if (history.length > 0) {
      const prevScreen = history[history.length - 1];
      setHistory((prev) => prev.slice(0, prev.length - 1));
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  // Sound sync
  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  // Persist User
  useEffect(() => {
    localStorage.setItem('csd_user', JSON.stringify(user));
  }, [user]);

  // Handle Collecting Evidence
  const handleCollectEvidence = (evidence: EvidenceItem) => {
    setCollectedEvidenceMap((prev) => {
      const existing = prev[activeCaseId] || [];
      if (!existing.includes(evidence.id)) {
        return {
          ...prev,
          [activeCaseId]: [...existing, evidence.id],
        };
      }
      return prev;
    });

    // Automatically create a board connection if suspect matches
    const suspectWithEvidence = activeCase.suspects.find((s) =>
      s.connectedEvidenceIds.includes(evidence.id)
    );
    if (suspectWithEvidence) {
      setBoardConnections((prev) => [
        ...prev,
        { fromId: evidence.id, toId: suspectWithEvidence.id },
      ]);
    }

    setModalEvidence(evidence);
  };

  // Screens that show bottom nav bar
  const showBottomNav = ['home', 'cases', 'profile', 'settings'].includes(currentScreen);

  // Render Screen Body
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <SplashScreen
            onFinish={() => {
              const hasSeenOnboarding = localStorage.getItem('csd_onboarded');
              if (hasSeenOnboarding) {
                setCurrentScreen('home');
              } else {
                setCurrentScreen('onboarding');
              }
            }}
          />
        );

      case 'onboarding':
        return (
          <OnboardingScreen
            onComplete={() => {
              localStorage.setItem('csd_onboarded', 'true');
              setCurrentScreen('login');
            }}
          />
        );

      case 'login':
      case 'register':
        return (
          <AuthScreen
            initialMode={currentScreen === 'register' ? 'register' : 'login'}
            onSuccess={(data) => {
              setUser((prev) => ({ ...prev, name: data.name }));
              setCurrentScreen('home');
            }}
          />
        );

      case 'home':
        return (
          <HomeScreen
            user={user}
            cases={CASES_DATA}
            activeCase={activeCase}
            collectedEvidenceCount={activeCollectedList.length}
            onSelectCase={(caseId) => {
              setActiveCaseId(caseId);
              navigateTo('case-intro');
            }}
            onContinueActiveCase={() => {
              navigateTo('crime-scene');
            }}
            onNavigate={(screen) => {
              setCurrentScreen(screen);
            }}
          />
        );

      case 'cases':
        return (
          <CaseSelectScreen
            cases={CASES_DATA}
            activeCaseId={activeCaseId}
            onBack={navigateBack}
            onSelectCase={(caseId) => {
              setActiveCaseId(caseId);
              navigateTo('case-intro');
            }}
          />
        );

      case 'case-intro':
        return (
          <CaseIntroScreen
            caseData={activeCase}
            onBack={navigateBack}
            onStart={() => {
              navigateTo('crime-scene');
            }}
          />
        );

      case 'crime-scene':
        return (
          <CrimeSceneScreen
            caseData={activeCase}
            collectedEvidenceIds={activeCollectedList}
            hintsRemaining={hintsRemaining}
            onBack={navigateBack}
            onCollectEvidence={handleCollectEvidence}
            onUseHint={() => setHintsRemaining((prev) => Math.max(0, prev - 1))}
            onNavigate={(screen) => navigateTo(screen)}
          />
        );

      case 'evidence-detail':
        return detailEvidence ? (
          <EvidenceDetailScreen
            evidence={detailEvidence}
            onClose={navigateBack}
            onAddToBoard={() => {
              navigateTo('investigation-board');
            }}
            onGoToSuspects={() => {
              navigateTo('suspects');
            }}
          />
        ) : (
          <CrimeSceneScreen
            caseData={activeCase}
            collectedEvidenceIds={activeCollectedList}
            hintsRemaining={hintsRemaining}
            onBack={navigateBack}
            onCollectEvidence={handleCollectEvidence}
            onUseHint={() => setHintsRemaining((prev) => Math.max(0, prev - 1))}
            onNavigate={(screen) => navigateTo(screen)}
          />
        );

      case 'suspects':
        return (
          <SuspectsScreen
            caseData={activeCase}
            onBack={navigateBack}
            onSelectSuspect={(suspect) => {
              setSelectedSuspect(suspect);
              navigateTo('suspect-detail');
            }}
          />
        );

      case 'suspect-detail':
        return selectedSuspect ? (
          <SuspectDetailScreen
            suspect={selectedSuspect}
            caseData={activeCase}
            collectedEvidenceIds={activeCollectedList}
            onBack={navigateBack}
            onViewAllEvidence={() => {
              navigateTo('investigation-board');
            }}
            onAccuseSuspect={(suspectId) => {
              navigateTo('final-verdict');
            }}
          />
        ) : (
          <SuspectsScreen
            caseData={activeCase}
            onBack={navigateBack}
            onSelectSuspect={(suspect) => {
              setSelectedSuspect(suspect);
              navigateTo('suspect-detail');
            }}
          />
        );

      case 'investigation-board':
        return (
          <InvestigationBoardScreen
            caseData={activeCase}
            collectedEvidenceIds={activeCollectedList}
            boardConnections={boardConnections}
            onBack={navigateBack}
            onGoToVerdict={() => {
              navigateTo('final-verdict');
            }}
            onSelectEvidence={(evidence) => {
              setDetailEvidence(evidence);
              navigateTo('evidence-detail');
            }}
            onSelectSuspect={(suspect) => {
              setSelectedSuspect(suspect);
              navigateTo('suspect-detail');
            }}
          />
        );

      case 'final-verdict':
        return (
          <FinalVerdictScreen
            caseData={activeCase}
            collectedEvidenceIds={activeCollectedList}
            initialAccusedId={selectedSuspect?.id}
            onBack={navigateBack}
            onSubmitVerdict={(result) => {
              setVerdictResult(result);
              if (result.isCorrect) {
                setUser((prev) => ({
                  ...prev,
                  casesSolved: prev.casesSolved + 1,
                  totalScore: prev.totalScore + result.score,
                  currentExp: Math.min(prev.maxExp, prev.currentExp + result.score),
                }));
              }
              navigateTo('case-result');
            }}
          />
        );

      case 'case-result':
        return (
          <CaseResultScreen
            caseData={activeCase}
            isCorrect={verdictResult?.isCorrect ?? true}
            score={verdictResult?.score ?? 425}
            accuracy={verdictResult?.accuracy ?? 87}
            timeTaken="08:42"
            accusedSuspect={
              activeCase.suspects.find((s) => s.id === verdictResult?.accusedId) ||
              activeCase.suspects.find((s) => s.id === activeCase.culpritId) ||
              activeCase.suspects[1]
            }
            onNextCase={() => {
              // Switch to case 2 or reset
              setActiveCaseId('case-2');
              navigateTo('case-intro');
            }}
            onReviewCase={() => {
              navigateTo('investigation-board');
            }}
          />
        );

      case 'profile':
        return (
          <ProfileScreen
            user={user}
            achievements={achievements}
            onOpenAchievements={() => navigateTo('achievements')}
            onUpdateName={(newName) => setUser((prev) => ({ ...prev, name: newName }))}
          />
        );

      case 'achievements':
        return (
          <AchievementsScreen
            achievements={achievements}
            onBack={navigateBack}
          />
        );

      case 'settings':
        return (
          <SettingsScreen
            soundEnabled={soundEnabled}
            notificationsEnabled={notificationsEnabled}
            darkMode={darkMode}
            onToggleSound={() => setSoundEnabled(!soundEnabled)}
            onToggleNotifications={() => setNotificationsEnabled(!notificationsEnabled)}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
            onLogout={() => {
              setCurrentScreen('login');
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center sm:p-4 text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      {/* Top Device Bar & Quick Screen Switcher (for convenience in AI Studio preview) */}
      <header className="w-full max-w-md flex items-center justify-between px-3 py-2 text-xs text-slate-400 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="font-['Cinzel'] font-bold text-amber-400 text-xs tracking-wider">
            CRIME SCENE DETECTIVE
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:text-white transition-colors"
            title="Toggle mobile device frame"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Full</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Phone</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container / Mobile Device Frame */}
      <main
        className={`w-full transition-all duration-300 relative flex flex-col ${
          isMobileFrame
            ? 'max-w-[420px] h-[860px] max-h-[96vh] rounded-[42px] border-[8px] border-slate-850 shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.1)] overflow-hidden'
            : 'max-w-2xl h-[92vh] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden'
        }`}
      >
        {/* Mobile Device Status Bar (9:41) */}
        {isMobileFrame && (
          <div className="w-full bg-slate-950 px-6 pt-3 pb-1 flex items-center justify-between text-xs font-semibold text-slate-300 select-none z-30 flex-shrink-0">
            <span>9:41</span>
            {/* Dynamic Island / Notch */}
            <div className="w-24 h-4 bg-black rounded-full border border-slate-800/60 shadow-inner flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-slate-900" />
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Screen Viewport */}
        <div className="flex-1 w-full overflow-hidden flex flex-col relative bg-slate-950">
          {renderScreen()}

          {/* Evidence Collected Modal */}
          <EvidenceModal
            isOpen={!!modalEvidence}
            evidence={modalEvidence}
            collectedList={activeCase.evidenceList.filter((e) =>
              activeCollectedList.includes(e.id)
            )}
            onClose={() => setModalEvidence(null)}
            onViewDetails={(evidence) => {
              setModalEvidence(null);
              setDetailEvidence(evidence);
              navigateTo('evidence-detail');
            }}
            onAddToBoard={(evidence) => {
              setModalEvidence(null);
              navigateTo('investigation-board');
            }}
          />
        </div>

        {/* Bottom Navigation Bar */}
        {showBottomNav && (
          <BottomNavBar
            currentScreen={currentScreen}
            onNavigate={(screen) => {
              setCurrentScreen(screen);
            }}
          />
        )}

        {/* Mobile Device Home Bar indicator */}
        {isMobileFrame && (
          <div className="w-full bg-slate-950 py-1.5 flex justify-center z-30 flex-shrink-0">
            <div className="w-32 h-1 bg-slate-600 rounded-full" />
          </div>
        )}
      </main>
    </div>
  );
}
