"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"

type Folder = { id: number; name: string }

type FolderContextType = {
  folders: Folder[]
  addFolder: (name: string) => Promise<void>
  updateFolder: (id: number, name: string) => Promise<void>
  deleteFolder: (id: number) => void
  isAdding: boolean
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
  const [folders, setFolders] = useState<Folder[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null)
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("folders")
      .select("id, name")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setFolders(data)
      })
  }, [])

  const addFolder = async (name: string) => {
    if (isAdding) return
    setIsAdding(true)
    const supabase = createClient()
    const { data } = await supabase
      .from("folders")
      .insert({ name })
      .select("id, name")
      .single()
    if (data) setFolders((prev) => [...prev, data])
    setIsAdding(false)
  }

  const updateFolder = async (id: number, name: string) => {
    const supabase = createClient()
    await supabase.from("folders").update({ name }).eq("id", id)
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
      isAdding,
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
