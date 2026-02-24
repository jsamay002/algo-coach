import { Problem, SessionTemplate } from "../types";

export const dec23Problems: Problem[] = [
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
        "eaten — amount current cow eats from this candy: max(0, reach - start)"
      ],
      approach: "1. Read N, M, the initial cow heights, and the M candy cane heights.\n2. For each candy cane of height x, initialize `start = 0`.\n3. Process cows in order from 1 to N.\n4. For each cow, compute `reach = min(heights[i], x)` because the cow cannot eat above either her height or the candy's top.\n5. If `reach > start`, then this cow eats `reach - start` units. Add that amount to `heights[i]` (she grows), and update `start = reach`.\n6. If `start == x`, the candy is fully eaten, so stop processing this candy early.\n7. After all candies are processed, output final cow heights line by line.",
      complexity: "O(N × M) time in the straightforward simulation, since each candy cane may scan cows in order once. Space is O(N) for the heights array. The key implementation detail is using 64-bit integers because heights can grow and values are up to 1e9 initially.",
      edgeCases: [
        "A cow eats nothing because `start` (the current base of uneaten candy) is already above her height",
        "The first cow eats the entire candy cane, so later cows should not be processed for that candy",
        "Multiple cows have the same height; only the first one that reaches a new level may eat",
        "A candy cane of height 1 gets consumed immediately if the first cow has height >= 1",
        "Large values (1e9 heights) require 64-bit integers after repeated growth"
      ],
      whyThisWorks: "At any moment, the uneaten part of a candy cane is a single vertical interval `[start, x]` because cows only remove from the bottom upward and the candy is never lowered. For each cow, the highest point she can possibly eat is `min(heights[i], x)`. If this is at most `start`, she cannot reach any uneaten candy. Otherwise, she eats exactly the contiguous portion `[start, min(heights[i], x)]`, whose length is `min(heights[i], x) - start`. Updating `start` to that new top preserves the invariant that `[start, x]` is the remaining candy. Since the process order is fixed by the statement, simulating this update rule exactly matches the real process."
    },
    commonMistakes: [
      "Forgetting that cow heights increase immediately after they eat from the current candy cane",
      "Tracking only total candy remaining instead of the current eaten base height (`start`), which loses the geometry of who can still reach",
      "Using 32-bit integers (`int`) and overflowing after repeated growth",
      "Letting a cow eat from height 0 every time instead of from the current `start` boundary",
      "Not stopping early when the candy is fully consumed (`start == x`)"
    ],
    sessionId: "session-bronze-dec23-1",
    hasSession: true
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
        "initialCount — total number of initially infected cows needed after choosing maxWindow"
      ],
      approach: "1. Parse the bitstring and collect lengths of all contiguous blocks of 1s.\n2. If there are no 1s, answer is 0 (no cow ever had to be infected).\n3. Compute the maximum feasible odd window size maxWindow using block constraints:\n   - For a middle block of length L, one source can only create an odd-length centered block, so the largest valid window is L if L is odd, or L-1 if L is even.\n   - For an end block of length L, a source can sit at the edge and grow inward, so the largest valid window can be as large as 2L-1.\n   - Take the minimum allowed window across all blocks.\n4. This minimum maxWindow corresponds to the largest feasible D, which minimizes the number of sources.\n5. For each infected block of length L, count how many windows of size maxWindow are needed to cover it: ceil(L / maxWindow).\n6. Sum over all infected blocks and output the total.",
      complexity: "O(N) time and O(number of segments) space. We scan the string once to build segments, then scan segments once more to compute maxWindow and the final count. This is required for N ≤ 3·10^5.",
      edgeCases: [
        "No infected cows at all (bitstring is all 0s) → answer 0",
        "All cows infected (single segment touching both ends) → one source may be enough if enough nights passed",
        "A middle infected segment with even length (e.g., 1111) cannot come from one centered source for any integer D",
        "Length-1 infected segments (window size must remain at least 1)",
        "Multiple segments where one short segment forces a small maxWindow and increases source count in larger segments"
      ],
      whyThisWorks: "After D nights, each initial infected cow affects exactly the cows within distance D, which is a contiguous window of odd length 2D+1. Therefore every final 1-block must be coverable by these windows without crossing any 0s. The largest feasible D (equivalently largest feasible window) minimizes the number of windows needed because larger windows can only weakly decrease the count ceil(L / window). The block constraints are tight: middle blocks must be representable by overlapping odd windows entirely inside the block, and end blocks allow larger effective windows because growth can extend off only one side in the observed block. Once maxWindow is fixed, summing ceil(L / maxWindow) over blocks is both necessary and sufficient."
    },
    commonMistakes: [
      "Assuming the shortest 1-block length always determines the window size (fails on end blocks and even-length middle blocks)",
      "Forgetting that the infection window size must be odd (2D+1)",
      "Treating end segments the same as middle segments",
      "Using floor(L / window) instead of ceil(L / window) when counting sources per segment",
      "Trying to simulate night-by-night spread instead of reasoning from the final segments"
    ],
    sessionId: "session-bronze-dec23-2",
    hasSession: true
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
        "deltaH, deltaA — differences used to derive inequality bounds for adjacent pairs"
      ],
      approach: "1. For each test case, bundle each plant's initial height h_i, growth rate a_i, and target taller-count t_i.\n2. Convert the target to an ordering: if a plant should have t_i taller plants, then its final rank is t_i (0 means tallest). Sort by t_i ascending, so sorted plants must have strictly decreasing final heights.\n3. For each adjacent pair (prev, cur) in sorted order, require:\n   prev.h + d*prev.a > cur.h + d*cur.a.\n4. Rearrange into a linear inequality in d and derive a bound:\n   - If prev.a == cur.a, then the inequality is either always true (if prev.h > cur.h) or impossible.\n   - If prev.a > cur.a, this gives an upper bound on d.\n   - If prev.a < cur.a, this gives a lower bound on d.\n   Use careful integer division (strict inequalities matter).\n5. Intersect all bounds across adjacent pairs. If the feasible interval is empty, output -1.\n6. Otherwise output the smallest integer d in the interval (the minimal number of days).",
      complexity: "O(N log N) per test case due to sorting, then O(N) to build the feasible interval from adjacent pairs. This fits the total N ≤ 2·10^5 across all test cases.",
      edgeCases: [
        "N = 1 → answer is always 0",
        "Two plants with equal growth rates and equal heights but requiring strict order → impossible",
        "Strict inequality boundary where d must be > value, so floor division must be adjusted by +1",
        "Upper-bound case where d < value, requiring ceiling-style handling for strictness",
        "Already valid at day 0 even though some future days break the order (must return 0, not a later day)"
      ],
      whyThisWorks: "The target values t_i form a total order of desired heights because they are a permutation of 0..N-1. After sorting by t_i, the requirement is exactly a chain of strict inequalities between consecutive plants in that order. A total strict order is guaranteed if all adjacent inequalities hold. Each adjacent inequality is linear in d, so it defines a half-line (or is impossible/always true). The set of valid days is the intersection of these half-lines, which is an integer interval. The minimum valid day is therefore the smallest integer in that interval, and if the interval is empty the answer is impossible."
    },
    commonMistakes: [
      "Sorting by current height or growth rate instead of by target rank t_i",
      "Checking all O(N^2) pairs when adjacent pairs in sorted target order are sufficient",
      "Using non-strict inequalities (>=) even though the problem requires strict taller-than",
      "Getting integer division wrong when converting strict inequalities into bounds",
      "Not using 64-bit integers for h_i + d*a_i"
    ],
    sessionId: "session-bronze-dec23-3",
    hasSession: true
  }
];

