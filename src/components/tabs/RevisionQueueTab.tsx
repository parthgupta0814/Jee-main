import React, { useMemo } from 'react';
import { 
  RefreshCw, 
  Clock, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  Layers
} from 'lucide-react';
import { ChapterRecord, Confidence } from '../../types';

interface RevisionQueueTabProps {
  chapters: ChapterRecord[];
  onUpdateChapter: (chapterId: string, updates: Partial<ChapterRecord>) => void;
  onNavigateToTab: (tab: any) => void;
}

export const RevisionQueueTab: React.FC<RevisionQueueTabProps> = ({
  chapters,
  onUpdateChapter,
  onNavigateToTab
}) => {
  // Rank chapters for revision queue
  const queue = useMemo(() => {
    return chapters
      .filter(c => c.status !== 'NOT STARTED')
      .map(c => {
        let urgency = 0;
        let reasons: string[] = [];

        // Priority weight
        if (c.priority === 'HIGH') {
          urgency += 40;
          reasons.push('High NTA Weight');
        } else if (c.priority === 'MEDIUM') {
          urgency += 20;
        }

        // Confidence deficit
        if (c.confidence <= 2) {
          urgency += 45;
          reasons.push(`Low Confidence (${c.confidence}/5)`);
        } else if (c.confidence === 3) {
          urgency += 20;
        }

        // Accuracy deficit
        if (c.accuracy > 0 && c.accuracy < 70) {
          urgency += 35;
          reasons.push(`Low Accuracy (${c.accuracy}%)`);
        }

        // Revision status
        if (!c.revision1) {
          urgency += 30;
          reasons.push('Rev 1 Pending (3d interval)');
        } else if (!c.revision2) {
          urgency += 20;
          reasons.push('Rev 2 Pending (7d interval)');
        }

        // Needs test validation
        if (!c.mockTested) {
          urgency += 15;
          reasons.push('Untested in Mock');
        }

        return {
          ...c,
          urgencyScore: urgency,
          primaryReasons: reasons
        };
      })
      .sort((a, b) => b.urgencyScore - a.urgencyScore);
  }, [chapters]);

  const topPick = queue[0];

  const handleMarkRevision = (chapterId: string, isRev1Done: boolean) => {
    if (!isRev1Done) {
      onUpdateChapter(chapterId, { revision1: true });
    } else {
      onUpdateChapter(chapterId, { revision2: true });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header & Product Vision (PRD Section 27) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-violet-600" />
            <h2 className="text-base font-bold text-slate-900">
              Revision Queue (Algorithmic Spaced Repetition)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            “Students revise what they like, not what they forget. This algorithm ensures you revise where marks are bleeding.”
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-violet-50 text-violet-900 px-3 py-1.5 rounded-lg border border-violet-200 font-bold">
          <Clock className="w-4 h-4 text-violet-600" />
          <span>{queue.length} Chapters in Active Review Loop</span>
        </div>
      </div>

      {/* Immediate Next Action Spotlight Card: “Mujhe abhi kya karna chahiye?” */}
      {topPick ? (
        <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white rounded-xl p-6 shadow-md border border-violet-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>RECOMMENDED RIGHT NOW: “Mujhe abhi exactly kya karna chahiye?”</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {topPick.chapter} ({topPick.subject})
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Why this chapter?{' '}
              <strong className="text-emerald-400">
                {topPick.primaryReasons.join(' • ')}
              </strong>
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 text-slate-300">
                Confidence: {topPick.confidence}/5
              </span>
              <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 text-slate-300">
                Accuracy: {topPick.accuracy > 0 ? `${topPick.accuracy}%` : 'Unrated'}
              </span>
              <span className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 text-slate-300">
                Priority: {topPick.priority}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <button
              onClick={() => handleMarkRevision(topPick.id, topPick.revision1)}
              className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-colors text-center"
            >
              {!topPick.revision1 ? 'Mark Revision 1 Done' : 'Mark Revision 2 Done'}
            </button>
            <button
              onClick={() => onNavigateToTab('PYQ TRACKER')}
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors text-center"
            >
              Open PYQs
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xs border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-violet-400">
              <Sparkles className="w-4 h-4" />
              <span>SPACED REPETITION ENGINE READY</span>
            </div>
            <h3 className="text-lg font-bold text-white">No chapters currently in the revision queue</h3>
            <p className="text-xs text-slate-300">
              Start studying chapters in the Syllabus or PYQ tracker to feed the automated 3-day and 7-day revision cycle.
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('SYLLABUS')}
            className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shrink-0 transition-colors"
          >
            Go to Syllabus
          </button>
        </div>
      )}

      {/* Spaced Repetition Engine Rules (PRD Section 29) */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
        <span className="font-bold text-slate-800 uppercase tracking-wider">
          Section 29 — The 3-Interval Spaced Repetition Engine:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <strong className="text-violet-700 block font-semibold mb-0.5">Revision 1 (Day 3)</strong>
            <p className="text-slate-600 text-[11px]">Formula consolidation + re-solve 5 circled wrong PYQs.</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <strong className="text-violet-700 block font-semibold mb-0.5">Revision 2 (Day 7)</strong>
            <p className="text-slate-600 text-[11px]">Timed 15-question mixed sprint under 30 minutes.</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <strong className="text-violet-700 block font-semibold mb-0.5">Revision 3 (Day 21)</strong>
            <p className="text-slate-600 text-[11px]">Full chapter test or part mock validation.</p>
          </div>
        </div>
      </div>

      {/* Full Priority Queue Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[850px]">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
              <tr>
                <th className="py-2.5 px-3 w-12 text-center border-r border-slate-200">Rank</th>
                <th className="py-2.5 px-3 w-28 border-r border-slate-200">Subject</th>
                <th className="py-2.5 px-3 min-w-[200px] border-r border-slate-200">Chapter</th>
                <th className="py-2.5 px-3 w-24 border-r border-slate-200">Priority</th>
                <th className="py-2.5 px-3 w-28 border-r border-slate-200">Confidence</th>
                <th className="py-2.5 px-3 w-24 border-r border-slate-200 text-center">Accuracy</th>
                <th className="py-2.5 px-3 min-w-[220px] border-r border-slate-200">Primary Urgency Triggers</th>
                <th className="py-2.5 px-3 w-36 text-center">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {queue.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 bg-slate-50">
                    <RefreshCw className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-xs text-slate-700">Revision queue is clear</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">As you mark chapters IN PROGRESS or COMPLETED in the Syllabus Tracker, they will automatically be prioritized here for spaced revision.</p>
                  </td>
                </tr>
              ) : (
                queue.map((ch, idx) => (
                <tr key={ch.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2 px-3 text-center font-bold text-slate-500 border-r border-slate-200 font-mono">
                    #{idx + 1}
                  </td>

                  <td className="py-2 px-3 border-r border-slate-200 font-semibold">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                      ch.subject === 'Physics' ? 'bg-sky-100 text-sky-800' :
                      ch.subject === 'Chemistry' ? 'bg-teal-100 text-teal-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {ch.subject}
                    </span>
                  </td>

                  <td className="py-2 px-3 font-semibold text-slate-900 border-r border-slate-200">
                    {ch.chapter}
                  </td>

                  <td className="py-2 px-3 border-r border-slate-200">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ch.priority === 'HIGH' ? 'bg-rose-100 text-rose-800' :
                      ch.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {ch.priority}
                    </span>
                  </td>

                  <td className="py-2 px-3 border-r border-slate-200">
                    <span className={`font-semibold ${ch.confidence <= 2 ? 'text-rose-700' : 'text-slate-700'}`}>
                      {ch.confidence} / 5
                    </span>
                  </td>

                  <td className="py-2 px-3 text-center border-r border-slate-200 font-bold">
                    {ch.attemptedCount > 0 ? (
                      <span className={ch.accuracy >= 75 ? 'text-emerald-700' : 'text-rose-700'}>
                        {ch.accuracy}%
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>

                  <td className="py-2 px-3 border-r border-slate-200 text-slate-600">
                    <div className="flex flex-wrap gap-1">
                      {ch.primaryReasons.map((r, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                          {r}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => handleMarkRevision(ch.id, ch.revision1)}
                      className="px-2.5 py-1 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold text-[11px] shadow-xs transition-colors"
                    >
                      {!ch.revision1 ? 'Tick Rev 1' : !ch.revision2 ? 'Tick Rev 2' : 'Mastered'}
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
