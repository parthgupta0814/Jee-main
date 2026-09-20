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
  name: '',
  targetExam: 'JEE Main 2027',
  targetPercentile: '',
  targetMarks: 0,
  currentAvgScore: 0,
  physicsAvg: 0,
  chemistryAvg: 0,
  mathsAvg: 0,
  dailyStudyHours: 0,
  prepLevel: 'Starting',
  lastUpdated: ''
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

export const INITIAL_CHAPTERS: ChapterRecord[] = OFFICIAL_JEE_CHAPTERS.map((ch, idx) => ({
  id: `ch-${idx + 1}`,
  subject: ch.subject === 'Mathematics' ? 'Maths' : ch.subject,
  chapter: ch.name,
  priority: ch.defaultPriority,
  theory: false,
  basicQuestions: false,
  pyqs: false,
  revision1: false,
  revision2: false,
  mockTested: false,
  confidence: 1,
  correctCount: 0,
  attemptedCount: 0,
  accuracy: 0,
  status: 'NOT STARTED',
  lastRevisionDate: '',
  nextRevisionDate: '',
  notes: ''
}));

export const INITIAL_PYQ_RECORDS: PyqRecord[] = OFFICIAL_JEE_CHAPTERS.map((ch, idx) => ({
  id: `pyq-${idx + 1}`,
  subject: ch.subject === 'Mathematics' ? 'Maths' : ch.subject,
  chapter: ch.name,
  y2026: false,
  y2025: false,
  y2024: false,
  y2023: false,
  y2022: false,
  y2021: false
}));

export const INITIAL_DAILY_TASKS: DailyTask[] = [];

export const INITIAL_MOCKS: MockTest[] = [];

export const INITIAL_MISTAKES: MistakeRecord[] = [];

export const INITIAL_STUDENT_PROFILE = INITIAL_PROFILE;
export const INITIAL_PYQS = INITIAL_PYQ_RECORDS;
export const JEE_CHAPTERS_DATABASE = OFFICIAL_JEE_CHAPTERS.map(ch => ({
  subject: ch.subject === 'Mathematics' ? ('Maths' as Subject) : ch.subject,
  chapter: ch.name,
  classLevel: 12,
  defaultPriority: ch.defaultPriority
}));
