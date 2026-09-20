import React, { useState, useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { 
  CheckCircle2, 
  Clock, 
  Flame, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  BookOpen, 
  Filter, 
  Sparkles,
  ArrowUpRight,
  PieChart as PieIcon,
  CheckSquare,
  Square
} from 'lucide-react';
import { 
  ChapterRecord, 
  DailyTask, 
  MistakeRecord, 
  MockTest, 
  Priority, 
  PyqRecord, 
  StudentProfile, 
  Subject 
} from '../../types';
import { MISTAKE_TYPES } from '../../data/initialData';

interface DashboardTabProps {
  profile: StudentProfile;
  chapters: ChapterRecord[];
  pyqs: PyqRecord[];
  dailyTasks: DailyTask[];
  mocks: MockTest[];
  mistakes: MistakeRecord[];
  onToggleTask: (taskId: string) => void;
  onNavigateToTab: (tab: any) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  profile,
  chapters,
  pyqs,
  dailyTasks,
  mocks,
  mistakes,
  onToggleTask,
  onNavigateToTab
}) => {
  const [viewFilter, setViewFilter] = useState<'All' | Subject>('All');
  const [priorityFilter, setPriorityFilter] = useState<'All' | Priority>('All');

  // Filtered chapters for statistics
  const filteredChapters = useMemo(() => {
    return chapters.filter(c => {
      if (viewFilter !== 'All' && c.subject !== viewFilter) return false;
      if (priorityFilter !== 'All' && c.priority !== priorityFilter) return false;
      return true;
    });
  }, [chapters, viewFilter, priorityFilter]);

  // Overall & Subject Completion Percentages (Mastered / Total)
  const stats = useMemo(() => {
    const total = chapters.length;
    const completed = chapters.filter(c => c.status === 'MASTERED' || c.status === 'TESTED' || c.status === 'REVISION').length;
    const overallPct = total > 0 ? Math.round((completed / total) * 100) : 0;

    const phy = chapters.filter(c => c.subject === 'Physics');
    const chem = chapters.filter(c => c.subject === 'Chemistry');
    const math = chapters.filter(c => c.subject === 'Maths');

    const phyDone = phy.filter(c => c.theory && c.pyqs).length;
    const chemDone = chem.filter(c => c.theory && c.pyqs).length;
    const mathDone = math.filter(c => c.theory && c.pyqs).length;

    const phyPct = phy.length > 0 ? Math.round((phyDone / phy.length) * 100) : 0;
    const chemPct = chem.length > 0 ? Math.round((chemDone / chem.length) * 100) : 0;
    const mathPct = math.length > 0 ? Math.round((mathDone / math.length) * 100) : 0;

    // PYQ completion across all chapters
    const totalPyqSlots = pyqs.length * 6;
    let solvedPyqs = 0;
    pyqs.forEach(p => {
      if (p.y2026) solvedPyqs++;
      if (p.y2025) solvedPyqs++;
      if (p.y2024) solvedPyqs++;
      if (p.y2023) solvedPyqs++;
      if (p.y2022) solvedPyqs++;
      if (p.y2021) solvedPyqs++;
    });
    const pyqPct = totalPyqSlots > 0 ? Math.round((solvedPyqs / totalPyqSlots) * 100) : 0;

    // Revision completion
    const revisionChapters = chapters.filter(c => c.revision1).length;
    const revisionPct = total > 0 ? Math.round((revisionChapters / total) * 100) : 0;

    // Mock scores
    const avgMockScore = mocks.length > 0 
      ? Math.round(mocks.reduce((acc, m) => acc + m.totalScore, 0) / mocks.length) 
      : profile.currentAvgScore;
    const latestMock = mocks.length > 0 ? mocks[mocks.length - 1] : null;
    const latestScore = latestMock ? latestMock.totalScore : profile.currentAvgScore;

    return {
      overallPct,
      phyPct,
      chemPct,
      mathPct,
      pyqPct,
      revisionPct,
      avgMockScore,
      latestScore,
      latestMock
    };
  }, [chapters, pyqs, mocks, profile]);

  // Section 6: Subject Performance Table
  const subjectPerformance = useMemo(() => {
    const latest = stats.latestMock;
    const pAvg = mocks.length > 0 ? Math.round(mocks.reduce((s, m) => s + m.physicsScore, 0) / mocks.length) : profile.physicsAvg;
    const cAvg = mocks.length > 0 ? Math.round(mocks.reduce((s, m) => s + m.chemistryScore, 0) / mocks.length) : profile.chemistryAvg;
    const mAvg = mocks.length > 0 ? Math.round(mocks.reduce((s, m) => s + m.mathsScore, 0) / mocks.length) : profile.mathsAvg;

    // Average accuracy from chapters or mocks
    const phyAcc = Math.round(chapters.filter(c => c.subject === 'Physics' && c.accuracy > 0).reduce((a, c, _, arr) => a + c.accuracy / (arr.length || 1), 0)) || 72;
    const chemAcc = Math.round(chapters.filter(c => c.subject === 'Chemistry' && c.accuracy > 0).reduce((a, c, _, arr) => a + c.accuracy / (arr.length || 1), 0)) || 81;
    const mathAcc = Math.round(chapters.filter(c => c.subject === 'Maths' && c.accuracy > 0).reduce((a, c, _, arr) => a + c.accuracy / (arr.length || 1), 0)) || 61;

    return [
      {
        subject: 'Physics',
        latest: latest ? latest.physicsScore : profile.physicsAvg,
        average: pAvg,
        accuracy: phyAcc
      },
      {
        subject: 'Chemistry',
        latest: latest ? latest.chemistryScore : profile.chemistryAvg,
        average: cAvg,
        accuracy: chemAcc
      },
      {
        subject: 'Maths',
        latest: latest ? latest.mathsScore : profile.mathsAvg,
        average: mAvg,
        accuracy: mathAcc
      }
    ];
  }, [mocks, stats.latestMock, chapters, profile]);

  // Section 7: Top 5 Chapters to Work on
  const topPriorities = useMemo(() => {
    // Score based on: Priority (High=3, Med=2, Low=1), Confidence (lower=more urgent), Accuracy (lower=more urgent), Not Mastered
    return [...chapters]
      .filter(c => c.status !== 'MASTERED')
      .map(c => {
        let score = 0;
        if (c.priority === 'HIGH') score += 50;
        else if (c.priority === 'MEDIUM') score += 25;
        score += (5 - c.confidence) * 12;
        if (c.accuracy > 0 && c.accuracy < 70) score += 20;
        if (!c.pyqs) score += 15;
        if (c.status === 'NOT STARTED') score += 10;
        return { ...c, calculatedUrgency: score };
      })
      .sort((a, b) => b.calculatedUrgency - a.calculatedUrgency)
      .slice(0, 5);
  }, [chapters]);

  // Section 8: Today's Tasks
  const todayTasks = useMemo(() => {
    return dailyTasks.slice(0, 6);
  }, [dailyTasks]);

  // Section 26: Mistake Distribution
  const mistakeAnalytics = useMemo(() => {
    const total = mistakes.length;
    if (total === 0) return [];

    const counts: Record<string, number> = {};
    mistakes.forEach(m => {
      counts[m.mistakeType] = (counts[m.mistakeType] || 0) + 1;
    });

    return Object.keys(MISTAKE_TYPES).map(code => {
      const count = counts[code] || 0;
      const pct = Math.round((count / total) * 100);
      return {
        code,
        label: MISTAKE_TYPES[code].label,
        count,
        pct,
        color: MISTAKE_TYPES[code].color
      };
    }).sort((a, b) => b.count - a.count);
  }, [mistakes]);

  // Chart data for Mock Trend
  const mockChartData = useMemo(() => {
    return mocks.map(m => ({
      name: m.mockNumber,
      score: m.totalScore,
      target: profile.targetMarks,
      physics: m.physicsScore,
      chemistry: m.chemistryScore,
      maths: m.mathsScore
    }));
  }, [mocks, profile.targetMarks]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Filter Bar (PRD Section 32) */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="font-bold text-slate-700 uppercase tracking-wider">Dashboard Filters:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">VIEW:</span>
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
              {(['All', 'Physics', 'Chemistry', 'Maths'] as const).map(view => (
                <button
                  key={view}
                  onClick={() => setViewFilter(view)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    viewFilter === view
                      ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">PRIORITY:</span>
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
              {(['All', 'HIGH', 'MEDIUM', 'LOW'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    priorityFilter === p
                      ? 'bg-slate-800 text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Metric Cards (PRD Section 4) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {/* Overall Completion */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Overall Comp.</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{stats.overallPct}%</div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${stats.overallPct}%` }}></div>
          </div>
        </div>

        {/* Physics */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-sky-700 uppercase">Physics</span>
          <div className="text-2xl font-black text-sky-950 mt-1">{stats.phyPct}%</div>
          <div className="w-full bg-sky-100 rounded-full h-1.5 mt-2">
            <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${stats.phyPct}%` }}></div>
          </div>
        </div>

        {/* Chemistry */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-teal-700 uppercase">Chemistry</span>
          <div className="text-2xl font-black text-teal-950 mt-1">{stats.chemPct}%</div>
          <div className="w-full bg-teal-100 rounded-full h-1.5 mt-2">
            <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: `${stats.chemPct}%` }}></div>
          </div>
        </div>

        {/* Maths */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-amber-700 uppercase">Maths</span>
          <div className="text-2xl font-black text-amber-950 mt-1">{stats.mathPct}%</div>
          <div className="w-full bg-amber-100 rounded-full h-1.5 mt-2">
            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${stats.mathPct}%` }}></div>
          </div>
        </div>

        {/* PYQ Completion */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-rose-700 uppercase">PYQ Solved</span>
          <div className="text-2xl font-black text-rose-950 mt-1">{stats.pyqPct}%</div>
          <div className="w-full bg-rose-100 rounded-full h-1.5 mt-2">
            <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: `${stats.pyqPct}%` }}></div>
          </div>
        </div>

        {/* Revision Completion */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-violet-700 uppercase">Revision Done</span>
          <div className="text-2xl font-black text-violet-950 mt-1">{stats.revisionPct}%</div>
          <div className="w-full bg-violet-100 rounded-full h-1.5 mt-2">
            <div className="bg-violet-500 h-1.5 rounded-full" style={{ width: `${stats.revisionPct}%` }}></div>
          </div>
        </div>

        {/* Avg Mock Score */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Avg Mock</span>
          <div className="text-2xl font-black text-slate-800 mt-1">{stats.avgMockScore}</div>
          <span className="text-[10px] text-slate-400 mt-2">out of 300</span>
        </div>

        {/* Latest Mock Score */}
        <div className="bg-emerald-50/70 border border-emerald-300 rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-emerald-800 uppercase">Latest Mock</span>
          <div className="text-2xl font-black text-emerald-900 mt-1">{stats.latestScore}</div>
          <span className="text-[10px] font-semibold text-emerald-700 mt-2">
            +{stats.latestScore - stats.avgMockScore >= 0 ? stats.latestScore - stats.avgMockScore : 0} vs avg
          </span>
        </div>
      </div>

      {/* Main Grid: Score Trend & Today's Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Trend (PRD Section 5) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Score Trend (Mocks &rarr; Total Marks)</h3>
                <p className="text-xs text-slate-500">Tracking progress toward your target score of {profile.targetMarks} marks.</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateToTab('MOCK ANALYSIS')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
            >
              <span>View All Mocks</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[80, 220]} stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <ReferenceLine y={profile.targetMarks} label="Target (180)" stroke="#10b981" strokeDasharray="4 4" />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#0f766e" 
                  strokeWidth={3} 
                  dot={{ r: 5, fill: '#0f766e', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7 }}
                  name="Mock Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Latest Mock: <strong>{stats.latestScore} / 300</strong></span>
            <span>Target: <strong className="text-emerald-600">{profile.targetMarks} / 300</strong></span>
            <span>Gap Remaining: <strong className="text-amber-600">{profile.targetMarks - stats.latestScore} marks</strong></span>
          </div>
        </div>

        {/* Section 8: Today's Tasks (Live Interactive Checkboxes) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Today's Tasks</h3>
              </div>
              <button
                onClick={() => onNavigateToTab('DAILY PLANNER')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5"
              >
                <span>Planner</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Check tasks off as you study to update completion rates.
            </p>

            <div className="space-y-2">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                    task.done
                      ? 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 text-slate-800'
                  }`}
                >
                  <button className="mt-0.5 text-slate-500 hover:text-emerald-600">
                    {task.done ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`px-1.5 py-0.2 rounded font-bold text-[10px] ${
                        task.subject === 'Physics' ? 'bg-sky-100 text-sky-800' :
                        task.subject === 'Chemistry' ? 'bg-teal-100 text-teal-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {task.subject}
                      </span>
                      <span className="font-semibold truncate">{task.chapter}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 truncate">{task.task}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              {todayTasks.filter(t => t.done).length} / {todayTasks.length} Completed
            </span>
            <span className="font-bold text-emerald-600">
              {todayTasks.length > 0 ? Math.round((todayTasks.filter(t => t.done).length / todayTasks.length) * 100) : 0}% Done
            </span>
          </div>
        </div>
      </div>

      {/* Row 3: Subject Performance & Top 5 Priorities & Mistake Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section 6: Subject Performance Table */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Subject Performance</h3>
          <p className="text-xs text-slate-500 mb-3">Identify which subject has the lowest score or accuracy leaks.</p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="pb-2">Subject</th>
                  <th className="pb-2 text-center">Latest</th>
                  <th className="pb-2 text-center">Average</th>
                  <th className="pb-2 text-right">Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjectPerformance.map(sp => (
                  <tr key={sp.subject} className="hover:bg-slate-50">
                    <td className="py-2.5 font-bold text-slate-800 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${
                        sp.subject === 'Physics' ? 'bg-sky-500' :
                        sp.subject === 'Chemistry' ? 'bg-teal-500' : 'bg-amber-500'
                      }`} />
                      <span>{sp.subject}</span>
                    </td>
                    <td className="py-2.5 text-center font-bold text-slate-900">{sp.latest}</td>
                    <td className="py-2.5 text-center text-slate-600">{sp.average}</td>
                    <td className="py-2.5 text-right font-semibold text-emerald-600">{sp.accuracy}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-2.5 bg-amber-50/70 border border-amber-200 rounded-lg text-amber-900 text-xs">
            <strong>Key Insight:</strong> Maths average ({profile.mathsAvg}) has lowest accuracy (61%). Solving 5 more accurate questions in Maths will recover 20 marks faster than pushing Chemistry from 62 to 70.
          </div>
        </div>

        {/* Section 7: Top 5 Chapters to Work On */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-slate-900">Current Priorities (Top 5)</h3>
            <button
              onClick={() => onNavigateToTab('REVISION QUEUE')}
              className="text-xs font-semibold text-violet-600 hover:text-violet-700"
            >
              Full Queue
            </button>
          </div>
          <p className="text-xs text-slate-500 mb-3">Auto-ranked by low confidence, pending PYQs, and priority weight.</p>

          <div className="space-y-2">
            {topPriorities.map((ch, idx) => (
              <div key={ch.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <div className="truncate">
                    <span className="font-bold text-slate-900 block truncate">{ch.chapter}</span>
                    <span className="text-[10px] text-slate-500">{ch.subject} • Priority: {ch.priority}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                  ch.confidence <= 2 ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  Conf: {ch.confidence}/5
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 26: Mistake Analytics */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-slate-900">Mistake Analytics</h3>
            <button
              onClick={() => onNavigateToTab('MISTAKE BOOK')}
              className="text-xs font-semibold text-red-600 hover:text-red-700"
            >
              Log Error
            </button>
          </div>
          <p className="text-xs text-slate-500 mb-3">Distribution of reasons why marks are lost across recent tests.</p>

          <div className="space-y-2">
            {mistakeAnalytics.map(m => (
              <div key={m.code} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                    <span>{m.label} ({m.code})</span>
                  </span>
                  <span className="font-bold text-slate-900">{m.pct}% ({m.count})</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-1.5 rounded-full transition-all" 
                    style={{ width: `${m.pct}%`, backgroundColor: m.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 mt-3 italic">
            Calculations & silly errors account for the majority of mark leakages — easily recoverable with scratchpad discipline!
          </p>
        </div>
      </div>
    </div>
  );
};
