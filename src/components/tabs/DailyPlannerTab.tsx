import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  CheckSquare, 
  Square, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Sparkles 
} from 'lucide-react';
import { DailyTask, Subject, TaskType } from '../../types';

interface DailyPlannerTabProps {
  tasks: DailyTask[];
  onAddTask: (task: Omit<DailyTask, 'id'>) => void;
  onUpdateTask: (taskId: string, updates: Partial<DailyTask>) => void;
  onDeleteTask: (taskId: string) => void;
  availableHours: number;
}

export const DailyPlannerTab: React.FC<DailyPlannerTabProps> = ({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  availableHours
}) => {
  const taskTypes: TaskType[] = [
    'Theory',
    'Revision',
    'PYQ',
    'Practice',
    'Mock',
    'Mock Analysis',
    'Mistake Reattempt',
    'NCERT',
    'Formula Revision'
  ];

  const [newTaskSubject, setNewTaskSubject] = useState<Subject>('Physics');
  const [newTaskChapter, setNewTaskChapter] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskType, setNewTaskType] = useState<TaskType>('PYQ');
  const [newTaskPlannedTime, setNewTaskPlannedTime] = useState<number>(1.5);
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-20');

  // Filter tasks for selected date (or all)
  const currentDayTasks = useMemo(() => {
    return tasks.filter(t => !selectedDate || t.date === selectedDate);
  }, [tasks, selectedDate]);

  // Section 18 & 19 Calculations
  const metrics = useMemo(() => {
    const plannedCount = currentDayTasks.length;
    const completedCount = currentDayTasks.filter(t => t.done).length;
    const taskCompletionRate = plannedCount > 0 ? Math.round((completedCount / plannedCount) * 100) : 0;

    const totalPlannedHours = currentDayTasks.reduce((acc, t) => acc + t.plannedTimeHours, 0);
    const totalActualHours = currentDayTasks.reduce((acc, t) => acc + (t.done ? t.actualTimeHours : 0), 0);
    const hoursRatio = totalPlannedHours > 0 ? Math.round((totalActualHours / totalPlannedHours) * 100) : 0;

    return {
      plannedCount,
      completedCount,
      taskCompletionRate,
      totalPlannedHours,
      totalActualHours,
      hoursRatio
    };
  }, [currentDayTasks]);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskDesc.trim()) return;

    onAddTask({
      date: selectedDate,
      subject: newTaskSubject,
      chapter: newTaskChapter.trim() || 'General / Multi-chapter',
      task: newTaskDesc.trim(),
      type: newTaskType,
      plannedTimeHours: Number(newTaskPlannedTime) || 1,
      done: false,
      actualTimeHours: 0
    });

    setNewTaskDesc('');
    setNewTaskChapter('');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header & Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Task Completion Card (PRD Section 18) */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Daily Task Completion</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              {metrics.completedCount} / {metrics.plannedCount} Done
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">{metrics.taskCompletionRate}%</div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all" 
              style={{ width: `${metrics.taskCompletionRate}%` }}
            />
          </div>
        </div>

        {/* Time Tracking Realism Metric (PRD Section 19) */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Plan Realism Ratio</span>
            <span className="text-xs font-bold text-indigo-600">
              {metrics.totalActualHours.toFixed(1)}h / {metrics.totalPlannedHours.toFixed(1)}h
            </span>
          </div>
          <div className="text-3xl font-black text-indigo-950 mt-2">{metrics.hoursRatio}%</div>
          <p className="text-[11px] text-slate-500 mt-2">
            {metrics.totalPlannedHours > availableHours ? (
              <span className="text-amber-600 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Planned hours ({metrics.totalPlannedHours}h) exceed daily budget ({availableHours}h)!
              </span>
            ) : (
              'Plan is realistic and within your daily available energy limits.'
            )}
          </p>
        </div>

        {/* Date Selector */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase">Selected Study Date</span>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-500 font-semibold text-slate-800"
            />
          </div>
          <span className="text-[11px] text-slate-400 mt-2">
            Tasks auto-link with Dashboard "Today's Tasks" widget.
          </span>
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleCreateTask} className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-xs space-y-3 text-xs">
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-600" />
          <h3 className="font-bold text-slate-900">Add New Plan Item for Today</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Subject */}
          <div>
            <label className="block text-slate-600 font-medium mb-1">Subject</label>
            <select
              value={newTaskSubject}
              onChange={(e) => setNewTaskSubject(e.target.value as Subject)}
              className="w-full border border-slate-300 rounded-md px-2.5 py-1.5 bg-white text-xs"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Maths">Maths</option>
            </select>
          </div>

          {/* Chapter */}
          <div>
            <label className="block text-slate-600 font-medium mb-1">Chapter Name</label>
            <input
              type="text"
              placeholder="e.g. Current Electricity"
              value={newTaskChapter}
              onChange={(e) => setNewTaskChapter(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-2.5 py-1.5 bg-white text-xs"
            />
          </div>

          {/* Task Type */}
          <div>
            <label className="block text-slate-600 font-medium mb-1">Task Type</label>
            <select
              value={newTaskType}
              onChange={(e) => setNewTaskType(e.target.value as TaskType)}
              className="w-full border border-slate-300 rounded-md px-2.5 py-1.5 bg-white text-xs"
            >
              {taskTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Planned Hours */}
          <div>
            <label className="block text-slate-600 font-medium mb-1">Planned Hours</label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="8"
              value={newTaskPlannedTime}
              onChange={(e) => setNewTaskPlannedTime(Number(e.target.value) || 1)}
              className="w-full border border-slate-300 rounded-md px-2.5 py-1.5 bg-white text-xs font-semibold"
            />
          </div>

          {/* Submit */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-1.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-md shadow-xs transition-colors"
            >
              + Add to Daily Plan
            </button>
          </div>
        </div>

        {/* Task Description */}
        <div>
          <label className="block text-slate-600 font-medium mb-1">Specific Task Goal</label>
          <input
            type="text"
            placeholder="e.g. Solve 25 PYQs from 2024 sessions and circle all formula slips"
            value={newTaskDesc}
            onChange={(e) => setNewTaskDesc(e.target.value)}
            className="w-full border border-slate-300 rounded-md px-3 py-1.5 bg-white text-xs"
          />
        </div>
      </form>

      {/* Task List Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
              <tr>
                <th className="py-2.5 px-3 w-12 text-center border-r border-slate-200">Done</th>
                <th className="py-2.5 px-3 w-28 border-r border-slate-200">Date</th>
                <th className="py-2.5 px-3 w-24 border-r border-slate-200">Subject</th>
                <th className="py-2.5 px-3 w-48 border-r border-slate-200">Chapter</th>
                <th className="py-2.5 px-3 min-w-[200px] border-r border-slate-200">Task</th>
                <th className="py-2.5 px-3 w-32 border-r border-slate-200">Type</th>
                <th className="py-2.5 px-3 w-24 border-r border-slate-200 text-center">Planned (h)</th>
                <th className="py-2.5 px-3 w-24 border-r border-slate-200 text-center">Actual (h)</th>
                <th className="py-2.5 px-3 w-12 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {currentDayTasks.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No tasks scheduled for {selectedDate}. Use the form above to add your tasks.
                  </td>
                </tr>
              ) : (
                currentDayTasks.map((t) => (
                  <tr key={t.id} className={`hover:bg-slate-50 transition-colors ${t.done ? 'bg-slate-50/50' : ''}`}>
                    {/* Done Checkbox */}
                    <td className="py-2 px-3 text-center border-r border-slate-200">
                      <button
                        onClick={() => onUpdateTask(t.id, { 
                          done: !t.done,
                          actualTimeHours: !t.done && t.actualTimeHours === 0 ? t.plannedTimeHours : t.actualTimeHours 
                        })}
                        className="text-slate-500 hover:text-emerald-600"
                      >
                        {t.done ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600 inline" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 inline" />
                        )}
                      </button>
                    </td>

                    {/* Date */}
                    <td className="py-2 px-3 font-mono text-slate-500 border-r border-slate-200">
                      {t.date}
                    </td>

                    {/* Subject */}
                    <td className="py-2 px-3 border-r border-slate-200">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        t.subject === 'Physics' ? 'bg-sky-100 text-sky-800' :
                        t.subject === 'Chemistry' ? 'bg-teal-100 text-teal-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {t.subject}
                      </span>
                    </td>

                    {/* Chapter */}
                    <td className="py-2 px-3 font-semibold text-slate-800 border-r border-slate-200">
                      {t.chapter}
                    </td>

                    {/* Task */}
                    <td className={`py-2 px-3 border-r border-slate-200 ${t.done ? 'line-through text-slate-400' : 'text-slate-900 font-medium'}`}>
                      {t.task}
                    </td>

                    {/* Type Dropdown */}
                    <td className="py-2 px-3 border-r border-slate-200">
                      <select
                        value={t.type}
                        onChange={(e) => onUpdateTask(t.id, { type: e.target.value as TaskType })}
                        className="w-full bg-transparent text-[11px] rounded px-1 py-0.5 border border-transparent hover:border-slate-300"
                      >
                        {taskTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </td>

                    {/* Planned Hours */}
                    <td className="py-2 px-3 text-center font-mono font-semibold border-r border-slate-200">
                      <input
                        type="number"
                        step="0.5"
                        value={t.plannedTimeHours}
                        onChange={(e) => onUpdateTask(t.id, { plannedTimeHours: Number(e.target.value) || 0 })}
                        className="w-12 text-center py-0.5 border border-slate-200 rounded text-xs"
                      />
                    </td>

                    {/* Actual Hours */}
                    <td className="py-2 px-3 text-center font-mono font-semibold border-r border-slate-200">
                      <input
                        type="number"
                        step="0.5"
                        value={t.actualTimeHours}
                        onChange={(e) => onUpdateTask(t.id, { actualTimeHours: Number(e.target.value) || 0 })}
                        className="w-12 text-center py-0.5 border border-slate-200 rounded text-xs"
                      />
                    </td>

                    {/* Delete */}
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => onDeleteTask(t.id)}
                        className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                        title="Delete task"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
