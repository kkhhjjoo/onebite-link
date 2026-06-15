"use client"

import { useLinks } from "@/context/LinkContext"
import type { Link } from "@/context/LinkContext"

type LinkCardProps = Pick<Link, "id" | "title" | "url" | "description" | "favicon" | "thumbnail"> & {
  folder: string
}

export default function LinkCard({ id, title, url, description, folder, favicon, thumbnail }: LinkCardProps) {
  const { openEditModal, openDeleteModal, links } = useLinks()
  const domain = new URL(url).hostname.replace("www.", "")

  const getLink = () => links.find((l) => l.id === id)

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const link = getLink()
    if (link) openEditModal(link)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const link = getLink()
    if (link) openDeleteModal(link)
  }

  return (
    <div className="card-hover group relative flex flex-col justify-between bg-[var(--bg-card)] rounded-[8px] border border-[var(--border)] overflow-hidden transition-colors duration-150 cursor-pointer">
      <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleEditClick}
          className="p-1.5 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-sub)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
          aria-label="링크 수정"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button
          onClick={handleDeleteClick}
          className="p-1.5 rounded-[6px] bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-sub)] hover:text-[#EB5757] hover:border-[#EB5757] transition-colors"
          aria-label="링크 삭제"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>

      {thumbnail && (
        <div className="w-full h-36 overflow-hidden shrink-0">
          <img src={thumbnail} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex flex-col flex-1 justify-between p-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={favicon} alt="" width={14} height={14} className="rounded-sm shrink-0" />
            <span className="text-xs text-[var(--text-sub)] truncate">{domain}</span>
          </div>
          <h3 className="text-sm font-semibold text-[var(--text)] mb-1.5 line-clamp-2 leading-snug">
            {title}
          </h3>
          <p className="text-xs text-[var(--text-sub)] line-clamp-2 leading-relaxed">{description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs bg-[var(--hover-bg)] text-[var(--text-sub)] px-2 py-0.5 rounded-[4px]">
            {folder}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="link-open text-xs text-[var(--text-sub)] transition-colors"
          >
            열기 →
          </a>
        </div>
      </div>
    </div>
  )
}
