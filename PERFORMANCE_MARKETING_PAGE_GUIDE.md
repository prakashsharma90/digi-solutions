# Performance Marketing Page - Implementation Guide

## 🎯 Overview

This is a **conversion-focused, professional Performance Marketing service page** built following industry best practices for lead generation, not just traffic.

**Page Goal:** Get qualified leads through:
- Free audits
- Strategy calls
- Quote requests

## 📁 File Location

`src/components/services/PerformanceMarketingPage.tsx`

## 🚀 How to Use

### Option 1: Replace Generic Service Page (Recommended)

Update the service detail page to use this custom template for Performance Marketing:

```tsx
// src/app/services/[slug]/page.tsx

import { PerformanceMarketingPage } from "@/components/services/PerformanceMarketingPage";

export default async function ServicePage({ params }: Props) {
    const { slug } = await params;
    
    // If it's the performance marketing page, use custom template
    if (slug === 'performance-marketing') {
        return <PerformanceMarketingPage />;
    }
    
    // Otherwise use generic template
    const service = await getService(slug);
    // ... rest of generic code
}
```

### Option 2: Dedicated Route

Create a dedicated route:

```tsx
// src/app/services/performance-marketing/page.tsx
import { PerformanceMarketingPage } from "@/components/services/PerformanceMarketingPage";

export default function Page() {
    return <PerformanceMarketingPage />;
}
```

## ✅ What's Included

### 1. **Above-the-Fold Hero** ✨
- **Left:** Clear headline, subheadline, trust signals, 2 CTAs
- **Right:** Real dashboard-style mockup (not illustrations)
- **Trust Signals:**
  - Avg. 3–5x ROAS
  - ₹10Cr+ ad spend managed
  - Serving startups & local brands

### 2. **What We Actually Do**
- Honest, specific services (no fluff)
- Clean icon-based cards
- Strong closing line

**Services Listed:**
- Google Search & Display Ads
- Meta (Facebook & Instagram) Ads
- Landing Page Funnel Setup
- Conversion Tracking (GA4, Pixel, GTM)
- Weekly Optimization & Scaling

### 3. **Platforms Section**
- Minimal logos (monochrome style)
- Platform note: "Platform selection depends on your business model — not trends"

### 4. **5-Step Process**
- Numbered, simple cards
- No fancy animations
- Trust-building note at bottom

**Steps:**
1. Audit & Goal Mapping
2. Funnel & Offer Setup
3. Campaign Launch
4. Daily Optimization
5. Scaling What Works

### 5. **Results/Proof**
- Real(istic) metrics
- Simple stat cards
- Icon-based visual hierarchy

**Examples:**
- ₹12 → ₹3 CPL in 21 days
- 4.2x ROAS for eCommerce brand
- 350+ qualified leads in 30 days

### 6. **Who This Is For** (Lead Filtering)
- Two columns: Good Fit vs Not a Fit
- Saves time by filtering bad leads

**Good Fit:**
- Service-based businesses
- Local brands
- E-commerce stores
- Coaches & consultants

**Not a Fit:**
- ₹500 ad budgets
- Expecting instant results in 2 days
- No landing page or offer

### 7. **Transparent Pricing**
- 3 clear tiers
- Clean cards (no toggle switches)
- Note: "Ad spend is paid directly to platforms"

**Tiers:**
- **Starter:** ₹15,000/mo - Small brands
- **Growth:** ₹35,000/mo - Scaling (Most Popular)
- **Custom:** For high ad spend

### 8. **Final CTA**
- Full-width dark section
- Single focus
- Strong headline + CTA

## 🎨 Design Principles Used

### Typography
- **Font:** System font stack (can swap to Inter/Poppins)
- **Sizes:** Clear hierarchy (4xl for H1, 3xl for H2, etc.)
- **Line height:** Relaxed for readability

