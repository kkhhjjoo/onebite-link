import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <div className="w-full max-w-sm px-8 py-10 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-[var(--text)] text-center mb-8 tracking-tight">
          한입 링크
        </h1>

        <form className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="이메일"
            className="w-full px-4 py-2.5 rounded-[6px] border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)] transition-colors"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full px-4 py-2.5 rounded-[6px] border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)] transition-colors"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-full px-4 py-2.5 rounded-[6px] border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] text-sm placeholder:text-[var(--placeholder)] outline-none focus:border-[var(--accent)] transition-colors"
          />
          <button
            type="submit"
            className="w-full mt-1 py-2.5 bg-[var(--accent)] text-white text-sm font-semibold rounded-[6px] hover:bg-[var(--accent-hover)] transition-colors"
          >
            회원가입
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[var(--text-sub)]">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-[var(--accent)] font-medium hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  )
}
