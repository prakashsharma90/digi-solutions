import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { sendWelcomeEmail } from "@/lib/email/brevo";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name, source } = body;

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        // Check if email already exists
        const { data: existing } = await supabase
            .from("newsletter_subscribers")
            .select("id, status")
            .eq("email", email)
            .single();

        if (existing) {
            if (existing.status === "active") {
                return NextResponse.json(
                    { error: "You're already subscribed!" },
                    { status: 400 }
                );
            } else {
                // Reactivate subscription
                const { error: updateError } = await supabase
                    .from("newsletter_subscribers")
                    .update({
                        status: "active",
                        last_activity: new Date().toISOString(),
                    })
                    .eq("id", existing.id);

                if (updateError) throw updateError;

                return NextResponse.json({
                    success: true,
                    message: "Welcome back! Your subscription has been reactivated.",
                });
            }
        }

        // Get IP and user agent
        const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
        const userAgent = request.headers.get("user-agent") || "";

        // Create new subscriber
        const { data, error } = await supabase
            .from("newsletter_subscribers")
            .insert([
                {
                    email,
                    name: name || null,
                    status: "active",
                    source: source || "Unknown",
                    consent: true,
                    double_opt_in: false, // Set to true if you implement double opt-in
                    ip_address: ip,
                    user_agent: userAgent,
                    first_seen: new Date().toISOString(),
                    last_activity: new Date().toISOString(),
                    lead_score: 10, // Initial score
                    engagement: "warm",
                    tags: [source || "Newsletter"],
                },
            ])
            .select();

        if (error) {
            console.error("Supabase error:", error);
            throw error;
        }

        // Send welcome email
        try {
            await sendWelcomeEmail({
                email,
                name: name || email.split('@')[0]
            });
        } catch (emailError) {
            console.error("Failed to send welcome email:", emailError);
            // Don't fail the subscription if email fails
        }

        return NextResponse.json({
            success: true,
            message: "Successfully subscribed! Check your inbox for confirmation.",
            data: data[0],
        });
    } catch (error: any) {
        console.error("Newsletter subscription error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to subscribe" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const supabase = createAdminClient();

        const { data, error } = await supabase
            .from("newsletter_subscribers")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        return NextResponse.json({ subscribers: data });
    } catch (error: any) {
        console.error("Error fetching subscribers:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch subscribers" },
            { status: 500 }
        );
    }
}
