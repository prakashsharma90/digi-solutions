# 📧 Brevo Email Integration Guide

## Overview
This guide explains how to set up and use Brevo (formerly Sendinblue) for sending newsletter emails in your Digihub application.

## Setup Steps

### 1. Create Brevo Account

1. Visit [https://www.brevo.com/](https://www.brevo.com/)
2. Click **"Sign up free"**
3. Complete the registration form
4. Verify your email address

**Free Tier Benefits:**
- 300 emails per day
- Unlimited contacts
- Email templates
- Basic automation

### 2. Get Your API Key

1. Log in to your Brevo account
2. Click on your **account name** (top right corner)
3. Select **"SMTP & API"** from the dropdown
4. Navigate to the **"API Keys"** tab
5. Click **"Generate a new API key"**
6. Name it: `DigiHub Newsletter`
7. **Copy the API key immediately** (you won't be able to see it again)

### 3. Configure Sender Email

**Important:** You must verify your sender email address in Brevo.

1. Go to **Settings** → **Senders & IP**
2. Click **"Add a sender"**
3. Enter your email (e.g., `hello@digihub.agency`)
4. Verify the email by clicking the link sent to your inbox

### 4. Add API Key to Environment Variables

Open your `.env.local` file and replace the placeholder:

```bash
BREVO_API_KEY="your_actual_brevo_api_key_here"
```

**⚠️ Important:** 
- Never commit this file to Git
- Restart your dev server after adding the key

### 5. Update Sender Email in Code

Edit `src/lib/email/brevo.ts` and replace the sender email:

```typescript
sendSmtpEmail.sender = {
  name: "Digihub Solutions",
  email: "hello@digihub.agency" // ← Replace with your verified email
};
```

## Testing the Integration

### Test 1: Subscribe via Blog Sidebar

1. Navigate to any blog post: `http://localhost:3000/blog/[slug]`
2. Find the newsletter widget in the sidebar
3. Enter your email address
4. Click "Subscribe Free"
5. Check your inbox for the welcome email

### Test 2: Subscribe via Blog Grid

1. Go to the blog listing page: `http://localhost:3000/blog`
2. Scroll to the newsletter CTA card
3. Enter your email
4. Submit the form
5. Verify the welcome email arrives

### Test 3: Check Brevo Dashboard

1. Log in to [https://app.brevo.com/](https://app.brevo.com/)
2. Go to **Campaigns** → **Transactional**
3. You should see your sent emails listed

## Features Implemented

✅ **Welcome Email** - Automatically sent to new subscribers
✅ **Professional HTML Template** - Responsive design matching your brand
✅ **Error Handling** - Graceful fallback if email fails
✅ **Duplicate Prevention** - Won't send multiple welcome emails
✅ **Unsubscribe Link** - Automatically included by Brevo

## Email Template Customization

The welcome email template is located in `src/lib/email/brevo.ts`. You can customize:

- **Subject line** (line 27)
- **Email content** (lines 33-110)
- **CTA button link** (line 73)
- **Footer links** (lines 101-105)

### Example Customization:

```typescript
sendSmtpEmail.subject = "🎉 Welcome to Digihub - Your Growth Starts Now!";

// Update the CTA button
<a href="https://digihub.agency/services" style="...">
  Explore Our Services
</a>
```

## Advanced Features

### 1. Create Email Lists in Brevo

1. Go to **Contacts** → **Lists**
2. Create a new list: "Newsletter Subscribers"
3. Note the List ID (you'll see it in the URL)

### 2. Segment Subscribers

Update `src/app/api/newsletter/route.ts` to add contacts to lists:

```typescript
import { addToBrevoList } from "@/lib/email/brevo";

// After successful subscription
await addToBrevoList(email, YOUR_LIST_ID, {
  FIRSTNAME: name,
  SOURCE: source,
  SIGNUP_DATE: new Date().toISOString()
});
```

### 3. Send Campaign Emails

Use Brevo's dashboard to:
- Create email campaigns
- Schedule newsletters
- A/B test subject lines
- Track open rates and clicks

## Troubleshooting

### Issue: "API key not found"
**Solution:** Make sure you've added `BREVO_API_KEY` to `.env.local` and restarted your dev server.

### Issue: "Sender email not verified"
**Solution:** Verify your sender email in Brevo Settings → Senders & IP.

### Issue: Emails going to spam
**Solutions:**
- Verify your domain with SPF/DKIM records
- Use a professional sender email (not Gmail/Yahoo)
- Avoid spam trigger words in subject lines

### Issue: "Daily sending limit exceeded"
**Solution:** Upgrade to a paid Brevo plan or wait until the next day (free tier: 300/day).

## Production Deployment

### Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add `BREVO_API_KEY` with your production API key
4. Redeploy your application

### Best Practices

- ✅ Use different API keys for development and production
- ✅ Monitor your email sending limits
- ✅ Set up domain authentication (SPF, DKIM, DMARC)
- ✅ Regularly check bounce rates in Brevo dashboard
- ✅ Keep your contact list clean (remove bounced emails)

## Email Analytics

Track your newsletter performance in Brevo:

1. **Dashboard** → View overall stats
2. **Campaigns** → **Transactional** → See individual email performance
3. **Statistics** → Detailed analytics on opens, clicks, bounces

## Next Steps

### Implement Double Opt-In (Recommended)

1. Send confirmation email instead of welcome email
2. Include a verification link
3. Only activate subscription after click
4. Update `double_opt_in` field in database

### Create Email Templates in Brevo

1. Go to **Campaigns** → **Templates**
2. Design templates using drag-and-drop editor
3. Use template IDs in your code instead of HTML strings

### Set Up Automation

1. Create automated workflows in Brevo
2. Send drip campaigns to new subscribers
3. Re-engagement emails for inactive users

## Support

- **Brevo Documentation:** [https://developers.brevo.com/](https://developers.brevo.com/)
- **Brevo Support:** [https://help.brevo.com/](https://help.brevo.com/)
- **API Reference:** [https://developers.brevo.com/reference](https://developers.brevo.com/reference)

## Cost Breakdown

| Plan | Price | Emails/Month | Features |
|------|-------|--------------|----------|
| Free | $0 | 9,000 (300/day) | Basic features |
| Starter | $25/mo | 20,000 | No daily limit, A/B testing |
| Business | $65/mo | 60,000 | Advanced automation |
| Enterprise | Custom | Unlimited | Dedicated IP, Priority support |

---

**Last Updated:** January 2026
**Integration Status:** ✅ Complete and Ready to Use
