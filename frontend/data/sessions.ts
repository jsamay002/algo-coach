import { SessionTemplate } from "./types";

export const sessions: SessionTemplate[] = [
  // ═══════════════════════════════════════════════════════════
  // FENCE SEGMENTS — Bronze, Difficulty 1
  // ═══════════════════════════════════════════════════════════
  {
    id: "session-bronze-fence-segments",
    problemId: "bronze-fence-segments",
    steps: [
      {
        id: "classify",
        title: "Classify the Problem",
        category: "classify",
        question: "What type of problem is this?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "Simulation — follow the steps described",
            isCorrect: false,
            explanation:
              "There's no multi-step process to simulate. We just need to compute a geometric property.",
          },
          {
            id: "b",
            text: "Rectangle/interval geometry — compute overlap of ranges",
            isCorrect: true,
            explanation:
              "Correct! Two segments on a number line can overlap. We need to compute total painted length, accounting for overlap.",
          },
          {
            id: "c",
            text: "Sorting — rearrange data to solve",
            isCorrect: false,
            explanation:
              "With only 2 segments, there's nothing to sort. Sorting is for when you have many items to order.",
          },
          {
            id: "d",
            text: "Graph problem — connections between nodes",
            isCorrect: false,
            explanation:
              "There are no nodes or edges here. This is purely about intervals on a number line.",
          },
        ],
        hint: "Think about what happens when two ranges on a number line overlap. What's the total covered length?",
        coachNote:
          "This is an interval overlap problem. The key insight: total = length1 + length2 - overlap. This pattern appears constantly in Bronze.",
      },
      {
        id: "variables",
        title: "Identify Key Variables",
        category: "identify-variables",
        question: "What are the key values you need to track?",
        type: "multi-choice",
        choices: [
          {
            id: "a",
            text: "Length of segment 1: (B - A)",
            isCorrect: true,
            explanation: "Yes! The first segment spans from A to B, so its length is B - A.",
          },
          {
            id: "b",
            text: "Length of segment 2: (D - C)",
            isCorrect: true,
            explanation: "Yes! The second segment spans from C to D, so its length is D - C.",
          },
          {
            id: "c",
            text: "The overlap length between the two segments",
            isCorrect: true,
            explanation:
              "Yes! If the segments overlap, we'd double-count that region, so we need to subtract it once.",
          },
          {
            id: "d",
            text: "The total number of fence posts",
            isCorrect: false,
            explanation:
              "The problem asks about length (continuous), not discrete fence posts. Don't add information that isn't there.",
          },
        ],
        hint: "What three numbers would you need to compute the total painted length?",
        coachNote:
          "Total = len1 + len2 - overlap. This is the inclusion-exclusion principle for two sets. You'll see this pattern in many problems.",
      },
      {
        id: "data-structures",
        title: "Choose Data Structures",
        category: "data-structures",
        question: "What data structures do you need for this problem?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "Just simple integer variables — no complex data structures needed",
            isCorrect: true,
            explanation:
              "Correct! With only 4 input values and basic arithmetic, simple variables are all you need.",
          },
          {
            id: "b",
            text: "An array to represent the entire number line",
            isCorrect: false,
            explanation:
              "That would work but is overkill. Creating an array of 100 elements and marking painted positions wastes time and memory for no reason.",
          },
          {
            id: "c",
            text: "A hash map to track painted positions",
            isCorrect: false,
            explanation:
              "Way overcomplicated for this problem. We can compute the answer with basic math — no need for a map.",
          },
          {
            id: "d",
            text: "A priority queue",
            isCorrect: false,
            explanation: "Priority queues are for problems involving ordering/scheduling. Not relevant here.",
          },
        ],
        hint: "How many numbers do you actually need to store? Count them.",
        coachNote:
          "Don't reach for complex data structures when simple variables will do. Overcomplicating is a common Bronze mistake.",
      },
      {
        id: "constraints",
        title: "Analyze Constraints",
        category: "constraints",
        question:
          "The constraints say 0 ≤ A < B ≤ 100 and 0 ≤ C < D ≤ 100. What does this tell you about your approach?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "Values are tiny (≤ 100), so even an O(N²) brute force on the number line works",
            isCorrect: true,
            explanation:
              "Correct! With values up to 100, you could even simulate every position on the number line. But the math formula is cleaner.",
          },
          {
            id: "b",
            text: "We need an O(log N) approach because the values could be large",
            isCorrect: false,
            explanation:
              "The values only go up to 100! This is tiny. O(N) or even O(N²) is fine.",
          },
          {
            id: "c",
            text: "We need to worry about integer overflow",
            isCorrect: false,
            explanation: "Max possible answer is 200 (two non-overlapping segments of length 100). No overflow risk.",
          },
          {
            id: "d",
            text: "The constraints don't matter for this problem",
            isCorrect: false,
            explanation:
              "Constraints ALWAYS matter. They tell you what approaches are feasible and whether edge cases like zero-length segments are possible.",
          },
        ],
        hint: "What's the maximum possible answer? What's the simplest approach that would handle it?",
        coachNote:
          "Always read constraints. They're a gift — they tell you how simple your solution can be. N ≤ 100 means almost anything works.",
      },
      {
        id: "edge-cases",
        title: "Consider Edge Cases",
        category: "edge-cases",
        question: "Which of these are important edge cases to check?",
        type: "multi-choice",
        choices: [
          {
            id: "a",
            text: "Segments don't overlap at all (e.g., [1,3] and [5,8])",
            isCorrect: true,
            explanation: "Yes! If there's no overlap, the answer is simply len1 + len2. Your formula should handle this naturally.",
          },
          {
            id: "b",
            text: "One segment completely contains the other (e.g., [1,8] and [3,5])",
            isCorrect: true,
            explanation:
              "Yes! The overlap equals the entire smaller segment. Make sure your overlap calculation handles this.",
          },
          {
            id: "c",
            text: "Segments overlap partially (e.g., [1,5] and [3,8])",
            isCorrect: true,
            explanation: "Yes! The standard case. Overlap = min(B,D) - max(A,C).",
          },
          {
            id: "d",
            text: "Both segments are at position 0",
            isCorrect: false,
            explanation: "The constraints say A < B and C < D, so segments have positive length. But both could start at 0 — that's covered by the overlap case.",
          },
        ],
        hint: "Draw the number line. Where can two segments be relative to each other?",
        coachNote:
          "There are exactly 3 cases: no overlap, partial overlap, complete containment. Your formula should handle all of them without special-casing.",
      },
      {
        id: "plan",
        title: "Build Your Plan",
        category: "plan",
        question: "What's the correct step-by-step plan?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "1. Read A,B,C,D. 2. Compute overlap = max(0, min(B,D) - max(A,C)). 3. Output (B-A) + (D-C) - overlap.",
            isCorrect: true,
            explanation:
              "This is the clean mathematical approach. The max(0, ...) ensures overlap is 0 when segments don't touch.",
          },
          {
            id: "b",
            text: "1. Create a boolean array of size 101. 2. Mark positions A..B as true. 3. Mark positions C..D as true. 4. Count trues.",
            isCorrect: false,
            explanation:
              "This works but is unnecessarily complex. Why use an array when a one-line formula does the job?",
          },
          {
            id: "c",
            text: "1. Sort all four values. 2. The answer is the difference between the largest and smallest.",
            isCorrect: false,
            explanation:
              "This would give the total span, not the painted length. If segments [1,3] and [7,9] exist, span is 8 but painted is only 4.",
          },
          {
            id: "d",
            text: "1. Check all pairs of endpoints. 2. Use casework for each configuration.",
            isCorrect: false,
            explanation:
              "Casework is error-prone and unnecessary. The overlap formula handles all cases in one expression.",
          },
        ],
        hint: "What single formula computes the overlap of two intervals [A,B] and [C,D]?",
        coachNote:
          "The inclusion-exclusion formula is elegant: total = |set1| + |set2| - |set1 ∩ set2|. This pattern works everywhere — get comfortable with it.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SHELL SHUFFLE — Bronze, Difficulty 2
  // ═══════════════════════════════════════════════════════════
  {
    id: "session-bronze-shell-game",
    problemId: "bronze-shell-game",
    steps: [
      {
        id: "classify",
        title: "Classify the Problem",
        category: "classify",
        question: "What type of problem is this?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "Simulation + complete search — simulate the process for each possible starting position",
            isCorrect: true,
            explanation:
              "Correct! We try all 3 starting positions, simulate all N swaps for each, and count correct guesses.",
          },
          {
            id: "b",
            text: "Greedy — pick the best guess at each step",
            isCorrect: false,
            explanation:
              "We're not making choices — we're trying all possibilities. FJ's guesses are fixed in the input.",
          },
          {
            id: "c",
            text: "Dynamic programming — optimize over subproblems",
            isCorrect: false,
            explanation:
              "There are only 3 possible starting positions. No need for DP when brute force is trivial.",
          },
          {
            id: "d",
            text: "Graph search — find paths between states",
            isCorrect: false,
            explanation:
              "While the cup positions change, this is just a simple simulation, not a graph problem.",
          },
        ],
        hint: "There are only 3 possible starting positions. How hard is it to try all of them?",
        coachNote:
          "When the search space is tiny (here: just 3 options), always try complete search. Don't overthink it.",
      },
      {
        id: "variables",
        title: "Identify Key Variables",
        category: "identify-variables",
        question: "What state do you need to track during the simulation?",
        type: "multi-choice",
        choices: [
          {
            id: "a",
            text: "Which cup the ball is currently under",
            isCorrect: true,
            explanation:
              "Yes! This changes after each swap. If the ball is under cup a or b, it moves to the other.",
          },
          {
            id: "b",
            text: "The number of correct guesses so far",
            isCorrect: true,
            explanation: "Yes! After each swap+guess, check if the ball's cup matches FJ's guess.",
          },
          {
            id: "c",
            text: "The positions of all three cups",
            isCorrect: false,
            explanation:
              "You don't need to track all cups — just where the ball is. The cups are just labels.",
          },
          {
            id: "d",
            text: "A history of all previous swaps",
            isCorrect: false,
            explanation:
              "You process swaps one at a time. No need to store history — just update the ball position.",
          },
        ],
        hint: "You're simulating swaps. What changes after each swap, and what do you check?",
      },
      {
        id: "data-structures",
        title: "Choose Data Structures",
        category: "data-structures",
        question: "What data structures do you need?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "A single integer variable for ball position, and a counter for correct guesses",
            isCorrect: true,
            explanation:
              "Correct! The state is minimal. One variable tracks the ball, one counts guesses.",
          },
          {
            id: "b",
            text: "An array of size 3 mapping cup positions to contents",
            isCorrect: false,
            explanation:
              "Overcomplicating it. You only care about where the ball is, not the state of empty cups.",
          },
          {
            id: "c",
            text: "A stack to track swap history",
            isCorrect: false,
            explanation: "No need to undo or revisit swaps. Process them in order.",
          },
          {
            id: "d",
            text: "A 2D array",
            isCorrect: false,
            explanation: "This is a 1D problem. One ball, one position at a time.",
          },
        ],
        hint: "How many things are actually changing during the simulation?",
      },
      {
        id: "constraints",
        title: "Analyze Constraints",
        category: "constraints",
        question: "N ≤ 100 swaps, and we try 3 starting positions. What's the time complexity?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "O(3 × N) = O(N) — three simulations of N steps each",
            isCorrect: true,
            explanation:
              "Correct! 3 × 100 = 300 operations. This is nearly instant.",
          },
          {
            id: "b",
            text: "O(N²) — nested loops",
            isCorrect: false,
            explanation: "There's no reason for nested loops. Each simulation is a single pass through the swaps.",
          },
          {
            id: "c",
            text: "O(3ᴺ) — exponential",
            isCorrect: false,
            explanation: "We're not branching at each step. We simulate one linear sequence per starting position.",
          },
          {
            id: "d",
            text: "O(N log N) — sorting involved",
            isCorrect: false,
            explanation: "No sorting needed. We process swaps in the given order.",
          },
        ],
        hint: "For each of the 3 starting positions, you do one pass through N swaps. Total work?",
      },
      {
        id: "edge-cases",
        title: "Consider Edge Cases",
        category: "edge-cases",
        question: "Which edge cases should you watch for?",
        type: "multi-choice",
        choices: [
          {
            id: "a",
            text: "The ball isn't involved in any swap (stays in starting position the whole time)",
            isCorrect: true,
            explanation:
              "Yes! If the ball starts at cup 3 but all swaps are between cups 1 and 2, it never moves.",
          },
          {
            id: "b",
            text: "FJ's guess is never correct for any starting position",
            isCorrect: true,
            explanation: "Yes! The answer could be 0 if FJ always guesses wrong.",
          },
          {
            id: "c",
            text: "A cup is swapped with itself",
            isCorrect: false,
            explanation: "The constraints say a ≠ b, so this can't happen.",
          },
          {
            id: "d",
            text: "N = 1 (only one swap)",
            isCorrect: true,
            explanation: "Yes! Always test the minimum case. With 1 swap, the answer is 0 or 1.",
          },
        ],
        hint: "What's the simplest possible input? What if the ball never moves?",
      },
      {
        id: "plan",
        title: "Build Your Plan",
        category: "plan",
        question: "What's the correct step-by-step plan?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "1. Read all swaps+guesses. 2. For each starting position (1,2,3): simulate all swaps, count correct guesses. 3. Output the max count.",
            isCorrect: true,
            explanation:
              "Clean and simple. Three simulations, take the best. Classic complete search.",
          },
          {
            id: "b",
            text: "1. Track all three cups simultaneously in one simulation. 2. At each step, check which cup matches the guess.",
            isCorrect: false,
            explanation:
              "This is actually equivalent but harder to think about. Running 3 separate simulations is clearer and less error-prone.",
          },
          {
            id: "c",
            text: "1. Work backwards from the last guess. 2. Undo swaps to find the starting position.",
            isCorrect: false,
            explanation:
              "Working backwards doesn't help because you need to check guesses at every step, not just the end.",
          },
          {
            id: "d",
            text: "1. Use math to compute the final position without simulation.",
            isCorrect: false,
            explanation:
              "You need to check guesses at EVERY step, not just the final position. Simulation is necessary.",
          },
        ],
        hint: "Keep it simple: how many things do you need to try, and what do you do for each?",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // DAISY CHAINS — Bronze, Difficulty 2
  // ═══════════════════════════════════════════════════════════
  {
    id: "session-bronze-daisy-chains",
    problemId: "bronze-daisy-chains",
    steps: [
      {
        id: "classify",
        title: "Classify the Problem",
        category: "classify",
        question: "What type of problem is this?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "Complete search — check all contiguous subarrays",
            isCorrect: true,
            explanation:
              "Correct! We need to examine every contiguous group and check a property. N ≤ 100 makes this feasible.",
          },
          {
            id: "b",
            text: "Prefix sums — precompute and query",
            isCorrect: false,
            explanation:
              "Prefix sums could speed up the average computation, but with N ≤ 100, brute force is simpler and sufficient.",
          },
          {
            id: "c",
            text: "Greedy — process flowers left to right",
            isCorrect: false,
            explanation: "You can't greedily decide which groups are photogenic. You need to check them all.",
          },
          {
            id: "d",
            text: "Dynamic programming — build up from subproblems",
            isCorrect: false,
            explanation: "There's no optimal substructure here. We're counting, not optimizing.",
          },
        ],
        hint: "How many contiguous groups are there for N ≤ 100? Is that small enough to check them all?",
        coachNote:
          "N ≤ 100 means O(N²) subarrays = 10,000 at most. Easily checked with nested loops. When N is small, brute force is the answer.",
      },
      {
        id: "variables",
        title: "Identify Key Variables",
        category: "identify-variables",
        question: "For each contiguous group, what do you need to compute?",
        type: "multi-choice",
        choices: [
          {
            id: "a",
            text: "The sum of petals in the group",
            isCorrect: true,
            explanation: "Yes! You need the sum to compute the average.",
          },
          {
            id: "b",
            text: "The number of flowers in the group",
            isCorrect: true,
            explanation: "Yes! Average = sum / count. You need both.",
          },
          {
            id: "c",
            text: "Whether any flower in the group has exactly the average number of petals",
            isCorrect: true,
            explanation:
              "Yes! This is the 'photogenic' condition. Check if average equals any element.",
          },
          {
            id: "d",
            text: "The maximum petal count in the group",
            isCorrect: false,
            explanation: "The maximum isn't relevant. We need to check if any element equals the average, not the max.",
          },
        ],
        hint: "What's the definition of 'photogenic'? What numbers do you need to check that?",
      },
      {
        id: "data-structures",
        title: "Choose Data Structures",
        category: "data-structures",
        question: "What data structures do you need?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "An array to store petal counts, and integer variables for sum/count",
            isCorrect: true,
            explanation: "Correct! Store the input array, then compute sum and count for each subarray in your nested loop.",
          },
          {
            id: "b",
            text: "A hash map to look up which petal counts exist in a group",
            isCorrect: false,
            explanation: "With groups of size ≤ 100, just scan through the group to check. A hash map is overkill.",
          },
          {
            id: "c",
            text: "A 2D prefix sum array",
            isCorrect: false,
            explanation: "This is a 1D problem — there's no grid. And the constraint is small enough for brute force.",
          },
          {
            id: "d",
            text: "A priority queue to track averages",
            isCorrect: false,
            explanation: "You compute a fresh average for each group. No ordering or prioritization needed.",
          },
        ],
        hint: "The simplest data structure that stores the input and lets you iterate over groups is...?",
      },
      {
        id: "constraints",
        title: "Analyze Constraints",
        category: "constraints",
        question: "N ≤ 100, petals between 1 and 1000. What approach is feasible?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "O(N³) — for each of O(N²) groups, scan O(N) elements to check the condition",
            isCorrect: true,
            explanation:
              "100³ = 1,000,000. Easily under the ~10⁸ limit. Even the 'slow' approach works fine here.",
          },
          {
            id: "b",
            text: "O(N²) is needed — O(N³) would be too slow",
            isCorrect: false,
            explanation: "100³ = 10⁶ which is tiny. O(N³) is perfectly fine for N ≤ 100.",
          },
          {
            id: "c",
            text: "We need O(N log N) or better",
            isCorrect: false,
            explanation: "Way over-optimizing. With N ≤ 100, even O(N⁴) would pass.",
          },
          {
            id: "d",
            text: "The petal values could cause integer overflow",
            isCorrect: false,
            explanation: "Max sum = 100 × 1000 = 100,000. Fits easily in a 32-bit integer.",
          },
        ],
        hint: "Calculate: how many total operations for the brute force approach?",
        coachNote:
          "A critical Bronze skill: know when brute force is good enough. Calculate N³ before optimizing. If it fits, ship it.",
      },
      {
        id: "edge-cases",
        title: "Consider Edge Cases",
        category: "edge-cases",
        question: "Which edge cases matter here?",
        type: "multi-choice",
        choices: [
          {
            id: "a",
            text: "Single flowers — a group of size 1 is always photogenic (the flower IS the average)",
            isCorrect: true,
            explanation:
              "Yes! Every individual flower has petal count equal to the average of itself. That's N guaranteed photogenic groups.",
          },
          {
            id: "b",
            text: "Average is not an integer — e.g., sum=5, count=2 → average=2.5",
            isCorrect: true,
            explanation:
              "Yes! If sum isn't divisible by count, the average isn't an integer, so no integer petal count can match. You can check sum % count != 0 to skip.",
          },
          {
            id: "c",
            text: "All flowers have the same petal count",
            isCorrect: true,
            explanation: "Yes! Every group is photogenic because the average equals every element. Answer = N×(N+1)/2.",
          },
          {
            id: "d",
            text: "Negative petal counts",
            isCorrect: false,
            explanation: "Constraints say petal counts are between 1 and 1000. Always positive.",
          },
        ],
        hint: "What happens with a single flower? What if the average isn't a whole number?",
      },
      {
        id: "plan",
        title: "Build Your Plan",
        category: "plan",
        question: "What's the correct step-by-step plan?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "1. Read input. 2. For each start i (0 to N-1): for each end j (i to N-1): compute sum, check if sum/count equals any element in [i,j]. 3. Count and output total.",
            isCorrect: true,
            explanation:
              "Clean brute force. Pro tip: check if sum % count == 0 first — if not, skip the inner check entirely.",
          },
          {
            id: "b",
            text: "1. Sort the flowers. 2. Check pairs from the sorted array.",
            isCorrect: false,
            explanation:
              "Sorting destroys the contiguous property! Groups must be contiguous in the original order.",
          },
          {
            id: "c",
            text: "1. Precompute prefix sums. 2. Use formulas to check each subarray in O(1).",
            isCorrect: false,
            explanation:
              "Prefix sums give you the sum in O(1), but you still need to check if any element equals the average. You can't avoid scanning the elements.",
          },
          {
            id: "d",
            text: "1. For each flower, check if it's the average of the full array. 2. Count those flowers.",
            isCorrect: false,
            explanation:
              "The problem asks about ALL contiguous groups, not just the full array. You'd miss most photogenic groups.",
          },
        ],
        hint: "You need to check EVERY contiguous group. What's the most natural way to enumerate them?",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MILK PRODUCTION LOG — Bronze, Difficulty 1
  // ═══════════════════════════════════════════════════════════
  {
    id: "session-bronze-milk-counting",
    problemId: "bronze-milk-counting",
    steps: [
      {
        id: "classify",
        title: "Classify the Problem",
        category: "classify",
        question: "What type of problem is this?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "Sorting — need to find the median, which requires ordering the values",
            isCorrect: true,
            explanation:
              "Correct! Finding the median means sorting and picking the middle. But we need to track the original index, so we sort pairs.",
          },
          {
            id: "b",
            text: "Simulation — follow a process step by step",
            isCorrect: false,
            explanation: "There's no process to simulate. We just need to find one specific cow.",
          },
          {
            id: "c",
            text: "Binary search — search for the median value",
            isCorrect: false,
            explanation: "Binary search finds a target in sorted data. We need to sort first, then just index.",
          },
          {
            id: "d",
            text: "Graph problem",
            isCorrect: false,
            explanation: "No relationships between cows. Just individual values.",
          },
        ],
        hint: "How do you find the median of a list? What's the first step?",
      },
      {
        id: "variables",
        title: "Identify Key Variables",
        category: "identify-variables",
        question: "What do you need to keep track of?",
        type: "multi-choice",
        choices: [
          {
            id: "a",
            text: "Each cow's milk production value",
            isCorrect: true,
            explanation: "Yes! You need the values to sort them.",
          },
          {
            id: "b",
            text: "Each cow's original index (1-based)",
            isCorrect: true,
            explanation: "Yes! After sorting, you need to report which cow was the median — by original position.",
          },
          {
            id: "c",
            text: "The total milk production across all cows",
            isCorrect: false,
            explanation: "The total isn't needed for finding the median. Median is about position, not sum.",
          },
          {
            id: "d",
            text: "The average milk production",
            isCorrect: false,
            explanation: "Median ≠ average. The median is the middle value when sorted.",
          },
        ],
        hint: "After sorting, you need to output the original index. So what must you preserve?",
      },
      {
        id: "data-structures",
        title: "Choose Data Structures",
        category: "data-structures",
        question: "What data structure best stores (value, original index) pairs for sorting?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "An array of [value, index] pairs, sorted by value",
            isCorrect: true,
            explanation:
              "Correct! Store pairs, sort by value, then the middle pair gives you both the median value and its original index.",
          },
          {
            id: "b",
            text: "Two separate arrays — one for values, one for indices",
            isCorrect: false,
            explanation:
              "If you sort the values array, the indices array gets out of sync. You'd need to sort them together.",
          },
          {
            id: "c",
            text: "A hash map from value to index",
            isCorrect: false,
            explanation: "This works only if all values are unique (which they are here), but sorting pairs is more straightforward.",
          },
          {
            id: "d",
            text: "A linked list",
            isCorrect: false,
            explanation: "Linked lists have O(N log N) sort but O(N) random access. An array is simpler and better.",
          },
        ],
        hint: "You need to sort by value but remember the original index. What holds both together?",
      },
      {
        id: "constraints",
        title: "Analyze Constraints",
        category: "constraints",
        question: "N ≤ 1,000 cows. What's the time complexity of sorting?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "O(N log N) — built-in sort on 1,000 elements is instant",
            isCorrect: true,
            explanation: "1,000 × log(1,000) ≈ 10,000 operations. Trivially fast.",
          },
          {
            id: "b",
            text: "We need O(N) — can't afford O(N log N)",
            isCorrect: false,
            explanation: "N = 1,000 makes O(N log N) completely fine. No need to optimize further.",
          },
          {
            id: "c",
            text: "O(N²) bubble sort would be needed",
            isCorrect: false,
            explanation: "Bubble sort works but is slower than needed. Use the built-in sort which is O(N log N).",
          },
          {
            id: "d",
            text: "Sorting isn't feasible for this input size",
            isCorrect: false,
            explanation: "N = 1,000 is tiny! You can sort millions of elements in under a second.",
          },
        ],
        hint: "1,000 elements. How fast is your language's built-in sort?",
      },
      {
        id: "edge-cases",
        title: "Consider Edge Cases",
        category: "edge-cases",
        question: "Which edge cases should you check?",
        type: "multi-choice",
        choices: [
          {
            id: "a",
            text: "N = 1: only one cow, it is the median",
            isCorrect: true,
            explanation: "Yes! With one cow, just output index 1.",
          },
          {
            id: "b",
            text: "N is even: pick the lower of the two middle values",
            isCorrect: true,
            explanation: "Yes! The problem specifies this. Make sure you pick index N/2 - 1 (0-indexed) not N/2.",
          },
          {
            id: "c",
            text: "All cows produce the same amount",
            isCorrect: false,
            explanation: "The problem says values are distinct, so this can't happen.",
          },
          {
            id: "d",
            text: "N = 2: two cows, median is the one with lower production",
            isCorrect: true,
            explanation: "Yes! Per the even-N rule, output the lower of the two middle values.",
          },
        ],
        hint: "What happens when N is even? The problem statement gives you specific instructions.",
      },
      {
        id: "plan",
        title: "Build Your Plan",
        category: "plan",
        question: "What's the correct step-by-step plan?",
        type: "single-choice",
        choices: [
          {
            id: "a",
            text: "1. Read N cows. 2. Store (value, originalIndex) pairs. 3. Sort by value. 4. Output the original index of the element at position floor((N-1)/2).",
            isCorrect: true,
            explanation: "Clean and correct. floor((N-1)/2) gives the lower median for even N.",
          },
          {
            id: "b",
            text: "1. Read N cows. 2. Sort values. 3. Output the middle value (not the index).",
            isCorrect: false,
            explanation: "The problem asks for the original INDEX, not the milk value. You need to track indices.",
          },
          {
            id: "c",
            text: "1. Find the average. 2. Find the cow closest to the average.",
            isCorrect: false,
            explanation: "Median ≠ closest to average. The median is the middle value when sorted.",
          },
          {
            id: "d",
            text: "1. Use quickselect to find the median in O(N) without fully sorting.",
            isCorrect: false,
            explanation: "Correct in theory, but unnecessary complexity for N ≤ 1,000. Just sort.",
          },
        ],
        hint: "Sort, then index. What index gives the median?",
      },
    ],
  },
];

// ─── Helper functions ────────────────────────────────────────

export function getSessionByProblemId(problemId: string): SessionTemplate | undefined {
  return sessions.find((s) => s.problemId === problemId);
}

export function getSessionById(sessionId: string): SessionTemplate | undefined {
  return sessions.find((s) => s.id === sessionId);
}
