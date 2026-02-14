"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, TrendingUp, Users, Target, CheckCircle2, Play, Star, ArrowRight, Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container, Section } from "@/components/ui/container";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans selection:bg-[#00D9C3]/30">
            <AboutHero />
            <IntroAndStats />
            <CoreValues />
            <HowWeWork />
            <TeamSection />
            <Testimonials />
            <AboutCTA />
        </main>
    );
}

// 1. Hero Section
function AboutHero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-primary/20 bg-[#080b10]/80 backdrop-blur-md">
            <Container>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text Content */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[#00D9C3] font-bold tracking-widest uppercase text-sm"
                        >
                            About Us
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight"
                        >
                            Your Growth Partner <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D9C3] to-[#00F5E0]">
                                in the Digital World
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-gray-400 max-w-xl leading-relaxed font-medium"
                        >
                            We're a full-service digital marketing agency dedicated to helping businesses of all sizes thrive online. From startups taking their first steps to established enterprises scaling new heights, we combine innovative strategies with proven results to turn your marketing goals into reality.
                        </motion.p>
                    </div>

                    {/* Right: Hero Image with Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative order-1 lg:order-2"
                    >
                        {/* Main Image */}
                        {/* Custom shape: Rounded corners, but we can stick to a consistent large radius */}
                        <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl z-10 bg-[#111]">
                            <Image
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2070"
                                alt="Team Collaboration"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Floating Badge - Bottom Left (Cutout effect simulated by positioning) */}
                        <div className="absolute -bottom-10 -left-10 z-20">
                            <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-spin-slow">
                                {/* Rotating Text Path */}
                                <svg className="w-full h-full p-2" viewBox="0 0 100 100">
                                    <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                                    <text className="text-[10.5px] font-bold uppercase tracking-[0.18em] fill-black">
                                        <textPath href="#curve">
                                            • Digihub Solutions • Est. 2018
                                        </textPath>
                                    </text>
                                </svg>
                                {/* Center Icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-[#00D9C3] rounded-full flex items-center justify-center">
                                        <ArrowRight className="w-6 h-6 text-black -rotate-45" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}

// 2. Intro Text & Stats (Combined Section)
function IntroAndStats() {
    const stats = [
        { val: "50+", label: "Happy Clients" },
        { val: "200+", label: "Campaigns Launched" },
        { val: "95%", label: "Client Satisfaction" },
        { val: "24/7", label: "Support Available" },
    ];

    return (
        <section className="py-24 border-b border-primary/20 bg-[#080b10]/80 backdrop-blur-md">
            <Container>
                {/* Centered Intro Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center mb-24"
                >
                    <p className="text-2xl md:text-3xl lg:text-[2rem] leading-snug font-medium text-gray-500">
                        At Digihub's, our mission is simple: <span className="text-white">make professional, results-driven digital marketing accessible</span> to every business. We believe whether you're a local startup or a global enterprise, you deserve <span className="text-white">marketing strategies that deliver measurable growth.</span>
                    </p>
                </motion.div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="space-y-2 group cursor-default"
                        >
                            <div className="text-5xl lg:text-6xl font-black text-white group-hover:text-[#00D9C3] transition-colors duration-300">
                                {stat.val}
                            </div>
                            <div className="text-sm font-bold text-gray-500 tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

// 3. Mission / Vision / History (Alternating Layout with Collage)
function CoreValues() {
    const sections = [
        {
            title: "Our Mission",
            desc: "Empowering Businesses Through Digital Excellence. We're committed to being more than just a service provider; we're your strategic partner invested in your success.",
            points: ["Delivering transparent, measurable results.", "Staying ahead of digital trends.", "Building lasting partnerships.", "Making complex marketing simple."],
            imgMain: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
            imgSec: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800",
            align: "left"
        },

        {
            title: "Our Vision",
            desc: "Building Tomorrow's Success Stories Today. We envision a digital landscape where businesses of every size have the tools to compete and win.",
            points: ["Data-driven decisions replacing guesswork.", "Ecosystems that adapt and evolve.", "Authentic brand connections.", "Sustainable growth strategies."],
            imgMain: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070",
            imgSec: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
            align: "right"
        },
        {
            title: "Our Story",
            desc: "From Vision to Reality. Founded in 2024, we saw an opportunity to do things differently—combining creative flair with data-driven strategy.",
            points: ["2024: Launched with comprehensive solutions.", "Early Success: Secured 20 clients in opening months.", "Today: Serving diverse industries globally."],
            imgMain: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
            imgSec: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
            align: "left"
        }
    ];

    return (
        <section className="py-32 space-y-32 border-b border-primary/20 bg-[#080b10]/80 backdrop-blur-md">
            <Container>
                {sections.map((item, i) => (
                    <div key={i} className={`flex flex-col lg:flex-row gap-20 items-center ${item.align === 'right' ? 'lg:flex-row-reverse' : ''} pb-24 mb-24 border-b border-white/10 last:border-0 last:pb-0 last:mb-0`}>
                        {/* Image Side (Collage) */}
                        <div className="flex-1 relative w-full min-h-[500px] flex items-center justify-center">
                            {/* Decorative Blur Background */}
                            <div className="absolute inset-0 bg-[#00D9C3]/5 rounded-full blur-[100px] pointer-events-none" />

                            <div className="relative w-full h-[500px]">
                                {/* Back Image */}
                                <div className={`absolute top-0 w-[75%] h-[80%] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl ${item.align === 'left' ? 'left-0' : 'right-0'}`}>
                                    <Image
                                        src={item.imgMain}
                                        alt={item.title}
                                        fill
                                        className="object-cover opacity-60"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                </div>

                                {/* Front Image (Overlapping) */}
                                <div className={`absolute bottom-0 w-[55%] h-[60%] rounded-[2rem] overflow-hidden border-4 border-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${item.align === 'left' ? 'right-4' : 'left-4'}`}>
                                    <Image
                                        src={item.imgSec}
                                        alt={item.title + " Detail"}
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                </div>

                                {/* Decorative Badge/Graphic */}
                                <div className={`absolute top-1/2 -translate-y-1/2 w-24 h-24 bg-[#00D9C3] rounded-full flex items-center justify-center shadow-lg z-10 ${item.align === 'left' ? 'right-[45%]' : 'left-[45%]'}`}>
                                    <TrendingUp className="w-10 h-10 text-black" />
                                </div>
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="flex-1 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl lg:text-6xl font-black text-white leading-[1.1]">{item.title}</h2>
                                <div className="w-20 h-1.5 bg-[#00D9C3] rounded-full" />
                            </div>

                            <p className="text-gray-400 text-lg leading-relaxed font-medium">
                                {item.desc}
                            </p>
                            <ul className="space-y-5">
                                {item.points.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-4 group">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-[#00D9C3]/10 flex items-center justify-center border border-[#00D9C3]/20 group-hover:bg-[#00D9C3] transition-colors">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00D9C3] group-hover:text-black transition-colors" />
                                        </div>
                                        <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className="flex items-center gap-2 text-[#00D9C3] font-bold uppercase tracking-widest hover:gap-4 transition-all">
                                Learn More <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </Container>
        </section>
    );
}

