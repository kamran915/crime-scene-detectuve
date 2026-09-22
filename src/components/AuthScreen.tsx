import React, { useState } from 'react';
import { Search, Mail, Lock, User as UserIcon, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio';

interface AuthScreenProps {
  initialMode?: 'login' | 'register';
  onSuccess: (userData: { name: string; email: string }) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ initialMode = 'login', onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('Moazam');
  const [email, setEmail] = useState('you@example.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTap();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (mode === 'register' && !name) {
      setError('Please enter your full name');
      return;
    }
    onSuccess({
      name: mode === 'register' ? (name || 'Detective') : 'Moazam',
      email: email
    });
  };

  const handleGuestLogin = () => {
    sound.playTap();
    onSuccess({
      name: 'Moazam',
      email: 'moazam.detective@agency.internal'
    });
  };

  return (
    <div 
      id="auth-screen"
      className="relative flex flex-col justify-between h-full min-h-[640px] w-full bg-slate-950 text-slate-100 p-6 select-none overflow-y-auto"
    >
      {/* Top Header Logo */}
      <div className="flex flex-col items-center pt-2 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/50 flex items-center justify-center">
            <Search className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-center">
            <h1 className="font-['Cinzel'] text-lg font-black tracking-wider text-amber-400 leading-tight">
              CRIME SCENE
            </h1>
            <h2 className="font-['Cinzel'] text-xs font-bold tracking-widest text-slate-300 leading-none">
              DETECTIVE
            </h2>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="w-full max-w-sm mx-auto my-auto py-2">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {mode === 'login'
                ? 'Sign in to continue your investigation.'
                : 'Join the global detective agency network.'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    id="auth-name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="auth-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="auth-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to registered email.')}
                  className="text-xs text-sky-400 hover:text-sky-300 font-medium"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-[0.98] transition-all shadow-[0_4px_16px_rgba(14,165,233,0.3)] mt-2"
            >
              {mode === 'login' ? 'Login' : 'Register'}
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-6">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-800" />
              <span className="flex-shrink mx-3 text-xs text-slate-500">Or continue with</span>
              <div className="flex-grow border-t border-slate-800" />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-3">
              {/* Google */}
              <button
                type="button"
                onClick={handleGuestLogin}
                className="py-2.5 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 transition-colors"
                title="Google"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 12s.7 2.3 1.9 4.7l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
                </svg>
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={handleGuestLogin}
                className="py-2.5 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 transition-colors"
                title="Apple"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.95 2.76 1.01.08 2.05-.51 2.67-1.26z" />
                </svg>
              </button>

              {/* X / Twitter */}
              <button
                type="button"
                onClick={handleGuestLogin}
                className="py-2.5 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 transition-colors"
                title="Twitter / X"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Switcher */}
      <div className="pt-4 pb-2 text-center z-10">
        <p className="text-xs text-slate-400">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            type="button"
            onClick={() => {
              sound.playTap();
              setMode(mode === 'login' ? 'register' : 'login');
              setError('');
            }}
            className="text-sky-400 hover:text-sky-300 font-semibold underline underline-offset-2 ml-1"
          >
            {mode === 'login' ? 'Register' : 'Login'}
          </button>
        </p>

        {/* Guest shortcut */}
        <button
          onClick={handleGuestLogin}
          className="mt-3 text-xs text-amber-400/90 hover:text-amber-300 flex items-center justify-center gap-1 mx-auto"
        >
          <span>Quick Play as Rookie Detective</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
