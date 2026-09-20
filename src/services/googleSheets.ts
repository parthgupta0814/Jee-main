import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { 
  ChapterRecord, 
  DailyTask, 
  MistakeRecord, 
  MockTest, 
  PyqRecord, 
  StudentProfile 
} from '../types';

// Initialize Firebase App safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google Sheets access token from Firebase Auth');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const googleLogout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

export interface ExportResult {
  spreadsheetId: string;
  spreadsheetUrl: string;
}

/**
 * Creates a real interactive Google Spreadsheet in the user's Google Drive
 * with all 12 tabs, formatted headers, and user's current preparation state.
 */
export async function exportToGoogleSheets(
  profile: StudentProfile,
  chapters: ChapterRecord[],
  pyqs: PyqRecord[],
  tasks: DailyTask[],
  mocks: MockTest[],
  mistakes: MistakeRecord[]
): Promise<ExportResult> {
  const token = cachedAccessToken;
  if (!token) {
    throw new Error('Please sign in with Google to create or sync your Google Sheet.');
  }

  // 1. Create Spreadsheet with all required tabs from PRD
  const sheetTitles = [
    'START HERE',
    'DASHBOARD',
    'CHAPTER TRACKER',
    'DAILY PLANNER',
    'PYQ TRACKER',
    'MOCK ANALYSIS',
    'MISTAKE BOOK',
    'REVISION QUEUE',
    'GOALS & PROGRESS',
    'CHAPTER DATABASE',
    'DATA & CALCULATIONS',
    'DROPDOWN DATA'
  ];

  const createBody = {
    properties: {
      title: `JEE Main 2027 Score Recovery Kit — ${profile.name || 'My Plan'}`
    },
    sheets: sheetTitles.map(title => ({
      properties: {
        title,
        gridProperties: {
          rowCount: 100,
          columnCount: 26,
          frozenRowCount: 1
        }
      }
    }))
  };

  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createBody)
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Google Sheets API Error (${createRes.status}): ${errText}`);
  }

  const createdSheet = await createRes.json();
  const spreadsheetId = createdSheet.spreadsheetId;
  const spreadsheetUrl = createdSheet.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // 2. Populate data in batches
  const dataPayload: Array<{ range: string; values: any[][] }> = [];

  // Tab 1: START HERE
  dataPayload.push({
    range: "'START HERE'!A1:B13",
    values: [
      ['JEE MAIN 2027 SCORE RECOVERY SYSTEM', 'SETUP & DIAGNOSTIC SCREEN'],
      ['Guideline', '“Don’t use this as another timetable. Use it to decide what to study, what to practise, what to revise and why your marks are being lost.”'],
      ['Student Name', profile.name],
      ['Target Exam', profile.targetExam],
      ['Target Percentile', profile.targetPercentile],
      ['Target Marks', profile.targetMarks],
      ['Current Average Mock Score', profile.currentAvgScore],
      ['Physics Average', profile.physicsAvg],
      ['Chemistry Average', profile.chemistryAvg],
      ['Maths Average', profile.mathsAvg],
      ['Daily Available Study Hours', profile.dailyStudyHours],
      ['Current Preparation Level', profile.prepLevel],
      ['Last Updated', profile.lastUpdated]
    ]
  });

  // Tab 3: CHAPTER TRACKER
  const chapterHeaders = [
    'Subject', 'Chapter', 'Priority', 'Theory', 'Basic Questions', 
    'PYQs', 'Revision 1', 'Revision 2', 'Mock Tested', 'Confidence (1-5)', 
    'Accuracy %', 'Status', 'Last Revision', 'Next Revision', 'Notes'
  ];
  const chapterRows = chapters.map(c => [
    c.subject,
    c.chapter,
    c.priority,
    c.theory ? 'TRUE' : 'FALSE',
    c.basicQuestions ? 'TRUE' : 'FALSE',
    c.pyqs ? 'TRUE' : 'FALSE',
    c.revision1 ? 'TRUE' : 'FALSE',
    c.revision2 ? 'TRUE' : 'FALSE',
    c.mockTested ? 'TRUE' : 'FALSE',
    c.confidence,
    `${c.accuracy}%`,
    c.status,
    c.lastRevisionDate || '-',
    c.nextRevisionDate || '-',
    c.notes || ''
  ]);
  dataPayload.push({
    range: "'CHAPTER TRACKER'!A1:O" + (chapterRows.length + 1),
    values: [chapterHeaders, ...chapterRows]
  });

  // Tab 4: DAILY PLANNER
  const taskHeaders = [
    'Date', 'Subject', 'Chapter', 'Task', 'Type', 'Planned Time (hrs)', 'Done', 'Actual Time (hrs)'
  ];
  const taskRows = tasks.map(t => [
    t.date,
    t.subject,
    t.chapter,
    t.task,
    t.type,
    t.plannedTimeHours,
    t.done ? 'TRUE' : 'FALSE',
    t.actualTimeHours
  ]);
  dataPayload.push({
    range: "'DAILY PLANNER'!A1:H" + (taskRows.length + 1),
    values: [taskHeaders, ...taskRows]
  });

  // Tab 5: PYQ TRACKER
  const pyqHeaders = ['Subject', 'Chapter', '2026', '2025', '2024', '2023', '2022', '2021', 'Completion'];
  const pyqRows = pyqs.map(p => {
    const solved = [p.y2026, p.y2025, p.y2024, p.y2023, p.y2022, p.y2021].filter(Boolean).length;
    const pct = Math.round((solved / 6) * 100);
    return [
      p.subject,
      p.chapter,
      p.y2026 ? 'TRUE' : 'FALSE',
      p.y2025 ? 'TRUE' : 'FALSE',
      p.y2024 ? 'TRUE' : 'FALSE',
      p.y2023 ? 'TRUE' : 'FALSE',
      p.y2022 ? 'TRUE' : 'FALSE',
      p.y2021 ? 'TRUE' : 'FALSE',
      `${solved} / 6 (${pct}%)`
    ];
  });
  dataPayload.push({
    range: "'PYQ TRACKER'!A1:I" + (pyqRows.length + 1),
    values: [pyqHeaders, ...pyqRows]
  });

  // Tab 6: MOCK ANALYSIS
  const mockHeaders = [
    'Mock #', 'Date', 'Source', 'Physics', 'Chemistry', 'Maths', 
    'Total Score', 'Attempted', 'Correct', 'Incorrect', 'Skipped', 'Accuracy %', 
    'Time Issue', 'Main Problem', 'Action Required'
  ];
  const mockRows = mocks.map(m => [
    m.mockNumber,
    m.date,
    m.source,
    m.physicsScore,
    m.chemistryScore,
    m.mathsScore,
    m.totalScore,
    m.attempted,
    m.correct,
    m.incorrect,
    m.skipped,
    `${m.accuracy}%`,
    m.timeIssue ? 'YES' : 'NO',
    m.mainProblem,
    m.actionRequired
  ]);
  dataPayload.push({
    range: "'MOCK ANALYSIS'!A1:O" + (mockRows.length + 1),
    values: [mockHeaders, ...mockRows]
  });

  // Tab 7: MISTAKE BOOK
  const mistakeHeaders = [
    'Question ID', 'Date', 'Subject', 'Chapter', 'Mistake Type', 
    'Why Wrong?', 'Correct Concept', 'Reattempt Date', 'Reattempted', 'Fixed?'
  ];
  const mistakeRows = mistakes.map(m => [
    m.questionId,
    m.date,
    m.subject,
    m.chapter,
    m.mistakeType,
    m.whyWrong,
    m.correctConcept,
    m.reattemptDate,
    m.reattempted ? 'TRUE' : 'FALSE',
    m.fixed ? 'TRUE' : 'FALSE'
  ]);
  dataPayload.push({
    range: "'MISTAKE BOOK'!A1:J" + (mistakeRows.length + 1),
    values: [mistakeHeaders, ...mistakeRows]
  });

  // Batch update values
  await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      valueInputOption: 'USER_ENTERED',
      data: dataPayload
    })
  });

  return { spreadsheetId, spreadsheetUrl };
}
