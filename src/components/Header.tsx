import React from 'react';
import { User } from 'firebase/auth';
import { 
  FileSpreadsheet, 
  BookOpen, 
  Sparkles, 
  RotateCcw, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { StudentProfile } from '../types';

interface HeaderProps {
  profile: StudentProfile;
  user: User | null;
  isLoggingIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onExportSheets: () => void;
  isExporting: boolean;
  exportResultUrl: string | null;
  onOpenGuide: () => void;
  onResetData: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  user,
  isLoggingIn,
  onLogin,
  onLogout,
  onExportSheets,
  isExporting,
  exportResultUrl,
  onOpenGuide,
  onResetData,
  activeTab,
  onTabChange
}) => {
  const scoreGap = profile.targetMarks - profile.currentAvgScore;

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-sm">
      {/* Top Banner / Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
            JEE MAIN 2027
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="text-slate-300 font-medium">Score Recovery Kit</span>
          <span className="hidden md:inline text-slate-400">
            • Goal: <strong className="text-emerald-400">{profile.targetMarks > 0 ? `${profile.targetMarks} Marks` : 'Set Target'}</strong> ({profile.targetPercentile || 'Target Percentile'})
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Diagnostic quick link */}
          <button
            onClick={() => onTabChange('REVISION QUEUE')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors"
            title="Immediate next action"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">“Mujhe abhi kya karna chahiye?”</span>
          </button>

          {/* Quick Start Guide */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>User Guide (PDF)</span>
          </button>

          {/* Reset */}
          <button
            onClick={onResetData}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Reset all progress to clean start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="text-emerald-400 font-black">Score Recovery</span> Kit
            </h1>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              v1.0 Template
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Turn existing resources into a structured revision, PYQ, and mock error elimination system.
          </p>
        </div>

        {/* Integration Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Google Sheets Export / Link */}
          {exportResultUrl ? (
            <a
              href={exportResultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Open in Google Sheets</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          ) : (
            <button
              onClick={onExportSheets}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium text-xs shadow transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{isExporting ? 'Creating Google Sheet...' : 'Export to Google Sheets'}</span>
            </button>
          )}

          {/* Google Auth Status / Sign-in */}
          {user ? (
            <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  className="w-5 h-5 rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold">
                  {(user.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
              )}
              <span className="text-xs text-slate-200 max-w-[120px] truncate">
                {user.displayName || user.email}
              </span>
              <button
                onClick={onLogout}
                className="text-[11px] text-slate-400 hover:text-red-400 ml-1 underline"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              disabled={isLoggingIn}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold shadow transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{isLoggingIn ? 'Connecting...' : 'Sign in with Google'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
