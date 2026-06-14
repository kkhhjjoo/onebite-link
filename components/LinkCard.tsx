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
    <div className="flex flex-col justify-between bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 cursor-pointer group">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <img src={favicon} alt="" width={16} height={16} className="rounded-sm" />
          <span className="text-xs text-gray-400 truncate">{domain}</span>
        </div>
        <h3 className="text-sm font-semibold text-gray-800 mb-1.5 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
          📁 {folder}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs text-gray-400 hover:text-indigo-600 transition-colors"
        >
          열기 →
        </a>
      </div>
    </div>
  )
}
