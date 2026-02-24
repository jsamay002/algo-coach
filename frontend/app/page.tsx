"use client";

import Link from "next/link";
import { useState } from "react";

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

/* ── Interactive Demo Data ── */
const DEMO_STEPS = [
  {
    label: "Step 1 — Classify",
    question: "Farmer John has two fence segments on a number line: A→B and C→D. Find the total painted length (counting overlap once). What type of problem is this?",
    choices: [
      { text: "Graph traversal", correct: false, explanation: "There are no nodes or edges here — just intervals on a number line." },
      { text: "Interval / overlap calculation", correct: true, explanation: "Two segments on a number line with possible overlap — this is a classic interval problem." },
      { text: "Dynamic programming", correct: false, explanation: "No overlapping subproblems or optimal substructure. It's much simpler than DP." },
      { text: "Binary search", correct: false, explanation: "We're not searching for a value. We just need to compute a length." },
    ],
  },
  {
    label: "Step 2 — Identify Key Variables",
    question: "What are the key values you need to track to solve this?",
    choices: [
      { text: "Just the total of both lengths: (B−A) + (D−C)", correct: false, explanation: "This double-counts the overlap. You need to subtract the shared region." },
      { text: "The start/end of each segment and their overlap region", correct: true, explanation: "You need A, B, C, D and the overlap = max(0, min(B,D) − max(A,C)). Total = (B−A) + (D−C) − overlap." },
      { text: "The midpoints of both segments", correct: false, explanation: "Midpoints don't help calculate total coverage. You need endpoints and overlap." },
      { text: "The number of integer points in each segment", correct: false, explanation: "The problem asks for length, not discrete points. Overlap is about intervals, not counting." },
    ],
  },
  {
    label: "Step 3 — Test Edge Cases",
    question: "Which edge case could break a naive solution?",
    choices: [
      { text: "When both segments are the same", correct: false, explanation: "Same segments work fine — overlap equals the full length. Not a breaking edge case." },
      { text: "When segments don't overlap at all", correct: true, explanation: "If segments don't touch, overlap = max(0, ...) catches it. A naive subtraction without max(0,...) gives a negative overlap — wrong answer." },
      { text: "When A = 0", correct: false, explanation: "A = 0 is valid input but doesn't break the formula. The real trap is non-overlapping segments." },
      { text: "When segments are very long", correct: false, explanation: "With constraints ≤ 100, length isn't an issue. The logic trap is in overlap handling." },
    ],
  },
];

