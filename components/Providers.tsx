"use client"

import { FolderProvider } from "@/context/FolderContext"
import { LinkProvider } from "@/context/LinkContext"
import FolderModal from "@/components/FolderModal"
import EditFolderModal from "@/components/EditFolderModal"
import DeleteFolderModal from "@/components/DeleteFolderModal"
import DeleteLinkModal from "@/components/DeleteLinkModal"
import EditLinkModal from "@/components/EditLinkModal"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FolderProvider>
      <LinkProvider>
        {children}
        <FolderModal />
        <EditFolderModal />
        <DeleteFolderModal />
        <EditLinkModal />
        <DeleteLinkModal />
      </LinkProvider>
    </FolderProvider>
  )
}
