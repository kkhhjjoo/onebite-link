import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/utils/supabase/middleware"

const protectedRoutes = ["/", "/new", "/folder"]
const authRoutes = ["/login", "/register"]

export async function proxy(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request)
  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(route + "/")
  )
  const isAuthRoute = authRoutes.includes(path)

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
