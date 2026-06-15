"use client"

import { useLinks } from "@/context/LinkContext"

export default function DeleteLinkModal() {
  const { linkToDelete, closeDeleteModal, deleteLink } = useLinks()

  if (!linkToDelete) return null

  const handleConfirm = () => {
    deleteLink(linkToDelete.id)
    closeDeleteModal()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={closeDeleteModal}
    >
      <div
        className="bg-[var(--bg-card)] rounded-[8px] border border-[var(--border)] p-6 w-full max-w-sm mx-4 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-1.5">
          <h2 className="text-base font-semibold text-[var(--text)]">링크 삭제</h2>
          <p className="text-sm text-[var(--text-sub)]">
            <span className="font-medium text-[var(--text)]">'{linkToDelete.title}'</span> 링크를 삭제하시겠습니까?
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={closeDeleteModal}
            className="px-4 py-2 text-sm text-[var(--text)] border border-[var(--border)] rounded-[6px] hover:bg-[var(--hover-bg)] transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm text-white bg-[#EB5757] rounded-[6px] hover:bg-[#D94F4F] transition-colors"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
