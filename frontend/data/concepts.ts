import { Concept } from "./types";

export const concepts: Concept[] = [
  // ═══════════════════════════════════════════════════════════
  // BRONZE — Fundamentals
  // ═══════════════════════════════════════════════════════════
  {
    id: "time-complexity",
    name: "Time Complexity",
    division: "bronze",
    description:
      "Analyze how runtime grows with input size. Essential for deciding if a brute-force approach will pass.",
    prerequisites: [],
    keyIdeas: [
      "O(N), O(N²), O(N log N) — know what each means in practice",
      "~10⁸ operations per second is the rough rule of thumb",
      "If N ≤ 1000 then O(N²) is fine; if N ≤ 10⁵ then you need O(N log N) or better",
      "Always check constraints BEFORE choosing an approach",
    ],
  },
  {
    id: "simulation",
    name: "Simulation",
    division: "bronze",
    description:
      "Directly simulate the process described in the problem, step by step. The most common Bronze technique.",
    prerequisites: ["time-complexity"],
    keyIdeas: [
      "Read the problem literally and do exactly what it says",
      "Use loops to repeat the described process",
      "Watch for off-by-one errors in iteration bounds",
      "Check if simulation is fast enough given constraints",
    ],
  },
  {
    id: "sorting",
    name: "Sorting",
    division: "bronze",
    description:
      "Rearrange data to make it easier to process. Many problems become simple once the input is sorted.",
    prerequisites: ["time-complexity"],
    keyIdeas: [
      "Built-in sort is O(N log N) — almost always fast enough",
      "Custom comparators let you sort by any criteria",
      "Sorting often turns an O(N²) scan into an O(N) scan",
      "Consider: does the problem get easier if the data were sorted?",
    ],
  },
  {
    id: "complete-search",
    name: "Complete Search (Brute Force)",
    division: "bronze",
    description:
      "Try all possible solutions and check each one. Works when the search space is small enough.",
    prerequisites: ["time-complexity"],
    keyIdeas: [
      "Enumerate all possibilities with nested loops or recursion",
      "Only works if total possibilities ≤ ~10⁷",
      "Always calculate the search space size BEFORE coding",
      "Often the intended Bronze solution — don't overcomplicate",
    ],
  },
  {
    id: "rectangle-geometry",
    name: "Rectangle Geometry",
    division: "bronze",
    description:
      "Work with axis-aligned rectangles: intersection, union, containment. A recurring Bronze theme.",
    prerequisites: ["simulation"],
    keyIdeas: [
      "Two rectangles overlap if and only if they overlap on both axes",
      "Intersection: max of left edges, min of right edges (same for top/bottom)",
      "If intersection width or height ≤ 0, no overlap",
      "Area = width × height — sounds obvious but watch for negative values",
    ],
  },
  {
    id: "strings-basic",
    name: "String Manipulation",
    division: "bronze",
    description:
      "Process and transform strings character by character. Builds foundations for harder string problems later.",
    prerequisites: ["simulation"],
    keyIdeas: [
      "Iterate character by character to build or check patterns",
      "Frequency counting: use an array of size 26 for lowercase letters",
      "Palindrome check: compare from both ends inward",
      "String comparison is O(length) — factor this into complexity",
    ],
  },
  {
    id: "arrays-maps",
    name: "Arrays & Maps",
    division: "bronze",
    description:
      "Core data structures for storing and looking up data. Maps give O(1) lookup by key.",
    prerequisites: [],
    keyIdeas: [
      "Arrays: O(1) access by index, O(N) search by value",
      "Maps/objects: O(1) lookup, insert, delete by key",
      "Use a map when you need to count frequencies or check membership",
      "Sets are maps without values — use for 'have I seen this before?'",
    ],
  },
  {
    id: "ad-hoc",
    name: "Ad-hoc / Implementation",
    division: "bronze",
    description:
      "Problems with no standard algorithm — you need to carefully read and implement the described logic.",
    prerequisites: ["simulation", "arrays-maps"],
    keyIdeas: [
      "No trick or known algorithm — just careful implementation",
      "Read the problem statement 2-3 times before coding",
      "Break the problem into small, testable functions",
      "These problems test attention to detail, not algorithm knowledge",
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SILVER — Intermediate Algorithms
  // ═══════════════════════════════════════════════════════════
  {
    id: "prefix-sums",
    name: "Prefix Sums",
    division: "silver",
    description:
      "Precompute cumulative sums so any range sum is answered in O(1). The gateway to Silver thinking.",
    prerequisites: ["arrays-maps", "time-complexity"],
    keyIdeas: [
      "prefix[i] = sum of elements from index 0 to i-1",
      "Range sum [l, r] = prefix[r+1] - prefix[l]",
      "Build in O(N), query in O(1) — huge speedup over naive O(N) per query",
      "Works for 2D grids too (2D prefix sums)",
    ],
  },
  {
    id: "binary-search",
    name: "Binary Search",
    division: "silver",
    description:
      "Efficiently find values in sorted data or search for the answer itself. Cuts O(N) to O(log N).",
    prerequisites: ["sorting", "time-complexity"],
    keyIdeas: [
      "Only works on sorted/monotonic data",
      "Halve the search space each step → O(log N)",
      "Binary search on the answer: 'what's the minimum X such that condition holds?'",
      "Watch for off-by-one: use lo ≤ hi vs lo < hi carefully",
    ],
  },
  {
    id: "two-pointers",
    name: "Two Pointers",
    division: "silver",
    description:
      "Use two indices moving through sorted data to find pairs or subarrays efficiently.",
    prerequisites: ["sorting", "prefix-sums"],
    keyIdeas: [
      "Works on sorted arrays or when you need to find pairs with a property",
      "One pointer moves forward, the other catches up — O(N) total",
      "Sliding window is a variant: maintain a window [l, r] and expand/shrink",
      "Often replaces O(N²) nested loops with O(N)",
    ],
  },
  {
    id: "greedy",
    name: "Greedy Algorithms",
    division: "silver",
    description:
      "Make the locally optimal choice at each step. Works when local optima lead to a global optimum.",
    prerequisites: ["sorting", "time-complexity"],
    keyIdeas: [
      "Sort the input, then process greedily (most common pattern)",
      "The hard part: proving the greedy choice is correct",
      "If you can't prove it, it's probably not greedy — consider DP",
      "Common: interval scheduling, activity selection, coin change (sometimes)",
    ],
  },
  {
    id: "dfs",
    name: "Depth-First Search (DFS)",
    division: "silver",
    description:
      "Explore graphs by going as deep as possible before backtracking. Finds connected components, cycles, paths.",
    prerequisites: ["arrays-maps", "complete-search"],
    keyIdeas: [
      "Use recursion or an explicit stack",
      "Mark nodes as visited to avoid infinite loops",
      "Finds connected components: run DFS from each unvisited node",
      "Can detect cycles in directed graphs with 3-color marking",
    ],
  },
  {
    id: "bfs",
    name: "Breadth-First Search (BFS)",
    division: "silver",
    description:
      "Explore graphs level by level. Finds shortest paths in unweighted graphs.",
    prerequisites: ["dfs"],
    keyIdeas: [
      "Use a queue (FIFO) — process nodes in order of discovery",
      "Gives shortest path in unweighted graphs",
      "Grid BFS: treat each cell as a node, 4-directional neighbors as edges",
      "Time complexity: O(V + E) where V = vertices, E = edges",
    ],
  },
  {
    id: "graph-representation",
    name: "Graph Representation",
    division: "silver",
    description:
      "Model problems as graphs with adjacency lists. Many USACO problems are graphs in disguise.",
    prerequisites: ["arrays-maps"],
    keyIdeas: [
      "Adjacency list: array of arrays, adj[u] = list of neighbors of u",
      "Directed vs undirected: add edge both ways for undirected",
      "Grid problems are implicit graphs — no need to build adj list",
      "If the problem says 'connections' or 'paths' — think graph",
    ],
  },
  {
    id: "flood-fill",
    name: "Flood Fill",
    division: "silver",
    description:
      "DFS/BFS on a grid to find connected regions. Very common in Silver grid problems.",
    prerequisites: ["dfs", "bfs"],
    keyIdeas: [
      "Start from a cell, visit all reachable cells of the same type",
      "Use a visited array or modify the grid in-place",
      "Count components = number of times you start a new flood fill",
      "4-directional vs 8-directional — read the problem carefully",
    ],
  },
  {
    id: "custom-sorting",
    name: "Custom Sorting & Comparators",
    division: "silver",
    description:
      "Sort objects by custom criteria. Essential when problems involve sorting by multiple keys.",
    prerequisites: ["sorting"],
    keyIdeas: [
      "Comparator function: return negative, zero, or positive",
      "Sort by multiple keys: compare first key, break ties with second",
      "Coordinate compression: sort unique values and map to indices 0..N-1",
      "Stable sort preserves original order for equal elements",
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // GOLD — Advanced Algorithms
  // ═══════════════════════════════════════════════════════════
  {
    id: "dp-intro",
    name: "Dynamic Programming (Intro)",
    division: "gold",
    description:
      "Solve problems by breaking them into overlapping subproblems. The most important Gold topic.",
    prerequisites: ["complete-search", "prefix-sums", "greedy"],
    keyIdeas: [
      "Define a state: dp[i] = answer to subproblem involving first i elements",
      "Find the recurrence: how does dp[i] relate to smaller subproblems?",
      "Base case: what's the answer for the smallest subproblem?",
      "If greedy doesn't work and brute force is too slow — think DP",
    ],
  },
  {
    id: "dp-knapsack",
    name: "Knapsack DP",
    division: "gold",
    description:
      "Choose items with given weights/values to maximize value within a capacity. Classic DP pattern.",
    prerequisites: ["dp-intro"],
    keyIdeas: [
      "0/1 knapsack: dp[i][w] = max value using first i items with capacity w",
      "Unbounded knapsack: dp[w] = max value with capacity w (items reusable)",
      "Optimize space: use 1D array, iterate capacity backwards for 0/1",
      "Variant: subset sum — can we reach exactly this total?",
    ],
  },
  {
    id: "dp-ranges",
    name: "Range / Interval DP",
    division: "gold",
    description:
      "DP over contiguous subarrays or intervals. Used when merging adjacent elements.",
    prerequisites: ["dp-intro"],
    keyIdeas: [
      "State: dp[l][r] = answer for the subarray from l to r",
      "Try every split point k in [l, r-1]",
      "Iterate by interval length (smallest to largest)",
      "Examples: matrix chain multiplication, optimal BST, merging stones",
    ],
  },
  {
    id: "shortest-paths",
    name: "Shortest Paths (Dijkstra)",
    division: "gold",
    description:
      "Find shortest paths in weighted graphs. Dijkstra's algorithm is the workhorse.",
    prerequisites: ["bfs", "graph-representation"],
    keyIdeas: [
      "Dijkstra: greedy BFS with a priority queue — O((V+E) log V)",
      "Only works with non-negative edge weights",
      "For negative weights: use Bellman-Ford O(VE)",
      "USACO Gold loves Dijkstra with modifications",
    ],
  },
  {
    id: "dsu",
    name: "Disjoint Set Union (DSU)",
    division: "gold",
    description:
      "Efficiently track which elements belong to the same group. Supports union and find in near O(1).",
    prerequisites: ["graph-representation", "dfs"],
    keyIdeas: [
      "Two operations: find(x) returns the group leader, union(x,y) merges groups",
      "Path compression + union by rank → nearly O(1) per operation",
      "Use when: 'merge these groups' or 'are these in the same group?'",
      "Great for Kruskal's MST and online connectivity queries",
    ],
  },
  {
    id: "trees",
    name: "Tree Algorithms",
    division: "gold",
    description:
      "DFS on trees, LCA, subtree queries, tree DP. Trees are everywhere in Gold.",
    prerequisites: ["dfs", "graph-representation"],
    keyIdeas: [
      "A tree is a connected graph with N nodes and N-1 edges",
      "Root the tree and think in terms of parent/child relationships",
      "Subtree size via DFS: sz[u] = 1 + sum of sz[child]",
      "Tree DP: compute dp[u] from dp[children] during DFS",
    ],
  },
  {
    id: "binary-indexed-tree",
    name: "Binary Indexed Tree (BIT / Fenwick)",
    division: "gold",
    description:
      "Data structure for point updates and prefix queries in O(log N). Simpler to code than segment trees.",
    prerequisites: ["prefix-sums", "binary-search"],
    keyIdeas: [
      "Supports: point update + prefix sum query in O(log N)",
      "Uses clever bit manipulation to navigate the tree",
      "Easier to implement than segment tree for most prefix-sum problems",
      "Can be extended to support range updates with range queries",
    ],
  },
  {
    id: "segment-tree",
    name: "Segment Tree",
    division: "gold",
    description:
      "Flexible data structure for range queries and updates. Handles min, max, sum, and more.",
    prerequisites: ["binary-indexed-tree"],
    keyIdeas: [
      "Build in O(N), query/update in O(log N)",
      "Each node stores the answer for a range",
      "Lazy propagation for range updates",
      "Use when BIT isn't flexible enough (e.g., range min/max)",
    ],
  },
  {
    id: "minimum-spanning-tree",
    name: "Minimum Spanning Tree",
    division: "gold",
    description:
      "Find the cheapest set of edges connecting all nodes. Kruskal's (sort + DSU) is the standard approach.",
    prerequisites: ["dsu", "sorting", "greedy"],
    keyIdeas: [
      "Kruskal's: sort edges by weight, add if it doesn't form a cycle (use DSU)",
      "Prim's: grow tree from a node using priority queue (like Dijkstra)",
      "MST has exactly N-1 edges for N nodes",
      "If the problem says 'minimum cost to connect' — think MST",
    ],
  },
  {
    id: "topological-sort",
    name: "Topological Sort",
    division: "gold",
    description:
      "Order nodes in a DAG so every edge goes from earlier to later. Used for dependency ordering.",
    prerequisites: ["dfs", "graph-representation"],
    keyIdeas: [
      "Only works on Directed Acyclic Graphs (DAGs)",
      "Kahn's algorithm: repeatedly remove nodes with in-degree 0",
      "DFS approach: reverse of the finish-time order",
      "If the problem has dependencies or prerequisites — think topo sort",
    ],
  },
];

// ─── Helper functions ────────────────────────────────────────

/** Get all concepts for a specific division */
export function getConceptsByDivision(division: string): Concept[] {
  return concepts.filter((c) => c.division === division);
}

/** Get a single concept by ID */
export function getConceptById(id: string): Concept | undefined {
  return concepts.find((c) => c.id === id);
}

/** Get prerequisite concepts (resolved to full objects) */
export function getPrerequisites(conceptId: string): Concept[] {
  const concept = getConceptById(conceptId);
  if (!concept) return [];
  return concept.prerequisites
    .map((preId) => getConceptById(preId))
    .filter((c): c is Concept => c !== undefined);
}

/** Get concepts that depend on this concept */
export function getDependents(conceptId: string): Concept[] {
  return concepts.filter((c) => c.prerequisites.includes(conceptId));
}