function InteractiveDemo() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const current = DEMO_STEPS[step];
  const isComplete = step >= DEMO_STEPS.length;

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
  };

  const handleNext = () => {
    setStep(step + 1);
    setSelected(null);
    setRevealed(false);
  };

  if (isComplete) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🔓</div>
        <h3 className="text-2xl font-bold mb-3">IDE Unlocked!</h3>
        <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
          You reasoned through the problem. Now you&apos;re ready to code.
          <br />
          <strong style={{ color: "var(--foreground)" }}>That&apos;s the Algo-Coach difference.</strong>
        </p>
        <Link
          href="/library/bronze"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "var(--accent)" }}
        >
          Try the Full Experience
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-8">
        {DEMO_STEPS.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                background: "var(--accent)",
                width: i < step ? "100%" : i === step && revealed ? "100%" : i === step ? "30%" : "0%",
              }}
            />
          </div>
        ))}
        {/* Lock icon at end */}
        <span className="text-lg" style={{ color: "var(--muted)" }}>🔒</span>
      </div>

      {/* Step label */}
      <p className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "var(--accent)" }}>
        {current.label}
      </p>

      {/* Question */}
      <p className="text-lg font-medium mb-6 leading-relaxed">
        {current.question}
      </p>

      {/* Choices */}
      <div className="grid gap-3 mb-6">
        {current.choices.map((choice, i) => {
          const isSelected = selected === i;
          const isCorrect = choice.correct;
          let borderColor = "var(--border)";
          let bg = "var(--card)";

          if (revealed) {
            if (isCorrect) {
              borderColor = "#22c55e";
              bg = "rgba(34,197,94,0.06)";
            } else if (isSelected && !isCorrect) {
              borderColor = "#ef4444";
              bg = "rgba(239,68,68,0.06)";
            }
          } else if (isSelected) {
            borderColor = "var(--accent)";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className="text-left px-5 py-4 rounded-xl transition-all text-base"
              style={{
                border: `2px solid ${borderColor}`,
                background: bg,
                cursor: revealed ? "default" : "pointer",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-sm mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold"
                  style={{
                    background: revealed && isCorrect ? "#22c55e" : revealed && isSelected ? "#ef4444" : "var(--border)",
                    color: revealed && (isCorrect || isSelected) ? "white" : "var(--muted)",
                    fontSize: "12px",
                  }}
                >
                  {revealed && isCorrect ? "✓" : revealed && isSelected ? "✗" : String.fromCharCode(65 + i)}
                </span>
                <div>
                  <span className="font-medium">{choice.text}</span>
                  {revealed && (isSelected || isCorrect) && (
                    <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>
                      {choice.explanation}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Next button */}
      {revealed && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-full text-white font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--accent)" }}
          >
            {step < DEMO_STEPS.length - 1 ? "Next Step →" : "Unlock IDE →"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Comparison Table ── */
function ComparisonSection() {
  const rows = [
    { feature: "Guided reasoning before code", usaco: false, codeforces: false, leetcode: false, algo: true },
    { feature: "Interactive MCQ (no typing)", usaco: false, codeforces: false, leetcode: false, algo: true },
    { feature: "IDE locked until you prove understanding", usaco: false, codeforces: false, leetcode: false, algo: true },
    { feature: "Pattern recognition drills", usaco: false, codeforces: false, leetcode: false, algo: true },
    { feature: "Mistake journal & weak area tracking", usaco: false, codeforces: false, leetcode: false, algo: true },
    { feature: "Free", usaco: true, codeforces: true, leetcode: false, algo: true },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
        <thead>
          <tr>
            <th className="py-4 pr-4 text-sm font-semibold" style={{ color: "var(--muted)" }}>Feature</th>
            <th className="py-4 px-4 text-sm font-semibold text-center" style={{ color: "var(--muted)" }}>USACO Guide</th>
            <th className="py-4 px-4 text-sm font-semibold text-center" style={{ color: "var(--muted)" }}>Codeforces</th>
            <th className="py-4 px-4 text-sm font-semibold text-center" style={{ color: "var(--muted)" }}>LeetCode</th>
            <th className="py-4 pl-4 text-sm font-bold text-center" style={{ color: "var(--accent)" }}>Algo-Coach</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderTop: "1px solid var(--border)" }}>
              <td className="py-3.5 pr-4 text-sm font-medium">{row.feature}</td>
              <td className="py-3.5 px-4 text-center text-lg">{row.usaco ? "✅" : "—"}</td>
              <td className="py-3.5 px-4 text-center text-lg">{row.codeforces ? "✅" : "—"}</td>
              <td className="py-3.5 px-4 text-center text-lg">{row.leetcode ? "✅" : "—"}</td>
              <td className="py-3.5 pl-4 text-center text-lg">{row.algo ? "✅" : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero-gradient">
        <div className="max-w-4xl mx-auto px-6 pt-28 pb-24 text-center">
          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight leading-[1.08] mb-8">
            Think before
            <br />
            you{" "}
            <span style={{ color: "var(--accent)" }}>code.</span>
          </h1>

          <p
            className="text-xl sm:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            The interactive USACO training platform that teaches you{" "}
            <strong style={{ color: "var(--foreground)" }}>how to reason</strong>{" "}
            through problems — not just how to solve them.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/library/bronze"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "var(--accent)" }}
            >
              Start Training
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="mt-px">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-[1.02]"
              style={{ border: "2px solid var(--border)", color: "var(--foreground)" }}
            >
              Try a Demo
            </a>
          </div>
        </div>
      </section>

      {/* ── LIVE DEMO — THE DIFFERENTIATOR ── */}
      <section id="demo" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-3xl mx-auto px-6 py-24">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-4 text-center"
            style={{ color: "var(--accent)" }}
          >
            Try It Now
          </p>
          <h2 className="text-4xl font-bold text-center mb-3">
            See the difference in 30 seconds
          </h2>
          <p className="text-center text-lg mb-12" style={{ color: "var(--muted)" }}>
            Other platforms give you a problem and say &quot;go.&quot; We walk you through
            the thinking process. Click through a real session below.
          </p>

          <div
            className="rounded-2xl p-8 sm:p-10"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
            }}
          >
            <InteractiveDemo />
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="max-w-5xl mx-auto px-6 py-24" style={{ borderTop: "1px solid var(--border)" }}>
        <p
          className="text-sm font-bold uppercase tracking-widest mb-4 text-center"
          style={{ color: "var(--accent)" }}
        >
          How It Works
        </p>
        <h2 className="text-4xl font-bold text-center mb-5">
          Every platform gives you problems.
          <br />
          We teach you how to think.
        </h2>
        <p className="text-center text-lg max-w-xl mx-auto mb-16" style={{ color: "var(--muted)" }}>
          A 6-step guided reasoning loop — classify, model, choose algorithm,
          estimate complexity, test edges, plan — all through interactive
          multiple choice. No typing, no guessing.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-8 transition-colors"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <span className="text-3xl mb-4 block">{f.icon}</span>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto px-6 py-24">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-4 text-center"
            style={{ color: "var(--accent)" }}
          >
            Why Algo-Coach
          </p>
          <h2 className="text-4xl font-bold text-center mb-12">
            What others don&apos;t have
          </h2>
          <div
            className="rounded-2xl p-8"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <ComparisonSection />
          </div>
        </div>
      </section>

      {/* ── Divisions ── */}
      <section
        className="py-24"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-4 text-center"
            style={{ color: "var(--accent)" }}
          >
            Divisions
          </p>
          <h2 className="text-4xl font-bold text-center mb-14">
            Bronze → Silver → Gold
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {DIVISIONS.map((d) => (
              <div
                key={d.label}
                className="rounded-2xl p-8 text-center"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  className="inline-block text-sm font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5"
                  style={{ background: d.bg, color: d.color }}
                >
                  {d.label}
                </span>
                <p className="text-base mb-6" style={{ color: "var(--muted)" }}>
                  {d.label === "Bronze" && "Simulation, sorting, ad-hoc, brute force, complete search."}
                  {d.label === "Silver" && "Binary search, prefix sums, DFS/BFS, greedy algorithms."}
                  {d.label === "Gold" && "Dynamic programming, segment trees, advanced graphs."}
                </p>
                {d.ready ? (
                  <Link
                    href={d.href}
                    className="inline-block text-base font-semibold px-6 py-2.5 rounded-full text-white transition hover:opacity-90"
                    style={{ background: d.color }}
                  >
                    Browse Problems
                  </Link>
                ) : (
                  <span
                    className="inline-block text-base font-medium px-6 py-2.5 rounded-full"
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
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold mb-5">Ready to level up?</h2>
          <p className="text-lg mb-10" style={{ color: "var(--muted)" }}>
            Free. Open source. Built by a Silver student who wishes this existed.
          </p>
          <Link
            href="/library/bronze"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "var(--accent)" }}
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
