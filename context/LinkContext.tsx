"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"

export type Link = {
  id: number
  url: string
  title: string | null
  description: string | null
  thumbnail_url: string | null
  folder_id: number | null
  created_at: string
}

type LinkContextType = {
  links: Link[]
  addLink: (link: Omit<Link, "id" | "created_at">) => Promise<void>
  updateLink: (id: number, changes: Pick<Link, "title" | "description" | "folder_id">) => void
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
  const [links, setLinks] = useState<Link[]>([])
  const [linkToEdit, setLinkToEdit] = useState<Link | null>(null)
  const [linkToDelete, setLinkToDelete] = useState<Link | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, folder_id, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setLinks(data)
      })
  }, [])

  const addLink = async (link: Omit<Link, "id" | "created_at">) => {
    const supabase = createClient()
    const { data } = await supabase
      .from("links")
      .insert(link)
      .select("id, url, title, description, thumbnail_url, folder_id, created_at")
      .single()
    if (data) setLinks((prev) => [data, ...prev])
  }

  const updateLink = (id: number, changes: Pick<Link, "title" | "description" | "folder_id">) => {
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
