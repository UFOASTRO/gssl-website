import { useEffect, useMemo, useRef, useState } from "react";

let instanceCounter = 0;
function useInstanceId() {
	const ref = useRef(null);
	if (ref.current === null) {
		instanceCounter += 1;
		ref.current = `hbg-${instanceCounter}-${Math.random().toString(36).slice(2, 7)}`;
	}
	return ref.current;
}

function normalizeImage(img) {
	if (!img) return null;
	return typeof img === "string" ? { src: img } : img;
}

function computeWeights(count, activeIndex, expand) {
	if (count <= 0) return [];
	if (activeIndex === null || count === 1) return new Array(count).fill(1);
	const others = count - 1;
	const remaining = count - expand;
	const otherWeight = others > 0 ? Math.max(remaining / others, 0.06) : 0;
	return Array.from({ length: count }, (_, i) =>
		i === activeIndex ? expand : otherWeight,
	);
}

function toTemplate(weights) {
	return weights.map((w) => `${Math.round(w * 1000) / 1000}fr`).join(" ");
}

function useMediaQuery(query) {
	const [matches, setMatches] = useState(() =>
		typeof window !== "undefined" ? window.matchMedia(query).matches : false,
	);
	useEffect(() => {
		const mql = window.matchMedia(query);
		const handler = (e) => setMatches(e.matches);
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

const ArrowIcon = () => (
	<svg
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<path
			d="M3.5 8h9m0 0L8.5 4m4 4L8.5 12"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

function HoverBentoGrid({
	tiles,
	columns = 4,
	gap = 14,
	radius = 22,
	rowHeight = 240,
	mobileRowHeight,
	mobileBreakpoint = 640,
	expandX = 2.2,
	expandY = 1.5,
	duration = 650,
	easing = "cubic-bezier(0.65, 0, 0.35, 1)",
	border = { width: 1, color: "rgba(255,255,255,0.10)" },
	posterIndex = null,
	className,
	style,
}) {
	const uid = useInstanceId();
	const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);
	const isStatic = posterIndex !== null && posterIndex !== undefined;

	const [hoverIndex, setHoverIndex] = useState(null);
	const activeIndex = isStatic ? posterIndex : hoverIndex;

	const effColumns = isMobile ? 1 : Math.max(1, columns);
	const rows = Math.max(1, Math.ceil(tiles.length / effColumns));
	const effRowHeight = isMobile ? (mobileRowHeight ?? rowHeight) : rowHeight;

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

	const setActive = (idx) => {
		if (isStatic) return;
		setHoverIndex(idx);
	};

	const rootVars = {
		"--hbg-duration": `${duration}ms`,
		"--hbg-ease": easing,
		"--hbg-radius": `${radius}px`,
		"--hbg-border-w": border ? `${border.width ?? 1}px` : "0px",
		"--hbg-border-c": border
			? (border.color ?? "rgba(255,255,255,0.1)")
			: "transparent",
	};

	return (
		<div
			className={`hbg-root ${className ?? ""}`}
			style={{ ...rootVars, ...style }}
		>
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
				{tiles.map((tile, i) => (
					<Tile
						key={tile.id}
						tile={tile}
						isActive={activeIndex === i}
						isStatic={isStatic}
						onEnter={() => setActive(i)}
						onLeave={() => setActive(null)}
						onToggle={() => setHoverIndex((cur) => (cur === i ? null : i))}
					/>
				))}
			</div>
		</div>
	);
}

function Tile({ tile, isActive, isStatic, onEnter, onLeave, onToggle }) {
	const coarsePointer = useMediaQuery("(hover: none), (pointer: coarse)");
	const base = normalizeImage(tile.image);
	const hover = normalizeImage(tile.hoverImage);
	const fx = tile.fx ?? "zoom";
	const accentVar = tile.accent ? { "--accent": tile.accent } : undefined;

	const handleClick = () => {
		if (isStatic) return;
		if (coarsePointer) onToggle();
	};

	const handleKeyDown = (e) => {
		if (isStatic) return;
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onToggle();
		}
		if (e.key === "Escape") onLeave();
	};

	const handleBlur = (e) => {
		if (isStatic) return;
		if (!e.currentTarget.contains(e.relatedTarget)) onLeave();
	};

	return (
		<div
			className={[
				"hbg-tile",
				`fx-${fx}`,
				isActive ? "is-active" : "",
				tile.tag ? "has-tag" : "",
				"hbg-bordered",
			].join(" ")}
			style={accentVar}
			role="button"
			tabIndex={isStatic ? -1 : 0}
			aria-expanded={isStatic ? undefined : isActive}
			aria-label={[tile.title, tile.tag, tile.description]
				.filter(Boolean)
				.join(". ")}
			onMouseEnter={!coarsePointer && !isStatic ? onEnter : undefined}
			onMouseLeave={!coarsePointer && !isStatic ? onLeave : undefined}
			onBlur={handleBlur}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			{tile.content ? (
				<div className="hbg-slot">{tile.content}</div>
			) : (
				<>
					<div className="hbg-media">
						{base && (
							<img
								className="hbg-img base"
								src={base.src}
								alt={base.alt ?? ""}
								style={{
									"--fit": base.fit ?? "cover",
									transform: isActive ? tile.transform : undefined,
								}}
							/>
						)}
						{hover && (
							<img
								className="hbg-img hover"
								src={hover.src}
								alt={hover.alt ?? ""}
								style={{ "--fit": hover.fit ?? "cover" }}
							/>
						)}
						<div className="hbg-scrim" />
					</div>

					<div className="hbg-content">
						<span className="hbg-tag">{tile.tag}</span>
						<h3 className="hbg-title">{tile.title}</h3>
						<div className="hbg-reveal">
							<div className="hbg-reveal-inner">
								{tile.description && (
									<p className="hbg-desc">{tile.description}</p>
								)}
								{tile.link && (
									<a
										className="hbg-link"
										href={tile.link.href}
										target={tile.link.target}
										rel={
											tile.link.target === "_blank"
												? "noopener noreferrer"
												: undefined
										}
										tabIndex={isActive ? 0 : -1}
										onClick={(e) => e.stopPropagation()}
									>
										{tile.link.label ?? "Learn more"}
										<ArrowIcon />
									</a>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

function css(uid) {
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
  outline: none;
  background: #14151a;
  min-width: 0;
  min-height: 0;
}
.hbg-${uid} .hbg-tile.hbg-bordered {
  box-shadow: inset 0 0 0 var(--hbg-border-w) var(--hbg-border-c);
}
.hbg-${uid} .hbg-tile::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  box-shadow: 0 0 0 0 transparent, 0 0px 0px 0 transparent;
  transition: box-shadow var(--hbg-duration) var(--hbg-ease);
}
.hbg-${uid} .hbg-tile.is-active::after {
  box-shadow:
    0 0 0 1.5px var(--accent, rgba(255,255,255,0.55)),
    0 22px 44px -16px rgba(0,0,0,0.6);
}
.hbg-${uid} .hbg-tile:focus-visible::after {
  box-shadow: 0 0 0 2px var(--accent, #6ea8fe);
}

.hbg-${uid} .hbg-slot { position: absolute; inset: 0; }

.hbg-${uid} .hbg-media { position: absolute; inset: 0; overflow: hidden; border-radius: inherit; }
.hbg-${uid} .hbg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: var(--fit, cover);
  object-position: center;
  transform-origin: center;
  transition:
    transform var(--hbg-duration) var(--hbg-ease),
    opacity var(--hbg-duration) var(--hbg-ease);
}
.hbg-${uid} .hbg-img.hover { opacity: 0; }
.hbg-${uid} .hbg-tile.is-active .hbg-img.hover { opacity: 1; }
.hbg-${uid} .hbg-tile.fx-reveal.is-active .hbg-img.base { opacity: 0; }

.hbg-${uid} .hbg-tile.fx-zoom.is-active .hbg-img.base { transform: scale(1.12); }
.hbg-${uid} .hbg-tile.fx-pan.is-active .hbg-img.base { transform: scale(1.12) translate3d(-3%, -3%, 0); }
.hbg-${uid} .hbg-tile.fx-tilt { perspective: 800px; }
.hbg-${uid} .hbg-tile.fx-tilt.is-active .hbg-img.base { transform: scale(1.1) rotateX(5deg) rotateY(-6deg); }
.hbg-${uid} .hbg-tile.fx-parallax .hbg-img.base { transition-duration: calc(var(--hbg-duration) * 1.4); }
.hbg-${uid} .hbg-tile.fx-parallax.is-active .hbg-img.base { transform: scale(1.06) translateY(-3%); }
.hbg-${uid} .hbg-tile.fx-rise .hbg-content { transition: transform var(--hbg-duration) var(--hbg-ease); }
.hbg-${uid} .hbg-tile.fx-rise.is-active .hbg-content { transform: translateY(-4px); }

.hbg-${uid} .hbg-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 42%, rgba(0,0,0,0) 68%);
  opacity: 0.82;
  transition: opacity var(--hbg-duration) var(--hbg-ease);
}
.hbg-${uid} .hbg-tile.is-active .hbg-scrim { opacity: 1; }

.hbg-${uid} .hbg-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(14px, 3%, 22px);
  color: #fff;
}

.hbg-${uid} .hbg-tag {
  align-self: flex-start;
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--accent, #4d6bfe);
  color: #16130f;
  margin-bottom: 8px;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity calc(var(--hbg-duration) * 0.7) var(--hbg-ease),
    transform calc(var(--hbg-duration) * 0.7) var(--hbg-ease);
}
.hbg-${uid} .hbg-tile.has-tag.is-active .hbg-tag { opacity: 1; transform: translateY(0); }
.hbg-${uid} .hbg-tile:not(.has-tag) .hbg-tag { display: none; }

.hbg-${uid} .hbg-title {
  margin: 0;
  font-family: "Fraunces", Georgia, serif;
  font-size: clamp(14px, 1vw + 9px, 19px);
  font-weight: 480;
  line-height: 1.18;
  letter-spacing: -0.01em;
  transition: font-size var(--hbg-duration) var(--hbg-ease);
}
.hbg-${uid} .hbg-tile.is-active .hbg-title { font-size: clamp(19px, 1.6vw + 10px, 28px); font-weight: 520; }

.hbg-${uid} .hbg-reveal {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--hbg-duration) var(--hbg-ease);
}
.hbg-${uid} .hbg-tile.is-active .hbg-reveal { grid-template-rows: 1fr; margin-top: 8px; }
.hbg-${uid} .hbg-reveal-inner {
  overflow: hidden;
  min-height: 0;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity calc(var(--hbg-duration) * 0.6) var(--hbg-ease),
    transform calc(var(--hbg-duration) * 0.6) var(--hbg-ease);
}
.hbg-${uid} .hbg-tile.is-active .hbg-reveal-inner {
  opacity: 1;
  transform: translateY(0);
  transition-delay: calc(var(--hbg-duration) * 0.18);
}

.hbg-${uid} .hbg-desc {
  margin: 0;
  font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
  font-size: 12.5px;
  line-height: 1.5;
  color: rgba(255,255,255,0.82);
  max-width: 42ch;
}

.hbg-${uid} .hbg-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  opacity: 0.95;
}
.hbg-${uid} .hbg-link:hover { text-decoration: underline; opacity: 1; }
.hbg-${uid} .hbg-link svg { width: 13px; height: 13px; transition: transform 0.3s var(--hbg-ease); }
.hbg-${uid} .hbg-link:hover svg { transform: translateX(3px); }

@media (prefers-reduced-motion: reduce) {
  .hbg-${uid}, .hbg-${uid} * { transition-duration: 0.01ms !important; }
}
`;
}

/* ────────────────────────────────────────────────────────────────────── *
 * Demo page — "Field Studies", an editorial photography index
 * ────────────────────────────────────────────────────────────────────── */

const img = (seed, w = 1000, h = 800) =>
	`https://picsum.photos/seed/${seed}/${w}/${h}`;

const tiles = [
	{
		id: "light",
		title: "Light",
		tag: "Study 01",
		accent: "#E2572B",
		fx: "reveal",
		image: img("field-light-a"),
		hoverImage: img("field-light-b"),
		description:
			"Hard midday sun, soft window glow, the last five minutes before dusk — how light decides what a photograph is actually about.",
		link: { href: "#", label: "View series" },
	},
	{
		id: "texture",
		title: "Texture",
		tag: "Study 02",
		accent: "#C9A227",
		fx: "zoom",
		image: img("field-texture"),
		description:
			"Bark, salt flats, worn stone steps — surfaces that reward getting close and staying still.",
		link: { href: "#", label: "View series" },
	},
	{
		id: "motion",
		title: "Motion",
		tag: "Study 03",
		accent: "#3D8C82",
		fx: "pan",
		image: img("field-motion"),
		description:
			"Long exposures of tide, traffic, and crowds — the blur that proves time actually passed.",
		link: { href: "#", label: "View series" },
	},
	{
		id: "stillness",
		title: "Stillness",
		tag: "Study 04",
		accent: "#6B7FD7",
		fx: "rise",
		image: img("field-stillness"),
		description:
			"Empty rooms at six in the morning. Nothing happening, on purpose.",
		link: { href: "#", label: "View series" },
	},
	{
		id: "depth",
		title: "Depth",
		tag: "Study 05",
		accent: "#B4626D",
		fx: "parallax",
		image: img("field-depth"),
		description:
			"Fog, layered ridgelines, a single figure two fields away — distance treated as the real subject of the frame.",
		link: { href: "#", label: "View series" },
	},
	{
		id: "grain",
		title: "Grain",
		tag: "Study 06",
		accent: "#8C8C3D",
		fx: "tilt",
		image: img("field-grain"),
		description: "Pushed film and low light. Noise as a texture, not a flaw.",
		link: { href: "#", label: "View series" },
	},
	{
		id: "shadow",
		title: "Shadow",
		tag: "Study 07",
		accent: "#7A6FF0",
		fx: "zoom",
		image: img("field-shadow"),
		description:
			"What the light leaves out — negative space doing the actual storytelling.",
		link: { href: "#", label: "View series" },
	},
	{
		id: "scale",
		title: "Scale",
		tag: "Study 08",
		accent: "#4FA8E0",
		fx: "pan",
		image: img("field-scale"),
		description:
			"A person against a canyon wall, a boat against the horizon — small things that make big things legible.",
		link: { href: "#", label: "View series" },
	},
];

export default function BentoDemo() {
	return (
		<div className="demo-page">
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

        .demo-page {
          min-height: 100%;
          background:
            radial-gradient(ellipse 900px 500px at 15% -10%, rgba(226,87,43,0.10), transparent 60%),
            #121110;
          padding: 56px 40px 64px;
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          box-sizing: border-box;
        }
        .demo-eyebrow {
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
          font-size: 11.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #E2572B;
          margin: 0 0 14px;
        }
        .demo-title {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 480;
          font-size: clamp(32px, 4vw, 52px);
          line-height: 1.04;
          letter-spacing: -0.015em;
          color: #F3EFE8;
          margin: 0 0 16px;
          max-width: 14ch;
        }
        .demo-sub {
          font-size: 15px;
          line-height: 1.6;
          color: #B8AFA3;
          max-width: 46ch;
          margin: 0 0 40px;
        }
        .demo-sub b { color: #E7E1D6; font-weight: 600; }
        .demo-foot {
          margin-top: 28px;
          font-size: 12.5px;
          color: #6d665c;
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
          letter-spacing: 0.01em;
        }
      `}</style>

			<p className="demo-eyebrow">Field Studies — Index</p>
			<h1 className="demo-title">Eight subjects, revisited every year</h1>
			<p className="demo-sub">
				<b>Hover a frame</b> — or tab to it and press <b>Enter</b> — to open the
				notes. Neighbouring frames make room by shrinking; the index itself
				never changes size.
			</p>

			<HoverBentoGrid
				tiles={tiles}
				columns={4}
				gap={14}
				radius={22}
				rowHeight={230}
			/>

			<p className="demo-foot">
				01 — 08 · updated annually · scroll unaffected by hover state
			</p>
		</div>
	);
}
