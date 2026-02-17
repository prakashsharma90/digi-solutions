import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/ui/Preloader";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { MegaMenuProvider } from "@/contexts/MegaMenuContext";
import Script from "next/script";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";



const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

import { createClient } from "@/lib/supabase/server";

async function getSiteSettings() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["site_name", "tagline", "favicon_url", "logo_url"]);

    const settings: Record<string, string> = {};
    (data || []).forEach((row: { key: string; value: string }) => {
      settings[row.key] = row.value;
    });
    return settings;
  } catch {
    return {};
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const siteName = settings.site_name || "Digihub Solutions";
  const tagline = settings.tagline || "AI-First Digital Agency";
  const faviconUrl = settings.favicon_url || "/favicon.png";

  return {
    title: `${siteName} - ${tagline}`,
    description: "Intelligence-driven digital solutions hub.",
    icons: {
      icon: [
        { url: faviconUrl, sizes: "any" },
      ],
      apple: settings.logo_url || "/Digihub Solution (1).png",
    },
  };
}

import { SpeedInsights } from "@vercel/speed-insights/next";

import { getMegaMenuCategories } from "@/lib/mega-menu";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialCategories = await getMegaMenuCategories();

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="nmrw0tHjOXxuCbQZi1crZMbHcLF8zlap5OS3G8m96Kw" />
      </head>
      <body
        suppressHydrationWarning
        className={`${roboto.variable} ${poppins.variable} antialiased bg-background text-text-primary`}
      >
        <AnalyticsScripts />
        <Preloader />
        <MegaMenuProvider initialCategories={initialCategories}>
          {children}
        </MegaMenuProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
