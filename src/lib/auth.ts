import { cookies } from "next/headers";
import { createClient } from "./supabase/server";

export async function isAdminAuthenticated() {
    // 1. Check for real Supabase user
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) return true; // Trust the authenticated user
    } catch (e) {
        // Supabase fail is fine if we're local
    }

    // 2. Fallback for local development
    if (process.env.NODE_ENV === 'development') {
        const cookieStore = await cookies();
        return (await cookieStore).get("dev_admin_session")?.value === "true";
    }

    return false;
}
