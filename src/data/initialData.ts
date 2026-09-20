import { 
  ChapterRecord, 
  DailyTask, 
  MistakeRecord, 
  MistakeTypeInfo, 
  MockTest, 
  MonthlyProgress, 
  PyqRecord, 
  StudentProfile,
  Subject 
} from '../types';

export const MISTAKE_TYPES: Record<string, MistakeTypeInfo> = {
  C: {
    code: 'C',
    label: 'Concept',
    description: "Didn't understand the core concept or mechanism",
    color: '#EF4444' // Red
  },
  F: {
    code: 'F',
    label: 'Formula',
    description: 'Forgot formula or applied the wrong formula variation',
    color: '#F97316' // Orange
  },
  S: {
    code: 'S',
    label: 'Silly Mistake',
    description: 'Known question, correct approach, but careless misread or sign slip',
    color: '#EAB308' // Yellow
  },
  CALC: {
    code: 'CALC',
    label: 'Calculation',
    description: 'Arithmetic, simplification, or algebraic computation error',
    color: '#8B5CF6' // Purple
  },
  R: {
    code: 'R',
    label: 'Reading',
    description: 'Misread question constraints (e.g., incorrect vs correct, units)',
    color: '#06B6D4' // Cyan
  },
  T: {
    code: 'T',
    label: 'Time Pressure',
    description: 'Ran out of time or panicked under time crunch',
    color: '#EC4899' // Pink
  },
  G: {
    code: 'G',
    label: 'Guessing',
    description: 'Speculative 50-50 guess that backfired',
    color: '#64748B' // Slate
  }
};

export const INITIAL_PROFILE: StudentProfile = {
  name: 'Aman Sharma',
  targetExam: 'JEE Main 2027 (January & April)',
  targetPercentile: '98.8%ile+',
  targetMarks: 180,
  currentAvgScore: 132,
  physicsAvg: 48,
  chemistryAvg: 57,
  mathsAvg: 29,
  dailyStudyHours: 6.5,
  prepLevel: '50–75%',
  lastUpdated: '2026-09-20'
};

