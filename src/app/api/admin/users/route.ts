import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

// GET - List all admin users with their roles
export async function GET() {
    try {
        const supabase = createAdminClient();

        const { data, error } = await supabase
            .from("admin_users")
            .select(`
                *,
                role:admin_roles(id, role_name)
            `)
            .order("created_at", { ascending: false });

        if (error) throw error;

        return NextResponse.json({ success: true, users: data || [] });
    } catch (err: any) {
        console.error("Users GET error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// POST - Create a new admin user (creates Supabase Auth account + admin_users record)
export async function POST(req: NextRequest) {
    try {
        const { name, email, password, role_id, status } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { success: false, error: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { success: false, error: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        // Step 1: Create Supabase Auth user
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-confirm the email
            user_metadata: { name, role: "admin_team" },
        });

        if (authError) {
            // Handle duplicate email
            if (authError.message.includes("already been registered")) {
                return NextResponse.json(
                    { success: false, error: "This email is already registered" },
                    { status: 400 }
                );
            }
            throw authError;
        }

        // Step 2: Create admin_users record linked to auth user
        const { data, error } = await supabase
            .from("admin_users")
            .insert({
                id: authData.user.id, // Use same ID as auth user
                name,
                email,
                role_id: role_id || null,
                status: status || "active",
            })
            .select(`*, role:admin_roles(id, role_name)`)
            .single();

        if (error) {
            // If admin_users insert fails, clean up the auth user
            await supabase.auth.admin.deleteUser(authData.user.id);
            throw error;
        }

        // Step 3: Log the activity
        await supabase.from("admin_activity_log").insert({
            user_name: "Admin",
            action: "User Created",
            details: `Added new team member: ${name} (${email})`,
        });

        return NextResponse.json({ success: true, user: data });
    } catch (err: any) {
        console.error("Users POST error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// PUT - Update an admin user
export async function PUT(req: NextRequest) {
    try {
        const { id, name, email, role_id, status, password } = await req.json();

        if (!id) {
            return NextResponse.json(
                { success: false, error: "User ID is required" },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        // Update admin_users record
        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (role_id !== undefined) updateData.role_id = role_id;
        if (status !== undefined) updateData.status = status;

        const { data, error } = await supabase
            .from("admin_users")
            .update(updateData)
            .eq("id", id)
            .select(`*, role:admin_roles(id, role_name)`)
            .single();

        if (error) throw error;

        // If email or password changed, update the Supabase Auth user too
        const authUpdate: any = {};
        if (email !== undefined) authUpdate.email = email;
        if (password && password.length >= 6) authUpdate.password = password;

        if (Object.keys(authUpdate).length > 0) {
            const { error: authError } = await supabase.auth.admin.updateUserById(id, authUpdate);
            if (authError) {
                console.error("Auth update warning:", authError.message);
            }
        }

        // Log activity
        await supabase.from("admin_activity_log").insert({
            user_name: "Admin",
            action: "User Updated",
            details: `Updated user: ${data.name} (${data.email})`,
        });

        return NextResponse.json({ success: true, user: data });
    } catch (err: any) {
        console.error("Users PUT error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// DELETE - Remove an admin user (deletes from both admin_users AND Supabase Auth)
export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json(
                { success: false, error: "User ID is required" },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        // Get user info for log before deleting
        const { data: user } = await supabase
            .from("admin_users")
            .select("name, email")
            .eq("id", id)
            .single();

        // Delete from admin_users
        const { error } = await supabase.from("admin_users").delete().eq("id", id);
        if (error) throw error;

        // Delete from Supabase Auth
        const { error: authError } = await supabase.auth.admin.deleteUser(id);
        if (authError) {
            console.error("Auth delete warning:", authError.message);
        }

        // Log activity
        if (user) {
            await supabase.from("admin_activity_log").insert({
                user_name: "Admin",
                action: "User Deleted",
                details: `Removed team member: ${user.name} (${user.email})`,
            });
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Users DELETE error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
