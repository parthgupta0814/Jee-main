import React from 'react';
import { FunctionSquare, ShieldAlert, Sparkles } from 'lucide-react';
import { TabId } from './SheetTabBar';

interface FormulaBarProps {
  activeTab: TabId;
}

export const FormulaBar: React.FC<FormulaBarProps> = ({ activeTab }) => {
  const formulaInfo: Record<TabId, { cell: string; formula: string; note: string }> = {
    'START HERE': {
      cell: 'B6',
      formula: '=SCORE_GAP(TargetMarks - CurrentAvgScore)',
      note: 'Diagnostic baseline configuration'
    },
    'DASHBOARD': {
      cell: 'C3:H3',
      formula: '=COUNTIFS(Status, "MASTERED")/COUNTA(Chapters)*100',
      note: 'Auto-aggregated preparation metrics'
    },
    'CHAPTER TRACKER': {
      cell: 'L2',
      formula: '=IF(AND(Theory, PYQs, Rev1, Tested, Accuracy>=80%), "MASTERED", IF(Tested, "TESTED", ...))',
      note: 'Protected formula cell'
    },
    'DAILY PLANNER': {
      cell: 'G1',
      formula: '=COUNTIF(Done, TRUE)/COUNTA(Tasks)*100',
      note: 'Calculates real-time daily task completion rate'
    },
    'PYQ TRACKER': {
      cell: 'I2',
      formula: '=SUM(2021:2026)/6*100',
      note: 'Multi-year PYQ completion tracking formula'
    },
    'MOCK ANALYSIS': {
      cell: 'G2',
      formula: '=Correct * MarkingCorrect - Incorrect * MarkingIncorrect',
      note: 'Automated standard JEE score formula (+4, -1)'
    },
    'MISTAKE BOOK': {
      cell: 'E2',
      formula: '=COUNTIF(MistakeType, "CALC")/COUNTA(Mistakes)',
      note: 'Root-cause categorization: C, F, S, CALC, R, T, G'
    },
    'REVISION QUEUE': {
      cell: 'A2',
      formula: '=SORT(FILTER(Chapters, NeedsRevision=TRUE), UrgencyScore, FALSE)',
      note: 'Spaced revision interval engine (R1: 3d, R2: 7d, R3: 21d)'
    },
    'GOALS & PROGRESS': {
      cell: 'C4',
      formula: '=TargetMarks - CurrentAvgScore',
      note: 'Target score gap elimination tracker'
    },
    'CHAPTER DATABASE': {
      cell: 'A1:E61',
      formula: '=ChapterDatabaseMaster',
      note: 'Official NTA JEE Main 2027 Syllabus Master'
    },
    'CALCULATIONS': {
      cell: 'A1:B25',
      formula: '=ARRAYFORMULA(CALC_METRICS)',
      note: 'Backend summary metrics engine'
    },
    'DROPDOWN DATA': {
      cell: 'A1:F10',
      formula: '=DataValidationRanges',
      note: 'Strict validation to prevent spelling errors'
    }
  };

  const current = formulaInfo[activeTab] || {
    cell: 'A1',
    formula: '=SHEET()',
    note: 'Active Sheet'
  };

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-1.5 flex items-center gap-3 text-xs">
      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 rounded border border-slate-300 font-mono font-bold text-slate-700 min-w-[65px] justify-center">
        <span>{current.cell}</span>
      </div>

      <div className="flex items-center text-slate-400 font-serif italic text-sm font-semibold select-none">
        fx
      </div>

      <div className="flex-1 font-mono text-slate-800 bg-slate-50 px-2.5 py-1 rounded border border-slate-200 truncate">
        {current.formula}
      </div>

      <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded border border-slate-200">
        <ShieldAlert className="w-3 h-3 text-emerald-600" />
        <span>{current.note}</span>
      </div>
    </div>
  );
};
