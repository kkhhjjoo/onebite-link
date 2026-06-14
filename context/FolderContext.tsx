"use client"

import { createContext, useContext, useState } from "react"
import { folders as initialFolders } from "@/lib/data"

type Folder = { id: number; name: string; count: number }

type FolderContextType = {
  folders: Folder[]
  addFolder: (name: string) => void
  updateFolder: (id: number, name: string) => void
  deleteFolder: (id: number) => void
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  folderToEdit: Folder | null
  openEditModal: (folder: Folder) => void
  closeEditModal: () => void
  folderToDelete: Folder | null
  openDeleteModal: (folder: Folder) => void
  closeDeleteModal: () => void
}

const FolderContext = createContext<FolderContextType | null>(null)

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null)
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null)

  const addFolder = (name: string) => {
    setFolders((prev) => [...prev, { id: Date.now(), name, count: 0 }])
  }

  const updateFolder = (id: number, name: string) => {
    setFolders((prev) => prev.map((f) => f.id === id ? { ...f, name } : f))
  }

  const deleteFolder = (id: number) => {
    setFolders((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <FolderContext.Provider value={{
      folders,
      addFolder,
      updateFolder,
      deleteFolder,
      isModalOpen,
      openModal: () => setIsModalOpen(true),
      closeModal: () => setIsModalOpen(false),
      folderToEdit,
      openEditModal: (folder) => setFolderToEdit(folder),
      closeEditModal: () => setFolderToEdit(null),
      folderToDelete,
      openDeleteModal: (folder) => setFolderToDelete(folder),
      closeDeleteModal: () => setFolderToDelete(null),
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
