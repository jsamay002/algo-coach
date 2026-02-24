import { SessionTemplate } from "./types";

// ═══════════════════════════════════════════════════════════════
// BRONZE SESSIONS DATABASE
// Full 6-step guided reasoning with double-lock MCQs
// Each session matches a problem in bronze-problems.ts via problemId
// ═══════════════════════════════════════════════════════════════

export const bronzeSessions: SessionTemplate[] = [
  // ═══════════════════════════════════════════════════════════
  // DECEMBER 2023, Problem 1 — Candy Cane Feast
  // ═══════════════════════════════════════════════════════════
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
          { id: "d", text: "Graph-basics — model cows and candy canes as nodes and traverse edges", isCorrect: false, explanation: "This assumes there is a network structure (nodes and explicit relationships), but interactions happen in a simple linear order. Turning this into a graph obscures the real invariant you need to track. Use graph models only when connectivity or traversal is the true structure." },
        ],
        followUp: {
          question: "What structural property most strongly proves this is simulation and not an optimization problem?",
          choices: [
            { id: "a", text: "The input sizes are large, so simulation is the intended method", isCorrect: false, explanation: "This assumes complexity limits determine the problem type, but constraints only affect feasibility, not classification. Large constraints can still appear in greedy, graphs, DP, or simulation." },
            { id: "b", text: "The problem uses farm/cow story wording, which usually means simulation", isCorrect: false, explanation: "This assumes theme determines algorithm type, but USACO themes are decorative. Always classify by structure: order of events, choices, and state changes." },
            { id: "c", text: "Each candy and cow interaction happens in a prescribed order, and the only job is updating state correctly", isCorrect: true, explanation: "This assumes the key signal is deterministic event sequencing, and that is exactly right. General rule: deterministic process + state mutation = simulation." },
            { id: "d", text: "The answer is not a single number, so it cannot be greedy or counting", isCorrect: false, explanation: "This assumes output format determines the paradigm, but many non-simulation problems also output arrays or strings. Output shape is a weak clue." },
          ],
        },
        hints: [
          "Ask yourself: are we making choices, or just following a process?",
          "Look for phrases like 'in order' and what changes after each interaction.",
          "If the sequence is fixed and values mutate as you go, the pattern is usually simulation.",
        ],
        coachNote: "SIMULATION PATTERN: If the statement gives a step-by-step process in a fixed order and asks for the final state, your first move is to define state variables and update rules. The common trap is inventing optimization choices that do not exist.",
      },
      {
        id: "step-2-identify-variables",
        title: "Identify Key Variables",
        category: "identify-variables",
        stepNumber: 2,
        question: "For one candy cane of height x, which state is the most important to track while cows process it in order?",
        type: "single-choice",
        choices: [
          { id: "a", text: "Only total candy remaining, because the exact eaten portion does not matter", isCorrect: false, explanation: "This assumes length alone is enough, but cows can only eat if they can reach the current *base* of the remaining candy. Lesson: when geometry/position affects access, track boundaries, not just totals." },
          { id: "b", text: "For each cow, a boolean of whether she already ate in this round", isCorrect: false, explanation: "This assumes the main issue is repeated turns, but each cow gets exactly one turn per candy by definition. Track variables that determine future behavior, not bookkeeping implied by loop order." },
          { id: "c", text: "The current lowest uneaten height of the candy, plus the cows' current heights", isCorrect: true, explanation: "This assumes the candy's state can be summarized by a boundary (`start`) and the cows' mutable heights, which is exactly the right compression. Reusable principle: find the minimal state that fully determines the next step." },
          { id: "d", text: "A queue of candy segments for every bite taken so far", isCorrect: false, explanation: "This assumes the candy becomes fragmented, but it never does — cows always eat from the bottom upward. When the remaining shape has a simple invariant, store the invariant, not the history." },
        ],
        followUp: {
          question: "Why is tracking the 'current lowest uneaten height' sufficient for the candy cane state?",
          choices: [
            { id: "a", text: "Because every cow either eats the entire candy or nothing at all", isCorrect: false, explanation: "This assumes all interactions are all-or-nothing, which is false; many cows eat partial amounts. The real reason is the remaining candy stays a single interval." },
            { id: "b", text: "Because the uneaten candy always remains one contiguous interval from some height up to x", isCorrect: true, explanation: "This assumes a key invariant about the candy's shape, and it is correct. General lesson: if a process preserves a simple invariant, exploit it to reduce state." },
            { id: "c", text: "Because cow heights never change during a candy cane", isCorrect: false, explanation: "This assumes heights are static within a round, but cows grow when they eat. Separate the candy invariant from the cow update rules." },
            { id: "d", text: "Because the candy cane top x changes after each cow eats", isCorrect: false, explanation: "This assumes the top moves, but the top stays at x; the bottom boundary rises. Lesson: read which boundary changes — many simulation bugs come from updating the wrong side." },
          ],
        },
        hints: [
          "Think about the *shape* of the remaining candy after a cow eats.",
          "Does the remaining candy split into multiple pieces, or stay one interval?",
          "If the candy is always '[some height, x]', then one boundary number describes it.",
        ],
        coachNote: "STATE DESIGN PRINCIPLE: Track the smallest set of variables that fully determines the next transition. In simulation problems, a good state often comes from an invariant ('the remaining object is always a single interval'). The trap is storing too much history instead of the current state.",
      },
      {
        id: "step-3-data-structures",
        title: "Choose Data Structures",
        category: "data-structures",
        stepNumber: 3,
        question: "Which data structure setup is most appropriate for a clean Bronze-level implementation of this problem?",
        type: "single-choice",
        choices: [
          { id: "a", text: "A vector/array of 64-bit cow heights, and scalar variables for each candy (`x`, `start`)", isCorrect: true, explanation: "This assumes the process can be handled with sequential scans and a compact per-candy state, which matches the problem structure. General lesson: when access is sequential and indexing is simple, arrays beat more complex structures." },
          { id: "b", text: "A hash map from cow index to current height, because updates are dynamic", isCorrect: false, explanation: "This assumes dynamic updates imply a map, but cow indices are contiguous and known in advance. Use maps when keys are sparse or unknown, not for 0..N-1 indices." },
          { id: "c", text: "A priority queue of cows by height so the tallest cow eats first", isCorrect: false, explanation: "This assumes we are allowed to reorder cows to optimize consumption, but the order is fixed. Data structure choice must respect the statement's required order." },
          { id: "d", text: "A segment tree over candy heights to support range updates", isCorrect: false, explanation: "This assumes there are enough complex range queries/updates to justify heavy machinery, but there is only one candy active at a time and one running boundary." },
        ],
        followUp: {
          question: "Why is a plain array especially strong here instead of a map or heap?",
          choices: [
            { id: "a", text: "Because arrays make the algorithm asymptotically faster than O(N×M)", isCorrect: false, explanation: "This assumes the choice changes the asymptotic complexity. The real benefit is matching the natural contiguous indexing and fixed order." },
            { id: "b", text: "Because cows are processed in fixed index order and we repeatedly update heights by index", isCorrect: true, explanation: "This assumes the access pattern is the main driver of data structure choice, and that is correct. Reusable lesson: choose structures that match the required traversal order." },
            { id: "c", text: "Because hash maps cannot store 64-bit values safely", isCorrect: false, explanation: "This assumes a data type limitation that doesn't exist. The issue is mismatch to the problem's structure, not capability." },
            { id: "d", text: "Because the official input format guarantees cows are already sorted by height", isCorrect: false, explanation: "This assumes an input property the statement does not give. Never rely on unstated ordering assumptions." },
          ],
        },
        hints: [
          "How do you access cows: by arbitrary key, or by position in a fixed order?",
          "Do you need to reorder cows or answer range queries, or just scan and update?",
          "If the access pattern is 'for i = 1..N', a simple height array is usually ideal.",
        ],
        coachNote: "DATA STRUCTURE FIT: Start from the access pattern, not from what feels advanced. If you scan in order and update by index, arrays are usually the right tool. The trap is using maps/heaps/trees just because values are 'dynamic'.",
      },
      {
        id: "step-4-constraints",
        title: "Analyze Constraints",
        category: "constraints",
        stepNumber: 4,
        question: "The statement allows N, M up to 2×10^5 and heights up to 10^9. What is the most important immediate constraint takeaway?",
        type: "single-choice",
        choices: [
          { id: "a", text: "You must use 64-bit integers for heights/growth, even before discussing runtime", isCorrect: true, explanation: "This assumes value magnitude can cause overflow independently of runtime, which is exactly right. Reusable lesson: always separate 'time complexity constraints' from 'numeric range constraints.'" },
          { id: "b", text: "You must use dynamic programming because 2×10^5 is too large for loops", isCorrect: false, explanation: "This assumes large inputs automatically imply DP. DP is for subproblem structure, not just big N." },
          { id: "c", text: "You must sort cows by height to avoid TLE", isCorrect: false, explanation: "This assumes reordering is allowed and helpful, but the process requires original order. Never break problem semantics to chase speed." },
          { id: "d", text: "You can use 32-bit ints because each candy height is at most 10^9", isCorrect: false, explanation: "This assumes bounds on individual inputs also bound accumulated values, which is false because cows grow repeatedly. Lesson: check how values evolve over time, not just raw input ranges." },
        ],
        followUp: {
          question: "Why can overflow happen even if every input height is at most 10^9?",
          choices: [
            { id: "a", text: "Because cows can gain height across multiple candy canes, so stored heights can exceed the original input range", isCorrect: true, explanation: "This assumes state values may accumulate beyond input bounds, and that is exactly what happens. General rule: in simulations, track the maximum possible evolved state, not just initial values." },
            { id: "b", text: "Because reading N and M as integers causes parsing overflow", isCorrect: false, explanation: "N and M fit comfortably in 32-bit. The actual risk is the evolving cow heights." },
            { id: "c", text: "Because subtraction `reach - start` is always negative and wraps", isCorrect: false, explanation: "We guard with `max(0, ...)` logic. Overflow risk comes from repeated additions to cow heights." },
            { id: "d", text: "Because the candy cane top x is doubled every round", isCorrect: false, explanation: "Candy heights are fixed input values. It's the cows that grow." },
          ],
        },
        hints: [
          "There are two kinds of constraints here: runtime and numeric range. Which one is immediately dangerous?",
          "Even if each input is ≤ 1e9, ask what happens after repeated updates.",
          "A cow can grow many times, so store heights in 64-bit (`long long`).",
        ],
        coachNote: "CONSTRAINTS CHECKLIST: Always do two passes — (1) runtime feasibility, (2) numeric safety. Many Bronze bugs are overflow bugs from cumulative updates, not algorithmic errors.",
      },
      {
        id: "step-5-edge-cases",
        title: "Test Edge Cases",
        category: "edge-cases",
        stepNumber: 5,
        question: "Which edge case most directly catches the mistake 'tracking only total candy remaining' instead of the current eaten base height?",
        type: "single-choice",
        choices: [
          { id: "a", text: "A candy is fully eaten by the first cow", isCorrect: false, explanation: "If a candy disappears immediately, total remaining and boundary tracking can accidentally agree. Good edge cases isolate the exact logic you're testing." },
          { id: "b", text: "A short cow comes after a taller cow and cannot reach the remaining candy because the base has moved up", isCorrect: true, explanation: "This assumes the key bug appears when reachability depends on the candy's current base position, which is exactly right. General lesson: edge cases should target the hidden state your buggy model forgot." },
          { id: "c", text: "All cows have the same height and all candies have the same height", isCorrect: false, explanation: "Uniform cases often hide bugs because many incorrect models produce the same output." },
          { id: "d", text: "N = 1 and M = 1", isCorrect: false, explanation: "Simple tests usually miss state-transition mistakes. Use minimal tests for parsing and indexing, not deep logic validation." },
        ],
        followUp: {
          question: "What misconception is revealed if someone lets a later short cow eat just because 'there is candy left'?",
          choices: [
            { id: "a", text: "They are treating the remaining candy as a quantity only, not as an interval with a raised base", isCorrect: true, explanation: "This is a state representation error. They ignore reachability, which depends on position, not only length. Reusable lesson: when access depends on location, quantity-only models are incomplete." },
            { id: "b", text: "They forgot to process cows in the given input order", isCorrect: false, explanation: "The ordering may still be correct. The actual issue is the representation of the candy state." },
            { id: "c", text: "They used 32-bit integers for the cow heights", isCorrect: false, explanation: "This edge case is about reachability logic, not overflow. Match the diagnosis to the symptom." },
            { id: "d", text: "They forgot to reset the cows after each candy cane", isCorrect: false, explanation: "Cows actually keep their grown heights across candies. That's a different misconception entirely." },
          ],
        },
        hints: [
          "Find a case where the candy still exists, but a cow still should eat nothing.",
          "What causes a cow to eat nothing even when total remaining length is positive?",
          "Use a taller cow first to raise the candy's base, then a shorter cow after.",
        ],
        coachNote: "EDGE-CASE TESTING: Don't just test extremes ('smallest input' / 'largest input'). Test cases that target specific misconceptions: wrong state representation, wrong boundary updates, wrong order, or overflow.",
      },
      {
        id: "step-6-plan",
        title: "Plan the Approach",
        category: "plan",
        stepNumber: 6,
        question: "Which algorithm plan correctly matches the simulation and the key invariant for Candy Cane Feast?",
        type: "single-choice",
        choices: [
          { id: "a", text: "For each candy x: scan cows in order, track `start`, compute `reach=min(height[i],x)`, add `max(0, reach-start)` to the cow, then set `start=max(start,reach)`", isCorrect: true, explanation: "This assumes the remaining candy is represented by a moving lower boundary and updates cows immediately when they eat, which matches the process exactly. Lesson: once your invariant is right, the implementation becomes a direct translation." },
          { id: "b", text: "For each candy x: sort cows by height, let the tallest eat first, and distribute leftover candy greedily to smaller cows", isCorrect: false, explanation: "This assumes reordering is allowed and helps, but the statement fixes the order. Never optimize by violating the problem's process constraints." },
          { id: "c", text: "For each cow: sum all candy heights she can reach using her initial height, then apply all growth at the end", isCorrect: false, explanation: "This assumes cow heights stay fixed while evaluating all candies, but growth changes future interactions. In simulation, update state at the exact time the event occurs." },
          { id: "d", text: "Use prefix sums over candy heights so each cow can compute her final growth in O(1)", isCorrect: false, explanation: "This assumes the effects of different candies combine independently, but they do not because cow heights evolve and candy reachability depends on prior events. Prefix sums only work when contributions are independent and additive." },
        ],
        followUp: {
          question: "Why must the cow's height be updated immediately when she eats (rather than batched later)?",
          choices: [
            { id: "a", text: "Because her updated height may affect how much she can eat from the same candy later in the loop", isCorrect: false, explanation: "Each cow gets exactly one turn per candy. Immediate updates are necessary for future candies, not the same one." },
            { id: "b", text: "Because the problem's process is sequential across candies, and each cow's growth changes her reach on later candies", isCorrect: true, explanation: "This assumes future behavior depends on current updates, which is the core dependency. General lesson: if later events depend on earlier state changes, apply updates at the moment they occur." },
            { id: "c", text: "Because updating immediately reduces the time complexity from O(N×M) to O(N+M)", isCorrect: false, explanation: "Immediate updates are for correctness, not speed. Separate correctness constraints from performance claims." },
            { id: "d", text: "Because the candy cane top x must increase when a cow grows", isCorrect: false, explanation: "Only the cow's height changes, not the candy. Mixing state variables from different entities is a common simulation bug." },
          ],
        },
        hints: [
          "Translate the invariant into update formulas: what is the remaining candy state after each cow?",
          "The amount eaten is the overlap between what remains (`start..x`) and what the cow can reach.",
          "Use `reach=min(height[i], x)` and `eaten=max(0, reach-start)` while scanning cows in order.",
        ],
        coachNote: "PLANNING THE IMPLEMENTATION: Once you know the state and invariant, write the update rule for one event (one cow on one candy) and then wrap it in loops that match the statement's order. The common trap is trying to 'batch' updates that are actually sequentially dependent.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // DECEMBER 2023, Problem 2 — Cowntact Tracing 2
  // ═══════════════════════════════════════════════════════════
  {
    id: "session-bronze-dec23-2",
    problemId: "usaco-bronze-dec23-2",
    steps: [
      {
        id: "step-1-classify",
        title: "Classify the Problem",
        category: "classify",
        stepNumber: 1,
        question: "You are given only the final infection bitstring after some unknown number of nights. What is the best way to classify this problem?",
        type: "single-choice",
        choices: [
          { id: "a", text: "Simulation, because infection spreads one night at a time so we should replay every night", isCorrect: false, explanation: "This assumes we know the timeline and should reconstruct it directly. But the number of nights is unknown, so night-by-night replay branches too much. When the final state is fixed and you're inferring hidden parameters, reframe it as constraints on structure, not a raw simulation." },
          { id: "b", text: "Graph traversal, because cows are connected to neighbors in a line", isCorrect: false, explanation: "This assumes the adjacency relation itself is the challenge. The line graph is trivial and doesn't require BFS/DFS; the hard part is inferring how many initial sources and nights could produce the final pattern." },
          { id: "c", text: "Math-logic / ad-hoc counting, because we infer hidden windows from final contiguous 1-blocks", isCorrect: true, explanation: "Correct. Each initial infected cow expands into a radius-D interval, so the final pattern becomes a constraint problem on contiguous infected segments. The solution is about deriving the largest feasible window and counting how many are needed." },
          { id: "d", text: "Dynamic programming, because each prefix of cows depends on the previous prefix", isCorrect: false, explanation: "This assumes we need optimal substructure over prefixes. But there is no prefix state transition to optimize; the answer comes from independent properties of each contiguous 1-block once the maximum feasible window is known." },
        ],
        followUp: {
          question: "What structural observation most strongly justifies the math-logic classification here?",
          choices: [
            { id: "a", text: "The exact infection order matters, so we must track which cow infected which", isCorrect: false, explanation: "Only the final infected ranges matter. When multiple histories lead to the same final state, look for an invariant summary (here, contiguous 1-segments)." },
            { id: "b", text: "Each initial infected cow becomes a fixed-size odd window after D nights, turning the problem into segment coverage", isCorrect: true, explanation: "Exactly. Once you see 'radius D spread' as an odd-length window, the hidden process collapses into a covering/counting problem on 1-block lengths." },
            { id: "c", text: "Because N is large, all simulation problems become math problems", isCorrect: false, explanation: "Input size affects feasibility, not the core structure. Some large-N problems are still simulations." },
            { id: "d", text: "The bitstring can be split into prefixes and suffixes solved independently with DP", isCorrect: false, explanation: "The real decomposition is by contiguous 1-blocks, not arbitrary prefixes/suffixes." },
          ],
        },
        hints: [
          "Don't focus on 'infection' as a theme. Focus on what is known (the final bitstring) and what is unknown (days, initial cows).",
          "Ask what one initially infected cow looks like after D nights. What shape does it create on a line?",
          "If one source creates an odd-length interval, then the final answer depends on how those intervals cover contiguous 1-blocks.",
        ],
        coachNote: "INFERENCE-FROM-FINAL-STATE PATTERN: When a process runs for an unknown number of steps and only the final state is given, don't default to simulation. First ask whether each source/event has a simple 'footprint' after k steps. If yes, solve by constraints on footprints instead of replaying history.",
      },
      {
        id: "step-2-identify-variables",
        title: "Identify Key Variables",
        category: "identify-variables",
        stepNumber: 2,
        question: "Which set of variables captures the right state for solving Cowntact Tracing 2 efficiently?",
        type: "single-choice",
        choices: [
          { id: "a", text: "For each cow: the exact night it got infected and which neighbor infected it", isCorrect: false, explanation: "This assumes we need to reconstruct one precise infection history. But many histories are possible, and tracking infection times is unnecessary. The minimum source count depends only on segment lengths and the maximum feasible window size." },
          { id: "b", text: "The lengths of contiguous 1-blocks, which blocks touch the ends, and a derived feasible window size", isCorrect: true, explanation: "Correct. Segment lengths determine all constraints, end-touching blocks are special, and the derived odd window size (2D+1) is the central hidden parameter." },
          { id: "c", text: "A prefix sum of infected cows and a suffix sum of infected cows", isCorrect: false, explanation: "Two strings with the same prefix/suffix sums can have very different segment structures, which changes the answer. Structure matters more than totals." },
          { id: "d", text: "Only the shortest infected segment length, since it always determines the answer", isCorrect: false, explanation: "This fails because end segments and even-length middle segments obey different constraints. A short end segment may allow a larger window than a short middle segment." },
        ],
        followUp: {
          question: "Why do we need to know whether a 1-block touches the left or right edge of the string?",
          choices: [
            { id: "a", text: "End blocks can be produced by a source centered outside the array, changing the parity rule", isCorrect: false, explanation: "Sources can't exist outside the cow line. The key difference is that a source at the boundary only needs to spread inward to match the observed block." },
            { id: "b", text: "End blocks permit larger feasible windows because a source can sit at the boundary and spread inward only", isCorrect: true, explanation: "Exactly. A middle block is constrained on both sides, but an end block can arise from a source on the edge, allowing a larger maximum window (up to 2L-1 for block length L)." },
            { id: "c", text: "Edge blocks are counted twice unless we track them separately", isCorrect: false, explanation: "The real reason is a mathematical constraint difference on feasible window size, not double-counting." },
            { id: "d", text: "Because the first and last cows infect faster than middle cows", isCorrect: false, explanation: "Spread rate is uniform. The difference is geometric: edge cows have only one side to expand into." },
          ],
        },
        hints: [
          "Try compressing the bitstring. What information is preserved if you replace each run of 1s by its length?",
          "One source after D nights covers an interval. Which property of a 1-run determines how many intervals are needed?",
          "You need: run lengths, whether a run is an end run, and the common interval length you're allowed to use.",
        ],
        coachNote: "STATE COMPRESSION PATTERN: Good variables preserve exactly what affects the answer and discard the rest. For strings, contiguous runs are often the right compression when behavior depends on local adjacency.",
      },
      {
        id: "step-3-data-structures",
        title: "Choose Data Structures",
        category: "data-structures",
        stepNumber: 3,
        question: "What data structure setup is most appropriate for an O(N) solution?",
        type: "single-choice",
        choices: [
          { id: "a", text: "A queue for BFS over cows, because infection spreads layer by layer", isCorrect: false, explanation: "This assumes we are simulating a known spread process. BFS computes distances from known sources, but our sources are unknown and we are minimizing how many there were." },
          { id: "b", text: "A vector/list of infected segment lengths plus a few scalar trackers for end/middle constraints", isCorrect: true, explanation: "Correct. A list of contiguous 1-block lengths is enough. Then scalar minima let you compute the global feasible window and the final count in linear time." },
          { id: "c", text: "A disjoint-set union (DSU) of infected cows to merge neighboring 1s", isCorrect: false, explanation: "The string is static and runs can be found in one pass without DSU overhead. DSU is useful when connections change, not for a single scan of fixed neighbors." },
          { id: "d", text: "A hash map from index to infection time so we can memoize repeated states", isCorrect: false, explanation: "There is no repeated-state search here — just direct analysis of one final bitstring." },
        ],
        followUp: {
          question: "Why is storing only segment lengths (not all segment indices) enough for the final source count once the window is known?",
          choices: [
            { id: "a", text: "Because the count for each segment depends only on its length and whether it is infected", isCorrect: false, explanation: "Partially true but incomplete: all stored segments are infected by definition, and end-vs-middle mattered earlier for choosing the window." },
            { id: "b", text: "Because after determining the common window size, each segment contributes ceil(length / window) independently", isCorrect: true, explanation: "Exactly. Segment positions are no longer needed once feasibility determined the global window. The count is additive across segments." },
            { id: "c", text: "Because overlapping windows force all segments to be merged conceptually into one", isCorrect: false, explanation: "Windows can't cross 0s. Segments remain independent because windows must stay within each contiguous 1-block." },
            { id: "d", text: "Because the answer is simply the number of segments", isCorrect: false, explanation: "Long segments may require multiple windows/sources if the feasible window size is small. Segment count is only a lower bound." },
          ],
        },
        hints: [
          "This is a static string scan. Prefer a one-pass structure over dynamic graph machinery.",
          "Think 'run-length encoding': what if you only keep lengths of consecutive 1s?",
          "You can solve the whole problem with a vector of run lengths and a few integers.",
        ],
        coachNote: "MINIMAL DATA STRUCTURE RULE: Pick the simplest structure that supports the needed operations. If the algorithm is 'scan runs, compute minima, sum ceilings,' a vector and a few integers beat DSU/BFS/maps every time.",
      },
      {
        id: "step-4-constraints",
        title: "Analyze Constraints",
        category: "constraints",
        stepNumber: 4,
        question: "N can be as large as 3·10^5. Which complexity target is appropriate, and why?",
        type: "single-choice",
        choices: [
          { id: "a", text: "O(N^2), because there are only N cows and pair checks are manageable in Bronze", isCorrect: false, explanation: "3·10^5 makes O(N^2) far too large. Difficulty tier doesn't override the actual constraints." },
          { id: "b", text: "O(N log N), because we need sorting to group infected cows into segments", isCorrect: false, explanation: "The cows are already in line order, so segments are found by a single left-to-right scan. Sorting would be unnecessary extra work." },
          { id: "c", text: "O(N), because one pass finds segments and another pass computes the answer from segment lengths", isCorrect: true, explanation: "Correct. The input is already ordered, so contiguous 1-blocks are extracted in O(N). Then we compute the tightest window and sum per-segment source counts in O(number of segments)." },
          { id: "d", text: "O(log N), because binary search can find the number of days directly", isCorrect: false, explanation: "The direct segment formula already gives an O(N) exact answer without binary search complexity." },
        ],
        followUp: {
          question: "What is the main reason the final algorithm stays linear instead of trying many possible day values D?",
          choices: [
            { id: "a", text: "The official constraints guarantee the answer D is at most 30", isCorrect: false, explanation: "No such bound is given. The linear solution works by deriving the largest feasible window directly from segment constraints." },
            { id: "b", text: "We derive the maximum feasible odd window directly from segment lengths, then count sources in one pass", isCorrect: true, explanation: "Exactly. The key optimization is computing the limiting window analytically, avoiding a search over D values entirely." },
            { id: "c", text: "We use prefix sums to answer each day-feasibility query in O(1), so trying all D is free", isCorrect: false, explanation: "The true solution is simpler: compute the limiting window once and skip the whole search." },
            { id: "d", text: "Because each infected segment always determines a unique value of D", isCorrect: false, explanation: "Segments impose upper bounds on the feasible window. Multiple D values may work. We choose the largest feasible one." },
          ],
        },
        hints: [
          "Estimate N^2 when N = 300,000 before choosing a strategy.",
          "Do you need sorting or pairwise comparisons if the cows are already in a line?",
          "A single scan to build 1-runs + a single scan over runs is enough for O(N).",
        ],
        coachNote: "CONSTRAINTS-FIRST HABIT: Always translate N into a rough operation budget before coding. For N around 10^5 to 10^6, target O(N) or O(N log N). Then ask: 'What structure in the input order lets me avoid sorting or pair checks?'",
      },
      {
        id: "step-5-edge-cases",
        title: "Test Edge Cases",
        category: "edge-cases",
        stepNumber: 5,
        question: "Which edge case most directly breaks the naive rule 'maxWindow = shortest infected segment length'?",
        type: "single-choice",
        choices: [
          { id: "a", text: "A single infected cow in the middle, because window size must be odd", isCorrect: false, explanation: "A length-1 middle segment actually matches the rule fine (maxWindow = 1). You need a case where end-vs-middle geometry changes the bound." },
          { id: "b", text: "An infected segment at the edge, like 111000, because an edge source can support a larger window than the segment length", isCorrect: true, explanation: "Correct. For an end segment of length L, the feasible window can be as large as 2L-1, not just L. This is exactly why the shortest-segment heuristic is incomplete." },
          { id: "c", text: "No infected cows, because the shortest segment length is undefined", isCorrect: false, explanation: "This is a real edge case, but it doesn't demonstrate the geometric flaw in the heuristic." },
          { id: "d", text: "Two separated infected segments, because windows can overlap across 0s", isCorrect: false, explanation: "Windows cannot cross uninfected cows. Segments remain independent." },
        ],
        followUp: {
          question: "Why does an even-length middle segment (like 1111 surrounded by 0s) impose a stricter limit than an odd-length one?",
          choices: [
            { id: "a", text: "Because a single source always creates an odd-sized footprint after D nights, so an even middle block cannot be a single full window", isCorrect: true, explanation: "Exactly. A single source after D nights covers 2D+1 cows, which is always odd. That parity mismatch forces the maximum feasible window for an even middle block to be at most L-1." },
            { id: "b", text: "Because even-length blocks mean two infections happened on the same night, which is impossible", isCorrect: false, explanation: "Multiple cows can become infected on the same night. The issue is footprint parity, not simultaneous infection." },
            { id: "c", text: "Because middle blocks grow more slowly than end blocks", isCorrect: false, explanation: "Spread speed is uniform. The distinction is whether the block must be symmetric around a source (middle) or can start at the boundary (end)." },
            { id: "d", text: "Because an even block always requires exactly two sources", isCorrect: false, explanation: "Even blocks require at least two sources for some windows, but the exact number depends on the chosen feasible window size and the block length." },
          ],
        },
        hints: [
          "Look for a case where being on the edge changes what a single source can generate.",
          "Compare a middle block and an end block with the same length L.",
          "A source at an edge only needs to spread inward to match the observed block, so the feasible window can be larger than L.",
        ],
        coachNote: "EDGE-CASE DESIGN TRICK: Don't test random extremes first. Test the assumption your formula depends on. Here, the fragile assumptions are symmetry (middle vs edge) and parity (odd window sizes).",
      },
      {
        id: "step-6-plan",
        title: "Plan the Approach",
        category: "plan",
        stepNumber: 6,
        question: "Which algorithm plan correctly computes the minimum possible number of initially infected cows?",
        type: "single-choice",
        choices: [
          { id: "a", text: "Try every possible D from 0 to N, simulate infection from every subset of cows, and keep the minimum that matches", isCorrect: false, explanation: "This explodes combinatorially and ignores the segment structure that makes the problem tractable." },
          { id: "b", text: "Find all contiguous 1-block lengths, derive the largest feasible odd window from end/middle rules, then sum ceil(length / window) over blocks", isCorrect: true, explanation: "Correct. This plan directly matches the structural model: infer the largest valid footprint size, then count how many such footprints are needed per infected block." },
          { id: "c", text: "Greedily place a source at the center of every 1-block and expand until all 1s are explained", isCorrect: false, explanation: "End blocks and even middle blocks break that logic, and without first fixing the maximal feasible window, 'center' is not a reliable choice." },
          { id: "d", text: "Use binary search on the answer (number of initial cows) and check if that many sources can generate the bitstring", isCorrect: false, explanation: "It is much more natural to solve by deriving the hidden window size first. Binary searching the output adds complexity without simplifying the logic." },
        ],
        followUp: {
          question: "Why must we choose the largest feasible window (equivalently the largest feasible D) before counting sources?",
          choices: [
            { id: "a", text: "Because larger windows reduce or keep the same value of ceil(L / window) for every infected block", isCorrect: true, explanation: "Exactly. The source count per block is monotone nonincreasing in window size. So to minimize total sources, you want the largest window that is still valid for all blocks." },
            { id: "b", text: "Because the official solution always chooses the largest parameter first", isCorrect: false, explanation: "The correct reason is monotonicity of the per-block ceiling count, not 'because editorial'." },
            { id: "c", text: "Because larger windows guarantee no overlaps, which is required", isCorrect: false, explanation: "Overlaps are allowed. Larger windows are better because they cover more cows per source." },
            { id: "d", text: "Because the number of nights D is uniquely determined by the shortest segment", isCorrect: false, explanation: "Multiple D values can be feasible; we intentionally choose the maximum feasible one to minimize sources." },
          ],
        },
        hints: [
          "Your plan should infer a common window size first, not guess source locations directly.",
          "Use the tightest block constraint to cap the window, then count how many windows cover each block.",
          "The final formula is: sum over 1-blocks of ceil(blockLength / maxWindow).",
        ],
        coachNote: "OPTIMIZE THE HIDDEN PARAMETER FIRST: In inference problems, it's often easier to optimize a shared hidden parameter (like window size, radius, threshold) than to construct the exact objects (like source positions).",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // DECEMBER 2023, Problem 3 — Farmer John Actually Farms
  // ═══════════════════════════════════════════════════════════
  {
    id: "session-bronze-dec23-3",
    problemId: "usaco-bronze-dec23-3",
    steps: [
      {
        id: "step-1-classify",
        title: "Classify the Problem",
        category: "classify",
        stepNumber: 1,
        question: "Each plant has height h_i + d·a_i after d days, and t_i tells how many plants must be taller than plant i. What is the best classification?",
        type: "single-choice",
        choices: [
          { id: "a", text: "Sorting + math-logic, because t_i defines a target order and each adjacent order constraint becomes an inequality in d", isCorrect: true, explanation: "Correct. The target array gives a final ranking, so we sort by that target rank and convert 'must be taller' into strict linear inequalities in the day count d. The core work is interval/bound reasoning on d." },
          { id: "b", text: "Simulation, because plant heights change every day and we can just simulate until it works", isCorrect: false, explanation: "This assumes the earliest valid day is small enough to find by stepping day-by-day. But d can be large, and heights grow linearly. When values evolve linearly, algebraic inequalities are usually better than simulation." },
          { id: "c", text: "Graph traversal, because each plant has relations to taller and shorter plants", isCorrect: false, explanation: "The comparisons define an ordering constraint, not a connectivity question. There's no BFS/DFS objective here." },
          { id: "d", text: "Dynamic programming, because the best day for the first k plants builds from the first k-1 plants", isCorrect: false, explanation: "We are not minimizing a per-prefix objective; we are finding one global integer d satisfying all inequalities simultaneously. This is bound intersection, not DP." },
        ],
        followUp: {
          question: "What feature of the problem most strongly signals 'solve with inequalities on d' instead of simulation?",
          choices: [
            { id: "a", text: "The values t_i are a permutation, so the answer must be unique", isCorrect: false, explanation: "Many days may satisfy the same order. The key clue is linear growth formulas in d, not uniqueness." },
            { id: "b", text: "Each height is h_i + d·a_i, so pairwise order constraints are linear comparisons in one variable", isCorrect: true, explanation: "Exactly. Once every plant height is affine in d, 'plant X taller than Y' becomes a linear inequality. A single-variable inequality system is a strong signal to derive bounds, not simulate." },
            { id: "c", text: "The constraints are large, so all large-constraint problems are solved with sorting", isCorrect: false, explanation: "Sorting helps here because t_i encodes a target order, but the deeper reason is the inequality structure in d." },
            { id: "d", text: "Because USACO Problem 3 is usually greedy", isCorrect: false, explanation: "Contest position doesn't predict the algorithm. Always classify from the problem structure." },
          ],
        },
        hints: [
          "Try writing the height of one plant after d days explicitly.",
          "What happens if you compare two plants' heights after d days and move terms to one side?",
          "You get a strict linear inequality in d. That points to bounds/intersections, not simulation.",
        ],
        coachNote: "LINEAR-EVOLUTION PATTERN: If quantities change as 'initial + rate × time', compare them symbolically before coding. Many 'simulate over time' problems collapse into inequalities or intersections on time.",
      },
      {
        id: "step-2-identify-variables",
        title: "Identify Key Variables",
        category: "identify-variables",
        stepNumber: 2,
        question: "Which variables are essential for a clean and correct solution to Farmer John Actually Farms?",
        type: "single-choice",
        choices: [
          { id: "a", text: "Current heights after each simulated day for all plants, plus a visited set of seen rankings", isCorrect: false, explanation: "Heights can grow too large and the valid day may be far away. The problem is better captured by static plant parameters and bounds on d." },
          { id: "b", text: "A sorted list of plants by target rank and two global bounds (lo, hi) for feasible day values", isCorrect: true, explanation: "Correct. Sorting by target rank encodes the required final order, and each adjacent comparison updates a lower or upper bound on d." },
          { id: "c", text: "Only the fastest-growing plant and the tallest initial plant, since they determine the final answer", isCorrect: false, explanation: "Every adjacent target-order pair can add a tighter constraint. Ignoring the middle plants misses critical contradictions." },
          { id: "d", text: "An adjacency matrix of which plant should be taller than which other plant", isCorrect: false, explanation: "The target order is total, so adjacent comparisons in that order are sufficient and much cheaper." },
        ],
        followUp: {
          question: "Why are adjacent pairs in the target-sorted order enough to check, instead of all pairs?",
          choices: [
            { id: "a", text: "Because if every adjacent strict inequality in a total order holds, the whole order holds transitively", isCorrect: true, explanation: "Exactly. In a chain x1 > x2 > x3 > ... > xN, verifying each adjacent step implies every non-adjacent comparison. This cuts O(N^2) constraints down to O(N)." },
            { id: "b", text: "Because non-adjacent comparisons are always weaker and never matter", isCorrect: false, explanation: "Non-adjacent comparisons do matter logically, but they are already implied by adjacent ones when the order is total and strict." },
            { id: "c", text: "Because USACO guarantees no ties after sorting by t_i", isCorrect: false, explanation: "Distinct t_i gives a unique target order, but the sufficiency of adjacent checks comes from transitivity of strict inequalities." },
            { id: "d", text: "Because checking all pairs would overflow 64-bit integers", isCorrect: false, explanation: "The real issue is unnecessary work. Adjacency is enough for correctness and efficiency." },
          ],
        },
        hints: [
          "What does t_i actually tell you: a value, or a final rank/order?",
          "After sorting by target rank, what single variable do all comparisons depend on?",
          "Track a feasible interval for d: a lower bound and an upper bound.",
        ],
        coachNote: "ONE-VARIABLE CONSTRAINT SYSTEMS: When all conditions depend on the same unknown (here, d), your core state is often just the current feasible interval. Don't track evolving states if the problem can be reduced to bound updates.",
      },
      {
        id: "step-3-data-structures",
        title: "Choose Data Structures",
        category: "data-structures",
        stepNumber: 3,
        question: "What data structure choice best supports an O(N log N) solution across multiple test cases?",
        type: "single-choice",
        choices: [
          { id: "a", text: "A priority queue keyed by current height, updated day by day", isCorrect: false, explanation: "We are not simulating each day. The needed comparisons come from the target order and algebraic bounds, not repeated heap updates." },
          { id: "b", text: "A vector/array of structs (h, a, t) sorted by t, then a single pass updating bounds", isCorrect: true, explanation: "Correct. A compact struct per plant keeps all needed fields together. Sorting by t gives the target order, and then a linear scan handles all adjacent inequalities." },
          { id: "c", text: "A hash map from t_i to height-only, since growth rates are secondary", isCorrect: false, explanation: "a_i is central because the inequality slope determines whether a pair gives a lower bound, upper bound, or impossibility. You must store h and a together." },
          { id: "d", text: "A 2D DP table dp[i][d] tracking whether the first i plants can be valid by day d", isCorrect: false, explanation: "d can be huge, and the correct method avoids iterating over day values entirely." },
        ],
        followUp: {
          question: "Why is a struct/tuple per plant better than separate arrays once you sort by target rank?",
          choices: [
            { id: "a", text: "Because sorting one array automatically reorders all parallel arrays in most languages", isCorrect: false, explanation: "Parallel arrays do NOT stay synchronized unless you carefully sort indices. A struct prevents synchronization bugs." },
            { id: "b", text: "Because keeping h, a, and t bundled avoids mismatched reordering bugs when sorting", isCorrect: true, explanation: "Exactly. The sort key is t, but the inequality uses h and a. Bundling them ensures the correct h and a travel with their t during sorting." },
            { id: "c", text: "Because structs make integer division more accurate", isCorrect: false, explanation: "Division accuracy depends on formulas and types, not whether you used a struct." },
            { id: "d", text: "Because hash maps cannot store integers larger than 10^9 safely", isCorrect: false, explanation: "The issue is not integer storage; it's that sorting by rank and scanning is the natural operation here." },
          ],
        },
        hints: [
          "You need to sort plants by target rank t_i, but comparisons use h_i and a_i too.",
          "Think about how to keep all fields attached to the same plant during sorting.",
          "A vector of structs/tuples is the safest and simplest choice.",
        ],
        coachNote: "DATA COHESION RULE: If multiple fields always move together (id, value, rate, rank), store them together. Parallel arrays are fine for simple scans, but sorting often turns them into bug magnets.",
      },
      {
        id: "step-4-constraints",
        title: "Analyze Constraints",
        category: "constraints",
        stepNumber: 4,
        question: "The sum of N across test cases is up to 2·10^5, and h_i, a_i can be 10^9. Which approach is feasible and robust?",
        type: "single-choice",
        choices: [
          { id: "a", text: "Simulate d from 0 upward until the ranking matches, because Bronze answers are usually small", isCorrect: false, explanation: "The required day can be large. Constraint size and linear formulas suggest direct inequality solving instead." },
          { id: "b", text: "O(N log N) sorting plus O(N) bound intersection per test case, using 64-bit arithmetic", isCorrect: true, explanation: "Correct. Sorting by target rank dominates runtime, and one pass computes bounds. 64-bit integers are necessary because expressions like h + d·a can exceed 32-bit range." },
          { id: "c", text: "O(N^2) pairwise comparisons, since N is only 2·10^5 across all tests not per test", isCorrect: false, explanation: "(2·10^5)^2 is still enormous. The adjacency insight is what makes the solution fast enough." },
          { id: "d", text: "Binary search on d with an O(N log N) check each time", isCorrect: false, explanation: "Directly intersecting linear bounds is cleaner and avoids an extra log factor." },
        ],
        followUp: {
          question: "Why is 64-bit arithmetic required even though h_i and a_i each fit in 32-bit integers?",
          choices: [
            { id: "a", text: "Because sorting by t_i internally converts values to 64-bit", isCorrect: false, explanation: "The real risk comes from arithmetic in height comparisons, especially d·a_i and sums with h_i." },
            { id: "b", text: "Because terms like d·a_i and h_i + d·a_i can exceed 2^31−1 when d is large", isCorrect: true, explanation: "Exactly. Even if h_i and a_i fit in 32-bit, multiplying by a potentially large day count can overflow." },
            { id: "c", text: "Because t_i values can be up to 10^9 and cannot fit in int", isCorrect: false, explanation: "t_i is a permutation of 0..N−1. The overflow concern is the height-growth arithmetic, not target ranks." },
            { id: "d", text: "Because division in the bound formulas requires floating point, which is 64-bit", isCorrect: false, explanation: "You should use integer arithmetic with careful floor/ceil handling for strict inequalities." },
          ],
        },
        hints: [
          "Compare O(N^2) vs O(N log N) at N = 200,000.",
          "Do you really need to test many day values, or can you solve for d symbolically?",
          "Watch for overflow in expressions involving d * a_i.",
        ],
        coachNote: "SYMBOLIC OVER NUMERIC ITERATION: If a quantity is linear in time and constraints are large, solve symbolically before considering binary search or simulation. Always audit multiplication expressions for overflow.",
      },
      {
        id: "step-5-edge-cases",
        title: "Test Edge Cases",
        category: "edge-cases",
        stepNumber: 5,
        question: "Which edge case most commonly causes wrong answers in the inequality-bound approach?",
        type: "single-choice",
        choices: [
          { id: "a", text: "Two adjacent target-order plants with equal growth rates, where the initial order is wrong", isCorrect: true, explanation: "Correct. If two plants have the same growth rate, their height difference never changes. If they are in the wrong strict order initially, the target is impossible forever." },
          { id: "b", text: "A test case with N = 1, because sorting one item is undefined", isCorrect: false, explanation: "N = 1 is a trivial base case, not the subtle bug source." },
          { id: "c", text: "A plant with the largest t_i, because it should be checked against all others", isCorrect: false, explanation: "Adjacent checks in the sorted order already cover endpoints correctly." },
          { id: "d", text: "A case where the answer is 0, because lower-bound logic always forces d > 0", isCorrect: false, explanation: "Some inequalities are already satisfied at d = 0. The deeper bug is mishandling equal slopes or strict division bounds." },
        ],
        followUp: {
          question: "When converting a strict inequality into a lower bound on integer d, what subtle detail matters most?",
          choices: [
            { id: "a", text: "You can use floating point and round normally, since Bronze tolerates small errors", isCorrect: false, explanation: "One off-by-one on d can flip valid/invalid. Use exact integer arithmetic for strict inequalities." },
            { id: "b", text: "Strictness changes the rounding rule: d > x/y becomes d >= floor(x/y) + 1 (after sign handling)", isCorrect: true, explanation: "Exactly. The strict '>' is the trap. You must convert to an integer lower bound carefully." },
            { id: "c", text: "You should always use ceil for lower bounds, regardless of sign", isCorrect: false, explanation: "Sign and inequality direction matter. Blindly applying ceil can produce incorrect bounds." },
            { id: "d", text: "The rounding detail only matters when heights are equal initially", isCorrect: false, explanation: "It matters whenever the bound is near an integer, even if initial heights differ." },
          ],
        },
        hints: [
          "Ask what happens if two plants grow at exactly the same rate.",
          "If their slopes are equal, can the ordering ever change over time?",
          "Strict inequalities and integer division are the main off-by-one trap.",
        ],
        coachNote: "INEQUALITY BUG CHECKLIST: For every pair constraint, separate the cases by slope sign (>, =, <) before doing any division. Then handle strict vs non-strict rounding carefully. Most wrong answers in algebraic CP problems come from skipping this case split.",
      },
      {
        id: "step-6-plan",
        title: "Plan the Approach",
        category: "plan",
        stepNumber: 6,
        question: "Which step-by-step plan correctly finds the minimum valid day or reports impossibility?",
        type: "single-choice",
        choices: [
          { id: "a", text: "Sort plants by current height, then repeatedly swap out-of-order neighbors until the target t_i order appears", isCorrect: false, explanation: "Days are global and heights change continuously. The correct variable is d, not a sequence of swaps." },
          { id: "b", text: "Sort by target rank t_i, derive lower/upper bounds on d from each adjacent pair inequality, intersect all bounds, and return the smallest feasible integer d", isCorrect: true, explanation: "Correct. This directly matches the problem structure: one unknown day d and many linear constraints. Intersecting the bounds gives the full feasible set." },
          { id: "c", text: "For each day d up to N, compute all heights, sort them, and stop at the first day matching the target ranks", isCorrect: false, explanation: "The answer is not bounded by N. This also wastes work by recomputing full rankings instead of using pairwise inequalities." },
          { id: "d", text: "Binary search the final tallest plant and infer d from that height", isCorrect: false, explanation: "One plant's final height doesn't determine all others. You need a global feasibility interval for d." },
        ],
        followUp: {
          question: "Why does intersecting adjacent-pair bounds produce the minimum valid day directly?",
          choices: [
            { id: "a", text: "Because each adjacent pair contributes a necessary condition on d, and all must hold simultaneously in the same total order", isCorrect: true, explanation: "Exactly. Each adjacent inequality is required, and together they are sufficient. Their intersection is the set of all valid days, so the minimum valid day is the smallest integer in that set." },
            { id: "b", text: "Because the first adjacent pair always determines the answer and the rest just verify it", isCorrect: false, explanation: "Any pair can provide the tightest bound. Contradictions often come from different pairs." },
            { id: "c", text: "Because the bounds are independent across test cases, we can cache them", isCorrect: false, explanation: "Bounds are test-case specific. Caching is unrelated to why the interval method works." },
            { id: "d", text: "Because sorting by t_i guarantees d is monotonic with plant index", isCorrect: false, explanation: "d is a single global day, not an index-dependent variable. Sorting organizes constraints; it does not create index-based monotonicity." },
          ],
        },
        hints: [
          "Turn 'plant X must be taller than plant Y' into an inequality in d.",
          "Do this only for adjacent plants after sorting by target rank.",
          "Maintain one lower bound and one upper bound for d; if they cross, answer is -1.",
        ],
        coachNote: "BOUNDS INTERSECTION PATTERN: When many conditions constrain one integer variable, don't search the variable — build its feasible interval. Update a global lower bound and upper bound, and check emptiness at the end. This pattern appears often in scheduling, growth, and threshold problems.",
      },
    ],
  },
];

// ─── Helper functions ────────────────────────────────────────

export function getBronzeSessionById(id: string): SessionTemplate | undefined {
  return bronzeSessions.find((s) => s.id === id);
}

export function getBronzeSessionByProblemId(problemId: string): SessionTemplate | undefined {
  return bronzeSessions.find((s) => s.problemId === problemId);
}
