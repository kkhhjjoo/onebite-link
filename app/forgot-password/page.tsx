"use client"

import Link from "next/link"
import { useState } from "react"
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const isDisabled = !email || loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    })

    setLoading(false)

    if (error) {
      setToast({ message: "이메일 발송에 실패했습니다. 다시 시도해주세요.", type: "error" })
      return
    }

    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="w-full max-w-sm px-8 py-10 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-[var(--text)] text-center mb-2 tracking-tight">
          비밀번호 찾기
        </h1>
        <p className="text-sm text-[var(--text-sub)] text-center mb-8">
          가입한 이메일로 재설정 링크를 보내드려요
        </p>

        {sent ? (
          <div className="text-center">
            <p className="text-sm text-[var(--text)] mb-1">이메일을 발송했습니다.</p>
            <p className="text-sm text-[var(--text-sub)] mb-6">
              <span className="font-medium text-[var(--text)]">{email}</span> 받은편지함을
              확인해주세요.
            </p>
            <Link
              href="/login"
              className="text-sm text-[var(--accent)] font-medium hover:underline"
            >
              로그인으로 돌아가기
            </Link>
          </div>
        ) : (
          <>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-[6px] border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)] transition-colors"
              />
              <button
                type="submit"
                disabled={isDisabled}
                className="w-full mt-1 py-2.5 bg-[var(--accent)] text-white text-sm font-semibold rounded-[6px] hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "발송 중..." : "비밀번호 재설정 링크 발송"}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-[var(--text-sub)]">
              <Link href="/login" className="text-[var(--accent)] font-medium hover:underline">
                로그인으로 돌아가기
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
