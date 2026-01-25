"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { servicesData } from "@/data/services";

interface LeadFormProps {
    source: string;
    className?: string;
    defaultService?: string;
}

const COUNTRY_CODES = [
    { code: "+91", country: "IND" },
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+971", country: "UAE" },
    { code: "+61", country: "AUS" },
];

export function LeadForm({ source, className, defaultService = "" }: LeadFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [countryCode, setCountryCode] = useState("+91");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: defaultService,
        message: "",
        _honeypot: "" // Hidden field for spam protection
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Anti-spam check: If honeypot is filled, it's likely a bot
        if (formData._honeypot) {
            console.warn("Spam detected");
            setStatus("success"); // Mock success to fool the bot
            return;
        }

        setStatus("loading");

        try {
            const fullPhone = formData.phone ? `${countryCode}${formData.phone}` : "";

            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    phone: fullPhone,
                    source,
                    status: "New"
                })
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", service: defaultService, message: "", _honeypot: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className={cn("text-center py-12 px-6 bg-primary/5 border border-primary/20 rounded-3xl", className)}>
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-text-muted">Thank you for reaching out. Our team will contact you within 24 hours.</p>
                <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => setStatus("idle")}
                >
                    Send another message
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={cn("space-y-5", className)}>
            {/* Honeypot field for bot protection */}
            <input
                type="text"
                name="_honeypot"
                style={{ display: 'none' }}
                value={formData._honeypot}
                onChange={(e) => setFormData({ ...formData, _honeypot: e.target.value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Full Name</label>
                    <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-card/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Phone Number</label>
                    <div className="flex items-center w-full bg-card/50 border border-border rounded-xl focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all overflow-hidden">
                        <div className="relative h-full flex items-center bg-card/30 border-r border-border/50 px-1">
                            <select
                                className="appearance-none bg-transparent border-none pl-3 pr-7 h-full py-3 text-xs font-medium text-foreground focus:ring-0 focus:outline-none cursor-pointer w-[85px]"
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                            >
                                {COUNTRY_CODES.map((c) => (
                                    <option key={c.code} value={c.code} className="bg-card text-foreground">
                                        {c.code} {c.country}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={12} />
                        </div>
                        <input
                            required
                            type="tel"
                            placeholder="9876543210"
                            className="flex-1 bg-transparent border-none px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-0 focus:outline-none min-w-0"
                            value={formData.phone}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, ''); // Allow only numbers
                                if (val.length <= 10) {
                                    setFormData({ ...formData, phone: val });
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Email Address</label>
                <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-card/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Service Interested In</label>
                <select
                    required
                    className="w-full bg-card/50 border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                    <option value="" disabled className="bg-card text-muted-foreground">Select a service</option>
                    {Object.entries(servicesData).map(([id, data]) => (
                        <option key={id} value={id} className="bg-card text-foreground">
                            {data.name}
                        </option>
                    ))}
                    <option value="other" className="bg-card text-foreground">Other Inquiry</option>
                </select>
            </div>

            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Your Message</label>
                <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your goals..."
                    className="w-full bg-card/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
            </div>

            {status === "error" && (
                <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
            )}

            <Button
                disabled={status === "loading"}
                type="submit"
                size="lg"
                className="w-full h-14 text-lg group shadow-[0_0_20px_-5px_var(--color-primary)] overflow-hidden relative"
            >
                {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        Send My Message
                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                )}
            </Button>

            <p className="text-[10px] text-center text-text-muted mt-4">
                By submitting this form, you agree to our <a href="#" className="underline">Privacy Policy</a>.
            </p>
        </form>
    );
}
