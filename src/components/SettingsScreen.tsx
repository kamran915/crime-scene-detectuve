import React, { useState } from 'react';
import { Volume2, VolumeX, Bell, Globe, Moon, HelpCircle, Info, Shield, LogOut, ChevronRight, Check } from 'lucide-react';
import { sound } from '../utils/audio';

interface SettingsScreenProps {
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  darkMode: boolean;
  onToggleSound: () => void;
  onToggleNotifications: () => void;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  soundEnabled,
  notificationsEnabled,
  darkMode,
  onToggleSound,
  onToggleNotifications,
  onToggleDarkMode,
  onLogout,
}) => {
  const [modalContent, setModalContent] = useState<{ title: string; body: string } | null>(null);

  return (
    <div id="settings-screen" className="flex flex-col h-full bg-slate-950 text-slate-100 select-none overflow-y-auto pb-6">
      {/* Top Bar */}
      <div className="px-5 py-4 border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
        <h2 className="text-base font-bold text-white tracking-wide">Settings</h2>
      </div>

      <div className="p-5 space-y-6">
        {/* Audio & Visuals Group */}
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2 px-1">
            Preferences
          </span>
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 divide-y divide-slate-800/80 overflow-hidden">
            {/* Sound & Music */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                </div>
                <span className="text-xs font-semibold text-white">Sound & Music</span>
              </div>
              <button
                id="toggle-sound-btn"
                onClick={() => {
                  sound.playTap();
                  onToggleSound();
                }}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  soundEnabled ? 'bg-sky-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    soundEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Notifications */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                  <Bell className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-xs font-semibold text-white">Notifications</span>
              </div>
              <button
                id="toggle-notifications-btn"
                onClick={() => {
                  sound.playTap();
                  onToggleNotifications();
                }}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  notificationsEnabled ? 'bg-sky-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Language */}
            <div
              onClick={() => {
                sound.playTap();
                alert('Language selector: English (Default), Spanish, German, French, Japanese.');
              }}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-850 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                  <Globe className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-white">Language</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <span>English</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </div>
            </div>

            {/* Dark Mode */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                  <Moon className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-xs font-semibold text-white">Dark Mode</span>
              </div>
              <button
                id="toggle-darkmode-btn"
                onClick={() => {
                  sound.playTap();
                  onToggleDarkMode();
                }}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  darkMode ? 'bg-sky-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Support & Legal Group */}
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2 px-1">
            Information
          </span>
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 divide-y divide-slate-800/80 overflow-hidden">
            <div
              onClick={() => {
                sound.playTap();
                setModalContent({
                  title: 'Help & Support',
                  body: 'Welcome Detective! Your mission is to inspect crime scenes for hidden clues, question suspects to test their alibis, connect evidence on the investigation board, and submit a verdict against the true culprit with supporting evidence.',
                });
              }}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-850 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                  <HelpCircle className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-xs font-semibold text-white">Help & Support</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            <div
              onClick={() => {
                sound.playTap();
                setModalContent({
                  title: 'About Crime Scene Detective',
                  body: 'Crime Scene Detective v1.2.0 • An interactive forensic investigation game where every clue matters. Built with modern web animations and authentic detective noir design.',
                });
              }}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-850 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                  <Info className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-xs font-semibold text-white">About App</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            <div
              onClick={() => {
                sound.playTap();
                setModalContent({
                  title: 'Privacy Policy',
                  body: 'All case progress, detective stats, and clue deductions are saved privately in your browser storage. No unauthorized external telemetry is gathered.',
                });
              }}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-850 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                  <Shield className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-xs font-semibold text-white">Privacy Policy</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          id="logout-btn"
          onClick={() => {
            sound.playTap();
            onLogout();
          }}
          className="w-full p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/50 text-xs font-bold transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Info Dialog Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <h4 className="text-base font-bold text-white">{modalContent.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{modalContent.body}</p>
            <button
              onClick={() => setModalContent(null)}
              className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
