import Link from "next/link"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
      <Link href="/" className="text-xl font-bold text-indigo-600 tracking-tight">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
      >
        <span className="text-lg leading-none">+</span>
        새 링크
      </Link>
    </header>
  )
}
