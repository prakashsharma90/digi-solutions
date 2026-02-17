import React from "react";
import { Footer } from "@/components/layout/Footer";
import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { isMaintenanceMode } from "@/lib/maintenance";
import { MaintenancePage } from "@/components/MaintenancePage";

export default async function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const maintenance = await isMaintenanceMode();

    if (maintenance) {
        return <MaintenancePage />;
    }

    return (
        <div className="bg-white min-h-screen">
            <MarketingHeader />
            {children}
            <Footer />
        </div>
    );
}
