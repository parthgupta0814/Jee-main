import React, { useMemo } from 'react';
import { 
  TrendingUp, 
  Target, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Flag,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ChapterRecord, MistakeRecord, MockTest, PyqRecord, StudentProfile } from '../../types';

interface GoalsProgressTabProps {
  profile: StudentProfile;
  chapters: ChapterRecord[];
  pyqs: PyqRecord[];
  mocks: MockTest[];
  mistakes: MistakeRecord[];
}

export const GoalsProgressTab: React.FC<GoalsProgressTabProps> = ({
  profile,
  chapters,
  pyqs,
  mocks,
  mistakes
}) => {
  const totalChapters = chapters.length;
  const completedChapters = chapters.filter(c => c.theory && c.pyqs).length;
  const revisedChapters = chapters.filter(c => c.revision1).length;

  const totalPyqSolved = pyqs.filter(p => p.y2026 && p.y2025 && p.y2024).length;
  const reattemptedMistakes = mistakes.filter(m => (m.reattemptStatus ?? m.reattempted)).length;
  const reattemptRate = mistakes.length > 0 ? Math.round((reattemptedMistakes / mistakes.length) * 100) : 0;

  const latestScore = mocks.length > 0 ? mocks[mocks.length - 1].totalScore : null;
  const scoreGap = latestScore !== null && profile.targetMarks > 0 ? profile.targetMarks - latestScore : null;

  // PRD Section 30 Milestones
  const milestones = [
    {
      id: 1,
      title: 'Milestone 1 — Baseline Consolidation',
      targetScore: 140,
      reqSyllabus: 50,
      reqMocks: 3,
      desc: 'Complete 50% syllabus with 2021-2024 PYQs and 3 full mocks.',
      achieved: latestScore !== null && latestScore >= 140 && mocks.length >= 3
    },
    {
      id: 2,
      title: 'Milestone 2 — Revision & Error Elimination',
      targetScore: 165,
      reqSyllabus: 75,
      reqMocks: 6,
      desc: '75% syllabus covered + 1st revision completed + mistake reattempt rate >= 60%.',
      achieved: latestScore !== null && latestScore >= 165 && reattemptRate >= 60 && mocks.length >= 6
    },
    {
      id: 3,
      title: 'Milestone 3 — Target Score Realization',
      targetScore: profile.targetMarks > 0 ? profile.targetMarks : 180,
      reqSyllabus: 90,
      reqMocks: 10,
      desc: `Hit your North Star target of ${profile.targetMarks > 0 ? profile.targetMarks : 180} marks across consecutive mocks.`,
      achieved: profile.targetMarks > 0 && latestScore !== null && latestScore >= profile.targetMarks
    },
    {
      id: 4,
      title: 'Milestone 4 — 99 Percentile Score Peak',
      targetScore: 210,
      reqSyllabus: 95,
      reqMocks: 15,
      desc: 'Mastery across 95% of chapters with <8 negative marks per test.',
      achieved: latestScore !== null && latestScore >= 210
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Goals & Score Recovery Progress</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {profile.targetMarks > 0 
              ? `Track your progress toward your target score of ${profile.targetMarks} marks (${profile.targetPercentile || 'JEE Main'}).`
              : 'Track your syllabus coverage, revision milestones, and mock scores.'}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 text-blue-950 font-bold">
            Target Score: <span className="text-blue-700 font-black">{profile.targetMarks > 0 ? profile.targetMarks : '—'}</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 text-emerald-950 font-bold">
            Latest Score: <span className="text-emerald-700 font-black">{latestScore !== null ? latestScore : '—'}</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 text-amber-950 font-bold">
            Gap Remaining: <span className="text-amber-700 font-black">{scoreGap !== null ? `${Math.max(0, scoreGap)} marks` : '—'}</span>
          </div>
        </div>
      </div>

      {/* Core Counters Grid (PRD Section 30) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Chapters Completed */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Syllabus Covered</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {completedChapters} <span className="text-xs text-slate-400 font-normal">/ {totalChapters}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{Math.round((completedChapters / totalChapters) * 100)}% complete</p>
        </div>

        {/* Revision Completed */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Revision 1 Done</span>
          <div className="text-2xl font-black text-violet-950 mt-1">
            {revisedChapters} <span className="text-xs text-slate-400 font-normal">/ {totalChapters}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{Math.round((revisedChapters / totalChapters) * 100)}% reviewed</p>
        </div>

        {/* PYQs Completed */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">3-Yr PYQs Done</span>
          <div className="text-2xl font-black text-rose-950 mt-1">
            {totalPyqSolved} <span className="text-xs text-slate-400 font-normal">/ {totalChapters}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">2024-26 thoroughly solved</p>
        </div>

        {/* Mocks Given */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Mocks Analyzed</span>
          <div className="text-2xl font-black text-teal-950 mt-1">
            {mocks.length} <span className="text-xs text-slate-400 font-normal">tests</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Logged with JEE mark formula</p>
        </div>

        {/* Mistakes Logged */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Mistakes Logged</span>
          <div className="text-2xl font-black text-red-950 mt-1">
            {mistakes.length} <span className="text-xs text-slate-400 font-normal">errors</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Root causes cataloged</p>
        </div>

        {/* Mistakes Reattempted */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase">Reattempt Rate</span>
          <div className="text-2xl font-black text-emerald-900 mt-1">
            {reattemptRate}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{reattemptedMistakes} / {mistakes.length} resolved</p>
        </div>
      </div>

      {/* Preparation Milestones */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">JEE Main 2027 Score Milestones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((m) => (
            <div 
              key={m.id}
              className={`p-4 rounded-xl border transition-all ${
                m.achieved 
                  ? 'bg-emerald-50/60 border-emerald-300' 
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Flag className={`w-4 h-4 ${m.achieved ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold text-slate-900">{m.title}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  m.achieved ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-200 text-slate-700'
                }`}>
                  {m.achieved ? 'COMPLETED' : 'IN PROGRESS'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold mb-1">
                <span>Target Score: <strong className="text-emerald-700">{m.targetScore} marks</strong></span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Score Gap Math Box */}
      <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-2">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
          How to eliminate the {scoreGap} Mark Deficit:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
            <strong className="text-amber-400 block font-semibold mb-1">1. Stop -1 Silly Mark Leaks</strong>
            <p className="text-slate-300 text-[11px]">
              If you currently make 14 incorrect attempts in each mock, cutting that to 6 recovers <strong>+10 marks</strong> immediately with zero extra study!
            </p>
          </div>
          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
            <strong className="text-amber-400 block font-semibold mb-1">2. Master 6 High-Weight Chapters</strong>
            <p className="text-slate-300 text-[11px]">
              6 chapters solved accurately in JEE Main = 6 questions &times; 4 marks = <strong>+24 marks</strong>.
            </p>
          </div>
          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
            <strong className="text-amber-400 block font-semibold mb-1">3. Reattempt Mistake Book</strong>
            <p className="text-slate-300 text-[11px]">
              Reattempting all 38 errors ensures that identical questions in Mock 6 and JEE Main won't trip you up again: <strong>+16 marks</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
