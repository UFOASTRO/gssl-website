import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function DigitalEcosystem() {
  const platforms = [
    {
      id: "naija-quick-fix",
      name: "Artisans' Portal",
      description: "Connecting verified Nigerian artisans.",
      tag: "BESTSELLER",
      url: "https://naijaquickfix.com.ng",
      icon: "🛠️",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      id: "gpa-insurance",
      name: "GPA Insurance",
      description: "Financial protection against accidental injuries.",
      tag: "POPULAR",
      url: "https://gpa-insurance.com",
      icon: "🛡️",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: "nigeria-drivers",
      name: "Drivers' Verification",
      description: "Register and verify drivers.",
      tag: "SECURITY",
      url: "https://www.nigeriandrivers.com/index.html",
      icon: "🚘",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      id: "oyo-state-commerce",
      name: "Oyo State Commerce",
      description: "Commerce data collation.",
      tag: "DATA",
      url: "https://oyostatecommerce.org.ng",
      icon: "📊",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      id: "hotel-lodgers",
      name: "Hotel Lodgers",
      description: "Enhancing hotel stays.",
      tag: "NEW",
      url: "https://nigerianhotellodgers.com",
      icon: "🏨",
      span: "md:col-span-1 md:row-span-1",
    }
  ];

  return (
    <section id="programmes" className="w-full bg-[#111111] py-24 sm:py-32">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-white text-4xl sm:text-5xl font-semibold leading-tight mb-6">
              Digital Ecosystem & <br/>Proprietary Platforms
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We have built a robust suite of technology platforms that act as the infrastructure for our verification, insurance facilitation, and trade data collation services.
            </p>
          </div>
          <a 
            href="#contact" 
            className="group flex items-center bg-white/10 text-white text-[15px] font-medium rounded-full pl-6 pr-2 py-2 hover:bg-white/20 transition-colors duration-300 border border-white/20"
          >
            <span className="mr-4">View all platforms</span>
            <div className="bg-white text-black rounded-full p-2 group-hover:bg-gray-200 transition-colors duration-300 shadow-sm border border-gray-100">
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
            </div>
          </a>
        </div>

        {/* Flat Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-[auto] md:grid-rows-2 gap-4 h-auto md:h-[600px] min-h-[500px]">
          {platforms.map((platform) => (
            <a 
              key={platform.id} 
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative overflow-hidden rounded-[24px] bg-white border-none flex flex-col justify-between p-6 sm:p-8 ${platform.span}`}
            >
              <div className="flex justify-between items-start w-full">
                <div className="w-12 h-12 rounded-xl bg-[#F4F4F5] flex items-center justify-center text-2xl shadow-sm">
                  {platform.icon}
                </div>
                {platform.tag && (
                  <span className="text-[10px] font-bold px-4 py-1.5 bg-[#F4F4F5] text-[#111111] rounded-full uppercase tracking-wider">
                    {platform.tag}
                  </span>
                )}
              </div>
              <div className="w-full mt-12 md:mt-0">
                <h3 className="text-2xl font-bold text-[#111111] mb-2">
                  {platform.name}
                </h3>
                <p className="text-[#8E8E93] text-sm">
                  {platform.description}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
