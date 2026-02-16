import { createClient } from "@supabase/supabase-js";

export async function getMegaMenuCategories() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

        if (!supabaseUrl || !supabaseAnonKey) {
            console.error("Missing Supabase credentials in getMegaMenuCategories");
            return null;
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        // Fetch from site_settings table
        const { data, error } = await supabase
            .from('site_settings')
            .select('value')
            .eq('key', 'mega_menu_categories')
            .single();

        if (error) {
            console.error("Error fetching mega menu categories:", error);
            return null;
        }

        if (!data || !data.value) {
            return null;
        }

        return data.value;
    } catch (e) {
        console.error("Failed to fetch mega menu categories:", e);
        return null;
    }
}
