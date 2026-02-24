"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
      style={{
        background: isActive ? "var(--accent-subtle)" : "transparent",
        color: isActive ? "var(--accent)" : "var(--muted)",
      }}
    >
      {label}
    </Link>
  );
}
