import React, { useState } from 'react';
import { 
  ClipboardList, 
  Plus, 
  Trash2, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  Award
} from 'lucide-react';
import { MarkLossReason, MockTest, TestType } from '../../types';

interface MockAnalysisTabProps {
  mocks: MockTest[];
  onAddMock: (mock: Omit<MockTest, 'id'>) => void;
  onUpdateMock: (id: string, updates: Partial<MockTest>) => void;
  onDeleteMock: (id: string) => void;
  targetMarks: number;
}

export const MockAnalysisTab: React.FC<MockAnalysisTabProps> = ({
  mocks,
  onAddMock,
  onUpdateMock,
  onDeleteMock,
  targetMarks
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [testName, setTestName] = useState('');
  const [testType, setTestType] = useState<TestType>('Full syllabus');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [physicsScore, setPhysicsScore] = useState(0);
  const [chemistryScore, setChemistryScore] = useState(0);
  const [mathsScore, setMathsScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [unattempted, setUnattempted] = useState(0);
  const [reason, setReason] = useState<MarkLossReason>('Calculation errors');
  const [actionItems, setActionItems] = useState('');

  const reasonsList: MarkLossReason[] = [
    'Knowledge gaps',
    'Silly mistakes',
    'Calculation errors',
    'Time management',
    'Question selection'
  ];

  const handleCreateMock = (e: React.FormEvent) => {
    e.preventDefault();
    const totalScore = (correct * 4) - (incorrect * 1);
    const attempted = correct + incorrect;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    const gap = totalScore - targetMarks;

    onAddMock({
      date,
      mockNumber: `Mock #${mocks.length + 1}`,
      testName: testName.trim() || `Full Mock #${mocks.length + 1}`,
      testType,
      physicsScore,
      chemistryScore,
      mathsScore,
      totalScore,
      attempted,
      correct,
      incorrect,
      skipped: unattempted,
      unattempted,
      accuracy,
      targetScore: targetMarks,
      gap,
      majorReasonForLoss: reason,
      actionItems
    });

    setShowAddForm(false);
    setTestName('');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header Info & Diagnostic Framework (PRD Section 23) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900">Mock Analysis (Mark Leakage Diagnostic)</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Calculated via JEE marking rule: <code className="font-mono font-semibold text-teal-700 bg-teal-50 px-1 py-0.5 rounded">Total = (Correct &times; 4) &minus; (Incorrect &times; 1)</code>.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Close Form' : '+ Log New Mock Test'}</span>
        </button>
      </div>

      {/* Mock Diagnosis Guide Banner (PRD Section 23) */}
      <div className="bg-slate-900 text-white p-4 rounded-xl text-xs space-y-2">
        <span className="font-bold text-teal-400 uppercase tracking-wider">The 3-Type Mock Diagnosis Framework:</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
            <strong className="text-white block font-semibold mb-1">1. Knowledge Problem</strong>
            <p className="text-slate-300 text-[11px]">Unattempted count is high (&gt;35 Qs). Solution: Expand theory & formula mastery in weak chapters.</p>
          </div>
          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
            <strong className="text-white block font-semibold mb-1">2. Strategy Problem</strong>
            <p className="text-slate-300 text-[11px]">Got trapped in 1 difficult question for 10 minutes. Solution: Implement 2-round paper scanning.</p>
          </div>
          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
            <strong className="text-white block font-semibold mb-1">3. Accuracy Problem</strong>
            <p className="text-slate-300 text-[11px]">Attempted 65, but 18 incorrect (&minus;18 marks!). Solution: Stop guessing; skip 50-50 gambles.</p>
          </div>
        </div>
      </div>

      {/* Add Mock Modal / Form */}
      {showAddForm && (
        <form onSubmit={handleCreateMock} className="bg-slate-50 border border-slate-300 rounded-xl p-5 shadow-sm space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm">Log Test Data</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-slate-300 rounded-md p-1.5 bg-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Test Name</label>
              <input
                type="text"
                placeholder="e.g. Allen Leader Test 4"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full border border-slate-300 rounded-md p-1.5 bg-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Test Type</label>
              <select
                value={testType}
                onChange={(e) => setTestType(e.target.value as TestType)}
                className="w-full border border-slate-300 rounded-md p-1.5 bg-white text-xs"
              >
                <option value="Full syllabus">Full syllabus</option>
                <option value="Part test">Part test</option>
                <option value="Chapter test">Chapter test</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Major Reason for Mark Loss</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as MarkLossReason)}
                className="w-full border border-slate-300 rounded-md p-1.5 bg-white text-xs"
              >
                {reasonsList.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-2 border-t border-slate-200">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Physics Score</label>
              <input
                type="number"
                value={physicsScore}
                onChange={(e) => setPhysicsScore(Number(e.target.value) || 0)}
                className="w-full border border-slate-300 rounded-md p-1.5 bg-white text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Chemistry Score</label>
              <input
                type="number"
                value={chemistryScore}
                onChange={(e) => setChemistryScore(Number(e.target.value) || 0)}
                className="w-full border border-slate-300 rounded-md p-1.5 bg-white text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Maths Score</label>
              <input
                type="number"
                value={mathsScore}
                onChange={(e) => setMathsScore(Number(e.target.value) || 0)}
                className="w-full border border-slate-300 rounded-md p-1.5 bg-white text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Correct Qs (+4)</label>
              <input
                type="number"
                value={correct}
                onChange={(e) => setCorrect(Number(e.target.value) || 0)}
                className="w-full border border-slate-300 rounded-md p-1.5 bg-white text-xs text-emerald-700 font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Incorrect Qs (-1)</label>
              <input
                type="number"
                value={incorrect}
                onChange={(e) => setIncorrect(Number(e.target.value) || 0)}
                className="w-full border border-slate-300 rounded-md p-1.5 bg-white text-xs text-red-700 font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Unattempted</label>
              <input
                type="number"
                value={unattempted}
                onChange={(e) => setUnattempted(Number(e.target.value) || 0)}
                className="w-full border border-slate-300 rounded-md p-1.5 bg-white text-xs text-slate-500 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">3 Action Items for Next Mock</label>
            <input
              type="text"
              value={actionItems}
              onChange={(e) => setActionItems(e.target.value)}
              className="w-full border border-slate-300 rounded-md p-1.5 bg-white text-xs"
            />
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
              className="px-4 py-1.5 rounded bg-teal-700 hover:bg-teal-600 text-white font-bold"
            >
              Save Mock Test Record
            </button>
          </div>
        </form>
      )}

      {/* Mock Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[1000px]">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
              <tr>
                <th className="py-2.5 px-3 border-r border-slate-200">Date</th>
                <th className="py-2.5 px-3 border-r border-slate-200">Test Name</th>
                <th className="py-2.5 px-3 border-r border-slate-200">Type</th>
                <th className="py-2.5 px-2 text-center border-r border-slate-200">Phy</th>
                <th className="py-2.5 px-2 text-center border-r border-slate-200">Chem</th>
                <th className="py-2.5 px-2 text-center border-r border-slate-200">Math</th>
                <th className="py-2.5 px-3 text-center border-r border-slate-200 font-extrabold text-teal-800">Total</th>
                <th className="py-2.5 px-2 text-center border-r border-slate-200 text-emerald-700">Corr.</th>
                <th className="py-2.5 px-2 text-center border-r border-slate-200 text-red-700">Inc.</th>
                <th className="py-2.5 px-2 text-center border-r border-slate-200 text-slate-400">Unatt.</th>
                <th className="py-2.5 px-3 text-center border-r border-slate-200">Accuracy</th>
                <th className="py-2.5 px-3 text-center border-r border-slate-200">Gap</th>
                <th className="py-2.5 px-3 border-r border-slate-200">Major Mark Loss Cause</th>
                <th className="py-2.5 px-3 min-w-[200px] border-r border-slate-200">Action Items</th>
                <th className="py-2.5 px-2 text-center">Del</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mocks.length === 0 ? (
                <tr>
                  <td colSpan={15} className="py-12 text-center text-slate-500 bg-slate-50">
                    <ClipboardList className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-xs text-slate-700">No mock tests recorded yet</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Click "+ Log New Mock Test" above to log your first full syllabus or part test.</p>
                  </td>
                </tr>
              ) : (
                mocks.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2 px-3 font-mono text-slate-500 border-r border-slate-200">{m.date}</td>
                  <td className="py-2 px-3 font-semibold text-slate-900 border-r border-slate-200">{m.testName}</td>
                  <td className="py-2 px-3 border-r border-slate-200 text-slate-600">{m.testType}</td>
                  <td className="py-2 px-2 text-center border-r border-slate-200 font-semibold">{m.physicsScore}</td>
                  <td className="py-2 px-2 text-center border-r border-slate-200 font-semibold">{m.chemistryScore}</td>
                  <td className="py-2 px-2 text-center border-r border-slate-200 font-semibold">{m.mathsScore}</td>
                  <td className="py-2 px-3 text-center border-r border-slate-200 font-black text-sm text-teal-900 bg-teal-50/50">
                    {m.totalScore}
                  </td>
                  <td className="py-2 px-2 text-center border-r border-slate-200 font-bold text-emerald-700">{m.correct}</td>
                  <td className="py-2 px-2 text-center border-r border-slate-200 font-bold text-red-600">-{m.incorrect}</td>
                  <td className="py-2 px-2 text-center border-r border-slate-200 text-slate-400">{m.unattempted}</td>
                  <td className="py-2 px-3 text-center border-r border-slate-200 font-bold">
                    <span className={`px-1.5 py-0.5 rounded text-[11px] ${
                      m.accuracy >= 80 ? 'bg-emerald-100 text-emerald-800' :
                      m.accuracy >= 70 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {m.accuracy}%
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center border-r border-slate-200 font-semibold text-amber-700">
                    {m.gap !== undefined ? (m.gap >= 0 ? `+${m.gap}` : m.gap) : (m.totalScore - targetMarks >= 0 ? `+${m.totalScore - targetMarks}` : m.totalScore - targetMarks)}
                  </td>
                  <td className="py-2 px-3 border-r border-slate-200">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700 text-[11px]">
                      {m.majorReasonForLoss}
                    </span>
                  </td>
                  <td className="py-2 px-3 border-r border-slate-200 text-slate-600 text-[11px]">
                    {m.actionItems}
                  </td>
                  <td className="py-2 px-2 text-center">
                    <button
                      onClick={() => onDeleteMock(m.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5 inline" />
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
