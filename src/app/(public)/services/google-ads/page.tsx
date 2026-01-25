"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle2, ArrowRight, BarChart3, TrendingUp, Layers,
    MousePointer2, Settings, ShoppingBag, Globe, Zap,
    MessageCircle, Star, Check, Plus, Minus, Send, Mail, Phone, MapPin
} from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { ServicePricing } from "@/components/sections/ServicePricing";

// Mock Data for components
const brands = ["ICON", "DORE & ROSE", "VERA MODEHAUS", "WOLFF", "VAN HALEN MODE", "iUsed", "Matters", "SVET", "relatiegeschenken"];

const testimonials = [
    {
        name: "Devon Lane",
        role: "Trezzo",
        content: "I recently had the pleasure of staying at [HotelName], and it was an unforgettable experience. From the moment I arrived, the staff went above and beyond to ensure my comfort and satisfaction.",
        platform: "Trustpilot"
    },
    {
        name: "Devon Lane",
        role: "Trezzo",
        content: "I recently had the pleasure of staying at [HotelName], and it was an unforgettable experience. From the moment I arrived, the staff went above and beyond to ensure my comfort and satisfaction.",
        platform: "Trustpilot"
    },
    {
        name: "Devon Lane",
        role: "Trezzo",
        content: "I recently had the pleasure of staying at [HotelName], and it was an unforgettable experience. From the moment I arrived, the staff went above and beyond.",
        platform: "Trustpilot"
    }
];

