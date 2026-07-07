"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FlagshipProgrammes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single timeline for the entire section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(".flagship-header", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" }
      )
      .fromTo(".flagship-desc", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 
        "-=0.6"
      );

      // Cards Stagger Animation
      tl.fromTo(".flagship-card", 
        { y: 40, opacity: 0, scale: 0.97 }, 
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          stagger: 0.1, 
          duration: 0.6, 
          ease: "power3.out"
        },
        "-=0.5"
      );

      // Image wrapper clip-path reveal
      tl.fromTo(".flagship-img-wrap", 
        { clipPath: "inset(100% 0 0 0)" }, 
        { 
          clipPath: "inset(0% 0 0 0)", 
          duration: 0.8, 
          stagger: 0.1,
          ease: "power4.inOut"
        },
        "-=0.7"
      );

      // Zooms image inside wrapper
      tl.fromTo(".flagship-img", 
        { scale: 1.15 }, 
        { 
          scale: 1, 
          duration: 1.0, 
          stagger: 0.1,
          ease: "power3.out"
        },
        "-=0.8"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const programs = [
    {
      id: "natco",
      title: "NATCO: Empowering Nigeria's Informal Sector",
      shortTitle: "NATCO Conference",
      description: "NATCO is our annual conference for Nigeria's informal sector. We partner with government and corporate sponsors to provide masterclasses in modern skills like solar installation and CNG conversion, giving thousands of artisans the certifications and tools they need to grow.",
      metric: "4+ States Covered",
      image: "/natco-logo.png",
      ctaText: "Explore the Conference",
      url: "#contact"
    },
    {
      id: "oyo-data-portal",
      title: "Oyo State Commerce & Trade Portal",
      shortTitle: "Data Collection Portal",
      description: "Informal markets often lack the data needed for effective planning. We built a digital platform for the Oyo State Government to collect comprehensive trade data. This helps the government allocate resources, plan initiatives, and support local commerce.",
      metric: "300,000+ Profiles",
      image: "/Partners-logos/oyo-state-logo-removebg-preview.png",
      ctaText: "View Portal Overview",
      url: "https://oyostatecommerce.org.ng"
    },
    {
      id: "ise-dotun",
      title: "Ise D'otun: Business Growth & Risk Mitigation",
      shortTitle: "Ise D'otun Initiative",
      description: "Small businesses face big risks without insurance. In partnership with the Oyo State Government, the Ise D'otun Initiative provides training and the Oyo State Business Insurance, ensuring local merchants can grow safely and are protected from disasters.",
      metric: "Risk & Growth Covered",
      image: "/IseDotun.png",
      ctaText: "Read Case Study",
      url: "https://oyostatebusinessinsurance.com.ng/index.html"
    },
    {
      id: "nnpc-partnership",
      title: "NNPC Artisan Training Program",
      shortTitle: "NNPC Partnership",
      description: "Local artisans need professional skills to work in Nigeria's energy sector. We run specialized training academies for the NNPC, giving graduates the skills, tools, and equipment they need to start their own businesses immediately.",
      metric: "Equipment Handovers",
      image: "/NNPC.png",
      ctaText: "Learn More",
      url: "#contact"
    }
  ];

  return (
    <section ref={sectionRef} id="initiatives" className="w-full bg-[#f8f9fa] py-24 sm:py-32 border-t border-b border-gray-100">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="flagship-header font-display text-navy-900 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
            Initiatives &<br />Empowerment Programmes
          </h2>
          <p className="flagship-desc text-gray-600 text-lg sm:text-xl leading-relaxed">
            For over a decade, Global Sight Services Limited (GSSL) has operated at the intersection of public policy and private enterprise to deliver socioeconomic progress. Through strategic government partnerships and corporate alliances, we design and execute structured initiatives that verify trust, facilitate finance, and have directly transformed over 300,000+ lives.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="flagship-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programs.map((prog) => {
            return (
              <div 
                key={prog.id}
                className="flagship-card group bg-white rounded-[2rem] p-8 sm:p-10 border border-gray-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1"
              >
                <div>
                  {/* Centered Image Wrapper */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden mb-8 flagship-img-wrap bg-gray-50/80 p-8 sm:p-10 ">
                    <div className="relative w-full h-full">
                      <Image 
                        src={prog.image} 
                        alt={prog.shortTitle} 
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="flagship-img object-contain group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    {/* Metric Badge Overlay */}
                    <span className="absolute top-4 right-4 text-[12px] font-bold tracking-wider text-navy-900 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/40 shadow-sm uppercase pointer-events-none">
                      {prog.metric}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-semibold text-navy-900 mb-4 leading-snug">
                    {prog.title}
                  </h3>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-10">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 flex items-center">
                  <a 
                    href={prog.url}
                    target={prog.url.startsWith("http") ? "_blank" : "_self"}
                    rel={prog.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group/btn inline-flex items-center text-navy-900 font-semibold hover:text-blue-600 transition-colors gap-3 pb-1 border-b border-navy-900 hover:border-blue-600"
                  >
                    {prog.ctaText}
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
