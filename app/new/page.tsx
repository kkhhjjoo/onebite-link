import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import NewLinkForm from "@/components/NewLinkForm"

export default function NewPage() {
  return (
    <div className="flex flex-col h-screen bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
          <div className="w-full max-w-md mb-5">
            <h2 className="text-lg font-bold text-[var(--text)]">새 링크 추가</h2>
            <p className="text-sm text-[var(--text-sub)] mt-0.5">저장할 링크와 폴더를 입력해주세요</p>
          </div>
          <div className="w-full max-w-md">
            <NewLinkForm />
          </div>
        </main>
      </div>
    </div>
  )
}
