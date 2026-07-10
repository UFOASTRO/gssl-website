"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import natcoImg from "@/public/natco-oyo-training-program.JPG";
import instImg from "@/public/Institutional-partnership.png";

gsap.registerPlugin(ScrollTrigger);

export default function CoreFocus() {
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Single timeline for the entire section
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 95%",
					toggleActions: "play none none none",
				},
			});

			tl.fromTo(
				".focus-header",
				{ y: 30, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
			)
				.fromTo(
					".focus-desc",
					{ y: 20, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
					"-=0.6",
				)
				.fromTo(
					".focus-card",
					{ y: 25, opacity: 0 },
					{ y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
					"-=0.5",
				)
				.fromTo(
					".focus-cta",
					{ y: 15, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
					"-=0.4",
				);

			// Back Image Animation
			tl.fromTo(
				".focus-img-back-wrap",
				{ y: 40, opacity: 0, scale: 0.97 },
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 0.9,
					ease: "power4.out",
				},
				"-=0.9",
			).fromTo(
				".focus-img-back",
				{ scale: 1.1 },
				{
					scale: 1,
					duration: 1.1,
					ease: "power4.out",
				},
				"-=0.9",
			);

			// Front Image Animation
			tl.fromTo(
				".focus-img-front-wrap",
				{ y: 50, opacity: 0, scale: 0.95 },
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 0.9,
					ease: "power4.out",
				},
				"-=1.0",
			).fromTo(
				".focus-img-front",
				{ scale: 1.15 },
				{
					scale: 1,
					duration: 1.1,
					ease: "power4.out",
				},
				"-=1.0",
			);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const focusAreas = [
		{
			title: "MSME Development",
			description: "We help MSMEs grow, build capacity, and reach new markets.",
			number: "01",
		},
		{
			title: "Digital Solution Development",
			description:
				"We build tech platforms to help businesses manage data, identities, and insurance easily.",
			number: "02",
		},
		{
			title: "Institutional Partnerships",
			description:
				"We work directly with state governments and corporate partners to deliver training and funding to local communities.",
			number: "03",
		},
	];

	return (
		<section
			ref={sectionRef}
			id="core-focus"
			className="w-full bg-[#f8f9fa] py-24 sm:py-32 relative overflow-hidden"
		>
			<div
				id="company"
				className="absolute top-0 left-0 w-0 h-0 pointer-events-none"
			/>
			<div
				id="about"
				className="absolute top-0 left-0 w-0 h-0 pointer-events-none"
			/>
			<div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
				<h2 className="focus-header font-display text-navy-900 text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight mb-12">
					Core Focus Areas
				</h2>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
					{/* Left Column: Write-up */}
					<div className="bg-gray-200/50 rounded-[2rem] p-8 sm:p-12 flex flex-col h-full justify-center">
						<p className="focus-desc text-gray-700 text-lg sm:text-xl leading-relaxed mb-10">
							We help clients turn plans into reality. GSSL supports the sectors
							that matter most to the Nigerian economy.
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
					<div className="relative w-full aspect-square lg:aspect-auto lg:h-full min-h-[350px] sm:min-h-[500px] lg:min-h-[700px]">
						{/* Back Image */}
						<div className="focus-img-back-wrap absolute top-0 left-4 sm:left-10 lg:left-20 w-[85%] lg:w-[80%] h-[90%] rounded-[2rem] overflow-hidden shadow-sm bg-gray-200">
							<Image
								src={natcoImg}
								alt="Business Strategy"
								fill
								sizes="(max-width: 1024px) 80vw, 40vw"
								className="focus-img-back w-full h-full object-cover"
							/>
						</div>
						{/* Front Image */}
						<div className="focus-img-front-wrap absolute -top-8 lg:-top-20 right-0 lg:-right-20 w-[70%] lg:w-[55%] h-[60%] rounded-[2rem] overflow-hidden shadow-2xl z-10 bg-gray-200">
							<Image
								src={instImg}
								alt="Collaboration"
								fill
								sizes="(max-width: 1024px) 50vw, 25vw"
								className="focus-img-front w-full h-full object-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
