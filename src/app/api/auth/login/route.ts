import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Fallback for local development if Supabase auth is not yet set up with users
      const isLocal = process.env.NODE_ENV === 'development';
      if (isLocal && email === "admin@digihub.com" && password === "password123") {
        const response = NextResponse.json(
          { message: "Login successful (Dev Fallback)", user: { email: "admin@digihub.com", role: "admin" } },
          { status: 200 }
        );

        (await cookies()).set("dev_admin_session", "true", {
          httpOnly: true,
          secure: false, // Localhost is usually http
          sameSite: "lax",
          maxAge: 60 * 60 * 24, // 24 hours
          path: "/",
        });

        return response;
      }
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Login successful", user: data.user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
