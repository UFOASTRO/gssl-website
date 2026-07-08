"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BarChart3, Globe2, Lightbulb } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ConsultingSolutions() {
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 95%",
					toggleActions: "play none none none",
				},
			});

			tl.fromTo(
				".solutions-header",
				{ y: 30, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
			)
				.fromTo(
					".solutions-desc",
					{ y: 20, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
					"-=0.6",
				)
				.fromTo(
					".solutions-card",
					{ y: 25, opacity: 0 },
					{ y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
					"-=0.5",
				);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const solutions = [
		{
			id: "business-transformation",
			title: "Business Transformation",
			icon: Lightbulb,
			description:
				"We find what's slowing your business down and restructure your operations to improve performance. We modernize your processes so you are ready to grow.",
			features: [
				"Operational Audits",
				"Process Optimization",
				"Digital Transitioning",
				"Change Management",
			],
		},
		{
			id: "market-access",
			title: "Market Access & Finance",
			icon: Globe2,
			description:
				"We help you secure funding and reach new markets. By connecting you with the right financial partners, we make it easier for your business to expand and increase revenue.",
			features: [
				"Funding Facilitation",
				"Strategic Partnerships",
				"Market Entry Strategy",
				"Insurance Facilitation",
			],
		},
		{
			id: "capacity-building",
			title: "Capacity Building",
			icon: BarChart3,
			description:
				"Empowering artisans, entrepreneurs, and public-sector workers with structured training and essential tools. We design and deliver comprehensive programs that translate ambition into measurable, on-the-ground outcomes.",
			features: [
				"Artisan Training",
				"Government Trade Initiatives",
				"Workforce Upskilling",
				"Ise Dotun Program",
			],
		},
	];

	return (
		<section
			ref={sectionRef}
			id="solutions"
			className="w-full bg-white py-24 sm:py-32"
		>
			<div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
					<div className="max-w-2xl">
						<h2 className="solutions-header font-display text-navy-900 text-4xl sm:text-5xl font-semibold leading-tight mb-6">
							Consulting &<br />
							Advisory Solutions
						</h2>
						<p className="solutions-desc text-gray-600 text-lg leading-relaxed">
							Project development, financial advisory, and tailored solutions
							that solve real challenges. We serve public institutions, private
							enterprises, and individuals seeking clarity, structure, and
							results.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{solutions.map((sol) => {
						const Icon = sol.icon;
						return (
							<div
								key={sol.id}
								className="solutions-card bg-[#f8f9fa] rounded-[2rem] p-8 sm:p-10 border border-gray-100 flex flex-col h-full transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
							>
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
										<li
											key={fIndex}
											className="flex items-center text-navy-900 font-medium"
										>
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
