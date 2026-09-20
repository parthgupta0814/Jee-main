export type Subject = 'Physics' | 'Chemistry' | 'Maths';

export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export type ChapterStatus = 
  | 'NOT STARTED'
  | 'LEARNING'
  | 'PRACTICE'
  | 'REVISION'
  | 'TESTED'
  | 'MASTERED';

export type Confidence = 1 | 2 | 3 | 4 | 5;

export type PrepLevel = 
  | 'Starting'
  | '<25% syllabus'
  | '25–50%'
  | '50–75%'
  | '75–90%'
  | '90%+';

export type MistakeCode = 'C' | 'F' | 'S' | 'CALC' | 'R' | 'T' | 'G';

export interface MistakeTypeInfo {
  code: MistakeCode;
  label: string;
  description: string;
  color: string;
}

export type TaskType = 
  | 'Theory'
  | 'Revision'
  | 'PYQ'
  | 'Practice'
  | 'Mock'
  | 'Mock Analysis'
  | 'Mistake Reattempt'
  | 'NCERT'
  | 'Formula Revision';

export type TestType = 'Full syllabus' | 'Part test' | 'Chapter test' | 'Previous Year Paper';

export type MarkLossReason = 
  | 'Knowledge gaps' 
  | 'Silly mistakes' 
  | 'Calculation errors' 
  | 'Time management' 
  | 'Question selection';

export interface StudentProfile {
  name: string;
  targetExam: string;
  targetPercentile: string;
  targetMarks: number;
  currentAvgScore: number;
  physicsAvg: number;
  chemistryAvg: number;
  mathsAvg: number;
  dailyStudyHours: number;
  prepLevel: PrepLevel;
  lastUpdated: string;
}

export interface ChapterRecord {
  id: string;
  subject: Subject;
  chapter: string;
  priority: Priority;
  theory: boolean;
  basicQuestions: boolean;
  pyqs: boolean;
  revision1: boolean;
  revision2: boolean;
  mockTested: boolean;
  confidence: Confidence;
  correctCount: number;
  attemptedCount: number;
  accuracy: number; // calculated 0 - 100
  status: ChapterStatus; // calculated
  lastRevisionDate?: string;
  nextRevisionDate?: string;
  notes: string;
}

export interface PyqRecord {
  id: string;
  subject: Subject;
  chapter: string;
  y2026: boolean;
  y2025: boolean;
  y2024: boolean;
  y2023: boolean;
  y2022: boolean;
  y2021: boolean;
}

export interface DailyTask {
  id: string;
  date: string;
  subject: Subject;
  chapter: string;
  task: string;
  type: TaskType;
  plannedTimeHours: number;
  done: boolean;
  actualTimeHours: number;
}

export interface MockTest {
  id: string;
  mockNumber: string;
  date: string;
  source?: string;
  testName?: string;
  testType?: TestType;
  physicsScore: number;
  chemistryScore: number;
  mathsScore: number;
  totalScore: number;
  attempted: number;
  correct: number;
  incorrect: number;
  skipped?: number;
  unattempted?: number;
  accuracy: number;
  targetScore?: number;
  gap?: number;
  timeIssue?: boolean;
  mainProblem?: string;
  majorReasonForLoss?: MarkLossReason;
  actionRequired?: string;
  actionItems?: string;
  markingScheme?: {
    correct: number;
    incorrect: number;
  };
}

export interface MistakeRecord {
  id: string;
  questionId?: string;
  questionSource?: string;
  date: string;
  subject: Subject;
  chapter: string;
  mistakeType: MistakeCode;
  whyWrong?: string;
  description?: string;
  correctConcept: string;
  reattemptDate?: string;
  reattempted?: boolean;
  reattemptStatus?: boolean;
  fixed?: boolean;
}

export interface RevisionQueueItem {
  priorityRank: number;
  chapterId: string;
  subject: Subject;
  chapter: string;
  priority: Priority;
  reason: string;
  suggestedAction: string;
  confidence: Confidence;
  accuracy: number;
  dueDate: string;
  urgencyScore: number;
}

export interface MonthlyProgress {
  month: string;
  chaptersCompleted: number;
  pyqsCompleted: number;
  mocksTaken: number;
  mistakesLogged: number;
  mistakesFixed: number;
  avgScore: number;
}
