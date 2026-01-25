import {
    Search, Megaphone, Share2, Bot, Code, LineChart,
    Zap, Target, Sparkles, PenTool, User, Users,
    Video, MousePointer2, Mail, MessageCircle, ShieldCheck,
    Layers, ShoppingCart, MapPin, Database, BarChart3,
    Rocket // Added Rocket as fallback
} from "lucide-react";

export const IconMap: Record<string, any> = {
    "sparkles": Sparkles,
    "target": Target,
    "search": Search,
    "bot": Bot,
    "pentool": PenTool,
    "share2": Share2,
    "user": User,
    "users": Users,
    "video": Video,
    "mousepointer2": MousePointer2,
    "zap": Zap,
    "database": Database,
    "mail": Mail,
    "messagecircle": MessageCircle,
    "shieldcheck": ShieldCheck,
    "layers": Layers,
    "shoppingcart": ShoppingCart,
    "mappin": MapPin,
    "barchart3": BarChart3,
    "megaphone": Megaphone,
    "code": Code,
    "linechart": LineChart,
    "default": Rocket // Fallback
};

export const getIcon = (slug: string) => {
    // Basic mapping based on slug keywords or direct slug match
    // ideally, we store the icon name in the db, but for now we map slug to icon
    if (slug.includes('ai')) return IconMap['sparkles'] || IconMap['bot'];
    if (slug.includes('seo')) return IconMap['search'];
    if (slug.includes('content')) return IconMap['pentool'];
    if (slug.includes('social')) return IconMap['share2'];
    if (slug.includes('personal')) return IconMap['user'];
    if (slug.includes('influencer')) return IconMap['users'];
    if (slug.includes('video')) return IconMap['video'];
    if (slug.includes('cro')) return IconMap['mousepointer2'];
    if (slug.includes('automation')) return IconMap['zap'];
    if (slug.includes('crm')) return IconMap['database'];
    if (slug.includes('email')) return IconMap['mail'];
    if (slug.includes('whatsapp')) return IconMap['messagecircle'];
    if (slug.includes('orm')) return IconMap['shieldcheck'];
    if (slug.includes('funnel')) return IconMap['layers'];
    if (slug.includes('ecommerce')) return IconMap['shoppingcart'];
    if (slug.includes('local')) return IconMap['mappin'];
    if (slug.includes('analytics')) return IconMap['barchart3'];
    if (slug.includes('performance')) return IconMap['target'];

    return IconMap['default'];
}
