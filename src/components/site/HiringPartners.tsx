import { motion } from "framer-motion";

const techCompanies = [
  { name: "TCS", url: "https://www.tcs.com", logo: "/assets/tcs.svg" },
  { name: "Infosys", url: "https://www.infosys.com", logo: "/assets/infosys.svg" },
  { name: "Zoho", url: "https://www.zoho.com", logo: "/assets/zoho.svg" },
  { name: "Razorpay", url: "https://razorpay.com", logo: "/assets/razorpay.svg" },
  { name: "Zerodha", url: "https://zerodha.com", logo: "/assets/zerodha.svg" },
  { name: "Flipkart", url: "https://www.flipkart.com", logo: "/assets/flipkart.svg" },
];

export function HiringPartners() {
  return (
    <div className="py-12 sm:py-16 relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-6">
          <span className="eyebrow text-indigo-600/70">Top tech hiring partners</span>
          <h3 className="mt-2 font-display text-2xl font-bold text-ink">
            Get prepared for premium teams
          </h3>
        </div>

        <div className="relative w-full overflow-hidden marquee-pause">
          {/* Left and Right Gradient Fades */}
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-[#F8EDEB] to-transparent" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-[#8EC5FC] to-transparent" />

          <div className="flex w-max animate-marquee-reverse gap-8 py-4">
            {[...techCompanies, ...techCompanies, ...techCompanies].map((company, index) => (
              <a
                key={`${company.name}-${index}`}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:shadow-md hover:border-indigo-400/50 transition-all duration-300 px-6 py-3 rounded-2xl bg-white/20 border border-white/30 shadow-sm backdrop-blur-sm cursor-pointer"
              >
                <img
                  src={company.logo}
                  alt={`${company.name} Logo`}
                  className="h-8 w-auto max-w-[120px] object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
