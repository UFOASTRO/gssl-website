"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const partners = [
	{ name: "Ecobank", src: "/Partners-logos/67ab2681939f3-Ecobank.png" },
	{
		name: "Polaris Bank",
		src: "/Partners-logos/polaris-bank-logo-removebg-preview.png",
	},
	{ name: "SMEDAN", src: "/Partners-logos/smedan-logo-removebg-preview.png" },
	{
		name: "Oyo State",
		src: "/Partners-logos/oyo-state-logo-removebg-preview.png",
	},
	{
		name: "Bauchi State",
		src: "/Partners-logos/bauchi-state-logo-removebg-preview.png",
	},
	{
		name: "Kano State",
		src: "/Partners-logos/kano-state-logo-removebg-preview.png",
	},
	{ name: "FMTII", src: "/Partners-logos/fmtii-logo-removebg-preview.png" },
	{ name: "LCCI", src: "/Partners-logos/lcci-go-removebg-preview.png" },
	{ name: "Mobil", src: "/Partners-logos/mobil-logo-removebg-preview.png" },
	{
		name: "Texaco",
		src: "/Partners-logos/Texaco_logo.svg-removebg-preview.png",
	},
];

export default function PartnersMarquee() {
	const sectionRef = useRef<HTMLElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const tweenRef = useRef<gsap.core.Tween | null>(null);

	useEffect(() => {
		if (!scrollRef.current) return;

		// Clone the inner content for seamless infinite scrolling
		const scrollContent = scrollRef.current;
		const contentWidth = scrollContent.scrollWidth;

		gsap.set(scrollContent, { x: 0 });

		tweenRef.current = gsap.to(scrollContent, {
			x: () => `-${contentWidth / 2}px`, // Move exactly half the total width (since we duplicated it once)
			ease: "none",
			duration: 50, // Adjust duration for speed
			repeat: -1,
		});

		return () => {
			tweenRef.current?.kill();
		};
	}, []);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				".partners-header",
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 90%",
						toggleActions: "play none none none",
					},
				},
			);

			gsap.fromTo(
				".partners-marquee-container",
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1.2,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 85%",
						toggleActions: "play none none none",
					},
				},
			);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const handleMouseEnter = () => {
		tweenRef.current?.pause();
	};

	const handleMouseLeave = () => {
		tweenRef.current?.play();
	};

	// We duplicate the array to allow for a seamless scroll
	const duplicatedPartners = [...partners, ...partners];

	return (
		<section
			ref={sectionRef}
			className="w-full bg-white py-10 overflow-hidden relative border-t border-b border-gray-100"
		>
			<div className="partners-header max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12 mb-8">
				<p className="text-sm font-semibold tracking-widest text-navy-900/40 uppercase">
					Trusted by forward-thinking institutions
				</p>
			</div>

			<div
				ref={containerRef}
				className="partners-marquee-container w-full relative flex overflow-hidden group"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				{/* Left/Right fading gradients for smooth edge transition */}
				<div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
				<div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

				<div
					ref={scrollRef}
					className="flex whitespace-nowrap items-center w-max"
				>
					{duplicatedPartners.map((partner, index) => (
						<div
							key={`${partner.name}-${index}`}
							className="flex-shrink-0 px-10 sm:px-16 flex items-center justify-center transition-all duration-500 hover:scale-110"
						>
							<Image
								src={partner.src}
								alt={partner.name}
								width={180}
								height={120}
								className="max-h-[90px] w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
