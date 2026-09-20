import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  Plus, 
  Trash2, 
  CheckSquare, 
  Square, 
  Filter, 
  Sparkles, 
  PieChart, 
  Search,
  CheckCircle2
} from 'lucide-react';
import { MistakeCode, MistakeRecord, Subject } from '../../types';
import { MISTAKE_TYPES } from '../../data/initialData';

interface MistakeBookTabProps {
  mistakes: MistakeRecord[];
  onAddMistake: (record: Omit<MistakeRecord, 'id'>) => void;
  onUpdateMistake: (id: string, updates: Partial<MistakeRecord>) => void;
  onDeleteMistake: (id: string) => void;
}

export const MistakeBookTab: React.FC<MistakeBookTabProps> = ({
  mistakes,
  onAddMistake,
  onUpdateMistake,
  onDeleteMistake
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState<'All' | Subject>('All');
  const [typeFilter, setTypeFilter] = useState<'All' | MistakeCode>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Done'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // New mistake state
  const [subject, setSubject] = useState<Subject>('Physics');
  const [chapter, setChapter] = useState('');
  const [questionSource, setQuestionSource] = useState('');
  const [mistakeType, setMistakeType] = useState<MistakeCode>('CALC');
  const [description, setDescription] = useState('');
  const [correctConcept, setCorrectConcept] = useState('');

  const filteredMistakes = useMemo(() => {
    return mistakes.filter(m => {
      const isReattempted = m.reattemptStatus ?? m.reattempted ?? false;
      const descText = m.description || m.whyWrong || '';
      if (subjectFilter !== 'All' && m.subject !== subjectFilter) return false;
      if (typeFilter !== 'All' && m.mistakeType !== typeFilter) return false;
      if (statusFilter === 'Pending' && isReattempted) return false;
      if (statusFilter === 'Done' && !isReattempted) return false;
      if (searchQuery && !m.chapter.toLowerCase().includes(searchQuery.toLowerCase()) && !descText.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [mistakes, subjectFilter, typeFilter, statusFilter, searchQuery]);

  // Section 26: Mistake Distribution Breakdown
  const distribution = useMemo(() => {
    const total = mistakes.length;
    if (total === 0) return [];

    const counts: Record<string, number> = {};
    mistakes.forEach(m => {
      counts[m.mistakeType] = (counts[m.mistakeType] || 0) + 1;
    });

    return Object.keys(MISTAKE_TYPES).map(key => {
      const count = counts[key] || 0;
      const pct = total > 0 ? Math.round((count / total) * 100) : 0;
      return {
        code: key as MistakeCode,
        label: MISTAKE_TYPES[key].label,
        count,
        pct,
        color: MISTAKE_TYPES[key].color
      };
    }).sort((a, b) => b.count - a.count);
  }, [mistakes]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    onAddMistake({
      date: new Date().toISOString().split('T')[0],
      subject,
      chapter: chapter.trim() || 'General Practice',
      questionSource: questionSource.trim() || 'Mock / PYQ',
      mistakeType,
      description: description.trim(),
      correctConcept: correctConcept.trim() || 'Review formulas & mechanisms.',
      reattemptStatus: false,
      reattemptDate: undefined
    });

    setDescription('');
    setCorrectConcept('');
    setChapter('');
    setQuestionSource('');
    setShowAddForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header & Section 24 Purpose */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h2 className="text-base font-bold text-slate-900">Mistake Book (Root-Cause Analysis)</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            “If you do not know why you lose marks, you will continue losing marks in JEE Main.”
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Close Entry Form' : '+ Log Question Mistake'}</span>
        </button>
      </div>

      {/* Section 26: Mistake Distribution Analytics Panel */}
      <div className="bg-slate-900 text-white p-5 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
            Section 26 — Mistake Analytics & Distribution
          </span>
          <span className="text-xs text-slate-400">
            {mistakes.filter(m => !(m.reattemptStatus ?? m.reattempted)).length} Pending Reattempts
          </span>
        </div>

        {mistakes.length === 0 ? (
          <div className="py-6 text-center text-slate-400 bg-slate-800/50 rounded-lg border border-slate-700/60">
            <p className="text-xs font-semibold text-slate-300">No mistakes logged yet</p>
            <p className="text-[11px] text-slate-400 mt-0.5">As you log test errors, their root-cause distribution codes (CALC, FORM, CONC, etc.) will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {distribution.map(d => (
              <div key={d.code} className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold" style={{ color: d.color }}>{d.code}</span>
                  <span className="font-mono text-slate-400 text-[10px]">{d.count} Qs</span>
                </div>
                <div className="text-lg font-extrabold text-white mt-1">{d.pct}%</div>
                <span className="text-[10px] text-slate-400 truncate">{d.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Mistake Form */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="bg-slate-50 border border-slate-300 rounded-xl p-5 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm">Log New Test/PYQ Mistake</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as Subject)}
                className="w-full border border-slate-300 rounded-md p-1.5 bg-white text-xs"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Maths">Maths</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Chapter</label>
              <input
                type="text"
                placeholder="e.g. Current Electricity"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="w-full border border-slate-300 rounded-md p-1.5 bg-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Question Source</label>
              <input
                type="text"
                placeholder="e.g. Mock #4 Q18, PYQ 2024 Shift 2"
                value={questionSource}
                onChange={(e) => setQuestionSource(e.target.value)}
                className="w-full border border-slate-300 rounded-md p-1.5 bg-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Mistake Code (PRD Sec 25)</label>
              <select
                value={mistakeType}
                onChange={(e) => setMistakeType(e.target.value as MistakeCode)}
                className="w-full border border-slate-300 rounded-md p-1.5 bg-white text-xs font-semibold"
              >
                {Object.entries(MISTAKE_TYPES).map(([code, info]) => (
                  <option key={code} value={code}>
                    {code} — {info.label} ({info.description})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Description of Error</label>
              <textarea
                rows={2}
                placeholder="What exactly went wrong? e.g. Took delta V = -IR instead of considering internal resistance."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-slate-300 rounded-md p-2 bg-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Correct Concept / Formula</label>
              <textarea
                rows={2}
                placeholder="What should be remembered? e.g. Terminal PD is V = E - Ir during discharging."
                value={correctConcept}
                onChange={(e) => setCorrectConcept(e.target.value)}
                className="w-full border border-slate-300 rounded-md p-2 bg-white text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded border border-slate-300 text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold"
            >
              Add to Mistake Book
            </button>
          </div>
        </form>
      )}

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Subject */}
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value as any)}
            className="border border-slate-300 rounded-md px-2 py-1 bg-white text-xs"
          >
            <option value="All">All Subjects</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Maths">Maths</option>
          </select>

          {/* Code */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="border border-slate-300 rounded-md px-2 py-1 bg-white text-xs"
          >
            <option value="All">All Mistake Types</option>
            {Object.keys(MISTAKE_TYPES).map(k => (
              <option key={k} value={k}>{k} — {MISTAKE_TYPES[k].label}</option>
            ))}
          </select>

          {/* Reattempt status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="border border-slate-300 rounded-md px-2 py-1 bg-white text-xs font-semibold text-red-700"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending Reattempt</option>
            <option value="Done">Reattempted & Cleared</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
          <input
            type="text"
            placeholder="Search error notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1 border border-slate-300 rounded-md text-xs"
          />
        </div>
      </div>

      {/* Mistakes Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[950px]">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
              <tr>
                <th className="py-2.5 px-3 w-12 text-center border-r border-slate-200">Reattempt</th>
                <th className="py-2.5 px-3 w-24 border-r border-slate-200">Date</th>
                <th className="py-2.5 px-3 w-24 border-r border-slate-200">Subject</th>
                <th className="py-2.5 px-3 w-40 border-r border-slate-200">Chapter</th>
                <th className="py-2.5 px-3 w-28 border-r border-slate-200">Source</th>
                <th className="py-2.5 px-3 w-24 border-r border-slate-200 text-center">Code</th>
                <th className="py-2.5 px-3 min-w-[200px] border-r border-slate-200">What Went Wrong</th>
                <th className="py-2.5 px-3 min-w-[200px] border-r border-slate-200">Correct Concept</th>
                <th className="py-2.5 px-2 text-center">Del</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredMistakes.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500 bg-slate-50">
                    <AlertTriangle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-xs text-slate-700">No mistakes logged yet</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Click "+ Log Question Mistake" above to document questions you got wrong and avoid repeating errors.</p>
                  </td>
                </tr>
              ) : (
                filteredMistakes.map((m) => {
                const typeInfo = MISTAKE_TYPES[m.mistakeType] || { label: m.mistakeType, color: '#64748b' };
                const isReattempted = m.reattemptStatus ?? m.reattempted ?? false;
                return (
                  <tr key={m.id} className={`hover:bg-slate-50 transition-colors ${isReattempted ? 'bg-slate-50/40' : ''}`}>
                    {/* Reattempt Checkbox */}
                    <td className="py-2 px-3 text-center border-r border-slate-200">
                      <button
                        onClick={() => onUpdateMistake(m.id, { 
                          reattemptStatus: !isReattempted,
                          reattempted: !isReattempted,
                          reattemptDate: !isReattempted ? new Date().toISOString().split('T')[0] : undefined
                        })}
                        className="text-slate-500 hover:text-emerald-600"
                        title={isReattempted ? "Reattempted" : "Mark as reattempted"}
                      >
                        {isReattempted ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600 inline" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300 inline" />
                        )}
                      </button>
                    </td>

                    <td className="py-2 px-3 font-mono text-slate-500 border-r border-slate-200">{m.date}</td>

                    <td className="py-2 px-3 border-r border-slate-200 font-semibold">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                        m.subject === 'Physics' ? 'bg-sky-100 text-sky-800' :
                        m.subject === 'Chemistry' ? 'bg-teal-100 text-teal-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {m.subject}
                      </span>
                    </td>

                    <td className="py-2 px-3 font-semibold text-slate-900 border-r border-slate-200">{m.chapter}</td>

                    <td className="py-2 px-3 text-slate-600 border-r border-slate-200">{m.questionSource || m.questionId || '-'}</td>

                    <td className="py-2 px-2 text-center border-r border-slate-200">
                      <span 
                        className="px-2 py-0.5 rounded text-[11px] font-bold text-white shadow-xs inline-block"
                        style={{ backgroundColor: typeInfo.color }}
                      >
                        {m.mistakeType}
                      </span>
                    </td>

                    <td className="py-2 px-3 text-slate-800 border-r border-slate-200 text-xs">{m.description || m.whyWrong}</td>

                    <td className="py-2 px-3 text-slate-700 border-r border-slate-200 text-xs font-medium bg-emerald-50/20">
                      {m.correctConcept}
                    </td>

                    <td className="py-2 px-2 text-center">
                      <button
                        onClick={() => onDeleteMistake(m.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
