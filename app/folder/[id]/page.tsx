import type { Metadata } from "next"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import LinkGrid from "@/components/LinkGrid"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

async function getFolder(id: number) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data } = await supabase.from("folders").select("name").eq("id", id).single()
  return data
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id: idParam } = await params
  const folder = await getFolder(parseInt(idParam, 10))
  return {
    title: folder ? folder.name : "폴더",
  }
}

export default async function FolderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params
  const id = parseInt(idParam, 10)

  const folder = await getFolder(id)

  return (
    <div className="flex flex-col h-screen bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-[var(--text)]">
              {folder ? `📁 ${folder.name}` : "폴더"}
            </h2>
          </div>
          <LinkGrid folderId={id} />
        </main>
      </div>
    </div>
  )
}
