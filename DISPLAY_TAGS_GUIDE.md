# Service Display Tags Implementation Guide

## Overview
I've implemented a tagging system that allows you to control where each service appears on your website (Home Page, Services Page, and Navigation Bar).

## What's New

### 1. **Database Changes**
A new `display_tags` column has been added to the `services` table that stores an array of locations where the service should appear.

**Migration File:** `supabase/migrations/add_display_tags.sql`

To apply this migration to your production database:
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the following SQL:

```sql
-- Add display_tags column to services table
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS display_tags TEXT[] DEFAULT '{}';

-- Add a comment to describe the column
COMMENT ON COLUMN services.display_tags IS 'Array of display locations: home, services, navbar';

-- Create an index for better query performance
CREATE INDEX IF NOT EXISTS idx_services_display_tags ON services USING GIN(display_tags);
```

### 2. **Admin Panel Updates**
The service editor now includes a "Display On" section in the Visibility panel where you can select:
- ✅ **Home Page** - Service appears in the home page services section
- ✅ **Services Page** - Service appears on the /services page  
- ✅ **Navigation Bar** - Service appears in the navbar (if implemented)

**Location:** `/admin/services/[id]` (Edit Service page)

### 3. **Frontend Changes**

#### Home Page (`src/components/sections/ServicesGrid.tsx`)
- Now fetches only services tagged with `'home'`
- Displays services based on admin selections
- No more hardcoded service slugs!

#### Services Page (`src/components/sections/services/ServicesOverview.tsx`)
- Now fetches only services tagged with `'services'`
- Shows all services you want to display on the services page

## How to Use

### Adding/Editing a Service:
1. Go to `/admin/services`
2. Click on a service to edit (or create new)
3. In the **Visibility** section, you'll see "Display On"
4. Click on the checkboxes to select where the service should appear:
   - Check "Home Page" to show on homepage
   - Check "Services Page" to show on /services
   - Check "Navigation Bar" for navbar (future use)
5. Click "Save Changes"

### Example Scenarios:

**Scenario 1: Service only on Home Page**
- ✅ Home Page
- ⬜ Services Page
- ⬜ Navigation Bar

**Scenario 2: Service on both Home and Services Page**
- ✅ Home Page
- ✅ Services Page
- ⬜ Navigation Bar

**Scenario 3: Service only on Services Page**
- ⬜ Home Page
- ✅ Services Page
- ⬜ Navigation Bar

## Setting Up Your 6 Services

To show your requested services on the home page:

1. Go to `/admin/services`
2. For each of these services:
   - Performance Marketing
   - Search Engine Optimization (SEO)
   - Content Marketing Services
   - Social Media Marketing Services
   - Influencer Marketing Services
   - Email Marketing Services

3. Edit each one and check **"Home Page"** in the Display On section
4. Also check **"Services Page"** if you want them to appear there too
5. Save each service

## Technical Details

### Database Schema
```typescript
display_tags: string[]  // Array of: 'home', 'services', 'navbar'
```

### Query Example (Home Page)
```typescript
supabase
  .from('services')
  .select('slug, name, description, display_tags')
  .eq('status', 'Published')
  .eq('is_deleted', false)
  .contains('display_tags', ['home'])  // Only services tagged with 'home'
  .order('sort_order', { ascending: true });
```

## Benefits

✅ **Flexibility** - Control exactly where each service appears
✅ **Dynamic** - No code changes needed to update service visibility
✅ **Scalable** - Easy to add more display locations in the future
✅ **Real-time** - Changes reflect immediately with real-time subscriptions

## Next Steps

1. **Run the migration** (SQL provided above)
2. **Tag your existing services** via the admin panel
3. **Test** by visiting the home page and services page
4. **(Optional)** Implement navbar dropdown using the 'navbar' tag

## Troubleshooting

**Q: Services not showing on home page?**
A: Make sure they are:
- Published (status = 'Published')
- Not deleted (is_deleted = false)
- Tagged with 'home' in Display On section

**Q: Can I show different services on home vs services page?**
A: Yes! Just tag them differently. For example:
- Home: Only your top 6 services  
- Services: All your services
