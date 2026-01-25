import { sql } from "@vercel/postgres";

export async function initDatabase() {
    try {
        // Leads Table
        await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        service TEXT,
        message TEXT,
        source TEXT,
        status TEXT DEFAULT 'New',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

        // Services Table
        await sql`
      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        title TEXT,
        meta_title TEXT,
        meta_desc TEXT,
        hero_text TEXT,
        why_matters TEXT,
        description TEXT,
        benefits JSONB,
        problems JSONB,
        approach JSONB,
        tools JSONB,
        outcomes JSONB,
        faq JSONB,
        category TEXT,
        highlights JSONB,
        icon_name TEXT,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

        // Blogs Table
        await sql`
      CREATE TABLE IF NOT EXISTS blogs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT,
        category TEXT,
        author JSONB,
        published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        read_time TEXT,
        tags JSONB,
        table_of_contents JSONB,
        faqs JSONB,
        related_resources JSONB
      );
    `;

        // Pricing Table
        await sql`
      CREATE TABLE IF NOT EXISTS pricing (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price TEXT,
        description TEXT,
        features JSONB,
        popular BOOLEAN DEFAULT false,
        badge TEXT,
        color TEXT,
        pricing_key TEXT UNIQUE NOT NULL
      );
    `;

        // Case Studies Table
        await sql`
      CREATE TABLE IF NOT EXISTS case_studies (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category TEXT,
        client TEXT,
        results JSONB,
        overview TEXT,
        challenge TEXT,
        solution TEXT,
        items JSONB,
        published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

        console.log("Database initialized successfully.");
    } catch (error) {
        console.error("Database initialization failed:", error);
        throw error;
    }
}
