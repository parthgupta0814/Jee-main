import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Printer, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Clock, 
  Target 
} from 'lucide-react';

interface QuickStartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickStartModal: React.FC<QuickStartModalProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 8;

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold">JEE Main 2027 Score Recovery Kit — User Guide</h2>
              <p className="text-xs text-slate-400">Official Quick Start Guide (PDF Format)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Guide</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 text-slate-800 leading-relaxed text-sm bg-slate-50/50">
          {currentPage === 1 && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Page 1 of 8</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  1. The Score Recovery Kit Philosophy
                </h3>
                <p className="text-slate-600 italic mt-1">
                  «“Mujhe abhi exactly kya karna chahiye?”»
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-900">
                <h4 className="font-bold text-sm mb-1">Important Mindset Shift:</h4>
                <p className="text-xs leading-relaxed">
                  Don't use this as another rigid timetable. Use it to decide what to study, what to practice, what to revise, and why your marks are being lost. The kit does NOT replace coaching, lectures, books, or PYQ sets. It organizes your existing resources into an honest feedback loop.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900">The 10-Step Core Feedback Loop:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                  {['1. Setup', '2. Diagnose', '3. Prioritize', '4. Plan', '5. Study', '6. Practice', '7. Test', '8. Analyse', '9. Revise', '10. Repeat'].map((step, i) => (
                    <div key={step} className="p-2.5 bg-white border border-slate-200 rounded text-center font-medium shadow-xs">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">How Much Time Does This Take?</h4>
                <p className="text-xs text-slate-600">
                  You should NOT spend 20 minutes maintaining spreadsheets. Daily maintenance takes only <strong>2 to 5 minutes</strong>: check tasks in the morning, tick them when completed, log mock scores after test days.
                </p>
              </div>
            </div>
          )}

          {currentPage === 2 && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Page 2 of 8</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  2. Day 0 Setup & Baseline Diagnosis
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <p>
                  Start on the <strong>1. START HERE</strong> tab. Fill in your diagnostic parameters accurately:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                  <li><strong>Target Marks & Percentile:</strong> Your realistic North Star for JEE Main 2027 (e.g. 180 marks for ~98.8%ile).</li>
                  <li><strong>Current Average Mock Score:</strong> What you currently score across 3-hour tests.</li>
                  <li><strong>Subject Scores:</strong> Current average breakdown in Physics, Chemistry, and Mathematics.</li>
                  <li><strong>Daily Available Study Hours:</strong> Honest hours (excluding school and coaching lectures).</li>
                  <li><strong>Current Preparation Level:</strong> Choose from &lt;25%, 25–50%, 50–75%, 75–90%, 90%+.</li>
                </ul>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-900">
                  <strong>The Score Gap:</strong> The system immediately calculates your deficit (e.g., Target 180 − Current 132 = 48 marks needed). Every mark you recover corresponds to roughly 12 to 15 eliminated errors or 12 extra questions answered accurately.
                </div>
              </div>
            </div>
          )}

          {currentPage === 3 && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Page 3 of 8</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  3. Mastering the Chapter Tracker
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <p>
                  The <strong>CHAPTER TRACKER</strong> tab lists all ~60 official chapters of JEE Main. It is the heart of your syllabus state.
                </p>

                <div className="bg-white border border-slate-200 rounded p-3 space-y-2">
                  <h4 className="font-bold text-slate-900">Automatic Status Calculation Rules:</h4>
                  <ul className="space-y-1.5 text-slate-700">
                    <li><span className="font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">NOT STARTED</span> — Theory is not completed yet.</li>
                    <li><span className="font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">LEARNING</span> — Theory is underway.</li>
                    <li><span className="font-semibold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">PRACTICE</span> — Theory is done, but question practice is incomplete.</li>
                    <li><span className="font-semibold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">REVISION</span> — PYQs and practice completed; revision cycle is due.</li>
                    <li><span className="font-semibold text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded">TESTED</span> — Tested in chapter test or mock exam.</li>
                    <li><span className="font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">MASTERED</span> — Strict criteria: Theory=YES + PYQ=YES + Rev 1=YES + Mock Tested=YES + Accuracy &ge; 80%!</li>
                  </ul>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-900">
                  <strong>Confidence vs Completion:</strong> Always update your 1 to 5 Confidence score. Never fool yourself into thinking a chapter is ready just because you watched a lecture!
                </div>
              </div>
            </div>
          )}

          {currentPage === 4 && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Page 4 of 8</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  4. The 5-Round PYQ Protocol
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <p>
                  The kit does not include copyrighted questions; you already have PYQ books or apps (Marks, Disha, etc.). The <strong>PYQ TRACKER</strong> tab tracks whether you have actually solved recent years (2021 through 2026).
                </p>

                <div className="space-y-2">
                  <div className="p-2.5 bg-white border border-slate-200 rounded">
                    <strong>Round 1 — Solve Normally:</strong> Set a timer. 25 questions in 45-60 minutes without looking at solutions.
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded">
                    <strong>Round 2 — Mark Wrong Questions:</strong> Circle every question you got wrong or guessed.
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded">
                    <strong>Round 3 — Study Mistake Reason:</strong> Identify whether it was Concept, Formula, Silly, or Calculation.
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded">
                    <strong>Round 4 — Reattempt Wrong Questions:</strong> Solve them again from a blank sheet of paper after 48 hours.
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded">
                    <strong>Round 5 — Recheck:</strong> Re-test after 14-21 days during revision queue cycles.
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === 5 && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Page 5 of 8</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  5. Daily Planning & Time Realism
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <p>
                  Use the <strong>DAILY PLANNER</strong> to write 3 to 5 realistic tasks for today.
                </p>
                <div className="bg-white border border-slate-200 rounded p-3 space-y-2">
                  <h4 className="font-bold text-slate-900">Task Types:</h4>
                  <p className="text-slate-600">
                    Theory, Revision, PYQ, Practice, Mock, Mock Analysis, Mistake Reattempt, NCERT, Formula Revision.
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-950">
                  <strong>Plan Realism Metric:</strong> The sheet compares Planned Time vs Actual Time. The goal is NOT to boast about 14 hours, but to verify whether your plan was achievable and adhered to without burnout.
                </div>
              </div>
            </div>
          )}

          {currentPage === 6 && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Page 6 of 8</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  6. Mock Analysis: Diagnose Mark Leaks
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <p>
                  Every mock you give must be logged in <strong>MOCK ANALYSIS</strong> within 4 hours of test completion.
                </p>
                <div className="bg-white border border-slate-200 rounded p-3 space-y-2">
                  <h4 className="font-bold text-slate-900">Automatic JEE Marking Formula:</h4>
                  <p className="font-mono bg-slate-100 p-2 rounded text-slate-800">
                    Total Score = (Correct &times; 4) &minus; (Incorrect &times; 1)
                  </p>
                  <p className="text-slate-600">
                    Accuracy = (Correct / Attempted) &times; 100. If accuracy is below 75%, stop trying to attempt 70 questions!
                  </p>
                </div>
                <div className="p-3 bg-rose-50 border border-rose-200 rounded text-rose-950">
                  <strong>Diagnosis:</strong> Disentangle Knowledge Problem (didn't know concept) vs Strategy Problem (spent 7 minutes on 1 question) vs Accuracy Problem (14 negatives).
                </div>
              </div>
            </div>
          )}

          {currentPage === 7 && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Page 7 of 8</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  7. The Mistake Book & Error Distribution
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <p>
                  Log every wrong question in the <strong>MISTAKE BOOK</strong> with its exact Mistake Code:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 border border-slate-200 rounded bg-white">
                    <strong className="text-red-600">C — Concept:</strong> Failed fundamental mechanism.
                  </div>
                  <div className="p-2 border border-slate-200 rounded bg-white">
                    <strong className="text-orange-600">F — Formula:</strong> Forgot or corrupted formula.
                  </div>
                  <div className="p-2 border border-slate-200 rounded bg-white">
                    <strong className="text-yellow-600">S — Silly:</strong> Sign slip, copy error.
                  </div>
                  <div className="p-2 border border-slate-200 rounded bg-white">
                    <strong className="text-purple-600">CALC — Calculation:</strong> Arithmetic blunders.
                  </div>
                  <div className="p-2 border border-slate-200 rounded bg-white">
                    <strong className="text-cyan-600">R — Reading:</strong> Misread question constraint.
                  </div>
                  <div className="p-2 border border-slate-200 rounded bg-white">
                    <strong className="text-pink-600">T — Time:</strong> Panicked under time clock.
                  </div>
                </div>
                <p className="text-slate-600">
                  The Dashboard visualizes which error code drains the most marks so you fix the root cause.
                </p>
              </div>
            </div>
          )}

          {currentPage === 8 && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Page 8 of 8</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  8. Revision Queue & The 30-Second Test
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <p>
                  The <strong>REVISION QUEUE</strong> automatically ranks chapters that need revision based on:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  <li>Time elapsed since last revision (R1: 3 days, R2: 7 days, R3: 21 days)</li>
                  <li>Confidence score &lt; 3</li>
                  <li>Low accuracy &lt; 70%</li>
                  <li>High preparation priority</li>
                </ul>

                <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-emerald-950">
                  <h4 className="font-bold mb-1">The 30-Second Criteria:</h4>
                  <p>
                    Every day when you sit down at your study table, open this app. In under 30 seconds, you should know:
                  </p>
                  <ol className="list-decimal pl-5 mt-1 space-y-0.5 font-medium">
                    <li>What to study today (Daily Planner)</li>
                    <li>Which 5 chapters need the most attention (Dashboard)</li>
                    <li>Which chapter to revise right now (Revision Queue)</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="bg-white border-t border-slate-200 px-5 py-3 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                  currentPage === i + 1
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 disabled:opacity-40"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
