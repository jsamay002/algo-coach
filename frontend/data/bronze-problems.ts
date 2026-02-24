import { Problem } from "./types";

// ═══════════════════════════════════════════════════════════════
// BRONZE PROBLEMS DATABASE
// Generated contest-by-contest, newest first.
// Each problem has full reasoning breakdown.
// Problems with hasSession: true have matching entries in bronze-sessions.ts
// ═══════════════════════════════════════════════════════════════

export const bronzeProblems: Problem[] = [
  // ═══════════════════════════════════════════════════════════
  // DECEMBER 2023
  // ═══════════════════════════════════════════════════════════
  {
    id: "usaco-bronze-dec23-1",
    title: "Candy Cane Feast",
    division: "bronze",
    concepts: ["simulation", "implementation", "math-logic"],
    difficulty: 2,
    source: "USACO Bronze, December 2023, Problem 1",
    usacoUrl: "http://usaco.org/index.php?page=viewproblem2&cpid=1347",
    contestId: "dec23",
    problemNumber: 1,
    reasoning: {
      classify: "This is a simulation problem because the process is completely specified: each candy cane is handled in input order, and for each candy cane, cows interact with it in a fixed order. The only task is to track state changes correctly (the candy's current eaten base height and each cow's height growth).",
      keyInsight: "You do not need to track the candy cane as a full interval object. For each candy cane, it is enough to track one number: the current lowest uneaten height (`start`). A cow of height `h` can raise that boundary to `min(h, candyHeight)`, and the amount she eats is exactly `max(0, min(h, candyHeight) - start)`.",
      variables: [
        "heights[i] — current height of cow i (changes after every candy cane)",
        "x — height of the current candy cane being processed",
        "start — lowest uneaten height of the current candy cane (initially 0)",
        "reach — max height current cow can affect on this candy: min(heights[i], x)",
        "eaten — amount current cow eats from this candy: max(0, reach - start)",
      ],
      approach: "1. Read N, M, the initial cow heights, and the M candy cane heights.\n2. For each candy cane of height x, initialize `start = 0`.\n3. Process cows in order from 1 to N.\n4. For each cow, compute `reach = min(heights[i], x)` because the cow cannot eat above either her height or the candy's top.\n5. If `reach > start`, then this cow eats `reach - start` units. Add that amount to `heights[i]` (she grows), and update `start = reach`.\n6. If `start == x`, the candy is fully eaten, so stop processing this candy early.\n7. After all candies are processed, output final cow heights line by line.",
      complexity: "O(N × M) time in the straightforward simulation, since each candy cane may scan cows in order once. Space is O(N) for the heights array. The key implementation detail is using 64-bit integers because heights can grow and values are up to 1e9 initially.",
      edgeCases: [
        "A cow eats nothing because `start` is already above her height",
        "The first cow eats the entire candy cane, so later cows should not be processed for that candy",
        "Multiple cows have the same height; only the first one that reaches a new level may eat",
        "A candy cane of height 1 gets consumed immediately if the first cow has height >= 1",
        "Large values (1e9 heights) require 64-bit integers after repeated growth",
      ],
      whyThisWorks: "At any moment, the uneaten part of a candy cane is a single vertical interval `[start, x]` because cows only remove from the bottom upward and the candy is never lowered. For each cow, the highest point she can possibly eat is `min(heights[i], x)`. If this is at most `start`, she cannot reach any uneaten candy. Otherwise, she eats exactly `[start, min(heights[i], x)]`. Updating `start` preserves the invariant. Since the process order is fixed, simulating this update rule exactly matches the real process.",
    },
    commonMistakes: [
      "Forgetting that cow heights increase immediately after they eat from the current candy cane",
      "Tracking only total candy remaining instead of the current eaten base height (`start`)",
      "Using 32-bit integers (`int`) and overflowing after repeated growth",
      "Letting a cow eat from height 0 every time instead of from the current `start` boundary",
      "Not stopping early when the candy is fully consumed (`start == x`)",
    ],
    sessionId: "session-bronze-dec23-1",
    hasSession: true,
  },
  {
    id: "usaco-bronze-dec23-2",
    title: "Cowntact Tracing 2",
    division: "bronze",
    concepts: ["math-logic", "counting", "ad-hoc"],
    difficulty: 3,
    source: "USACO Bronze, December 2023, Problem 2",
    usacoUrl: "http://usaco.org/index.php?page=viewproblem2&cpid=1348",
    contestId: "dec23",
    problemNumber: 2,
    reasoning: {
      classify: "This is a math-logic/ad-hoc counting problem because the final infection pattern is static, but we must infer a hidden number of days and the minimum number of initial sources. The key structure is that each initially infected cow expands to a contiguous odd-length window after D nights, so the problem becomes segment constraints and covering, not simulation over time.",
      keyInsight: "Fixing the number of days D turns each initial infected cow into a window of length 2D+1. To minimize the number of initial cows, we want the largest feasible D. Feasibility of D is determined entirely by the lengths and positions (end vs middle) of contiguous blocks of 1s.",
      variables: [
        "segments[] — lengths of contiguous infected ('1') blocks in the final bitstring",
        "isLeftEndInfected / isRightEndInfected — whether a segment touches an array boundary",
        "maxWindow — the largest feasible infection window length (2D+1)",
        "D — inferred number of nights, where maxWindow = 2D+1",
        "initialCount — total number of initially infected cows needed after choosing maxWindow",
      ],
      approach: "1. Parse the bitstring and collect lengths of all contiguous blocks of 1s.\n2. If there are no 1s, answer is 0.\n3. Compute the maximum feasible odd window size maxWindow using block constraints:\n   - For a middle block of length L, largest valid window is L if L is odd, or L-1 if L is even.\n   - For an end block of length L, largest valid window can be as large as 2L-1.\n   - Take the minimum allowed window across all blocks.\n4. For each infected block of length L, count how many windows needed: ceil(L / maxWindow).\n5. Sum over all infected blocks and output the total.",
      complexity: "O(N) time and O(number of segments) space. We scan the string once to build segments, then scan segments once more to compute maxWindow and the final count.",
      edgeCases: [
        "No infected cows at all (bitstring is all 0s) → answer 0",
        "All cows infected (single segment touching both ends) → one source may be enough",
        "A middle infected segment with even length cannot come from one centered source for any integer D",
        "Length-1 infected segments (window size must remain at least 1)",
        "Multiple segments where one short segment forces a small maxWindow and increases source count in larger segments",
      ],
      whyThisWorks: "After D nights, each initial infected cow affects exactly the cows within distance D, which is a contiguous window of odd length 2D+1. Therefore every final 1-block must be coverable by these windows without crossing any 0s. The largest feasible D minimizes the number of windows needed because larger windows can only weakly decrease the count ceil(L / window). Once maxWindow is fixed, summing ceil(L / maxWindow) over blocks is both necessary and sufficient.",
    },
    commonMistakes: [
      "Assuming the shortest 1-block length always determines the window size (fails on end blocks and even-length middle blocks)",
      "Forgetting that the infection window size must be odd (2D+1)",
      "Treating end segments the same as middle segments",
      "Using floor(L / window) instead of ceil(L / window) when counting sources per segment",
      "Trying to simulate night-by-night spread instead of reasoning from the final segments",
    ],
    sessionId: "session-bronze-dec23-2",
    hasSession: true,
  },
  {
    id: "usaco-bronze-dec23-3",
    title: "Farmer John Actually Farms",
    division: "bronze",
    concepts: ["sorting", "math-logic", "ad-hoc"],
    difficulty: 3,
    source: "USACO Bronze, December 2023, Problem 3",
    usacoUrl: "http://usaco.org/index.php?page=viewproblem2&cpid=1349",
    contestId: "dec23",
    problemNumber: 3,
    reasoning: {
      classify: "This is a sorting + math-logic constraints problem because the target array t_i defines the required final rank order, and we must find a day d such that all pairwise height inequalities in that order hold simultaneously. The core task is turning growth equations into bounds on d.",
      keyInsight: "Sort plants by target rank (equivalently by t_i), then only compare adjacent plants in that sorted order. If every adjacent pair is in the correct strict order on day d, then the entire sorted order is correct. Each adjacent pair gives a lower or upper bound on d, and we intersect all bounds.",
      variables: [
        "plants[] = (h_i, a_i, t_i) for each plant",
        "order[] — plants sorted by target rank so final heights must be strictly decreasing along this order",
        "lo — minimum feasible day lower bound (inclusive), initially 0",
        "hi — first infeasible day upper bound (exclusive), initially +infinity",
        "deltaH, deltaA — differences used to derive inequality bounds for adjacent pairs",
      ],
      approach: "1. Bundle each plant's initial height h_i, growth rate a_i, and target taller-count t_i.\n2. Sort by t_i ascending, so sorted plants must have strictly decreasing final heights.\n3. For each adjacent pair (prev, cur) in sorted order, require: prev.h + d*prev.a > cur.h + d*cur.a.\n4. Rearrange into a linear inequality in d and derive a bound:\n   - If prev.a == cur.a, either always true (if prev.h > cur.h) or impossible.\n   - If prev.a > cur.a, this gives an upper bound on d.\n   - If prev.a < cur.a, this gives a lower bound on d.\n5. Intersect all bounds. If the feasible interval is empty, output -1.\n6. Otherwise output the smallest integer d in the interval.",
      complexity: "O(N log N) per test case due to sorting, then O(N) to build the feasible interval from adjacent pairs. This fits the total N ≤ 2·10^5 across all test cases.",
      edgeCases: [
        "N = 1 → answer is always 0",
        "Two plants with equal growth rates and equal heights but requiring strict order → impossible",
        "Strict inequality boundary where d must be > value, so floor division must be adjusted by +1",
        "Upper-bound case where d < value, requiring ceiling-style handling for strictness",
        "Already valid at day 0 even though some future days break the order (must return 0, not a later day)",
      ],
      whyThisWorks: "The target values t_i form a total order of desired heights because they are a permutation of 0..N-1. After sorting by t_i, the requirement is exactly a chain of strict inequalities between consecutive plants. A total strict order holds if all adjacent inequalities hold. Each adjacent inequality is linear in d, so it defines a half-line. The set of valid days is the intersection of these half-lines, which is an integer interval. The minimum valid day is the smallest integer in that interval.",
    },
    commonMistakes: [
      "Sorting by current height or growth rate instead of by target rank t_i",
      "Checking all O(N^2) pairs when adjacent pairs in sorted target order are sufficient",
      "Using non-strict inequalities (>=) even though the problem requires strict taller-than",
      "Getting integer division wrong when converting strict inequalities into bounds",
      "Not using 64-bit integers for h_i + d*a_i",
    ],
    sessionId: "session-bronze-dec23-3",
    hasSession: true,
  },
];

// ─── Helper functions ────────────────────────────────────────

export function getBronzeProblemsByContest(contestId: string): Problem[] {
  return bronzeProblems.filter((p) => p.contestId === contestId);
}

export function getBronzeProblemById(id: string): Problem | undefined {
  return bronzeProblems.find((p) => p.id === id);
}

export function getBronzeProblemsByConcept(conceptId: string): Problem[] {
  return bronzeProblems.filter((p) => p.concepts.includes(conceptId));
}

export function getBronzeProblemsWithSessions(): Problem[] {
  return bronzeProblems.filter((p) => p.hasSession);
}
