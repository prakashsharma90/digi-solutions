"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface BlogFiltersProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function BlogFilters({
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
}: BlogFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category)}
                        className={`rounded-full px-6 transition-all ${selectedCategory === category
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "border-white/10 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-500"
                />
            </div>
        </div>
    );
}
