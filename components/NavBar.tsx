"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Company", href: "#company" },
  { name: "Our Solutions", href: "#solutions" },
  { name: "Resources", href: "#resources" },
  { name: "News and Insights", href: "#news" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Africa/Lagos",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out ${scrolled ? "pt-4 px-4 sm:px-6" : "pt-0 px-0"}`}>
        <nav
          className={`w-full max-w-[1320px] mx-auto transition-all duration-500 ease-in-out flex items-center justify-between ${
            scrolled
              ? "bg-white/95 backdrop-blur-md rounded-full py-2 px-3 sm:px-4 shadow-sm border border-gray-200"
              : "bg-transparent py-5 px-6 sm:px-8"
          }`}
        >
          {/* LEFT: Logo & Links */}
          <div className="flex items-center gap-8 pl-2 sm:pl-4">
            <a href="#" className={`relative flex-shrink-0 block transition-all duration-500 ${scrolled ? "h-8 w-24" : "h-10 w-28"}`} onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
              <Image 
                src="/GSSL logo.png" 
                alt="GSSL Logo" 
                fill 
                sizes="120px"
                className="object-contain object-left"
                priority
              />
            </a>
            <div className="hidden md:flex items-center gap-6 text-[15px] text-navy-900 font-medium">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Clock & CTA */}
          <div className="hidden md:flex items-center gap-6 pr-1">
            <div className="flex items-center gap-1.5 text-[14px] text-gray-500 font-medium">
              <span>{time ? `${time} WAT · Lagos` : ""}</span>
            </div>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className={`font-medium bg-navy-900 text-white rounded-full hover:bg-navy-800 transition-all duration-300 shadow-sm ${scrolled ? "px-5 py-2 text-[14px]" : "px-6 py-2.5 text-[15px]"}`}
            >
              Contact Us
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            className="md:hidden text-navy-900 p-2 rounded-full hover:bg-gray-100 transition-colors mr-1"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-500 md:hidden flex flex-col justify-end ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div 
          className={`bg-white rounded-t-3xl p-6 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            menuOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <div className="relative h-8 w-24">
              <Image 
                src="/GSSL logo.png" 
                alt="GSSL Logo" 
                fill 
                sizes="120px"
                className="object-contain object-left"
              />
            </div>
            <button 
              onClick={() => setMenuOpen(false)}
              className="bg-gray-50 text-navy-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col gap-6 mb-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="text-2xl text-navy-900 font-medium font-display tracking-tight"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="mt-4 text-center text-lg font-medium bg-navy-900 text-white px-8 py-3 rounded-full"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
