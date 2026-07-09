"use client";

import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import NavBar from "./NavBar";

// Dynamically import Globe as it uses WebGL and cannot be SSR'd
const Globe = dynamic(() => import("./Globe"), { ssr: false });

export default function Hero() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: { ease: "power4.out", duration: 1.2 },
			});

			// Initially set elements to prevent flashing if needed, or rely on fromTo
			tl.fromTo(
				".navbar-anim",
				{ y: -100, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1.5, ease: "power4.out" },
			);

			tl.fromTo(
				".hero-subtitle",
				{ y: 30, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1 },
				"-=1.2",
			);

			tl.fromTo(
				".hero-title",
				{ y: 60, opacity: 0, skewY: 2 },
				{ y: 0, opacity: 1, skewY: 0, duration: 1.4 },
				"-=1.0",
			);

			tl.fromTo(
				".hero-desc",
				{ y: 40, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1.2 },
				"-=1.1",
			);

			tl.fromTo(
				".hero-cta",
				{ y: 30, opacity: 0 },
				{ y: 0, opacity: 1, stagger: 0.15, duration: 1 },
				"-=1.0",
			);

			tl.fromTo(
				".hero-globe",
				{ scale: 0.8, opacity: 0 },
				{ scale: 1, opacity: 0.9, duration: 2, ease: "power3.out" },
				"-=1.4",
			);

			tl.fromTo(
				".hero-card",
				{ scale: 0.5, opacity: 0, y: 20 },
				{
					scale: 1,
					opacity: 1,
					y: 0,
					stagger: 0.2,
					duration: 1,
					ease: "back.out(1.5)",
				},
				"-=1.2",
			);
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={containerRef}
			className="hero relative w-full min-h-[100svh] flex flex-col bg-transparent overflow-hidden"
		>
			<NavBar />

			<div className="flex-1 flex flex-col lg:flex-row items-center justify-between relative z-20 w-full max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12 pt-24 lg:pt-20 pb-14 sm:pb-16 lg:pb-20 gap-10 lg:gap-24 xl:gap-32 mt-16 md:mt-0">
				<div className="relative z-10 w-full lg:flex-1 flex flex-col justify-center order-2 lg:order-1 pr-0 lg:pr-8">
					<p className="hero-subtitle text-[13px] sm:text-[14px] text-navy-900/60 tracking-wide uppercase mb-5 sm:mb-8 font-semibold">
						Global Sight Services Limited
					</p>

					<h1 className="hero-title font-display text-navy-900 text-[clamp(2rem,7vw,4.5rem)] leading-[1.05] tracking-[-0.03em] max-w-[800px]">
						Building what Nigerian enterprise needs to grow.
					</h1>

					<p className="hero-desc text-gray-600 text-[16px] sm:text-[18px] leading-relaxed max-w-lg mt-6">
						We partner with institutions and everyday Nigerians to verify trust,
						facilitate finance, and deliver tools that turn ambition into
						outcomes.
					</p>

					<div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
						{/* Primary CTA */}
						<a
							href="#solutions"
							className="hero-cta group flex items-center bg-navy-900 text-white text-[15px] font-medium rounded-full pl-6 pr-2 py-2 hover:bg-navy-800 transition-colors duration-300 shadow-sm"
						>
							<span className="mr-4">Explore our solutions</span>
							<div className="bg-white/10 rounded-full p-2 group-hover:bg-white/20 transition-colors duration-300">
								<ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
							</div>
						</a>

						{/* Secondary CTA */}
						<a
							href="#contact"
							className="hero-cta flex items-center justify-center border border-navy-900/10 text-navy-900 text-[15px] font-medium hover:bg-navy-900/5 rounded-full px-6 py-2.5 transition-colors duration-300"
						>
							Book a consultation
						</a>
					</div>
				</div>

				{/* Globe Container */}
				<div className="hero-globe hidden lg:block relative w-full lg:w-[45%] xl:w-[45%] max-w-[500px] lg:max-w-[600px] aspect-square flex-shrink-0 order-1 lg:order-2 z-10 pointer-events-auto mix-blend-darken opacity-90 mt-10 lg:mt-0">
					<Globe />

					{/* Card 1: Top Right */}
					<div className="hero-card absolute top-[5%] -left-1 md:-left-8 lg:-left-10 max-w-[170px] bg-white/50 backdrop-blur-md border border-white/60 p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] z-30 pointer-events-none transform translate-x-4 md:translate-x-0">
						<p className="text-navy-900 font-bold text-md leading-tight">
							Thousands+
						</p>
						<p className="text-navy-900/80 text-sm font-medium mt-1">
							MSMEs Empowered
						</p>
					</div>

					{/* Card 2: Bottom Left */}
					<div className="hero-card absolute -bottom-[5%] -right-10 md:-right-0 lg:-right-10 max-w-[280px] bg-white/50 backdrop-blur-md border border-white/60 p-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] z-30 pointer-events-none transform -translate-x-4 md:translate-x-0">
						<p className="text-navy-900/90 text-md font-medium leading-relaxed">
							We create impact with currently{" "}
							<span className="font-bold text-navy-900">
								4+ States impacted{" "}
							</span>
							bringing IT powered solutions{" "}
							<span className="font-bold text-navy-900">across nigeria</span>.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
