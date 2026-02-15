import Link from "next/link";

export default function BronzeLibrary() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Bronze</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Pick a problem. Algo-Coach will guide your reasoning before you code.
      </p>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex items-start justify-between gap-6">
        <div>
          <h2 className="text-xl font-semibold">Sample Problem 1</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Learn the full Model-Before-Code workflow on one example.
          </p>
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Steps: classification → constraints → strategy → complexity → edge cases
          </div>
        </div>

        <Link
          href="/session/bronze/sample-1"
          className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition whitespace-nowrap"
        >
          Start Session
        </Link>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← Back home
        </Link>
      </div>
    </main>
  );
}

