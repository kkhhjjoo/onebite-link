import LinkCard from "@/components/LinkCard"
import { links, folders } from "@/lib/data"

interface LinkGridProps {
  folderId?: number
}

export default function LinkGrid({ folderId }: LinkGridProps) {
  const filtered = folderId
    ? links.filter((link) => link.folderId === folderId)
    : links

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filtered.map((link) => {
        const folderName = folders.find((f) => f.id === link.folderId)?.name ?? ""
        return <LinkCard key={link.id} {...link} folder={folderName} />
      })}
    </div>
  )
}
