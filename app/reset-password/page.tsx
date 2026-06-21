"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

function Toast({
  message,
  type,
  onClose,
}: {
  message: string
  type: "error" | "success"
  onClose: () => void
}) {
  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 text-white text-sm rounded-[8px] shadow-lg max-w-sm w-[calc(100%-2rem)] ${
        type === "error" ? "bg-[#EB5757]" : "bg-[#2EAADC]"
      }`}
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="shrink-0 text-white/80 hover:text-white text-base leading-none"
        aria-label="닫기"
      >
        ✕
      </button>
    </div>
  )
}

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null)
  const [loading, setLoading] = useState(false)

  const isDisabled = !password || !confirmPassword || loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setToast({ message: "비밀번호가 일치하지 않습니다.", type: "error" })
      return
    }

    if (password.length < 6) {
      setToast({ message: "비밀번호는 최소 6자 이상이어야 합니다.", type: "error" })
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      setToast({ message: "비밀번호 변경에 실패했습니다. 다시 시도해주세요.", type: "error" })
      return
    }

    setToast({ message: "비밀번호가 성공적으로 변경되었습니다.", type: "success" })
    setTimeout(() => router.push("/"), 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="w-full max-w-sm px-8 py-10 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-[var(--text)] text-center mb-2 tracking-tight">
          비밀번호 재설정
        </h1>
        <p className="text-sm text-[var(--text-sub)] text-center mb-8">
          새로운 비밀번호를 입력해주세요
        </p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="새 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-[6px] border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)] transition-colors"
          />
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-[6px] border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)] transition-colors"
          />
          <button
            type="submit"
            disabled={isDisabled}
            className="w-full mt-1 py-2.5 bg-[var(--accent)] text-white text-sm font-semibold rounded-[6px] hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "변경 중..." : "비밀번호 변경"}
          </button>
        </form>
      </div>
    </div>
  )
}