// 4. How We Work (Video Placeholder)
function HowWeWork() {
    return (
        <Section className="py-32 border-b border-primary/20 bg-[#080b10]/80 backdrop-blur-md">
            <Container>
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl lg:text-5xl font-black text-white">Our Approach to Digital Success</h2>
                    <p className="text-gray-400 font-medium max-w-2xl mx-auto">
                        We blend creativity with data-driven strategies to craft campaigns that resonate and deliver measurable results.
                    </p>
                </div>

                <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden border border-white/10 group cursor-pointer shadow-2xl">
                    <Image
                        src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2070"
                        alt="How We Work"
                        fill
                        className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <div className="w-16 h-16 rounded-full bg-[#00D9C3] flex items-center justify-center shadow-[0_0_30px_rgba(0,217,195,0.4)]">
                                <Play className="w-6 h-6 text-black fill-black ml-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}

// 5. Team Section
function TeamSection() {
    const team = [
        { name: "Alex Anderson", role: "CEO & Founder", desc: "Visionary leader with a decade+ in digital marketing.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" },
        { name: "Sarah Chen", role: "Creative Director", desc: "Bringing brands to life with stunning visuals.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" },
        { name: "David Kim", role: "SEO & Analytics Lead", desc: "Turning complex data into actionable growth.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800" },
        { name: "Emily Davis", role: "Social Media Strategist", desc: "Building communities that spark conversations.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800" },
    ];

    return (
        <Section className="py-32 border-b border-primary/20 bg-[#080b10]/80 backdrop-blur-md">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-black text-white">The People Behind <br /> Your Success</h2>
                    </div>
                    <Link href="/team" className="px-8 py-3 rounded-full border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all">
                        View All Members
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-10 rounded-[2.5rem] bg-[#0F1216] border border-white/5 hover:border-primary/20 hover:shadow-[0_0_30px_-10px_rgba(0,217,195,0.15)] transition-all duration-500"
                        >
                            <div className="aspect-square rounded-full overflow-hidden mb-6 border-2 border-white/5 group-hover:border-[#00D9C3] transition-colors relative">
                                <Image src={member.img} alt={member.name} fill className="object-cover" />
                            </div>
                            <h3 className="text-2xl font-black mb-2 tracking-tight text-white group-hover:text-[#00D9C3] transition-colors">{member.name}</h3>
                            <p className="text-xs uppercase tracking-widest font-bold text-[#00D9C3] mb-4">{member.role}</p>
                            <p className="text-sm text-gray-400 font-medium leading-relaxed group-hover:text-gray-300 transition-colors">{member.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

// 6. Testimonials
function Testimonials() {
    const clients = [
        {
            name: "Sarah Mitchell",
            role: "Founder & CEO, TechStart",
            text: "Working with this team has been transformative. They didn't just execute campaigns—they became strategic partners who genuinely cared about our growth.",
            rating: 5,
            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
        },
        {
            name: "James Chen",
            role: "Marketing Dir, Global Retail",
            text: "Their data-driven approach and creative execution have helped us achieve a 250% ROI. Finally, an agency that delivers on its promises.",
            rating: 5,
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
        },
        {
            name: "Dr. Amanda Rodriguez",
            role: "CMO, HealthCare Plus",
            text: "From day one, they understood our unique challenges. Their tailored strategies increased patient inquiries by 180% and strengthened our brand.",
            rating: 5,
            img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
        }
    ];

    return (
        <section className="py-32 relative overflow-hidden border-b border-primary/20 bg-[#080b10]/80 backdrop-blur-md">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00D9C3]/5 rounded-full blur-[150px] pointer-events-none" />

            <Container className="relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">What Our Clients Say</h2>
                    <p className="text-gray-400">Real results from real partnerships.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {clients.map((client, i) => (
                        <div key={i} className="p-10 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-all group">
                            <div className="flex gap-1 mb-6">
                                {[...Array(client.rating)].map((_, r) => (
                                    <Star key={r} className="w-4 h-4 text-[#00D9C3] fill-[#00D9C3]" />
                                ))}
                            </div>
                            <p className="text-gray-300 mb-8 leading-relaxed font-medium">"{client.text}"</p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                                    <Image src={client.img} alt={client.name} width={48} height={48} className="object-cover w-full h-full" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-sm">{client.name}</div>
                                    <div className="text-gray-500 text-xs uppercase tracking-wider">{client.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

// 7. About CTA
function AboutCTA() {
    return (
        <section className="py-40 bg-black relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F] to-black" />

            <Container className="relative z-10 text-center">
                <div className="max-w-4xl mx-auto bg-[#111] p-12 md:p-20 rounded-[3rem] border border-white/10 relative overflow-hidden">
                    {/* Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D9C3]/10 rounded-full blur-[120px] pointer-events-none" />

                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight relative z-10">
                        Let's Create Your <br />
                        <span className="text-[#00D9C3]">Success Story.</span>
                    </h2>

                    <p className="text-gray-400 mb-10 max-w-xl mx-auto relative z-10 font-medium">
                        Ready to take your digital marketing to the next level? No obligations, just honest conversation about your goals.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <Link href="/contact" className="px-10 py-4 rounded-full bg-[#00D9C3] text-black font-bold hover:bg-[#00c0ad] transition-colors shadow-[0_0_20px_rgba(0,217,195,0.3)]">
                            Get Started Today
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
