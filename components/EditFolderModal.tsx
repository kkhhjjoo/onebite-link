"use client"

import { useEffect, useState } from "react"
import { useFolders } from "@/context/FolderContext"

export default function EditFolderModal() {
  const { folderToEdit, closeEditModal, updateFolder } = useFolders()
  const [name, setName] = useState("")

  useEffect(() => {
    if (folderToEdit) setName(folderToEdit.name)
  }, [folderToEdit])

  if (!folderToEdit) return null

  const handleSave = async () => {
    if (!name.trim()) return
    await updateFolder(folderToEdit.id, name.trim())
    closeEditModal()
  }

  const handleCancel = () => {
    closeEditModal()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={handleCancel}
    >
      <div
        className="bg-[var(--bg-card)] rounded-[8px] border border-[var(--border)] p-6 w-full max-w-sm mx-4 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-[var(--text)]">폴더 이름 수정</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSave() }}
          placeholder="폴더 이름"
          autoFocus
          className="w-full px-3 py-2 border border-[var(--border)] rounded-[6px] text-sm text-[var(--text)] bg-[var(--bg-card)] focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--placeholder)] transition-colors"
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm text-[var(--text)] border border-[var(--border)] rounded-[6px] hover:bg-[var(--hover-bg)] transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="px-4 py-2 text-sm text-white bg-[var(--accent)] rounded-[6px] hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
