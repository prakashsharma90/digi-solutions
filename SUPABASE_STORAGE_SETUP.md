# Supabase Storage Setup Required

You have switched to Supabase Storage for image uploads. This is required for Vercel deployment because Vercel doesn't support permanent file uploads to the server filesystem.

## 🚨 MANDATORY ACTION REQUIRED

For uploads to work, you **MUST** create a storage bucket in your Supabase Dashboard:

1.  **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/_/storage/buckets
2.  **Create a New Bucket**:
    *   Click **"New Bucket"**
    *   Name it: `uploads` (must be exact)
    *   **Public Bucket**: ✅ Check this box (required for images to be visible)
    *   Click **"Save"**

3.  **Set Storage Policy (Important!)**:
    By default, even public buckets might restrict uploads. You need to allow uploads.
    
    *   Go to the **Configuration** tab or **Policies** for the `uploads` bucket.
    *   Click **"New Policy"** -> **"For full customization"**
    *   **Name**: `Allow Public Uploads`
    *   **Policy definition**:
        *   **Allowed operations**: SELECT, INSERT, UPDATE, DELETE (Check all for simplicity, or at least INSERT and SELECT)
        *   **Target roles**: `anon` (if allowing anyone) OR leave as default for authenticated users.
        *   **USING expression**: `true` (easiest for testing) or `auth.role() = 'authenticated'`
        *   **WITH CHECK expression**: `true`

    *For a quickstart (insecure but working):*
    1. Create policy "Give anon access"
    2. Select ALL operations
    3. Target roles: `anon` and `authenticted`
    4. USING expression: `true`
    5. WITH CHECK expression: `true`

## Why this change?
- **Previous Local Method**: Saved files to `public/uploads`. Worked on localhost, failed on Vercel (read-only system).
- **New Method**: Saves files to Supabase Cloud Storage. Works everywhere.
