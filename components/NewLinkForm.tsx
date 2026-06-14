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
    // 저장 로직 추후 구현
    alert(`저장 완료!\nURL: ${url}\n폴더: ${folder}`)
    setUrl("")
    setFolder("")
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">링크 URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-300 text-black"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">폴더 선택</label>
        <select
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 bg-white"
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
        className="mt-1 w-full py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        저장
      </button>
    </form>
  )
}
