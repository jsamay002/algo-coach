import { Problem, SessionTemplate } from "../types";

// Import contest files
import { dec23Problems, dec23Sessions } from "./dec23";
// As more contests are added, import them here:
// import { jan24Problems, jan24Sessions } from "./jan24";

// Combine all Bronze problems
export const bronzeProblems: Problem[] = [
  ...dec23Problems,
];

// Combine all Bronze sessions
export const bronzeSessions: SessionTemplate[] = [
  ...dec23Sessions,
];

// ─── Helper functions ────────────────────────────────────────

export function getBronzeProblemById(id: string): Problem | undefined {
  return bronzeProblems.find((p) => p.id === id);
}

export function getBronzeSessionById(id: string): SessionTemplate | undefined {
  return bronzeSessions.find((s) => s.id === id);
}

export function getBronzeSessionByProblemId(problemId: string): SessionTemplate | undefined {
  return bronzeSessions.find((s) => s.problemId === problemId);
}

export function getBronzeProblemsByContest(contestId: string): Problem[] {
  return bronzeProblems.filter((p) => p.contestId === contestId);
}

export function getBronzeProblemsByConcept(conceptId: string): Problem[] {
  return bronzeProblems.filter((p) => p.concepts.includes(conceptId));
}

export function getBronzeProblemsWithSessions(): Problem[] {
  return bronzeProblems.filter((p) => p.hasSession);
}
