import Link from "next/link";
import { problems } from "@/data";

const bronzeProblems = problems.filter((p) => p.division === "bronze");

const diffLabel = (d: number) =>
  d === 1 ? "Easy" : d === 2 ? "Normal" : "Hard";
const diffColor = (d: number) =>
  d === 1 ? "#22c55e" : d === 2 ? "#f59e0b" : "#ef4444";

export default function BronzeLibraryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: "var(--muted)" }}>
        <Link href="/library" className="hover:underline">Library</Link>
        <span>/</span>
        <span style={{ color: "var(--bronze)" }} className="font-medium">Bronze</span>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <span
          className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
          style={{ background: "var(--bronze-bg)", color: "var(--bronze)" }}
        >
          Bronze
        </span>
        <h1 className="text-3xl font-bold">Problems</h1>
      </div>
      <p className="mb-8" style={{ color: "var(--muted)" }}>
        Pick a problem. Algo-Coach guides your reasoning step-by-step before you code.
      </p>

      {/* Problem List */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        {bronzeProblems.map((problem, i) => (
          <div
            key={problem.id}
            className="flex items-center justify-between gap-4 px-6 py-4 transition-colors"
            style={{
              background: "var(--card)",
              borderTop: i > 0 ? "1px solid var(--border)" : "none",
            }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-1">
                <h3 className="font-semibold text-base truncate">{problem.title}</h3>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
                  style={{ color: diffColor(problem.difficulty), background: `color-mix(in srgb, ${diffColor(problem.difficulty)} 12%, transparent)` }}
                >
                  {diffLabel(problem.difficulty)}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {problem.concepts.map((c) => (
                  <span
                    key={c}
                    className="text-xs px-2 py-0.5 rounded-md font-medium"
                    style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}
                  >
                    {c.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/session/bronze/${problem.id}`}
              className="px-4 py-2 rounded-full text-white text-sm font-semibold transition hover:opacity-90 shrink-0"
              style={{ background: "var(--accent)" }}
            >
              Start
            </Link>
          </div>
        ))}

        {bronzeProblems.length === 0 && (
          <div className="px-6 py-12 text-center" style={{ color: "var(--muted)" }}>
            No problems yet. Check back soon!
          </div>
        )}
      </div>
    </div>
  );
}