export const OFFICIAL_JEE_CHAPTERS = [
  // PHYSICS (23 Chapters)
  { subject: 'Physics' as const, name: 'Units & Dimensions', defaultPriority: 'LOW' as const },
  { subject: 'Physics' as const, name: 'Kinematics (1D & 2D)', defaultPriority: 'HIGH' as const },
  { subject: 'Physics' as const, name: 'Laws of Motion & Friction', defaultPriority: 'HIGH' as const },
  { subject: 'Physics' as const, name: 'Work, Energy & Power', defaultPriority: 'HIGH' as const },
  { subject: 'Physics' as const, name: 'Rotational Motion', defaultPriority: 'HIGH' as const },
  { subject: 'Physics' as const, name: 'Gravitation', defaultPriority: 'MEDIUM' as const },
  { subject: 'Physics' as const, name: 'Mechanical Properties of Solids & Fluids', defaultPriority: 'MEDIUM' as const },
  { subject: 'Physics' as const, name: 'Thermal Physics & Thermodynamics', defaultPriority: 'HIGH' as const },
  { subject: 'Physics' as const, name: 'Kinetic Theory of Gases', defaultPriority: 'LOW' as const },
  { subject: 'Physics' as const, name: 'Oscillations & Simple Harmonic Motion', defaultPriority: 'MEDIUM' as const },
  { subject: 'Physics' as const, name: 'Waves & Sound', defaultPriority: 'MEDIUM' as const },
  { subject: 'Physics' as const, name: 'Electrostatics', defaultPriority: 'HIGH' as const },
  { subject: 'Physics' as const, name: 'Current Electricity', defaultPriority: 'HIGH' as const },
  { subject: 'Physics' as const, name: 'Magnetic Effects of Current & Magnetism', defaultPriority: 'HIGH' as const },
  { subject: 'Physics' as const, name: 'Electromagnetic Induction (EMI)', defaultPriority: 'HIGH' as const },
  { subject: 'Physics' as const, name: 'Alternating Current (AC)', defaultPriority: 'MEDIUM' as const },
  { subject: 'Physics' as const, name: 'Electromagnetic Waves', defaultPriority: 'LOW' as const },
  { subject: 'Physics' as const, name: 'Ray Optics & Optical Instruments', defaultPriority: 'HIGH' as const },
  { subject: 'Physics' as const, name: 'Wave Optics', defaultPriority: 'MEDIUM' as const },
  { subject: 'Physics' as const, name: 'Dual Nature of Matter & Radiation', defaultPriority: 'HIGH' as const },
  { subject: 'Physics' as const, name: 'Atoms & Nuclei', defaultPriority: 'HIGH' as const },
  { subject: 'Physics' as const, name: 'Semiconductor Electronics', defaultPriority: 'HIGH' as const },
  { subject: 'Physics' as const, name: 'Experimental Skills & Error Analysis', defaultPriority: 'MEDIUM' as const },

  // CHEMISTRY (20 Chapters)
  { subject: 'Chemistry' as const, name: 'Some Basic Concepts of Chemistry (Mole Concept)', defaultPriority: 'MEDIUM' as const },
  { subject: 'Chemistry' as const, name: 'Atomic Structure', defaultPriority: 'HIGH' as const },
  { subject: 'Chemistry' as const, name: 'Chemical Bonding & Molecular Structure', defaultPriority: 'HIGH' as const },
  { subject: 'Chemistry' as const, name: 'Chemical Thermodynamics', defaultPriority: 'HIGH' as const },
  { subject: 'Chemistry' as const, name: 'Solutions', defaultPriority: 'HIGH' as const },
  { subject: 'Chemistry' as const, name: 'Equilibrium (Chemical & Ionic)', defaultPriority: 'HIGH' as const },
  { subject: 'Chemistry' as const, name: 'Redox Reactions & Electrochemistry', defaultPriority: 'HIGH' as const },
  { subject: 'Chemistry' as const, name: 'Chemical Kinetics', defaultPriority: 'HIGH' as const },
  { subject: 'Chemistry' as const, name: 'Classification of Elements & Periodicity', defaultPriority: 'MEDIUM' as const },
  { subject: 'Chemistry' as const, name: 'p-Block Elements', defaultPriority: 'HIGH' as const },
  { subject: 'Chemistry' as const, name: 'd- and f-Block Elements', defaultPriority: 'HIGH' as const },
  { subject: 'Chemistry' as const, name: 'Coordination Compounds', defaultPriority: 'HIGH' as const },
  { subject: 'Chemistry' as const, name: 'General Organic Chemistry (GOC)', defaultPriority: 'HIGH' as const },
  { subject: 'Chemistry' as const, name: 'Hydrocarbons', defaultPriority: 'HIGH' as const },
  { subject: 'Chemistry' as const, name: 'Haloalkanes & Haloarenes', defaultPriority: 'MEDIUM' as const },
  { subject: 'Chemistry' as const, name: 'Alcohols, Phenols & Ethers', defaultPriority: 'MEDIUM' as const },
  { subject: 'Chemistry' as const, name: 'Aldehydes, Ketones & Carboxylic Acids', defaultPriority: 'HIGH' as const },
  { subject: 'Chemistry' as const, name: 'Amines & Nitrogen Derivatives', defaultPriority: 'MEDIUM' as const },
  { subject: 'Chemistry' as const, name: 'Biomolecules', defaultPriority: 'HIGH' as const },
  { subject: 'Chemistry' as const, name: 'Principles Related to Practical Chemistry', defaultPriority: 'LOW' as const },

  // MATHEMATICS (18 Chapters)
  { subject: 'Mathematics' as const, name: 'Sets, Relations & Functions', defaultPriority: 'MEDIUM' as const },
  { subject: 'Mathematics' as const, name: 'Complex Numbers & Quadratic Equations', defaultPriority: 'HIGH' as const },
  { subject: 'Mathematics' as const, name: 'Matrices & Determinants', defaultPriority: 'HIGH' as const },
  { subject: 'Mathematics' as const, name: 'Permutations & Combinations', defaultPriority: 'HIGH' as const },
  { subject: 'Mathematics' as const, name: 'Binomial Theorem', defaultPriority: 'MEDIUM' as const },
  { subject: 'Mathematics' as const, name: 'Sequences & Series (AP, GP)', defaultPriority: 'HIGH' as const },
  { subject: 'Mathematics' as const, name: 'Limits, Continuity & Differentiability', defaultPriority: 'HIGH' as const },
  { subject: 'Mathematics' as const, name: 'Application of Derivatives (AOD)', defaultPriority: 'HIGH' as const },
  { subject: 'Mathematics' as const, name: 'Indefinite & Definite Integrals', defaultPriority: 'HIGH' as const },
  { subject: 'Mathematics' as const, name: 'Differential Equations', defaultPriority: 'HIGH' as const },
  { subject: 'Mathematics' as const, name: 'Straight Lines', defaultPriority: 'MEDIUM' as const },
  { subject: 'Mathematics' as const, name: 'Circles', defaultPriority: 'MEDIUM' as const },
  { subject: 'Mathematics' as const, name: 'Conic Sections (Parabola, Ellipse, Hyperbola)', defaultPriority: 'HIGH' as const },
  { subject: 'Mathematics' as const, name: 'Vector Algebra', defaultPriority: 'HIGH' as const },
  { subject: 'Mathematics' as const, name: 'Three Dimensional Geometry (3D)', defaultPriority: 'HIGH' as const },
  { subject: 'Mathematics' as const, name: 'Statistics', defaultPriority: 'LOW' as const },
  { subject: 'Mathematics' as const, name: 'Probability', defaultPriority: 'HIGH' as const },
  { subject: 'Mathematics' as const, name: 'Trigonometric Functions & Inverse Trig', defaultPriority: 'MEDIUM' as const }
];

