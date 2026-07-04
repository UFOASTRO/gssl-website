import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function CoreFocus() {
  const focusAreas = [
    {
      title: "MSME Development",
      description: "We build capacity and provide resources that transform micro, small, and medium enterprises into thriving, scalable businesses.",
      number: "01",
    },
    {
      title: "Digital Solution Development",
      description: "Our proprietary technology platforms verify identities, facilitate insurance, and collate trade data to bridge the gap between ambition and infrastructure.",
      number: "02",
    },
    {
      title: "Institutional Partnerships",
      description: "We work hand-in-hand with state governments and corporate giants to deliver grassroots empowerment initiatives with measurable impact.",
      number: "03",
    }
  ];
//check am using a diff image
  return (
    <section id="core-focus" className="w-full bg-[#f8f9fa] py-24 sm:py-32">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="font-display text-navy-900 text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight mb-12">
          Core Focus Areas
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left Column: Write-up */}
          <div className="bg-gray-200/50 rounded-[2rem] p-8 sm:p-12 flex flex-col h-full justify-center">
            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-10">
              From fieldwork to strategy, we help clients move from idea to impact. GSSL focuses on the pillars that drive the Nigerian economy forward.
            </p>
            <div className="flex flex-col gap-5">
              {focusAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col sm:flex-row items-start gap-5 p-6 rounded-2xl border border-white/60 bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-white transition-all duration-300"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 font-display font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {area.number}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-display font-semibold text-navy-900 mb-2">
                      {area.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[15px]">
                      {area.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 text-navy-900 font-semibold hover:opacity-70 transition-opacity w-fit border-b border-navy-900 pb-1"
              >
                Partner with us
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Images */}
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-full min-h-[500px] lg:min-h-[700px]">
            {/* Back Image */}
            <div className="absolute top-0 left-20 w-[80%] h-[90%] rounded-[2rem] overflow-hidden shadow-sm bg-gray-200">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop" alt="Business Strategy" className="w-full h-full object-cover" />
            </div>
            {/* Front Image */}
            <div className="absolute -top-20 -right-20 w-[55%] h-[60%] rounded-[2rem] overflow-hidden shadow-2xl z-10 bg-gray-200">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop" alt="Collaboration" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
