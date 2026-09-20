import React, { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { 
  Header 
} from './components/Header';
import { 
  SheetTabBar, 
  TabId 
} from './components/SheetTabBar';
import { 
  FormulaBar 
} from './components/FormulaBar';
import { 
  QuickStartModal 
} from './components/QuickStartModal';
import { 
  StartHereTab 
} from './components/tabs/StartHereTab';
import { 
  DashboardTab 
} from './components/tabs/DashboardTab';
import { 
  ChapterTrackerTab 
} from './components/tabs/ChapterTrackerTab';
import { 
  DailyPlannerTab 
} from './components/tabs/DailyPlannerTab';
import { 
  PyqTrackerTab 
} from './components/tabs/PyqTrackerTab';
import { 
  MockAnalysisTab 
} from './components/tabs/MockAnalysisTab';
import { 
  MistakeBookTab 
} from './components/tabs/MistakeBookTab';
import { 
  RevisionQueueTab 
} from './components/tabs/RevisionQueueTab';
import { 
  GoalsProgressTab 
} from './components/tabs/GoalsProgressTab';
import { 
  BackendTabs 
} from './components/tabs/BackendTabs';
import { 
  INITIAL_CHAPTERS, 
  INITIAL_DAILY_TASKS, 
  INITIAL_MISTAKES, 
  INITIAL_MOCKS, 
  INITIAL_PYQS, 
  INITIAL_STUDENT_PROFILE 
} from './data/initialData';
import { 
  ChapterRecord, 
  DailyTask, 
  MistakeRecord, 
  MockTest, 
  PyqRecord, 
  StudentProfile 
} from './types';
import { 
  auth, 
  googleSignIn, 
  googleLogout, 
  exportToGoogleSheets 
} from './services/googleSheets';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabId>('DASHBOARD');
  const [showBackendTabs, setShowBackendTabs] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);

  // Authentication State
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportResultUrl, setExportResultUrl] = useState<string | null>(null);

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // Persistent State with LocalStorage Fallback
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('jee_recovery_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'Aman Sharma' || parsed.name === 'Arjun Sharma') {
          return INITIAL_STUDENT_PROFILE;
        }
        return parsed;
      }
      return INITIAL_STUDENT_PROFILE;
    } catch {
      return INITIAL_STUDENT_PROFILE;
    }
  });

  const [chapters, setChapters] = useState<ChapterRecord[]>(() => {
    try {
      const saved = localStorage.getItem('jee_recovery_chapters');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasDummy = parsed.some((c: any) => c.chapter === 'Electrostatics' && c.correctCount === 19);
        if (hasDummy) return INITIAL_CHAPTERS;
        return parsed;
      }
      return INITIAL_CHAPTERS;
    } catch {
      return INITIAL_CHAPTERS;
    }
  });

  const [pyqs, setPyqs] = useState<PyqRecord[]>(() => {
    try {
      const saved = localStorage.getItem('jee_recovery_pyqs');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasDummy = parsed.some((p: any) => p.chapter === 'Current Electricity' && p.y2026 && p.y2025);
        if (hasDummy) return INITIAL_PYQS;
        return parsed;
      }
      return INITIAL_PYQS;
    } catch {
      return INITIAL_PYQS;
    }
  });

  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>(() => {
    try {
      const saved = localStorage.getItem('jee_recovery_tasks');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasDummy = parsed.some((t: any) => t.id === 'task-1' && t.chapter === 'Current Electricity');
        if (hasDummy) return INITIAL_DAILY_TASKS;
        return parsed;
      }
      return INITIAL_DAILY_TASKS;
    } catch {
      return INITIAL_DAILY_TASKS;
    }
  });

  const [mocks, setMocks] = useState<MockTest[]>(() => {
    try {
      const saved = localStorage.getItem('jee_recovery_mocks');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasDummy = parsed.some((m: any) => m.id === 'mock-1' && m.source === 'Allen Part Test 1');
        if (hasDummy) return INITIAL_MOCKS;
        return parsed;
      }
      return INITIAL_MOCKS;
    } catch {
      return INITIAL_MOCKS;
    }
  });

  const [mistakes, setMistakes] = useState<MistakeRecord[]>(() => {
    try {
      const saved = localStorage.getItem('jee_recovery_mistakes');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasDummy = parsed.some((m: any) => m.id === 'mis-1' && m.questionId === 'M5-P14');
        if (hasDummy) return INITIAL_MISTAKES;
        return parsed;
      }
      return INITIAL_MISTAKES;
    } catch {
      return INITIAL_MISTAKES;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('jee_recovery_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('jee_recovery_chapters', JSON.stringify(chapters));
  }, [chapters]);

  useEffect(() => {
    localStorage.setItem('jee_recovery_pyqs', JSON.stringify(pyqs));
  }, [pyqs]);

  useEffect(() => {
    localStorage.setItem('jee_recovery_tasks', JSON.stringify(dailyTasks));
  }, [dailyTasks]);

  useEffect(() => {
    localStorage.setItem('jee_recovery_mocks', JSON.stringify(mocks));
  }, [mocks]);

  useEffect(() => {
    localStorage.setItem('jee_recovery_mistakes', JSON.stringify(mistakes));
  }, [mistakes]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handlers
  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);
      const res = await googleSignIn();
      if (res?.user) {
        setUser(res.user);
        showToast(`Connected as ${res.user.displayName || res.user.email}!`, 'success');
      }
    } catch (err: any) {
      console.error(err);
      showToast(err?.message || 'Google Sign In was cancelled or failed.', 'error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await googleLogout();
    setUser(null);
    setExportResultUrl(null);
    showToast('Signed out.', 'info');
  };

  const handleExportToSheets = async () => {
    if (!user) {
      showToast('Please sign in with Google first to export to your Google Drive.', 'info');
      await handleLogin();
      return;
    }

    try {
      setIsExporting(true);
      const result = await exportToGoogleSheets(
        profile,
        chapters,
        pyqs,
        dailyTasks,
        mocks,
        mistakes
      );
      setExportResultUrl(result.spreadsheetUrl);
      showToast('Google Sheet created in your Google Drive! Opening...', 'success');
      window.open(result.spreadsheetUrl, '_blank');
    } catch (err: any) {
      console.error('Export failed:', err);
      showToast(err.message || 'Failed to export to Google Sheets.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset all progress and clear all data? This will reset all trackers and records to a clean start.')) {
      setProfile(INITIAL_STUDENT_PROFILE);
      setChapters(INITIAL_CHAPTERS);
      setPyqs(INITIAL_PYQS);
      setDailyTasks(INITIAL_DAILY_TASKS);
      setMocks(INITIAL_MOCKS);
      setMistakes(INITIAL_MISTAKES);
      showToast('All progress reset to clean state.', 'info');
    }
  };

  // Chapter updates
  const handleUpdateChapter = (chapterId: string, updates: Partial<ChapterRecord>) => {
    setChapters(prev => prev.map(ch => ch.id === chapterId ? { ...ch, ...updates } : ch));
  };

  // Pyq updates
  const handleUpdatePyq = (pyqId: string, updates: Partial<PyqRecord>) => {
    setPyqs(prev => prev.map(p => p.id === pyqId ? { ...p, ...updates } : p));
  };

  // Task updates
  const handleToggleTask = (taskId: string) => {
    setDailyTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextDone = !t.done;
        return {
          ...t,
          done: nextDone,
          actualTimeHours: nextDone && t.actualTimeHours === 0 ? t.plannedTimeHours : t.actualTimeHours
        };
      }
      return t;
    }));
  };

  const handleAddTask = (newTask: Omit<DailyTask, 'id'>) => {
    const id = `task-${Date.now()}`;
    setDailyTasks(prev => [ { ...newTask, id }, ...prev ]);
    showToast('Task added to Daily Planner!', 'success');
  };

  const handleUpdateTask = (taskId: string, updates: Partial<DailyTask>) => {
    setDailyTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates } : t));
  };

  const handleDeleteTask = (taskId: string) => {
    setDailyTasks(prev => prev.filter(t => t.id !== taskId));
    showToast('Task removed.', 'info');
  };

  // Mock updates
  const handleAddMock = (newMock: Omit<MockTest, 'id'>) => {
    const id = `mock-${Date.now()}`;
    setMocks(prev => [ ...prev, { ...newMock, id } ]);
    showToast('Mock test recorded with JEE scoring!', 'success');
  };

  const handleUpdateMock = (mockId: string, updates: Partial<MockTest>) => {
    setMocks(prev => prev.map(m => m.id === mockId ? { ...m, ...updates } : m));
  };

  const handleDeleteMock = (mockId: string) => {
    setMocks(prev => prev.filter(m => m.id !== mockId));
    showToast('Mock test entry deleted.', 'info');
  };

  // Mistake updates
  const handleAddMistake = (newMistake: Omit<MistakeRecord, 'id'>) => {
    const id = `err-${Date.now()}`;
    setMistakes(prev => [ { ...newMistake, id }, ...prev ]);
    showToast('Mistake logged to Mistake Book!', 'success');
  };

  const handleUpdateMistake = (mistakeId: string, updates: Partial<MistakeRecord>) => {
    setMistakes(prev => prev.map(m => m.id === mistakeId ? { ...m, ...updates } : m));
  };

  const handleDeleteMistake = (mistakeId: string) => {
    setMistakes(prev => prev.filter(m => m.id !== mistakeId));
    showToast('Mistake record deleted.', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-xl text-xs font-semibold text-white animate-in slide-in-from-bottom-3 duration-200"
          style={{
            backgroundColor: toast.type === 'error' ? '#e11d48' : toast.type === 'info' ? '#0284c7' : '#059669'
          }}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main App Header */}
      <Header
        profile={profile}
        user={user}
        isLoggingIn={isLoggingIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onExportSheets={handleExportToSheets}
        isExporting={isExporting}
        exportResultUrl={exportResultUrl}
        onOpenGuide={() => setShowGuideModal(true)}
        onResetData={handleResetData}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as TabId)}
      />

      {/* Spreadsheet Tabs Navigation Bar */}
      <SheetTabBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showBackendTabs={showBackendTabs}
        onToggleBackendTabs={() => setShowBackendTabs(!showBackendTabs)}
      />

      {/* Google Sheets Formula Bar */}
      <FormulaBar activeTab={activeTab} />

      {/* Main Tab Content View */}
      <main className="flex-1 pb-16">
        {activeTab === 'START HERE' && (
          <StartHereTab
            profile={profile}
            onUpdateProfile={(updates) => setProfile(prev => ({ ...prev, ...updates }))}
            onGoToDashboard={() => setActiveTab('DASHBOARD')}
          />
        )}

        {activeTab === 'DASHBOARD' && (
          <DashboardTab
            profile={profile}
            chapters={chapters}
            pyqs={pyqs}
            dailyTasks={dailyTasks}
            mocks={mocks}
            mistakes={mistakes}
            onToggleTask={handleToggleTask}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'CHAPTER TRACKER' && (
          <ChapterTrackerTab
            chapters={chapters}
            onUpdateChapter={handleUpdateChapter}
          />
        )}

        {activeTab === 'DAILY PLANNER' && (
          <DailyPlannerTab
            tasks={dailyTasks}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            availableHours={profile.dailyStudyHours}
          />
        )}

        {activeTab === 'PYQ TRACKER' && (
          <PyqTrackerTab
            pyqs={pyqs}
            onUpdatePyq={handleUpdatePyq}
          />
        )}

        {activeTab === 'MOCK ANALYSIS' && (
          <MockAnalysisTab
            mocks={mocks}
            onAddMock={handleAddMock}
            onUpdateMock={handleUpdateMock}
            onDeleteMock={handleDeleteMock}
            targetMarks={profile.targetMarks}
          />
        )}

        {activeTab === 'MISTAKE BOOK' && (
          <MistakeBookTab
            mistakes={mistakes}
            onAddMistake={handleAddMistake}
            onUpdateMistake={handleUpdateMistake}
            onDeleteMistake={handleDeleteMistake}
          />
        )}

        {activeTab === 'REVISION QUEUE' && (
          <RevisionQueueTab
            chapters={chapters}
            onUpdateChapter={handleUpdateChapter}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'GOALS & PROGRESS' && (
          <GoalsProgressTab
            profile={profile}
            chapters={chapters}
            pyqs={pyqs}
            mocks={mocks}
            mistakes={mistakes}
          />
        )}

        {(activeTab === 'CHAPTER DATABASE' || activeTab === 'CALCULATIONS' || activeTab === 'DROPDOWN DATA') && (
          <BackendTabs activeTab={activeTab} />
        )}
      </main>

      {/* Quick Start PDF User Guide Modal */}
      <QuickStartModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
      />
    </div>
  );
}
