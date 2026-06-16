"use client"

import { useEffect, useState } from "react"
import { useLinks } from "@/context/LinkContext"
import { useFolders } from "@/context/FolderContext"

export default function EditLinkModal() {
  const { linkToEdit, closeEditModal, updateLink } = useLinks()
  const { folders } = useFolders()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [folderId, setFolderId] = useState<number>(0)

  useEffect(() => {
    if (linkToEdit) {
      setTitle(linkToEdit.title ?? "")
      setDescription(linkToEdit.description ?? "")
      setFolderId(linkToEdit.folder_id ?? 0)
    }
  }, [linkToEdit])

  if (!linkToEdit) return null

  const isValid = title.trim() !== "" && folderId !== 0

  const handleSave = () => {
    if (!isValid) return
    updateLink(linkToEdit.id, { title: title.trim(), description: description.trim(), folder_id: folderId })
    closeEditModal()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={closeEditModal}
    >
      <div
        className="bg-[var(--bg-card)] rounded-[8px] border border-[var(--border)] p-6 w-full max-w-sm mx-4 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-[var(--text)]">링크 수정</h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--text)]">폴더</label>
            <select
              value={folderId}
              onChange={(e) => setFolderId(Number(e.target.value))}
              className="w-full px-3 py-2 border border-[var(--border)] rounded-[6px] text-sm text-[var(--text)] bg-[var(--bg-card)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            >
              {folders.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--text)]">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSave() }}
              autoFocus
              className="w-full px-3 py-2 border border-[var(--border)] rounded-[6px] text-sm text-[var(--text)] bg-[var(--bg-card)] focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--placeholder)] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--text)]">설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-[var(--border)] rounded-[6px] text-sm text-[var(--text)] bg-[var(--bg-card)] focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--placeholder)] transition-colors resize-none"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={closeEditModal}
            className="px-4 py-2 text-sm text-[var(--text)] border border-[var(--border)] rounded-[6px] hover:bg-[var(--hover-bg)] transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="px-4 py-2 text-sm text-white bg-[var(--accent)] rounded-[6px] hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
