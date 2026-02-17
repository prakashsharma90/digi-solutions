
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";

export async function AnalyticsScripts() {
    const supabase = await createClient();

    // Fetch all analytics keys from site_settings
    // We select specifically the keys we support to avoid loading unnecessary data
    const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", [
            "ga4_id",
            "gtm_id",
            "meta_pixel_id",
            "linkedin_insight_tag",
            "twitter_pixel_id",
            "pinterest_tag_id"
        ]);

    const settings: Record<string, string> = {};
    data?.forEach((row: any) => {
        settings[row.key] = row.value;
    });

    return (
        <>
            {/* --- Google Analytics 4 (GA4) --- */}
            {settings.ga4_id && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${settings.ga4_id}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', '${settings.ga4_id}');
                        `}
                    </Script>
                </>
            )}

            {/* --- Google Tag Manager (GTM) --- */}
            {settings.gtm_id && (
                <>
                    <Script id="google-tag-manager" strategy="afterInteractive">
                        {`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${settings.gtm_id}');
                        `}
                    </Script>
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${settings.gtm_id}`}
                            height="0"
                            width="0"
                            style={{ display: "none", visibility: "hidden" }}
                        />
                    </noscript>
                </>
            )}

            {/* --- Meta Pixel (Facebook) --- */}
            {settings.meta_pixel_id && (
                <>
                    <Script id="meta-pixel" strategy="afterInteractive">
                        {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '${settings.meta_pixel_id}');
                        fbq('track', 'PageView');
                        `}
                    </Script>
                    <noscript>
                        <img
                            height="1"
                            width="1"
                            style={{ display: "none" }}
                            src={`https://www.facebook.com/tr?id=${settings.meta_pixel_id}&ev=PageView&noscript=1`}
                        />
                    </noscript>
                </>
            )}

            {/* --- LinkedIn Insight Tag --- */}
            {settings.linkedin_insight_tag && (
                <>
                    <Script id="linkedin-insight" strategy="afterInteractive">
                        {`
                        _linkedin_partner_id = "${settings.linkedin_insight_tag}";
                        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
                        (function(l) {
                        if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                        window.lintrk.q=[]}
                        var s = document.getElementsByTagName("script")[0];
                        var b = document.createElement("script");
                        b.type = "text/javascript";b.async = true;
                        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                        s.parentNode.insertBefore(b, s);})(window.lintrk);
                        `}
                    </Script>
                    <noscript>
                        <img
                            height="1"
                            width="1"
                            style={{ display: "none" }}
                            alt=""
                            src={`https://px.ads.linkedin.com/collect/?pid=${settings.linkedin_insight_tag}&fmt=gif`}
                        />
                    </noscript>
                </>
            )}

            {/* --- Twitter / X Pixel --- */}
            {settings.twitter_pixel_id && (
                <Script id="twitter-pixel" strategy="afterInteractive">
                    {`
                    !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
                    },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
                    a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
                    twq('init','${settings.twitter_pixel_id}');
                    twq('track','PageView');
                    `}
                </Script>
            )}

            {/* --- Pinterest Tag --- */}
            {settings.pinterest_tag_id && (
                <>
                    <Script id="pinterest-tag" strategy="afterInteractive">
                        {`
                        !function(e){if(!window.pintrk){window.pintrk = function () {
                        window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
                          n=window.pintrk;n.queue=[],n.version="3.0";var
                          t=document.createElement("script");t.async=!0,t.src=e;var
                          r=document.getElementsByTagName("script")[0];
                          r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
                        pintrk('load', '${settings.pinterest_tag_id}');
                        pintrk('page');
                        `}
                    </Script>
                    <noscript>
                        <img
                            height="1"
                            width="1"
                            style={{ display: "none" }}
                            alt=""
                            src={`https://ct.pinterest.com/v3/?event=init&tid=${settings.pinterest_tag_id}&noscript=1`}
                        />
                    </noscript>
                </>
            )}
        </>
    );
}
