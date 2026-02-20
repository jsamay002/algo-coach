// ─── Divisions ───────────────────────────────────────────────
export type Division = "bronze" | "silver" | "gold";

export const DIVISIONS: { slug: Division; label: string; color: string }[] = [
  { slug: "bronze", label: "Bronze", color: "amber" },
  { slug: "silver", label: "Silver", color: "slate" },
  { slug: "gold", label: "Gold", color: "yellow" },
];

// ─── Concepts (Knowledge Graph) ─────────────────────────────
// Each concept is one algorithmic topic. Prerequisites form a DAG
// so the app can recommend what to learn next.
export type Concept = {
  id: string; // e.g. "binary-search"
  name: string; // e.g. "Binary Search"
  division: Division; // primary division where this is tested
  description: string; // 1-2 sentence explanation
  prerequisites: string[]; // concept IDs that must be understood first
  keyIdeas: string[]; // bullet-point core takeaways
};

// ─── Problems ────────────────────────────────────────────────
// Each problem is a reworded USACO-style problem with full metadata.
export type Problem = {
  id: string; // e.g. "bronze-fence-painting"
  title: string; // e.g. "Fence Painting"
  division: Division;
  concepts: string[]; // concept IDs this problem tests
  difficulty: 1 | 2 | 3; // 1=easy, 2=medium, 3=hard within division
  description: string; // the reworded problem statement
  inputFormat: string; // what the input looks like
  outputFormat: string; // what to output
  sampleInput: string; // example input
  sampleOutput: string; // example output
  constraints: string; // e.g. "1 ≤ N ≤ 100,000"
  sessionId: string; // links to the guided session template
};

// ─── Session (Guided Reasoning) ─────────────────────────────
// The step types — ALL are selection-based, no free text.
export type StepType =
  | "single-choice" // pick one answer
  | "multi-choice" // pick one or more answers
  | "ordering"; // drag/rank items in order (future)

export type Choice = {
  id: string; // e.g. "a", "b", "c"
  text: string; // the choice label
  isCorrect: boolean; // is this a valid answer?
  explanation: string; // shown after selection — why right or wrong
};

// One step in the guided session.
// Each step targets a specific reasoning skill.
export type SessionStep = {
  id: string; // e.g. "classify"
  title: string; // e.g. "Classify the Problem"
  category: StepCategory; // which reasoning skill this tests
  question: string; // what we ask the student
  type: StepType;
  choices: Choice[];
  hint?: string; // optional progressive hint (shown on request)
  coachNote?: string; // "tutor" explanation shown after answering
};

// The 6 reasoning categories in the Model-Before-Code flow.
export type StepCategory =
  | "classify" // What type of problem is this?
  | "identify-variables" // What are the key state variables?
  | "data-structures" // Which data structures fit?
  | "constraints" // What do constraints tell us about complexity?
  | "edge-cases" // What edge cases could break this?
  | "plan"; // What's the step-by-step plan?

// The full guided session for one problem.
export type SessionTemplate = {
  id: string; // matches problem.sessionId
  problemId: string; // links back to the problem
  steps: SessionStep[];
};

// ─── Drills (Pattern Recognition) ───────────────────────────
// Quick MCQ exercises for a specific concept.
export type DrillQuestion = {
  id: string;
  conceptId: string; // which concept this drills
  question: string; // the question text
  context?: string; // optional code snippet or short scenario
  choices: Choice[]; // same Choice type as sessions
  difficulty: 1 | 2 | 3;
};

export type DrillSet = {
  conceptId: string;
  conceptName: string;
  division: Division;
  questions: DrillQuestion[];
};

// ─── User Progress (localStorage) ───────────────────────────
// Saved when a student works through a guided session.
export type UserSessionSave = {
  problemId: string;
  division: Division;
  currentStepIndex: number;
  answers: Record<string, string[]>; // stepId -> selected choice IDs
  startedAt: string; // ISO timestamp
  lastUpdatedAt: string;
  completed: boolean;
  ideUnlocked: boolean; // true only after all steps completed correctly
};

// Saved drill progress.
export type UserDrillSave = {
  conceptId: string;
  questionsAnswered: number;
  questionsCorrect: number;
  lastPlayedAt: string;
};

// Overall user progress across the app.
export type UserProgress = {
  sessions: Record<string, UserSessionSave>; // keyed by problemId
  drills: Record<string, UserDrillSave>; // keyed by conceptId
  totalSessionsCompleted: number;
  currentStreak: number; // days in a row
  lastActiveDate: string;
};
