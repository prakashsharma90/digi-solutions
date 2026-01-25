import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if Supabase vars are configured (check both manual and integration prefixed versions)
    const hasSupabase = !!(
        (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
        (process.env.NEXT_PUBLIC_digisolutions_SUPABASE_URL && process.env.NEXT_PUBLIC_digisolutions_SUPABASE_ANON_KEY) ||
        (process.env.digisolutions_SUPABASE_URL && process.env.digisolutions_SUPABASE_ANON_KEY)
    )

    if (!hasSupabase) {
        // If Supabase is not configured, allow public site but BLOCK /admin
        if (pathname.startsWith('/admin')) {
            return new NextResponse(
                JSON.stringify({ error: "Cloud database not configured. Please add SUPABASE environment variables." }),
                { status: 503, headers: { 'content-type': 'application/json' } }
            )
        }
        return NextResponse.next()
    }

    // Update session
    let response = NextResponse.next({ request: { headers: request.headers } })
    let user = null;

    try {
        const sessionData = await updateSession(request)
        if (sessionData && sessionData.response) {
            response = sessionData.response
            user = sessionData.user
        } else {
            console.error("Middleware: updateSession did not return a valid response object", sessionData)
        }
    } catch (e) {
        console.error("Middleware: Error updating session", e)
    }

    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        // Dev fallback check
        const isLocal = process.env.NODE_ENV === 'development'
        const hasDevSession = request.cookies.get("dev_admin_session")?.value === "true"

        if (!user && !(isLocal && hasDevSession)) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            return NextResponse.redirect(url)
        }
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
