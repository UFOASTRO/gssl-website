import React from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

export default function ContactFooter() {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="w-full bg-[#f8f9fa] py-24 sm:py-32 rounded-[3rem] mt-[-2rem] relative z-20 shadow-sm border-t border-gray-100">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            <div className="flex flex-col">
              <h2 className="font-display text-navy-900 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-8">
                Ready to build what matters?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-lg">
                Whether you&apos;re looking to scale an enterprise, implement a state-wide initiative, or partner on digital verification—we have the expertise to execute.
              </p>

              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-navy-900 font-semibold mb-1">Headquarters (Lagos)</h4>
                    <p className="text-gray-600">3B, Tunde Gabby Street, behind County Hospital, Ogba Aguda / Ojodu, Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-navy-900 font-semibold mb-1">Abuja Office</h4>
                    <p className="text-gray-600">Suite 204, Central Business District, Abuja, FCT, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-navy-900 font-semibold mb-1">Port Harcourt Office</h4>
                    <p className="text-gray-600">14 Trans Amadi Industrial Layout, Port Harcourt, Rivers State, Nigeria</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-navy-900 font-semibold mb-1">Call Us</h4>
                    <p className="text-gray-600">+234 802 303 3816 <br/> +234 803 411 4760</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-navy-900 font-semibold mb-1">Email Us</h4>
                    <p className="text-gray-600">corporate@globalsightservices.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-gray-100 shadow-sm h-fit">
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-navy-900">First Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" placeholder="John" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-navy-900">Last Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" placeholder="Doe" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-navy-900">Email Address</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all" placeholder="john@company.com" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-navy-900">How can we help?</label>
                  <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none" placeholder="Tell us about your project or inquiry..."></textarea>
                </div>

                <button type="button" className="group mt-4 flex items-center justify-center bg-navy-900 text-white font-medium rounded-xl py-4 hover:bg-navy-800 transition-colors duration-300 w-full">
                  <span className="mr-2">Send Message</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Massive Typography Footer */}
      <footer className="w-full bg-navy-900 text-white pt-32 pb-8 overflow-hidden -mt-10 relative z-10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center">
          
          <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <h3 className="font-display text-2xl font-bold mb-6 tracking-wide">GSSL</h3>
              <p className="text-gray-400 max-w-sm">
                Empowering businesses by delivering tailored solutions that leverage technology and expertise.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="font-semibold mb-2">Company</h4>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              <a href="#programmes" className="text-gray-400 hover:text-white transition-colors">Our Programmes</a>
              <a href="#solutions" className="text-gray-400 hover:text-white transition-colors">Solutions</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-semibold mb-2">Legal</h4>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>

          {/* Huge Typography Name */}
          <div className="w-full flex justify-center items-center border-t border-white/10 pt-16 pb-8">
            <h1 className="font-display font-black text-[12vw] leading-none tracking-tighter text-white opacity-95 uppercase">
              Global Sight
            </h1>
          </div>
          
          <div className="w-full flex justify-between items-center text-sm text-gray-500 pt-8 border-t border-white/10">
            <p>&copy; {new Date().getFullYear()} Global Sight Services Limited. All rights reserved.</p>
            <p>Designed in Nigeria</p>
          </div>
        </div>
      </footer>
    </>
  );
}