export function calculateChapterStatus(
  theory: boolean,
  basicQuestions: boolean,
  pyqs: boolean,
  revision1: boolean,
  mockTested: boolean,
  accuracy: number
): ChapterRecord['status'] {
  if (theory && pyqs && revision1 && mockTested && accuracy >= 80) {
    return 'MASTERED';
  }
  if (mockTested) {
    return 'TESTED';
  }
  if (theory && pyqs) {
    return 'REVISION';
  }
  if (theory && (basicQuestions || !pyqs)) {
    return 'PRACTICE';
  }
  if (theory) {
    return 'LEARNING';
  }
  return 'NOT STARTED';
}

export const INITIAL_CHAPTERS: ChapterRecord[] = OFFICIAL_JEE_CHAPTERS.map((ch, idx) => {
  // realistic starting variations matching PRD examples
  let theory = false;
  let basicQuestions = false;
  let pyqs = false;
  let revision1 = false;
  let revision2 = false;
  let mockTested = false;
  let confidence: 1 | 2 | 3 | 4 | 5 = 3;
  let correctCount = 0;
  let attemptedCount = 0;
  let notes = '';
  let lastRevisionDate = '';
  let nextRevisionDate = '';

  if (ch.name === 'Electrostatics') {
    theory = true; basicQuestions = true; pyqs = true; mockTested = true;
    confidence = 3; correctCount = 19; attemptedCount = 30; // 63%
    notes = 'Gauss law application questions need practice';
  } else if (ch.name === 'Current Electricity') {
    theory = true; basicQuestions = true; pyqs = true; revision1 = true; mockTested = true;
    confidence = 4; correctCount = 27; attemptedCount = 35; // 77%
    lastRevisionDate = '2026-09-12'; nextRevisionDate = '2026-09-22';
    notes = 'Potentiometer removed in 2024+, focus on Kirchhoff & RC circuits';
  } else if (ch.name === 'General Organic Chemistry (GOC)') {
    theory = true; basicQuestions = true; pyqs = true; mockTested = true;
    confidence = 2; correctCount = 18; attemptedCount = 30; // 60%
    notes = 'Acidic strength & stability of carbocations getting confused';
  } else if (ch.name === 'Matrices & Determinants') {
    theory = true; basicQuestions = true; pyqs = true; mockTested = true;
    confidence = 3; correctCount = 15; attemptedCount = 25; // 60%
    notes = 'Cramer rule & matrix polynomial inverses';
  } else if (ch.name === 'Probability') {
    theory = true; basicQuestions = true; pyqs = false;
    confidence = 2; correctCount = 8; attemptedCount = 18; // 44%
    notes = 'Bayes theorem and multinomial distributions';
  } else if (ch.name === 'Chemical Bonding & Molecular Structure') {
    theory = true; basicQuestions = true; pyqs = true; revision1 = true; mockTested = true;
    confidence = 5; correctCount = 38; attemptedCount = 42; // 90%
    notes = 'Strong chapter; MOT questions smooth';
  } else if (ch.name === 'Modern Physics (Dual Nature / Atoms)') {
    theory = true; basicQuestions = true; pyqs = true; revision1 = true; mockTested = true;
    confidence = 4; correctCount = 32; attemptedCount = 38;
  } else if (idx % 3 === 0) {
    theory = true; basicQuestions = true; pyqs = true;
    confidence = 3; correctCount = 14; attemptedCount = 20;
  } else if (idx % 4 === 0) {
    theory = true; basicQuestions = false;
    confidence = 2; correctCount = 5; attemptedCount = 10;
  }

  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
  const status = calculateChapterStatus(theory, basicQuestions, pyqs, revision1, mockTested, accuracy);

  return {
    id: `ch-${idx + 1}`,
    subject: ch.subject === 'Mathematics' ? 'Maths' : ch.subject,
    chapter: ch.name,
    priority: ch.defaultPriority,
    theory,
    basicQuestions,
    pyqs,
    revision1,
    revision2,
    mockTested,
    confidence,
    correctCount,
    attemptedCount,
    accuracy,
    status,
    lastRevisionDate,
    nextRevisionDate,
    notes
  };
});

