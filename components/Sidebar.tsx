"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFolders } from "@/context/FolderContext"
import { createClient } from "@/utils/supabase/client"

function PencilIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  )
}

export default function Sidebar() {
  const { folders, openEditModal, openDeleteModal } = useFolders()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <aside className="w-56 shrink-0 min-h-full bg-[var(--bg)] border-r border-[var(--border)] px-3 py-4 flex flex-col">
      <Link
        href="/"
        className="w-full flex items-center justify-between px-3 py-2 rounded-[6px] bg-[var(--accent)] text-white text-sm font-semibold mb-4"
      >
        <span>전체</span>
      </Link>

      <p className="text-xs text-[var(--text-sub)] font-medium uppercase tracking-wider px-3 mb-2">
        폴더
      </p>

      <ul className="flex flex-col gap-0.5">
        {folders.map((folder) => (
          <li key={folder.id}>
            <div className="group sidebar-item-hover flex items-center px-3 py-2 rounded-[6px] transition-colors">
              <Link
                href={`/folder/${folder.id}`}
                className="flex items-center gap-2 flex-1 min-w-0 text-sm text-[var(--text)]"
              >
                <span className="text-sm shrink-0">📁</span>
                <span className="truncate">{folder.name}</span>
              </Link>
              <div className="relative flex items-center justify-end w-10 shrink-0">
                <div className="absolute right-0 flex items-center gap-0.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  <button
                    className="edit-btn p-0.5 rounded"
                    onClick={() => openEditModal(folder)}
                    aria-label={`${folder.name} 폴더 이름 수정`}
                  >
                    <PencilIcon />
                  </button>
                  <button
                    className="delete-btn p-0.5 rounded"
                    onClick={() => openDeleteModal(folder)}
                    aria-label={`${folder.name} 폴더 삭제`}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4 border-t border-[var(--border)]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-[6px] text-sm text-[var(--text-sub)] hover:bg-[var(--hover-bg)] hover:text-[var(--text)] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          로그아웃
        </button>
        <Link
          href="/privacy"
          className="block px-3 py-1.5 text-xs text-[var(--text-sub)] opacity-60 hover:opacity-100 transition-opacity"
        >
          개인정보 처리방침
        </Link>
      </div>
    </aside>
  )
}
