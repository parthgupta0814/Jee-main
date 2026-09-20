import React from 'react';
import { 
  Rocket, 
  Target, 
  Clock, 
  Award, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck,
  AlertCircle 
} from 'lucide-react';
import { PrepLevel, StudentProfile } from '../../types';

interface StartHereTabProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onGoToDashboard: () => void;
}

export const StartHereTab: React.FC<StartHereTabProps> = ({
  profile,
  onUpdateProfile,
  onGoToDashboard
}) => {
  const prepLevels: PrepLevel[] = [
    'Starting',
    '<25% syllabus',
    '25–50%',
    '50–75%',
    '75–90%',
    '90%+'
  ];

  const scoreGap = profile.targetMarks - profile.currentAvgScore;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Section A: Welcome & Philosophy */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-xl p-6 sm:p-8 shadow-md border border-slate-700/80">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
              JEE Main 2027 Score Recovery System
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Start Here: Baseline Setup & Diagnosis
            </h2>
          </div>
        </div>

        <blockquote className="my-4 pl-4 border-l-4 border-amber-400 italic text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-800/60 py-2.5 pr-4 rounded-r-lg">
          “Don’t use this as another timetable. Use it to decide what to study, what to practise, what to revise and why your marks are being lost.”
        </blockquote>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          This system is designed for Class 12 students and droppers who have covered portions of the syllabus but struggle with revision cycles, consistent question practice, and mock score leaks. It does not replace your coaching, books, or PYQ database — it transforms them into an actionable preparation control engine.
        </p>

        {/* 2-3 minute quick checklist */}
        <div className="mt-6 pt-5 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-start gap-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold">1. Enter Your Baseline</strong>
              <span className="text-slate-400">Fill in target marks and current mock average below.</span>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold">2. Update Chapter Tracker</strong>
              <span className="text-slate-400">Mark your actual theory, PYQs, and confidence status.</span>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold">3. Daily 3-Minute Routine</strong>
              <span className="text-slate-400">Check tasks, log mock errors, and follow the revision queue.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section B: Student Setup Form */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Section B — Student Profile & Targets</h3>
              <p className="text-xs text-slate-500">Configure your parameters to activate personalized priority calculations.</p>
            </div>
          </div>
          <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded border border-emerald-200 font-semibold">
            Status: Active Profile
          </span>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Student Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Student Name
              </label>
              <input
                type="text"
                id="student-name-input"
                value={profile.name}
                onChange={(e) => onUpdateProfile({ name: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Target Exam */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Exam
              </label>
              <input
                type="text"
                id="target-exam-input"
                value={profile.targetExam}
                onChange={(e) => onUpdateProfile({ targetExam: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Target Percentile */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Percentile
              </label>
              <input
                type="text"
                id="target-percentile-input"
                value={profile.targetPercentile}
                onChange={(e) => onUpdateProfile({ targetPercentile: e.target.value })}
                placeholder="e.g. 98.5%ile+"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Target Marks */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Total Marks (out of 300)
              </label>
              <input
                type="number"
                id="target-marks-input"
                value={profile.targetMarks}
                onChange={(e) => onUpdateProfile({ targetMarks: Number(e.target.value) || 0 })}
                min={0}
                max={300}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-semibold text-emerald-700"
              />
            </div>

            {/* Current Average Mock Score */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Current Average Mock Score
              </label>
              <input
                type="number"
                id="current-avg-score-input"
                value={profile.currentAvgScore}
                onChange={(e) => onUpdateProfile({ currentAvgScore: Number(e.target.value) || 0 })}
                min={0}
                max={300}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-semibold text-slate-800"
              />
            </div>

            {/* Preparation Level Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Current Preparation Level
              </label>
              <select
                id="prep-level-select"
                value={profile.prepLevel}
                onChange={(e) => onUpdateProfile({ prepLevel: e.target.value as PrepLevel })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
              >
                {prepLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject-Wise Current Averages */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Subject Score Breakdown (Current Averages)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-sky-50/60 p-3.5 rounded-lg border border-sky-200">
                <label className="block text-xs font-bold text-sky-900 mb-1">Physics Average (/100)</label>
                <input
                  type="number"
                  value={profile.physicsAvg}
                  onChange={(e) => onUpdateProfile({ physicsAvg: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-sky-300 rounded-md font-semibold text-sky-950"
                />
              </div>

              <div className="bg-teal-50/60 p-3.5 rounded-lg border border-teal-200">
                <label className="block text-xs font-bold text-teal-900 mb-1">Chemistry Average (/100)</label>
                <input
                  type="number"
                  value={profile.chemistryAvg}
                  onChange={(e) => onUpdateProfile({ chemistryAvg: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-teal-300 rounded-md font-semibold text-teal-950"
                />
              </div>

              <div className="bg-amber-50/60 p-3.5 rounded-lg border border-amber-200">
                <label className="block text-xs font-bold text-amber-900 mb-1">Maths Average (/100)</label>
                <input
                  type="number"
                  value={profile.mathsAvg}
                  onChange={(e) => onUpdateProfile({ mathsAvg: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-amber-300 rounded-md font-semibold text-amber-950"
                />
              </div>
            </div>
          </div>

          {/* Daily Study Hours */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Daily Self-Study Hours Available (excl. coaching lectures)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="0.5"
                min="1"
                max="16"
                value={profile.dailyStudyHours}
                onChange={(e) => onUpdateProfile({ dailyStudyHours: Number(e.target.value) || 0 })}
                className="w-32 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-semibold"
              />
              <span className="text-xs text-slate-500">
                hours / day (Used by Daily Planner to prevent unrealistic over-scheduling)
              </span>
            </div>
          </div>

          {/* Diagnostic Gap Summary Card */}
          <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-300 uppercase">Target Score Recovery Deficit</span>
              </div>
              <p className="text-sm text-slate-200">
                Current Average: <span className="font-bold text-white">{profile.currentAvgScore}</span> / 300 &rarr; Target:{' '}
                <span className="font-bold text-emerald-400">{profile.targetMarks}</span> / 300
              </p>
              <p className="text-xs text-slate-400">
                Gap to eliminate: <strong className="text-amber-400">{scoreGap} marks</strong> (roughly {Math.ceil(scoreGap / 4)} extra questions or {Math.ceil(scoreGap / 5)} negative marks saved).
              </p>
            </div>

            <button
              onClick={onGoToDashboard}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all shrink-0"
            >
              <span>Go to App Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
