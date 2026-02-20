import { Problem } from "./types";

export const problems: Problem[] = [
  // ═══════════════════════════════════════════════════════════
  // BRONZE PROBLEMS
  // ═══════════════════════════════════════════════════════════
  {
    id: "bronze-fence-segments",
    title: "Fence Segments",
    division: "bronze",
    concepts: ["simulation", "rectangle-geometry"],
    difficulty: 1,
    description: `Farmer John is painting two segments of a fence along a number line.

The first segment covers positions A to B (inclusive). The second segment covers positions C to D (inclusive).

Determine the total length of fence that is painted. Note that if the segments overlap, the overlapping region should only be counted once.`,
    inputFormat:
      "Four integers A, B, C, D on separate lines (0 ≤ A < B ≤ 100, 0 ≤ C < D ≤ 100).",
    outputFormat: "A single integer: the total painted length.",
    sampleInput: "2\n5\n4\n8",
    sampleOutput: "6",
    constraints: "0 ≤ A < B ≤ 100, 0 ≤ C < D ≤ 100",
    sessionId: "session-bronze-fence-segments",
  },
  {
    id: "bronze-milk-counting",
    title: "Milk Production Log",
    division: "bronze",
    concepts: ["simulation", "arrays-maps", "sorting"],
    difficulty: 1,
    description: `Farmer John has N cows. Each cow produces a certain amount of milk per day.

Given the milk production of each cow, determine which cow produces the median amount of milk. If N is odd, the median is the middle value when sorted. If N is even, output the cow that produces the lower of the two middle values.

Output the original index (1-based) of the median cow.`,
    inputFormat:
      "Line 1: integer N (1 ≤ N ≤ 1000). Lines 2..N+1: integer milk production of each cow.",
    outputFormat: "A single integer: the 1-based index of the median cow.",
    sampleInput: "5\n8\n3\n9\n1\n7",
    sampleOutput: "5",
    constraints: "1 ≤ N ≤ 1,000. Milk values are distinct integers between 1 and 1,000,000.",
    sessionId: "session-bronze-milk-counting",
  },
  {
    id: "bronze-shell-game",
    title: "Shell Shuffle",
    division: "bronze",
    concepts: ["simulation", "complete-search"],
    difficulty: 2,
    description: `Farmer John is playing a shell game with three cups labeled 1, 2, and 3.

A ball is placed under one of the cups. Then N swaps are performed. In each swap, two cups exchange positions.

After all swaps, FJ guesses which cup the ball is under. Since FJ doesn't know where the ball started, determine which starting position (1, 2, or 3) would have resulted in the most correct guesses if the game were played N times with the same swaps but different guesses each round.

For each swap, FJ makes a guess. Count how many of FJ's guesses would be correct for each possible starting position. Output the maximum count.`,
    inputFormat:
      "Line 1: integer N (1 ≤ N ≤ 100). Next N lines: three integers a, b, g — cups a and b are swapped, then FJ guesses g.",
    outputFormat: "A single integer: the maximum number of correct guesses.",
    sampleInput: "3\n1 2 1\n2 3 2\n1 3 1",
    sampleOutput: "2",
    constraints: "1 ≤ N ≤ 100. 1 ≤ a, b, g ≤ 3. a ≠ b.",
    sessionId: "session-bronze-shell-game",
  },
  {
    id: "bronze-daisy-chains",
    title: "Daisy Chains",
    division: "bronze",
    concepts: ["complete-search", "simulation"],
    difficulty: 2,
    description: `Farmer John has N flowers in a row, each with a certain number of petals.

A contiguous group of flowers is called "photogenic" if at least one flower in the group has exactly the average number of petals of the group.

Count the total number of photogenic contiguous groups (including individual flowers).`,
    inputFormat:
      "Line 1: integer N (1 ≤ N ≤ 100). Line 2: N integers, the petal count of each flower.",
    outputFormat: "A single integer: the number of photogenic groups.",
    sampleInput: "4\n1 1 2 3",
    sampleOutput: "8",
    constraints: "1 ≤ N ≤ 100. Petal counts between 1 and 1,000.",
    sessionId: "session-bronze-daisy-chains",
  },
  {
    id: "bronze-cow-tipping",
    title: "Grid Flipping",
    division: "bronze",
    concepts: ["simulation", "complete-search", "ad-hoc"],
    difficulty: 3,
    description: `You are given an N×N grid of 0s and 1s.

In one operation, you can choose any rectangle with its bottom-right corner at (N,N) and flip all values in that rectangle (0→1, 1→0).

Determine the minimum number of operations needed to make the entire grid all 0s.`,
    inputFormat: "Line 1: integer N (1 ≤ N ≤ 10). Next N lines: N characters, each '0' or '1'.",
    outputFormat: "A single integer: the minimum number of operations.",
    sampleInput: "3\n001\n011\n111",
    sampleOutput: "3",
    constraints: "1 ≤ N ≤ 10.",
    sessionId: "session-bronze-cow-tipping",
  },

  // ═══════════════════════════════════════════════════════════
  // SILVER PROBLEMS
  // ═══════════════════════════════════════════════════════════
  {
    id: "silver-subarray-sums",
    title: "Subarray Sum Target",
    division: "silver",
    concepts: ["prefix-sums", "arrays-maps"],
    difficulty: 1,
    description: `Given an array of N integers, count the number of contiguous subarrays whose sum equals a target value S.`,
    inputFormat: "Line 1: integers N and S. Line 2: N integers.",
    outputFormat: "A single integer: the count of subarrays summing to S.",
    sampleInput: "5 4\n1 2 1 3 1",
    sampleOutput: "2",
    constraints: "1 ≤ N ≤ 200,000. -10⁹ ≤ values ≤ 10⁹.",
    sessionId: "session-silver-subarray-sums",
  },
  {
    id: "silver-cow-search",
    title: "Cow Placement Search",
    division: "silver",
    concepts: ["binary-search", "sorting"],
    difficulty: 1,
    description: `Farmer John wants to place C cows in N stalls arranged along a line.

The stalls are at given positions. FJ wants to maximize the minimum distance between any two cows.

What is the largest possible minimum distance?`,
    inputFormat: "Line 1: integers N and C. Next N lines: position of each stall.",
    outputFormat: "A single integer: the largest minimum distance.",
    sampleInput: "5 3\n1\n2\n8\n4\n9",
    sampleOutput: "3",
    constraints: "2 ≤ C ≤ N ≤ 100,000. Positions ≤ 10⁹.",
    sessionId: "session-silver-cow-search",
  },
  {
    id: "silver-connected-fields",
    title: "Connected Fields",
    division: "silver",
    concepts: ["flood-fill", "dfs", "bfs"],
    difficulty: 2,
    description: `Farmer John's farm is represented as an N×M grid. Each cell is either grass (.) or a fence (#).

A "field" is a connected region of grass cells (connected horizontally or vertically, not diagonally).

Count the number of fields.`,
    inputFormat: "Line 1: integers N and M. Next N lines: M characters each.",
    outputFormat: "A single integer: the number of fields.",
    sampleInput: "4 5\n.#.#.\n.#...\n..#.#\n.#...",
    sampleOutput: "3",
    constraints: "1 ≤ N, M ≤ 1,000.",
    sessionId: "session-silver-connected-fields",
  },

  // ═══════════════════════════════════════════════════════════
  // GOLD PROBLEMS
  // ═══════════════════════════════════════════════════════════
  {
    id: "gold-max-gift-value",
    title: "Maximum Gift Value",
    division: "gold",
    concepts: ["dp-knapsack"],
    difficulty: 1,
    description: `You have N gifts to choose from. Each gift has a weight and a value.

Your bag can hold at most W total weight. You can take each gift at most once.

What is the maximum total value you can carry?`,
    inputFormat: "Line 1: integers N and W. Next N lines: weight and value of each gift.",
    outputFormat: "A single integer: the maximum value.",
    sampleInput: "4 7\n1 1\n3 4\n4 5\n5 7",
    sampleOutput: "9",
    constraints: "1 ≤ N ≤ 1,000. 1 ≤ W ≤ 10,000.",
    sessionId: "session-gold-max-gift-value",
  },
  {
    id: "gold-shortest-delivery",
    title: "Shortest Delivery Route",
    division: "gold",
    concepts: ["shortest-paths"],
    difficulty: 2,
    description: `Farmer John needs to deliver milk from the farm (node 1) to the store (node N).

There are N locations and M roads between them, each with a travel time.

Find the minimum travel time from node 1 to node N.`,
    inputFormat:
      "Line 1: integers N and M. Next M lines: integers u, v, w (road between u and v with time w).",
    outputFormat: "A single integer: the minimum travel time, or -1 if impossible.",
    sampleInput: "4 5\n1 2 3\n1 3 1\n2 4 5\n3 2 1\n3 4 6",
    sampleOutput: "5",
    constraints: "2 ≤ N ≤ 100,000. 1 ≤ M ≤ 200,000. 1 ≤ w ≤ 10⁶.",
    sessionId: "session-gold-shortest-delivery",
  },
];

// ─── Helper functions ────────────────────────────────────────

export function getProblemsByDivision(division: string): Problem[] {
  return problems.filter((p) => p.division === division);
}

export function getProblemById(id: string): Problem | undefined {
  return problems.find((p) => p.id === id);
}

export function getProblemsByConcept(conceptId: string): Problem[] {
  return problems.filter((p) => p.concepts.includes(conceptId));
}
