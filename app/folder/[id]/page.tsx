import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import LinkGrid from "@/components/LinkGrid"
import { folders } from "@/lib/data"

export default async function FolderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params
  const id = parseInt(idParam, 10)
  const folder = folders.find((f) => f.id === id)

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-800">
              {folder ? `📁 ${folder.name}` : "폴더"}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {folder ? `${folder.count}개의 링크` : ""}
            </p>
          </div>
          <LinkGrid folderId={id} />
        </main>
      </div>
    </div>
  )
}