export const INITIAL_PYQ_RECORDS: PyqRecord[] = OFFICIAL_JEE_CHAPTERS.map((ch, idx) => {
  const isSelected = ch.name === 'Current Electricity' || ch.name === 'Electrostatics' || ch.name === 'Chemical Bonding & Molecular Structure';
  return {
    id: `pyq-${idx + 1}`,
    subject: ch.subject === 'Mathematics' ? 'Maths' : ch.subject,
    chapter: ch.name,
    y2026: isSelected || idx % 2 === 0,
    y2025: isSelected || idx % 3 === 0,
    y2024: isSelected || idx % 4 === 0,
    y2023: isSelected && idx % 2 === 0,
    y2022: false,
    y2021: false
  };
});

export const INITIAL_DAILY_TASKS: DailyTask[] = [
  {
    id: 'task-1',
    date: '2026-09-20',
    subject: 'Physics',
    chapter: 'Current Electricity',
    task: 'Solve 25 PYQs from 2024–2025 sessions',
    type: 'PYQ',
    plannedTimeHours: 2.0,
    done: true,
    actualTimeHours: 1.8
  },
  {
    id: 'task-2',
    date: '2026-09-20',
    subject: 'Chemistry',
    chapter: 'General Organic Chemistry (GOC)',
    task: 'GOC Revision — Acidic strength & Hyperconjugation order',
    type: 'Revision',
    plannedTimeHours: 1.5,
    done: true,
    actualTimeHours: 1.5
  },
  {
    id: 'task-3',
    date: '2026-09-20',
    subject: 'Maths',
    chapter: 'Matrices & Determinants',
    task: 'Matrices 25 PYQs & Adjoint properties',
    type: 'Practice',
    plannedTimeHours: 2.0,
    done: false,
    actualTimeHours: 0
  },
  {
    id: 'task-4',
    date: '2026-09-20',
    subject: 'Chemistry',
    chapter: 'Equilibrium (Chemical & Ionic)',
    task: 'Reattempt 10 wrong questions from Mistake Book',
    type: 'Mistake Reattempt',
    plannedTimeHours: 1.0,
    done: false,
    actualTimeHours: 0
  },
  {
    id: 'task-5',
    date: '2026-09-20',
    subject: 'Physics',
    chapter: 'Thermal Physics & Thermodynamics',
    task: 'Analyse Mock #4 physics section errors',
    type: 'Mock Analysis',
    plannedTimeHours: 1.0,
    done: false,
    actualTimeHours: 0
  }
];

