"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

// --- Utility Functions ---
function normalizeImage(img: any) {
	if (!img) return null;
	return typeof img === "string" ? { src: img } : img;
}

function computeWeights(
	count: number,
	activeIndex: number | null,
	expand: number,
) {
	if (count <= 0) return [];
	if (activeIndex === null || count === 1) return new Array(count).fill(1);
	const others = count - 1;
	const remaining = count - expand;
	const otherWeight = others > 0 ? Math.max(remaining / others, 0.06) : 0;
	return Array.from({ length: count }, (_, i) =>
		i === activeIndex ? expand : otherWeight,
	);
}

function toTemplate(weights: number[]) {
	return weights.map((w) => `${Math.round(w * 1000) / 1000}fr`).join(" ");
}

function useMediaQuery(query: string) {
	const [matches, setMatches] = useState(false);
	useEffect(() => {
		const mql = window.matchMedia(query);
		const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
		setMatches(mql.matches);
		if (mql.addEventListener) {
			mql.addEventListener("change", handler);
			return () => mql.removeEventListener("change", handler);
		}
		mql.addListener(handler);
		return () => mql.removeListener(handler);
	}, [query]);
	return matches;
}

// --- HoverBentoGrid Component ---
function HoverBentoGrid({
	tiles,
	columns = 3,
	gap = 24,
	radius = 24,
	rowHeight = 260, // Smaller row height so it easily fits in a viewport
	mobileRowHeight = 280,
	mobileBreakpoint = 768,
	expandX = 1, // Disabled expansion
	expandY = 1, // Disabled expansion
	duration = 600, // Premium slow and smooth transition
	easing = "cubic-bezier(0.25, 0.8, 0.25, 1)", // Gracious smooth easing
}: any) {
	const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);

	const [hoverIndex, setHoverIndex] = useState<number | null>(null);
	const activeIndex = hoverIndex;

	const effColumns = isMobile ? 1 : Math.max(1, columns);
	const rows = Math.max(1, Math.ceil(tiles.length / effColumns));
	const effRowHeight = isMobile ? mobileRowHeight : rowHeight;

	const activeCol = activeIndex === null ? null : activeIndex % effColumns;
	const activeRow =
		activeIndex === null ? null : Math.floor(activeIndex / effColumns);

	const colTemplate = useMemo(
		() => toTemplate(computeWeights(effColumns, activeCol, expandX)),
		[effColumns, activeCol, expandX],
	);
	const rowTemplate = useMemo(
		() => toTemplate(computeWeights(rows, activeRow, expandY)),
		[rows, activeRow, expandY],
	);

	const gridHeight = rows * effRowHeight + (rows - 1) * gap;

	const rootVars = {
		"--hbg-duration": `${duration}ms`,
		"--hbg-ease": easing,
		"--hbg-radius": `${radius}px`,
	} as React.CSSProperties;

	return (
		<div className={`hbg-root w-full`} style={rootVars}>
			<div
				className="hbg-grid"
				role="group"
				style={{
					display: "grid",
					gridTemplateColumns: colTemplate,
					gridTemplateRows: rowTemplate,
					gap: `${gap}px`,
					height: `${gridHeight}px`,
					transition: `grid-template-columns ${duration}ms ${easing}, grid-template-rows ${duration}ms ${easing}, height ${duration}ms ${easing}`,
				}}
			>
				{tiles.map((tile: any, i: number) => (
					<Tile
						key={tile.id}
						tile={tile}
						isActive={activeIndex === i}
						onEnter={() => setHoverIndex(i)}
						onLeave={() => setHoverIndex(null)}
						onToggle={() => setHoverIndex((cur) => (cur === i ? null : i))}
					/>
				))}
			</div>
		</div>
	);
}

