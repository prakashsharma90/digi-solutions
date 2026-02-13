"use client";

import { Container } from "@/components/ui/container";

const brands = [
  "Freshworks",
  "Zerodha",
  "Razorpay",
  "Swiggy",
  "PhonePe",
  "CRED",
  "Meesho",
  "Lenskart",
  "UrbanCompany",
  "Groww",
];

export function TrustStrip() {
  return (
    <section className="relative z-20 border-y border-primary/20 bg-[#080b10]/80 backdrop-blur-md overflow-hidden">
      {/* Label */}
      <Container>
        <div className="flex items-center justify-center pt-6 pb-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
            Trusted by growing brands
          </span>
        </div>
      </Container>

      {/* Scrolling Logos */}
      <div className="relative py-5">
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-[#080b10] to-transparent z-10 pointer-events-none" />
        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-[#080b10] to-transparent z-10 pointer-events-none" />

        {/* Marquee track */}
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First set */}
          {brands.map((brand, i) => (
            <div
              key={`a-${i}`}
              className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center group"
            >
              <div className="flex items-center gap-2.5 opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                <BrandLogo name={brand} />
                <span className="text-sm md:text-base font-medium text-white-100 tracking-wide">
                  {brand}
                </span>
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {brands.map((brand, i) => (
            <div
              key={`b-${i}`}
              className="flex-shrink-0 mx-8 md:mx-12 flex items-center justify-center group"
            >
              <div className="flex items-center gap-2.5 opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                <BrandLogo name={brand} />
                <span className="text-sm md:text-base font-medium text-gray-400 tracking-wide">
                  {brand}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Simple monogram logo for each brand */
function BrandLogo({ name }: { name: string }) {
  const initials = name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
      <span className="text-[10px] font-bold text-gray-500 leading-none">
        {initials}
      </span>
    </div>
  );
}
