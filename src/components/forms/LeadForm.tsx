"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2, ChevronDown, Shield, AlertCircle, User, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { servicesData } from "@/data/services";

interface LeadFormProps {
    source: string;
    className?: string;
    defaultService?: string;
}

const COUNTRY_CODES = [
    { code: "+91", country: "IND", flag: "🇮🇳" },
    { code: "+1", country: "USA", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+61", country: "AUS", flag: "🇦🇺" },
];

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    service?: string;
    message?: string;
}

export function LeadForm({ source, className, defaultService = "" }: LeadFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [countryCode, setCountryCode] = useState("+91");
    // Split name state for the UI, combined for submission
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: defaultService,
        message: "",
        _honeypot: ""
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Character count for message
    const MAX_CHARS = 500;
    const charCount = formData.message.length;

    const validateField = (name: string, value: string): string | undefined => {
        switch (name) {
            case "firstName":
                if (value.length < 2) return "Min 2 chars";
                if (!/^[a-zA-Z\s]+$/.test(value)) return "Letters only";
                break;
            case "lastName":
                if (value.length < 2) return "Min 2 chars";
                if (!/^[a-zA-Z\s]+$/.test(value)) return "Letters only";
                break;
            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email";
                break;
            case "phone":
                if (value && value.length < 10) return "Min 10 digits";
                break;
            case "message":
                if (value.length < 10) return "Min 10 chars";
                break;
        }
        return undefined;
    };

    const handleBlur = (field: string) => {
        setTouched({ ...touched, [field]: true });
        const error = validateField(field, formData[field as keyof typeof formData] as string);
        setErrors({ ...errors, [field]: error });
    };

    const handleChange = (field: string, value: string) => {
        if (field === 'message' && value.length > MAX_CHARS) return;

        setFormData({ ...formData, [field]: value });
        if (touched[field]) {
            const error = validateField(field, value);
            setErrors({ ...errors, [field]: error });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData._honeypot) {
            setStatus("success");
            return;
        }

        const newErrors: FormErrors = {};
        Object.keys(formData).forEach((key) => {
            if (key !== "_honeypot" && key !== "service") { // Service might be optional if default is set
                const error = validateField(key, formData[key as keyof typeof formData] as string);
                if (error) newErrors[key as keyof FormErrors] = error;
            }
        });

        // Ensure service is selected
        if (!formData.service) {
            newErrors.service = "Please select a service";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setTouched({ firstName: true, lastName: true, email: true, phone: true, service: true, message: true });
            return;
        }

        setStatus("loading");

        try {
            const fullPhone = formData.phone ? `${countryCode}${formData.phone}` : "";
            const fullName = `${formData.firstName} ${formData.lastName}`.trim();

            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: fullName,
                    email: formData.email,
                    phone: fullPhone,
                    service: formData.service,
                    message: formData.message,
                    source,
                    status: "New"
                })
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ firstName: "", lastName: "", email: "", phone: "", service: defaultService, message: "", _honeypot: "" });
                setErrors({});
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className={cn("text-center py-12 px-6 bg-primary/5 border border-primary/20 rounded-3xl h-full flex flex-col items-center justify-center", className)} role="alert">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-3">Received!</h3>
                <p className="text-text-muted mb-8 max-w-xs mx-auto">
                    We'll be in touch within 24 hours.
                </p>
                <Button
                    variant="outline"
                    className="rounded-full px-8"
                    onClick={() => setStatus("idle")}
                >
                    Send another
                </Button>
            </div>
        );
    }

    return (
        <div className={cn("space-y-6", className)}>
            <div className="space-y-2 mb-8">
                <h2 className="text-3xl font-bold text-white">Get in Touch</h2>
                <p className="text-text-muted">You can reach us anytime</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Honeypot */}
                <input
                    type="text"
                    name="_honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{ position: 'absolute', opacity: 0, zIndex: -1, width: 0, height: 0 }}
                    value={formData._honeypot}
                    onChange={(e) => setFormData({ ...formData, _honeypot: e.target.value })}
                />

                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group">
                        <label htmlFor="firstName" className="sr-only">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="First name"
                            className={cn(
                                "w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-4 pl-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all",
                                errors.firstName && touched.firstName ? "border-red-500/50 focus:border-red-500" : ""
                            )}
                            value={formData.firstName}
                            onChange={(e) => handleChange("firstName", e.target.value)}
                            onBlur={() => handleBlur("firstName")}
                        />
                        {errors.firstName && touched.firstName && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 text-xs bg-[#0F141A] px-1">{errors.firstName}</span>
                        )}
                    </div>

                    <div className="relative group">
                        <label htmlFor="lastName" className="sr-only">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="Last name"
                            className={cn(
                                "w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-4 pl-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all",
                                errors.lastName && touched.lastName ? "border-red-500/50 focus:border-red-500" : ""
                            )}
                            value={formData.lastName}
                            onChange={(e) => handleChange("lastName", e.target.value)}
                            onBlur={() => handleBlur("lastName")}
                        />
                        {errors.lastName && touched.lastName && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 text-xs bg-[#0F141A] px-1">{errors.lastName}</span>
                        )}
                    </div>
                </div>

                {/* Email Field */}
                <div className="relative group">
                    <label htmlFor="email" className="sr-only">Email Address</label>
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
                        <Mail size={20} />
                    </div>
                    <input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        className={cn(
                            "w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all",
                            errors.email && touched.email ? "border-red-500/50 focus:border-red-500" : ""
                        )}
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                    />
                    {errors.email && touched.email && (
                        <span className="absolute right-3 top-3 text-red-400 text-xs bg-[#0F141A] px-1">{errors.email}</span>
                    )}
                </div>

                {/* Phone Field */}
                <div className={cn(
                    "flex items-center w-full h-14 bg-white/5 border border-white/10 rounded-2xl focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all overflow-hidden",
                    errors.phone && touched.phone ? "border-red-500/50 focus-within:border-red-500" : ""
                )}>
                    <div className="relative h-full flex items-center border-r border-white/10 px-2 bg-white/[0.02]">
                        <select
                            className="appearance-none bg-transparent border-none pl-3 pr-8 h-full text-sm font-medium text-white focus:ring-0 focus:outline-none cursor-pointer min-w-[90px]"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            aria-label="Country Code"
                        >
                            {COUNTRY_CODES.map((c) => (
                                <option key={c.code} value={c.code} className="bg-[#0F141A] text-white">
                                    {c.code}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                    </div>
                    <input
                        type="tel"
                        placeholder="Phone number"
                        className="flex-1 bg-transparent border-none px-4 text-white placeholder:text-gray-500 focus:ring-0 focus:outline-none min-w-0"
                        value={formData.phone}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length <= 15) handleChange("phone", val);
                        }}
                        onBlur={() => handleBlur("phone")}
                    />
                </div>
                {errors.phone && touched.phone && (
                    <p className="text-red-400 text-xs ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.phone}</p>
                )}

                {/* Service Field (Custom Dropdown Style) */}
                <div className="relative group">
                    <label htmlFor="service" className="sr-only">Service</label>
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors">
                        <Globe size={20} />
                    </div>
                    <select
                        id="service"
                        className={cn(
                            "w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-10 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer",
                            !formData.service && "text-gray-500",
                            errors.service && touched.service ? "border-red-500/50 focus:border-red-500" : ""
                        )}
                        value={formData.service}
                        onChange={(e) => handleChange("service", e.target.value)}
                        onBlur={() => handleBlur("service")}
                    >
                        <option value="" disabled className="bg-[#0F141A] text-gray-500">Service interested in...</option>
                        {Object.entries(servicesData).map(([id, data]) => (
                            <option key={id} value={id} className="bg-[#0F141A] text-white">
                                {data.name}
                            </option>
                        ))}
                        <option value="other" className="bg-[#0F141A] text-white">Other Inquiry</option>
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                </div>
                {errors.service && touched.service && (
                    <p className="text-red-400 text-xs ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.service}</p>
                )}

                {/* Message Field */}
                <div className="relative">
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea
                        id="message"
                        rows={4}
                        placeholder="How can we help?"
                        className={cn(
                            "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none",
                            errors.message && touched.message ? "border-red-500/50 focus:border-red-500" : ""
                        )}
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        onBlur={() => handleBlur("message")}
                    />
                    <div className="absolute bottom-3 right-4 text-[10px] text-gray-600 font-mono">
                        {charCount}/{MAX_CHARS}
                    </div>
                </div>
                {errors.message && touched.message && (
                    <p className="text-red-400 text-xs ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.message}</p>
                )}

                {/* Submit Button */}
                <Button
                    disabled={status === "loading"}
                    type="submit"
                    className="w-full h-14 rounded-full text-lg font-semibold bg-primary hover:bg-primary/90 text-black shadow-[0_0_20px_-5px_var(--color-primary)] hover:shadow-[0_0_30px_-5px_var(--color-primary)] transition-all mt-4"
                >
                    {status === "loading" ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        "Submit"
                    )}
                </Button>

                <p className="text-[10px] text-center text-gray-500 mt-4 leading-relaxed">
                    By contacting us, you agree to our
                    <a href="/terms" className="text-gray-400 hover:text-primary transition-colors ml-1">Terms of service</a> and
                    <a href="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors ml-1">Privacy Policy</a>
                </p>
            </form>
        </div>
    );
}
