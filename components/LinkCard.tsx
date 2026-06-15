"use client"

interface LinkCardProps {
  title: string
  url: string
  description: string
  folder: string
  favicon: string
  thumbnail?: string | null
}

export default function LinkCard({ title, url, description, folder, favicon, thumbnail }: LinkCardProps) {
  const domain = new URL(url).hostname.replace("www.", "")

  return (
    <div className="card-hover flex flex-col justify-between bg-[var(--bg-card)] rounded-[8px] border border-[var(--border)] overflow-hidden transition-colors duration-150 cursor-pointer">
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
