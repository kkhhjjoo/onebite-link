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
}

const LinkContext = createContext<LinkContextType | null>(null)

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<Link[]>(initialLinks)

  const addLink = (link: Omit<Link, "id">) => {
    setLinks((prev) => [...prev, { ...link, id: Date.now() }])
  }

  return (
    <LinkContext.Provider value={{ links, addLink }}>
      {children}
    </LinkContext.Provider>
  )
}

export function useLinks() {
  const ctx = useContext(LinkContext)
  if (!ctx) throw new Error("useLinks must be used within LinkProvider")
  return ctx
}
