# 🔧 Social Media Pricing - Setup Guide

## ⚠️ Issue: Pricing Not Updating from Admin

### **Problem:**
When you update pricing in the admin panel, the Social Media page doesn't show the changes.

### **Solution:**
Follow these steps to fix it:

---

## 📋 Step 1: Check Service ID in Admin

When creating pricing plans in the admin panel, make sure you use one of these service IDs:

### **Option 1 (Recommended):**
```
service_id: social-media-marketing
```

### **Option 2 (Alternative):**
```
service_id: social
```

The page now checks for both IDs automatically.

---

## 📋 Step 2: Create Pricing Plans in Admin

Go to: `http://localhost:3000/admin/pricing`

### **Plan 1: Starter**
- **Service ID:** `social-media-marketing` or `social`
- **Name:** Starter
- **Price:** 45000
- **Currency:** INR
- **Billing Cycle:** monthly
- **Description:** Perfect for small businesses testing social media
- **Features:**
  ```
  12 posts per month
  4 Reels/Shorts
  2 platforms (Instagram + LinkedIn)
  Basic community management
  Monthly performance reports
  Content calendar
  ```
- **Is Popular:** No
- **Is Custom:** No
- **Is Active:** Yes

### **Plan 2: Growth** (Most Popular)
- **Service ID:** `social-media-marketing` or `social`
- **Name:** Growth
- **Price:** 75000
- **Currency:** INR
- **Billing Cycle:** monthly
- **Description:** For growing brands ready to scale
- **Features:**
  ```
  20 posts per month
  8 Reels/Shorts
  3 platforms (Instagram + LinkedIn + YouTube)
  Full community management
  Weekly performance reports
  Content calendar + strategy
  Dedicated account manager
  ```
- **Is Popular:** Yes ✅
- **Is Custom:** No
- **Is Active:** Yes

### **Plan 3: Authority** (Custom)
- **Service ID:** `social-media-marketing` or `social`
- **Name:** Authority
- **Price:** 0 (or any number, will show "Custom")
- **Currency:** INR
- **Billing Cycle:** monthly
- **Description:** Enterprise-level social media dominance
- **Features:**
  ```
  Custom posting schedule
  Unlimited Reels/Shorts
  All platforms
  24/7 community management
  Real-time analytics dashboard
  Custom content strategy
  Dedicated creative team
  Priority support
  ```
- **Is Popular:** No
- **Is Custom:** Yes ✅
- **Is Active:** Yes

---

## 📋 Step 3: Force Refresh the Page

After creating/updating plans:

### **Method 1: Hard Refresh**
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### **Method 2: Clear Cache**
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

### **Method 3: Restart Dev Server**
1. Stop the server (Ctrl + C)
2. Run `npm run dev` again
3. Visit the page

---

## 🔍 Step 4: Verify It's Working

### **Check Database:**
1. Go to Supabase Dashboard
2. Open `pricing_plans` table
3. Verify plans exist with:
   - `service_id` = `social-media-marketing` or `social`
   - `is_active` = `true`
   - `features` array is populated

### **Check Page:**
1. Visit: `http://localhost:3000/services/social`
2. Scroll to pricing section
3. You should see:
   - Plan names (Starter, Growth, Authority)
   - Prices (₹45,000, ₹75,000, Custom)
   - Descriptions
   - "What's Included" section
   - All features with checkmarks
   - Monthly/Annual toggle

---

## 🎯 How It Works Now

### **Dynamic Fetching:**
```tsx
// Page tries multiple service IDs
1. First tries: 'social-media-marketing'
2. If not found, tries: 'social'
3. If still not found, shows fallback plans
```

### **No Caching:**
```tsx
export const revalidate = 0;
export const dynamic = 'force-dynamic';
```

This ensures the page always fetches fresh data from the database.

---

## 🐛 Troubleshooting

### **Issue: Still showing fallback plans**

**Check:**
1. Service ID matches (`social-media-marketing` or `social`)
2. Plans are marked as `is_active = true`
3. Features array is not empty
4. Hard refresh the page (Ctrl + Shift + R)

### **Issue: Features not showing**

**Fix:**
Make sure the `features` field in the database is an array:
```json
[
  "12 posts per month",
  "4 Reels/Shorts",
  "2 platforms"
]
```

Not a string!

### **Issue: Price not updating**

**Steps:**
1. Update price in admin panel
2. Click Save
3. Hard refresh the page (Ctrl + Shift + R)
4. Check if price changed

If still not working:
1. Check browser console for errors
2. Verify database was actually updated
3. Restart dev server

---

## ✅ Quick Test

### **Test Monthly/Annual Toggle:**
1. Visit `/services/social`
2. Scroll to pricing
3. Click "Annual" toggle
4. Prices should change (20% discount)
5. Should show "Save ₹X per year"

### **Test Database Update:**
1. Go to admin panel
2. Change Starter price from ₹45,000 to ₹50,000
3. Save
4. Hard refresh `/services/social`
5. Should show ₹50,000

---

## 📊 Expected Result

After setup, you should see:

```
┌─────────────────────────────────────────┐
│         Transparent Pricing             │
│  [Monthly] [Annual -20%]                │
└─────────────────────────────────────────┘

┌──────────┐  ┌──────────┐  ┌──────────┐
│ Starter  │  │ Growth   │  │ Custom   │
│          │  │ ⭐ MOST  │  │          │
│ ₹45,000  │  │ POPULAR  │  │ Custom   │
│ /mo      │  │ ₹75,000  │  │          │
│          │  │ /mo      │  │          │
│ Features │  │ Features │  │ Features │
│ ✓ ...    │  │ ✓ ...    │  │ ✓ ...    │
└──────────┘  └──────────┘  └──────────┘
```

---

**Status:** ✅ Fixed with `dynamic = 'force-dynamic'`  
**Service IDs:** `social-media-marketing` or `social`  
**Caching:** Disabled  
**Last Updated:** 2026-01-25 00:50 IST
