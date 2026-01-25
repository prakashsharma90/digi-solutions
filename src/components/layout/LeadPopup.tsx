"use client";

import { useState, useEffect } from "react";
import { X, Send, Phone, User, Briefcase, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const COUNTRY_CODES = [
    { code: "+91", country: "IND" },
    { code: "+1", country: "USA" },
    { code: "+44", country: "UK" },
    { code: "+971", country: "UAE" },
    { code: "+61", country: "AUS" },
];

export function LeadPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [countryCode, setCountryCode] = useState("+91");
    const [form, setForm] = useState({
        name: "",
        phone: "",
        service: "Digital Marketing"
    });

    useEffect(() => {
        // Show popup after 3 seconds if not already submitted or closed this session
        const hasSeenPopup = sessionStorage.getItem("hasSeenLeadPopup");
        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("hasSeenLeadPopup", "true");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const fullPhone = form.phone ? `${countryCode}${form.phone}` : "";

            const res = await fetch("/api/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: form.name,
                    phone: fullPhone,
                    service: form.service,
                    source: "Pop-up Source",
                    email: "", // Optional now
                    message: "Lead captured from website popup"
                }),
            });

            if (res.ok) {
                setIsSubmitted(true);
                // Close after showing success message
                setTimeout(() => {
                    handleClose();
                }, 3000);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-[#0F141A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8">
                            {!isSubmitted ? (
                                <>
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">Get a Free Consultation!</h3>
                                        <p className="text-gray-400 text-sm">Fill details to get a call back from our experts.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Name */}
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Your Name"
                                                    value={form.name}
                                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                    className="w-full bg-[#0B0F14] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder-gray-600"
                                                />
                                            </div>
                                        </div>

                                        {/* Mobile */}
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Mobile Number</label>
                                            <div className="flex gap-2">
                                                <div className="relative">
                                                    <select
                                                        className="appearance-none bg-[#0B0F14] border border-white/10 rounded-lg pl-3 pr-8 py-3 text-white focus:outline-none focus:border-primary/50 transition-all cursor-pointer min-w-[80px] text-sm"
                                                        value={countryCode}
                                                        onChange={(e) => setCountryCode(e.target.value)}
                                                    >
                                                        {COUNTRY_CODES.map((c) => (
                                                            <option key={c.code} value={c.code} className="bg-[#0B0F14]">
                                                                {c.code} {c.country}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                                                </div>
                                                <div className="relative flex-1">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                                    <input
                                                        type="tel"
                                                        required
                                                        placeholder="9876543210"
                                                        value={form.phone}
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/\D/g, ''); // Allow only numbers
                                                            if (val.length <= 10) {
                                                                setForm({ ...form, phone: val });
                                                            }
                                                        }}
                                                        className="w-full bg-[#0B0F14] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder-gray-600"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Service Type */}
                                        <div className="space-y-1">
                                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Service Interested In</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                                <select
                                                    value={form.service}
                                                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                                                    className="w-full bg-[#0B0F14] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
                                                >
                                                    <option value="Digital Marketing">Digital Marketing</option>
                                                    <option value="Web Development">Web Development</option>
                                                    <option value="SEO Optimization">SEO Optimization</option>
                                                    <option value="Content Strategy">Content Strategy</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                {/* Custom Chevron */}
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 1L5 5L9 1" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-6 rounded-lg mt-6"
                                        >
                                            {loading ? "Submitting..." : "Get Free Consultation"}
                                        </Button>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Send size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Request Sent!</h3>
                                    <p className="text-gray-400">We will call you back shortly.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
