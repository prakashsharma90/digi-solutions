# Blog Editor Fix - Database Migration Required

## Issue
The blog editor is trying to save to a column `meta_desc` that doesn't exist in your Supabase database yet.

## Solution
You need to run a SQL migration to add the missing columns to your `blogs` table.

## Steps to Fix:

### 1. Open Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click on "SQL Editor" in the left sidebar

### 2. Run the Migration
1. Copy the entire contents of `migrations/add-blog-columns.sql`
2. Paste it into the SQL Editor
3. Click "Run" or press Ctrl+Enter

### 3. Verify the Migration
The script will automatically verify the migration at the end. You should see all the new columns listed:
- `meta_desc`
- `meta_title`
- `image`
- `status`
- `type`
- `author_name`
- `author_role`
- `updated_at`

### 4. Test the Blog Editor
After running the migration:
1. Go to your admin panel
2. Try editing a blog post
3. Add a meta description
4. Save the changes
5. Reload the page - the meta description should now be saved!

## What Was Fixed

### Issue 1: Meta Description Not Saving ✅
- **Root Cause**: Database was missing the `meta_desc` column
- **Fix**: Migration adds the column to the database

### Issue 2: Updates Not Reflecting ✅
- **Root Cause**: Next.js cache wasn't being cleared
- **Fix**: Added `router.refresh()` and cache revalidation API

### Issue 3: No Image Upload ✅
- **Root Cause**: Only URL input was available
- **Fix**: Added file upload button with `/api/upload` endpoint

## Files Modified
- `src/components/admin/BlogEditor.tsx` - Fixed all 3 issues
- `src/app/api/upload/route.ts` - New image upload API
- `src/app/api/revalidate/route.ts` - Cache revalidation API
- `src/app/api/admin/seed/route.ts` - Fixed field name
- `migrations/add-blog-columns.sql` - Database migration script

## Need Help?
If you encounter any issues running the migration, let me know!
