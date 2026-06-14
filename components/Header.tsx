import Link from "next/link"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 h-12 bg-[var(--bg-card)]/80 border-b border-[var(--border)] sticky top-0 z-10 backdrop-blur-sm">
      <Link href="/" className="text-base font-semibold text-[var(--text)] tracking-tight">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="flex items-center gap-1 px-4 py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-[6px] hover:bg-[var(--accent-hover)] transition-colors"
      >
        <span className="text-base leading-none">+</span>
        새 링크
      </Link>
    </header>
  )
}
