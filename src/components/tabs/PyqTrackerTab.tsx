import React, { useState, useMemo } from 'react';
import { 
  Target, 
  CheckSquare, 
  Square, 
  Search, 
  Layers, 
  HelpCircle, 
  Award,
  BookOpen
} from 'lucide-react';
import { PyqRecord, Subject } from '../../types';

interface PyqTrackerTabProps {
  pyqs: PyqRecord[];
  onUpdatePyq: (id: string, updates: Partial<PyqRecord>) => void;
}

export const PyqTrackerTab: React.FC<PyqTrackerTabProps> = ({
  pyqs,
  onUpdatePyq
}) => {
  const [subjectFilter, setSubjectFilter] = useState<'All' | Subject>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const years: Array<keyof Pick<PyqRecord, 'y2026' | 'y2025' | 'y2024' | 'y2023' | 'y2022' | 'y2021'>> = [
    'y2026', 'y2025', 'y2024', 'y2023', 'y2022', 'y2021'
  ];

  const yearLabels: Record<string, string> = {
    y2026: '2026',
    y2025: '2025',
    y2024: '2024',
    y2023: '2023',
    y2022: '2022',
    y2021: '2021'
  };

  const filteredPyqs = useMemo(() => {
    return pyqs.filter(p => {
      if (subjectFilter !== 'All' && p.subject !== subjectFilter) return false;
      if (searchQuery && !p.chapter.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [pyqs, subjectFilter, searchQuery]);

  // Total summary calculations
  const totalStats = useMemo(() => {
    let totalSlots = pyqs.length * 6;
    let completedSlots = 0;
    pyqs.forEach(p => {
      years.forEach(y => {
        if (p[y]) completedSlots++;
      });
    });
    const pct = totalSlots > 0 ? Math.round((completedSlots / totalSlots) * 100) : 0;
    return { totalSlots, completedSlots, pct };
  }, [pyqs]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header & The 5-Round PYQ Protocol (PRD Section 16) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-rose-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">PYQ Tracker (2021–2026 Question Practice)</h2>
              <p className="text-xs text-slate-500">
                Track whether you have actually solved recent JEE Main session papers chapter-wise.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg text-rose-950 font-bold">
            <span>Total PYQ Completion:</span>
            <span className="text-base font-black text-rose-600">{totalStats.pct}%</span>
            <span className="text-[11px] font-normal text-slate-500">({totalStats.completedSlots}/{totalStats.totalSlots})</span>
          </div>
        </div>

        {/* The 5-Round Protocol Banner */}
        <div className="bg-slate-900 text-white p-4 rounded-lg">
          <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
            The 5-Round PYQ Execution System (PRD Standard):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
            <div className="bg-slate-800 p-2.5 rounded border border-slate-700">
              <strong className="text-amber-400 block font-semibold mb-1">Round 1</strong>
              <p className="text-slate-300 text-[11px]">Solve normally with a timer (25 Qs in 50 mins).</p>
            </div>
            <div className="bg-slate-800 p-2.5 rounded border border-slate-700">
              <strong className="text-amber-400 block font-semibold mb-1">Round 2</strong>
              <p className="text-slate-300 text-[11px]">Circle and tag wrong or unattempted questions.</p>
            </div>
            <div className="bg-slate-800 p-2.5 rounded border border-slate-700">
              <strong className="text-amber-400 block font-semibold mb-1">Round 3</strong>
              <p className="text-slate-300 text-[11px]">Study mistake reason (Concept, Formula, Silly).</p>
            </div>
            <div className="bg-slate-800 p-2.5 rounded border border-slate-700">
              <strong className="text-amber-400 block font-semibold mb-1">Round 4</strong>
              <p className="text-slate-300 text-[11px]">Reattempt wrong questions on blank paper.</p>
            </div>
            <div className="bg-slate-800 p-2.5 rounded border border-slate-700">
              <strong className="text-amber-400 block font-semibold mb-1">Round 5</strong>
              <p className="text-slate-300 text-[11px]">Recheck in Spaced Revision (14-21 days later).</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubjectFilter('All')}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              subjectFilter === 'All' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Subjects ({pyqs.length})
          </button>
          <button
            onClick={() => setSubjectFilter('Physics')}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              subjectFilter === 'Physics' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Physics
          </button>
          <button
            onClick={() => setSubjectFilter('Chemistry')}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              subjectFilter === 'Chemistry' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chemistry
          </button>
          <button
            onClick={() => setSubjectFilter('Maths')}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              subjectFilter === 'Maths' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Maths
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
          <input
            type="text"
            placeholder="Search chapter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-rose-500"
          />
        </div>
      </div>

      {/* PYQ Spreadsheet Grid */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300 sticky top-0 z-20">
              <tr>
                <th className="py-2.5 px-3 w-10 text-center border-r border-slate-200 bg-slate-100">#</th>
                <th className="py-2.5 px-3 w-28 border-r border-slate-200 bg-slate-100">Subject</th>
                <th className="py-2.5 px-3 min-w-[240px] border-r border-slate-200 bg-slate-100">Chapter</th>
                {years.map(y => (
                  <th key={y} className="py-2.5 px-2 text-center w-16 border-r border-slate-200 bg-slate-100 font-bold">
                    {yearLabels[y]}
                  </th>
                ))}
                <th className="py-2.5 px-3 w-32 text-center bg-slate-100 font-bold">Completion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPyqs.map((p, idx) => {
                const solvedCount = years.filter(y => p[y]).length;
                const pct = Math.round((solvedCount / 6) * 100);

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2 px-2 text-center font-mono text-slate-400 border-r border-slate-200">
                      {idx + 1}
                    </td>

                    <td className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-700">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                        p.subject === 'Physics' ? 'bg-sky-100 text-sky-800' :
                        p.subject === 'Chemistry' ? 'bg-teal-100 text-teal-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {p.subject}
                      </span>
                    </td>

                    <td className="py-2 px-3 font-semibold text-slate-900 border-r border-slate-200">
                      {p.chapter}
                    </td>

                    {years.map(y => (
                      <td key={y} className="py-2 px-2 text-center border-r border-slate-200">
                        <button
                          onClick={() => onUpdatePyq(p.id, { [y]: !p[y] })}
                          className="text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          {p[y] ? (
                            <CheckSquare className="w-4 h-4 text-rose-600 inline" />
                          ) : (
                            <Square className="w-4 h-4 inline text-slate-300" />
                          )}
                        </button>
                      </td>
                    ))}

                    <td className="py-2 px-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className={`font-mono text-xs font-bold ${
                          pct === 100 ? 'text-emerald-600' :
                          pct >= 50 ? 'text-slate-800' : 'text-slate-400'
                        }`}>
                          {solvedCount} / 6 ({pct}%)
                        </span>
                        <div className="w-12 bg-slate-100 rounded-full h-1.5 hidden sm:block">
                          <div 
                            className={`h-1.5 rounded-full ${pct === 100 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                            style={{ width: `${pct}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
