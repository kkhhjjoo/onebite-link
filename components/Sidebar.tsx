import Link from "next/link"
import { folders, links } from "@/lib/data"

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 min-h-full bg-[var(--bg)] border-r border-[var(--border)] px-3 py-4">
      <Link
        href="/"
        className="w-full flex items-center justify-between px-3 py-2 rounded-[6px] bg-[var(--accent)] text-white text-sm font-semibold mb-4"
      >
        <span>전체</span>
        <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
          {links.length}
        </span>
      </Link>

      <p className="text-xs text-[var(--text-sub)] font-medium uppercase tracking-wider px-3 mb-2">
        폴더
      </p>

      <ul className="flex flex-col gap-0.5">
        {folders.map((folder) => (
          <li key={folder.id}>
            <Link
              href={`/folder/${folder.id}`}
              className="sidebar-item-hover w-full flex items-center justify-between px-3 py-2 rounded-[6px] text-sm text-[var(--text)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">📁</span>
                <span>{folder.name}</span>
              </div>
              <span className="text-xs text-[var(--text-sub)]">{folder.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
