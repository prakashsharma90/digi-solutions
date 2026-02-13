import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/ui/Preloader";
import { MegaMenuProvider } from "@/contexts/MegaMenuContext";
import { SpeedInsights } from "@vercel/speed-insights/next";



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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className={`${roboto.variable} ${poppins.variable} antialiased bg-background text-text-primary`}
      >
        <Preloader />
        <MegaMenuProvider>
          {children}
        </MegaMenuProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
