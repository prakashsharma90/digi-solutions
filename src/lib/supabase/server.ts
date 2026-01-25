import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const cookieStore = await cookies()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_digisolutions_SUPABASE_URL || process.env.digisolutions_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_digisolutions_SUPABASE_ANON_KEY || process.env.digisolutions_SUPABASE_ANON_KEY;

    return createServerClient(
        supabaseUrl!,
        supabaseAnonKey!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}

// Special Admin client with Service Role Key for server-side bypassing of RLS
export function createAdminClient() {
    const { createClient } = require('@supabase/supabase-js')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_digisolutions_SUPABASE_URL || process.env.digisolutions_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.digisolutions_SUPABASE_SERVICE_ROLE_KEY;

    return createClient(
        supabaseUrl!,
        supabaseServiceKey!
    )
}
