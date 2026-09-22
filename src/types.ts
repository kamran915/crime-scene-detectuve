export type ScreenType = 
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'register'
  | 'home'
  | 'cases'
  | 'case-intro'
  | 'crime-scene'
  | 'evidence-detail'
  | 'suspects'
  | 'suspect-detail'
  | 'investigation-board'
  | 'final-verdict'
  | 'case-result'
  | 'profile'
  | 'achievements'
  | 'settings';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface EvidenceItem {
  id: string;
  name: string;
  type: 'Video' | 'Physical' | 'Document' | 'Digital' | 'Forensic';
  location: string;
  time: string;
  description: string;
  important: boolean;
  position: { x: number; y: number }; // percentage inside the crime scene
  hintText: string;
  imageUrl?: string;
  previewType?: 'cctv' | 'footprint' | 'phone' | 'access-card' | 'laptop-dock' | 'note' | 'poison' | 'fingerprint';
  notes?: string;
}

export interface InterrogationQA {
  id: string;
  question: string;
  answer: string;
  unlocksClueId?: string;
  isContradictionCheck?: boolean;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  avatar: string;
  motive: string;
  alibi: string;
  bio: string;
  connectedEvidenceIds: string[];
  interrogation: InterrogationQA[];
  isCulprit: boolean;
}

export interface CaseData {
  id: string;
  caseNumber: number;
  title: string;
  location: string;
  difficulty: DifficultyLevel;
  coverImage: string;
  synopsis: string;
  targetTimeSeconds: number;
  evidenceList: EvidenceItem[];
  suspects: Suspect[];
  culpritId: string;
  crucialEvidenceIds: string[];
  reconstruction: {
    summary: string;
    culpritConfession: string;
    details: string;
  };
}

export interface UserProfile {
  name: string;
  title: string;
  avatar: string;
  casesSolved: number;
  accuracy: number;
  totalScore: number;
  hintsUsed: number;
  averageTime: string;
  currentExp: number;
  maxExp: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: string;
  badgeType: 'gold' | 'emerald' | 'cyan' | 'amber';
}
