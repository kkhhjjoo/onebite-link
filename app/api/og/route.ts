import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")
  if (!url) return Response.json({ error: "url required" }, { status: 400 })

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; OneBiteLink/1.0)" },
      signal: AbortSignal.timeout(8000),
    })
    const html = await res.text()

    const getOgTag = (property: string) => {
      const m =
        html.match(new RegExp(`<meta[^>]+property=["']og:${property}["'][^>]+content=["']([^"']+)["']`, "i")) ??
        html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:${property}["']`, "i"))
      return m?.[1] ?? null
    }

    const getMetaName = (name: string) => {
      const m =
        html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, "i")) ??
        html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, "i"))
      return m?.[1] ?? null
    }

    const getTitle = () => {
      const m = html.match(/<title[^>]*>([^<]+)<\/title>/i)
      return m?.[1]?.trim() ?? null
    }

    const origin = new URL(url).origin

    const faviconMatch =
      html.match(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]+href=["']([^"']+)["']/i) ??
      html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["'][^"']*icon[^"']*["']/i)
    let favicon = faviconMatch?.[1] ?? null
    if (favicon && favicon.startsWith("/")) favicon = origin + favicon
    if (!favicon) favicon = `${origin}/favicon.ico`

    let thumbnail = getOgTag("image")
    if (thumbnail && thumbnail.startsWith("/")) thumbnail = origin + thumbnail

    return Response.json({
      title: getOgTag("title") ?? getTitle() ?? "",
      description: getOgTag("description") ?? getMetaName("description") ?? "",
      thumbnail,
      favicon,
    })
  } catch {
    return Response.json({ error: "Failed to fetch URL" }, { status: 500 })
  }
}
