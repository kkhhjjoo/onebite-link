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
  deleteLink: (id: number) => void
  linkToDelete: Link | null
  openDeleteModal: (link: Link) => void
  closeDeleteModal: () => void
}

const LinkContext = createContext<LinkContextType | null>(null)

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<Link[]>(initialLinks)
  const [linkToDelete, setLinkToDelete] = useState<Link | null>(null)

  const addLink = (link: Omit<Link, "id">) => {
    setLinks((prev) => [...prev, { ...link, id: Date.now() }])
  }

  const deleteLink = (id: number) => {
    setLinks((prev) => prev.filter((l) => l.id !== id))
  }

  return (
    <LinkContext.Provider value={{
      links,
      addLink,
      deleteLink,
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
