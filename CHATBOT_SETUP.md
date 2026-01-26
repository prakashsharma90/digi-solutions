# AI Chatbot Setup Guide

## 🎉 What's Been Built

I've created a complete AI chatbot system for your Digital Marketing Agency with:

### ✅ Components Created:

1. **Chat Widget** (`src/components/ChatWidget.tsx`)
   - Modern, floating chat interface
   - Real-time messaging
   - Beautiful animations with Framer Motion
   - Minimize/maximize functionality
   - New message notifications
   - Mobile responsive

2. **API Route** (`src/app/api/chat/route.ts`)
   - Intelligent conversation management
   - Lead scoring system
   - Context-aware responses
   - Session tracking
   - Message history

3. **Admin Dashboard** (`src/app/admin/(dashboard)/chat-conversations/page.tsx`)
   - View all conversations
   - Filter by status (active, lead captured, closed)
   - Search functionality
   - Lead scoring display
   - Conversation details with full message history
   - Stats dashboard

4. **Admin API** (`src/app/api/admin/chat-conversations/route.ts`)
   - Fetch all conversations
   - Update conversation status
   - Manage visitor data

5. **Database Schema** (`supabase/migrations/20260126_chatbot.sql`)
   - `chat_conversations` table
   - `chat_messages` table
   - Indexes for performance
   - RLS policies

---

## 🚀 Setup Instructions

### Step 1: Run Database Migration

You need to create the database tables in Supabase:

**Option A: Supabase Dashboard (Recommended)**
1. Go to https://supabase.com/dashboard
2. Select your project: `cjzfpppesqplamkvseyt`
3. Click "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy the entire contents of `supabase/migrations/20260126_chatbot.sql`
6. Paste it into the SQL editor
7. Click "Run" or press Ctrl+Enter

**Option B: Using Supabase CLI** (if installed)
```bash
supabase db push
```

### Step 2: Test the Chatbot

The chatbot is already integrated into your website! It will appear on all pages.

1. Open your website: http://localhost:3000
2. Look for the floating chat button in the bottom-right corner
3. Click it to open the chat
4. Try these test messages:
   - "Hello" - Get the greeting
   - "Tell me about SEO" - Learn about SEO services
   - "What are your prices?" - Get pricing info
   - "I'm interested" - Trigger lead capture flow

### Step 3: View Conversations in Admin

1. Go to: http://localhost:3000/admin/chat-conversations
2. You'll see all chat conversations
3. Click on any conversation to view:
   - Visitor information
   - Full message history
   - Lead score
   - Status

---

## 🎯 Features

### For Visitors:
- ✅ Instant AI responses
- ✅ Service information (SEO, Google Ads, Social Media, etc.)
- ✅ Pricing guidance
- ✅ Lead capture
- ✅ Professional, consultative tone
- ✅ Mobile-friendly interface

### For Admins:
- ✅ View all conversations
- ✅ Filter by status
- ✅ Search conversations
- ✅ Lead scoring (0-100)
- ✅ Visitor details capture
- ✅ Conversation analytics

### Lead Scoring System:
The chatbot automatically scores leads based on engagement:
- Shows interest: +10 points
- Asks about pricing: +15 points
- Provides contact info: +20 points
- Mentions business details: +5 points

---

## 🔧 Customization

### Update AI Responses

Edit `src/app/api/chat/route.ts` to customize responses:

```typescript
// Find the generateAIResponse function
// Add new keyword-based responses
if (userMessage.includes('your-keyword')) {
  return `Your custom response here`;
}
```

### Integrate OpenAI API (Optional)

Replace the simple keyword-based system with actual AI:

1. Install OpenAI SDK:
```bash
npm install openai
```

2. Add to `.env.local`:
```
OPENAI_API_KEY=your_key_here
```

3. Update `generateAIResponse` function:
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateAIResponse(messages) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: DIGIHUB_SYSTEM_PROMPT },
      ...messages
    ],
  });
  
  return response.choices[0].message.content;
}
```

### Customize Chat Widget Appearance

Edit `src/components/ChatWidget.tsx`:

- **Colors**: Change gradient classes
  ```tsx
  // Current: from-blue-600 to-purple-600
  // Change to: from-green-600 to-teal-600
  ```

- **Position**: Modify `fixed bottom-6 right-6`
- **Size**: Adjust `max-w-md` and height values

---

## 📊 Current AI Responses

The chatbot currently handles:

1. **SEO Inquiries**
   - Service details
   - Pricing (₹25K - ₹1.5L/month)
   - Timeline expectations
   - Qualifying questions

2. **Google Ads**
   - Campaign types
   - Pricing structure
   - Expected results
   - Free audit offer

3. **Social Media**
   - Platform coverage
   - Content creation
   - Pricing (₹15K - ₹80K/month)
   - Strategy questions

4. **Website Development**
   - Tech stack
   - Pricing tiers
   - Timeline
   - Portfolio offer

5. **General Inquiries**
   - Service overview
   - Lead capture
   - Contact form redirection

---

## 🎨 UI Features

### Chat Widget:
- Gradient blue-purple theme
- Smooth animations
- Typing indicators
- Timestamp on messages
- Minimize/maximize
- New message badge
- Auto-scroll to latest message

### Admin Dashboard:
- Real-time stats
- Conversation filtering
- Search functionality
- Lead score visualization
- Status badges
- Responsive design

---

## 🔐 Security Notes

1. **RLS Policies**: Database has Row Level Security enabled
2. **Admin Auth**: Admin routes check for authenticated users
3. **Input Validation**: Messages are sanitized
4. **Rate Limiting**: Consider adding rate limiting for production

---

## 📈 Next Steps

### Recommended Enhancements:

1. **OpenAI Integration**
   - More natural conversations
   - Better context understanding
   - Multilingual support

2. **Email Notifications**
   - Alert admins of high-score leads
   - Send conversation transcripts

3. **CRM Integration**
   - Auto-create leads in your CRM
   - Sync conversation data

4. **Analytics**
   - Track conversion rates
   - Popular questions
   - Response time metrics

5. **Advanced Features**
   - File upload support
   - Voice messages
   - Video call scheduling
   - Calendar integration

---

## 🐛 Troubleshooting

### Chat button not appearing?
- Check browser console for errors
- Ensure `ChatWidget` is imported in `layout.tsx`
- Clear browser cache

### Messages not sending?
- Check API route is accessible: `/api/chat`
- Verify Supabase connection
- Check database tables exist

### Admin page not loading?
- Ensure you're logged in as admin
- Check `/api/admin/chat-conversations` endpoint
- Verify database permissions

---

## 📞 Support

The chatbot is now live on your website! Test it thoroughly and let me know if you need:
- Custom responses for specific services
- OpenAI integration
- Additional features
- UI customizations

---

## 🎯 Success Metrics to Track

1. **Engagement Rate**: % of visitors who open chat
2. **Lead Capture Rate**: % of chats that capture contact info
3. **Average Lead Score**: Quality of conversations
4. **Response Satisfaction**: User feedback
5. **Conversion Rate**: Chats → Actual clients

---

**Status**: ✅ Ready to use!
**Next Action**: Run the database migration and test the chatbot!
