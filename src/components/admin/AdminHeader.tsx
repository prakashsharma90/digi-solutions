"use client";

import { Bell, Search, User } from "lucide-react";

export function AdminHeader() {
    return (
        <header className="flex items-center justify-between px-8 py-5 bg-[#0B0F14] border-b border-white/5 sticky top-0 z-30">
            {/* Search */}
            <div className="relative w-96 hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2.5 border border-white/5 rounded-xl leading-5 bg-[#0F141A] text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-[#151A22] focus:border-primary/50 transition-colors sm:text-sm"
                    placeholder="Search Dashboard..."
                />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
                {/* Notification */}
                <button className="p-2.5 rounded-xl bg-[#0F141A] border border-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-all relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0F141A]"></span>
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-6 border-l border-white/5">
                    <div className="flex flex-col text-right hidden sm:block">
                        <span className="text-sm font-semibold text-white">Admin User</span>
                        <span className="text-xs text-gray-500">admin@digihub.com</span>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-blue-600 p-[1px]">
                        <div className="h-full w-full rounded-full bg-[#0F141A] flex items-center justify-center overflow-hidden">
                            <User className="h-5 w-5 text-gray-300" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
