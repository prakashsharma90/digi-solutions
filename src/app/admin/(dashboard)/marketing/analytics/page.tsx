"use client";

import { useState, useEffect } from "react";
import {
    BarChart3,
    Code,
    Link as LinkIcon,
    MousePointerClick,
    Settings,
    Save,
    Check,
    Globe,
    Facebook,
    Linkedin,
    Twitter,
    Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have this, if not I'll use standard textarea
import { Switch } from "@/components/ui/switch"; // Assuming you have this
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { toast } from "sonner"; // Removed unused import

export default function AnalyticsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Settings State
    const [settings, setSettings] = useState({
        // 1. Integrations
        ga4_id: "",
        gtm_id: "",
        meta_pixel_id: "",
        linkedin_insight_tag: "",
        twitter_pixel_id: "", // New
        pinterest_tag_id: "", // New

        // 4. Scripts
        head_scripts: "",
        body_scripts: "",
        footer_scripts: "",
        scripts_enabled: true,

        // 6. Lead Source Tracking
        utm_tracking_enabled: true,
        store_user_ip: false, // careful with GDPR
    });

    // 3. UTM Builder State
    const [utmBuilder, setUtmBuilder] = useState({
        url: "https://yourwebsite.com",
        source: "google",
        medium: "cpc",
        campaign: "summer_sale",
        term: "",
        content: ""
    });

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const res = await fetch("/api/admin/settings");
            const data = await res.json();
            if (data.success && data.settings) {
                // Filter and merge only relevant keys
                const newSettings = { ...settings };
                Object.keys(settings).forEach(key => {
                    if (data.settings[key] !== undefined) {
                        // Handle boolean conversion if needed (stored as strings usually)
                        if (typeof settings[key as keyof typeof settings] === 'boolean') {
                            // @ts-ignore
                            newSettings[key] = data.settings[key] === 'true';
                        } else {
                            // @ts-ignore
                            newSettings[key] = data.settings[key];
                        }
                    }
                });
                setSettings(newSettings);
            }
        } catch (error) {
            console.error("Failed to load settings", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const payload = { settings: { ...settings } };
            // Convert booleans to strings for storage if your API expects strings
            // logic above suggests ensuring API handles it, but let's send what we have

            const res = await fetch("/api/admin/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (data.success) {
                alert("Settings saved successfully!"); // Replace with toast if available
            } else {
                alert("Error saving settings: " + data.error);
            }
        } catch (error) {
            console.error("Save error", error);
            alert("Failed to save settings");
        } finally {
            setIsSaving(false);
        }
    };

    const updateSetting = (key: string, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const generateUtmUrl = () => {
        try {
            const url = new URL(utmBuilder.url);
            if (utmBuilder.source) url.searchParams.set("utm_source", utmBuilder.source);
            if (utmBuilder.medium) url.searchParams.set("utm_medium", utmBuilder.medium);
            if (utmBuilder.campaign) url.searchParams.set("utm_campaign", utmBuilder.campaign);
            if (utmBuilder.term) url.searchParams.set("utm_term", utmBuilder.term);
            if (utmBuilder.content) url.searchParams.set("utm_content", utmBuilder.content);
            return url.toString();
        } catch (e) {
            return "Invalid URL";
        }
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading analytics configuration...</div>;

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Tracking & Analytics</h1>
                    <p className="text-gray-400 mt-2">Manage pixels, scripts, and campaign tracking in one place.</p>
                </div>
                <Button onClick={handleSave} disabled={isSaving} className="bg-primary text-black font-bold gap-2">
                    {isSaving ? "Saving..." : <><Save size={18} /> Save Changes</>}
                </Button>
            </div>

            <Tabs defaultValue="integrations" className="space-y-6">
                <TabsList className="bg-[#0b0f14] border border-white/5 p-1 h-auto flex-wrap justify-start gap-1">
                    <TabsTrigger value="integrations" className="data-[state=active]:bg-primary data-[state=active]:text-black gap-2 px-4 py-2.5">
                        <Globe size={16} /> 1. Analytics Integration
                    </TabsTrigger>
                    <TabsTrigger value="conversion" className="data-[state=active]:bg-primary data-[state=active]:text-black gap-2 px-4 py-2.5">
                        <MousePointerClick size={16} /> 2. Conversion Tracking
                    </TabsTrigger>
                    <TabsTrigger value="campaigns" className="data-[state=active]:bg-primary data-[state=active]:text-black gap-2 px-4 py-2.5">
                        <LinkIcon size={16} /> 3. Campaign & UTM Tracking
                    </TabsTrigger>
                    <TabsTrigger value="scripts" className="data-[state=active]:bg-primary data-[state=active]:text-black gap-2 px-4 py-2.5">
                        <Code size={16} /> 4. Pixel & Script Manager
                    </TabsTrigger>
                    <TabsTrigger value="lead_source" className="data-[state=active]:bg-primary data-[state=active]:text-black gap-2 px-4 py-2.5">
                        <BarChart3 size={16} /> 5. Lead Source Tracking
                    </TabsTrigger>
                </TabsList>

                {/* 1. Analytics Integration */}
                <TabsContent value="integrations" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-[#0b0f14] border-white/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Globe className="text-blue-400" size={20} /> Google Analytics 4</CardTitle>
                                <CardDescription>Enter your measurement ID (G-XXXXXXXXXX)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Measurement ID</Label>
                                    <Input
                                        placeholder="G-1234567890"
                                        value={settings.ga4_id}
                                        onChange={(e) => updateSetting('ga4_id', e.target.value)}
                                        className="bg-[#0F141A] border-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>GTM Container ID (Optional)</Label>
                                    <Input
                                        placeholder="GTM-XXXXXX"
                                        value={settings.gtm_id}
                                        onChange={(e) => updateSetting('gtm_id', e.target.value)}
                                        className="bg-[#0F141A] border-white/10"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#0b0f14] border-white/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Facebook className="text-blue-600" size={20} /> Meta Pixel</CardTitle>
                                <CardDescription>Track conversions from Facebook & Instagram ads</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Pixel ID</Label>
                                    <Input
                                        placeholder="123456789012345"
                                        value={settings.meta_pixel_id}
                                        onChange={(e) => updateSetting('meta_pixel_id', e.target.value)}
                                        className="bg-[#0F141A] border-white/10"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#0b0f14] border-white/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Linkedin className="text-blue-500" size={20} /> LinkedIn Insight Tag</CardTitle>
                                <CardDescription>Track conversions from LinkedIn campaigns</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Partner ID</Label>
                                    <Input
                                        placeholder="1234567"
                                        value={settings.linkedin_insight_tag}
                                        onChange={(e) => updateSetting('linkedin_insight_tag', e.target.value)}
                                        className="bg-[#0F141A] border-white/10"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#0b0f14] border-white/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Twitter className="text-blue-400" size={20} /> Twitter / X Pixel</CardTitle>
                                <CardDescription>Track conversions from Twitter ads</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Pixel ID</Label>
                                    <Input
                                        placeholder="tw-xxxx-xxxx"
                                        value={settings.twitter_pixel_id}
                                        onChange={(e) => updateSetting('twitter_pixel_id', e.target.value)}
                                        className="bg-[#0F141A] border-white/10"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#0b0f14] border-white/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Tag className="text-red-500" size={20} /> Pinterest Tag</CardTitle>
                                <CardDescription>Track conversions from Pinterest ads</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Tag ID</Label>
                                    <Input
                                        placeholder="261234567890"
                                        value={settings.pinterest_tag_id}
                                        onChange={(e) => updateSetting('pinterest_tag_id', e.target.value)}
                                        className="bg-[#0F141A] border-white/10"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* 2. Conversion Tracking */}
                <TabsContent value="conversion" className="space-y-6">
                    <Card className="bg-[#0b0f14] border-white/5">
                        <CardHeader>
                            <CardTitle>Conversion Events</CardTitle>
                            <CardDescription>Define what counts as a conversion on your site.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                                            <MousePointerClick size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">Form Submissions</h4>
                                            <p className="text-sm text-gray-400">Track when a user submits a contact form (form_submit)</p>
                                        </div>
                                    </div>
                                    <Switch checked={true} disabled /> {/* Placeholder for now */}
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                            <LinkIcon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">Button Clicks</h4>
                                            <p className="text-sm text-gray-400">Track clicks on specific CTAs (cta_click)</p>
                                        </div>
                                    </div>
                                    <Switch checked={true} disabled />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 3. Campaign & UTM Tracking */}
                <TabsContent value="campaigns" className="space-y-6">
                    <Card className="bg-[#0b0f14] border-white/5">
                        <CardHeader>
                            <CardTitle>UTM Link Builder</CardTitle>
                            <CardDescription>Generate trackable URLs for your campaigns.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Website URL</Label>
                                    <Input
                                        value={utmBuilder.url}
                                        onChange={(e) => setUtmBuilder({ ...utmBuilder, url: e.target.value })}
                                        className="bg-[#0F141A] border-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Campaign Source (utm_source)</Label>
                                    <Input
                                        value={utmBuilder.source}
                                        onChange={(e) => setUtmBuilder({ ...utmBuilder, source: e.target.value })}
                                        placeholder="google, facebook, newsletter"
                                        className="bg-[#0F141A] border-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Campaign Medium (utm_medium)</Label>
                                    <Input
                                        value={utmBuilder.medium}
                                        onChange={(e) => setUtmBuilder({ ...utmBuilder, medium: e.target.value })}
                                        placeholder="cpc, banner, email"
                                        className="bg-[#0F141A] border-white/10"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Campaign Name (utm_campaign)</Label>
                                    <Input
                                        value={utmBuilder.campaign}
                                        onChange={(e) => setUtmBuilder({ ...utmBuilder, campaign: e.target.value })}
                                        placeholder="summer_sale, v1_launch"
                                        className="bg-[#0F141A] border-white/10"
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-black/40 rounded-lg border border-white/10 space-y-2">
                                <Label className="text-gray-400">Generated URL:</Label>
                                <div className="flex gap-2">
                                    <code className="flex-1 block p-3 bg-[#0F141A] rounded text-primary font-mono text-sm break-all">
                                        {generateUtmUrl()}
                                    </code>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            navigator.clipboard.writeText(generateUtmUrl());
                                            alert("Copied to clipboard!");
                                        }}
                                    >
                                        Copy
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 4. Pixel & Script Manager */}
                <TabsContent value="scripts" className="space-y-6">
                    <Card className="bg-[#0b0f14] border-white/5">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Custom Scripts</CardTitle>
                                    <CardDescription>Inject custom JS/CSS into your site's &lt;head&gt; or &lt;body&gt;.</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Label>Enable Scripts</Label>
                                    <Switch
                                        checked={settings.scripts_enabled}
                                        onCheckedChange={(checked) => updateSetting('scripts_enabled', checked)}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>&lt;HEAD&gt; Scripts</Label>
                                <p className="text-xs text-gray-500">Executed as soon as possible. Good for verification tags and critical CSS.</p>
                                <Textarea
                                    className="font-mono text-xs bg-[#0F141A] border-white/10 min-h-[150px]"
                                    placeholder="<script>...</script>"
                                    value={settings.head_scripts}
                                    onChange={(e) => updateSetting('head_scripts', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>&lt;BODY&gt; (Start) Scripts</Label>
                                <p className="text-xs text-gray-500">Executed immediately after &lt;body&gt; tag opens. Good for GTM fallback.</p>
                                <Textarea
                                    className="font-mono text-xs bg-[#0F141A] border-white/10 min-h-[150px]"
                                    placeholder="<noscript>...</noscript>"
                                    value={settings.body_scripts}
                                    onChange={(e) => updateSetting('body_scripts', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>&lt;BODY&gt; (End) Scripts</Label>
                                <p className="text-xs text-gray-500">Executed before &lt;/body&gt; closes. Good for chat widgets and non-critical JS.</p>
                                <Textarea
                                    className="font-mono text-xs bg-[#0F141A] border-white/10 min-h-[150px]"
                                    placeholder="<script>...</script>"
                                    value={settings.footer_scripts}
                                    onChange={(e) => updateSetting('footer_scripts', e.target.value)}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* 5. Lead Source Tracking */}
                <TabsContent value="lead_source" className="space-y-6">
                    <Card className="bg-[#0b0f14] border-white/5">
                        <CardHeader>
                            <CardTitle>Lead Source Attribution</CardTitle>
                            <CardDescription>Track where your leads are coming from.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                                            <Globe size={18} />
                                        </div>
                                        <div className="text-sm font-medium text-white">Global Source Tracking</div>
                                    </div>
                                    <Switch checked={true} />
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Campaign Performance</h3>
                                <div className="rounded-xl border border-white/5 overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-white/5 text-gray-400">
                                            <tr>
                                                <th className="px-4 py-3 text-left">Source</th>
                                                <th className="px-4 py-3 text-left">Campaign Name</th>
                                                <th className="px-4 py-3 text-right">Leads Generated</th>
                                                <th className="px-4 py-3 text-right">Conversion Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            <tr className="hover:bg-white/[0.02]">
                                                <td className="px-4 py-3 text-white flex items-center gap-2">
                                                    <Globe size={14} className="text-blue-400" /> Google Ads
                                                </td>
                                                <td className="px-4 py-3 text-gray-300">summer_sale_2024</td>
                                                <td className="px-4 py-3 text-right text-white font-bold">142</td>
                                                <td className="px-4 py-3 text-right text-green-400">4.2%</td>
                                            </tr>
                                            <tr className="hover:bg-white/[0.02]">
                                                <td className="px-4 py-3 text-white flex items-center gap-2">
                                                    <Facebook size={14} className="text-blue-600" /> Facebook
                                                </td>
                                                <td className="px-4 py-3 text-gray-300">retargeting_v1</td>
                                                <td className="px-4 py-3 text-right text-white font-bold">89</td>
                                                <td className="px-4 py-3 text-right text-green-400">2.8%</td>
                                            </tr>
                                            <tr className="hover:bg-white/[0.02]">
                                                <td className="px-4 py-3 text-white flex items-center gap-2">
                                                    <Linkedin size={14} className="text-blue-500" /> LinkedIn
                                                </td>
                                                <td className="px-4 py-3 text-gray-300">b2b_lead_gen</td>
                                                <td className="px-4 py-3 text-right text-white font-bold">56</td>
                                                <td className="px-4 py-3 text-right text-green-400">5.1%</td>
                                            </tr>
                                            <tr className="hover:bg-white/[0.02]">
                                                <td className="px-4 py-3 text-white flex items-center gap-2">
                                                    <Globe size={14} className="text-gray-400" /> Organic
                                                </td>
                                                <td className="px-4 py-3 text-gray-300">(none)</td>
                                                <td className="px-4 py-3 text-right text-white font-bold">312</td>
                                                <td className="px-4 py-3 text-right text-green-400">1.9%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
