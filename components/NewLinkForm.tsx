"use client"

import { useState } from "react"

const folders = ["개발", "디자인", "유튜브", "블로그", "뉴스"]

export default function NewLinkForm() {
  const [url, setUrl] = useState("")
  const [folder, setFolder] = useState("")

  const isValid = url.trim() !== "" && folder !== ""

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    alert(`저장 완료!\nURL: ${url}\n폴더: ${folder}`)
    setUrl("")
    setFolder("")
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
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className="w-full px-3 py-2 border border-[var(--border)] rounded-[6px] text-sm text-[var(--text)] bg-[var(--bg-card)] focus:outline-none focus:border-[var(--accent)] transition-colors"
        >
          <option value="" disabled>폴더를 선택하세요</option>
          {folders.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="mt-1 w-full py-2.5 bg-[var(--accent)] text-white text-sm font-semibold rounded-[6px] hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        저장
      </button>
    </form>
  )
}
