import { createAdminClient } from "@/lib/supabase/server";

export async function isMaintenanceMode(): Promise<boolean> {
    try {
        const supabase = createAdminClient();
        const { data } = await supabase
            .from("site_settings")
            .select("value")
            .eq("key", "maintenance_mode")
            .single();

        return data?.value === "true";
    } catch (err) {
        console.error("Maintenance check error:", err);
        return false;
    }
}
