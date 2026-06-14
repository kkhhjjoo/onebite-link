"use client"

import { FolderProvider } from "@/context/FolderContext"
import FolderModal from "@/components/FolderModal"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FolderProvider>
      {children}
      <FolderModal />
    </FolderProvider>
  )
}
