"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CoreFocus() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for Left Column & Header
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(".focus-header", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      )
      .fromTo(".focus-desc", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 
        "-=0.9"
      )
      .fromTo(".focus-card", 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out" }, 
        "-=0.8"
      )
      .fromTo(".focus-cta", 
        { y: 25, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
        "-=0.7"
      );

      // Back Image Animation
      gsap.fromTo(".focus-img-back-wrap",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".focus-img-back-wrap",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(".focus-img-back",
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".focus-img-back-wrap",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // Front Image Animation
      gsap.fromTo(".focus-img-front-wrap",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".focus-img-front-wrap",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(".focus-img-front",
        { scale: 1.2 },
        {
          scale: 1,
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".focus-img-front-wrap",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

  return (
    <section ref={sectionRef} id="core-focus" className="w-full bg-[#f8f9fa] py-24 sm:py-32">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="focus-header font-display text-navy-900 text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight mb-12">
          Core Focus Areas
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left Column: Write-up */}
          <div className="bg-gray-200/50 rounded-[2rem] p-8 sm:p-12 flex flex-col h-full justify-center">
            <p className="focus-desc text-gray-700 text-lg sm:text-xl leading-relaxed mb-10">
              From fieldwork to strategy, we help clients move from idea to impact. GSSL focuses on the pillars that drive the Nigerian economy forward.
            </p>
            <div className="flex flex-col gap-5">
              {focusAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="focus-card group flex flex-col sm:flex-row items-start gap-5 p-6 rounded-2xl border border-white/60 bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-white transition-all duration-300"
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
                className="focus-cta inline-flex items-center gap-3 text-navy-900 font-semibold hover:opacity-70 transition-opacity w-fit border-b border-navy-900 pb-1"
              >
                Partner with us
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Images */}
          <div className="relative w-full aspect-square lg:aspect-auto lg:h-full min-h-[500px] lg:min-h-[700px]">
            {/* Back Image */}
            <div className="focus-img-back-wrap absolute top-0 left-20 w-[80%] h-[90%] rounded-[2rem] overflow-hidden shadow-sm bg-gray-200">
              <img src="/natco-oyo-training-program.jpg" alt="Business Strategy" className="focus-img-back w-full h-full object-cover" />
            </div>
            {/* Front Image */}
            <div className="focus-img-front-wrap absolute -top-20 -right-20 w-[55%] h-[60%] rounded-[2rem] overflow-hidden shadow-2xl z-10 bg-gray-200">
              <img src="/Institutional-partnership.png" alt="Collaboration" className="focus-img-front w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
