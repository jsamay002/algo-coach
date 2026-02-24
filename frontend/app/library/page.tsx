import Link from "next/link";

const DIVISIONS = [
  {
    slug: "bronze",
    label: "Bronze",
    description: "Fundamentals: simulation, sorting, ad-hoc reasoning, complete search.",
    concepts: 12,
    problems: 5,
    color: "var(--bronze)",
    bg: "var(--bronze-bg)",
    ready: true,
  },
  {
    slug: "silver",
    label: "Silver",
    description: "Binary search, prefix sums, DFS/BFS, greedy, two pointers.",
    concepts: 9,
    problems: 3,
    color: "var(--silver)",
    bg: "var(--silver-bg)",
    ready: false,
  },
  {
    slug: "gold",
    label: "Gold",
    description: "Dynamic programming, segment trees, advanced graph algorithms.",
    concepts: 5,
    problems: 2,
    color: "var(--gold)",
    bg: "var(--gold-bg)",
    ready: false,
  },
];

export default function LibraryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Problem Library</h1>
      <p className="mb-10" style={{ color: "var(--muted)" }}>
        Choose a division to browse guided sessions and problems.
      </p>

      <div className="grid gap-4">
        {DIVISIONS.map((div) => (
          <div
            key={div.slug}
            className="rounded-2xl p-6 flex items-center justify-between transition-colors"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-start gap-4">
              <span
                className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mt-0.5 shrink-0"
                style={{ background: div.bg, color: div.color }}
              >
                {div.label}
              </span>
              <div>
                <h2 className="text-lg font-semibold">{div.label}</h2>
                <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
                  {div.description}
                </p>
                <div className="flex gap-4 mt-2">
                  <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
                    {div.concepts} concepts
                  </span>
                  <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
                    {div.problems} problems
                  </span>
                </div>
              </div>
            </div>

            {div.ready ? (
              <Link
                href={`/library/${div.slug}`}
                className="px-5 py-2.5 rounded-full text-white text-sm font-semibold transition hover:opacity-90 shrink-0"
                style={{ background: div.color }}
              >
                Browse
              </Link>
            ) : (
              <span
                className="px-5 py-2.5 rounded-full text-sm font-medium shrink-0"
                style={{ background: "var(--border)", color: "var(--muted)" }}
              >
                Coming Soon
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
