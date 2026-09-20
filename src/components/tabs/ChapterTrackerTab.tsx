import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  CheckSquare, 
  Square, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  ArrowUpDown,
  BookOpen
} from 'lucide-react';
import { ChapterRecord, Confidence, Priority, Subject } from '../../types';
import { calculateChapterStatus } from '../../data/initialData';

interface ChapterTrackerTabProps {
  chapters: ChapterRecord[];
  onUpdateChapter: (chapterId: string, updates: Partial<ChapterRecord>) => void;
}

export const ChapterTrackerTab: React.FC<ChapterTrackerTabProps> = ({
  chapters,
  onUpdateChapter
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<'All' | Subject>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | Priority>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [specialFilter, setSpecialFilter] = useState<'All' | 'LowConfidence' | 'LowAccuracy' | 'PyqPending' | 'Mastered'>('All');

  // Filtered chapter list
  const filteredChapters = useMemo(() => {
    return chapters.filter(c => {
      // Search
      if (searchQuery && !c.chapter.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // Subject
      if (subjectFilter !== 'All' && c.subject !== subjectFilter) {
        return false;
      }
      // Priority
      if (priorityFilter !== 'All' && c.priority !== priorityFilter) {
        return false;
      }
      // Status
      if (statusFilter !== 'All' && c.status !== statusFilter) {
        return false;
      }
      // Special filters
      if (specialFilter === 'LowConfidence' && c.confidence > 2) return false;
      if (specialFilter === 'LowAccuracy' && (c.accuracy === 0 || c.accuracy >= 70)) return false;
      if (specialFilter === 'PyqPending' && c.pyqs) return false;
      if (specialFilter === 'Mastered' && c.status !== 'MASTERED') return false;

      return true;
    });
  }, [chapters, searchQuery, subjectFilter, priorityFilter, statusFilter, specialFilter]);

  const handleCheckboxChange = (
    id: string, 
    field: 'theory' | 'basicQuestions' | 'pyqs' | 'revision1' | 'revision2' | 'mockTested'
  ) => {
    const ch = chapters.find(c => c.id === id);
    if (!ch) return;
    const newValues = { ...ch, [field]: !ch[field] };
    const newStatus = calculateChapterStatus(
      newValues.theory,
      newValues.basicQuestions,
      newValues.pyqs,
      newValues.revision1,
      newValues.mockTested,
      newValues.accuracy
    );
    onUpdateChapter(id, { [field]: !ch[field], status: newStatus });
  };

  const handleAccuracyChange = (id: string, correct: number, attempted: number) => {
    const safeCorrect = Math.max(0, correct);
    const safeAttempted = Math.max(safeCorrect, attempted);
    const accuracy = safeAttempted > 0 ? Math.round((safeCorrect / safeAttempted) * 100) : 0;
    const ch = chapters.find(c => c.id === id);
    if (!ch) return;
    const newStatus = calculateChapterStatus(
      ch.theory,
      ch.basicQuestions,
      ch.pyqs,
      ch.revision1,
      ch.mockTested,
      accuracy
    );
    onUpdateChapter(id, { 
      correctCount: safeCorrect, 
      attemptedCount: safeAttempted, 
      accuracy,
      status: newStatus 
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4">
      {/* Header Info & Philosophy */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-600" />
            <h2 className="text-base font-bold text-slate-900">Chapter Tracker (Core Syllabus Database)</h2>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
              {filteredChapters.length} / {chapters.length} Chapters
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Status and mastery recalculate automatically based on Theory, PYQs, Mock Tested, and Accuracy (&ge;80%).
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
            MASTERED
          </span>
          <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-semibold">
            TESTED
          </span>
          <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-semibold">
            REVISION
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">
            PRACTICE
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
            LEARNING
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
            NOT STARTED
          </span>
        </div>
      </div>

      {/* Filter & Search Bar (PRD Section 31) */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-3 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search chapter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 text-xs"
            />
          </div>

          {/* Subject Filter */}
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value as any)}
            className="border border-slate-300 rounded-md px-2.5 py-1.5 bg-white text-xs"
          >
            <option value="All">All Subjects</option>
            <option value="Physics">Physics Only</option>
            <option value="Chemistry">Chemistry Only</option>
            <option value="Maths">Maths Only</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="border border-slate-300 rounded-md px-2.5 py-1.5 bg-white text-xs"
          >
            <option value="All">All Priorities</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-300 rounded-md px-2.5 py-1.5 bg-white text-xs"
          >
            <option value="All">All Statuses</option>
            <option value="MASTERED">Mastered Only</option>
            <option value="TESTED">Tested</option>
            <option value="REVISION">Revision Due</option>
            <option value="PRACTICE">Practice Needed</option>
            <option value="LEARNING">Learning</option>
            <option value="NOT STARTED">Not Started</option>
          </select>

          {/* Special Quick Filters */}
          <select
            value={specialFilter}
            onChange={(e) => setSpecialFilter(e.target.value as any)}
            className="border border-slate-300 rounded-md px-2.5 py-1.5 bg-white text-xs font-semibold text-emerald-800"
          >
            <option value="All">All Chapters</option>
            <option value="LowConfidence">Low Confidence (1-2 / 5)</option>
            <option value="LowAccuracy">Low Accuracy (&lt;70%)</option>
            <option value="PyqPending">PYQ Incomplete</option>
            <option value="Mastered">Mastered Only</option>
          </select>
        </div>
      </div>

      {/* Spreadsheet Table View */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[1050px]">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300 sticky top-0 z-20 select-none">
              <tr>
                <th className="py-2.5 px-3 w-10 text-center border-r border-slate-200 bg-slate-100">#</th>
                <th className="py-2.5 px-3 w-28 border-r border-slate-200 bg-slate-100">Subject</th>
                <th className="py-2.5 px-3 min-w-[200px] border-r border-slate-200 bg-slate-100">Chapter</th>
                <th className="py-2.5 px-3 w-24 border-r border-slate-200 bg-slate-100">Priority</th>
                <th className="py-2.5 px-2 text-center w-16 border-r border-slate-200 bg-slate-100" title="Theory completed">Theory</th>
                <th className="py-2.5 px-2 text-center w-16 border-r border-slate-200 bg-slate-100" title="Basic solved examples">Basic Qs</th>
                <th className="py-2.5 px-2 text-center w-16 border-r border-slate-200 bg-slate-100" title="Recent years PYQs done">PYQs</th>
                <th className="py-2.5 px-2 text-center w-16 border-r border-slate-200 bg-slate-100">Rev 1</th>
                <th className="py-2.5 px-2 text-center w-16 border-r border-slate-200 bg-slate-100">Rev 2</th>
                <th className="py-2.5 px-2 text-center w-16 border-r border-slate-200 bg-slate-100">Tested</th>
                <th className="py-2.5 px-3 w-28 border-r border-slate-200 bg-slate-100">Confidence</th>
                <th className="py-2.5 px-3 w-36 border-r border-slate-200 bg-slate-100">Accuracy (C/A)</th>
                <th className="py-2.5 px-3 w-28 border-r border-slate-200 bg-slate-100">Status</th>
                <th className="py-2.5 px-3 w-28 border-r border-slate-200 bg-slate-100">Next Rev.</th>
                <th className="py-2.5 px-3 min-w-[150px] bg-slate-100">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredChapters.map((ch, idx) => {
                // Conditional formatting for accuracy (PRD Section 14)
                let accBadgeColor = 'bg-slate-100 text-slate-600';
                if (ch.attemptedCount > 0) {
                  if (ch.accuracy >= 80) accBadgeColor = 'bg-emerald-100 text-emerald-800 font-bold';
                  else if (ch.accuracy >= 65) accBadgeColor = 'bg-amber-100 text-amber-800 font-medium';
                  else accBadgeColor = 'bg-rose-100 text-rose-800 font-bold';
                }

                return (
                  <tr key={ch.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Row Index */}
                    <td className="py-2 px-2 text-center font-mono text-slate-400 border-r border-slate-200">
                      {idx + 1}
                    </td>

                    {/* Subject Dropdown */}
                    <td className="py-2 px-2 border-r border-slate-200">
                      <select
                        value={ch.subject}
                        onChange={(e) => onUpdateChapter(ch.id, { subject: e.target.value as Subject })}
                        className="w-full bg-transparent font-medium text-slate-800 focus:bg-white rounded px-1 py-0.5 border border-transparent hover:border-slate-300"
                      >
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Maths">Maths</option>
                      </select>
                    </td>

                    {/* Chapter Name */}
                    <td className="py-2 px-3 font-semibold text-slate-900 border-r border-slate-200">
                      {ch.chapter}
                    </td>

                    {/* Priority Dropdown (PRD Section 11) */}
                    <td className="py-2 px-2 border-r border-slate-200">
                      <select
                        value={ch.priority}
                        onChange={(e) => onUpdateChapter(ch.id, { priority: e.target.value as Priority })}
                        className={`w-full font-bold text-[11px] rounded px-1.5 py-0.5 border ${
                          ch.priority === 'HIGH' 
                            ? 'bg-rose-50 text-rose-800 border-rose-300' 
                            : ch.priority === 'MEDIUM' 
                            ? 'bg-amber-50 text-amber-800 border-amber-300' 
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        <option value="HIGH">HIGH</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="LOW">LOW</option>
                      </select>
                    </td>

                    {/* Theory Checkbox */}
                    <td className="py-2 px-1 text-center border-r border-slate-200">
                      <button
                        onClick={() => handleCheckboxChange(ch.id, 'theory')}
                        className="text-slate-500 hover:text-emerald-600"
                      >
                        {ch.theory ? <CheckSquare className="w-4 h-4 text-emerald-600 inline" /> : <Square className="w-4 h-4 inline text-slate-300" />}
                      </button>
                    </td>

                    {/* Basic Questions Checkbox */}
                    <td className="py-2 px-1 text-center border-r border-slate-200">
                      <button
                        onClick={() => handleCheckboxChange(ch.id, 'basicQuestions')}
                        className="text-slate-500 hover:text-emerald-600"
                      >
                        {ch.basicQuestions ? <CheckSquare className="w-4 h-4 text-emerald-600 inline" /> : <Square className="w-4 h-4 inline text-slate-300" />}
                      </button>
                    </td>

                    {/* PYQs Checkbox */}
                    <td className="py-2 px-1 text-center border-r border-slate-200">
                      <button
                        onClick={() => handleCheckboxChange(ch.id, 'pyqs')}
                        className="text-slate-500 hover:text-emerald-600"
                      >
                        {ch.pyqs ? <CheckSquare className="w-4 h-4 text-emerald-600 inline" /> : <Square className="w-4 h-4 inline text-slate-300" />}
                      </button>
                    </td>

                    {/* Revision 1 */}
                    <td className="py-2 px-1 text-center border-r border-slate-200">
                      <button
                        onClick={() => handleCheckboxChange(ch.id, 'revision1')}
                        className="text-slate-500 hover:text-emerald-600"
                      >
                        {ch.revision1 ? <CheckSquare className="w-4 h-4 text-emerald-600 inline" /> : <Square className="w-4 h-4 inline text-slate-300" />}
                      </button>
                    </td>

                    {/* Revision 2 */}
                    <td className="py-2 px-1 text-center border-r border-slate-200">
                      <button
                        onClick={() => handleCheckboxChange(ch.id, 'revision2')}
                        className="text-slate-500 hover:text-emerald-600"
                      >
                        {ch.revision2 ? <CheckSquare className="w-4 h-4 text-emerald-600 inline" /> : <Square className="w-4 h-4 inline text-slate-300" />}
                      </button>
                    </td>

                    {/* Mock Tested */}
                    <td className="py-2 px-1 text-center border-r border-slate-200">
                      <button
                        onClick={() => handleCheckboxChange(ch.id, 'mockTested')}
                        className="text-slate-500 hover:text-emerald-600"
                      >
                        {ch.mockTested ? <CheckSquare className="w-4 h-4 text-emerald-600 inline" /> : <Square className="w-4 h-4 inline text-slate-300" />}
                      </button>
                    </td>

                    {/* Confidence Dropdown (PRD Section 13: 1 to 5) */}
                    <td className="py-2 px-2 border-r border-slate-200">
                      <select
                        value={ch.confidence}
                        onChange={(e) => onUpdateChapter(ch.id, { confidence: Number(e.target.value) as Confidence })}
                        className={`w-full text-xs font-semibold rounded px-1.5 py-0.5 border ${
                          ch.confidence <= 2 
                            ? 'bg-rose-50 text-rose-800 border-rose-200' 
                            : ch.confidence === 3 
                            ? 'bg-amber-50 text-amber-800 border-amber-200' 
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        <option value={1}>1 — Very weak</option>
                        <option value={2}>2 — Weak</option>
                        <option value={3}>3 — Average</option>
                        <option value={4}>4 — Good</option>
                        <option value={5}>5 — Strong</option>
                      </select>
                    </td>

                    {/* Accuracy Input + Auto % (PRD Section 14) */}
                    <td className="py-2 px-2 border-r border-slate-200">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          placeholder="C"
                          title="Correct questions"
                          value={ch.correctCount || ''}
                          onChange={(e) => handleAccuracyChange(ch.id, Number(e.target.value) || 0, ch.attemptedCount)}
                          className="w-10 px-1 py-0.5 border border-slate-200 rounded text-center text-xs"
                        />
                        <span className="text-slate-400">/</span>
                        <input
                          type="number"
                          placeholder="Att"
                          title="Attempted questions"
                          value={ch.attemptedCount || ''}
                          onChange={(e) => handleAccuracyChange(ch.id, ch.correctCount, Number(e.target.value) || 0)}
                          className="w-10 px-1 py-0.5 border border-slate-200 rounded text-center text-xs"
                        />
                        <span className={`px-1.5 py-0.5 rounded text-[11px] ${accBadgeColor}`}>
                          {ch.attemptedCount > 0 ? `${ch.accuracy}%` : '-'}
                        </span>
                      </div>
                    </td>

                    {/* Calculated Status (PRD Section 12) */}
                    <td className="py-2 px-2 border-r border-slate-200">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        ch.status === 'MASTERED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        ch.status === 'TESTED' ? 'bg-teal-100 text-teal-800' :
                        ch.status === 'REVISION' ? 'bg-purple-100 text-purple-800' :
                        ch.status === 'PRACTICE' ? 'bg-blue-100 text-blue-800' :
                        ch.status === 'LEARNING' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {ch.status}
                      </span>
                    </td>

                    {/* Next Revision Date */}
                    <td className="py-2 px-2 border-r border-slate-200">
                      <input
                        type="date"
                        value={ch.nextRevisionDate || ''}
                        onChange={(e) => onUpdateChapter(ch.id, { nextRevisionDate: e.target.value })}
                        className="w-full text-[11px] bg-transparent border-0 focus:bg-white focus:ring-1 focus:ring-emerald-500 rounded px-1"
                      />
                    </td>

                    {/* Notes */}
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        placeholder="Formula slips, tricky parts..."
                        value={ch.notes || ''}
                        onChange={(e) => onUpdateChapter(ch.id, { notes: e.target.value })}
                        className="w-full text-xs bg-transparent border-0 focus:bg-white focus:ring-1 focus:ring-emerald-500 rounded px-1 text-slate-700"
                      />
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
