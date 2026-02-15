"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type StepType = "multipleChoice" | "shortText";

type Step = {
  id: string;
  title: string;
  question: string;
  type: StepType;
  options?: string[];
};

type SessionSave = {
  stepIndex: number;
  answers: Record<string, string>;
};

function storageKey(division: string, problemId: string) {
  return `session:${division}:${problemId}`;
}

export default function SessionPage({
  params,
}: {
  params: { division: string; problemId: string };
}) {
  const { division, problemId } = params;

  // Day 2: hardcode a single “demo” problem.
  const problem = useMemo(() => {
    return {
      title: "Sample Problem 1",
      prompt:
        "You are given N numbers. Determine a property of the sequence.\n" +
        "(Placeholder prompt — replace with a real Bronze statement soon.)",
      steps: [
        {
          id: "classify",
          title: "Classify the problem",
          question: "Which category does this problem most resemble?",
          type: "multipleChoice" as const,
          options: ["Simulation", "Sorting", "Prefix sums", "Greedy", "Graph basics"],
        },
        {
          id: "constraints",
          title: "Analyze constraints",
          question: "What are the key constraints (N, value ranges) and what do they imply?",
          type: "shortText" as const,
        },
        {
          id: "strategy",
          title: "Pick a strategy",
          question: "Describe your planned approach in 1–3 sentences.",
          type: "shortText" as const,
        },
        {
          id: "complexity",
          title: "Estimate time complexity",
          question: "What time complexity will your solution run in, and why?",
          type: "shortText" as const,
        },
        {
          id: "edgeCases",
          title: "Consider edge cases",
          question: "List 2–3 edge cases you would test.",
          type: "shortText" as const,
        },
      ] satisfies Step[],
    };
  }, []);

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState("");

  const steps = problem.steps;
  const step = steps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === steps.length - 1;

  // Load saved session on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey(division, problemId));
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as SessionSave;
      setStepIndex(parsed.stepIndex ?? 0);
      setAnswers(parsed.answers ?? {});
    } catch {
      // ignore corrupted save
    }
  }, [division, problemId]);

  // Sync input box / selection to current step’s stored answer
  useEffect(() => {
    setInputValue(answers[step.id] ?? "");
  }, [step.id, answers]);

  function save(nextStepIndex: number, nextAnswers: Record<string, string>) {
    const payload: SessionSave = { stepIndex: nextStepIndex, answers: nextAnswers };
    localStorage.setItem(storageKey(division, problemId), JSON.stringify(payload));
  }

  function onNext() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const nextAnswers = { ...answers, [step.id]: trimmed };
    const nextStepIndex = Math.min(stepIndex + 1, steps.length - 1);

    setAnswers(nextAnswers);
    setStepIndex(nextStepIndex);
    save(nextStepIndex, nextAnswers);
  }

  function onBack() {
    const prev = Math.max(stepIndex - 1, 0);
    setStepIndex(prev);
    save(prev, answers);
  }

  function onRestart() {
    localStorage.removeItem(storageKey(division, problemId));
    setStepIndex(0);
    setAnswers({});
    setInputValue("");
  }

  // Summary screen when last step has an answer
  if (isLast && answers[step.id]) {
    return (
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-10 max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{problem.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Session complete — here’s your reasoning trail.
            </p>
          </div>

          <button
            onClick={onRestart}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-neutral-900 transition"
          >
            Restart
          </button>
        </div>

        <div className="mt-8 space-y-6">
          {steps.map((s) => (
            <div key={s.id} className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
              <div className="text-sm text-gray-500 dark:text-gray-400">{s.title}</div>
              <div className="font-semibold mt-1">{s.question}</div>
              <div className="mt-3 whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                {answers[s.id] ?? <span className="text-gray-400">No answer</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-xl font-semibold">Recommended next step</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Now translate your plan into code: write the I/O skeleton, implement your strategy, then test using your edge
            cases. If your complexity is borderline, consider optimizing before you code too much.
          </p>
        </div>

        <div className="mt-8 flex gap-6">
          <Link href="/bronze" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Bronze
          </Link>
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-10 max-w-4xl mx-auto">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{problem.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Step {stepIndex + 1} / {steps.length}: {step.title}
          </p>
        </div>

        <button
          onClick={onRestart}
          className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-neutral-900 transition"
        >
          Restart
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Problem prompt</div>
        <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{problem.prompt}</div>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="font-semibold mb-4">{step.question}</div>

        {step.type === "multipleChoice" ? (
          <div className="grid gap-3">
            {step.options?.map((opt) => (
              <button
                key={opt}
                onClick={() => setInputValue(opt)}
                className={`text-left px-4 py-3 rounded-xl border transition ${
                  inputValue === opt
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-neutral-900"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent p-3 outline-none"
            placeholder="Type your answer..."
          />
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            disabled={isFirst}
            className="px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-800 disabled:opacity-50"
          >
            Back
          </button>

          <button
            onClick={onNext}
            disabled={!inputValue.trim()}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLast ? "Finish" : "Next"}
          </button>
        </div>

        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Progress saves automatically. Try refreshing the page mid-session.
        </p>
      </div>

      <div className="mt-8">
        <Link href="/bronze" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to Bronze
        </Link>
      </div>
    </main>
  );
}
