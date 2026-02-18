"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ConsultationFormSection } from "@/components/sections/ConsultationForm";
import {
    ArrowRight, CheckCircle2, XCircle, Zap,
    Mail, MousePointerClick, BarChart3, BrainCircuit,
    Workflow, RefreshCw, Target, Clock, TrendingUp,
    Users, Layers, GitBranch, Bell, Filter, Repeat,
    ShieldCheck, ChevronRight, Plus, X
} from "lucide-react";
import { ServicePricing } from "@/components/sections/ServicePricing";

/* ─── JetBrains Mono only (for terminal/code elements) ─────────── */
const FONT_URL = `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap`;

/* ─── Theme color ──────────────────────────────────────────────── */
const C = {
    primary: "#00D9C3",
    primaryDim: "rgba(0,217,195,0.08)",
    primaryBorder: "rgba(0,217,195,0.25)",
    primaryGlow: "rgba(0,217,195,0.12)",
    bg: "#080A0D",
    surface: "#0a0d12",
    card: "#0d1117",
    text: "#f8fafc",
    muted: "#94a3b8",
    faint: "#475569",
    border: "rgba(255,255,255,0.06)",
    red: "#f87171",
    green: "#34d399",
};

/* ─── Terminal typewriter ──────────────────────────────────────── */
const TERMINAL_LINES = [
    { prefix: "›", text: "lead.score(visitor_id='usr_9f2a')          ", delay: 0 },
    { prefix: "✓", text: "score=87  segment='hot'  route='sales'     ", delay: 700 },
    { prefix: "›", text: "sequence.trigger('nurture_hot_v3')          ", delay: 1400 },
    { prefix: "✓", text: "email_1 queued  •  slack_alert sent         ", delay: 2100 },
    { prefix: "›", text: "crm.update(deal_stage='qualified')          ", delay: 2800 },
    { prefix: "✓", text: "pipeline updated  •  task assigned          ", delay: 3500 },
    { prefix: "◈", text: "automation running  •  0 manual steps       ", delay: 4200 },
];

function TerminalLine({ prefix, text, delay }: { prefix: string; text: string; delay: number }) {
    const [visible, setVisible] = useState(false);
    const [chars, setChars] = useState(0);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(t);
    }, [delay]);
    useEffect(() => {
        if (!visible) return;
        let i = 0;
        const iv = setInterval(() => { i++; setChars(i); if (i >= text.length) clearInterval(iv); }, 20);
        return () => clearInterval(iv);
    }, [visible, text]);
    if (!visible) return null;
    const col = prefix === "✓" ? C.green : prefix === "◈" ? C.primary : "#94a3b8";
    return (
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.76rem", lineHeight: 1.9, color: col }}>
            <span style={{ color: C.primary, marginRight: "0.5rem" }}>{prefix}</span>
            {text.slice(0, chars)}
            {chars < text.length && <span style={{ color: C.primary, animation: "ma-blink 1s step-end infinite" }}>▌</span>}
        </div>
    );
}

/* ─── Animated counter ─────────────────────────────────────────── */
function Counter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = value / 55;
        const iv = setInterval(() => {
            start += step;
            if (start >= value) { setCount(value); clearInterval(iv); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(iv);
    }, [inView, value]);
    return (
        <div ref={ref} className="ma-counter-num" style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: "clamp(2.4rem,4.5vw,3.6rem)", color: C.primary, lineHeight: 1, fontWeight: 700 }}>
            {count}{suffix}
        </div>
    );
}

/* ─── Reusable section label ───────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: "36px", height: "1px", background: C.primary }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", color: C.primary, textTransform: "uppercase", letterSpacing: "0.15em" }}>{text}</span>
        </div>
    );
}

/* ─── Fade-up wrapper ──────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ─── FAQ Component (Home style) ────────────────────────────── */
const maFaqs = [
    {
        question: "How long does it take to set up an automation system?",
        answer: "Initial setup usually takes 2-4 weeks depending on the complexity of your current stack and the number of workflows required. We start with the highest-impact automations first to ensure quick wins.",
    },
    {
        question: "Do I need to change my current CRM or Email tool?",
        answer: "Not necessarily. We work with most major platforms like HubSpot, Klaviyo, ActiveCampaign, Salesforce, and Zapier. We'll audit your current tools and only suggest changes if they are a bottleneck for your growth.",
    },
    {
        question: "How do you measure the success of marketing automation?",
        answer: "We track metrics like cost-per-lead reduction, increase in lead-to-conversion rates, manual hours saved per week, and revenue attributed to automated sequences. You'll get a real-time dashboard to see these results.",
    },
    {
        question: "Is automation only for large enterprises?",
        answer: "Absolutely not. In fact, small teams benefit the most from automation as it acts as a 'force multiplier', allowing a small team to handle the volume of a much larger organization without increasing headcount.",
    },
    {
        question: "Will the automated emails feel 'robotic'?",
        answer: "No. We use advanced personalization tokens and behavioral triggers to ensure every communication feels relevant and human. Automation isn't about spamming; it's about sending the right message at the right time.",
    },
];

