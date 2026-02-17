import { Settings, Clock, Mail } from "lucide-react";

export function MaintenancePage() {
    return (
        <div className="min-h-screen bg-[#0A0E13] flex items-center justify-center px-6">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 text-center max-w-lg mx-auto">
                {/* Animated Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="w-24 h-24 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center justify-center">
                            <Settings className="text-yellow-500 animate-[spin_8s_linear_infinite]" size={40} />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Clock size={12} className="text-black" />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins tracking-tight">
                    Under Maintenance
                </h1>

                {/* Description */}
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    We&apos;re currently performing scheduled maintenance to improve your experience.
                    We&apos;ll be back shortly.
                </p>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-white/5"></div>
                    <span className="text-xs text-gray-600 uppercase tracking-widest font-medium">Estimated Downtime</span>
                    <div className="flex-1 h-px bg-white/5"></div>
                </div>

                {/* Status Card */}
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 mb-8">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-white">00</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Hours</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-yellow-500">30</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Minutes</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">00</div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Seconds</div>
                        </div>
                    </div>
                </div>

                {/* Contact */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Mail size={14} />
                    <span>Questions? Contact us at </span>
                    <a href="mailto:support@digihub.agency" className="text-primary hover:underline">
                        support@digihub.agency
                    </a>
                </div>


            </div>
        </div>
    );
}
