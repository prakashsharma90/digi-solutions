"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";

export function NewsletterCTA() {
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
                    source: "Blog Grid CTA"
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
            <div className="col-span-1 md:col-span-3 bg-gradient-to-r from-green-500/10 to-teal-500/5 border border-green-500/20 rounded-2xl p-8 md:p-12 my-8 relative overflow-hidden text-center isolate">
                <div className="relative z-10">
                    <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">Successfully Subscribed!</h3>
                    <p className="text-gray-400">Thank you for subscribing. Check your inbox for confirmation.</p>
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl -z-10" />
            </div>
        );
    }

    return (
        <div className="col-span-1 md:col-span-3 bg-gradient-to-r from-primary/10 to-purple-500/5 border border-white/10 rounded-2xl p-8 md:p-12 my-8 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 isolate">
            <div className="relative z-10 max-w-xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">Subscribe to our newsletter</h3>
                <p className="text-gray-400">Get the latest insights on SEO, AI marketing, and growth strategies delivered straight to your inbox.</p>
            </div>
            <form onSubmit={handleSubmit} className="relative z-10 w-full md:w-auto flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="bg-black/30 border border-white/10 rounded-full px-5 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-72 disabled:opacity-50"
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                        className="rounded-full px-8 py-3 h-auto shadow-lg shadow-primary/20 disabled:opacity-50 whitespace-nowrap"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Subscribing...
                            </>
                        ) : (
                            <>
                                Subscribe <Mail className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>
                </div>
                {error && (
                    <p className="text-sm text-red-400 text-center sm:text-left">{error}</p>
                )}
            </form>

            {/* Decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
        </div>
    );
}