export const dec23Sessions: SessionTemplate[] = [
  {
    id: "session-bronze-dec23-1",
    problemId: "usaco-bronze-dec23-1",
    steps: [
      {
        id: "step-1-classify",
        title: "Classify the Problem",
        category: "classify",
        stepNumber: 1,
        question: "In Candy Cane Feast, cows interact with each candy cane in a fixed order, and cow heights change as the process runs. What is the best classification for the core task?",
        type: "single-choice",
        choices: [
          { id: "a", text: "Greedy-thinking — choose the best cow to eat each candy first", isCorrect: false, explanation: "This assumes we are choosing an order to optimize something, but the order is fixed by the input. If you force a greedy interpretation, you invent a choice that the problem never gives you. When no decisions are made and the process is prescribed, think simulation first." },
          { id: "b", text: "Simulation — follow the described process and track changing state", isCorrect: true, explanation: "This assumes the problem is asking us to reproduce a fixed sequence of events, which is exactly what the statement describes. The consequence is we focus on state updates (cow heights and candy progress) rather than optimization. Reusable lesson: fixed order + cumulative updates usually means simulation." },
          { id: "c", text: "Complete-search — try all possible ways cows could eat the candy canes", isCorrect: false, explanation: "This assumes there are multiple possible behaviors to enumerate, but the process is deterministic. Trying to brute-force 'possibilities' adds fake complexity and solves the wrong problem. Only use complete search when the problem actually gives choices or configurations." },
          { id: "d", text: "Graph-basics — model cows and candy canes as nodes and traverse edges", isCorrect: false, explanation: "This assumes there is a network structure (nodes and explicit relationships), but interactions happen in a simple linear order. Turning this into a graph obscures the real invariant you need to track. Use graph models only when connectivity or traversal is the true structure." }
        ],
        followUp: { question: "What structural property most strongly proves this is simulation and not an optimization problem?", choices: [
          { id: "a", text: "The input sizes are large, so simulation is the intended method", isCorrect: false, explanation: "This assumes complexity limits determine the problem type, but constraints only affect feasibility, not classification. Large constraints can still appear in greedy, graphs, DP, or simulation. The stronger signal is whether the process is fixed or choice-driven." },
          { id: "b", text: "The problem uses farm/cow story wording, which usually means simulation", isCorrect: false, explanation: "This assumes theme determines algorithm type, but USACO themes are decorative. If you classify by story context, you'll misclassify many problems. Always classify by structure: order of events, choices, and state changes." },
          { id: "c", text: "Each candy and cow interaction happens in a prescribed order, and the only job is updating state correctly", isCorrect: true, explanation: "This assumes the key signal is deterministic event sequencing, and that is exactly right. The consequence is we design precise state variables instead of searching for an optimal strategy. General rule: deterministic process + state mutation = simulation." },
          { id: "d", text: "The answer is not a single number, so it cannot be greedy or counting", isCorrect: false, explanation: "This assumes output format determines the paradigm, but many non-simulation problems also output arrays or strings. Output shape is a weak clue. Structural process and state transitions are the decisive clues." }
        ]},
        hints: ["Ask yourself: are we making choices, or just following a process?", "Look for phrases like 'in order' and what changes after each interaction.", "If the sequence is fixed and values mutate as you go, the pattern is usually simulation."],
        coachNote: "SIMULATION PATTERN: If the statement gives a step-by-step process in a fixed order and asks for the final state, your first move is to define state variables and update rules. Don't over-search for a fancy algorithm before you can simulate one step correctly. The common trap is inventing optimization choices that do not exist."
      },
      {
        id: "step-2-identify-variables", title: "Identify Key Variables", category: "identify-variables", stepNumber: 2,
        question: "For one candy cane of height x, which state is the most important to track while cows process it in order?",
        type: "single-choice",
        choices: [
          { id: "a", text: "Only total candy remaining, because the exact eaten portion does not matter", isCorrect: false, explanation: "This assumes length alone is enough, but cows can only eat if they can reach the current *base* of the remaining candy. If you drop position information, you can't tell whether a short cow can eat. Lesson: when geometry/position affects access, track boundaries, not just totals." },
          { id: "b", text: "For each cow, a boolean of whether she already ate in this round", isCorrect: false, explanation: "This assumes the main issue is repeated turns, but each cow gets exactly one turn per candy by definition. A boolean doesn't capture how much candy remains or where it starts. Track variables that determine future behavior, not bookkeeping that is already implied by loop order." },
          { id: "c", text: "The current lowest uneaten height of the candy, plus the cows' current heights", isCorrect: true, explanation: "This assumes the candy's state can be summarized by a boundary (`start`) and the cows' mutable heights, which is exactly the right compression. The consequence is each cow's contribution becomes a simple interval-length update. Reusable principle: find the minimal state that fully determines the next step." },
          { id: "d", text: "A queue of candy segments for every bite taken so far", isCorrect: false, explanation: "This assumes the candy becomes fragmented, but it never does — cows always eat from the bottom upward. Storing every segment overcomplicates a single-boundary process. When the remaining shape has a simple invariant, store the invariant, not the history." }
        ],
        followUp: { question: "Why is tracking the 'current lowest uneaten height' sufficient for the candy cane state?", choices: [
          { id: "a", text: "Because every cow either eats the entire candy or nothing at all", isCorrect: false, explanation: "This assumes all interactions are all-or-nothing, which is false; many cows eat partial amounts. If you rely on that assumption, your updates fail on mixed cases. The real reason is the remaining candy stays a single interval." },
          { id: "b", text: "Because the uneaten candy always remains one contiguous interval from some height up to x", isCorrect: true, explanation: "This assumes a key invariant about the candy's shape, and it is correct. The consequence is one boundary (`start`) plus the fixed top (`x`) fully describes what remains. General lesson: if a process preserves a simple invariant, exploit it to reduce state." },
          { id: "c", text: "Because cow heights never change during a candy cane", isCorrect: false, explanation: "This assumes heights are static within a round, but cows grow when they eat, and that can affect later candy canes. Even if a specific round were easier, that's not why the candy state is compressible. Separate the candy invariant from the cow update rules." },
          { id: "d", text: "Because the candy cane top x changes after each cow eats", isCorrect: false, explanation: "This assumes the top moves, but the statement says the candy is not lowered. The top stays at x; the bottom boundary rises. Lesson: read which boundary changes — many simulation bugs come from updating the wrong side." }
        ]},
        hints: ["Think about the *shape* of the remaining candy after a cow eats.", "Does the remaining candy split into multiple pieces, or stay one interval?", "If the candy is always '[some height, x]', then one boundary number describes it."],
        coachNote: "STATE DESIGN PRINCIPLE: Track the smallest set of variables that fully determines the next transition. In simulation problems, a good state often comes from an invariant ('the remaining object is always a single interval'). The trap is storing too much history instead of the current state."
      },
      {
        id: "step-3-data-structures", title: "Choose Data Structures", category: "data-structures", stepNumber: 3,
        question: "Which data structure setup is most appropriate for a clean Bronze-level implementation of this problem?",
        type: "single-choice",
        choices: [
          { id: "a", text: "A vector/array of 64-bit cow heights, and scalar variables for each candy (`x`, `start`)", isCorrect: true, explanation: "This assumes the process can be handled with sequential scans and a compact per-candy state, which matches the problem structure. The consequence is a straightforward O(N×M) simulation with low memory overhead. General lesson: when access is sequential and indexing is simple, arrays beat more complex structures." },
          { id: "b", text: "A hash map from cow index to current height, because updates are dynamic", isCorrect: false, explanation: "This assumes dynamic updates imply a map, but cow indices are contiguous and known in advance. A hash map adds overhead and complexity without helping the access pattern. Use maps when keys are sparse or unknown, not for 0..N-1 indices." },
          { id: "c", text: "A priority queue of cows by height so the tallest cow eats first", isCorrect: false, explanation: "This assumes we are allowed to reorder cows to optimize consumption, but the order is fixed. A priority queue changes the semantics of the problem and solves a different process. Data structure choice must respect the statement's required order." },
          { id: "d", text: "A segment tree over candy heights to support range updates", isCorrect: false, explanation: "This assumes there are enough complex range queries/updates to justify heavy machinery, but there is only one candy active at a time and one running boundary. Segment trees are useful when repeated range operations are the bottleneck; here they are unnecessary overengineering." }
        ],
        followUp: { question: "Why is a plain array especially strong here instead of a map or heap?", choices: [
          { id: "a", text: "Because arrays make the algorithm asymptotically faster than O(N×M)", isCorrect: false, explanation: "This assumes the choice changes the asymptotic complexity, but all these versions still process many interactions. The real benefit is matching the natural contiguous indexing and fixed order. Don't confuse constant-factor clarity with asymptotic improvement." },
          { id: "b", text: "Because cows are processed in fixed index order and we repeatedly update heights by index", isCorrect: true, explanation: "This assumes the access pattern is the main driver of data structure choice, and that is correct. The consequence is arrays give direct O(1) indexed updates with minimal overhead. Reusable lesson: choose structures that match the required traversal order." },
          { id: "c", text: "Because hash maps cannot store 64-bit values safely", isCorrect: false, explanation: "This assumes a data type limitation that doesn't exist; maps can store 64-bit values. The issue is not capability but mismatch to the problem's structure. Pick the simplest structure that fits the index pattern." },
          { id: "d", text: "Because the official input format guarantees cows are already sorted by height", isCorrect: false, explanation: "This assumes an input property the statement does not give. The cows are in input order, not sorted by height. Never rely on unstated ordering assumptions in implementation decisions." }
        ]},
        hints: ["How do you access cows: by arbitrary key, or by position in a fixed order?", "Do you need to reorder cows or answer range queries, or just scan and update?", "If the access pattern is 'for i = 1..N', a simple height array is usually ideal."],
        coachNote: "DATA STRUCTURE FIT: Start from the access pattern, not from what feels advanced. If you scan in order and update by index, arrays are usually the right tool. The trap is using maps/heaps/trees just because the values are 'dynamic' — dynamic values do not automatically require dynamic data structures."
      },
      {
        id: "step-4-constraints", title: "Analyze Constraints", category: "constraints", stepNumber: 4,
        question: "The statement allows N, M up to 2×10^5 and heights up to 10^9. What is the most important immediate constraint takeaway for a Bronze implementation?",
        type: "single-choice",
        choices: [
          { id: "a", text: "You must use 64-bit integers for heights/growth, even before discussing runtime", isCorrect: true, explanation: "This assumes value magnitude can cause overflow independently of runtime, which is exactly right. The consequence is using `long long`/64-bit types for cow heights and intermediate calculations. Reusable lesson: always separate 'time complexity constraints' from 'numeric range constraints.'" },
          { id: "b", text: "You must use dynamic programming because 2×10^5 is too large for loops", isCorrect: false, explanation: "This assumes large inputs automatically imply DP, which is a common premature-optimization mistake. DP is for subproblem structure, not just big N. First identify the process type, then see if optimization is needed." },
          { id: "c", text: "You must sort cows by height to avoid TLE", isCorrect: false, explanation: "This assumes reordering is allowed and helpful, but the process requires original order. Sorting would change the answer. Never break problem semantics to chase speed." },
          { id: "d", text: "You can use 32-bit ints because each candy height is at most 10^9", isCorrect: false, explanation: "This assumes bounds on individual inputs also bound accumulated values, which is false here because cows grow repeatedly. The consequence is silent overflow on some tests. Lesson: check how values evolve over time, not just the raw input ranges." }
        ],
        followUp: { question: "Why can overflow happen even if every input height is at most 10^9?", choices: [
          { id: "a", text: "Because cows can gain height across multiple candy canes, so stored heights can exceed the original input range", isCorrect: true, explanation: "This assumes state values may accumulate beyond the input bounds, and that is exactly what happens. The consequence is 32-bit storage can fail even when inputs look 'safe.' General rule: in simulations, track the maximum possible evolved state, not just initial values." },
          { id: "b", text: "Because reading N and M as integers causes parsing overflow", isCorrect: false, explanation: "This assumes the issue is parsing the dimensions, but N and M fit comfortably in 32-bit. The actual risk is the evolving cow heights. Identify which variables accumulate before deciding types." },
          { id: "c", text: "Because subtraction `reach - start` is always negative and wraps", isCorrect: false, explanation: "This assumes negative wraparound is the main problem, but we guard with `max(0, ...)` logic conceptually. Overflow risk comes from repeated additions to cow heights. Don't focus on one expression if the true hazard is cumulative growth." },
          { id: "d", text: "Because the candy cane top x is doubled every round", isCorrect: false, explanation: "This assumes the candy size grows, but the candy heights are fixed input values. It's the cows that grow. Careful variable-role tracking prevents this kind of simulation confusion." }
        ]},
        hints: ["There are two kinds of constraints here: runtime and numeric range. Which one is immediately dangerous?", "Even if each input is ≤ 1e9, ask what happens after repeated updates.", "A cow can grow many times, so store heights in 64-bit (`long long`)."],
        coachNote: "CONSTRAINTS CHECKLIST: Always do two passes — (1) runtime feasibility, (2) numeric safety. Many Bronze bugs are not algorithmic at all; they're overflow bugs from cumulative updates. If state evolves across many steps, estimate the evolved bounds, not just the input bounds."
      },
      {
        id: "step-5-edge-cases", title: "Test Edge Cases", category: "edge-cases", stepNumber: 5,
        question: "Which edge case most directly catches the mistake 'tracking only total candy remaining' instead of the current eaten base height?",
        type: "single-choice",
        choices: [
          { id: "a", text: "A candy is fully eaten by the first cow", isCorrect: false, explanation: "This assumes full-consumption cases expose the boundary bug, but if a candy disappears immediately, total remaining and boundary tracking can accidentally agree. It won't reliably reveal the flaw. Good edge cases isolate the exact logic you're testing." },
          { id: "b", text: "A short cow comes after a taller cow and cannot reach the remaining candy because the base has moved up", isCorrect: true, explanation: "This assumes the key bug appears when reachability depends on the candy's current base position, which is exactly right. The consequence is total-remaining logic may wrongly let the short cow eat because it ignores where the remaining candy starts. General lesson: edge cases should target the hidden state your buggy model forgot." },
          { id: "c", text: "All cows have the same height and all candies have the same height", isCorrect: false, explanation: "This assumes symmetry is enough to expose the issue, but uniform cases often hide bugs because many incorrect models produce the same output. Symmetric tests are useful, but not for validating boundary-sensitive logic." },
          { id: "d", text: "N = 1 and M = 1", isCorrect: false, explanation: "This assumes minimal size tests catch all bugs, but simple tests usually miss state-transition mistakes. A one-cow one-candy case has no later cow to test reachability after the base rises. Use minimal tests for parsing and indexing, not deep logic validation." }
        ],
        followUp: { question: "What misconception is revealed if someone lets a later short cow eat just because 'there is candy left'?", choices: [
          { id: "a", text: "They are treating the remaining candy as a quantity only, not as an interval with a raised base", isCorrect: true, explanation: "This assumes the bug is a state representation error, and that is correct. The consequence is they ignore reachability, which depends on the remaining candy's position, not only its length. Reusable lesson: when access depends on location, quantity-only models are incomplete." },
          { id: "b", text: "They forgot to process cows in the given input order", isCorrect: false, explanation: "This assumes the bug is ordering, but the ordering may still be correct. The actual issue is the representation of the candy state. Distinguish control-flow bugs (wrong order) from state-model bugs (wrong variables)." },
          { id: "c", text: "They used 32-bit integers for the cow heights", isCorrect: false, explanation: "This assumes a numeric-type bug, but this edge case is about reachability logic, not overflow. Overflow can break answers too, but it won't explain this specific behavior. Match the diagnosis to the symptom." },
          { id: "d", text: "They forgot to reset the cows after each candy cane", isCorrect: false, explanation: "This assumes cows should reset, but cows actually keep their grown heights across candies. That's a different misconception entirely. In debugging, identify which part of the simulation state is wrong before patching logic." }
        ]},
        hints: ["Find a case where the candy still exists, but a cow still should eat nothing.", "What causes a cow to eat nothing even when total remaining length is positive?", "Use a taller cow first to raise the candy's base, then a shorter cow after."],
        coachNote: "EDGE-CASE TESTING: Don't just test extremes ('smallest input' / 'largest input'). Test cases that target specific misconceptions: wrong state representation, wrong boundary updates, wrong order, or overflow. The best edge case is one that makes the wrong model produce a clearly wrong answer."
      },
      {
        id: "step-6-plan", title: "Plan the Approach", category: "plan", stepNumber: 6,
        question: "Which algorithm plan correctly matches the simulation and the key invariant for Candy Cane Feast?",
        type: "single-choice",
        choices: [
          { id: "a", text: "For each candy x: scan cows in order, track `start`, compute `reach=min(height[i],x)`, add `max(0, reach-start)` to the cow, then set `start=max(start,reach)`", isCorrect: true, explanation: "This assumes the remaining candy is represented by a moving lower boundary and updates cows immediately when they eat, which matches the process exactly. The consequence is each interaction is a local, correct state transition. Lesson: once your invariant is right, the implementation becomes a direct translation." },
          { id: "b", text: "For each candy x: sort cows by height, let the tallest eat first, and distribute leftover candy greedily to smaller cows", isCorrect: false, explanation: "This assumes reordering is allowed and helps, but the statement fixes the order. The consequence is a logically invalid simulation even if the math looks reasonable. Never optimize by violating the problem's process constraints." },
          { id: "c", text: "For each cow: sum all candy heights she can reach using her initial height, then apply all growth at the end", isCorrect: false, explanation: "This assumes cow heights stay fixed while evaluating all candies, but growth changes future interactions. Delaying updates breaks the sequential dependency. In simulation, update state at the exact time the event occurs." },
          { id: "d", text: "Use prefix sums over candy heights so each cow can compute her final growth in O(1)", isCorrect: false, explanation: "This assumes the effects of different candies combine independently, but they do not because cow heights evolve and candy reachability depends on prior events. Prefix sums only work when contributions are independent and additive. Here the process is stateful, not static." }
        ],
        followUp: { question: "Why must the cow's height be updated immediately when she eats (rather than batched later)?", choices: [
          { id: "a", text: "Because her updated height may affect how much she can eat from the same candy later in the loop", isCorrect: false, explanation: "This assumes cows get multiple turns on the same candy, but each cow gets exactly one turn. Immediate updates are still necessary, but for future candies, not the same one. Be precise about *when* the updated state matters." },
          { id: "b", text: "Because the problem's process is sequential across candies, and each cow's growth changes her reach on later candies", isCorrect: true, explanation: "This assumes future behavior depends on current updates, which is the core dependency in the simulation. The consequence is batching updates incorrectly changes later interactions. General lesson: if later events depend on earlier state changes, apply updates at the moment they occur." },
          { id: "c", text: "Because updating immediately reduces the time complexity from O(N×M) to O(N+M)", isCorrect: false, explanation: "This assumes an asymptotic improvement that does not happen. Immediate updates are for correctness, not speed. Separate correctness constraints from performance claims." },
          { id: "d", text: "Because the candy cane top x must increase when a cow grows", isCorrect: false, explanation: "This assumes the candy changes when the cow grows, but only the cow's height changes. Mixing state variables from different entities is a common simulation bug. Track which object each variable belongs to." }
        ]},
        hints: ["Translate the invariant into update formulas: what is the remaining candy state after each cow?", "The amount eaten is the overlap between what remains (`start..x`) and what the cow can reach.", "Use `reach=min(height[i], x)` and `eaten=max(0, reach-start)` while scanning cows in order."],
        coachNote: "PLANNING THE IMPLEMENTATION: Once you know the state and invariant, write the update rule for one event (one cow on one candy) and then wrap it in loops that match the statement's order. The common trap is trying to 'batch' updates that are actually sequentially dependent."
      }
    ]
  },
  {
    id: "session-bronze-dec23-2",
    problemId: "usaco-bronze-dec23-2",
    steps: [
      { id: "step-1-classify", title: "Classify the Problem", category: "classify", stepNumber: 1, question: "You are given only the final infection bitstring after some unknown number of nights. What is the best way to classify this problem?", type: "single-choice",
        choices: [
          { id: "a", text: "Simulation, because infection spreads one night at a time so we should replay every night", isCorrect: false, explanation: "This assumes we know the timeline and should reconstruct it directly. But the number of nights is unknown, so night-by-night replay branches too much. When the final state is fixed and you're inferring hidden parameters, reframe it as constraints on structure (here, blocks of 1s), not a raw simulation." },
          { id: "b", text: "Graph traversal, because cows are connected to neighbors in a line", isCorrect: false, explanation: "This assumes the adjacency relation itself is the challenge. The line graph is trivial and doesn't require BFS/DFS; the hard part is inferring how many initial sources and nights could produce the final pattern. Simple adjacency can appear in many problems without making them graph traversal problems." },
          { id: "c", text: "Math-logic / ad-hoc counting, because we infer hidden windows from final contiguous 1-blocks", isCorrect: true, explanation: "Correct. Each initial infected cow expands into a radius-D interval, so the final pattern becomes a constraint problem on contiguous infected segments. The solution is about deriving the largest feasible window and counting how many are needed, not simulating time." },
          { id: "d", text: "Dynamic programming, because each prefix of cows depends on the previous prefix", isCorrect: false, explanation: "This assumes we need optimal substructure over prefixes. But there is no prefix state transition to optimize; the answer comes from independent properties of each contiguous 1-block once the maximum feasible window is known. Don't force DP just because the input is a string." }
        ],
        followUp: { question: "What structural observation most strongly justifies the math-logic classification here?", choices: [
          { id: "a", text: "The exact infection order matters, so we must track which cow infected which", isCorrect: false, explanation: "This assumes the identity of the infector affects the final answer. It doesn't—only the final infected ranges matter. When multiple histories lead to the same final state, look for an invariant summary (here, contiguous 1-segments)." },
          { id: "b", text: "Each initial infected cow becomes a fixed-size odd window after D nights, turning the problem into segment coverage", isCorrect: true, explanation: "Exactly. Once you see 'radius D spread' as an odd-length window, the hidden process collapses into a covering/counting problem on 1-block lengths. That's the key reframe." },
          { id: "c", text: "Because N is large, all simulation problems become math problems", isCorrect: false, explanation: "This assumes input size alone determines classification. Large N affects feasibility, not the core structure. Some large-N problems are still simulations; this one is math-logic because the final-state constraints are easier than replaying the process." },
          { id: "d", text: "The bitstring can be split into prefixes and suffixes solved independently with DP", isCorrect: false, explanation: "This assumes prefix decomposition is the natural structure. The real decomposition is by contiguous 1-blocks, not arbitrary prefixes/suffixes. Use problem-induced segments, not generic string DP patterns." }
        ]},
        hints: ["Don't focus on 'infection' as a theme. Focus on what is known (the final bitstring) and what is unknown (days, initial cows).", "Ask what one initially infected cow looks like after D nights. What shape does it create on a line?", "If one source creates an odd-length interval, then the final answer depends on how those intervals cover contiguous 1-blocks."],
        coachNote: "INFERENCE-FROM-FINAL-STATE PATTERN: When a process runs for an unknown number of steps and only the final state is given, don't default to simulation. First ask whether each source/event has a simple 'footprint' after k steps (interval, radius, count, etc.). If yes, solve by constraints on footprints instead of replaying history."
      },
      { id: "step-2-identify-variables", title: "Identify Key Variables", category: "identify-variables", stepNumber: 2, question: "Which set of variables captures the right state for solving Cowntact Tracing 2 efficiently?", type: "single-choice",
        choices: [
          { id: "a", text: "For each cow: the exact night it got infected and which neighbor infected it", isCorrect: false, explanation: "This assumes we need to reconstruct one precise infection history. But many histories are possible, and tracking infection times is unnecessary. The minimum source count depends only on segment lengths and the maximum feasible window size." },
          { id: "b", text: "The lengths of contiguous 1-blocks, which blocks touch the ends, and a derived feasible window size", isCorrect: true, explanation: "Correct. Segment lengths determine all constraints, end-touching blocks are special, and the derived odd window size (2D+1) is the central hidden parameter. This is exactly the right abstraction." },
          { id: "c", text: "A prefix sum of infected cows and a suffix sum of infected cows", isCorrect: false, explanation: "This assumes counts alone determine feasibility. But two strings with the same prefix/suffix sums can have very different segment structures (e.g., one long block vs many short blocks), which changes the answer. Structure matters more than totals." },
          { id: "d", text: "Only the shortest infected segment length, since it always determines the answer", isCorrect: false, explanation: "This assumes a single statistic is enough. It fails because end segments and even-length middle segments obey different constraints. A short end segment may allow a larger window than a short middle segment." }
        ],
        followUp: { question: "Why do we need to know whether a 1-block touches the left or right edge of the string?", choices: [
          { id: "a", text: "End blocks can be produced by a source centered outside the array, changing the parity rule", isCorrect: false, explanation: "This assumes infection sources can exist outside the cow line. They cannot; sources are cows. The key difference is not outside sources, but that a source at the boundary only needs to spread inward to match the observed block." },
          { id: "b", text: "End blocks permit larger feasible windows because a source can sit at the boundary and spread inward only", isCorrect: true, explanation: "Exactly. A middle block is constrained on both sides, but an end block can arise from a source on the edge, allowing a larger maximum window (up to 2L-1 for block length L)." },
          { id: "c", text: "Edge blocks are counted twice unless we track them separately", isCorrect: false, explanation: "This assumes a bookkeeping issue is the main reason. The real reason is a mathematical constraint difference on feasible window size, not double-counting." },
          { id: "d", text: "Because the first and last cows infect faster than middle cows", isCorrect: false, explanation: "This assumes infection speed changes by position. It doesn't—spread rate is uniform. The difference is geometric: edge cows have only one side to expand into." }
        ]},
        hints: ["Try compressing the bitstring. What information is preserved if you replace each run of 1s by its length?", "One source after D nights covers an interval. Which property of a 1-run determines how many intervals are needed?", "You need: run lengths, whether a run is an end run, and the common interval length you're allowed to use."],
        coachNote: "STATE COMPRESSION PATTERN: Good variables preserve exactly what affects the answer and discard the rest. For strings, contiguous runs are often the right compression when behavior depends on local adjacency. If your variables try to reconstruct hidden history, you're usually tracking too much."
      },
      { id: "step-3-data-structures", title: "Choose Data Structures", category: "data-structures", stepNumber: 3, question: "What data structure setup is most appropriate for an O(N) solution?", type: "single-choice",
        choices: [
          { id: "a", text: "A queue for BFS over cows, because infection spreads layer by layer", isCorrect: false, explanation: "This assumes we are simulating a known spread process. BFS computes distances from known sources, but our sources are unknown and we are minimizing how many there were. A queue solves the wrong problem." },
          { id: "b", text: "A vector/list of infected segment lengths plus a few scalar trackers for end/middle constraints", isCorrect: true, explanation: "Correct. A list of contiguous 1-block lengths is enough. Then scalar minima (like the tightest allowed window constraint) let you compute the global feasible window and the final count in linear time." },
          { id: "c", text: "A disjoint-set union (DSU) of infected cows to merge neighboring 1s", isCorrect: false, explanation: "This assumes we need dynamic connectivity. But the string is static and runs can be found in one pass without DSU overhead. DSU is useful when connections change, not for a single scan of fixed neighbors." },
          { id: "d", text: "A hash map from index to infection time so we can memoize repeated states", isCorrect: false, explanation: "This assumes the problem has repeated recursive subproblems or state transitions. It doesn't. There is no repeated-state search here—just direct analysis of one final bitstring." }
        ],
        followUp: { question: "Why is storing only segment lengths (not all segment indices) enough for the final source count once the window is known?", choices: [
          { id: "a", text: "Because the count for each segment depends only on its length and whether it is infected", isCorrect: false, explanation: "This is partially true but incomplete: all stored segments are infected by definition, and end-vs-middle mattered earlier for choosing the window. After the window is fixed, the per-segment count depends only on length." },
          { id: "b", text: "Because after determining the common window size, each segment contributes ceil(length / window) independently", isCorrect: true, explanation: "Exactly. Segment positions are no longer needed once feasibility determined the global window. The count is additive across segments and depends only on each segment length." },
          { id: "c", text: "Because overlapping windows force all segments to be merged conceptually into one", isCorrect: false, explanation: "This assumes windows can cross 0s. They cannot, since 0s are uninfected in the final state. Segments remain independent because windows must stay within each contiguous 1-block." },
          { id: "d", text: "Because the answer is simply the number of segments", isCorrect: false, explanation: "This assumes each segment needs exactly one source. Long segments may require multiple windows/sources if the feasible window size is small. Segment count is only a lower bound." }
        ]},
        hints: ["This is a static string scan. Prefer a one-pass structure over dynamic graph machinery.", "Think 'run-length encoding': what if you only keep lengths of consecutive 1s?", "You can solve the whole problem with a vector of run lengths and a few integers tracking the tightest valid window."],
        coachNote: "MINIMAL DATA STRUCTURE RULE: Pick the simplest structure that supports the needed operations. If the algorithm is 'scan runs, compute minima, sum ceilings,' a vector and a few integers beat DSU/BFS/maps every time. Fancy data structures often signal a wrong model."
      },
      { id: "step-4-constraints", title: "Analyze Constraints", category: "constraints", stepNumber: 4, question: "N can be as large as 3·10^5. Which complexity target is appropriate, and why?", type: "single-choice",
        choices: [
          { id: "a", text: "O(N^2), because there are only N cows and pair checks are manageable in Bronze", isCorrect: false, explanation: "This assumes 'Bronze' implies small N, but 3·10^5 makes O(N^2) far too large. Difficulty tier doesn't override the actual constraints. Always compute the order-of-magnitude cost." },
          { id: "b", text: "O(N log N), because we need sorting to group infected cows into segments", isCorrect: false, explanation: "This assumes grouping runs requires sorting. The cows are already in line order, so segments are found by a single left-to-right scan. Sorting would be unnecessary extra work." },
          { id: "c", text: "O(N), because one pass finds segments and another pass computes the answer from segment lengths", isCorrect: true, explanation: "Correct. The input is already ordered, so contiguous 1-blocks are extracted in O(N). Then we compute the tightest window and sum per-segment source counts in O(number of segments), which is O(N)." },
          { id: "d", text: "O(log N), because binary search can find the number of days directly", isCorrect: false, explanation: "This assumes we can decide feasibility of D with a monotone predicate efficiently enough to need binary search. While monotonicity ideas exist, the direct segment formula already gives an O(N) exact answer without binary search complexity." }
        ],
        followUp: { question: "What is the main reason the final algorithm stays linear instead of trying many possible day values D?", choices: [
          { id: "a", text: "The official constraints guarantee the answer D is at most 30", isCorrect: false, explanation: "This assumes a small hard cap on D, but no such bound is given in the problem statement. The linear solution works by deriving the largest feasible window directly from segment constraints." },
          { id: "b", text: "We derive the maximum feasible odd window directly from segment lengths, then count sources in one pass", isCorrect: true, explanation: "Exactly. The key optimization is not a faster feasibility check for many D values, but avoiding that search entirely by computing the limiting window analytically." },
          { id: "c", text: "We use prefix sums to answer each day-feasibility query in O(1), so trying all D is free", isCorrect: false, explanation: "This assumes feasibility can be checked from prefix sums alone and that all-D enumeration is cheap. The true solution is simpler: compute the limiting window once and skip the whole search." },
          { id: "d", text: "Because each infected segment always determines a unique value of D", isCorrect: false, explanation: "This assumes every segment fixes D exactly. In reality, segments impose upper bounds on the feasible window (equivalently D), and multiple D values may work. We choose the largest feasible one." }
        ]},
        hints: ["Estimate N^2 when N = 300,000 before choosing a strategy.", "Do you need sorting or pairwise comparisons if the cows are already in a line and you only care about contiguous runs?", "A single scan to build 1-runs + a single scan over runs is enough for O(N)."],
        coachNote: "CONSTRAINTS-FIRST HABIT: Always translate N into a rough operation budget before coding. For N around 10^5 to 10^6, target O(N) or O(N log N). Then ask: 'What structure in the input order lets me avoid sorting or pair checks?'"
      },
      { id: "step-5-edge-cases", title: "Test Edge Cases", category: "edge-cases", stepNumber: 5, question: "Which edge case most directly breaks the naive rule 'maxWindow = shortest infected segment length'?", type: "single-choice",
        choices: [
          { id: "a", text: "A single infected cow in the middle, because window size must be odd", isCorrect: false, explanation: "This assumes parity alone breaks the rule. A length-1 middle segment actually matches the rule fine (maxWindow = 1). You need a case where end-vs-middle geometry changes the bound." },
          { id: "b", text: "An infected segment at the edge, like 111000, because an edge source can support a larger window than the segment length", isCorrect: true, explanation: "Correct. For an end segment of length L, the feasible window can be as large as 2L-1, not just L. This is exactly why the shortest-segment heuristic is incomplete." },
          { id: "c", text: "No infected cows, because the shortest segment length is undefined", isCorrect: false, explanation: "This is a real edge case, but it doesn't demonstrate the geometric flaw in the heuristic. It shows a missing base case, not a wrong formula for nonempty inputs." },
          { id: "d", text: "Two separated infected segments, because windows can overlap across 0s", isCorrect: false, explanation: "This assumes windows may cross uninfected cows. They cannot, or you'd create extra 1s where the final string has 0s. Segments remain independent, so this doesn't break the rule in the way stated." }
        ],
        followUp: { question: "Why does an even-length middle segment (like 1111 surrounded by 0s) impose a stricter limit than an odd-length one?", choices: [
          { id: "a", text: "Because a single source always creates an odd-sized footprint after D nights, so an even middle block cannot be a single full window", isCorrect: true, explanation: "Exactly. A single source after D nights covers 2D+1 cows, which is always odd. That parity mismatch forces the maximum feasible window for an even middle block to be at most L-1." },
          { id: "b", text: "Because even-length blocks mean two infections happened on the same night, which is impossible", isCorrect: false, explanation: "This assumes a timing restriction that doesn't exist. Multiple cows can become infected on the same night. The issue is footprint parity, not simultaneous infection." },
          { id: "c", text: "Because middle blocks grow more slowly than end blocks", isCorrect: false, explanation: "This assumes different spread speeds by location. Spread speed is uniform. The distinction is whether the block must be symmetric around a source (middle) or can start at the boundary (end)." },
          { id: "d", text: "Because an even block always requires exactly two sources", isCorrect: false, explanation: "This assumes an exact count from parity alone. Even blocks require at least two sources for some windows, but the exact number depends on the chosen feasible window size and the block length." }
        ]},
        hints: ["Look for a case where being on the edge changes what a single source can generate.", "Compare a middle block and an end block with the same length L.", "A source at an edge only needs to spread inward to match the observed block, so the feasible window can be larger than L."],
        coachNote: "EDGE-CASE DESIGN TRICK: Don't test random extremes first. Test the assumption your formula depends on. Here, the fragile assumptions are symmetry (middle vs edge) and parity (odd window sizes), so those are the edge cases to build first."
      },
      { id: "step-6-plan", title: "Plan the Approach", category: "plan", stepNumber: 6, question: "Which algorithm plan correctly computes the minimum possible number of initially infected cows?", type: "single-choice",
        choices: [
          { id: "a", text: "Try every possible D from 0 to N, simulate infection from every subset of cows, and keep the minimum that matches", isCorrect: false, explanation: "This assumes brute force over hidden sources is feasible. It explodes combinatorially and ignores the segment structure that makes the problem tractable. When a final state gives strong constraints, use them directly." },
          { id: "b", text: "Find all contiguous 1-block lengths, derive the largest feasible odd window from end/middle rules, then sum ceil(length / window) over blocks", isCorrect: true, explanation: "Correct. This plan directly matches the structural model: infer the largest valid footprint size, then count how many such footprints are needed per infected block." },
          { id: "c", text: "Greedily place a source at the center of every 1-block and expand until all 1s are explained", isCorrect: false, explanation: "This assumes each block should be handled independently with centered sources. End blocks and even middle blocks break that logic, and without first fixing the maximal feasible window, 'center' is not a reliable choice." },
          { id: "d", text: "Use binary search on the answer (number of initial cows) and check if that many sources can generate the bitstring", isCorrect: false, explanation: "This assumes the feasibility predicate by source count is easy and monotone to check. It is much more natural to solve by deriving the hidden window size first. Binary searching the output adds complexity without simplifying the logic." }
        ],
        followUp: { question: "Why must we choose the largest feasible window (equivalently the largest feasible D) before counting sources?", choices: [
          { id: "a", text: "Because larger windows reduce or keep the same value of ceil(L / window) for every infected block", isCorrect: true, explanation: "Exactly. The source count per block is monotone nonincreasing in window size. So to minimize total sources, you want the largest window that is still valid for all blocks." },
          { id: "b", text: "Because the official solution always chooses the largest parameter first", isCorrect: false, explanation: "This assumes a memorized strategy rather than a proof. The correct reason is monotonicity of the per-block ceiling count, not 'because editorial'." },
          { id: "c", text: "Because larger windows guarantee no overlaps, which is required", isCorrect: false, explanation: "This assumes overlaps are invalid. Overlaps are allowed—reinfecting an already infected cow causes no contradiction. Larger windows are better because they cover more cows per source, not because they avoid overlap." },
          { id: "d", text: "Because the number of nights D is uniquely determined by the shortest segment", isCorrect: false, explanation: "This assumes uniqueness and ignores edge/middle differences. Multiple D values can be feasible; we intentionally choose the maximum feasible one to minimize sources." }
        ]},
        hints: ["Your plan should infer a common window size first, not guess source locations directly.", "Use the tightest block constraint to cap the window, then count how many windows cover each block.", "The final formula is: sum over 1-blocks of ceil(blockLength / maxWindow)."],
        coachNote: "OPTIMIZE THE HIDDEN PARAMETER FIRST: In inference problems, it's often easier to optimize a shared hidden parameter (like window size, radius, threshold) than to construct the exact objects (like source positions). Once the parameter is fixed, counting or construction usually becomes simple."
      }
    ]
  },
  {
    id: "session-bronze-dec23-3",
    problemId: "usaco-bronze-dec23-3",
    steps: [
      { id: "step-1-classify", title: "Classify the Problem", category: "classify", stepNumber: 1, question: "Each plant has height h_i + d·a_i after d days, and t_i tells how many plants must be taller than plant i. What is the best classification?", type: "single-choice",
        choices: [
          { id: "a", text: "Sorting + math-logic, because t_i defines a target order and each adjacent order constraint becomes an inequality in d", isCorrect: true, explanation: "Correct. The target array gives a final ranking, so we sort by that target rank and convert 'must be taller' into strict linear inequalities in the day count d. The core work is interval/bound reasoning on d." },
          { id: "b", text: "Simulation, because plant heights change every day and we can just simulate until it works", isCorrect: false, explanation: "This assumes the earliest valid day is small enough to find by stepping day-by-day. But d can be large, and heights grow linearly. When values evolve linearly, algebraic inequalities are usually better than simulation." },
          { id: "c", text: "Graph traversal, because each plant has relations to taller and shorter plants", isCorrect: false, explanation: "This assumes pairwise comparisons form a graph problem requiring traversal. The comparisons define an ordering constraint, not a connectivity question. There's no BFS/DFS objective here." },
          { id: "d", text: "Dynamic programming, because the best day for the first k plants builds from the first k-1 plants", isCorrect: false, explanation: "This assumes an optimization over prefixes. But we are not minimizing a per-prefix objective; we are finding one global integer d satisfying all inequalities simultaneously. This is bound intersection, not DP." }
        ],
        followUp: { question: "What feature of the problem most strongly signals 'solve with inequalities on d' instead of simulation?", choices: [
          { id: "a", text: "The values t_i are a permutation, so the answer must be unique", isCorrect: false, explanation: "This assumes uniqueness of the day follows from t_i being a permutation. It doesn't—many days may satisfy the same order. The key clue is linear growth formulas in d, not uniqueness." },
          { id: "b", text: "Each height is h_i + d·a_i, so pairwise order constraints are linear comparisons in one variable", isCorrect: true, explanation: "Exactly. Once every plant height is affine in d, 'plant X taller than Y' becomes a linear inequality. A single-variable inequality system is a strong signal to derive bounds, not simulate." },
          { id: "c", text: "The constraints are large, so all large-constraint problems are solved with sorting", isCorrect: false, explanation: "This assumes input size alone dictates the technique. Sorting helps here because t_i encodes a target order, but the deeper reason is the inequality structure in d." },
          { id: "d", text: "Because USACO Problem 3 is usually greedy", isCorrect: false, explanation: "This assumes contest position predicts the algorithm. That's unreliable. Always classify from the problem structure, not from where it appears in the set." }
        ]},
        hints: ["Try writing the height of one plant after d days explicitly.", "What happens if you compare two plants' heights after d days and move terms to one side?", "You get a strict linear inequality in d. That points to bounds/intersections, not simulation."],
        coachNote: "LINEAR-EVOLUTION PATTERN: If quantities change as 'initial + rate × time', compare them symbolically before coding. Many 'simulate over time' problems collapse into inequalities or intersections on time. This is often both faster and cleaner."
      },
      { id: "step-2-identify-variables", title: "Identify Key Variables", category: "identify-variables", stepNumber: 2, question: "Which variables are essential for a clean and correct solution to Farmer John Actually Farms?", type: "single-choice",
        choices: [
          { id: "a", text: "Current heights after each simulated day for all plants, plus a visited set of seen rankings", isCorrect: false, explanation: "This assumes repeated simulation and cycle detection are needed. Heights can grow too large and the valid day may be far away. The problem is better captured by static plant parameters and bounds on d." },
          { id: "b", text: "A sorted list of plants by target rank and two global bounds (lo, hi) for feasible day values", isCorrect: true, explanation: "Correct. Sorting by target rank encodes the required final order, and each adjacent comparison updates a lower or upper bound on d. The whole solution is maintaining the feasible interval." },
          { id: "c", text: "Only the fastest-growing plant and the tallest initial plant, since they determine the final answer", isCorrect: false, explanation: "This assumes the order depends only on extremes. It doesn't—every adjacent target-order pair can add a tighter constraint. Ignoring the middle plants misses critical contradictions." },
          { id: "d", text: "An adjacency matrix of which plant should be taller than which other plant", isCorrect: false, explanation: "This assumes we need all O(N^2) pair relations explicitly. The target order is total, so adjacent comparisons in that order are sufficient and much cheaper." }
        ],
        followUp: { question: "Why are adjacent pairs in the target-sorted order enough to check, instead of all pairs?", choices: [
          { id: "a", text: "Because if every adjacent strict inequality in a total order holds, the whole order holds transitively", isCorrect: true, explanation: "Exactly. In a chain x1 > x2 > x3 > ... > xN, verifying each adjacent step implies every non-adjacent comparison. This cuts O(N^2) constraints down to O(N)." },
          { id: "b", text: "Because non-adjacent comparisons are always weaker and never matter", isCorrect: false, explanation: "This assumes a vague 'weaker' argument. Non-adjacent comparisons do matter logically, but they are already implied by adjacent ones when the order is total and strict." },
          { id: "c", text: "Because USACO guarantees no ties after sorting by t_i", isCorrect: false, explanation: "This assumes the absence of ties in t_i alone is the reason. Distinct t_i gives a unique target order, but the sufficiency of adjacent checks comes from transitivity of strict inequalities." },
          { id: "d", text: "Because checking all pairs would overflow 64-bit integers", isCorrect: false, explanation: "This assumes a numeric limitation is the main issue. The real issue is unnecessary work. 64-bit arithmetic is still needed, but adjacency is enough for correctness and efficiency." }
        ]},
        hints: ["What does t_i actually tell you: a value, or a final rank/order?", "After sorting by target rank, what single variable do all comparisons depend on?", "Track a feasible interval for d: a lower bound and an upper bound."],
        coachNote: "ONE-VARIABLE CONSTRAINT SYSTEMS: When all conditions depend on the same unknown (here, d), your core state is often just the current feasible interval. Don't track evolving states if the problem can be reduced to bound updates."
      },
      { id: "step-3-data-structures", title: "Choose Data Structures", category: "data-structures", stepNumber: 3, question: "What data structure choice best supports an O(N log N) solution across multiple test cases?", type: "single-choice",
        choices: [
          { id: "a", text: "A priority queue keyed by current height, updated day by day", isCorrect: false, explanation: "This assumes the order must be maintained dynamically over time. But we are not simulating each day. The needed comparisons come from the target order and algebraic bounds, not repeated heap updates." },
          { id: "b", text: "A vector/array of structs (h, a, t) sorted by t, then a single pass updating bounds", isCorrect: true, explanation: "Correct. A compact struct per plant keeps all needed fields together. Sorting by t gives the target order, and then a linear scan handles all adjacent inequalities." },
          { id: "c", text: "A hash map from t_i to height-only, since growth rates are secondary", isCorrect: false, explanation: "This assumes growth rates only tweak the answer. In fact, a_i is central because the inequality slope determines whether a pair gives a lower bound, upper bound, or impossibility. You must store h and a together." },
          { id: "d", text: "A 2D DP table dp[i][d] tracking whether the first i plants can be valid by day d", isCorrect: false, explanation: "This assumes d is small enough to be a DP dimension and that prefix validity is the right structure. d can be huge, and the correct method avoids iterating over day values entirely." }
        ],
        followUp: { question: "Why is a struct/tuple per plant better than separate arrays once you sort by target rank?", choices: [
          { id: "a", text: "Because sorting one array automatically reorders all parallel arrays in most languages", isCorrect: false, explanation: "This assumes parallel arrays stay synchronized by magic. They do not unless you carefully sort indices and remap. A struct prevents synchronization bugs by moving fields together." },
          { id: "b", text: "Because keeping h, a, and t bundled avoids mismatched reordering bugs when sorting", isCorrect: true, explanation: "Exactly. The sort key is t, but the inequality uses h and a. Bundling them ensures the correct h and a travel with their t during sorting." },
          { id: "c", text: "Because structs make integer division more accurate", isCorrect: false, explanation: "This assumes data layout affects arithmetic correctness. Division accuracy depends on formulas and types, not whether you used a struct." },
          { id: "d", text: "Because hash maps cannot store integers larger than 10^9 safely", isCorrect: false, explanation: "This assumes a limitation that isn't relevant. The issue is not integer storage in maps; it's that sorting by rank and scanning is the natural operation here." }
        ]},
        hints: ["You need to sort plants by target rank t_i, but comparisons use h_i and a_i too.", "Think about how to keep all fields attached to the same plant during sorting.", "A vector of structs/tuples is the safest and simplest choice."],
        coachNote: "DATA COHESION RULE: If multiple fields always move together (id, value, rate, rank), store them together. Parallel arrays are fine for simple scans, but sorting or filtering often turns them into bug magnets."
      },
      { id: "step-4-constraints", title: "Analyze Constraints", category: "constraints", stepNumber: 4, question: "The sum of N across test cases is up to 2·10^5, and h_i, a_i can be 10^9. Which approach is feasible and robust?", type: "single-choice",
        choices: [
          { id: "a", text: "Simulate d from 0 upward until the ranking matches, because Bronze answers are usually small", isCorrect: false, explanation: "This assumes the first valid day is small, which is not guaranteed. With large heights/rates, the required day can be large. Constraint size and linear formulas suggest direct inequality solving instead." },
          { id: "b", text: "O(N log N) sorting plus O(N) bound intersection per test case, using 64-bit arithmetic", isCorrect: true, explanation: "Correct. Sorting by target rank dominates runtime, and one pass computes bounds. 64-bit integers are necessary because expressions like h + d·a_i can exceed 32-bit range." },
          { id: "c", text: "O(N^2) pairwise comparisons, since N is only 2·10^5 across all tests not per test", isCorrect: false, explanation: "This assumes the total-N bound makes quadratic okay. It doesn't—(2·10^5)^2 is still enormous. The adjacency insight is what makes the solution fast enough." },
          { id: "d", text: "Binary search on d with an O(N log N) check each time, because d is monotonic", isCorrect: false, explanation: "This assumes binary search is the simplest route. There is monotonic behavior in some pair constraints, but directly intersecting linear bounds is cleaner and avoids an extra log factor and tricky check logic." }
        ],
        followUp: { question: "Why is 64-bit arithmetic required even though h_i and a_i each fit in 32-bit integers?", choices: [
          { id: "a", text: "Because sorting by t_i internally converts values to 64-bit", isCorrect: false, explanation: "This assumes the sort operation is the source of overflow. The real risk comes from arithmetic in height comparisons, especially d·a_i and sums with h_i." },
          { id: "b", text: "Because terms like d·a_i and h_i + d·a_i can exceed 2^31−1 when d is large", isCorrect: true, explanation: "Exactly. Even if h_i and a_i fit in 32-bit, multiplying by a potentially large day count can overflow 32-bit. Use 64-bit types for all bound and comparison math." },
          { id: "c", text: "Because t_i values can be up to 10^9 and cannot fit in int", isCorrect: false, explanation: "This assumes t_i is large; actually t_i is a permutation of 0..N−1. The overflow concern is the height-growth arithmetic, not target ranks." },
          { id: "d", text: "Because division in the bound formulas requires floating point, which is 64-bit", isCorrect: false, explanation: "This assumes floating point is needed. It isn't—you should use integer arithmetic with careful floor/ceil handling for strict inequalities." }
        ]},
        hints: ["Compare O(N^2) vs O(N log N) at N = 200,000.", "Do you really need to test many day values, or can you solve for d symbolically?", "Watch for overflow in expressions involving d * a_i."],
        coachNote: "SYMBOLIC OVER NUMERIC ITERATION: If a quantity is linear in time and constraints are large, solve symbolically before considering binary search or simulation. Also, always audit multiplication expressions for overflow even when individual inputs fit in int."
      },
      { id: "step-5-edge-cases", title: "Test Edge Cases", category: "edge-cases", stepNumber: 5, question: "Which edge case most commonly causes wrong answers in the inequality-bound approach?", type: "single-choice",
        choices: [
          { id: "a", text: "Two adjacent target-order plants with equal growth rates, where the initial order is wrong", isCorrect: true, explanation: "Correct. If two plants have the same growth rate, their height difference never changes. If they are in the wrong strict order initially, the target is impossible forever. Missing this case causes false positives." },
          { id: "b", text: "A test case with N = 1, because sorting one item is undefined", isCorrect: false, explanation: "This assumes sorting size-1 arrays is problematic. It's not. N = 1 is a trivial base case, but it's not the subtle bug source in this problem." },
          { id: "c", text: "A plant with the largest t_i, because it should be checked against all others", isCorrect: false, explanation: "This assumes endpoint ranks need special all-pairs handling. They don't—adjacent checks in the sorted order already cover endpoints correctly." },
          { id: "d", text: "A case where the answer is 0, because lower-bound logic always forces d > 0", isCorrect: false, explanation: "This is a real outcome to support, but the issue is not that lower bounds 'always' force positivity. Some inequalities are already satisfied at d = 0. The deeper bug is mishandling equal slopes or strict division bounds." }
        ],
        followUp: { question: "When converting a strict inequality into a lower bound on integer d, what subtle detail matters most?", choices: [
          { id: "a", text: "You can use floating point and round normally, since Bronze tolerates small errors", isCorrect: false, explanation: "This assumes precision errors are harmless. They are not—one off-by-one on d can flip valid/invalid. Use exact integer arithmetic for strict inequalities." },
          { id: "b", text: "Strictness changes the rounding rule: d > x/y becomes d >= floor(x/y) + 1 (after sign handling)", isCorrect: true, explanation: "Exactly. The strict '>' is the trap. You must convert to an integer lower bound carefully, and sign/denominator direction must be handled correctly before applying floor/ceil logic." },
          { id: "c", text: "You should always use ceil for lower bounds, regardless of sign", isCorrect: false, explanation: "This assumes one universal rounding formula works. Sign and inequality direction matter. Blindly applying ceil can produce incorrect bounds." },
          { id: "d", text: "The rounding detail only matters when heights are equal initially", isCorrect: false, explanation: "This assumes boundary rounding is rare. It matters whenever the bound is near an integer, even if initial heights differ." }
        ]},
        hints: ["Ask what happens if two plants grow at exactly the same rate.", "If their slopes are equal, can the ordering ever change over time?", "Strict inequalities and integer division are the main off-by-one trap in this problem."],
        coachNote: "INEQUALITY BUG CHECKLIST: For every pair constraint, separate the cases by slope sign (>, =, <) before doing any division. Then handle strict vs non-strict rounding carefully. Most wrong answers in algebraic CP problems come from skipping this case split."
      },
      { id: "step-6-plan", title: "Plan the Approach", category: "plan", stepNumber: 6, question: "Which step-by-step plan correctly finds the minimum valid day or reports impossibility?", type: "single-choice",
        choices: [
          { id: "a", text: "Sort plants by current height, then repeatedly swap out-of-order neighbors until the target t_i order appears", isCorrect: false, explanation: "This assumes the target order can be reached by local swaps over time, but days are global and heights change continuously. The correct variable is d, not a sequence of swaps." },
          { id: "b", text: "Sort by target rank t_i, derive lower/upper bounds on d from each adjacent pair inequality, intersect all bounds, and return the smallest feasible integer d", isCorrect: true, explanation: "Correct. This directly matches the problem structure: one unknown day d and many linear constraints. Intersecting the bounds gives the full feasible set." },
          { id: "c", text: "For each day d up to N, compute all heights, sort them, and stop at the first day matching the target ranks", isCorrect: false, explanation: "This assumes the answer is bounded by N, which is not guaranteed. It also wastes work by recomputing full rankings instead of using pairwise inequalities." },
          { id: "d", text: "Binary search the final tallest plant and infer d from that height", isCorrect: false, explanation: "This assumes one plant's final height determines all others uniquely. It doesn't; the constraints are about relative orderings across many pairs. You need a global feasibility interval for d." }
        ],
        followUp: { question: "Why does intersecting adjacent-pair bounds produce the minimum valid day directly?", choices: [
          { id: "a", text: "Because each adjacent pair contributes a necessary condition on d, and all must hold simultaneously in the same total order", isCorrect: true, explanation: "Exactly. Each adjacent inequality is required, and together they are sufficient for the whole target order. Their intersection is the set of all valid days, so the minimum valid day is the smallest integer in that set." },
          { id: "b", text: "Because the first adjacent pair always determines the answer and the rest just verify it", isCorrect: false, explanation: "This assumes one pair dominates. In reality, any pair can provide the tightest lower or upper bound, and contradictions often come from different pairs." },
          { id: "c", text: "Because the bounds are independent across test cases, we can cache them", isCorrect: false, explanation: "This assumes reuse across test cases helps correctness. Bounds are test-case specific. Caching is unrelated to why the interval method works." },
          { id: "d", text: "Because sorting by t_i guarantees d is monotonic with plant index", isCorrect: false, explanation: "This assumes d varies by index, but d is a single global day. Sorting organizes constraints; it does not create an index-based monotonicity of the answer." }
        ]},
        hints: ["Turn 'plant X must be taller than plant Y' into an inequality in d.", "Do this only for adjacent plants after sorting by target rank.", "Maintain one lower bound and one upper bound for d; if they cross, answer is -1."],
        coachNote: "BOUNDS INTERSECTION PATTERN: When many conditions constrain one integer variable, don't search the variable—build its feasible interval. Update a global lower bound and upper bound, and check emptiness at the end. This pattern appears often in scheduling, growth, and threshold problems."
      }
    ]
  }
];
