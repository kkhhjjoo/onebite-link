"use client"

import { createContext, useContext, useState } from "react"
import { links as initialLinks } from "@/lib/data"

export type Link = {
  id: number
  title: string
  url: string
  description: string
  folderId: number
  favicon: string
  thumbnail?: string | null
}

type LinkContextType = {
  links: Link[]
  addLink: (link: Omit<Link, "id">) => void
  updateLink: (id: number, changes: Pick<Link, "title" | "description" | "folderId">) => void
  deleteLink: (id: number) => void
  linkToEdit: Link | null
  openEditModal: (link: Link) => void
  closeEditModal: () => void
  linkToDelete: Link | null
  openDeleteModal: (link: Link) => void
  closeDeleteModal: () => void
}

const LinkContext = createContext<LinkContextType | null>(null)

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<Link[]>(initialLinks)
  const [linkToEdit, setLinkToEdit] = useState<Link | null>(null)
  const [linkToDelete, setLinkToDelete] = useState<Link | null>(null)

  const addLink = (link: Omit<Link, "id">) => {
    setLinks((prev) => [...prev, { ...link, id: Date.now() }])
  }

  const updateLink = (id: number, changes: Pick<Link, "title" | "description" | "folderId">) => {
    setLinks((prev) => prev.map((l) => l.id === id ? { ...l, ...changes } : l))
  }

  const deleteLink = (id: number) => {
    setLinks((prev) => prev.filter((l) => l.id !== id))
  }

  return (
    <LinkContext.Provider value={{
      links,
      addLink,
      updateLink,
      deleteLink,
      linkToEdit,
      openEditModal: (link) => setLinkToEdit(link),
      closeEditModal: () => setLinkToEdit(null),
      linkToDelete,
      openDeleteModal: (link) => setLinkToDelete(link),
      closeDeleteModal: () => setLinkToDelete(null),
    }}>
      {children}
    </LinkContext.Provider>
  )
}

export function useLinks() {
  const ctx = useContext(LinkContext)
  if (!ctx) throw new Error("useLinks must be used within LinkProvider")
  return ctx
}