export const INITIAL_MOCKS: MockTest[] = [
  {
    id: 'mock-1',
    mockNumber: 'Mock 1',
    date: '2026-08-15',
    source: 'Allen Part Test 1',
    physicsScore: 42,
    chemistryScore: 48,
    mathsScore: 22,
    totalScore: 112,
    attempted: 45,
    correct: 32,
    incorrect: 13,
    skipped: 30,
    accuracy: 71.1,
    timeIssue: true,
    mainProblem: 'Time wasted on first 4 math questions',
    actionRequired: 'Leave difficult calculus questions immediately',
    markingScheme: { correct: 4, incorrect: 1 }
  },
  {
    id: 'mock-2',
    mockNumber: 'Mock 2',
    date: '2026-08-28',
    source: 'MathonGo Full Mock 1',
    physicsScore: 48,
    chemistryScore: 54,
    mathsScore: 24,
    totalScore: 126,
    attempted: 48,
    correct: 36,
    incorrect: 12,
    skipped: 27,
    accuracy: 75.0,
    timeIssue: false,
    mainProblem: 'Organic reaction conditions mixed up',
    actionRequired: 'Daily 15 min reaction mechanism flashcard',
    markingScheme: { correct: 4, incorrect: 1 }
  },
  {
    id: 'mock-3',
    mockNumber: 'Mock 3',
    date: '2026-09-05',
    source: 'Allen Part Test 2',
    physicsScore: 46,
    chemistryScore: 51,
    mathsScore: 24,
    totalScore: 121,
    attempted: 52,
    correct: 37,
    incorrect: 15,
    skipped: 23,
    accuracy: 71.2,
    timeIssue: true,
    mainProblem: 'Excessive negative marking in Physics multi-statement',
    actionRequired: 'Avoid wild 50-50 guesses',
    markingScheme: { correct: 4, incorrect: 1 }
  },
  {
    id: 'mock-4',
    mockNumber: 'Mock 4',
    date: '2026-09-12',
    source: 'MathonGo Full Mock 2',
    physicsScore: 52,
    chemistryScore: 59,
    mathsScore: 28,
    totalScore: 139,
    attempted: 50,
    correct: 40,
    incorrect: 10,
    skipped: 25,
    accuracy: 80.0,
    timeIssue: false,
    mainProblem: 'Calculation slips in 3 simple arithmetic questions',
    actionRequired: 'Double check final arithmetic before bubble click',
    markingScheme: { correct: 4, incorrect: 1 }
  },
  {
    id: 'mock-5',
    mockNumber: 'Mock 5',
    date: '2026-09-19',
    source: 'NTA Official Abhyas Test',
    physicsScore: 54,
    chemistryScore: 62,
    mathsScore: 31,
    totalScore: 148,
    attempted: 54,
    correct: 44,
    incorrect: 10,
    skipped: 21,
    accuracy: 81.5,
    timeIssue: false,
    mainProblem: 'Vectors 3D formula forgotten for shortest distance',
    actionRequired: 'Revise 3D geometry skew lines formula sheet',
    markingScheme: { correct: 4, incorrect: 1 }
  }
];

