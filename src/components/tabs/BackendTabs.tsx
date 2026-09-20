import React from 'react';
import { Database, Calculator, ListFilter, ShieldAlert } from 'lucide-react';
import { TabId } from '../SheetTabBar';
import { JEE_CHAPTERS_DATABASE, MISTAKE_TYPES } from '../../data/initialData';

interface BackendTabsProps {
  activeTab: TabId;
}

export const BackendTabs: React.FC<BackendTabsProps> = ({ activeTab }) => {
  if (activeTab === 'CHAPTER DATABASE') {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4">
        <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-sky-400" />
            <div>
              <h2 className="text-sm font-bold">Backend Sheet 10: CHAPTER DATABASE (Master Syllabus)</h2>
              <p className="text-xs text-slate-400">All 61 official chapters for JEE Main 2027 with standard priority classifications.</p>
            </div>
          </div>
          <span className="text-[11px] bg-sky-950 text-sky-300 border border-sky-800 px-2.5 py-1 rounded font-mono">
            Protected Reference
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300 sticky top-0 z-10">
                <tr>
                  <th className="py-2.5 px-3 w-12 text-center border-r border-slate-200">#</th>
                  <th className="py-2.5 px-3 w-32 border-r border-slate-200">Subject</th>
                  <th className="py-2.5 px-3 min-w-[240px] border-r border-slate-200">Chapter Name</th>
                  <th className="py-2.5 px-3 w-28 border-r border-slate-200">Class</th>
                  <th className="py-2.5 px-3 w-28">NTA Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {JEE_CHAPTERS_DATABASE.map((item, idx) => (
                  <tr key={`${item.subject}-${item.chapter}`} className="hover:bg-slate-50">
                    <td className="py-2 px-3 text-center font-mono text-slate-400 border-r border-slate-200">
                      {idx + 1}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-200 font-semibold">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                        item.subject === 'Physics' ? 'bg-sky-100 text-sky-800' :
                        item.subject === 'Chemistry' ? 'bg-teal-100 text-teal-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {item.subject}
                      </span>
                    </td>
                    <td className="py-2 px-3 font-semibold text-slate-900 border-r border-slate-200">
                      {item.chapter}
                    </td>
                    <td className="py-2 px-3 text-slate-600 border-r border-slate-200">
                      Class {item.classLevel}
                    </td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.defaultPriority === 'HIGH' ? 'bg-rose-100 text-rose-800' :
                        item.defaultPriority === 'MEDIUM' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {item.defaultPriority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'CALCULATIONS') {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4">
        <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-bold">Backend Sheet 11: DATA & CALCULATIONS ENGINE</h2>
              <p className="text-xs text-slate-400">Stores formulas for dashboard cards, completion aggregates and mark trends.</p>
            </div>
          </div>
          <span className="text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded font-mono">
            Hidden Backend Sheet
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
            <h3 className="font-bold text-slate-900 font-sans text-sm">Dashboard Aggregation Formulas</h3>
            <div className="bg-slate-900 text-slate-200 p-3 rounded-lg overflow-x-auto space-y-1.5">
              <p><span className="text-emerald-400">OVERALL_PCT:</span> =COUNTIF('CHAPTER TRACKER'!L2:L62, "MASTERED")/COUNTA('CHAPTER TRACKER'!B2:B62)</p>
              <p><span className="text-sky-400">PHY_PCT:</span> =COUNTIFS('CHAPTER TRACKER'!A:A, "Physics", 'CHAPTER TRACKER'!D:D, TRUE, 'CHAPTER TRACKER'!F:F, TRUE)/21</p>
              <p><span className="text-teal-400">CHEM_PCT:</span> =COUNTIFS('CHAPTER TRACKER'!A:A, "Chemistry", 'CHAPTER TRACKER'!D:D, TRUE, 'CHAPTER TRACKER'!F:F, TRUE)/20</p>
              <p><span className="text-amber-400">MATH_PCT:</span> =COUNTIFS('CHAPTER TRACKER'!A:A, "Maths", 'CHAPTER TRACKER'!D:D, TRUE, 'CHAPTER TRACKER'!F:F, TRUE)/20</p>
              <p><span className="text-rose-400">PYQ_TOTAL:</span> =SUM('PYQ TRACKER'!C2:H62)/(61*6)*100</p>
              <p><span className="text-violet-400">REVISION_TOTAL:</span> =COUNTIF('CHAPTER TRACKER'!G2:G62, TRUE)/61*100</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
            <h3 className="font-bold text-slate-900 font-sans text-sm">JEE Standard Scoring Formulas</h3>
            <div className="bg-slate-900 text-slate-200 p-3 rounded-lg overflow-x-auto space-y-1.5">
              <p><span className="text-teal-400">TOTAL_MARKS:</span> =(H2*4) - (I2*1)</p>
              <p><span className="text-teal-400">ACCURACY:</span> =H2/(H2+I2)*100</p>
              <p><span className="text-teal-400">GAP:</span> =TOTAL_MARKS - 'START HERE'!B6</p>
              <p><span className="text-teal-400">URGENCY_RANK:</span> =INDEX(FILTER(Queue, Confidence&lt;=2), 1)</p>
              <p><span className="text-teal-400">DAILY_COMP:</span> =COUNTIF('DAILY PLANNER'!G:G, TRUE)/COUNTA('DAILY PLANNER'!E:E)</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DROPDOWN DATA
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4">
      <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListFilter className="w-5 h-5 text-indigo-400" />
          <div>
            <h2 className="text-sm font-bold">Backend Sheet 12: DROPDOWN & DATA VALIDATION</h2>
            <p className="text-xs text-slate-400">Enforces standard naming conventions so formulas never break due to typos.</p>
          </div>
        </div>
        <span className="text-[11px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-2.5 py-1 rounded font-mono">
          Data Validation Source
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Subject */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
          <h4 className="font-bold text-slate-900">1. Subjects</h4>
          <ul className="space-y-1 text-slate-700">
            <li className="p-1.5 bg-slate-50 rounded">Physics</li>
            <li className="p-1.5 bg-slate-50 rounded">Chemistry</li>
            <li className="p-1.5 bg-slate-50 rounded">Maths</li>
          </ul>
        </div>

        {/* Priority */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
          <h4 className="font-bold text-slate-900">2. Priority</h4>
          <ul className="space-y-1 text-slate-700">
            <li className="p-1.5 bg-rose-50 text-rose-800 font-bold rounded">HIGH</li>
            <li className="p-1.5 bg-amber-50 text-amber-800 font-bold rounded">MEDIUM</li>
            <li className="p-1.5 bg-slate-50 text-slate-700 font-bold rounded">LOW</li>
          </ul>
        </div>

        {/* Status */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
          <h4 className="font-bold text-slate-900">3. Chapter Status</h4>
          <ul className="space-y-1 text-slate-700 font-medium">
            <li className="p-1.5 bg-slate-100 rounded">NOT STARTED</li>
            <li className="p-1.5 bg-amber-100 rounded">LEARNING</li>
            <li className="p-1.5 bg-blue-100 rounded">PRACTICE</li>
            <li className="p-1.5 bg-purple-100 rounded">REVISION</li>
            <li className="p-1.5 bg-teal-100 rounded">TESTED</li>
            <li className="p-1.5 bg-emerald-100 font-bold text-emerald-800 rounded">MASTERED</li>
          </ul>
        </div>

        {/* Mistake Codes */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
          <h4 className="font-bold text-slate-900">4. Mistake Codes</h4>
          <ul className="space-y-1 text-slate-700">
            {Object.entries(MISTAKE_TYPES).map(([code, info]) => (
              <li key={code} className="p-1 bg-slate-50 rounded flex items-center justify-between">
                <span className="font-bold" style={{ color: info.color }}>{code}</span>
                <span className="text-[11px] text-slate-500">{info.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
