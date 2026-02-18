import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_digisolutions_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_digisolutions_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn("Supabase client: Missing environment variables.");
        // Return a mock if we're in a critical path, or just let it be caught later.
        // For now, we'll try to prevent the immediate constructor crash.
    }

    return createBrowserClient(
        supabaseUrl || '',
        supabaseAnonKey || ''
    )
}
