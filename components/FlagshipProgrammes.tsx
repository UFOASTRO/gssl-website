"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FlagshipProgrammes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      headerTl.fromTo(".flagship-header", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      )
      .fromTo(".flagship-desc", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 
        "-=0.9"
      );

      // Cards Stagger Animation
      gsap.fromTo(".flagship-card", 
        { y: 60, opacity: 0, scale: 0.95 }, 
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          stagger: 0.15, 
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".flagship-grid",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Image wrapper clip-path reveal
      gsap.fromTo(".flagship-img-wrap", 
        { clipPath: "inset(100% 0 0 0)" }, 
        { 
          clipPath: "inset(0% 0 0 0)", 
          duration: 1.5, 
          stagger: 0.15,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: ".flagship-grid",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      // Zooms image inside wrapper
      gsap.fromTo(".flagship-img", 
        { scale: 1.2 }, 
        { 
          scale: 1, 
          duration: 1.8, 
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".flagship-grid",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const programs = [
    {
      id: "natco",
      title: "NATCO: Empowering Nigeria's Informal Sector",
      shortTitle: "NATCO Conference",
      description: "The Nigerian Artisans and Technicians Conference & Exhibition (NATCO) is GSSL's annual landmark event addressing the skill and recognition gap in Nigeria’s informal economy. Partnering with federal ministries, state governments, and corporate sponsors, we deliver masterclasses in modern vocational tracks—including CNG vehicle conversion, solar installation, and digital diagnostic tools—equipping thousands of artisans across Lagos, Kano, Bauchi, and Oyo with industry-recognized certifications and essential business tools to thrive in a globalized market.",
      metric: "4+ States Covered",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
      ctaText: "Explore the Conference",
      url: "#contact"
    },
    {
      id: "oyo-data-portal",
      title: "Oyo State Commerce & Trade Portal",
      shortTitle: "Data Collection Portal",
      description: "Traditional markets and informal trade sectors in Nigeria have historically suffered from a lack of structured data, hindering effective policy and financial planning. Partnering with the Oyo State Ministry of Trade, Industry, Investment, and Cooperatives, GSSL built and deployed a proprietary digital platform to collect and collate comprehensive trade data. This portal serves as the strategic data backbone that enables the state government to design targeted developmental initiatives, allocate resources, and formalize local commerce.",
      metric: "300,000+ Profiles",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      ctaText: "View Portal Overview",
      url: "https://oyostatecommerce.org.ng"
    },
    {
      id: "ise-dotun",
      title: "Ise D'otun: Business Growth & Risk Mitigation",
      shortTitle: "Ise D'otun Initiative",
      description: "Small-scale industrialists, traders, and artisans face constant operational risks without access to formal safety nets, threatening their business survival. Operated in direct collaboration with the Oyo State Government, the Ise D'otun Initiative is a targeted business development programme designed to foster economic resilience. The programme utilizes the Oyo State Business Insurance (Fire & Special Perils) product as its practical delivery vehicle, ensuring grassroots merchants are both trained to scale and fully protected against unforeseen disasters.",
      metric: "Risk & Growth Covered",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
      ctaText: "Read Case Study",
      url: "https://oyostatebusinessinsurance.com.ng/index.html"
    },
    {
      id: "nnpc-partnership",
      title: "NNPC Artisan Training Program",
      shortTitle: "NNPC Partnership",
      description: "Bridging the gap between raw vocational ambition and industrial-grade standards is essential for local content development in Nigeria's energy sector. Serving as the trusted on-the-ground execution partner for the Nigerian National Petroleum Corporation (NNPC), GSSL implements specialized, high-impact training academies for local artisans. The program culminates in the handover of professional-grade tools and equipment to graduates, ensuring they can immediately establish self-sustaining enterprises.",
      metric: "Equipment Handovers",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop",
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
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden mb-8 flagship-img-wrap bg-gray-100">
                    <img 
                      src={prog.image} 
                      alt={prog.shortTitle} 
                      className="flagship-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
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
