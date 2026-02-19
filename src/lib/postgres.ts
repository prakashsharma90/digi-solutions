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
        image TEXT,
        status TEXT DEFAULT 'draft',
        type TEXT DEFAULT 'blog',
        meta_title TEXT,
        meta_desc TEXT,
        author_name TEXT,
        author_role TEXT,
        author JSONB,
        published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
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

    // Chat Sessions Table
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(255),
        channel VARCHAR(50),
        started_at TIMESTAMPTZ DEFAULT NOW(),
        ended_at TIMESTAMPTZ,
        metadata JSONB
      );
    `;

    // Chat Messages Table
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
        role VARCHAR(20) NOT NULL,
        content TEXT NOT NULL,
        intent VARCHAR(100),
        confidence FLOAT,
        latency_ms INTEGER,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // Create Indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id, created_at);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id, started_at DESC);`;

    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
}
