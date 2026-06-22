import type { Metadata } from "next"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import LinkGrid from "@/components/LinkGrid"

export const metadata: Metadata = {
  title: "전체 링크",
}

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-[var(--text)]">전체 링크</h2>
            <p className="text-sm text-[var(--text-sub)] mt-0.5">저장된 링크 34개</p>
          </div>
          <LinkGrid />
        </main>
      </div>
    </div>
  )
}