export const INITIAL_MISTAKES: MistakeRecord[] = [
  {
    id: 'mis-1',
    questionId: 'M5-P14',
    date: '2026-09-19',
    subject: 'Physics',
    chapter: 'Current Electricity',
    mistakeType: 'CALC',
    whyWrong: 'Calculated 1/R_eq instead of inverting to find R_eq in parallel bridge',
    correctConcept: 'R_eq = (R1*R2)/(R1+R2); remember to invert reciprocal',
    reattemptDate: '2026-09-22',
    reattempted: false,
    fixed: false
  },
  {
    id: 'mis-2',
    questionId: 'M5-C08',
    date: '2026-09-19',
    subject: 'Chemistry',
    chapter: 'General Organic Chemistry (GOC)',
    mistakeType: 'C',
    whyWrong: 'Thought -NO2 at meta position showed -M effect, but only -I operates at meta',
    correctConcept: 'Resonance / Mesomeric effect does NOT operate at meta positions',
    reattemptDate: '2026-09-21',
    reattempted: true,
    fixed: true
  },
  {
    id: 'mis-3',
    questionId: 'M5-M12',
    date: '2026-09-19',
    subject: 'Maths',
    chapter: 'Three Dimensional Geometry (3D)',
    mistakeType: 'F',
    whyWrong: 'Forgot the cross-product denominator in shortest distance formula between skew lines',
    correctConcept: 'd = |(a2 - a1) . (b1 x b2)| / |b1 x b2|',
    reattemptDate: '2026-09-21',
    reattempted: false,
    fixed: false
  },
  {
    id: 'mis-4',
    questionId: 'M4-P04',
    date: '2026-09-12',
    subject: 'Physics',
    chapter: 'Electrostatics',
    mistakeType: 'S',
    whyWrong: 'Took charge in microCoulombs without converting to SI Coulombs (10^-6)',
    correctConcept: 'Always write down SI unit multiplier in scratchpad at first glance',
    reattemptDate: '2026-09-15',
    reattempted: true,
    fixed: true
  },
  {
    id: 'mis-5',
    questionId: 'M4-C19',
    date: '2026-09-12',
    subject: 'Chemistry',
    chapter: 'Equilibrium (Chemical & Ionic)',
    mistakeType: 'CALC',
    whyWrong: 'Squaring (2x)^2 gave 2x^2 instead of 4x^2 in Ksp expression',
    correctConcept: 'Solubility product for AB2 is [A][B]^2 = s*(2s)^2 = 4s^3',
    reattemptDate: '2026-09-16',
    reattempted: true,
    fixed: true
  },
  {
    id: 'mis-6',
    questionId: 'M4-M20',
    date: '2026-09-12',
    subject: 'Maths',
    chapter: 'Matrices & Determinants',
    mistakeType: 'R',
    whyWrong: 'Question asked for non-trivial solutions (det = 0), but solved for unique trivial solution',
    correctConcept: 'Homogeneous system AX=0 has non-trivial solutions iff det(A) = 0',
    reattemptDate: '2026-09-16',
    reattempted: true,
    fixed: false
  },
  {
    id: 'mis-7',
    questionId: 'M3-P18',
    date: '2026-09-05',
    subject: 'Physics',
    chapter: 'Thermal Physics & Thermodynamics',
    mistakeType: 'T',
    whyWrong: 'Spent 6.5 minutes deriving adiabatic work formula under rush',
    correctConcept: 'Memorize W_adiabatic = (P1V1 - P2V2)/(gamma - 1) directly',
    reattemptDate: '2026-09-09',
    reattempted: true,
    fixed: true
  },
  {
    id: 'mis-8',
    questionId: 'M3-C03',
    date: '2026-09-05',
    subject: 'Chemistry',
    chapter: 'Coordination Compounds',
    mistakeType: 'C',
    whyWrong: 'Assumed oxalate ion was monodentate; failed chelation ring stability',
    correctConcept: 'Oxalate (ox^2-) is a bidentate dicarboxylate ligand',
    reattemptDate: '2026-09-10',
    reattempted: true,
    fixed: true
  },
  {
    id: 'mis-9',
    questionId: 'M2-M07',
    date: '2026-08-28',
    subject: 'Maths',
    chapter: 'Probability',
    mistakeType: 'G',
    whyWrong: 'Eliminated option B and guessed option C blindly without calculating conditioning',
    correctConcept: 'Do not guess in probability; conditional P(A|B) requires exact Bayes fractions',
    reattemptDate: '2026-09-02',
    reattempted: false,
    fixed: false
  }
];

export const INITIAL_STUDENT_PROFILE = INITIAL_PROFILE;
export const INITIAL_PYQS = INITIAL_PYQ_RECORDS;
export const JEE_CHAPTERS_DATABASE = OFFICIAL_JEE_CHAPTERS.map(ch => ({
  subject: ch.subject === 'Mathematics' ? ('Maths' as Subject) : ch.subject,
  chapter: ch.name,
  classLevel: 12,
  defaultPriority: ch.defaultPriority
}));
