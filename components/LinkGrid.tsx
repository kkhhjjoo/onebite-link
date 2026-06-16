"use client"

import LinkCard from "@/components/LinkCard"
import { useLinks } from "@/context/LinkContext"
import { useFolders } from "@/context/FolderContext"

interface LinkGridProps {
  folderId?: number
}

export default function LinkGrid({ folderId }: LinkGridProps) {
  const { links } = useLinks()
  const { folders } = useFolders()

  const filtered = folderId
    ? links.filter((link) => link.folder_id === folderId)
    : links

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filtered.map((link) => {
        const folderName = folders.find((f) => f.id === link.folder_id)?.name ?? ""
        return <LinkCard key={link.id} {...link} folder={folderName} />
      })}
    </div>
  )
}
