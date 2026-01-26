"use client";

import React, { useState } from "react";
import { Reorder } from "framer-motion";
import {
    Save, Eye, Upload, GripVertical, Plus, Edit2, Trash2,
    ToggleLeft, ToggleRight, Star, Settings,
    ChevronDown, ChevronUp, BarChart3, Clock,
    AlertCircle, CheckCircle2, Monitor, Smartphone,
    Zap, Package, ArrowRight, DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ServicesMegaMenu } from "@/components/layout/ServicesMegaMenu";
import { useMegaMenu } from "@/contexts/MegaMenuContext";
import { cn } from "@/lib/utils";

export default function MegaMenuManagerPage() {
    const {
        categories,
        updateCategory,
        updateService,
        reorderServices,
        addService,
        showPricing,
        setShowPricing,
        availableServices,
        loadingServices
    } = useMegaMenu();

    const [showPreview, setShowPreview] = useState(false);
    const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
    const [expandedCategory, setExpandedCategory] = useState<string | null>("acquisition");
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
    const [validationExpanded, setValidationExpanded] = useState(true);

    const handleSave = () => {
        setSaveStatus("saving");
        setTimeout(() => {
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 3000);
        }, 1000);
    };

    const handleAddService = (categoryId: string, service: any) => {
        const category = categories.find(c => c.id === categoryId);
        if (category?.services.some(s => s.slug === service.slug)) {
            // Optional: alert or toast
            return;
        }

        addService(categoryId, {
            id: `${service.id}-${Date.now()}`,
            name: service.name,
            slug: service.slug,
            subtitle: service.description || "AI-Powered Solution",
            icon: "Rocket",
            visible: true,
            featured: false,
            price: "Contact for pricing",
            priceType: "fixed",
            order: category ? category.services.length + 1 : 1
        });
    };

    const cyclePriceType = (categoryId: string, serviceId: string, currentType?: string) => {
        const types = ['fixed', 'starting', 'quote', 'hidden'];
        const nextIndex = (types.indexOf(currentType || 'fixed') + 1) % types.length;
        // @ts-ignore
        updateService(categoryId, serviceId, { priceType: types[nextIndex] });
    };

    const toggleCategoryVisibility = (categoryId: string) => {
        const category = categories.find(c => c.id === categoryId);
        if (category) {
            updateCategory(categoryId, { visible: !category.visible });
        }
    };

    const toggleServiceVisibility = (categoryId: string, serviceId: string) => {
        const category = categories.find(c => c.id === categoryId);
        const service = category?.services.find(s => s.id === serviceId);
        if (service) {
            updateService(categoryId, serviceId, { visible: !service.visible });
        }
    };

    const toggleServiceFeatured = (categoryId: string, serviceId: string) => {
        const category = categories.find(c => c.id === categoryId);
        const service = category?.services.find(s => s.id === serviceId);
        if (service) {
            updateService(categoryId, serviceId, { featured: !service.featured });
        }
    };

    const validationIssues = categories
        .filter(cat => cat.visible && cat.services.filter(s => s.visible).length < 2)
        .map(cat => ({
            id: cat.id,
            message: `Category "${cat.name}" has ${cat.services.filter(s => s.visible).length} visible service(s) (recommended: 2+)`,
            categoryId: cat.id
        }));

    return (
        <div className="space-y-6">
            {/* Sticky Top Bar */}
            <div className="sticky top-0 z-40 bg-[#0B0F14]/95 backdrop-blur-md border-b border-white/10 -mx-4 md:-mx-8 px-4 md:px-8 py-4 -mt-4 md:-mt-8 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Services Mega Menu</h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Manage navigation menu in real-time
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {saveStatus === "saved" && (
                            <span className="text-sm text-green-400 flex items-center gap-1">
                                <CheckCircle2 size={14} />
                                Saved
                            </span>
                        )}
                        {saveStatus === "saving" && (
                            <span className="text-sm text-gray-400 flex items-center gap-1">
                                <Clock size={14} className="animate-spin" />
                                Saving...
                            </span>
                        )}
                        <Button
                            variant="outline"
                            onClick={() => setShowPreview(!showPreview)}
                            className="gap-2"
                            size="sm"
                        >
                            <Eye size={16} />
                            {showPreview ? "Hide" : "Show"} Preview
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="gap-2 bg-primary hover:bg-primary/90"
                            size="sm"
                        >
                            <Save size={16} />
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>

            {/* Live Preview */}
            {showPreview && (
                <Card className="bg-[#0F141A] border-primary/20">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Eye size={20} />
                                Live Preview
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant={previewMode === "desktop" ? "default" : "outline"}
                                    onClick={() => setPreviewMode("desktop")}
                                >
                                    <Monitor size={14} className="mr-1" />
                                    Desktop
                                </Button>
                                <Button
                                    size="sm"
                                    variant={previewMode === "mobile" ? "default" : "outline"}
                                    onClick={() => setPreviewMode("mobile")}
                                >
                                    <Smartphone size={14} className="mr-1" />
                                    Mobile
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className={cn(
                            "bg-[#0B0F14] border border-white/10 rounded-xl overflow-hidden",
                            previewMode === "mobile" ? "max-w-md mx-auto" : ""
                        )}>
                            <div className="bg-[#0B0F14] p-4 border-b border-white/5">
                                <div className="flex items-center justify-between max-w-7xl mx-auto">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                            <span className="text-black font-bold text-sm">D</span>
                                        </div>
                                        <span className="text-white font-bold">Digihub</span>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-primary text-black text-sm font-medium">
                                        Services
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <ServicesMegaMenu onClose={() => { }} isPreview={true} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Main Content */}
            <Tabs defaultValue="categories" className="space-y-6">
                <TabsList className="bg-[#0F141A]">
                    <TabsTrigger value="categories">Categories & Services</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                {/* Categories Tab */}
                <TabsContent value="categories" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Card key={category.id} className="bg-[#0F141A] border-white/10">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full bg-${category.color}-400`} />
                                            <CardTitle className="text-sm">{category.name}</CardTitle>
                                        </div>
                                        <Badge className={category.visible ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                                            {category.visible ? "Visible" : "Hidden"}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => setExpandedCategory(
                                                    expandedCategory === category.id ? null : category.id
                                                )}
                                            >
                                                {expandedCategory === category.id ? (
                                                    <ChevronUp size={16} />
                                                ) : (
                                                    <ChevronDown size={16} />
                                                )}
                                            </Button>
                                            <span className="text-xs text-gray-400">
                                                {category.services.length} services
                                            </span>
                                        </div>
                                        <Switch
                                            checked={category.visible}
                                            onCheckedChange={() => toggleCategoryVisibility(category.id)}
                                            title="Show/hide category in menu"
                                        />
                                    </div>
                                </CardHeader>

                                {expandedCategory === category.id && (
                                    <CardContent className="space-y-3">
                                        {category.services.length === 0 ? (
                                            <div className="text-center py-8 px-4 border-2 border-dashed border-white/10 rounded-lg">
                                                <Package size={32} className="mx-auto text-gray-600 mb-2" />
                                                <p className="text-sm text-gray-400 mb-1">No services yet</p>
                                                <div className="mt-4 flex justify-center">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button size="sm" variant="outline" className="gap-2 border-dashed">
                                                                <Plus size={14} />
                                                                Add Service
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="center" className="w-56 max-h-64 overflow-y-auto bg-[#0F141A] border-white/10">
                                                            <DropdownMenuLabel>Available Services</DropdownMenuLabel>
                                                            <DropdownMenuSeparator className="bg-white/10" />
                                                            {loadingServices ? (
                                                                <div className="p-2 text-xs text-center text-gray-400">Loading...</div>
                                                            ) : availableServices.length === 0 ? (
                                                                <div className="p-2 text-xs text-center text-gray-400">No services found</div>
                                                            ) : (
                                                                availableServices.map((service) => (
                                                                    <DropdownMenuItem
                                                                        key={service.id}
                                                                        onClick={() => handleAddService(category.id, service)}
                                                                        className="cursor-pointer hover:bg-white/5 focus:bg-white/5"
                                                                    >
                                                                        {service.name}
                                                                    </DropdownMenuItem>
                                                                ))
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <Reorder.Group
                                                    axis="y"
                                                    values={category.services}
                                                    onReorder={(newOrder) => reorderServices(category.id, newOrder)}
                                                    className="space-y-2"
                                                >
                                                    {category.services.map((service) => (
                                                        <Reorder.Item
                                                            key={service.id}
                                                            value={service}
                                                            className={cn(
                                                                "bg-[#0B0F14] border rounded-lg p-3 cursor-move hover:border-primary/30 transition-all group",
                                                                service.visible ? "border-white/5" : "border-gray-500/20 opacity-60"
                                                            )}
                                                        >
                                                            <div className="flex items-start gap-2">
                                                                <GripVertical
                                                                    size={16}
                                                                    className="text-gray-500 group-hover:text-primary mt-1 flex-shrink-0 transition-colors"
                                                                    title="Drag to reorder"
                                                                />

                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <h4 className="font-semibold text-sm truncate">
                                                                            {service.name}
                                                                        </h4>
                                                                        {service.badge && (
                                                                            <Badge variant="secondary" className="text-[9px] px-1 py-0">
                                                                                {service.badge}
                                                                            </Badge>
                                                                        )}
                                                                    </div>
                                                                    <p className="text-xs text-gray-400 line-clamp-1 mb-2">
                                                                        {service.subtitle}
                                                                    </p>
                                                                    {showPricing && (
                                                                        <span className="text-[10px] text-gray-500">{service.price}</span>
                                                                    )}
                                                                </div>

                                                                <div className="flex flex-col gap-2">
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        onClick={() => toggleServiceVisibility(category.id, service.id)}
                                                                        className="h-6 w-6 p-0"
                                                                        title={service.visible ? "Hide from menu" : "Show in menu"}
                                                                    >
                                                                        {service.visible ? (
                                                                            <ToggleRight size={14} className="text-primary" />
                                                                        ) : (
                                                                            <ToggleLeft size={14} className="text-gray-500" />
                                                                        )}
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        onClick={() => toggleServiceFeatured(category.id, service.id)}
                                                                        className="h-6 w-6 p-0"
                                                                        title={service.featured ? "Remove featured" : "Mark as featured"}
                                                                    >
                                                                        <Star
                                                                            size={14}
                                                                            className={service.featured ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}
                                                                        />
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        onClick={() => cyclePriceType(category.id, service.id, service.priceType)}
                                                                        className="h-6 w-6 p-0"
                                                                        title={`Price Mode: ${service.priceType || 'fixed'}`}
                                                                    >
                                                                        <DollarSign
                                                                            size={14}
                                                                            className={
                                                                                service.priceType === 'hidden' ? "text-gray-600 line-through" :
                                                                                    service.priceType === 'quote' ? "text-blue-400" :
                                                                                        service.priceType === 'starting' ? "text-green-400" :
                                                                                            "text-white"
                                                                            }
                                                                        />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </Reorder.Item>
                                                    ))}
                                                </Reorder.Group>
                                                <div className="mt-3">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="outline" size="sm" className="w-full gap-2 border-dashed hover:border-primary hover:text-primary">
                                                                <Plus size={14} />
                                                                Add Service
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-56 max-h-64 overflow-y-auto bg-[#0F141A] border-white/10">
                                                            <DropdownMenuLabel>Available Services</DropdownMenuLabel>
                                                            <DropdownMenuSeparator className="bg-white/10" />
                                                            {loadingServices ? (
                                                                <div className="p-2 text-xs text-center text-gray-400">Loading...</div>
                                                            ) : availableServices.length === 0 ? (
                                                                <div className="p-2 text-xs text-center text-gray-400">No services found</div>
                                                            ) : (
                                                                availableServices.map((service) => (
                                                                    <DropdownMenuItem
                                                                        key={service.id}
                                                                        onClick={() => handleAddService(category.id, service)}
                                                                        className="cursor-pointer hover:bg-white/5 focus:bg-white/5"
                                                                    >
                                                                        {service.name}
                                                                    </DropdownMenuItem>
                                                                ))
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </>
                                        )}
                                    </CardContent>
                                )}
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings">
                    <Card className="bg-[#0F141A] border-white/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings size={20} />
                                Mega Menu Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-[#0B0F14] rounded-lg border border-white/5">
                                <div>
                                    <Label className="text-base font-semibold">Show Pricing in Menu</Label>
                                    <p className="text-xs text-gray-400 mt-1">Display starting prices next to services</p>
                                </div>
                                <Switch checked={showPricing} onCheckedChange={setShowPricing} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics">
                    <Card className="bg-[#0F141A] border-white/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 size={20} />
                                Analytics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-[#0B0F14] p-4 rounded-lg border border-white/5">
                                    <div className="text-2xl font-bold text-primary">
                                        {categories.reduce((acc, cat) => acc + cat.services.filter(s => s.visible).length, 0)}
                                    </div>
                                    <div className="text-sm text-gray-400">Visible Services</div>
                                </div>
                                <div className="bg-[#0B0F14] p-4 rounded-lg border border-white/5">
                                    <div className="text-2xl font-bold text-green-400">
                                        {categories.filter(c => c.visible).length}
                                    </div>
                                    <div className="text-sm text-gray-400">Active Categories</div>
                                </div>
                                <div className="bg-[#0B0F14] p-4 rounded-lg border border-white/5">
                                    <div className="text-2xl font-bold text-yellow-400">
                                        {categories.reduce((acc, cat) => acc + cat.services.filter(s => s.featured).length, 0)}
                                    </div>
                                    <div className="text-sm text-gray-400">Featured Services</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Validation Panel */}
            {validationIssues.length > 0 && (
                <Card className={cn(
                    "bg-yellow-500/10 border-yellow-500/20 transition-all",
                    !validationExpanded && "cursor-pointer hover:bg-yellow-500/15"
                )} onClick={() => !validationExpanded && setValidationExpanded(true)}>
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1">
                                <AlertCircle size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-yellow-400">
                                            Validation Warnings ({validationIssues.length})
                                        </h4>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setValidationExpanded(!validationExpanded);
                                            }}
                                        >
                                            {validationExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </Button>
                                    </div>
                                    {validationExpanded && (
                                        <ul className="text-sm text-yellow-200/80 space-y-2">
                                            {validationIssues.map((issue) => (
                                                <li key={issue.id} className="flex items-center gap-2">
                                                    <AlertCircle size={14} className="text-yellow-400" />
                                                    <span>{issue.message}</span>
                                                    <Button
                                                        size="sm"
                                                        variant="link"
                                                        className="h-auto p-0 text-primary hover:text-primary/80"
                                                        onClick={() => setExpandedCategory(issue.categoryId)}
                                                    >
                                                        →Fix
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
