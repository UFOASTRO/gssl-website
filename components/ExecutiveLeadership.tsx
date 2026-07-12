"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Globe } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ExecutiveLeadership() {
	const sectionRef = useRef<HTMLElement>(null);
	const [activeTab, setActiveTab] = useState<"bio" | "credentials" | "vision">(
		"bio",
	);

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
				".leader-badge",
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
			)
				.fromTo(
					".leader-header",
					{ y: 30, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.6, ease: "power4.out" },
					"-=0.4",
				)
				.fromTo(
					".leader-desc",
					{ y: 20, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
					"-=0.4",
				)
				.fromTo(
					".leader-quote",
					{ y: 20, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
					"-=0.4",
				)
				.fromTo(
					".leader-stat-item",
					{ y: 15, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						stagger: 0.05,
						duration: 0.5,
						ease: "power3.out",
					},
					"-=0.4",
				);

			// Animate the CEO profile card in parallel so it doesn't wait for the left column
			tl.fromTo(
				".leader-card",
				{ y: 30, opacity: 0, scale: 0.98 },
				{ y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
				"0.15",
			);

			// Zooms image inside wrapper
			gsap.fromTo(
				".leader-img",
				{ scale: 1.1 },
				{
					scale: 1,
					duration: 1.2,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 95%",
						toggleActions: "play none none none",
					},
				},
			);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const ceo = {
		name: "Mr. Oladayo Ganiu Bello",
		title: "Managing Director / CEO",
		image: "/MrBello.jpg",
		bio: "A seasoned business developer and certified marketer with over 25 years of experience in advertising, marketing, logistics, and business development. He founded Innovative Multi Concepts in 2003 and has since steered GSSL's growth as a key institutional partner.",
		credentials: [
			"Over 25 years of leadership experience in advertising, logistics and business consultancy.",
			"Founded Innovative Multi Concepts in 2003, establishing long-term market presence.",
			"Organized and directed NATCO, the major conference bringing thousands of artisans and technicians together.",
			"Steered GSSL as Managing Director to impact over 300,000+ lives across multiple Nigerian states.",
			"Key implementation partner for the NNPC artisan training and Oyo State's trade-data collation initiatives.",
		],
		vision:
			"At GSSL, our focus is on building practical, technology-driven solutions that solve real challenges. By bridging operational gaps, creating trust with digital tools, and delivering capacity building, we align public-sector policies with grassroots execution to unlock lasting economic opportunity across Africa.",
	};

	const tabs = [
		{ id: "bio", label: "Biography" },
		{ id: "credentials", label: "Credentials" },
		{ id: "vision", label: "Vision" },
	] as const;

	return (
		<section
			ref={sectionRef}
			className="w-full bg-[#f8f9fa] py-24 sm:py-32 overflow-hidden border-t border-b border-gray-100/50"
		>
			<div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
					{/* Left Column - Content & Stats */}
					<div className="lg:col-span-5 flex flex-col justify-center">
						<h2 className="leader-header font-display text-navy-900 text-4xl sm:text-5xl font-semibold leading-tight mb-6">
							Executive Leadership
						</h2>

						<p className="leader-desc text-gray-600 text-lg leading-relaxed mb-8">
							GSSL's strategic direction is steered by industry insight,
							grassroots experience, and a commitment to executing high-impact
							solutions. Our Managing Director guides GSSL in bridging the gap
							between public sector goals and private enterprise execution.
						</p>

						{/* CEO Quote Card */}
						<div className="leader-quote border-l-4 border-blue-600 pl-6 py-2 mb-10 italic text-navy-900/90 text-lg font-medium bg-blue-50/20 rounded-r-2xl pr-4">
							"True leadership lies in bridging the gap between grassroots
							potential and structured execution. At GSSL, we don't just
							consult; we build the platforms that make trust verifiable."
						</div>

						{/* Stat Badges */}
						<div className="grid grid-cols-3 gap-4 sm:gap-6 border-t border-gray-200/60 pt-8">
							<div className="leader-stat-item">
								<div className="flex items-center text-blue-600 mb-1">
									{/* <Award className="w-5 h-5 mr-1.5" /> */}
									<span className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
										25+
									</span>
								</div>
								<p className="text-gray-500 text-xs sm:text-sm font-medium leading-snug">
									Years Experience
								</p>
							</div>

							<div className="leader-stat-item">
								<div className="flex items-center text-blue-600 mb-1">
									{/* <ShieldCheck className="w-5 h-5 mr-1.5" /> */}
									<span className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
										300K+
									</span>
								</div>
								<p className="text-gray-500 text-xs sm:text-sm font-medium leading-snug">
									Lives Impacted
								</p>
							</div>

							<div className="leader-stat-item">
								<div className="flex items-center text-blue-600 mb-1">
									{/* <TrendingUp className="w-5 h-5 mr-1.5" /> */}
									<span className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
										10+
									</span>
								</div>
								<p className="text-gray-500 text-xs sm:text-sm font-medium leading-snug">
									Years Founding
								</p>
							</div>
						</div>
					</div>

					{/* Right Column - Premium Profile Card */}
					<div className="lg:col-span-7 w-full flex justify-center lg:justify-end">
						<div className="leader-card group bg-white border border-gray-100 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_12px_45px_rgba(0,0,0,0.02)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)] hover:border-gray-200/50 transition-all duration-500 w-full max-w-2xl">
							<div className="flex flex-col sm:flex-row gap-8 sm:gap-10">
								{/* Profile Photo */}
								<div className="sm:w-2/5 flex-shrink-0">
									<div className="relative w-full aspect-[4/5] rounded-[1.8rem] overflow-hidden bg-gray-50 border border-gray-100/50 shadow-inner">
										<Image
											src={ceo.image}
											alt={ceo.name}
											fill
											priority
											className="leader-img object-cover object-top transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03]"
										/>
									</div>
								</div>

								{/* Profile Details */}
								<div className="sm:w-3/5 flex flex-col pt-2 sm:pt-4">
									<span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit mb-3">
										MD / CEO
									</span>

									<h3 className="text-2xl font-display font-semibold text-navy-900 mb-1">
										{ceo.name}
									</h3>

									<p className="text-sm font-medium text-gray-500 mb-6">
										{ceo.title}
									</p>

									{/* Tabs Navigator */}
									<div className="flex border-b border-gray-100 mb-6 gap-2">
										{tabs.map((tab) => (
											<button
												key={tab.id}
												onClick={() => setActiveTab(tab.id)}
												className={`py-3 px-1 text-sm sm:text-base font-medium transition-all duration-300 relative ${
													activeTab === tab.id
														? "text-navy-900 border-b-2 border-blue-600 font-semibold"
														: "text-gray-400 hover:text-gray-600 border-b border-transparent"
												}`}
											>
												{tab.label}
											</button>
										))}
									</div>

									{/* Tabs Window */}
									<div className="min-h-[200px] flex flex-col justify-start">
										{activeTab === "bio" && (
											<p className="text-gray-600 text-sm sm:text-base leading-relaxed animate-fade-in">
												{ceo.bio}
											</p>
										)}

										{activeTab === "credentials" && (
											<ul className="flex flex-col gap-3 animate-fade-in">
												{ceo.credentials.map((cred, idx) => (
													<li
														key={idx}
														className="flex items-start text-gray-600 text-sm sm:text-base"
													>
														<CheckCircle2 className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
														<span>{cred}</span>
													</li>
												))}
											</ul>
										)}

										{activeTab === "vision" && (
											<p className="text-gray-600 text-sm sm:text-base leading-relaxed italic border-l-2 border-blue-500 pl-4 py-1 animate-fade-in">
												{ceo.vision}
											</p>
										)}
									</div>

									{/* Social Action Footer */}
									<div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
										<span className="text-xs text-gray-400 font-medium">
											Global Sight Services Limited
										</span>
										<a
											href="#"
											onClick={(e) => e.preventDefault()}
											className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors shadow-sm"
											aria-label="CEO Website Link"
										>
											<Globe className="w-4 h-4" />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Simple style inject to handle tab fade in */}
			<style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
		</section>
	);
}
