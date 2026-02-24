"use client";

import Link from "next/link";

const FEATURES = [
  {
    icon: "🧠",
    title: "Guided Reasoning",
    desc: "Step-by-step MCQ sessions that build your problem-solving instincts before you touch code.",
  },
  {
    icon: "🔒",
    title: "Gated IDE",
    desc: "Prove you understand the approach first. The code editor unlocks only after you reason through the problem.",
  },
  {
    icon: "⚡",
    title: "Pattern Drills",
    desc: "Quick-fire exercises to sharpen pattern recognition and algorithm classification speed.",
  },
  {
    icon: "📊",
    title: "Track Weak Spots",
    desc: "See exactly which concepts need work. Your mistake journal shows recurring gaps over time.",
  },
];

const DIVISIONS = [
  { label: "Bronze", color: "var(--bronze)", bg: "var(--bronze-bg)", href: "/library/bronze", ready: true },
  { label: "Silver", color: "var(--silver)", bg: "var(--silver-bg)", href: "/library/silver", ready: false },
  { label: "Gold", color: "var(--gold)", bg: "var(--gold-bg)", href: "/library/gold", ready: false },
];

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero-gradient">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-20 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Think before
            <br />
            you{" "}
            <span style={{ color: "var(--accent)" }}>code.</span>
          </h1>

          <p
            className="text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            The interactive USACO training platform that teaches you{" "}
            <strong style={{ color: "var(--foreground)" }}>how to reason</strong>{" "}
            through problems — not just how to solve them.
          </p>

          <Link
            href="/library/bronze"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--accent)" }}
          >
            Start Training
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-px">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <p
          className="text-sm font-semibold uppercase tracking-widest mb-3 text-center"
          style={{ color: "var(--accent)" }}
        >
          How It Works
        </p>
        <h2 className="text-3xl font-bold text-center mb-4">
          Every platform gives you problems.
          <br />
          We teach you how to think.
        </h2>
        <p className="text-center max-w-lg mx-auto mb-14" style={{ color: "var(--muted)" }}>
          A 6-step guided reasoning loop — classify, model, choose algorithm,
          estimate complexity, test edges, plan — all through interactive
          multiple choice. No typing, no guessing.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 transition-colors"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <span className="text-2xl mb-3 block">{f.icon}</span>
              <h3 className="text-base font-semibold mb-1.5">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divisions ── */}
      <section
        className="py-20"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3 text-center"
            style={{ color: "var(--accent)" }}
          >
            Divisions
          </p>
          <h2 className="text-3xl font-bold text-center mb-12">
            Bronze → Silver → Gold
          </h2>

          <div className="grid sm:grid-cols-3 gap-5">
            {DIVISIONS.map((d) => (
              <div
                key={d.label}
                className="rounded-2xl p-6 text-center"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
                  style={{ background: d.bg, color: d.color }}
                >
                  {d.label}
                </span>
                <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
                  {d.label === "Bronze" && "Simulation, sorting, ad-hoc, brute force, complete search."}
                  {d.label === "Silver" && "Binary search, prefix sums, DFS/BFS, greedy algorithms."}
                  {d.label === "Gold" && "Dynamic programming, segment trees, advanced graphs."}
                </p>
                {d.ready ? (
                  <Link
                    href={d.href}
                    className="inline-block text-sm font-semibold px-5 py-2 rounded-full text-white transition hover:opacity-90"
                    style={{ background: d.color }}
                  >
                    Browse Problems
                  </Link>
                ) : (
                  <span
                    className="inline-block text-sm font-medium px-5 py-2 rounded-full"
                    style={{ background: "var(--border)", color: "var(--muted)" }}
                  >
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="hero-gradient">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to level up?</h2>
          <p className="mb-8" style={{ color: "var(--muted)" }}>
            Free. Open source. Built by a Silver student who wishes this existed.
          </p>
          <Link
            href="/library/bronze"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--accent)" }}
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
