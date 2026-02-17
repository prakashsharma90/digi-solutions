import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/ui/Preloader";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { MegaMenuProvider } from "@/contexts/MegaMenuContext";
import Script from "next/script";



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

export const metadata: Metadata = {
  title: "Digihub Solutions - AI-First Digital Agency",
  description: "Intelligence-driven digital solutions hub.",
  verification: {
    google: process.env.NEXT_PUBLIC_SITE_URL === 'https://digihubsolution.tech'
      ? 'nmrw0tHjOXxuCbQZi1crZMbHcLF8zlap5OS3G8m96Kw'
      : undefined,
  },
};

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
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-VNWPSJKLW5"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VNWPSJKLW5');
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className={`${roboto.variable} ${poppins.variable} antialiased bg-background text-text-primary`}
      >
        <Preloader />
        <MegaMenuProvider initialCategories={initialCategories}>
          {children}
        </MegaMenuProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
