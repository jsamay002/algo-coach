"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [hasResume, setHasResume] = useState(false);

  useEffect(() => {
    // For Day 2: we’ll store the current session under this key.
    // Later you can generalize to multiple problems.
    const saved = localStorage.getItem("session:bronze:sample-1");
    setHasResume(!!saved);
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold mb-4">Algo-Coach</h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-xl">
        An interactive training platform that helps students learn how to think through competitive programming problems
        across multiple USACO divisions.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Link
          href="/bronze"
          className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Start Bronze
        </Link>

        {hasResume && (
          <Link
            href="/session/bronze/sample-1"
            className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-neutral-900 transition"
          >
            Resume Session
          </Link>
        )}

        <button className="px-6 py-3 rounded-xl bg-gray-300 text-gray-700 cursor-not-allowed">
          Silver (Coming Soon)
        </button>

        <button className="px-6 py-3 rounded-xl bg-gray-300 text-gray-700 cursor-not-allowed">
          Gold (Coming Soon)
        </button>
      </div>

      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center max-w-xl">
        Day 2 focus: build one guided “Model-Before-Code” session end-to-end.
      </p>
    </main>
  );
}
