import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/rbac";

// GET — Return the currently logged-in user's profile + permissions
export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Not authenticated" },
                { status: 401 }
            );
        }

        return NextResponse.json({ success: true, user });
    } catch (err: any) {
        console.error("Auth me error:", err);
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
