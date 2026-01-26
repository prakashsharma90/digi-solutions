import React from "react";
import { Footer } from "@/components/layout/Footer";
import { MarketingHeader } from "@/components/layout/MarketingHeader";

export default function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white min-h-screen">
            <MarketingHeader />
            {children}
            <Footer />
        </div>
    );
}
