import React from "react";
import { MapPin } from "lucide-react";

export default function NationalFootprint() {
  const locations = [
    { name: "Lagos", type: "Head Office", top: "70%", left: "20%" },
    { name: "Abuja", type: "Regional Office", top: "50%", left: "45%" },
    { name: "Kano", type: "Regional Office", top: "20%", left: "55%" },
    { name: "Ibadan (Oyo)", type: "Consultant Office", top: "65%", left: "25%" },
    { name: "Bauchi", type: "Partnership", top: "35%", left: "70%" },
  ];

  return (
    <section className="w-full bg-[#0a192f] text-white py-24 sm:py-32 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8 w-fit">
              <MapPin className="w-4 h-4" />
              National Footprint
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-8">
              Impacting lives across Nigeria.
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              With our headquarters in Lagos and regional offices spanning Abuja, Kano, and Oyo State, our reach is genuinely national. 
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-12 max-w-lg">
              We have partnered with state governments, trained thousands of artisans, and impacted over <span className="text-white font-bold">300,000+ lives</span> through our grassroots empowerment programmes across 5+ states.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-display font-bold text-white mb-2">300k+</div>
                <div className="text-gray-400">Lives Impacted</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-white mb-2">5+</div>
                <div className="text-gray-400">States Activated</div>
              </div>
            </div>
          </div>

          {/* Interactive Node Map Placeholder - Using a stylish CSS grid representation */}
          <div className="relative w-full aspect-square max-w-[600px] mx-auto lg:ml-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-transparent border border-blue-500/20 rounded-3xl backdrop-blur-sm flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full opacity-80">
                {/* Connecting SVG Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))" }}>
                  <path d="M 20% 70% L 25% 65% L 45% 50% L 55% 20%" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" />
                  <path d="M 45% 50% L 70% 35%" fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" strokeDasharray="6 6" className="animate-pulse" style={{ animationDelay: '1s' }} />
                </svg>

                {/* Nodes */}
                {locations.map((loc, i) => (
                  <div 
                    key={i} 
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ top: loc.top, left: loc.left }}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-12 h-12 bg-blue-500/20 rounded-full animate-ping" />
                      <div className="w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,1)] z-10" />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white text-navy-900 px-4 py-2 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20">
                      <div className="font-bold text-sm">{loc.name}</div>
                      <div className="text-xs text-gray-500">{loc.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
