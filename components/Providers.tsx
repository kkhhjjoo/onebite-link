"use client"

import { FolderProvider } from "@/context/FolderContext"
import FolderModal from "@/components/FolderModal"
import DeleteFolderModal from "@/components/DeleteFolderModal"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FolderProvider>
      {children}
      <FolderModal />
      <DeleteFolderModal />
    </FolderProvider>
  )
}
