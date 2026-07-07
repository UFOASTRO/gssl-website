"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(".contact-header", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
      )
      .fromTo(".contact-desc", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 
        "-=0.9"
      )
      .fromTo(".contact-card", 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out" }, 
        "-=0.8"
      )
      .fromTo(".contact-btn", 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.2)" }, 
        "-=0.7"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(".footer-col", 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out" }
      )
      .fromTo(".footer-huge-text", 
        { y: 80, scale: 0.9, opacity: 0 }, 
        { y: 0, scale: 1, opacity: 0.95, duration: 1.5, ease: "power4.out" }, 
        "-=0.8"
      )
      .fromTo(".footer-bottom", 
        { opacity: 0 }, 
        { opacity: 1, duration: 1 }, 
        "-=1"
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Contact Section */}
      <section ref={sectionRef} id="contact" className="w-full bg-[#f8f9fa] py-24 sm:py-32 rounded-[3rem] mt-[-2rem] relative z-20 shadow-sm border-t border-gray-100">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="contact-header font-display text-navy-900 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              Ready to build what matters?
            </h2>
            <p className="contact-desc text-gray-600 text-lg leading-relaxed">
              Whether you&apos;re looking to scale an enterprise, implement a state-wide initiative, or partner on digital verification—we have the expertise to execute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {/* Card 1 */}
            <div className="contact-card bg-white p-8 sm:p-10 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="text-navy-900 text-2xl font-semibold mb-4">Headquarters</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                3B, Tunde Gabby Street, behind County Hospital, Ogba Aguda / Ojodu, Lagos, Nigeria
              </p>
            </div>

            {/* Card 2 */}
            <div className="contact-card bg-white p-8 sm:p-10 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="text-navy-900 text-2xl font-semibold mb-4">Regional Offices</h4>
              <p className="text-gray-600 text-lg leading-relaxed flex flex-col gap-2">
                <span><strong>Abuja:</strong> Suite 204, Central Business District</span>
                <span><strong>Kano:</strong> Suite 63/64, Yayo, Farm Centre Market</span>
                <span><strong>Oyo:</strong> Ministry of Trade Secretariat, Agodi</span>
              </p>
            </div>

            {/* Card 3 */}
            <div className="contact-card bg-white p-8 sm:p-10 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                <Phone className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="text-navy-900 text-2xl font-semibold mb-4">Contact Details</h4>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                +234 802 303 3816<br/>
                +234 803 411 4760
              </p>
              <a href="mailto:globalsightservices@gmail.com" className="text-blue-600 font-medium hover:text-blue-700 hover:underline flex items-center gap-2 text-lg">
                <Mail className="w-5 h-5" /> globalsightservices@gmail.com
              </a>
            </div>
          </div>

          {/* Call to Action Block */}
          <div className="flex justify-center items-center w-full">
            <Link 
              href="/contact"
              className="contact-btn group flex items-center justify-center gap-4 bg-navy-900 text-white font-medium rounded-full py-6 px-12 sm:px-16 text-xl sm:text-2xl hover:bg-navy-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Start Your Project
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </Link>
          </div>
          
        </div>
      </section>

      {/* Massive Typography Footer */}
      <footer ref={footerRef} className="w-full bg-navy-900 text-white pt-32 pb-8 overflow-hidden -mt-10 relative z-10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center">
          
          <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="footer-col md:col-span-2">
              <h3 className="font-display text-2xl font-bold mb-6 tracking-wide">GSSL</h3>
              <p className="text-gray-400 max-w-sm">
                Empowering businesses by delivering tailored solutions that leverage technology and expertise.
              </p>
            </div>
            
            <div className="footer-col flex flex-col gap-4">
              <h4 className="font-semibold mb-2">Company</h4>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              <a href="#programmes" className="text-gray-400 hover:text-white transition-colors">Our Programmes</a>
              <a href="#solutions" className="text-gray-400 hover:text-white transition-colors">Solutions</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>

            <div className="footer-col flex flex-col gap-4">
              <h4 className="font-semibold mb-2">Legal</h4>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>

          {/* Huge Typography Name */}
          <div className="w-full flex justify-center items-center border-t border-white/10 pt-16 pb-8">
            <h1 className="footer-huge-text font-display font-black text-[12vw] leading-none tracking-tighter text-white opacity-95 uppercase">
              Global Sight
            </h1>
          </div>
          
          <div className="footer-bottom w-full flex justify-between items-center text-sm text-gray-500 pt-8 border-t border-white/10">
            <p>&copy; {new Date().getFullYear()} Global Sight Services Limited. All rights reserved.</p>
            <p>Designed in Nigeria</p>
          </div>
        </div>
      </footer>
    </>
  );
}
