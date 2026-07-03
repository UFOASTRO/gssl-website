import React from "react";
import Image from "next/image";
import { Globe } from "lucide-react";

export default function ExecutiveLeadership() {
  const leaders = [
    {
      name: "Mr. Oladayo Ganiu Bello",
      title: "Managing Director / CEO",
      bio: "A seasoned business developer and certified marketer with over 25 years of experience in advertising, marketing, logistics and business development. He founded Innovative Multi Concepts in 2003.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop", // Placeholder image representing professionalism
    },
    {
      name: "Leadership Team",
      title: "Board of Directors",
      bio: "Our executive board comprises industry veterans spanning finance, technology, and public policy, guiding GSSL's strategic vision across Nigeria.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop", // Placeholder image
    }
  ];

  return (
    <section className="w-full bg-[#f8f9fa] py-24 sm:py-32">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <h2 className="font-display text-navy-900 text-4xl sm:text-5xl font-semibold leading-tight mb-6">
            Executive Leadership
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Premium consulting requires trust. Our leadership team brings decades of experience in bridging the gap between public sector initiatives and private enterprise execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
          {leaders.map((leader, index) => (
            <div key={index} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-xl">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover object-top grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="p-8 sm:p-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-display font-semibold text-navy-900 mb-1">{leader.name}</h3>
                    <p className="text-blue-600 font-medium">{leader.title}</p>
                  </div>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
