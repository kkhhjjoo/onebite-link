import Link from "next/link"
import { folders, links } from "@/lib/data"

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 min-h-full bg-gray-50 border-r border-gray-200 px-3 py-4">
      <Link
        href="/"
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold mb-4"
      >
        <span>ALL</span>
        <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
          {links.length}
        </span>
      </Link>

      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider px-3 mb-2">폴더</p>

      <ul className="flex flex-col gap-1">
        {folders.map((folder) => (
          <li key={folder.id}>
            <Link
              href={`/folder/${folder.id}`}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">📁</span>
                <span>{folder.name}</span>
              </div>
              <span className="text-xs text-gray-400">{folder.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
