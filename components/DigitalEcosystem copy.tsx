"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

// --- Utility Functions ---
let instanceCounter = 0;
function useInstanceId() {
	const ref = useRef<string | null>(null);
	if (ref.current === null) {
		instanceCounter += 1;
		ref.current = `hbg-${instanceCounter}-${Math.random().toString(36).slice(2, 7)}`;
	}
	return ref.current;
}

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
	const [matches, setMatches] = useState(() =>
		typeof window !== "undefined" ? window.matchMedia(query).matches : false,
	);
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
	expandX = 2,
	expandY = 1.35,
	duration = 600, // Smoother, slightly slower transition
	easing = "cubic-bezier(0.25, 0.8, 0.25, 1)", // Gracious smooth easing
}: any) {
	const uid = useInstanceId();
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
			<style>{css(uid)}</style>
			<div
				className={`hbg-grid hbg-${uid}`}
				role="group"
				style={{
					gridTemplateColumns: colTemplate,
					gridTemplateRows: rowTemplate,
					gap: `${gap}px`,
					height: `${gridHeight}px`,
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
			className={[`hbg-tile`, isActive ? "is-active" : ""].join(" ")}
			tabIndex={0}
			aria-expanded={isActive}
			aria-label={[tile.name, tile.description].filter(Boolean).join(". ")}
			onMouseEnter={!coarsePointer ? onEnter : undefined}
			onMouseLeave={!coarsePointer ? onLeave : undefined}
			onBlur={handleBlur}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<div className="hbg-media">
				{base && (
					<Image
						className="hbg-img base"
						src={base.src}
						alt={base.alt ?? tile.name}
						fill
					/>
				)}
				<div className="hbg-scrim" />
			</div>

			<div className="hbg-content">
				<h3 className="hbg-title">{tile.name}</h3>
				<div className="hbg-reveal">
					<div className="hbg-reveal-inner">
						{tile.description && <p className="hbg-desc">{tile.description}</p>}
					</div>
				</div>
			</div>
		</a>
	);
}

function css(uid: string) {
	return `
.hbg-root { width: 100%; }
.hbg-grid.hbg-${uid} {
  position: relative;
  display: grid;
  width: 100%;
  transition:
    grid-template-columns var(--hbg-duration) var(--hbg-ease),
    grid-template-rows var(--hbg-duration) var(--hbg-ease),
    height var(--hbg-duration) var(--hbg-ease);
}

.hbg-${uid} .hbg-tile {
  position: relative;
  overflow: hidden;
  border-radius: var(--hbg-radius);
  cursor: pointer;
  isolation: isolate;
  background: #111;
  border: 1px solid rgba(0,0,0,0.06);
}

.hbg-${uid} .hbg-media {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
}

.hbg-${uid} .hbg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform calc(var(--hbg-duration) * 1.5) var(--hbg-ease);
}
.hbg-${uid} .hbg-tile.is-active .hbg-img.base { 
  transform: scale(1.05); 
}

.hbg-${uid} .hbg-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
  opacity: 0.7;
  transition: opacity var(--hbg-duration) var(--hbg-ease);
}
.hbg-${uid} .hbg-tile.is-active .hbg-scrim { 
  opacity: 0.95; 
}

.hbg-${uid} .hbg-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(20px, 4%, 24px);
  color: #fff;
}

.hbg-${uid} .hbg-title {
  margin: 0;
  font-family: var(--font-display), system-ui, sans-serif;
  font-size: clamp(18px, 2vw + 8px, 22px);
  font-weight: 600;
  color: #fff;
  transition: color var(--hbg-duration) var(--hbg-ease);
}
.hbg-${uid} .hbg-tile.is-active .hbg-title {
  color: #60a5fa;
}

.hbg-${uid} .hbg-reveal {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--hbg-duration) var(--hbg-ease);
}
.hbg-${uid} .hbg-tile.is-active .hbg-reveal { 
  grid-template-rows: 1fr;
  margin-top: 8px;
}
.hbg-${uid} .hbg-reveal-inner {
  overflow: hidden;
  min-height: 0;
  opacity: 0;
  transform: translateY(5px);
  transition: opacity calc(var(--hbg-duration) * 0.8) var(--hbg-ease),
    transform calc(var(--hbg-duration) * 0.8) var(--hbg-ease);
}
.hbg-${uid} .hbg-tile.is-active .hbg-reveal-inner {
  opacity: 1;
  transform: translateY(0);
  transition-delay: calc(var(--hbg-duration) * 0.2);
}

.hbg-${uid} .hbg-desc {
  margin: 0;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255,255,255,0.9);
}

@media (prefers-reduced-motion: reduce) {
  .hbg-${uid}, .hbg-${uid} * { transition-duration: 100ms !important; }
}
`;
}

// --- Main Section Component ---
export default function DigitalEcosystem() {
	const platforms = [
		{
			id: "naija-quick-fix",
			name: "Artisans' Verification Portal",
			description:
				"Connecting verified Nigerian artisans and technicians with clients.",
			url: "https://naijaquickfix.com.ng",
			image: "/projects-completed/naija-quick-fix.png",
		},
		{
			id: "gpa-insurance",
			name: "Group Personal Accident",
			description:
				"Financial protection against accidental injuries and disabilities.",
			url: "https://gpa-insurance.com",
			image: "/projects-completed/GPA.png",
		},
		{
			id: "nigeria-drivers",
			name: "Drivers' Verification Portal",
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
			url: "#",
			image: "/projects-completed/safe-hire.png",
		},
	];

	return (
		<section id="programmes" className="w-full bg-white py-16 sm:py-24">
			<div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-8">
					<div className="max-w-2xl">
						<h2 className="font-display text-navy-900 text-4xl sm:text-5xl font-semibold leading-tight mb-6">
							Digital Ecosystem & <br />
							Proprietary Platforms
						</h2>
						<p className="text-gray-600 text-lg leading-relaxed">
							We have built a robust suite of technology platforms that act as
							the infrastructure for our verification, insurance facilitation,
							and trade data collation services.
						</p>
					</div>
					<a
						href="#contact"
						className="group flex items-center bg-gray-50 text-navy-900 text-[15px] font-medium rounded-full pl-6 pr-2 py-2 hover:bg-gray-100 transition-colors duration-300 border border-gray-200"
					>
						<span className="mr-4">View all platforms</span>
						<div className="bg-white rounded-full p-2 group-hover:bg-gray-200 transition-colors duration-300 shadow-sm border border-gray-100 flex items-center justify-center">
							<ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:rotate-45" />
						</div>
					</a>
				</div>

				{/* Animated Bento Grid */}
				<HoverBentoGrid
					tiles={platforms}
					columns={3}
					gap={24}
					radius={24}
					rowHeight={260}
				/>
			</div>
		</section>
	);
}
