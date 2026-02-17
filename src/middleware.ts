import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

// Route-to-permission mapping — MUST match admin_permissions.permission_key in database
// User needs ANY of the listed permissions to access the route (OR logic)
const ROUTE_PERMISSIONS: Record<string, string[]> = {
    "/admin/dashboard": ["analytics.view"],
    "/admin/leads": ["users.view"],
    "/admin/newsletter": ["users.view"],
    "/admin/services": ["content.edit"],
    "/admin/mega-menu": ["settings.general"],
    "/admin/pricing": ["settings.general"],
    "/admin/blogs": ["content.create", "content.edit"],
    "/admin/case-studies": ["content.create", "content.edit"],
    "/admin/pages": ["content.create", "content.edit"],
    "/admin/settings": ["settings.general", "settings.security"],
    "/admin/marketing/analytics": ["settings.general", "analytics.view"],
    "/admin/analytics": ["analytics.view"],
    "/admin/users": ["users.view", "users.create"],
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if Supabase vars are configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_digisolutions_SUPABASE_URL || process.env.digisolutions_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_digisolutions_SUPABASE_ANON_KEY || process.env.digisolutions_SUPABASE_ANON_KEY
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.digisolutions_SUPABASE_SERVICE_ROLE_KEY

    const hasSupabase = !!(supabaseUrl && supabaseAnonKey)

    if (!hasSupabase) {
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

    // --- Authentication check (login required for /admin except /admin/login) ---
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        const isLocal = process.env.NODE_ENV === 'development'
        const hasDevSession = request.cookies.get("dev_admin_session")?.value === "true"

        if (!user && !(isLocal && hasDevSession)) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            return NextResponse.redirect(url)
        }

        // --- RBAC: Permission check for admin routes ---
        if (user && supabaseServiceKey) {
            try {
                // Create a service role client to query permissions
                const adminClient = createServerClient(
                    supabaseUrl!,
                    supabaseServiceKey,
                    {
                        cookies: {
                            getAll() { return [] },
                            setAll() { },
                        },
                    }
                )

                // Get user's admin profile
                const { data: profile } = await adminClient
                    .from("admin_users")
                    .select("role_id, status, role:admin_roles(role_name)")
                    .eq("id", user.id)
                    .single()

                if (profile) {
                    // Block inactive/suspended users
                    if (profile.status !== "active") {
                        const url = request.nextUrl.clone()
                        url.pathname = '/admin/login'
                        url.searchParams.set('error', 'account_suspended')
                        return NextResponse.redirect(url)
                    }

                    const roleName = (profile.role as any)?.role_name

                    // Super Admin bypasses all permission checks
                    if (roleName !== "Super Admin") {
                        // Find the required permissions for this route
                        let requiredPermissions: string[] | undefined

                        // Try exact match
                        requiredPermissions = ROUTE_PERMISSIONS[pathname]

                        // Try prefix match for dynamic routes like /admin/blogs/123
                        if (!requiredPermissions) {
                            const matchingRoute = Object.keys(ROUTE_PERMISSIONS).find(route =>
                                pathname.startsWith(route + "/") || pathname === route
                            )
                            if (matchingRoute) {
                                requiredPermissions = ROUTE_PERMISSIONS[matchingRoute]
                            }
                        }

                        if (requiredPermissions && requiredPermissions.length > 0 && profile.role_id) {
                            // Fetch user's permissions via role
                            const { data: rolePerms } = await adminClient
                                .from("admin_role_permissions")
                                .select("permission_id")
                                .eq("role_id", profile.role_id)

                            const permIds = rolePerms?.map((rp: any) => rp.permission_id) || []

                            let userPermKeys: string[] = []
                            if (permIds.length > 0) {
                                const { data: perms } = await adminClient
                                    .from("admin_permissions")
                                    .select("permission_key")
                                    .in("id", permIds)

                                userPermKeys = perms?.map((p: any) => p.permission_key) || []
                            }

                            // Check: user needs ANY of the required permissions
                            const hasAccess = requiredPermissions.some(perm => userPermKeys.includes(perm))

                            if (!hasAccess) {
                                // Redirect to dashboard with unauthorized error
                                const url = request.nextUrl.clone()
                                url.pathname = '/admin/dashboard'
                                url.searchParams.set('error', 'unauthorized')
                                return NextResponse.redirect(url)
                            }
                        }
                    }
                }
            } catch (e) {
                // Fail-open: if RBAC check fails, allow access rather than locking out
                console.error("Middleware: RBAC check error:", e)
            }
        }
    }

    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
