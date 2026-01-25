"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, Mail, Loader2, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await response.json();
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F14] p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md bg-[#0F141A] border-white/10 shadow-2xl relative z-10">
        <CardHeader className="text-center pb-6 border-b border-white/5">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <ShieldCheck className="text-primary" size={24} />
          </div>
          <CardTitle className="text-2xl font-bold text-white font-poppins tracking-tight">
            Admin Portal
          </CardTitle>
          <CardDescription className="text-gray-400">
            Secure access for authorized personnel only
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-gray-300 ml-1">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm py-3 px-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertCircle size={16} />
                <p>{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 rounded-lg text-base font-semibold shadow-[0_0_20px_-5px_var(--color-primary)] hover:shadow-[0_0_25px_-2px_var(--color-primary)] transition-all flex gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight size={18} />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={14} className="text-green-500" />
                <span>256-bit SSL Encrypted Connection</span>
              </div>
              <div className="flex gap-4 text-xs text-gray-600">
                <Link href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
                <span>•</span>
                <Link href="#" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
              </div>
              <p className="text-[10px] text-gray-700 mt-2">
                © 2026 Digihub Solutions. Unauthorized access is prohibited.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dev Mode Indicator (Optional: Remove in production) */}
      <div className="absolute bottom-4 right-4 text-[10px] text-gray-800 font-mono">
        v1.0.0 (Secure)
      </div>
    </div>
  );
}
