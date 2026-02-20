import { DrillSet } from "./types";

export const drillSets: DrillSet[] = [
  // ═══════════════════════════════════════════════════════════
  // TIME COMPLEXITY
  // ═══════════════════════════════════════════════════════════
  {
    conceptId: "time-complexity",
    conceptName: "Time Complexity",
    division: "bronze",
    questions: [
      {
        id: "tc-1",
        conceptId: "time-complexity",
        question: "N = 100,000. Which of these time complexities will pass in ~1 second?",
        difficulty: 1,
        choices: [
          { id: "a", text: "O(N²) = 10¹⁰", isCorrect: false, explanation: "10¹⁰ is way over the ~10⁸ limit. This would take ~100 seconds." },
          { id: "b", text: "O(N log N) ≈ 1.7 × 10⁶", isCorrect: true, explanation: "Correct! Well under 10⁸. Sorting-based solutions work at this size." },
          { id: "c", text: "O(2ᴺ)", isCorrect: false, explanation: "2¹⁰⁰'⁰⁰⁰ is astronomically large. Exponential is only for N ≤ ~20." },
          { id: "d", text: "O(N³) = 10¹⁵", isCorrect: false, explanation: "10¹⁵ would take years. O(N³) is only for N ≤ ~500." },
        ],
      },
      {
        id: "tc-2",
        conceptId: "time-complexity",
        question: "You see 'N ≤ 1,000' in the constraints. What's the maximum complexity you can afford?",
        difficulty: 1,
        choices: [
          { id: "a", text: "O(N) only", isCorrect: false, explanation: "O(N) works, but you can afford more. 1000² = 10⁶ which is fine." },
          { id: "b", text: "O(N²) = 10⁶", isCorrect: true, explanation: "Correct! 10⁶ is well under 10⁸. Nested loops over N = 1000 are fine." },
          { id: "c", text: "O(N³) = 10⁹", isCorrect: false, explanation: "Borderline — 10⁹ might TLE. O(N²) is the safe bet." },
          { id: "d", text: "O(2ᴺ)", isCorrect: false, explanation: "2¹⁰⁰⁰ is impossible. Exponential only works for N ≤ ~20." },
        ],
      },
      {
        id: "tc-3",
        conceptId: "time-complexity",
        question: "A problem has N ≤ 20. What approach does this strongly suggest?",
        difficulty: 2,
        choices: [
          { id: "a", text: "Bitmask / brute force over all 2ᴺ subsets", isCorrect: true, explanation: "Correct! 2²⁰ ≈ 10⁶. The small N screams 'try all subsets' or bitmask DP." },
          { id: "b", text: "Binary search", isCorrect: false, explanation: "Binary search works for any N. N ≤ 20 specifically hints at exponential approaches." },
          { id: "c", text: "Sorting only", isCorrect: false, explanation: "Sorting works for any N. N ≤ 20 is an intentional hint about exponential approaches." },
          { id: "d", text: "The constraints are irrelevant", isCorrect: false, explanation: "Constraints are NEVER irrelevant. N ≤ 20 is one of the strongest hints in competitive programming." },
        ],
      },
      {
        id: "tc-4",
        conceptId: "time-complexity",
        question: "What's the time complexity of built-in sort in most languages?",
        difficulty: 1,
        choices: [
          { id: "a", text: "O(N)", isCorrect: false, explanation: "General-purpose comparison sort can't beat O(N log N). O(N) is only for special sorts like counting sort." },
          { id: "b", text: "O(N log N)", isCorrect: true, explanation: "Correct! Most languages use Timsort or Introsort, both O(N log N) average and worst case." },
          { id: "c", text: "O(N²)", isCorrect: false, explanation: "That's bubble sort / insertion sort. Built-in sorts are much faster." },
          { id: "d", text: "O(log N)", isCorrect: false, explanation: "You can't even look at all N elements in O(log N). Sort must be at least O(N)." },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SIMULATION
  // ═══════════════════════════════════════════════════════════
  {
    conceptId: "simulation",
    conceptName: "Simulation",
    division: "bronze",
    questions: [
      {
        id: "sim-1",
        conceptId: "simulation",
        question:
          "A problem says: 'Each day, each cow eats 3 units of hay. After 7 days, how much hay is left?' What approach is this?",
        difficulty: 1,
        choices: [
          { id: "a", text: "Simulation — step through each day", isCorrect: true, explanation: "Correct! Or even simpler: direct math (hay - cows × 3 × 7). But the pattern is simulation." },
          { id: "b", text: "Dynamic programming", isCorrect: false, explanation: "No overlapping subproblems. This is just following a straightforward process." },
          { id: "c", text: "Graph traversal", isCorrect: false, explanation: "No nodes or edges. Just a repeated process over time." },
          { id: "d", text: "Binary search", isCorrect: false, explanation: "Nothing to search for. Just execute the described process." },
        ],
      },
      {
        id: "sim-2",
        conceptId: "simulation",
        question: "When is simulation NOT the right approach?",
        difficulty: 2,
        choices: [
          { id: "a", text: "When the number of steps is very large (e.g., 10⁹ iterations)", isCorrect: true, explanation: "Correct! If you can't afford to simulate every step, you need math, binary search, or pattern-finding." },
          { id: "b", text: "When the problem describes a step-by-step process", isCorrect: false, explanation: "Step-by-step processes are exactly what simulation is for." },
          { id: "c", text: "When N ≤ 1000", isCorrect: false, explanation: "N ≤ 1000 is small — simulation would be fine." },
          { id: "d", text: "When the problem involves arrays", isCorrect: false, explanation: "Many simulation problems use arrays. Arrays don't disqualify simulation." },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // COMPLETE SEARCH
  // ═══════════════════════════════════════════════════════════
  {
    conceptId: "complete-search",
    conceptName: "Complete Search",
    division: "bronze",
    questions: [
      {
        id: "cs-1",
        conceptId: "complete-search",
        question:
          "A problem says: 'Find two numbers in an array that sum to K.' N ≤ 1000. What's the simplest approach?",
        difficulty: 1,
        choices: [
          { id: "a", text: "Try all O(N²) pairs", isCorrect: true, explanation: "Correct! 1000² = 10⁶. Brute force all pairs is fast enough and simple to code." },
          { id: "b", text: "Sort + two pointers", isCorrect: false, explanation: "That works and is O(N log N), but brute force is simpler and fast enough for N ≤ 1000." },
          { id: "c", text: "Hash map for O(N)", isCorrect: false, explanation: "Also works, but more complex than needed. When brute force fits, use it." },
          { id: "d", text: "Binary search for each element", isCorrect: false, explanation: "Overcomplicated. With N ≤ 1000, nested loops are the simplest and fastest to code." },
        ],
      },
      {
        id: "cs-2",
        conceptId: "complete-search",
        question: "You need to check all subsets of a set with 15 elements. How many subsets are there?",
        difficulty: 2,
        choices: [
          { id: "a", text: "2¹⁵ = 32,768", isCorrect: true, explanation: "Correct! Each element is either in or out → 2 choices per element → 2¹⁵ total." },
          { id: "b", text: "15! = 1,307,674,368,000", isCorrect: false, explanation: "That's permutations, not subsets. 15! is way too large to enumerate." },
          { id: "c", text: "15² = 225", isCorrect: false, explanation: "That's pairs, not subsets. Subsets count all possible combinations." },
          { id: "d", text: "15 × 14 / 2 = 105", isCorrect: false, explanation: "That's the number of pairs (subsets of size 2). Total subsets includes all sizes." },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // PREFIX SUMS (Silver)
  // ═══════════════════════════════════════════════════════════
  {
    conceptId: "prefix-sums",
    conceptName: "Prefix Sums",
    division: "silver",
    questions: [
      {
        id: "ps-1",
        conceptId: "prefix-sums",
        question: "Array = [3, 1, 4, 1, 5]. What is prefix[3] (sum of first 3 elements)?",
        difficulty: 1,
        choices: [
          { id: "a", text: "8", isCorrect: true, explanation: "Correct! prefix[3] = 3 + 1 + 4 = 8." },
          { id: "b", text: "4", isCorrect: false, explanation: "That's just the element at index 2. Prefix sum is cumulative." },
          { id: "c", text: "9", isCorrect: false, explanation: "Check your addition. 3 + 1 + 4 = 8, not 9." },
          { id: "d", text: "14", isCorrect: false, explanation: "That's the sum of all 5 elements. prefix[3] only includes the first 3." },
        ],
      },
      {
        id: "ps-2",
        conceptId: "prefix-sums",
        question: "You have 100,000 range sum queries on an array of 100,000 elements. Without prefix sums, how slow is it?",
        difficulty: 2,
        choices: [
          { id: "a", text: "O(N × Q) = 10¹⁰ — way too slow", isCorrect: true, explanation: "Correct! Each query scans up to N elements. 10⁵ × 10⁵ = 10¹⁰. Prefix sums reduce each query to O(1)." },
          { id: "b", text: "O(N + Q) — fine", isCorrect: false, explanation: "That would be the prefix sum approach. Without it, each query is O(N), not O(1)." },
          { id: "c", text: "O(Q log N) — binary search each query", isCorrect: false, explanation: "Binary search finds positions, not sums. Range sum needs prefix sums or segment trees." },
          { id: "d", text: "O(N²) — just nested loops", isCorrect: false, explanation: "It's O(N × Q), not O(N²). Q and N might be different values." },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // BINARY SEARCH (Silver)
  // ═══════════════════════════════════════════════════════════
  {
    conceptId: "binary-search",
    conceptName: "Binary Search",
    division: "silver",
    questions: [
      {
        id: "bs-1",
        conceptId: "binary-search",
        question:
          "A problem asks: 'What is the largest minimum distance between C objects placed among N positions?' What technique does this suggest?",
        difficulty: 2,
        choices: [
          { id: "a", text: "Binary search on the answer", isCorrect: true, explanation: "Correct! 'Largest minimum' or 'smallest maximum' almost always means binary search on the answer." },
          { id: "b", text: "Greedy placement", isCorrect: false, explanation: "Greedy is part of the check function, but the outer strategy is binary search on the distance." },
          { id: "c", text: "Dynamic programming", isCorrect: false, explanation: "DP would be too slow for most constraint sizes. Binary search + greedy check is the standard approach." },
          { id: "d", text: "Sorting only", isCorrect: false, explanation: "You sort the positions as a preprocessing step, but the core technique is binary search." },
        ],
      },
      {
        id: "bs-2",
        conceptId: "binary-search",
        question: "Binary search requires the search space to have what property?",
        difficulty: 1,
        choices: [
          { id: "a", text: "Monotonicity — if condition holds at X, it holds for all X' > X (or < X)", isCorrect: true, explanation: "Correct! Binary search only works when the answer space is monotonic (sorted). Otherwise you can't safely eliminate half." },
          { id: "b", text: "The data must be integers", isCorrect: false, explanation: "Binary search works on real numbers too. You just use a precision-based stopping condition." },
          { id: "c", text: "The array must have unique elements", isCorrect: false, explanation: "Binary search works with duplicates. You might need lower_bound vs upper_bound." },
          { id: "d", text: "The array must be small (N ≤ 1000)", isCorrect: false, explanation: "Binary search works on ANY size. That's the whole point — it's O(log N)." },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // DFS (Silver)
  // ═══════════════════════════════════════════════════════════
  {
    conceptId: "dfs",
    conceptName: "DFS",
    division: "silver",
    questions: [
      {
        id: "dfs-1",
        conceptId: "dfs",
        question: "A grid has land (.) and water (#). 'Count the number of islands.' What algorithm?",
        difficulty: 1,
        choices: [
          { id: "a", text: "DFS/BFS flood fill — start from each unvisited land cell", isCorrect: true, explanation: "Correct! Each flood fill finds one island. Count how many times you start a new fill." },
          { id: "b", text: "Binary search", isCorrect: false, explanation: "Nothing to search for. You need to explore connected regions." },
          { id: "c", text: "Sorting the cells", isCorrect: false, explanation: "Grid connectivity isn't about ordering. It's about which cells are adjacent." },
          { id: "d", text: "Dynamic programming", isCorrect: false, explanation: "Counting connected components is a graph traversal problem, not an optimization problem." },
        ],
      },
      {
        id: "dfs-2",
        conceptId: "dfs",
        question: "You forget to mark nodes as visited during DFS on a graph with cycles. What happens?",
        difficulty: 1,
        choices: [
          { id: "a", text: "Infinite loop — you keep revisiting the same nodes forever", isCorrect: true, explanation: "Correct! Without a visited check, DFS will loop through the cycle indefinitely. Always mark visited!" },
          { id: "b", text: "It still works, just slower", isCorrect: false, explanation: "On a graph with cycles, it's not just slow — it's infinite. It will never terminate." },
          { id: "c", text: "It produces wrong answers but terminates", isCorrect: false, explanation: "It won't even terminate. An infinite loop crashes before producing any answer." },
          { id: "d", text: "Nothing — cycles don't affect DFS", isCorrect: false, explanation: "Cycles absolutely affect DFS. That's why the visited array exists." },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // DP INTRO (Gold)
  // ═══════════════════════════════════════════════════════════
  {
    conceptId: "dp-intro",
    conceptName: "Dynamic Programming",
    division: "gold",
    questions: [
      {
        id: "dp-1",
        conceptId: "dp-intro",
        question: "How do you know a problem might need DP instead of greedy?",
        difficulty: 2,
        choices: [
          { id: "a", text: "The greedy choice at one step affects what's possible at future steps — you can't be locally optimal", isCorrect: true, explanation: "Correct! DP is needed when locally optimal choices don't lead to globally optimal solutions. You need to consider all possibilities." },
          { id: "b", text: "The input is sorted", isCorrect: false, explanation: "Sorted input doesn't indicate DP. Many greedy and binary search problems use sorted input." },
          { id: "c", text: "N is small", isCorrect: false, explanation: "Small N might mean brute force. DP is about overlapping subproblems, not just small N." },
          { id: "d", text: "The problem involves strings", isCorrect: false, explanation: "Strings can be solved with DP, greedy, or other techniques. The type alone doesn't determine the approach." },
        ],
      },
      {
        id: "dp-2",
        conceptId: "dp-intro",
        question: "What are the two key properties that make a problem solvable with DP?",
        difficulty: 1,
        choices: [
          { id: "a", text: "Optimal substructure + overlapping subproblems", isCorrect: true, explanation: "Correct! Optimal substructure = the solution builds from subsolutions. Overlapping subproblems = you'd recompute the same things without memoization." },
          { id: "b", text: "Sorted input + binary property", isCorrect: false, explanation: "That's binary search, not DP." },
          { id: "c", text: "Greedy choice property + optimal substructure", isCorrect: false, explanation: "Greedy choice property is for greedy algorithms. DP replaces the greedy choice with exhaustive subproblem evaluation." },
          { id: "d", text: "Connected components + cycle detection", isCorrect: false, explanation: "That's graph traversal territory, not DP." },
        ],
      },
    ],
  },
];

// ─── Helper functions ────────────────────────────────────────

export function getDrillsByDivision(division: string): DrillSet[] {
  return drillSets.filter((d) => d.division === division);
}

export function getDrillByConcept(conceptId: string): DrillSet | undefined {
  return drillSets.find((d) => d.conceptId === conceptId);
}
