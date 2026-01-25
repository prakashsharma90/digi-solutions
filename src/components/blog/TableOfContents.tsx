"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";


interface TOCProps {
    headings: { title: string; id: string }[];
}

export function TableOfContents({ headings }: TOCProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" /> On this page
            </h3>
            <nav className="space-y-1 relative max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {/* Active Indicator Line (Optional visual flair) */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

                {headings.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                            setActiveId(item.id);
                        }}
                        className={cn(
                            "block py-2 text-sm transition-all border-l-2 pl-4 -ml-[1px]",
                            activeId === item.id
                                ? "text-primary border-primary font-medium"
                                : "text-gray-400 hover:text-white border-transparent hover:border-white/20"
                        )}
                    >
                        {item.title}
                    </a>
                ))}
            </nav>
        </div>
    );
}