export default function GoogleAdsPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <main className="bg-[#050505] min-h-screen text-white pt-20 relative selection:bg-blue-500/30">
            {/* AMBIENT BACKGROUND GLOW */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] right-[-10%] w-[30%] h-[40%] bg-purple-600/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-cyan-600/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150 mix-blend-overlay"></div>
            </div>

            {/* 1. HERO SECTION */}
            <Section className="relative overflow-hidden pt-24 pb-20 md:pt-40 md:pb-32 z-10">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] opacity-40 pointer-events-none" />

                <Container className="relative z-10 text-center">
                    {/* Top Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center items-center gap-6 mb-10"
                    >
                        {[
                            { color: "bg-[#4285F4]", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.64 2 12.2 2C6.42 2 2 6.5 2 12.2c0 5.68 4.42 10.2 10.2 10.2 6.06 0 10.32-4.17 10.32-10.2 0-.69-.11-1.1-.11-1.1z" /></svg> },
                            { color: "bg-[#96BF48]", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zm-7.65 15.68l-2.6-9.15h2.15l1.45 6.32 1.63-6.32h2.2l1.63 6.32 1.45-6.32h2.09l-2.58 9.15h-2.3l-1.57-5.9-1.56 5.9h-2z" /></svg> }, // Generic shopify-ish
                            { color: "bg-[#0668E1]", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> } // FB
                        ].map((item, i) => (
                            <div key={i} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 backdrop-blur-md shadow-lg shadow-black/20 hover:scale-110 hover:border-white/20 transition-all duration-300 group cursor-default">
                                <div className={`w-full h-full rounded-full flex items-center justify-center text-white ${item.color} shadow-inner`}>
                                    {item.icon}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">Scale Your</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse">E-commerce</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
                    >
                        We help top 1% brands dominate Google Ads and scale to <span className="text-white font-medium">7/8-figure months</span> with predictive AI strategies.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-10 h-14 text-lg font-semibold shadow-[0_0_50px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-10px_rgba(37,99,235,0.7)] hover:scale-105 transition-all duration-300">
                            Book Strategy Call
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full bg-white/5 border-white/10 text-white hover:bg-white/10 px-10 h-14 text-lg backdrop-blur-sm gap-3 hover:border-white/30 transition-all duration-300">
                            <MessageCircle className="w-5 h-5 text-green-400" /> WhatsApp Us
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-12 flex items-center justify-center gap-4 text-sm font-medium bg-white/5 border border-white/5 w-fit mx-auto px-6 py-3 rounded-full backdrop-blur-md"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#050505] flex items-center justify-center text-[10px] overflow-hidden">
                                    <div className={`w-full h-full bg-gradient-to-br from-gray-600 to-gray-800`} />
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col items-start leading-tight">
                            <span className="text-white">Rated 4.9/5 by 100+ Brands</span>
                            <span className="text-gray-500 text-xs flex items-center gap-1">On <Star size={10} className="fill-green-500 text-green-500" /> Trustpilot</span>
                        </div>
                    </motion.div>

                    {/* Stats Grid - Enhanced */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24 max-w-6xl mx-auto"
                    >
                        {[
                            { label: "Ad spend managed", value: "€60M+", color: "text-white" },
                            { label: "Revenue generated", value: "€444M", color: "text-green-400" },
                            { label: "Average ROAS", value: "7.4x", color: "text-blue-400" },
                            { label: "Google Partner", value: "Premier", icon: true, color: "text-white" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-gradient-to-b from-white/[0.08] to-transparent border border-white/5 p-8 rounded-3xl flex flex-col items-center justify-center group hover:border-blue-500/30 hover:bg-white/[0.1] transition-all duration-500 backdrop-blur-sm relative overflow-hidden">
                                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />
                                <div className={`text-4xl lg:text-5xl font-bold mb-2 ${stat.color} flex items-center gap-2 relative z-10`}>
                                    {stat.icon && <span className="text-blue-500"><CheckCircle2 className="w-6 h-6" /></span>}
                                    {stat.value}
                                </div>
                                <div className="text-sm font-medium text-gray-400 uppercase tracking-widest relative z-10">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </Container>
            </Section>

            {/* 2. LOGO MARQUEE */}
            <Section className="py-16 border-y border-white/5 bg-[#030303]/50 backdrop-blur-sm z-10 relative">
                <Container>
                    <div className="text-center mb-10 text-sm font-mono text-gray-500 uppercase tracking-[0.2em]">Trusted by the most innovative companies</div>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                        {brands.map((brand, i) => (
                            <span key={i} className="text-2xl md:text-3xl font-bold font-serif text-white/40 hover:text-white transition-colors cursor-default">{brand}</span>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 3. WHY CHOOSE SECTION */}
            <Section className="py-24 md:py-32 relative z-10">
                <Container>
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Why Top Brands<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Choose Digihub</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">We don't just run ads. We engineer revenue engines.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-[#0A0E14] border border-white/5 rounded-[2.5rem] p-10 h-[450px] flex flex-col relative overflow-hidden group hover:border-blue-500/40 hover:shadow-[0_0_50px_-20px_rgba(59,130,246,0.2)] transition-all duration-500">
                            <div className="z-10 relative">
                                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20"><BarChart3 className="text-blue-400 w-8 h-8" /></div>
                                <h3 className="text-3xl font-bold mb-4 leading-tight">Consistent &<br />Stable <span className="text-blue-400">ROAS</span></h3>
                                <p className="text-gray-500 group-hover:text-gray-400 transition-colors">We stabilize your returns so you can scale inventory with confidence.</p>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-56 flex items-end justify-center px-8 pb-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="flex items-end gap-3 h-40 w-full justify-between">
                                    {[30, 45, 35, 60, 50, 85, 80, 100].map((h, i) => (
                                        <div key={i} style={{ height: `${h}%` }} className="w-full bg-blue-500/20 rounded-md group-hover:bg-blue-500 transition-colors duration-500 delay-[50ms]" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#0A0E14] border border-white/5 rounded-[2.5rem] p-10 h-[450px] flex flex-col relative overflow-hidden group hover:border-purple-500/40 hover:shadow-[0_0_50px_-20px_rgba(168,85,247,0.2)] transition-all duration-500">
                            <div className="z-10 relative">
                                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 border border-purple-500/20"><MousePointer2 className="text-purple-400 w-8 h-8" /></div>
                                <h3 className="text-3xl font-bold mb-4 leading-tight">High <span className="text-purple-400">Intent</span><br />Traffic</h3>
                                <p className="text-gray-500 group-hover:text-gray-400 transition-colors">We target users actively searching for your solution, not cold audiences.</p>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 top-32 flex items-center justify-center opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                                <div className="w-64 h-64 border border-purple-500/20 rounded-full flex items-center justify-center animate-spin-slow">
                                    <div className="w-44 h-44 border border-purple-500/40 rounded-full flex items-center justify-center border-dashed">
                                        <div className="w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,1)]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#0A0E14] border border-white/5 rounded-[2.5rem] p-10 h-[450px] flex flex-col relative overflow-hidden group hover:border-cyan-500/40 hover:shadow-[0_0_50px_-20px_rgba(6,182,212,0.2)] transition-all duration-500">
                            <div className="z-10 relative">
                                <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20"><TrendingUp className="text-cyan-400 w-8 h-8" /></div>
                                <h3 className="text-3xl font-bold mb-4 leading-tight">Endless <span className="text-cyan-400">Scaling</span><br />Opportunities</h3>
                                <p className="text-gray-500 group-hover:text-gray-400 transition-colors">Once we crack the code, we scale vertically and horizontally.</p>
                            </div>
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-tr from-cyan-600/30 to-purple-600/30 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-700" />
                        </div>
                    </div>
                </Container>
            </Section>

            {/* 4. IMPACT SECTION (Dropshipping) */}
            <Section className="py-24 bg-[#080B10]/50 border-y border-white/5 relative z-10 backdrop-blur-sm">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <span className="text-sm font-mono text-blue-400 uppercase tracking-widest block mb-4">Live Results</span>
                            <h2 className="text-4xl md:text-5xl font-bold">Our Dropshipping <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">Impact</span></h2>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 cursor-pointer transition-all"><ArrowRight className="rotate-180" size={24} /></div>
                            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-500 shadow-lg shadow-blue-900/40 transition-all"><ArrowRight size={24} /></div>
                        </div>
                    </div>

                    {/* Horizontal Scroll Area */}
                    <div className="flex flex-col md:flex-row gap-8 overflow-x-auto pb-8 no-scrollbar snap-x justify-center">
                        {[
                            {
                                market: "AUS Market - Fashion General",
                                sales: "€1.2M",
                                orders: "12,542",
                                conv: "3.8%",
                                color: "blue"
                            },
                            {
                                market: "DE Market - Dropshipping",
                                sales: "€850K",
                                orders: "9,210",
                                conv: "4.1%",
                                color: "purple"
                            }
                        ].map((item, i) => (
                            <div key={i} className="min-w-[300px] md:min-w-[650px] bg-[#0E1218] rounded-[2rem] p-8 border border-white/5 snap-center group hover:border-white/10 transition-all hover:shadow-2xl">
                                {/* Mock Chart UI */}
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    {[
                                        { label: "Total Sales", val: item.sales, trend: "+12%" },
                                        { label: "Orders", val: item.orders, trend: "+5%" },
                                        { label: "Conv. Rate", val: item.conv, trend: "+0.4%" }
                                    ].map((stat, j) => (
                                        <div key={j} className="bg-[#151A22] rounded-xl p-5 border border-white/5">
                                            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">{stat.label}</div>
                                            <div className="text-2xl font-bold text-white mb-1">{stat.val}</div>
                                            <div className="text-xs text-green-400 font-mono">{stat.trend}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="h-48 w-full bg-[#151A22] rounded-xl relative overflow-hidden flex items-end px-6 gap-3 pt-8 border border-white/5">
                                    {/* Fake Bars with animation delay */}
                                    {[...Array(24)].map((_, j) => (
                                        <div
                                            key={j}
                                            style={{ height: `${Math.random() * 70 + 20}%` }}
                                            className={`flex-1 rounded-t-sm opacity-30 group-hover:opacity-100 transition-all duration-700 ${item.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'}`}
                                        />
                                    ))}
                                </div>
                                <div className="mt-6 flex justify-between items-center text-sm">
                                    <span className="text-xs font-bold font-mono uppercase bg-white/10 px-3 py-1.5 rounded-lg text-white/70">Google Ads</span>
                                    <span className="font-bold text-lg flex items-center gap-3">
                                        {item.market}
                                        <Globe size={18} className="text-gray-500" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 5. SERVICES SECTION */}
            <Section className="py-24 md:py-32 relative z-10">
                <Container>
                    <div className="text-center mb-20">
                        <span className="text-sm font-mono text-blue-500 uppercase tracking-widest block mb-4">Our Expertise</span>
                        <h2 className="text-5xl md:text-6xl font-bold">What We <span className="text-blue-500">Do Best</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {[
                            { title: "Merchant Center Solutions", icon: ShoppingBag, desc: "Fix suspensions, optimize feeds, and ensure your products dominate Shopping tabs." },
                            { title: "Ad Campaign Scaling", icon: TrendingUp, desc: "Advanced bid strategies and structure to increase spend without tanking ROAS." },
                            { title: "E-com Partnership", icon: Layers, desc: "We act as your growth partner, handling tax, payment gateways, and logistics advice." },
                        ].map((srv, i) => (
                            <div key={i} className="bg-[#0E1218] border border-white/5 rounded-[2rem] p-10 hover:bg-[#131820] hover:scale-[1.02] transition-all duration-300 group cursor-default shadow-lg">
                                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-500 group-hover:rotate-6 text-blue-500 group-hover:text-white transition-all duration-300">
                                    <srv.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{srv.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-lg">{srv.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Button className="rounded-full bg-white text-black hover:bg-gray-200 border-none px-10 py-7 h-auto text-lg font-bold shadow-2xl hover:scale-105 transition-all">
                            Schedule a Free 30-Minute Consulting Call
                        </Button>
                    </div>
                </Container>
            </Section>

            {/* 6. TESTIMONIALS */}
            <Section className="py-24 bg-[#080B10] relative z-10 border-t border-white/5">
                <Container>
                    <div className="text-center mb-20">
                        <span className="text-sm font-mono text-gray-500 uppercase tracking-widest block mb-4">Social Proof</span>
                        <h2 className="text-4xl md:text-5xl font-bold">Brands That <span className="text-blue-500">Trust Us</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-gradient-to-br from-[#0B0F14] to-[#0A0E14] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors shadow-lg">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 border border-white/10" />
                                    <div>
                                        <div className="font-bold text-base">{t.name}</div>
                                        <div className="text-sm text-gray-500">{t.role}</div>
                                    </div>
                                    <div className="ml-auto opacity-50"><svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.0547 15.352 14.5078 17.5859 13.6719C16.9609 13.9062 16.1953 14 15.6562 14C13.2578 14 11.5156 12.0625 11.5156 9.60156C11.5156 7.21875 13.5391 5 16.0312 5C18.6641 5 20.8281 7.21875 20.8281 9.94531C20.8281 14.9922 17.0703 21 14.017 21ZM4.98438 21L4.98438 18C4.98438 16.0547 6.3125 14.5078 8.54688 13.6719C7.92188 13.9062 7.15625 14 6.61719 14C4.24219 14 2.5 12.0625 2.5 9.60156C2.5 7.21875 4.5 5 7 5C9.63281 5 11.8203 7.21875 11.8203 9.94531C11.8203 14.9922 8.03125 21 4.98438 21Z" /></svg></div>
                                </div>
                                <p className="text-base text-gray-300 leading-relaxed mb-6 italic">"{t.content}"</p>
                                <div className="flex items-center gap-2 text-xs font-bold border-t border-white/5 pt-4 mt-auto">
                                    <Star size={14} className="fill-green-500 text-green-500" />
                                    <Star size={14} className="fill-green-500 text-green-500" />
                                    <Star size={14} className="fill-green-500 text-green-500" />
                                    <Star size={14} className="fill-green-500 text-green-500" />
                                    <Star size={14} className="fill-green-500 text-green-500" />
                                    <span className="ml-2 text-gray-400">on {t.platform}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>



            {/* 7. HOW IT WORKS (Footer Area Process) */}
            <Section className="py-24 md:py-32 relative z-10">
                <Container>
                    <div className="text-center mb-20">
                        <span className="text-sm font-mono text-gray-500 uppercase tracking-widest block mb-4">Process</span>
                        <h2 className="text-4xl md:text-5xl font-bold"><span className="text-blue-500">Scaling</span> Made Simple</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Book a free onboarding call", desc: "We analyze your current ad account and identify missed revenue opportunities." },
                            { step: "02", title: "We optimize and scale your ads", desc: "Our team rebuilds your campaign structure for higher intent and lower costs." },
                            { step: "03", title: "You handle the backend while revenue grows", desc: "Focus on fulfillment and product while we drive consistent sales daily." },
                        ].map((st, i) => (
                            <div key={i} className="bg-[#0E1218] border border-white/5 rounded-[2rem] p-10 relative overflow-hidden group hover:border-blue-500/20 transition-all">
                                <div className="text-sm font-bold font-mono text-blue-500 mb-6 border border-blue-500/20 bg-blue-500/5 w-fit px-3 py-1.5 rounded uppercase tracking-wider">STEP {st.step}</div>
                                <h3 className="text-2xl font-bold mb-4">{st.title}</h3>
                                <p className="text-gray-400 leading-relaxed z-10 relative">{st.desc}</p>
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all opacity-0 group-hover:opacity-100" />
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 8. PRICING SECTION */}
            <ServicePricing
                serviceName="Google Ads"
                plans={[
                    {
                        id: "starter",
                        title: "Starter",
                        price: 2500,
                        currency: "EUR",
                        billing_cycle: "monthly",
                        is_popular: false,
                        features: ["Campaign Audit & Fixes", "Basic Search & Shopping Setup", "Monthly Optimization", "Standard Reporting", "Email Support"]
                    },
                    {
                        id: "growth",
                        title: "Growth",
                        price: 4500,
                        currency: "EUR",
                        billing_cycle: "monthly",
                        is_popular: true,
                        features: ["Complete Account Restructure", "Advanced Bid Strategies (tROAS)", "Weekly Optimization", "Custom Data Studio Dashboard", "Priority Support", "Quarterly Strategy Calls"]
                    },
                    {
                        id: "scale",
                        title: "Scale",
                        price: "Custom",
                        currency: "EUR",
                        billing_cycle: "monthly",
                        is_popular: false,
                        features: ["Full-Funnel Strategy (YouTube/Discovery)", "Dedicated Account Manager", "Daily Optimization & Pacing", "Advanced Attribution Modelling", "Slack Channel Access", "Creative Strategy Consulting"]
                    }
                ]}
            />

            {/* 9. FAQ SECTION */}
            <Section className="py-24 relative z-10">
                <Container className="max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold">Frequently Asked <span className="text-blue-500">Questions</span></h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "How fast can I see results?", a: "PPC is immediate. You can start getting qualified traffic within hours of launch. However, optimal performance and stable ROAS typically take 4-8 weeks of data accumulation and optimization." },
                            { q: "Do you only do Google Ads?", a: "While we specialize in Google Ads (Search, Shopping, YouTube, Discovery), we also manage Microsoft Ads (Bing) as they capture a similar high-intent audience." },
                            { q: "What is the minimum ad spend required?", a: "We generally recommend a minimum ad spend of €3,000/month to ensure we have enough data to make statistically significant optimization decisions." },
                            { q: "Do I own the ad account?", a: "100% Yes. You always retain full ownership of your Google Ads account and data. We work as a partner within your asset." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-[#0E1218] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="text-lg font-medium">{faq.q}</span>
                                    {openFaq === i ? <Minus className="text-blue-500" /> : <Plus className="text-gray-500" />}
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 text-gray-400 leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 10. GET IN TOUCH FORM */}
            <Section className="py-24 bg-[#080B10] border-t border-white/5 relative z-10">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
                            <span className="text-sm font-mono text-blue-500 uppercase tracking-widest block mb-4">Contact Us</span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to <span className="text-blue-500">Scale?</span></h2>
                            <p className="text-gray-400 text-lg mb-10">Book a strategy call to see if you qualify for our growth partnership program.</p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><Mail size={20} /></div>
                                    <span>hello@wescales.com</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><Phone size={20} /></div>
                                    <span>+31 (0) 20 123 4567</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><MapPin size={20} /></div>
                                    <span>Amsterdam, The Netherlands</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#0E1218] border border-white/5 rounded-[2rem] p-8 md:p-10">
                            <LeadForm source="Google Ads Page" defaultService="google-ads" />
                        </div>
                    </div>
                </Container>
            </Section>

        </main>
    );
}