// --- Tile Component ---
function Tile({ tile, isActive, onEnter, onLeave, onToggle }: any) {
	const coarsePointer = useMediaQuery("(hover: none), (pointer: coarse)");
	const base = normalizeImage(tile.image);

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (coarsePointer) {
			if (!isActive) {
				e.preventDefault();
				onToggle();
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			if (!isActive) {
				e.preventDefault();
				onToggle();
			} else if (e.key === " ") {
				e.preventDefault();
				e.currentTarget.click();
			}
		}
		if (e.key === "Escape") onLeave();
	};

	const handleBlur = (e: React.FocusEvent) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) onLeave();
	};

	return (
		<a
			href={tile.url}
			target="_blank"
			rel="noopener noreferrer"
			className={`hbg-tile ${isActive ? "is-active" : ""}`}
			style={{
				position: "relative",
				overflow: "hidden",
				borderRadius: "var(--hbg-radius)",
				cursor: "pointer",
				isolation: "isolate",
				background: "#111",
			}}
			tabIndex={0}
			aria-expanded={isActive}
			aria-label={[tile.name, tile.description].filter(Boolean).join(". ")}
			onMouseEnter={!coarsePointer ? onEnter : undefined}
			onMouseLeave={!coarsePointer ? onLeave : undefined}
			onBlur={handleBlur}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<div className="hbg-link-icon absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md rounded-full p-2.5 text-white border border-white/10 shadow-sm transition-all duration-300 hover:bg-white/45 hover:scale-110">
				<ExternalLink className="w-4 h-4" />
			</div>

			<div
				className="hbg-media"
				style={{
					position: "absolute",
					inset: 0,
					overflow: "hidden",
					borderRadius: "inherit",
				}}
			>
				{base && (
					<Image
						className="hbg-img base"
						src={base.src}
						alt={base.alt ?? tile.name}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						style={{
							objectFit: "cover",
							transition:
								"transform calc(var(--hbg-duration) * 1.5) var(--hbg-ease)",
							transform: isActive ? "scale(1.05)" : "scale(1)",
						}}
					/>
				)}
				<div
					className="hbg-scrim"
					style={{
						position: "absolute",
						inset: 0,
						background:
							"linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 100%)",
						opacity: 0.85,
					}}
				/>
			</div>

			<div
				className="hbg-content"
				style={{
					position: "relative",
					zIndex: 2,
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-end",
					padding: "24px",
					color: "#fff",
				}}
			>
				<h3
					className="hbg-title"
					style={{ margin: 0, fontSize: "22px", fontWeight: 600 }}
				>
					{tile.name}
				</h3>
				<div
					className="hbg-reveal"
					style={{
						display: "grid",
						gridTemplateRows: isActive ? "1fr" : "0fr",
						transition:
							"grid-template-rows var(--hbg-duration) var(--hbg-ease)",
						marginTop: isActive ? "8px" : "0px",
					}}
				>
					<div
						className="hbg-reveal-inner"
						style={{
							overflow: "hidden",
							opacity: isActive ? 1 : 0,
							transition:
								"opacity calc(var(--hbg-duration) * 0.8) var(--hbg-ease)",
						}}
					>
						{tile.description && (
							<p
								className="hbg-desc"
								style={{
									margin: 0,
									fontSize: "16px",
									color: "rgba(255,255,255,0.9)",
								}}
							>
								{tile.description}
							</p>
						)}
					</div>
				</div>
			</div>
		</a>
	);
}

