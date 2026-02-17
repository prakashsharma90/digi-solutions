import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import React from "react";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { isMaintenanceMode } from "@/lib/maintenance";
import { MaintenancePage } from "@/components/MaintenancePage";

// Don't cache this layout - maintenance mode must be checked on every request
export const dynamic = "force-dynamic";

export default async function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const maintenance = await isMaintenanceMode();

    if (maintenance) {
        return <MaintenancePage />;
    }

    return (
        <>
            <SmoothScroll />
            <Header />
            {children}
            <Footer />
        </>
    );
}
