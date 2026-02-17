import { createClient, createAdminClient } from "@/lib/supabase/server";

export type CurrentUser = {
    id: string;
    name: string;
    email: string;
    role_id: string | null;
    role_name: string;
    status: string;
    permissions: string[]; // permission_key array e.g. ['content.create', 'content.edit', ...]
};

/**
 * Maps admin routes to the permission_key required to access them.
 * Uses the SAME keys as stored in admin_permissions table.
 * 
 * A route can require ANY of the listed permissions (OR logic).
 */
export const ROUTE_PERMISSIONS: Record<string, string[]> = {
    "/admin/dashboard": ["analytics.view"],              // Everyone with analytics can see dashboard
    "/admin/leads": ["users.view"],                      // Leads need users/leads access
    "/admin/newsletter": ["users.view"],
    "/admin/services": ["content.edit"],                  // Services = content management
    "/admin/mega-menu": ["settings.general"],
    "/admin/pricing": ["settings.general"],
    "/admin/blogs": ["content.create", "content.edit"],   // Blog access
    "/admin/case-studies": ["content.create", "content.edit"],
    "/admin/pages": ["content.create", "content.edit"],
    "/admin/settings": ["settings.general", "settings.security"],
    "/admin/marketing/analytics": ["settings.general", "analytics.view"],
    "/admin/analytics": ["analytics.view"],
    "/admin/users": ["users.view", "users.create"],
};

/**
 * Maps sidebar nav items to required permissions.
 * Item is visible if user has ANY of the listed permissions.
 */
export const NAV_PERMISSIONS: Record<string, string[]> = {
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
};

/**
 * Get the currently logged in user with their role + permissions.
 * Works in Server Components and API Routes.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
    try {
        const supabase = await createClient();
        const { data: { user: authUser } } = await supabase.auth.getUser();

        if (!authUser) return null;

        // Fetch admin_users profile + role info using admin client (bypasses RLS)        
        const admin = createAdminClient();

        const { data: profile } = await admin
            .from("admin_users")
            .select(`
                id, name, email, role_id, status,
                role:admin_roles(id, role_name)
            `)
            .eq("id", authUser.id)
            .single();

        if (!profile) {
            // Auth user exists but no admin_users record — treat as basic user
            return {
                id: authUser.id,
                name: authUser.user_metadata?.name || authUser.email?.split("@")[0] || "User",
                email: authUser.email || "",
                role_id: null,
                role_name: "Unknown",
                status: "active",
                permissions: ["analytics.view"], // minimal: can view dashboard
            };
        }

        // Fetch permissions for this role
        let permissions: string[] = [];
        if (profile.role_id) {
            const { data: rolePerms } = await admin
                .from("admin_role_permissions")
                .select("permission_id")
                .eq("role_id", profile.role_id);

            if (rolePerms && rolePerms.length > 0) {
                const permIds = rolePerms.map((rp: any) => rp.permission_id);

                const { data: perms } = await admin
                    .from("admin_permissions")
                    .select("permission_key")
                    .in("id", permIds);

                permissions = perms?.map((p: any) => p.permission_key) || [];
            }
        }

        const roleName = (profile.role as any)?.role_name || "Unknown";

        return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            role_id: profile.role_id,
            role_name: roleName,
            status: profile.status,
            permissions,
        };
    } catch (err) {
        console.error("getCurrentUser error:", err);
        return null;
    }
}

/**
 * Check if user has a specific permission
 */
export function hasPermission(user: CurrentUser | null, permissionKey: string): boolean {
    if (!user) return false;
    if (user.role_name === "Super Admin") return true;
    return user.permissions.includes(permissionKey);
}

/**
 * Check if user has ANY of the given permissions
 */
export function hasAnyPermission(user: CurrentUser | null, permissionKeys: string[]): boolean {
    if (!user) return false;
    if (user.role_name === "Super Admin") return true;
    return permissionKeys.some(key => user.permissions.includes(key));
}

/**
 * Check if user can access a specific route
 */
export function canAccessRoute(user: CurrentUser | null, pathname: string): boolean {
    if (!user) return false;
    if (user.role_name === "Super Admin") return true;
    if (user.status !== "active") return false;

    // Find matching route
    let requiredPermissions = ROUTE_PERMISSIONS[pathname];

    if (!requiredPermissions) {
        // Prefix match for dynamic routes like /admin/blogs/[id]
        const matchingRoute = Object.keys(ROUTE_PERMISSIONS).find(route =>
            pathname.startsWith(route + "/") || pathname === route
        );
        if (matchingRoute) {
            requiredPermissions = ROUTE_PERMISSIONS[matchingRoute];
        }
    }

    // No permission defined = allow
    if (!requiredPermissions) return true;

    // User needs ANY of the required permissions
    return requiredPermissions.some(perm => user.permissions.includes(perm));
}
