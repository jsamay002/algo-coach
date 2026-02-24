"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import {
  getBronzeProblemById,
  getBronzeSessionByProblemId,
} from "@/data/bronze";
import type {
  Choice,
  Problem,
} from "@/data/types";
import { XP_CONFIG } from "@/data/types";

/* ── XP helpers ────────────────────────────────────────────── */
function xpForAttempt(n: number) {
  return n === 1 ? XP_CONFIG.firstTryCorrect : n === 2 ? XP_CONFIG.secondTryCorrect : n === 3 ? XP_CONFIG.thirdTryCorrect : XP_CONFIG.fourthTryCorrect;
}
function xpForFollowUp(n: number) {
  return n === 1 ? XP_CONFIG.followUpCorrect + XP_CONFIG.followUpFirstTry : XP_CONFIG.followUpCorrect;
}
function shuffle<T>(a: T[]): T[] {
  const c = [...a]; for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; } return c;
}

type Phase = "main" | "wrong" | "followup" | "followup-wrong" | "coach";
type StepResult = { mainAttempts: number; fuAttempts: number; xp: number };

/* ── animation classes ─────────────────────────────────────── */
const aFadeIn = { animation: "fadeIn .3s ease-out" };
const aSlideUp = { animation: "slideUp .35s ease-out" };