// --- Main Section Component ---
export default function DigitalEcosystem() {
	const sectionRef = useRef<HTMLElement>(null);
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					toggleActions: "play none none none",
				},
			});

			tl.fromTo(
				".eco-header",
				{ y: 50, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
			)
				.fromTo(
					".eco-desc",
					{ y: 30, opacity: 0 },
					{ y: 0, opacity: 1, duration: 1, ease: "power3.out" },
					"-=0.9",
				)
				.fromTo(
					".eco-cta",
					{ y: 20, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
					"-=0.8",
				)
				.fromTo(
					".hbg-tile",
					{ y: 40, opacity: 0, scale: 0.95 },
					{
						y: 0,
						opacity: 1,
						scale: 1,
						stagger: 0.1,
						duration: 1,
						ease: "power3.out",
					},
					"-=0.7",
				);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	useEffect(() => {
		if (isExpanded) {
			gsap.fromTo(
				".hbg-tile:nth-child(n+7)",
				{ y: 40, opacity: 0, scale: 0.95 },
				{
					y: 0,
					opacity: 1,
					scale: 1,
					stagger: 0.1,
					duration: 0.8,
					ease: "power3.out",
				}
			);
		}
	}, [isExpanded]);

	const platforms = [
		{
			id: "naija-quick-fix",
			name: "Naijaquickfix",
			description:
				"Connecting verified Nigerian artisans and technicians with clients.",
			url: "https://naijaquickfix.com.ng",
			image: "/projects-completed/naija-quick-fix.png",
		},
		{
			id: "gpa-insurance",
			name: "Group Personal Accident Insurance",
			description:
				"Financial protection against accidental injuries and disabilities.",
			url: "https://gpa-insurance.com",
			image: "/projects-completed/GPA.png",
		},
		{
			id: "nigeria-drivers",
			name: "NigeriaDrivers",
			description: "Designed to register and verify drivers in Nigeria.",
			url: "https://www.nigeriandrivers.com/index.html",
			image: "/projects-completed/nigeria-drivers.png",
		},
		{
			id: "oyo-state-commerce",
			name: "Oyo State Data Collation",
			description:
				"A platform for collecting and collating commerce data in Oyo State.",
			url: "https://oyostatecommerce.org.ng",
			image: "/projects-completed/oyostatecommerce.png",
		},
		{
			id: "hotel-lodgers",
			name: "Hotel Lodgers Portal",
			description: "Enhancing security and authenticity of hotel stays.",
			url: "https://nigerianhotellodgers.com",
			image: "/projects-completed/hotel-lodgers.png",
		},
		{
			id: "safe-hire",
			name: "Safe Hire",
			description: "Streamlined background checks and verification for hiring.",
			url: "https://www.safehireafrica.com/",
			image: "/projects-completed/safe-hire.png",
		},
		{
			id: "oyo-state-raffle",
			name: "Oyo State Raffle",
			description: "Official Oyo State International Trade Fair Raffle platform.",
			url: "https://oyoraffle.oyostatecommerce.com.ng/",
			image: "/oyo-state-raffle.png",
		},
	];

	const visiblePlatforms = isExpanded ? platforms : platforms.slice(0, 6);

	return (
		<section
			ref={sectionRef}
			id="programmes"
			className="w-full bg-white py-16 sm:py-24 relative"
		>
			<div
				id="resources"
				className="absolute top-0 left-0 w-0 h-0 pointer-events-none"
			/>
			<div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-8">
					<div className="max-w-2xl">
						<h2 className="eco-header font-display text-navy-900 text-4xl sm:text-5xl font-semibold leading-tight mb-6">
							Some of our Solutions
						</h2>
						<p className="eco-desc text-gray-600 text-lg leading-relaxed">
							We have built a robust suite of technology platforms that act as
							the infrastructure for our verification, insurance facilitation,
							and trade data collation services.
						</p>
					</div>
				</div>

				{/* Animated Bento Grid */}
				<HoverBentoGrid
					tiles={visiblePlatforms}
					columns={3}
					gap={24}
					radius={24}
					rowHeight={260}
				/>

				{platforms.length > 6 && (
					<div className="mt-12 flex justify-center">
						<button
							onClick={() => setIsExpanded(!isExpanded)}
							className="eco-cta group flex items-center bg-gray-50 text-navy-900 text-[15px] font-medium rounded-full pl-6 pr-2 py-2 hover:bg-gray-100 transition-colors duration-300 "
						>
							<span className="mr-4">{isExpanded ? "Show less" : "View all platforms"}</span>
							<div className="bg-white rounded-full p-2 group-hover:bg-gray-200 transition-colors duration-800 shadow-sm flex items-center justify-center">
								<ArrowUpRight className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? "rotate-[135deg]" : "group-hover:rotate-45"}`} />
							</div>
						</button>
					</div>
				)}
			</div>
		</section>
	);
}
