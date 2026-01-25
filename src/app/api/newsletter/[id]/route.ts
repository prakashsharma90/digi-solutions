import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        console.log("DELETE request for subscriber ID:", id);

        if (!id) {
            return NextResponse.json(
                { error: "Subscriber ID is required" },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        // First check if subscriber exists
        const { data: existing, error: fetchError } = await supabase
            .from("newsletter_subscribers")
            .select("id, email")
            .eq("id", id)
            .single();

        if (fetchError || !existing) {
            console.error("Subscriber not found:", id, fetchError);
            return NextResponse.json(
                { error: "Subscriber not found" },
                { status: 404 }
            );
        }

        console.log("Deleting subscriber:", existing.email);

        // Delete the subscriber
        const { error } = await supabase
            .from("newsletter_subscribers")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting subscriber:", error);
            throw error;
        }

        console.log("Successfully deleted subscriber:", existing.email);

        return NextResponse.json({
            success: true,
            message: "Subscriber deleted successfully",
        });
    } catch (error: any) {
        console.error("Delete subscriber error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to delete subscriber" },
            { status: 500 }
        );
    }
}

// Update subscriber (for unsubscribe, edit tags, etc.)
export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: "Subscriber ID is required" },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        // Update the subscriber
        const { data, error } = await supabase
            .from("newsletter_subscribers")
            .update(body)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            console.error("Error updating subscriber:", error);
            throw error;
        }

        return NextResponse.json({
            success: true,
            message: "Subscriber updated successfully",
            data,
        });
    } catch (error: any) {
        console.error("Update subscriber error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to update subscriber" },
            { status: 500 }
        );
    }
}
