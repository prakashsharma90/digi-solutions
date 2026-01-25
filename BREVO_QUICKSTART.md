# 🚀 Quick Start: Brevo Email Integration

## ⚡ 3-Minute Setup

### Step 1: Get Brevo API Key
1. Go to https://app.brevo.com/settings/keys/api
2. Click "Generate a new API key"
3. Copy the key

### Step 2: Add to Environment
Open `.env.local` and replace:
```bash
BREVO_API_KEY="xkeysib-YOUR_ACTUAL_KEY_HERE"
```

### Step 3: Verify Sender Email
1. Go to https://app.brevo.com/settings/senders
2. Add and verify your email (e.g., `hello@digihub.agency`)

### Step 4: Update Code
Edit `src/lib/email/brevo.ts` line 31 and 122:
```typescript
email: "hello@digihub.agency" // ← Your verified email
```

### Step 5: Restart Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

## ✅ Test It

1. Visit: `http://localhost:3000/blog`
2. Subscribe with your email
3. Check your inbox for welcome email!

## 📊 Monitor

- Dashboard: https://app.brevo.com/
- View sent emails: Campaigns → Transactional
- Check stats: Statistics → Overview

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| "API key not found" | Add to `.env.local` and restart |
| "Sender not verified" | Verify email in Brevo settings |
| Email in spam | Set up SPF/DKIM in Brevo |
| Daily limit hit | Upgrade plan or wait 24h |

## 📝 What Was Installed

✅ `@getbrevo/brevo` - Official Brevo SDK
✅ `src/lib/email/brevo.ts` - Email service functions
✅ Updated `src/app/api/newsletter/route.ts` - Auto-send welcome emails
✅ `.env.local` - Added BREVO_API_KEY variable

## 🎯 Next Steps

- [ ] Get Brevo API key
- [ ] Add to `.env.local`
- [ ] Verify sender email
- [ ] Update sender in code
- [ ] Test subscription
- [ ] Check Brevo dashboard

---

**Need help?** Check `docs/BREVO_EMAIL_SETUP.md` for detailed guide.