### Colors
- **Background:** Dark (#0B0F14)
- **Accent:** Primary (Teal/Cyan from your design system)
- **Text:** White + Gray variants
- **Borders:** White with low opacity (white/5, white/10)

### Spacing
- **Sections:** py-20, py-24, py-32 (consistent rhythm)
- **Gaps:** 4, 6, 8, 12 (Tailwind scale)
- **Max widths:** Constrained for readability

### Effects
- **Minimal animations:** Only hover states
- **Subtle gradients:** from-white/5 to-white/0
- **Glow effects:** Primary color blur

### Icons
- Using Lucide React icons
- Consistent 4-5px size
- Primary color for emphasis

## 🚫 Common Mistakes Avoided

✅ No long paragraphs
✅ No AI-sounding copy
✅ No over-promising
✅ Single CTA focus per section
✅ Real mockups, not fancy illustrations
✅ Honest, confident tone

## 📊 Conversion Optimization

### CTAs Distribution
1. **Above fold:** Get Free Audit (Primary), View Case Studies (Secondary)
2. **After platforms:** Implied trust
3. **After process:** Understanding built
4. **After results:** Social proof
5. **After pricing:** Decision point
6. **Final CTA:** Last chance conversion

### Psychology Elements
- **Social Proof:** Trust signals, metrics
- **Transparency:** Honest about who it's for
- **Urgency (subtle):** "Before you spend another rupee"
- **Authority:** Specific platform expertise
- **Clarity:** No jargon, simple language

## 🔄 Next Steps to Customize

### 1. Update Metrics (Replace Placeholders)
```tsx
// Line ~45: Trust signals
<span>Avg. 3–5x ROAS</span> // Update with real avg
<span>₹10Cr+ ad spend managed</span> // Update with actual
```

### 2. Add Real Dashboard Screenshot
Replace the mockup section with:
```tsx
<Image 
  src="/images/dashboard-screenshot.png" 
  alt="Real campaign dashboard"
  width={800}
  height={600}
/>
```

### 3. Link to Real Case Studies
```tsx
<Link href="/case-studies/client-name">
  <Button variant="outline">View Case Study</Button>
</Link>
```

### 4. Integrate Contact Form
Replace CTA links with actual contact form or booking widget:
```tsx
<Link href="/contact?service=performance-marketing">
  <Button>Book Free Strategy Call</Button>
</Link>
```

## 📱 Mobile Responsiveness

All sections use responsive Tailwind classes:
- `grid lg:grid-cols-2` - Stacks on mobile
- `flex-col sm:flex-row` - Vertical on mobile
- `text-4xl md:text-5xl lg:text-6xl` - Scales down
- `p-6 md:p-8` - Smaller padding on mobile

## 🎯 Conversion Tracking Recommendations

Add these event triggers:
1. **Hero CTA Click:** `performance_marketing_hero_cta`
2. **Pricing Card Select:** `performance_marketing_pricing_{tier}`
3. **Final CTA Click:** `performance_marketing_bottom_cta`
4. **Case Study View:** `performance_marketing_case_study_view`

## 📈 A/B Testing Ideas

1. **Headline variants:**
   - Current: "Performance Marketing That Brings Leads — Not Just Clicks"
   - Alt: "Stop Wasting Ad Budget. Get Real Leads."

2. **CTA variants:**
   - Current: "Get Free Audit"
   - Alt: "Claim Your Free Audit"

3. **Proof section:**
   - Test with/without specific client names
   - Test percentage vs absolute numbers

## 🤝 Integration with CRM

Recommended form fields for lead capture:
- Name
- Email
- Phone
- Monthly ad budget (dropdown)
- Current platform (checkboxes)
- Biggest challenge (textarea)

## 🔧 Maintenance

- **Monthly:** Update metrics if they improve
- **Quarterly:** Refresh case studies/proof
- **Yearly:** Revise pricing if needed

---

## 💡 Pro Tips

1. **Keep copy honest** - Don't promise 10x ROAS
2. **Update regularly** - Fresh metrics = trust
3. **Test everything** - Headlines, CTAs, pricing
4. **Mobile first** - Most traffic is mobile
5. **Speed matters** - Optimize images, lazy load

---

Built with conversion in mind. No fluff. Just results.
