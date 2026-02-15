export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Algo-Coach</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-xl">
        An interactive training platform that helps students learn how to think through competitive programming problems across multiple USACO divisions.
      </p>

      <div className="flex gap-4">
        <button className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
          Bronze
        </button>

        <button className="px-6 py-3 rounded-xl bg-gray-300 text-gray-700 cursor-not-allowed">
          Silver (Coming Soon)
        </button>

        <button className="px-6 py-3 rounded-xl bg-gray-300 text-gray-700 cursor-not-allowed">
          Gold (Coming Soon)
        </button>
      </div>
    </main>
  );
}
