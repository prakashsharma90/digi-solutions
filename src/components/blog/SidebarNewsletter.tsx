"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";

export function SidebarNewsletter() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    source: "Blog Sidebar"
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to subscribe");
            }

            setSuccess(true);
            setEmail("");

            // Reset success message after 5 seconds
            setTimeout(() => setSuccess(false), 5000);
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-gradient-to-br from-green-500/10 to-teal-500/5 border border-green-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="relative z-10 text-center">
                    <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">You're subscribed!</h3>
                    <p className="text-sm text-gray-400">
                        Check your inbox for confirmation.
                    </p>
                </div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/20 blur-3xl rounded-full pointer-events-none" />
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-primary/10 to-blue-500/5 border border-primary/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-2">Weekly Insights</h3>
                <p className="text-sm text-gray-400 mb-4">
                    Join 4,000+ marketers getting expert SEO & AI tips.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="email"
                        placeholder="Work email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    />
                    {error && (
                        <p className="text-xs text-red-400">{error}</p>
                    )}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full text-sm font-semibold shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={14} className="mr-2 animate-spin" />
                                Subscribing...
                            </>
                        ) : (
                            <>
                                Subscribe Free <Mail size={14} className="ml-2" />
                            </>
                        )}
                    </Button>
                </form>
                <p className="text-[10px] text-gray-500 mt-3 text-center">
                    No spam. Unsubscribe anytime.
                </p>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
        </div>
    );
}
