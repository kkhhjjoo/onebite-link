"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 bg-[#EB5757] text-white text-sm rounded-[8px] shadow-lg max-w-sm w-[calc(100%-2rem)]">
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

function translateError(message: string): string {
  if (message.includes("Invalid login credentials") || message.includes("invalid_credentials")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다."
  }
  if (message.includes("Email not confirmed")) {
    return "이메일 인증이 완료되지 않았습니다."
  }
  if (message.includes("Too many requests")) {
    return "너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요."
  }
  return "로그인에 실패했습니다. 다시 시도해주세요."
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isDisabled = !email || !password || loading

  const handleKakaoLogin = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      setErrorMsg(translateError(error.message))
      return
    }

    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      {errorMsg && <Toast message={errorMsg} onClose={() => setErrorMsg(null)} />}

      <div className="w-full max-w-sm px-8 py-10 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-[var(--text)] text-center mb-8 tracking-tight">
          한입 링크
        </h1>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-[6px] border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)] transition-colors"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-[6px] border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)] transition-colors"
          />
          <button
            type="submit"
            disabled={isDisabled}
            className="w-full mt-1 py-2.5 bg-[var(--accent)] text-white text-sm font-semibold rounded-[6px] hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-xs text-[var(--text-sub)]">또는</span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        <button
          type="button"
          onClick={handleKakaoLogin}
          className="mt-3 w-full flex justify-center"
        >
          <Image
            src="/kakao_login_large_wide.png"
            alt="카카오 로그인"
            width={300}
            height={45}
            className="w-full h-auto"
          />
        </button>

        <p className="mt-5 text-center text-sm text-[var(--text-sub)]">
          <Link href="/forgot-password" className="text-[var(--accent)] font-medium hover:underline">
            비밀번호를 잊으셨나요?
          </Link>
        </p>

        <p className="mt-3 text-center text-sm text-[var(--text-sub)]">
          계정이 없으신가요?{" "}
          <Link href="/register" className="text-[var(--accent)] font-medium hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  )
}
