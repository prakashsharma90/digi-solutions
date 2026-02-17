# Google Site Verification Setup

## What Was Done

The Google site verification meta tag has been added to your website with conditional logic so it **only appears on your live production website** (https://digihubsolution.tech/).

### Changes Made:

1. **Updated `src/app/layout.tsx`**:
   - Added `verification.google` to the metadata object
   - The verification tag only renders when `NEXT_PUBLIC_SITE_URL === 'https://digihubsolution.tech'`

2. **Updated `.env.local`**:
   - Added `NEXT_PUBLIC_SITE_URL="http://localhost:3000"` for local development
   - This ensures the verification tag does NOT appear locally

## Required: Vercel Environment Variable Setup

To make this work on your live website, you **MUST** add the environment variable in Vercel:

### Steps:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (digihub)
3. Go to **Settings** → **Environment Variables**
4. Add a new environment variable:
   - **Key**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://digihubsolution.tech`
   - **Environment**: Select **Production** only (NOT Preview or Development)
5. Click **Save**
6. Redeploy your site for the changes to take effect

## How It Works

- **Local Development** (`http://localhost:3000`): ❌ No verification tag
- **Vercel Preview Deployments** (e.g., `*.vercel.app`): ❌ No verification tag
- **Production Website** (`https://digihubsolution.tech`): ✅ Verification tag appears

## Verification

After deploying to production, you can verify the meta tag is present by:

1. Visiting https://digihubsolution.tech/
2. Right-click → View Page Source
3. Look for: `<meta name="google-site-verification" content="nmrw0tHjOXxuCbQZi1crZMbHcLF8zlap5OS3G8m96Kw" />`

The tag should be in the `<head>` section of your HTML.

## Google Search Console

Once the environment variable is set in Vercel and you've redeployed:

1. Go to Google Search Console
2. Click "Verify" on your property
3. Google will check for the meta tag and verify your site ownership
