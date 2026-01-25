"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Users,
    TrendingUp,
    Clock,
    Activity,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    Calendar,
    Download,
    RefreshCw
} from "lucide-react";

// Generate realistic demo data
const generateMonthlyData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map((month, index) => ({
        month,
        value: Math.floor(Math.random() * 400) + 100,
        users: Math.floor(Math.random() * 5000) + 1000,
        revenue: Math.floor(Math.random() * 50000) + 10000
    }));
};

const generateWeeklyData = () => {
    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
    return weeks.map((week) => ({
        month: week,
        value: Math.floor(Math.random() * 300) + 150,
        users: Math.floor(Math.random() * 2000) + 500,
        revenue: Math.floor(Math.random() * 20000) + 5000
    }));
};

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState<"week" | "month">("month");
    const [viewType, setViewType] = useState<"default" | "monthly" | "quarterly" | "yearly">("default");
    const [selectedMonth, setSelectedMonth] = useState("August");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [statisticsData, setStatisticsData] = useState(generateMonthlyData());

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            // Update active users count randomly
            setStats(prev => prev.map(stat =>
                stat.label === "Active Now"
                    ? { ...stat, value: `${Math.floor(Math.random() * 20) + 40}k` }
                    : stat
            ));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Handle time range change
    useEffect(() => {
        if (timeRange === "week") {
            setStatisticsData(generateWeeklyData());
        } else {
            setStatisticsData(generateMonthlyData());
        }
    }, [timeRange]);

    const [stats, setStats] = useState([
        {
            label: "Total Users",
            value: "993k",
            change: "+25%",
            trending: "up",
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-500/10",
            icon: Users,
            description: "Total registered users"
        },
        {
            label: "New Users",
            value: "13k",
            change: "+4.3%",
            trending: "up",
            color: "from-gray-700 to-gray-800",
            bgColor: "bg-white/5",
            icon: TrendingUp,
            description: "New users this month"
        },
        {
            label: "Avg. Time on Platform",
            value: "00:14:45",
            change: "-7.0%",
            trending: "down",
            color: "from-gray-700 to-gray-800",
            bgColor: "bg-white/5",
            icon: Clock,
            description: "Average session duration"
        },
        {
            label: "Active Now",
            value: "49k",
            change: "+0.4%",
            trending: "up",
            color: "from-gray-700 to-gray-800",
            bgColor: "bg-white/5",
            icon: Activity,
            description: "Currently active users"
        }
    ]);

    const maxValue = Math.max(...statisticsData.map(d => d.value));

    const userExploreData = [
        {
            label: "Home Page",
            sessions: "32.50%",
            avgTime: "00:08:23",
            bounceRate: "18.24%",
            transactions: 85.5,
            pageViews: "125.4k"
        },
        {
            label: "Services",
            sessions: "28.30%",
            avgTime: "00:12:15",
            bounceRate: "22.18%",
            transactions: 78.2,
            pageViews: "98.2k"
        },
        {
            label: "Blog",
            sessions: "17.50%",
            avgTime: "00:14:45",
            bounceRate: "24.48%",
            transactions: 75.5,
            pageViews: "76.3k"
        },
        {
            label: "Contact",
            sessions: "12.40%",
            avgTime: "00:05:32",
            bounceRate: "45.67%",
            transactions: 62.8,
            pageViews: "54.1k"
        },
        {
            label: "About",
            sessions: "9.30%",
            avgTime: "00:06:18",
            bounceRate: "38.92%",
            transactions: 58.3,
            pageViews: "41.7k"
        }
    ];

    const topReferrers = [
        { source: "Google Search", visits: "45.2k", percentage: 42 },
        { source: "Direct", visits: "32.8k", percentage: 31 },
        { source: "Social Media", visits: "18.5k", percentage: 17 },
        { source: "Email Campaign", visits: "10.2k", percentage: 10 }
    ];

    const deviceBreakdown = [
        { device: "Desktop", percentage: 58, color: "bg-blue-500" },
        { device: "Mobile", percentage: 35, color: "bg-teal-500" },
        { device: "Tablet", percentage: 7, color: "bg-purple-500" }
    ];

    const handleRefresh = () => {
        setIsRefreshing(true);
        setStatisticsData(timeRange === "week" ? generateWeeklyData() : generateMonthlyData());
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    const handleExport = () => {
        // Simulate data export
        const dataStr = JSON.stringify(statisticsData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `analytics-${timeRange}-${Date.now()}.json`;
        link.click();
    };

    return (
        <div className="max-w-[1400px] mx-auto">
            {/* Breadcrumb & Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span>Home</span>
                    <span>/</span>
                    <span className="text-white">Analytics</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">Analytics Overview</h1>
                        <p className="text-gray-400 text-sm">Track your website performance and user behavior</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleRefresh}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            disabled={isRefreshing}
                        >
                            <RefreshCw size={18} className={cn("text-gray-400", isRefreshing && "animate-spin")} />
                        </button>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm text-gray-300"
                        >
                            <Download size={16} />
                            Export
                        </button>
                        <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                            Additional Filter
                        </button>
                    </div>
                </div>

                {/* View Type Tabs */}
                <div className="flex gap-2 mb-6">
                    {["default", "monthly", "quarterly", "yearly"].map((view) => (
                        <button
                            key={view}
                            onClick={() => setViewType(view as any)}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize",
                                viewType === view
                                    ? "bg-white/10 text-white"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {view} view
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                            "relative rounded-2xl p-6 border border-white/5 group cursor-pointer hover:border-white/10 transition-all",
                            stat.bgColor,
                            index === 0 && "bg-gradient-to-br from-blue-600/20 to-blue-500/10 border-blue-500/20"
                        )}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
                                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                            </div>
                            <button className="p-1 hover:bg-white/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                <MoreVertical size={16} className="text-gray-400" />
                            </button>
                        </div>
                        <div className={cn(
                            "flex items-center gap-1 text-sm font-medium",
                            stat.trending === "up" ? "text-green-400" : "text-red-400"
                        )}>
                            {stat.trending === "up" ? (
                                <ArrowUpRight size={14} />
                            ) : (
                                <ArrowDownRight size={14} />
                            )}
                            {stat.change}
                        </div>
                        {index === 0 && (
                            <div className="absolute bottom-4 right-4">
                                <stat.icon size={24} className="text-blue-400 opacity-50" />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Statistics & Financial Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Statistics Chart */}
                <div className="bg-[#0F141A] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-white">Statistics</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setTimeRange("week")}
                                className={cn(
                                    "px-3 py-1.5 text-sm rounded-lg transition-colors",
                                    timeRange === "week"
                                        ? "bg-white/10 text-white"
                                        : "text-gray-400 hover:text-white"
                                )}
                            >
                                Week
                            </button>
                            <button
                                onClick={() => setTimeRange("month")}
                                className={cn(
                                    "px-3 py-1.5 text-sm rounded-lg transition-colors",
                                    timeRange === "month"
                                        ? "bg-white/10 text-white"
                                        : "text-gray-400 hover:text-white"
                                )}
                            >
                                Month
                            </button>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="h-64 flex items-end justify-between gap-4 px-4">
                        {statisticsData.slice(0, 6).map((item, index) => (
                            <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full relative" style={{ height: '200px' }}>
                                    <div className="absolute bottom-0 w-full flex flex-col items-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white font-medium mb-1 bg-black/50 px-2 py-1 rounded">
                                            ${item.value}k
                                        </div>
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(item.value / maxValue) * 100}%` }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className={cn(
                                                "w-full rounded-t-lg transition-all cursor-pointer",
                                                "bg-white/5 hover:bg-blue-500"
                                            )}
                                        />
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500">{item.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Financial Chart */}
                <div className="bg-[#0F141A] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-white">Financial</h2>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-white/20 cursor-pointer"
                        >
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>

                    {/* Line Chart */}
                    <div className="h-48 mb-6 relative">
                        <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M 0 100 Q 50 80, 100 90 T 200 70 T 300 85 T 400 75"
                                fill="url(#areaGradient)"
                            />
                            <path
                                d="M 0 100 Q 50 80, 100 90 T 200 70 T 300 85 T 400 75"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="2"
                            />
                        </svg>
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-500">
                            {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"].map((num) => (
                                <span key={num}>{num}</span>
                            ))}
                        </div>
                    </div>

                    {/* Financial Stats */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Expenses</p>
                            <p className="text-2xl font-bold text-white">+$4,341,244</p>
                            <div className="mt-2 h-12">
                                <svg className="w-full h-full" viewBox="0 0 150 40" preserveAspectRatio="none">
                                    <path
                                        d="M 0 20 Q 30 15, 60 25 T 120 18 T 150 22"
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Investment</p>
                            <p className="text-2xl font-bold text-white">47% down</p>
                            <div className="mt-2 h-12">
                                <svg className="w-full h-full" viewBox="0 0 150 40" preserveAspectRatio="none">
                                    <path
                                        d="M 0 15 Q 30 20, 60 10 T 120 25 T 150 20"
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Analytics Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Top Referrers */}
                <div className="bg-[#0F141A] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Top Referrers</h3>
                    <div className="space-y-4">
                        {topReferrers.map((referrer, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-300">{referrer.source}</span>
                                    <span className="text-sm font-medium text-white">{referrer.visits}</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${referrer.percentage}%` }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="h-full bg-blue-500 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Device Breakdown */}
                <div className="bg-[#0F141A] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Device Breakdown</h3>
                    <div className="space-y-4">
                        {deviceBreakdown.map((device, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className={cn("w-3 h-3 rounded-full", device.color)} />
                                    <span className="text-sm text-gray-300">{device.device}</span>
                                </div>
                                <span className="text-sm font-medium text-white">{device.percentage}%</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 h-2 bg-white/5 rounded-full overflow-hidden flex">
                        {deviceBreakdown.map((device, index) => (
                            <motion.div
                                key={index}
                                initial={{ width: 0 }}
                                animate={{ width: `${device.percentage}%` }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={device.color}
                            />
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-[#0F141A] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Quick Stats</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-white/5">
                            <span className="text-sm text-gray-400">Page Views</span>
                            <span className="text-lg font-bold text-white">2.4M</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-white/5">
                            <span className="text-sm text-gray-400">Unique Visitors</span>
                            <span className="text-lg font-bold text-white">842K</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-white/5">
                            <span className="text-sm text-gray-400">Avg. Session</span>
                            <span className="text-lg font-bold text-white">8m 32s</span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <span className="text-sm text-gray-400">Conversion Rate</span>
                            <span className="text-lg font-bold text-green-400">3.2%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Explore User Table */}
            <div className="bg-[#0F141A] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white">Page Performance</h2>
                        <p className="text-sm text-gray-400 mt-1">Detailed breakdown of page metrics</p>
                    </div>
                    <button className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                        <MoreVertical size={16} className="text-gray-400" />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Pages</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Page Views</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Sessions</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Avg. Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Bounce Rate</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Engagement</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {userExploreData.map((row, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="hover:bg-white/5 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{row.label}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{row.pageViews}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{row.sessions}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{row.avgTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{row.bounceRate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden max-w-[120px]">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${row.transactions}%` }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                    className="h-full bg-blue-500 rounded-full"
                                                />
                                            </div>
                                            <span className="text-sm text-gray-300 w-12 text-right">{row.transactions}%</span>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
