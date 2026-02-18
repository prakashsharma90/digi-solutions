import { createClient } from "@/lib/supabase/server";

export async function getMegaMenuCategories() {
    try {
        const supabase = await createClient();

        // Fetch from site_settings table
        const { data, error } = await supabase
            .from('site_settings')
            .select('value')
            .eq('key', 'mega_menu_categories')
            .maybeSingle();

        if (error) {
            console.error("Error fetching mega menu categories:", error.message || error);
            return undefined;
        }

        if (!data || !data.value) {
            return undefined;
        }

        return data.value;
    } catch (e) {
        console.error("Failed to fetch mega menu categories:", e);
        return undefined;
    }
}