function MAFaqSection() {
    const [openIndex, setOpenIndex] = useState<number>(0);
    const W = { maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" };

    return (
        <section className="ma-section-padding" style={{ padding: "8rem 0", background: "linear-gradient(to bottom, #080a0d, #0B0F14)", borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, overflow: "hidden" }}>
            <div style={W}>
                <div className="ma-faq-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="ma-faq-sticky"
                        style={{ position: "sticky", top: "2rem" }}
                    >
                        <SectionLabel text="FAQs" />
                        <h2 style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: "clamp(24px, 5vw, 40px)", fontWeight: 700, color: C.text, lineHeight: 1.2, marginBottom: "32px" }}>
                            Frequently Asked<br />
                            <span style={{ color: C.primary }}>Questions</span>
                        </h2>

                        {/* Call Card */}
                        <div style={{ padding: "32px 24px", background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, borderRadius: "12px", textAlign: "left" }}>
                            <div style={{ width: "56px", height: "56px", borderRadius: "12px", background: `linear-gradient(135deg, ${C.primaryDim}, transparent)`, border: `1px solid ${C.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                                <Users size={28} style={{ color: C.primary }} />
                            </div>
                            <h3 style={{ fontSize: "20px", fontWeight: 700, color: C.text, marginBottom: "8px" }}>Book a 15 min call</h3>
                            <p style={{ color: C.muted, fontSize: "15px", lineHeight: 1.6, marginBottom: "24px" }}>
                                Have specific questions about your tech stack? Let's discuss your automation roadmap on a quick call.
                            </p>
                            <Link href="/contact" style={{ textDecoration: "none" }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="ma-btn-primary ma-btn-full"
                                    style={{ width: "100%", padding: "14px 20px", background: C.primary, color: "#000", fontWeight: 700, border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px", minHeight: "52px" }}
                                >
                                    Book a Free Call
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Column: Accordion */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {maFaqs.map((faq, index) => {
                                const isOpen = openIndex === index;
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            borderRadius: "12px",
                                            border: `1px solid ${isOpen ? C.primaryBorder : C.border}`,
                                            background: isOpen ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
                                            transition: "all 0.3s ease",
                                            overflow: "hidden"
                                        }}
                                    >
                                        <button
                                            onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                                        >
                                            <span style={{ fontSize: "1.05rem", fontWeight: 600, color: isOpen ? C.text : C.muted, transition: "color 0.3s ease", paddingRight: "1rem" }}>
                                                {faq.question}
                                            </span>
                                            <div style={{
                                                width: "32px",
                                                height: "32px",
                                                borderRadius: "50%",
                                                background: isOpen ? C.primaryDim : "rgba(255,255,255,0.05)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: isOpen ? C.primary : C.faint,
                                                transition: "all 0.3s ease"
                                            }}>
                                                {isOpen ? <X size={16} /> : <Plus size={16} />}
                                            </div>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    <p style={{ padding: "0 1.5rem 1.5rem", color: C.muted, fontSize: "0.95rem", lineHeight: 1.7 }}>
                                                        {faq.answer}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ══════════════════════════════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════════════════════════════ */
export function MarketingAutomationPage({ plans }: { plans?: any[] }) {
    const W = { maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" };

    return (
        <>
            <style>{`
                @import url('${FONT_URL}');
                @keyframes ma-blink { 0%,100%{opacity:1} 50%{opacity:0} }
                @keyframes ma-grain {
                    0%,100%{transform:translate(0,0)} 20%{transform:translate(-2%,-3%)}
                    40%{transform:translate(3%,-1%)} 60%{transform:translate(-1%,2%)}
                    80%{transform:translate(2%,3%)}
                }
                @keyframes ma-float {
                    0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)}
                }
                @keyframes ma-pulse-ring {
                    0%{transform:scale(1);opacity:0.4} 100%{transform:scale(1.6);opacity:0}
                }
                .ma-grain-overlay::after {
                    content:''; position:absolute; inset:-50%; width:200%; height:200%;
                    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
                    opacity:0.03; pointer-events:none; animation:ma-grain 8s steps(1) infinite; z-index:0;
                }
                .ma-card-hover { transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
                .ma-card-hover:hover { transform: translateY(-4px); border-color: ${C.primaryBorder} !important; box-shadow: 0 12px 40px rgba(0,217,195,0.06); }
                .ma-btn-primary { transition: all 0.3s ease; }
                .ma-btn-primary:hover { box-shadow: 0 0 40px -8px ${C.primary}; transform: translateY(-2px); }
                .ma-btn-ghost { transition: all 0.3s ease; }
                .ma-btn-ghost:hover { background: rgba(255,255,255,0.05) !important; border-color: rgba(255,255,255,0.2) !important; }
                .ma-tool-tag { transition: all 0.25s ease; }
                .ma-tool-tag:hover { color: ${C.primary} !important; border-color: ${C.primaryBorder} !important; background: ${C.primaryDim} !important; }
                .ma-svc-cell { transition: background 0.25s ease; }
                .ma-svc-cell:hover { background: #0d1117 !important; }
                .ma-float { animation: ma-float 5s ease-in-out infinite; }
                @keyframes ma-scroll { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(6px);opacity:0} }
                @keyframes ma-marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes ma-marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }

                /* Mobile-First Base Styles */
                body { line-height: 1.5; }
                p { line-height: 1.6; }

                /* Responsive Utilities */
                .ma-grid-res { display: grid; gap: 20px; }
                .ma-grid-2 { grid-template-columns: repeat(2, 1fr); }
                .ma-grid-3 { grid-template-columns: repeat(3, 1fr); }
                .ma-grid-4 { grid-template-columns: repeat(4, 1fr); }

                @media (max-width: 1024px) {
                    .ma-grid-res { gap: 20px; }
                    .ma-grid-4 { grid-template-columns: repeat(2, 1fr); }
                    .ma-grid-3 { grid-template-columns: repeat(2, 1fr); }
                    .ma-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
                    .ma-faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
                    .ma-faq-sticky { position: relative !important; top: 0 !important; }
                }

                @media (max-width: 768px) {
                    .ma-grid-2, .ma-grid-3, .ma-grid-4 { grid-template-columns: 1fr !important; }
                    .ma-stats-row { 
                        flex-direction: row !important; 
                        gap: 0 !important; 
                        justify-content: center !important; 
                        align-items: center !important; 
                        background: rgba(255,255,255,0.02) !important;
                        border: 1px solid rgba(255,255,255,0.08) !important;
                        border-radius: 12px !important;
                        padding: 16px 4px !important;
                        border-bottom: none !important;
                        width: 100% !important;
                    }
                    .ma-stats-row > div { 
                        flex: 1 !important; 
                        text-align: center !important; 
                        border-right: 1px solid rgba(255,255,255,0.08) !important;
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                    }
                    .ma-stats-row > div:last-child { border-right: none !important; }
                    .ma-counter-num { font-size: 20px !important; }
                    .ma-stat-label { font-size: 9px !important; letter-spacing: 0.5px !important; line-height: 1.2 !important; max-width: 100% !important; margin-top: 4px !important; text-align: center !important; }
                    .ma-section-padding { padding: 40px 0 !important; }
                    .ma-hero-padding { padding: 100px 0 40px 0 !important; }
                    .ma-mobile-left { text-align: left !important; }
                    .ma-mobile-left p { margin-left: 0 !important; margin-right: 0 !important; }
                    .ma-mobile-left .ma-btn-row { justify-content: flex-start !important; width: 100% !important; }
                    .ma-btn-full { width: 100% !important; height: 52px !important; justify-content: center !important; }
                    .ma-terminal-container { transform: none !important; margin: 0 !important; }
                    .ma-ghost-text { display: none !important; }
                    .ma-workflow-step { flex-direction: row !important; gap: 16px !important; text-align: left !important; }
                    .ma-workflow-line { width: 1px !important; background: ${C.border} !important; margin: 8px 0 !important; height: 100% !important; }
                    .ma-workflow-icon-box { margin-bottom: 0 !important; width: 40px !important; }
                    .ma-workflow-content { padding-left: 0 !important; }
                    .ma-workflow-tag-row { justify-content: flex-start !important; }
                    
                    /* Global Spacing Override for Mobile */
                    main > section > div {
                        padding-left: 16px !important;
                        padding-right: 16px !important;
                    }
                    .ma-hero-headline { font-size: 32px !important; line-height: 1.1 !important; }
                    .ma-hero-desc { max-width: 320px !important; line-height: 1.6 !important; font-size: 16px !important; color: rgba(255,255,255,0.9) !important; }
                    .ma-trust-line { font-size: 13px !important; margin-top: 12px !important; }
                    .ma-stats-row { margin-top: 48px !important; }
                    .ma-stat-label { font-size: 11px !important; letter-spacing: 1px !important; opacity: 0.8 !important; }
                    .ma-scroll-hint { display: flex !important; }
                }
            `}</style>

            <main style={{ background: C.bg, color: C.text, minHeight: "100vh", overflow: "hidden", fontFamily: "var(--font-roboto), sans-serif" }}>

                {/* ══════════════════════════════════════════════
                    HERO
                ══════════════════════════════════════════════ */}
                <section className="ma-grain-overlay ma-hero-padding" style={{ position: "relative", paddingTop: "9rem", paddingBottom: "6rem", borderBottom: `1px solid ${C.border}`, overflow: "hidden" }}>
                    {/* Orbs */}
                    <div style={{ position: "absolute", top: "-10%", right: "0%", width: "700px", height: "700px", background: `radial-gradient(circle, ${C.primaryGlow} 0%, transparent 70%)`, borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />
                    <div style={{ position: "absolute", bottom: "0", left: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />

                    <div style={{ ...W, position: "relative", zIndex: 1 }}>
                        <div className="ma-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>

                            {/* Left */}
                            <div className="ma-mobile-left">
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: "4px", border: `1px solid ${C.primaryBorder}`, background: C.primaryDim, marginBottom: "2rem" }}>
                                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.primary, animation: "ma-blink 2s step-end infinite", display: "inline-block" }} />
                                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", color: C.primary, letterSpacing: "0.12em", textTransform: "uppercase" }}>Marketing Automation</span>
                                    </div>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.1 }}
                                    className="ma-hero-headline"
                                    style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: "clamp(42px, 5vw, 64px)", lineHeight: 1.06, color: C.text, marginBottom: "1.5rem", fontWeight: 700 }}
                                >
                                    Stop Doing Tasks.<br />
                                    <em style={{ color: C.primary }}>Start Scaling Systems.</em>
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="ma-hero-desc"
                                    style={{ fontSize: "18px", color: C.muted, lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "520px", fontFamily: "var(--font-roboto), sans-serif" }}
                                >
                                    Your competitors sleep while their funnels run 24/7. We build the automation infrastructure that turns repetitive work into revenue.
                                </motion.p>

                                {/* CTAs — Moved up for mobile conversion */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="ma-btn-row"
                                    style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}
                                >
                                    <Link href="/contact" style={{ width: "100%", display: "contents" }}>
                                        <button className="ma-btn-primary ma-btn-full" style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "14px 28px", background: C.primary, color: "#080A0D", border: "none", borderRadius: "8px", fontFamily: "var(--font-roboto), sans-serif", fontWeight: 700, fontSize: "16px", cursor: "pointer", minHeight: "52px" }}>
                                            <Zap size={18} /> Automate My Marketing
                                        </button>
                                    </Link>
                                    <div className="ma-trust-line" style={{ width: "100%", color: C.muted, fontSize: "14px", display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                                        <span style={{ display: "flex", color: C.green }}>★★★★★</span>
                                        <span>Trusted by 100+ high-growth businesses</span>
                                    </div>
                                </motion.div>

                                {/* Stats — Pushed lower */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="ma-stats-row"
                                    style={{ display: "flex", gap: "32px", paddingBottom: "32px", borderBottom: `1px solid ${C.border}` }}
                                >
                                    {[
                                        { val: 451, suf: "%", label: "More Qualified Leads" },
                                        { val: 68, suf: "%", label: "Less Manual Work" },
                                        { val: 40, suf: "%", label: "Faster Sales Cycles" },
                                    ].map((s, i) => (
                                        <div key={i}>
                                            <Counter value={s.val} suffix={s.suf} />
                                            <div className="ma-stat-label" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "6px", fontWeight: 700 }}>{s.label}</div>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Right: Terminal */}
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="ma-float ma-terminal-container"
                                style={{ position: "relative" }}
                            >
                                {/* Pulse ring behind terminal */}
                                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "300px", height: "300px", borderRadius: "50%", border: `1px solid ${C.primaryBorder}`, animation: "ma-pulse-ring 3s ease-out infinite", pointerEvents: "none" }} />
                                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "300px", height: "300px", borderRadius: "50%", border: `1px solid ${C.primaryBorder}`, animation: "ma-pulse-ring 3s ease-out infinite 1.5s", pointerEvents: "none" }} />

                                <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", overflow: "hidden", boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px ${C.primaryDim}`, position: "relative", zIndex: 1 }}>
                                    {/* Titlebar */}
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.2rem", borderBottom: `1px solid ${C.border}`, background: "#0a0d12" }}>
                                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
                                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
                                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }} />
                                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem", color: "#334155", marginLeft: "0.8rem" }}>digihub-automation — live</span>
                                        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.primary, animation: "ma-blink 2s step-end infinite" }} />
                                            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", color: C.primary }}>running</span>
                                        </span>
                                    </div>
                                    {/* Body */}
                                    <div style={{ padding: "1.5rem", minHeight: "270px" }}>
                                        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.7rem", color: "#334155", marginBottom: "1rem" }}>
                                            # automation engine v3.2 — initialized
                                        </div>
                                        {TERMINAL_LINES.map((line, i) => (
                                            <TerminalLine key={i} {...line} />
                                        ))}
                                    </div>
                                </div>
                                {/* Ghost text */}
                                <div style={{ position: "absolute", top: "-2.5rem", right: "-1.5rem", fontFamily: "'DM Serif Display',serif", fontSize: "9rem", color: `${C.primaryDim}`, lineHeight: 1, pointerEvents: "none", userSelect: "none", zIndex: 0 }}>24/7</div>
                            </motion.div>
                            {/* Mobile Scroll Indicator */}
                            <div className="ma-scroll-hint" style={{ display: "none", position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.4 }}>
                                <div style={{ width: "20px", height: "30px", borderRadius: "10px", border: `1px solid ${C.border}`, display: "flex", justifyContent: "center", padding: "4px" }}>
                                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} style={{ width: "2px", height: "6px", background: C.primary, borderRadius: "1px" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════
                    PROBLEM
                ══════════════════════════════════════════════ */}
                <section className="ma-section-padding" style={{ padding: "7rem 0", background: C.surface, borderBottom: `1px solid ${C.border}` }}>
                    <div style={W}>
                        <FadeUp><SectionLabel text="The Problem" /></FadeUp>
                        <div className="ma-grid-res ma-grid-2 ma-mobile-left" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }}>
                            <FadeUp delay={0.05}>
                                <h2 style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: "clamp(24px, 5vw, 40px)", color: C.text, lineHeight: 1.25, marginBottom: "20px", fontWeight: 700 }}>
                                    You're Losing Revenue<br />to <em style={{ color: C.red, fontStyle: "italic" }}>Repetition</em>
                                </h2>
                                <p style={{ color: C.muted, lineHeight: 1.6, marginBottom: "32px", fontSize: "clamp(15px, 3vw, 16px)" }}>
                                    Every hour spent on copy-paste emails, manual follow-ups, and spreadsheet reporting is an hour not spent on strategy. That's not a workflow problem — it's a revenue leak.
                                </p>
                                <div style={{ padding: "20px", background: "rgba(248,113,113,0.04)", border: "1px solid rgba(248,113,113,0.15)", borderRadius: "12px" }}>
                                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                                        <XCircle size={24} style={{ color: C.red, flexShrink: 0, marginTop: "2px" }} />
                                        <div>
                                            <div style={{ fontWeight: 700, color: C.text, marginBottom: "8px", fontSize: "16px" }}>The "Always Busy, Never Growing" Paradox</div>
                                            <p style={{ color: C.muted, fontSize: "15px", lineHeight: 1.5, margin: 0 }}>Your team is maxed out, yet revenue is flat. Human effort doesn't scale. Systems do.</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeUp>

                            <div className="ma-grid-res" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                {[
                                    { title: "Leads Falling Through Cracks", desc: "A prospect visits at 2am. No one follows up. They buy from your competitor by morning.", icon: Filter, num: "01" },
                                    { title: "Inconsistent Follow-Up", desc: "Manual outreach is random. Some leads get 5 touchpoints, others get zero.", icon: RefreshCw, num: "02" },
                                    { title: "Zero Personalization at Scale", desc: "Sending the same email to 10,000 people. Everyone knows it. No one opens it.", icon: Users, num: "03" },
                                ].map((item, i) => (
                                    <FadeUp key={i} delay={0.1 + i * 0.1}>
                                        <div className="ma-card-hover" style={{ display: "flex", gap: "20px", padding: "24px", background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", cursor: "default" }}>
                                            <div style={{ fontFamily: "var(--font-roboto), sans-serif", fontSize: "1.2rem", fontWeight: 800, color: C.primary, opacity: 0.3, lineHeight: 1, flexShrink: 0 }}>{item.num}</div>
                                            <div>
                                                <div style={{ fontWeight: 700, color: C.text, marginBottom: "8px", fontSize: "16px" }}>{item.title}</div>
                                                <p style={{ color: C.muted, fontSize: "15px", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                                            </div>
                                        </div>
                                    </FadeUp>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════
                    WORKFLOW PIPELINE
                ══════════════════════════════════════════════ */}
                <section id="how-it-works" className="ma-section-padding" style={{ padding: "7rem 0", background: C.bg }}>
                    <div style={W}>
                        <FadeUp><SectionLabel text="The Engine" /></FadeUp>
                        <FadeUp delay={0.05} className="ma-mobile-center">
                            <h2 style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: "clamp(1.9rem,3.2vw,2.8rem)", color: C.text, lineHeight: 1.15, marginBottom: "0.8rem", fontWeight: 700, maxWidth: "560px" }}>
                                Your Marketing, Running<br /><em style={{ color: C.primary }}>24/7 on Autopilot</em>
                            </h2>
                            <p style={{ color: C.faint, marginBottom: "4rem", maxWidth: "480px", lineHeight: 1.8, fontSize: "0.97rem" }}>
                                Intelligent workflows that trigger the right message, to the right person, at exactly the right moment.
                            </p>
                        </FadeUp>

                        <div className="ma-grid-res" style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                            {[
                                { tag: "TRIGGER", title: "Lead Visits Your Site", desc: "A visitor lands on a key page. The automation engine wakes up instantly.", icon: MousePointerClick, color: C.primary, bg: C.primaryDim, border: C.primaryBorder },
                                { tag: "SCORE", title: "Instant Lead Scoring", desc: "AI scores the lead based on behavior, source, and intent signals. High-value leads get priority routing.", icon: BrainCircuit, color: "#38bdf8", bg: "rgba(56,189,248,0.08)", border: "rgba(56,189,248,0.25)" },
                                { tag: "BRANCH", title: "Personalized Nurture Sequence", desc: "Hot leads → direct sales call. Warm leads → 7-email nurture flow. Cold leads → educational content.", icon: GitBranch, color: "#a78bfa", bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.25)" },
                                { tag: "NOTIFY", title: "Real-Time Sales Alert", desc: "Lead opens 3+ emails or revisits pricing? Your sales rep gets a Slack ping within 30 seconds.", icon: Bell, color: "#fb923c", bg: "rgba(251,146,60,0.08)", border: "rgba(251,146,60,0.25)" },
                                { tag: "CONVERT", title: "Deal Closed → Onboarding", desc: "The moment a deal closes, automation hands off: welcome email, resource delivery, NPS survey scheduled.", icon: CheckCircle2, color: C.green, bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.25)" },
                            ].map((step, i) => (
                                <FadeUp key={i} delay={i * 0.08}>
                                    <div className="ma-workflow-step" style={{ display: "flex", gap: "24px", position: "relative" }}>
                                        <div className="ma-workflow-icon-box" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "48px", flexShrink: 0 }}>
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                style={{ width: "48px", height: "48px", borderRadius: "12px", background: step.bg, border: `1px solid ${step.border}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}
                                            >
                                                <step.icon size={22} style={{ color: step.color }} />
                                            </motion.div>
                                            {i < 4 && <div className="ma-workflow-line" style={{ width: "1px", flex: 1, background: C.border, minHeight: "24px" }} />}
                                        </div>
                                        <div className="ma-workflow-content" style={{ flex: 1, paddingBottom: i === 4 ? 0 : "40px" }}>
                                            <div className="ma-workflow-tag-row" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px", marginTop: "4px" }}>
                                                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: step.color, background: step.bg, border: `1px solid ${step.border}`, padding: "2px 8px", borderRadius: "4px", letterSpacing: "0.05em", fontWeight: 700 }}>{step.tag}</span>
                                                <span style={{ fontWeight: 700, color: C.text, fontSize: "17px" }}>{step.title}</span>
                                            </div>
                                            <p style={{ color: C.muted, fontSize: "15px", lineHeight: 1.5, margin: 0 }}>{step.desc}</p>
                                        </div>
                                    </div>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════
                    SERVICES GRID
                ══════════════════════════════════════════════ */}
                <section className="ma-section-padding" style={{ padding: "7rem 0", background: C.surface, borderBottom: `1px solid ${C.border}` }}>
                    <div style={W}>
                        <FadeUp><SectionLabel text="What We Automate" /></FadeUp>
                        <FadeUp delay={0.05} className="ma-mobile-left">
                            <h2 style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: "clamp(24px, 5vw, 40px)", color: C.text, lineHeight: 1.25, marginBottom: "12px", fontWeight: 700 }}>
                                Every Channel.<br /><em style={{ color: C.primary }}>Fully Automated.</em>
                            </h2>
                            <p style={{ color: C.muted, marginBottom: "48px", maxWidth: "480px", lineHeight: 1.6, fontSize: "16px" }}>
                                We don't just automate email. We build a connected marketing machine across every touchpoint.
                            </p>
                        </FadeUp>

                        <div className="ma-grid-res ma-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", background: "transparent", border: "none", borderRadius: "0", overflow: "visible" }}>
                            {[
                                { title: "Email Automation", desc: "Drip campaigns, behavioral triggers, re-engagement flows, and abandoned cart sequences — personalized at scale.", icon: Mail, tags: ["Klaviyo", "HubSpot", "Mailchimp"] },
                                { title: "Lead Nurturing Funnels", desc: "Multi-touch sequences that move prospects from awareness to decision without manual intervention.", icon: Target, tags: ["Lead Scoring", "Segmentation", "CRM Sync"] },
                                { title: "CRM Workflow Automation", desc: "Auto-assign leads, update deal stages, trigger tasks, and sync data across your entire stack.", icon: Workflow, tags: ["Salesforce", "HubSpot CRM", "Pipedrive"] },
                                { title: "Social Media Scheduling", desc: "AI-optimized posting schedules, auto-repurposing of top content, performance-based calendar management.", icon: Repeat, tags: ["Buffer", "Hootsuite", "Later"] },
                                { title: "Ad Retargeting Automation", desc: "Dynamic audience building, automatic bid adjustments, and creative rotation based on real-time data.", icon: Layers, tags: ["Meta Ads", "Google Ads", "LinkedIn"] },
                                { title: "Analytics & Reporting", desc: "Automated weekly reports, anomaly detection alerts, and AI-generated insights every Monday morning.", icon: BarChart3, tags: ["GA4", "Looker Studio", "Custom"] },
                            ].map((svc, i) => (
                                <motion.div
                                    key={i}
                                    className="ma-svc-cell ma-card-hover"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10px" }}
                                    transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                                    style={{ padding: "32px 24px", background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", cursor: "default" }}
                                >
                                    <svc.icon size={28} style={{ color: C.primary, marginBottom: "20px" }} />
                                    <div style={{ fontWeight: 700, color: C.text, marginBottom: "12px", fontSize: "18px" }}>{svc.title}</div>
                                    <p style={{ color: C.muted, fontSize: "15px", lineHeight: 1.6, marginBottom: "24px" }}>{svc.desc}</p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                        {svc.tags.map((t, j) => (
                                            <span key={j} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: C.muted, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.border}`, padding: "4px 8px", borderRadius: "4px" }}>{t}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════
                    RESULTS
                ══════════════════════════════════════════════ */}
                <section className="ma-section-padding" style={{ padding: "7rem 0", background: C.bg, position: "relative", borderBottom: `1px solid ${C.border}`, overflow: "hidden" }}>
                    <div style={{ ...W, position: "relative", zIndex: 1 }}>
                        <FadeUp><SectionLabel text="Outcomes" /></FadeUp>
                        <FadeUp delay={0.05} className="ma-mobile-left">
                            <h2 style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: "clamp(24px, 5vw, 40px)", color: C.text, lineHeight: 1.15, marginBottom: "48px", fontWeight: 700, maxWidth: "560px" }}>
                                What Happens When You<br /><em style={{ color: C.primary }}>Stop Doing It Manually</em>
                            </h2>
                        </FadeUp>

                        <div className="ma-grid-res ma-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
                            {[
                                { val: 3, suf: "×", label: "More Leads Contacted", desc: "Every lead gets a follow-up. No exceptions.", icon: Target },
                                { val: 68, suf: "%", label: "Less Manual Work", desc: "Your team focuses on strategy, not spreadsheets.", icon: Clock },
                                { val: 240, suf: "%", label: "Higher Email Open Rates", desc: "Personalized sends outperform blasts every time.", icon: Mail },
                                { val: 40, suf: "%", label: "Faster Sales Cycles", desc: "Warm leads arrive pre-educated and ready to buy.", icon: TrendingUp },
                            ].map((r, i) => (
                                <motion.div
                                    key={i}
                                    className="ma-card-hover"
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10px" }}
                                    transition={{ duration: 0.55, delay: i * 0.1 }}
                                    style={{ padding: "32px 24px", background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", cursor: "default" }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                                        <Counter value={r.val} suffix={r.suf} />
                                        <r.icon size={22} style={{ color: C.primary, opacity: 0.8 }} />
                                    </div>
                                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: C.primary, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "12px" }}>{r.label}</div>
                                    <p style={{ color: C.muted, fontSize: "15px", lineHeight: 1.5, margin: 0 }}>{r.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════
                    PROCESS
                ══════════════════════════════════════════════ */}
                <section className="ma-section-padding" style={{ padding: "7rem 0", background: C.surface }}>
                    <div style={W}>
                        <FadeUp><SectionLabel text="The Process" /></FadeUp>
                        <FadeUp delay={0.05} className="ma-mobile-left">
                            <h2 style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: "clamp(24px, 5vw, 40px)", color: C.text, lineHeight: 1.15, marginBottom: "12px", fontWeight: 700 }}>
                                Zero to Fully Automated<br /><em style={{ color: C.primary }}>in 30 Days</em>
                            </h2>
                            <p style={{ color: C.muted, marginBottom: "48px", lineHeight: 1.6, fontSize: "16px" }}>Our proven onboarding process gets your automation stack live — fast.</p>
                        </FadeUp>

                        <div className="ma-grid-res ma-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }}>
                            {[
                                { week: "Week 01", title: "Discovery & Audit", items: ["Tool audit", "KPI definition", "Opportunity map"], icon: ShieldCheck },
                                { week: "Week 02", title: "Architecture & Build", items: ["Workflow mapping", "CRM integrations", "Sequence copy"], icon: GitBranch },
                                { week: "Week 03", title: "Testing & QA", items: ["End-to-end testing", "Deliverability QA", "Edge cases"], icon: RefreshCw },
                                { week: "Week 04", title: "Launch & Optimize", items: ["Go-live", "A/B test setup", "Dashboard delivery"], icon: TrendingUp },
                            ].map((phase, i) => (
                                <motion.div
                                    key={i}
                                    className="ma-card-hover"
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10px" }}
                                    transition={{ duration: 0.55, delay: i * 0.1 }}
                                    style={{ padding: "32px 24px", background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", position: "relative", cursor: "default", overflow: "hidden" }}
                                >
                                    <div style={{ position: "absolute", top: "-10px", right: "-10px", fontFamily: "var(--font-roboto), sans-serif", fontSize: "4rem", fontWeight: 900, color: C.primaryGlow, lineHeight: 1, userSelect: "none", zIndex: 0 }}>{i + 1}</div>
                                    <phase.icon size={24} style={{ color: C.primary, marginBottom: "20px", position: "relative", zIndex: 1 }} />
                                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: C.primary, fontWeight: 700, marginBottom: "8px", letterSpacing: "0.1em" }}>{phase.week}</div>
                                    <div style={{ fontWeight: 700, color: C.text, marginBottom: "16px", fontSize: "18px", position: "relative", zIndex: 1 }}>{phase.title}</div>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", position: "relative", zIndex: 1 }}>
                                        {phase.items.map((item, j) => (
                                            <li key={j} style={{ display: "flex", alignItems: "center", gap: "8px", color: C.muted, fontSize: "15px" }}>
                                                <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: C.primary, flexShrink: 0, opacity: 0.7 }} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════
                    TOOLS — Marquee Slider
                ══════════════════════════════════════════════ */}
                <section style={{ padding: "2rem 0", background: C.bg, borderTop: `0px solid ${C.border}`, overflow: "hidden" }}>
                    {/* <div style={W}>
                        <FadeUp>
                            <SectionLabel text="Stack We Use" />
                            <h2 style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: "clamp(1.9rem,3.2vw,2.8rem)", color: C.text, lineHeight: 1.15, marginBottom: "0.8rem", fontWeight: 700 }}>
                                Best-in-Class Tools,<br /><em style={{ color: C.primary, fontStyle: "italic" }}>Expertly Integrated.</em>
                            </h2>
                            <p style={{ color: C.faint, marginBottom: "3.5rem", maxWidth: "500px", lineHeight: 1.8, fontSize: "0.97rem" }}>
                                We don't lock you into one platform. We connect the tools you already use — or recommend the best ones for your stack.
                            </p>
                        </FadeUp>
                    </div> */}

                    {/* Row 1 — scrolls left */}
                    <div style={{ position: "relative", marginBottom: "1rem" }}>
                        {/* Fade masks */}
                        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100px", background: `linear-gradient(to right, ${C.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
                        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "100px", background: `linear-gradient(to left, ${C.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
                        <div style={{ display: "flex", gap: "1rem", animation: "ma-marquee-left 20s linear infinite" }}
                            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused"}
                            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.animationPlayState = "running"}
                        >
                            {[...["HubSpot", "Klaviyo", "ActiveCampaign", "Mailchimp", "Zapier", "Make.com", "Salesforce", "Pipedrive"], ...["HubSpot", "Klaviyo", "ActiveCampaign", "Mailchimp", "Zapier", "Make.com", "Salesforce", "Pipedrive"]].map((tool, i) => (
                                <div key={i} style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.7rem 1.4rem", background: C.card, border: `1px solid ${C.border}`, borderRadius: "8px", cursor: "default", transition: "all 0.25s ease", whiteSpace: "nowrap" }}
                                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = C.primaryBorder; el.style.background = C.primaryDim; el.style.color = C.primary; }}
                                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = C.border; el.style.background = C.card; el.style.color = C.text; }}
                                >
                                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.primary, flexShrink: 0, opacity: 0.7 }} />
                                    <span style={{ fontFamily: "var(--font-roboto), sans-serif", fontSize: "0.88rem", fontWeight: 600, color: C.text }}>{tool}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2 — scrolls right */}
                    <div style={{ position: "relative" }}>
                        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", background: `linear-gradient(to right, ${C.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
                        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", background: `linear-gradient(to left, ${C.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
                        <div style={{ display: "flex", gap: "1rem", animation: "ma-marquee-right 20s linear infinite" }}
                            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused"}
                            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.animationPlayState = "running"}
                        >
                            {[...["GA4", "Segment", "Intercom", "Notion AI", "Slack", "Airtable", "Webflow", "Stripe"], ...["GA4", "Segment", "Intercom", "Notion AI", "Slack", "Airtable", "Webflow", "Stripe"]].map((tool, i) => (
                                <div key={i} style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.7rem 1.4rem", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", cursor: "default", transition: "all 0.25s ease", whiteSpace: "nowrap" }}
                                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = C.primaryBorder; el.style.background = C.primaryDim; el.style.color = C.primary; }}
                                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = C.border; el.style.background = C.surface; el.style.color = C.text; }}
                                >
                                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.primary, flexShrink: 0, opacity: 0.7 }} />
                                    <span style={{ fontFamily: "var(--font-roboto), sans-serif", fontSize: "0.88rem", fontWeight: 600, color: C.text }}>{tool}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════
                    FIT CHECK
                ══════════════════════════════════════════════ */}
                <section className="ma-section-padding" style={{ padding: "7rem 0", background: C.surface, borderBottom: `1px solid ${C.border}` }}>
                    <div style={W}>
                        <FadeUp><SectionLabel text="Fit Check" /></FadeUp>
                        <FadeUp delay={0.05} className="ma-mobile-left">
                            <h2 style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: "clamp(24px, 5vw, 40px)", color: C.text, lineHeight: 1.15, marginBottom: "32px", fontWeight: 700 }}>
                                Is This Right for You?
                            </h2>
                        </FadeUp>
                        <div className="ma-grid-res ma-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                            <FadeUp delay={0.1}>
                                <div style={{ padding: "32px 24px", background: "rgba(52,211,153,0.02)", border: "1px solid rgba(52,211,153,0.15)", borderRadius: "12px", height: "100%" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                                        <CheckCircle2 size={22} style={{ color: C.green }} />
                                        <span style={{ fontWeight: 700, color: C.text, fontSize: "17px" }}>Perfect Fit For</span>
                                    </div>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                                        {["Businesses with 50+ leads/month", "Teams spending 10+ hrs/week on manual follow-ups", "E-commerce brands with cart abandonment issues", "B2B companies with long sales cycles", "Agencies wanting to scale without hiring"].map((item, i) => (
                                            <li key={i} style={{ display: "flex", gap: "12px", color: C.muted, fontSize: "15px", lineHeight: 1.5 }}>
                                                <span style={{ color: C.green, flexShrink: 0, marginTop: "2px", fontWeight: 900 }}>→</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeUp>
                            <FadeUp delay={0.15}>
                                <div style={{ padding: "32px 24px", background: "rgba(248,113,113,0.02)", border: "1px solid rgba(248,113,113,0.15)", borderRadius: "12px", height: "100%" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                                        <XCircle size={22} style={{ color: C.red }} />
                                        <span style={{ fontWeight: 700, color: C.text, fontSize: "17px" }}>Not a Fit For</span>
                                    </div>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                                        {["Businesses with fewer than 10 leads/month", "No existing CRM or email list", "Looking for a one-time campaign, not a system", "Unwilling to share access to marketing tools", "Expecting results without a defined offer"].map((item, i) => (
                                            <li key={i} style={{ display: "flex", gap: "12px", color: C.muted, fontSize: "15px", lineHeight: 1.5 }}>
                                                <span style={{ color: C.red, flexShrink: 0, marginTop: "2px", fontWeight: 900 }}>×</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeUp>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════
                    PRICING — uses the site's existing ServicePricing
                    component which already matches all other pages
                ══════════════════════════════════════════════ */}
                <ServicePricing serviceName="Marketing Automation" plans={plans || []} />

                {/* ══════════════════════════════════════════════
                    FAQ — HomeFAQ style accordion
                ══════════════════════════════════════════════ */}
                <MAFaqSection />

                {/* ══════════════════════════════════════════════
                    LEAD FORM
                ══════════════════════════════════════════════ */}
                <ConsultationFormSection
                    title="Get Your Free Automation Audit"
                    subtitle="Tell us about your business and we'll map out exactly which workflows would save your team the most time and generate the most revenue."
                    source="Marketing Automation Page - Lead Form"
                />

            </main>
        </>
    );
}
