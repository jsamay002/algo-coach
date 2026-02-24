"use client";

import NavLink from "./NavLink";

type AppShellProps = {
  children: React.ReactNode;
};

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/library", label: "Library" },
  { href: "/drills", label: "Drills" },
  { href: "/progress", label: "Progress" },
  { href: "/settings", label: "Settings" },
];

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* ── Top Nav ── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "color-mix(in srgb, var(--background) 85%, transparent)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          {/* Brand */}
          <a href="/" className="flex items-center gap-1.5 select-none">
            <span
              className="text-xl font-extrabold tracking-tight"
              style={{ color: "var(--accent)" }}
            >
              algo
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              coach.
            </span>
          </a>

          {/* Nav links */}
          <nav className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
        </div>
      </header>

      {/* ── Page content ── */}
      <main>{children}</main>
    </div>
  );
}
