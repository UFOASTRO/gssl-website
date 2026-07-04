import React from "react";
import Image from "next/image";

export default function NationalFootprint() {
  const logos = [
    { name: "Oyo", src: "/Partners-logos/oyo-state-logo-removebg-preview.png" },
    { name: "Kano", src: "/Partners-logos/kano-state-logo-removebg-preview.png" },
    { name: "Bauchi", src: "/Partners-logos/bauchi-state-logo-removebg-preview.png" },
    { name: "Lagos", src: "/Partners-logos/lagos-state.png" },
  ];

  return (
    <section className="w-full bg-[#0a192f] text-white py-16 sm:py-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <h2 className="font-display text-white text-3xl sm:text-4xl font-semibold leading-tight mb-16">
          Our National Footprint or Regional Impact
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          
          {/* Left Column: 2x2 Logo Grid */}
          <div className="relative w-full max-w-[500px] mx-auto lg:mx-0">
            {/* SVG Connecting Lines */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-0" 
              style={{ stroke: "rgba(59, 130, 246, 0.4)", strokeWidth: 2, filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))" }}
            >
              {/* Horizontal Top */}
              <line x1="25%" y1="25%" x2="75%" y2="25%" className="animate-pulse" />
              {/* Horizontal Bottom */}
              <line x1="25%" y1="75%" x2="75%" y2="75%" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
              {/* Vertical Left */}
              <line x1="25%" y1="25%" x2="25%" y2="75%" className="animate-pulse" style={{ animationDelay: '1s' }} />
              {/* Vertical Right */}
              <line x1="75%" y1="25%" x2="75%" y2="75%" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
            </svg>

            <div className="grid grid-cols-2 gap-8 relative z-10">
              {logos.map((logo, idx) => (
                <div 
                  key={idx} 
                  className="aspect-square bg-white rounded-2xl flex items-center justify-center p-6 lg:p-8 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                >
                  <div className={`relative w-full h-full ${logo.name === "Lagos" ? "scale-65" : ""}`}>
                    <Image 
                      src={logo.src} 
                      alt={`${logo.name} Logo`} 
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Text Box */}
          <div className="bg-blue-900/20 border border-blue-500/20 backdrop-blur-md rounded-[2rem] p-8 sm:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-display font-semibold text-white mb-6">
              Impacting lives across Nigeria.
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              With our headquarters in Lagos and regional offices spanning Abuja, Kano, and Oyo State, our reach is genuinely national. 
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              We have partnered with state governments, trained thousands of artisans, and impacted over <strong className="text-white font-bold">300,000+ lives</strong> through our grassroots empowerment programmes across 5+ states. Like the <a href="https://oyostatebusinessinsurance.com.ng/index.html" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-medium transition-colors duration-300">Isedotun</a> Initiative in Oyo State
            </p>

            <div className="grid grid-cols-2 gap-8 mt-auto pt-8 border-t border-white/10">
              <div>
                <div className="text-4xl font-display font-bold text-blue-400 mb-2">300k+</div>
                <div className="text-gray-400 font-medium">Lives Impacted</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-blue-400 mb-2">5+</div>
                <div className="text-gray-400 font-medium">States Activated</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
