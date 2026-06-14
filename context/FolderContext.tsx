"use client"

import { createContext, useContext, useState } from "react"
import { folders as initialFolders } from "@/lib/data"

type Folder = { id: number; name: string; count: number }

type FolderContextType = {
  folders: Folder[]
  addFolder: (name: string) => void
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const FolderContext = createContext<FolderContextType | null>(null)

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addFolder = (name: string) => {
    setFolders((prev) => [...prev, { id: Date.now(), name, count: 0 }])
  }

  return (
    <FolderContext.Provider value={{
      folders,
      addFolder,
      isModalOpen,
      openModal: () => setIsModalOpen(true),
      closeModal: () => setIsModalOpen(false),
    }}>
      {children}
    </FolderContext.Provider>
  )
}

export function useFolders() {
  const ctx = useContext(FolderContext)
  if (!ctx) throw new Error("useFolders must be used within FolderProvider")
  return ctx
}
