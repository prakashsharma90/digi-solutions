"use client";

import { Container, Section } from "@/components/ui/container";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

const deliverables = [
    { feature: "Posts per month", starter: "12", growth: "20", authority: "Custom" },
    { feature: "Reels/Shorts", starter: "4", growth: "8", authority: "Unlimited" },
    { feature: "Platforms", starter: "2", growth: "3", authority: "All" },
    { feature: "Community management", starter: "Basic", growth: "Full", authority: "24/7" },
    { feature: "Content calendar", starter: true, growth: true, authority: true },
    { feature: "Strategy document", starter: false, growth: true, authority: true },
    { feature: "Dedicated manager", starter: false, growth: true, authority: true },
    { feature: "Weekly reports", starter: false, growth: true, authority: true },
    { feature: "Real-time dashboard", starter: false, growth: false, authority: true },
    { feature: "Priority support", starter: false, growth: false, authority: true },
];

export function SocialDeliverables() {
    return (
        <Section className="bg-gradient-to-b from-[#0B0F14] to-background">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
                            What You{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Get
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            Clear deliverables for every plan
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-5xl mx-auto overflow-x-auto"
                >
                    <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 px-4 text-gray-400 font-semibold text-sm">Feature</th>
                                    <th className="text-center py-4 px-4">
                                        <div className="text-white font-bold text-lg mb-1">Starter</div>
                                        <div className="text-primary text-sm">₹45K/mo</div>
                                    </th>
                                    <th className="text-center py-4 px-4">
                                        <div className="text-white font-bold text-lg mb-1">Growth</div>
                                        <div className="text-primary text-sm">₹75K/mo</div>
                                    </th>
                                    <th className="text-center py-4 px-4">
                                        <div className="text-white font-bold text-lg mb-1">Authority</div>
                                        <div className="text-primary text-sm">Custom</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {deliverables.map((item, index) => (
                                    <tr key={index} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4 px-4 text-gray-300 text-sm">{item.feature}</td>
                                        <td className="py-4 px-4 text-center">
                                            {typeof item.starter === "boolean" ? (
                                                item.starter ? (
                                                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                                                ) : (
                                                    <X className="w-5 h-5 text-gray-600 mx-auto" />
                                                )
                                            ) : (
                                                <span className="text-white font-semibold">{item.starter}</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            {typeof item.growth === "boolean" ? (
                                                item.growth ? (
                                                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                                                ) : (
                                                    <X className="w-5 h-5 text-gray-600 mx-auto" />
                                                )
                                            ) : (
                                                <span className="text-white font-semibold">{item.growth}</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            {typeof item.authority === "boolean" ? (
                                                item.authority ? (
                                                    <Check className="w-5 h-5 text-green-400 mx-auto" />
                                                ) : (
                                                    <X className="w-5 h-5 text-gray-600 mx-auto" />
                                                )
                                            ) : (
                                                <span className="text-white font-semibold">{item.authority}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}
