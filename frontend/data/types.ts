// ─── Divisions ───────────────────────────────────────────────
export type Division = "bronze" | "silver" | "gold";

export const DIVISIONS: { slug: Division; label: string; color: string }[] = [
  { slug: "bronze", label: "Bronze", color: "amber" },
  { slug: "silver", label: "Silver", color: "slate" },
  { slug: "gold", label: "Gold", color: "yellow" },
];

// ─── Concepts (Knowledge Graph) ─────────────────────────────
export type Concept = {
  id: string;
  name: string;
  division: Division;
  description: string;
  prerequisites: string[];
  keyIdeas: string[];
};

// ─── Problems ────────────────────────────────────────────────
export type Problem = {
  id: string;                    // e.g. "usaco-bronze-dec23-1"
  title: string;                 // e.g. "Candy Cane Feast"
  division: Division;
  concepts: string[];            // concept IDs this problem tests
  difficulty: 1 | 2 | 3;        // 1=easy, 2=normal, 3=hard within division

  // ── USACO source info ──
  source: string;                // e.g. "USACO Bronze, December 2023, Problem 1"
  usacoUrl: string;              // direct link to problem on usaco.org
  contestId?: string;            // e.g. "dec23" for grouping
  problemNumber?: number;        // 1, 2, or 3

  // ── Problem content (for original problems) ──
  description?: string;          // reworded problem statement (optional if linking)
  inputFormat?: string;
  outputFormat?: string;
  sampleInput?: string;
  sampleOutput?: string;
  constraints?: string;

  // ── Reasoning breakdown ──
  reasoning: ProblemReasoning;

  // ── Common mistakes ──
  commonMistakes: string[];

  // ── Link to session ──
  sessionId: string;

  // ── Status ──
  hasSession: boolean;           // true if full guided session is built
};

// The thinking chain — how a competitive programmer approaches this
export type ProblemReasoning = {
  classify: string;              // "This is a simulation problem because..."
  keyInsight: string;            // The one thing that makes the problem click
  variables: string[];           // Key state variables to track
  approach: string;              // High-level algorithm description
  complexity: string;            // "O(N×M) because..."
  edgeCases: string[];           // Tricky inputs that break naive solutions
  whyThisWorks: string;          // Why the correct approach is correct
};

// ─── Session (Guided Reasoning Engine) ───────────────────────

// Choice for a question — now with richer wrong-answer feedback
export type Choice = {
  id: string;                    // e.g. "a", "b", "c", "d"
  text: string;                  // the choice label
  isCorrect: boolean;
  explanation: string;           // shown after selection — WHY right or wrong
};

// Follow-up "prove you understand" question
// Generated from the correct answer's explanation
export type FollowUpQuestion = {
  question: string;              // "Why is this the right approach?"
  choices: Choice[];             // 4 choices — tests understanding, not memory
};

// One step in the guided session
export type SessionStep = {
  id: string;                    // e.g. "step-1-classify"
  title: string;                 // e.g. "Classify the Problem"
  category: StepCategory;
  stepNumber?: number;           // 1-6

  // ── Main question ──
  question: string;
  type: StepType;
  choices: Choice[];

  // ── Follow-up (prove you know WHY) ──
  followUp?: FollowUpQuestion;

  // ── Hints (progressive, 3 levels) ──
  hints?: string[];              // ["vague hint", "more specific", "nearly gives it away"]
  hint?: string;                 // legacy single hint (backwards compat)

  // ── Coach explanation (shown after completing step) ──
  coachNote?: string;            // general principle/takeaway for this step
};

export type StepType =
  | "single-choice"
  | "multi-choice"
  | "ordering";

export type StepCategory =
  | "classify"                   // What type of problem is this?
  | "identify-variables"         // What are the key state variables?
  | "data-structures"            // Which data structures fit?
  | "constraints"                // What do constraints tell us about complexity?
  | "edge-cases"                 // What edge cases could break this?
  | "plan";                      // What's the step-by-step plan?

// The full guided session for one problem
export type SessionTemplate = {
  id: string;
  problemId: string;
  steps: SessionStep[];          // always 6 steps
};

// ─── Drills (Pattern Recognition) ───────────────────────────
export type DrillQuestion = {
  id: string;
  conceptId: string;
  question: string;
  context?: string;
  choices: Choice[];
  difficulty: 1 | 2 | 3;
};

export type DrillSet = {
  conceptId: string;
  conceptName: string;
  division: Division;
  questions: DrillQuestion[];
};

// ─── Scoring & Attempt Tracking ──────────────────────────────

// XP values
export const XP_CONFIG = {
  firstTryCorrect: 100,          // full XP
  secondTryCorrect: 50,          // half
  thirdTryCorrect: 25,           // quarter
  fourthTryCorrect: 0,           // just get the explanation
  followUpCorrect: 50,           // bonus for proving understanding
  followUpFirstTry: 30,          // extra bonus for first-try follow-up
  perfectSession: 200,           // bonus: all 6 steps first-try correct
  sessionComplete: 50,           // base XP for finishing any session
  ideUnlockThreshold: 0.5,       // need 50%+ score for clean unlock
} as const;

// Tracking attempts per step
export type StepAttempt = {
  stepId: string;
  attemptsOnMain: number;        // how many tries on main question (1-4)
  attemptsOnFollowUp: number;    // how many tries on follow-up (1-4)
  mainCorrectChoiceId: string;   // which choice was correct
  followUpCorrectChoiceId: string;
  eliminatedChoices: string[];   // IDs of wrong choices (greyed out)
  xpEarned: number;
  completedAt: string;           // ISO timestamp
};

// ─── User Progress (localStorage) ───────────────────────────

export type UserSessionSave = {
  problemId: string;
  sessionId: string;
  division: Division;
  currentStepIndex: number;
  phase: "main" | "followup" | "coach-note"; // where in the step flow
  stepAttempts: Record<string, StepAttempt>;  // stepId -> attempt data
  startedAt: string;
  lastUpdatedAt: string;
  completed: boolean;
  ideUnlocked: boolean;
  totalXp: number;
  scorePercent: number;          // 0-100, used for IDE unlock quality message
};

export type UserDrillSave = {
  conceptId: string;
  questionsAnswered: number;
  questionsCorrect: number;
  lastPlayedAt: string;
  streakCorrect: number;         // consecutive correct answers
};

export type UserProgress = {
  sessions: Record<string, UserSessionSave>;
  drills: Record<string, UserDrillSave>;
  totalXp: number;
  level: number;                 // derived from totalXp
  totalSessionsCompleted: number;
  totalSessionsPerfect: number;  // all steps first-try
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  // Mistake tracking
  weakConcepts: Record<string, number>; // conceptId -> times struggled
  mistakeLog: MistakeEntry[];
};

export type MistakeEntry = {
  problemId: string;
  stepCategory: StepCategory;
  wrongChoiceId: string;
  wrongChoiceText: string;
  correctChoiceText: string;
  explanation: string;
  timestamp: string;
};
