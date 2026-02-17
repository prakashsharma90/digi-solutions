import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

// GET - List all roles with their permissions
export async function GET() {
    try {
        const supabase = createAdminClient();

        // Get roles
        const { data: roles, error: rolesError } = await supabase
            .from("admin_roles")
            .select("*")
            .order("created_at", { ascending: true });

        if (rolesError) throw rolesError;

        // Get all permissions
        const { data: permissions, error: permsError } = await supabase
            .from("admin_permissions")
            .select("*")
            .order("category", { ascending: true });

        if (permsError) throw permsError;

        // Get role-permission mappings
        const { data: rolePerms, error: rpError } = await supabase
            .from("admin_role_permissions")
            .select("role_id, permission_id");

        if (rpError) throw rpError;

        // Attach permissions to roles
        const rolesWithPerms = (roles || []).map((role: any) => ({
            ...role,
            permissions: (rolePerms || [])
                .filter((rp: any) => rp.role_id === role.id)
                .map((rp: any) => rp.permission_id),
        }));

        return NextResponse.json({
            success: true,
            roles: rolesWithPerms,
            permissions: permissions || [],
        });
    } catch (err: any) {
        console.error("Roles GET error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// POST - Create a new role
export async function POST(req: NextRequest) {
    try {
        const { role_name, description, permissions } = await req.json();

        if (!role_name) {
            return NextResponse.json({ success: false, error: "Role name is required" }, { status: 400 });
        }

        const supabase = createAdminClient();

        // Create role
        const { data: role, error: roleError } = await supabase
            .from("admin_roles")
            .insert({ role_name, description: description || "" })
            .select()
            .single();

        if (roleError) throw roleError;

        // Assign permissions
        if (permissions && permissions.length > 0) {
            const rows = permissions.map((permId: string) => ({
                role_id: role.id,
                permission_id: permId,
            }));

            const { error: rpError } = await supabase
                .from("admin_role_permissions")
                .insert(rows);

            if (rpError) throw rpError;
        }

        return NextResponse.json({ success: true, role });
    } catch (err: any) {
        console.error("Roles POST error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// PUT - Update role
export async function PUT(req: NextRequest) {
    try {
        const { id, role_name, description, permissions } = await req.json();

        if (!id) {
            return NextResponse.json({ success: false, error: "Role ID is required" }, { status: 400 });
        }

        const supabase = createAdminClient();

        // Update role details
        const { error: roleError } = await supabase
            .from("admin_roles")
            .update({ role_name, description })
            .eq("id", id);

        if (roleError) throw roleError;

        // Update permissions: delete existing, re-insert
        await supabase.from("admin_role_permissions").delete().eq("role_id", id);

        if (permissions && permissions.length > 0) {
            const rows = permissions.map((permId: string) => ({
                role_id: id,
                permission_id: permId,
            }));

            const { error: rpError } = await supabase
                .from("admin_role_permissions")
                .insert(rows);

            if (rpError) throw rpError;
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Roles PUT error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// DELETE - Delete a role
export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ success: false, error: "Role ID is required" }, { status: 400 });
        }

        const supabase = createAdminClient();

        // Check if system role
        const { data: role } = await supabase
            .from("admin_roles")
            .select("is_system")
            .eq("id", id)
            .single();

        if (role?.is_system) {
            return NextResponse.json({ success: false, error: "Cannot delete system roles" }, { status: 400 });
        }

        const { error } = await supabase.from("admin_roles").delete().eq("id", id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("Roles DELETE error:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
