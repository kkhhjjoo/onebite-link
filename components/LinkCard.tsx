"use client"

interface LinkCardProps {
  title: string
  url: string
  description: string
  folder: string
  favicon: string
}

export default function LinkCard({ title, url, description, folder, favicon }: LinkCardProps) {
  const domain = new URL(url).hostname.replace("www.", "")

  return (
    <div className="card-hover flex flex-col justify-between bg-[var(--bg-card)] rounded-[8px] border border-[var(--border)] p-4 transition-colors duration-150 cursor-pointer">
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
  )
}
