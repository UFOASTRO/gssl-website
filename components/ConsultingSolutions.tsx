import React from "react";
import { ArrowRight, BarChart3, Globe2, Lightbulb } from "lucide-react";

export default function ConsultingSolutions() {
  const solutions = [
    {
      id: "business-transformation",
      title: "Business Transformation",
      icon: Lightbulb,
      description: "We help organizations identify operational gaps and implement strategic restructuring to improve efficiency, agility, and overall performance. Our solutions are designed to modernize traditional processes and prepare businesses for scale.",
      features: ["Operational Audits", "Process Optimization", "Digital Transitioning", "Change Management"]
    },
    {
      id: "market-access",
      title: "Market Access & Finance",
      icon: Globe2,
      description: "Navigating the complexities of securing funding and reaching new markets. We facilitate access to finance and strategic partnerships, enabling MSMEs and large enterprises alike to expand their reach and unlock new revenue streams.",
      features: ["Funding Facilitation", "Strategic Partnerships", "Market Entry Strategy", "Insurance Facilitation"]
    },
    {
      id: "capacity-building",
      title: "Capacity Building",
      icon: BarChart3,
      description: "Empowering artisans, entrepreneurs, and public-sector workers with structured training and essential tools. We design and deliver comprehensive programs that translate ambition into measurable, on-the-ground outcomes.",
      features: ["Artisan Training", "Government Trade Initiatives", "Workforce Upskilling", "Ise Dotun Program"]
    }
  ];

  return (
    <section id="solutions" className="w-full bg-white py-24 sm:py-32">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-navy-900 text-4xl sm:text-5xl font-semibold leading-tight mb-6">
              Consulting &<br />Advisory Solutions
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Project development, financial advisory, and tailored solutions that solve real challenges. We serve public institutions, private enterprises, and individuals seeking clarity, structure, and results.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol) => {
            const Icon = sol.icon;
            return (
              <div key={sol.id} className="bg-[#f8f9fa] rounded-[2rem] p-8 sm:p-10 border border-gray-100 flex flex-col h-full transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-200 flex items-center justify-center mb-8">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-2xl font-display font-semibold text-navy-900 mb-4">
                  {sol.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-grow">
                  {sol.description}
                </p>
                
                <ul className="flex flex-col gap-3 mt-auto">
                  {sol.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-navy-900 font-medium">
                      <ArrowRight className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
