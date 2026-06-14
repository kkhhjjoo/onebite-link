"use client"

import { useFolders } from "@/context/FolderContext"

export default function NewFolderButton() {
  const { openModal } = useFolders()

  return (
    <button
      onClick={openModal}
      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[var(--text)] border border-[var(--border)] rounded-[6px] hover:bg-[var(--hover-bg)] transition-colors"
    >
      <span className="text-base leading-none">+</span>
      새 폴더
    </button>
  )
}
