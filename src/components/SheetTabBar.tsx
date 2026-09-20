import React from 'react';
import { 
  Rocket, 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Target, 
  ClipboardList, 
  AlertTriangle, 
  RefreshCw, 
  TrendingUp, 
  Database, 
  Calculator, 
  ListFilter,
  Eye,
  EyeOff
} from 'lucide-react';

export type TabId = 
  | 'START HERE'
  | 'DASHBOARD'
  | 'CHAPTER TRACKER'
  | 'DAILY PLANNER'
  | 'PYQ TRACKER'
  | 'MOCK ANALYSIS'
  | 'MISTAKE BOOK'
  | 'REVISION QUEUE'
  | 'GOALS & PROGRESS'
  | 'CHAPTER DATABASE'
  | 'CALCULATIONS'
  | 'DROPDOWN DATA';

interface SheetTabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  showBackendTabs: boolean;
  onToggleBackendTabs: () => void;
}

export const SheetTabBar: React.FC<SheetTabBarProps> = ({
  activeTab,
  onTabChange,
  showBackendTabs,
  onToggleBackendTabs
}) => {
  const userTabs: { id: TabId; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'START HERE', label: '1. START HERE', icon: <Rocket className="w-3.5 h-3.5" />, color: 'text-amber-600' },
    { id: 'DASHBOARD', label: '2. DASHBOARD', icon: <LayoutDashboard className="w-3.5 h-3.5" />, color: 'text-emerald-600' },
    { id: 'CHAPTER TRACKER', label: '3. CHAPTER TRACKER', icon: <BookOpen className="w-3.5 h-3.5" />, color: 'text-sky-600' },
    { id: 'DAILY PLANNER', label: '4. DAILY PLANNER', icon: <Calendar className="w-3.5 h-3.5" />, color: 'text-indigo-600' },
    { id: 'PYQ TRACKER', label: '5. PYQ TRACKER', icon: <Target className="w-3.5 h-3.5" />, color: 'text-rose-600' },
    { id: 'MOCK ANALYSIS', label: '6. MOCK ANALYSIS', icon: <ClipboardList className="w-3.5 h-3.5" />, color: 'text-teal-600' },
    { id: 'MISTAKE BOOK', label: '7. MISTAKE BOOK', icon: <AlertTriangle className="w-3.5 h-3.5" />, color: 'text-red-600' },
    { id: 'REVISION QUEUE', label: '8. REVISION QUEUE', icon: <RefreshCw className="w-3.5 h-3.5" />, color: 'text-violet-600' },
    { id: 'GOALS & PROGRESS', label: '9. GOALS & PROGRESS', icon: <TrendingUp className="w-3.5 h-3.5" />, color: 'text-blue-600' }
  ];

  const backendTabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'CHAPTER DATABASE', label: '10. CHAPTER DATABASE', icon: <Database className="w-3.5 h-3.5" /> },
    { id: 'CALCULATIONS', label: '11. CALCULATIONS', icon: <Calculator className="w-3.5 h-3.5" /> },
    { id: 'DROPDOWN DATA', label: '12. DROPDOWN DATA', icon: <ListFilter className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="bg-slate-100 border-b border-slate-300 px-3 pt-2 select-none shadow-inner">
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 min-w-max pb-1">
          {userTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-t-md transition-all border-t-2 ${
                  isActive
                    ? 'bg-white text-slate-900 border-emerald-600 shadow-sm font-bold'
                    : 'bg-slate-200/80 hover:bg-slate-200 text-slate-600 border-transparent hover:text-slate-900'
                }`}
              >
                <span className={isActive ? tab.color : 'text-slate-400'}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}

          {showBackendTabs && backendTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium rounded-t-md transition-all border-t-2 ${
                  isActive
                    ? 'bg-slate-800 text-white border-sky-400 shadow-sm font-bold'
                    : 'bg-slate-300/80 hover:bg-slate-300 text-slate-700 border-transparent'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Toggle backend sheets */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-300 mb-1">
          <button
            onClick={onToggleBackendTabs}
            className="flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-white/70 hover:bg-white px-2 py-1 rounded border border-slate-300 transition-colors whitespace-nowrap"
            title="Toggle Hidden Backend Sheets (Calculations & Syllabus DB)"
          >
            {showBackendTabs ? <EyeOff className="w-3 h-3 text-slate-500" /> : <Eye className="w-3 h-3 text-slate-500" />}
            <span>{showBackendTabs ? 'Hide Backend Sheets' : 'Show Backend Sheets'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