export default function SessionPage({ params }: { params: Promise<{ division: string; problemId: string }> }) {
  const { division, problemId } = use(params);
  const problem = useMemo(() => getBronzeProblemById(problemId), [problemId]);
  const session = useMemo(() => problem ? getBronzeSessionByProblemId(problem.id) : undefined, [problem]);

  const [si, setSi] = useState(0);              // step index
  const [phase, setPhase] = useState<Phase>("main");
  const [selId, setSelId] = useState<string|null>(null);
  const [eliminated, setEliminated] = useState<string[]>([]);
  const [mAttempts, setMAttempts] = useState(0);
  const [fuSelId, setFuSelId] = useState<string|null>(null);
  const [fuEliminated, setFuEliminated] = useState<string[]>([]);
  const [fuAttempts, setFuAttempts] = useState(0);
  const [hints, setHints] = useState(0);
  const [results, setResults] = useState<Record<string, StepResult>>({});
  const [done, setDone] = useState(false);
  const [ide, setIde] = useState(false);
  const [sChoices, setSChoices] = useState<Choice[]>([]);
  const [sFu, setSFu] = useState<Choice[]>([]);

  const step = session?.steps[si];
  useEffect(() => { if (step?.choices) setSChoices(shuffle(step.choices)); if (step?.followUp?.choices) setSFu(shuffle(step.followUp.choices)); }, [step]);

  if (!problem || !session) return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Session Not Found</h1>
      <p style={{ color: "var(--muted)" }} className="mb-6">This problem doesn&apos;t have a guided session yet.</p>
      <Link href="/library/bronze" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold text-sm" style={{ background: "var(--accent)" }}>← Back to Problems</Link>
    </div>
  );

  const total = session.steps.length;
  const pct = ((si + (phase === "coach" ? 1 : 0.5)) / total) * 100;
  const totalXp = Object.values(results).reduce((s, r) => s + r.xp, 0);
  const maxXp = total * (XP_CONFIG.firstTryCorrect + XP_CONFIG.followUpCorrect + XP_CONFIG.followUpFirstTry);
  const scorePct = Math.round((totalXp / maxXp) * 100);

  /* ── handlers ────────────────────────────────────── */
  function pickMain(c: Choice) {
    if (eliminated.includes(c.id) || phase !== "main") return;
    setSelId(c.id);
    const a = mAttempts + 1; setMAttempts(a);
    if (c.isCorrect) { setTimeout(() => { if (step?.followUp) { setPhase("followup"); setFuSelId(null); setFuEliminated([]); setFuAttempts(0); } else finish(a, 1); }, 700); }
    else setPhase("wrong");
  }
  function dismissWrong() { setEliminated([...eliminated, selId!]); setSelId(null); setPhase("main"); }
  function pickFu(c: Choice) {
    if (fuEliminated.includes(c.id) || phase !== "followup") return;
    setFuSelId(c.id);
    const a = fuAttempts + 1; setFuAttempts(a);
    if (c.isCorrect) { setTimeout(() => finish(mAttempts, a), 700); }
    else setPhase("followup-wrong");
  }
  function dismissFuWrong() { setFuEliminated([...fuEliminated, fuSelId!]); setFuSelId(null); setPhase("followup"); }
  function finish(m: number, f: number) {
    const xp = xpForAttempt(m) + xpForFollowUp(f);
    setResults(p => ({ ...p, [step!.id]: { mainAttempts: m, fuAttempts: f, xp } }));
    setPhase("coach");
  }
  function nextStep() {
    if (si + 1 >= total) { setDone(true); return; }
    setSi(si + 1); setPhase("main"); setSelId(null); setEliminated([]); setMAttempts(0); setFuSelId(null); setFuEliminated([]); setFuAttempts(0); setHints(0);
  }
  function restart() {
    setSi(0); setPhase("main"); setSelId(null); setEliminated([]); setMAttempts(0); setFuSelId(null); setFuEliminated([]); setFuAttempts(0); setHints(0); setResults({}); setDone(false); setIde(false);
  }

  /* ── IDE ──────────────────────────────────────────── */
  if (ide) return <IdeView problem={problem} onBack={() => setIde(false)} />;

  /* ── DONE ────────────────────────────────────────── */
  if (done) {
    const perfect = Object.values(results).every(r => r.mainAttempts === 1 && r.fuAttempts === 1);
    const bonus = perfect ? XP_CONFIG.perfectSession : 0;
    const finalXp = totalXp + XP_CONFIG.sessionComplete + bonus;
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12" style={aFadeIn}>
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">{scorePct >= 80 ? "🏆" : scorePct >= 50 ? "🔓" : "📚"}</div>
          <h1 className="text-3xl font-bold mb-2">Session Complete!</h1>
          <p className="text-lg" style={{ color: "var(--muted)" }}>{problem.title}</p>
        </div>
        <div className="rounded-2xl p-8 mb-8 text-center" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="text-6xl font-bold mb-2" style={{ color: "var(--accent)" }}>{finalXp} <span className="text-2xl font-normal" style={{ color: "var(--muted)" }}>XP</span></div>
          <div className="flex items-center justify-center gap-6 mt-4" style={{ color: "var(--muted)" }}>
            <div><div className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{scorePct}%</div><div className="text-xs">Accuracy</div></div>
            <div style={{ width: 1, height: 32, background: "var(--border)" }} />
            <div><div className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{total}/{total}</div><div className="text-xs">Steps</div></div>
            {perfect && <><div style={{ width: 1, height: 32, background: "var(--border)" }} /><div><div className="text-2xl font-bold" style={{ color: "#eab308" }}>⭐ Perfect</div><div className="text-xs">+{XP_CONFIG.perfectSession} bonus</div></div></>}
          </div>
        </div>
        <div className="space-y-3 mb-8">
          {session.steps.map((s, i) => { const r = results[s.id]; if (!r) return null; const ft = r.mainAttempts === 1 && r.fuAttempts === 1; return (
            <div key={s.id} className="flex items-center justify-between px-5 py-3 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-3"><span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${ft ? "bg-emerald-500" : "bg-amber-500"}`}>{i+1}</span><span className="font-medium text-sm">{s.title}</span></div>
              <div className="flex items-center gap-3 text-sm" style={{ color: "var(--muted)" }}><span>{r.mainAttempts === 1 ? "1st try" : `${r.mainAttempts} tries`}</span><span className="font-semibold" style={{ color: "var(--accent)" }}>+{r.xp}</span></div>
            </div>); })}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => setIde(true)} className="flex-1 px-6 py-4 rounded-xl text-white font-semibold text-base transition hover:opacity-90" style={{ background: "var(--accent)" }}>🔓 Open Code Editor</button>
          <a href={problem.usacoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 px-6 py-4 rounded-xl font-semibold text-base text-center transition" style={{ border: "2px solid var(--border)", color: "var(--foreground)" }}>📄 View Problem on USACO</a>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={restart} className="text-sm hover:underline" style={{ color: "var(--muted)" }}>Restart Session</button>
          <Link href="/library/bronze" className="text-sm hover:underline" style={{ color: "var(--muted)" }}>← Back to Problems</Link>
        </div>
      </div>
    );
  }

  /* ── STEP VIEW ──────────────────────────────────── */
  if (!step) return null;
  const curHints = step.hints || (step.hint ? [step.hint] : []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Top */}
      <div className="flex items-center justify-between mb-2">
        <Link href="/library/bronze" className="text-sm hover:underline" style={{ color: "var(--muted)" }}>← Back</Link>
        <a href={problem.usacoUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-full font-medium transition hover:opacity-80" style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>View Problem ↗</a>
      </div>

      {/* Title + Progress */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full" style={{ background: "var(--bronze-bg)", color: "var(--bronze)" }}>Bronze</span>
          <span className="text-xs" style={{ color: "var(--muted)" }}>{problem.source}</span>
        </div>
        <h1 className="text-2xl font-bold">{problem.title}</h1>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
            <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%`, background: "var(--accent)" }} />
          </div>
          <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>{si+1}/{total}</span>
        </div>
        <div className="flex gap-2 mt-3">
          {session.steps.map((s, i) => { const d = !!results[s.id]; const a = i === si; return (
            <div key={s.id} className="flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold transition-all" style={{ background: d ? "var(--accent)" : a ? "var(--accent-subtle)" : "var(--card)", color: d ? "white" : a ? "var(--accent)" : "var(--muted)", border: `1.5px solid ${d ? "var(--accent)" : a ? "var(--accent)" : "var(--border)"}` }}>
              {d ? "✓" : i+1}
            </div>); })}
        </div>
      </div>

      {/* Problem Context (collapsible) */}
      <ProblemContext problem={problem} />

      {/* Step Card */}
      <div className="rounded-2xl p-6 sm:p-8 mb-6" style={{ background: "var(--card)", border: "1px solid var(--border)", ...aSlideUp }} key={`${si}-${phase}`}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md" style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>Step {step.stepNumber || si+1}</span>
          <span className="text-sm font-semibold">{step.title}</span>
        </div>

        {/* MAIN */}
        {(phase === "main" || phase === "wrong") && <>
          <p className="text-base mb-6 leading-relaxed">{step.question}</p>
          <div className="space-y-3">
            {sChoices.map(c => { const el = eliminated.includes(c.id); const sel = selId === c.id; const ok = sel && c.isCorrect; const bad = sel && !c.isCorrect; return (
              <button key={c.id} onClick={() => pickMain(c)} disabled={el || phase === "wrong"}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-sm leading-relaxed ${el ? "opacity-30 cursor-not-allowed line-through" : ok ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" : bad ? "border-red-400 bg-red-50 dark:bg-red-950/30" : "hover:border-[var(--accent)] cursor-pointer"}`}
                style={{ borderColor: el ? "var(--border)" : ok ? undefined : bad ? undefined : "var(--border)" }}>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: ok ? "#10b981" : bad ? "#ef4444" : el ? "var(--border)" : "var(--accent-subtle)", color: ok||bad ? "white" : el ? "var(--muted)" : "var(--accent)" }}>
                    {ok ? "✓" : bad ? "✗" : c.id.toUpperCase()}
                  </span>
                  <span>{c.text}</span>
                </div>
              </button>); })}
          </div>
          {phase === "wrong" && selId && <div className="mt-6 rounded-xl p-5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900" style={aFadeIn}>
            <div className="flex items-center gap-2 mb-2"><span className="text-red-600 dark:text-red-400 font-bold text-sm">✗ Not quite</span><span className="text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/60 text-red-600 dark:text-red-300 font-medium">Attempt {mAttempts}</span></div>
            <p className="text-sm text-red-800 dark:text-red-200 leading-relaxed">{sChoices.find(c => c.id === selId)?.explanation}</p>
            <button onClick={dismissWrong} className="mt-4 px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold transition hover:bg-red-700">I understand — try again</button>
          </div>}
          {phase === "main" && curHints.length > 0 && <div className="mt-6">
            {hints > 0 && <div className="space-y-2 mb-3">{curHints.slice(0, hints).map((h, i) => <div key={i} className="text-sm px-4 py-3 rounded-lg" style={{ background: "var(--accent-subtle)", color: "var(--accent-dark)", ...aFadeIn }}>💡 {h}</div>)}</div>}
            {hints < curHints.length && <button onClick={() => setHints(hints+1)} className="text-xs font-medium transition hover:underline" style={{ color: "var(--accent)" }}>{hints === 0 ? "Need a hint?" : "Need another hint?"} <span style={{ color: "var(--muted)" }}>({curHints.length - hints} left)</span></button>}
          </div>}
        </>}

        {/* FOLLOW-UP */}
        {(phase === "followup" || phase === "followup-wrong") && step.followUp && <>
          <div className="flex items-center gap-2 mb-2"><span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">Follow-up</span><span className="text-xs" style={{ color: "var(--muted)" }}>Prove you understand WHY</span></div>
          <p className="text-base mb-6 leading-relaxed">{step.followUp.question}</p>
          <div className="space-y-3">
            {sFu.map(c => { const el = fuEliminated.includes(c.id); const sel = fuSelId === c.id; const ok = sel && c.isCorrect; const bad = sel && !c.isCorrect; return (
              <button key={c.id} onClick={() => pickFu(c)} disabled={el || phase === "followup-wrong"}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-sm leading-relaxed ${el ? "opacity-30 cursor-not-allowed line-through" : ok ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" : bad ? "border-red-400 bg-red-50 dark:bg-red-950/30" : "hover:border-[var(--accent)] cursor-pointer"}`}
                style={{ borderColor: el ? "var(--border)" : ok ? undefined : bad ? undefined : "var(--border)" }}>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: ok ? "#10b981" : bad ? "#ef4444" : el ? "var(--border)" : "var(--accent-subtle)", color: ok||bad ? "white" : el ? "var(--muted)" : "var(--accent)" }}>
                    {ok ? "✓" : bad ? "✗" : c.id.toUpperCase()}
                  </span>
                  <span>{c.text}</span>
                </div>
              </button>); })}
          </div>
          {phase === "followup-wrong" && fuSelId && <div className="mt-6 rounded-xl p-5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900" style={aFadeIn}>
            <div className="flex items-center gap-2 mb-2"><span className="text-red-600 dark:text-red-400 font-bold text-sm">✗ Not quite</span></div>
            <p className="text-sm text-red-800 dark:text-red-200 leading-relaxed">{sFu.find(c => c.id === fuSelId)?.explanation}</p>
            <button onClick={dismissFuWrong} className="mt-4 px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold transition hover:bg-red-700">I understand — try again</button>
          </div>}
        </>}

        {/* COACH */}
        {phase === "coach" && <div style={aFadeIn}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md" style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>🎓 Coach Note</span>
            {results[step.id] && <span className="text-xs font-semibold" style={{ color: "var(--accent)" }}>+{results[step.id].xp} XP</span>}
          </div>
          <p className="text-sm leading-relaxed mb-6">{step.coachNote}</p>
          <div className="rounded-xl p-4 mb-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">✓ Correct Answer</p>
            <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">{step.choices.find(c => c.isCorrect)?.explanation}</p>
          </div>
          <button onClick={nextStep} className="w-full px-6 py-4 rounded-xl text-white font-semibold text-base transition hover:opacity-90" style={{ background: "var(--accent)" }}>
            {si + 1 >= total ? "Finish Session →" : "Next Step →"}
          </button>
        </div>}
      </div>

      {/* XP bar */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl text-sm" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <span style={{ color: "var(--muted)" }}>Session XP</span>
        <span className="font-bold" style={{ color: "var(--accent)" }}>{totalXp} XP</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROBLEM CONTEXT — collapsible panel with key info
   ═══════════════════════════════════════════════════════════════ */
function ProblemContext({ problem }: { problem: Problem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6 rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-left transition hover:opacity-80">
        <div className="flex items-center gap-3">
          <span className="text-base">📋</span>
          <span className="text-sm font-semibold">Problem Context</span>
          <span className="text-xs" style={{ color: "var(--muted)" }}>Key insight & approach</span>
        </div>
        <span className="text-xs transition-transform" style={{ color: "var(--muted)", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
      </button>
      {open && (
        <div className="px-6 pb-5 space-y-4 border-t" style={{ borderColor: "var(--border)", ...aFadeIn }}>
          <div className="pt-4">
            <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--accent)" }}>Key Insight</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>{problem.reasoning.keyInsight}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--accent)" }}>Key Variables</p>
            <div className="flex flex-wrap gap-2">
              {problem.reasoning.variables.map((v, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-lg font-mono" style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>{v.split("—")[0].trim()}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>Concepts</p>
            <div className="flex flex-wrap gap-2">
              {problem.concepts.map(c => (
                <span key={c} className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>{c.replace(/-/g, " ")}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   IDE VIEW — Code Scratchpad
   ═══════════════════════════════════════════════════════════════ */
function IdeView({ problem, onBack }: { problem: Problem; onBack: () => void }) {
  const [lang, setLang] = useState("python");
  const starters: Record<string, string> = {
    python: `# ${problem.title}\n# ${problem.source}\n# Problem: ${problem.usacoUrl}\n\nimport sys\ninput = sys.stdin.readline\n\ndef solve():\n    # Read input\n    n = int(input())\n    \n    # TODO: implement solution\n    \n    # Output result\n    print()\n\nsolve()`,
    cpp: `// ${problem.title}\n// ${problem.source}\n// Problem: ${problem.usacoUrl}\n\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    \n    int n;\n    cin >> n;\n    \n    // TODO: implement solution\n    \n    return 0;\n}`,
    java: `// ${problem.title}\n// ${problem.source}\n// Problem: ${problem.usacoUrl}\n\nimport java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n        \n        // TODO: implement solution\n        \n        System.out.println();\n    }\n}`,
  };
  const [code, setCode] = useState(starters.python);
  const [inp, setInp] = useState(problem.sampleInput || "");
  const [out, setOut] = useState("");
  const [copied, setCopied] = useState(false);

  // Update starter code when language changes
  useEffect(() => { setCode(starters[lang]); }, [lang]);

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  function download() {
    const ext = lang === "python" ? "py" : lang === "cpp" ? "cpp" : "java";
    const b = new Blob([code], { type: "text/plain" });
    const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = `${problem.id}.${ext}`; a.click(); URL.revokeObjectURL(u);
  }
  const lineCount = code.split("\n").length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6" style={aFadeIn}>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-sm px-3 py-1.5 rounded-lg transition hover:opacity-80" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>← Back to Results</button>
          <div><h2 className="text-lg font-bold">{problem.title}</h2><p className="text-xs" style={{ color: "var(--muted)" }}>Code Scratchpad — write, copy, download, then submit to USACO</p></div>
        </div>
        <div className="flex items-center gap-2">
          <select value={lang} onChange={e => setLang(e.target.value)} className="text-xs px-3 py-2 rounded-lg outline-none" style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)" }}>
            <option value="python">Python</option><option value="cpp">C++</option><option value="java">Java</option>
          </select>
          <a href={problem.usacoUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-2 rounded-lg font-medium text-white" style={{ background: "var(--accent)" }}>Submit to USACO ↗</a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ height: "calc(100vh - 180px)" }}>
        {/* Editor */}
        <div className="lg:col-span-2 flex flex-col rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between px-4 py-2" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Code</span>
            <div className="flex gap-2">
              <button onClick={copy} className="text-xs px-2 py-1 rounded transition" style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>{copied ? "✓ Copied" : "Copy"}</button>
              <button onClick={download} className="text-xs px-2 py-1 rounded" style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}>Download</button>
            </div>
          </div>
          <textarea value={code} onChange={e => setCode(e.target.value)} spellCheck={false} className="flex-1 p-4 pl-14 font-mono text-sm outline-none resize-none" style={{ background: "#1e1e2e", color: "#cdd6f4", tabSize: 4, lineHeight: "1.6", backgroundImage: `repeating-linear-gradient(transparent, transparent calc(1.6em - 1px), rgba(255,255,255,0.03) calc(1.6em - 1px), rgba(255,255,255,0.03) 1.6em)` }} onKeyDown={e => { if (e.key === "Tab") { e.preventDefault(); const t = e.currentTarget; const s = t.selectionStart; const end = t.selectionEnd; setCode(code.substring(0, s) + "    " + code.substring(end)); setTimeout(() => { t.selectionStart = t.selectionEnd = s + 4; }, 0); } }} />
        </div>

        {/* I/O */}
        <div className="flex flex-col gap-4">
          <div className="flex-1 flex flex-col rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <div className="px-4 py-2" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}><span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Input</span></div>
            <textarea value={inp} onChange={e => setInp(e.target.value)} placeholder="Paste sample input here..." spellCheck={false} className="flex-1 p-3 font-mono text-xs outline-none resize-none" style={{ background: "var(--card)", color: "var(--foreground)" }} />
          </div>
          <div className="flex-1 flex flex-col rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between px-4 py-2" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--muted)" }}>How to test</span>
            </div>
            <div className="flex-1 p-4 text-xs leading-relaxed space-y-3" style={{ background: "var(--card)", color: "var(--muted)" }}>
              <div className="flex items-start gap-2"><span style={{ color: "var(--accent)" }}>1.</span><span>Write your solution in the editor</span></div>
              <div className="flex items-start gap-2"><span style={{ color: "var(--accent)" }}>2.</span><span><strong>Copy</strong> or <strong>Download</strong> your code</span></div>
              <div className="flex items-start gap-2"><span style={{ color: "var(--accent)" }}>3.</span><span>Test locally or at <a href="https://ide.usaco.guide" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--accent)" }}>ide.usaco.guide</a></span></div>
              <div className="flex items-start gap-2"><span style={{ color: "var(--accent)" }}>4.</span><span>Submit at <a href={problem.usacoUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--accent)" }}>usaco.org</a></span></div>
              <div className="mt-2 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                <p className="text-xs" style={{ color: "var(--muted)" }}>💡 No built-in judge — this is a scratchpad to draft your solution after reasoning through the problem.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
