"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useFolders } from "@/context/FolderContext"
import { useLinks } from "@/context/LinkContext"

export default function NewLinkForm() {
  const router = useRouter()
  const { folders } = useFolders()
  const { addLink } = useLinks()

  const [url, setUrl] = useState("")
  const [folderId, setFolderId] = useState<number | "">("")
  const [loading, setLoading] = useState(false)

  const isValid = url.trim() !== "" && folderId !== ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || loading) return

    setLoading(true)
    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`)
      const data = await res.json()

      await addLink({
        url,
        title: data.title || url,
        description: data.description || null,
        thumbnail_url: data.thumbnail ?? null,
        folder_id: folderId as number,
      })

      router.push("/")
    } catch {
      await addLink({
        url,
        title: url,
        description: null,
        thumbnail_url: null,
        folder_id: folderId as number,
      })
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--bg-card)] rounded-[8px] border border-[var(--border)] p-6 flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--text)]">링크 URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-3 py-2 border border-[var(--border)] rounded-[6px] text-sm text-[var(--text)] bg-[var(--bg-card)] focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--placeholder)] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--text)]">폴더 선택</label>
        <select
          value={folderId}
          onChange={(e) => setFolderId(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full px-3 py-2 border border-[var(--border)] rounded-[6px] text-sm text-[var(--text)] bg-[var(--bg-card)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        >
          <option value="" disabled>폴더를 선택하세요</option>
          {folders.map((f) => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={!isValid || loading}
        className="mt-1 w-full py-2.5 bg-[var(--accent)] text-white text-sm font-semibold rounded-[6px] hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "저장 중..." : "저장"}
      </button>
    </form>
  )
}
