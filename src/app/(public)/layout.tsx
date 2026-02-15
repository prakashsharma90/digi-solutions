import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import React from "react";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <SmoothScroll />
            <Header />
            {children}
            <Footer />
        </>
    );
}
