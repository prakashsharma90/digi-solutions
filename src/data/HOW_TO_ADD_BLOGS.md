# How to Add a New Blog Post

Your blog system is built to automatically use your beautiful template for every new post. You do **not** need to create new page files. You only need to add the **content data**.

## Step 1: Open the Data File
Go to: `src/data/blog.ts`

## Step 2: Copy & Paste this Template
Scroll to the bottom of the `blogPosts` array, add a comma after the last item, and paste this block:

```typescript
    {
        slug: "your-url-slug-here", // e.g., "future-of-ai-marketing"
        title: "Your Catchy Headline Here",
        excerpt: "A short summary (1-2 sentences) that appears on the card.",
        image: "https://images.unsplash.com/photo-YOUR_IMAGE_ID", // High quality horizontal image
        category: "Strategy", // Choose: SEO, Paid Ads, Social Media, Automation, etc.
        publishedAt: "2024-03-20",
        readTime: "5 min read",
        author: {
            name: "Your Name",
            role: "CEO & Founder",
            avatar: "/images/avatars/your-photo.jpg" // Optional
        },
        tags: ["Marketing", "Growth", "Tips"],
        featured: false, // Set to true to show at the very top
        
        // PASTE YOUR ARTICLE CONTENT BELOW (Markdown Supported)
        content: `
# Main Headline (H1 is automatic, use H2 for sections)

Introduction paragraph goes here. Keep it engaging!

## Your First Section Header

Here is your main point. You can make **text bold** or _italic_.

- Key point 1
- Key point 2
- Key point 3

> "This is a blockquote for important emphasis."

## Another Section

You can write as much as you want. The template handles all the formatting, 
table of contents, and responsive layout automatically.
        `,
    },
```

## Step 3: Minimal Checklist
1. **Unique Slug**: Ensure the `slug` is unique (no two posts can have the same one).
2. **Image**: Use a wide, high-resolution image (Unsplash is great).
3. **Content**: Use `#` for major headers (though the template adds the H1 automatically, so usually start with `##`).

## That's it!
Once you save the file, your new blog post will instantly appear on the `/blog` page and will have its own dedicated page at `/blog/your-url-slug-here` using the refined template.
