"use client";

import createGlobe, { type Arc, type COBEOptions, type Marker } from "cobe";
import { type CSSProperties, useEffect, useRef, useState } from "react";

type GlobeMarker = Marker & {
	id: string;
	name: string;
	description: string;
};

type AnchorStyle = CSSProperties & {
	positionAnchor?: string;
};

const getAnchorStyle = (id: string): AnchorStyle => ({
	positionAnchor: `--cobe-${id}`,
});

const MARKERS: GlobeMarker[] = [
	{
		id: "kano",
		name: "Kano",
		description: "MSME Develepment Initiative",
		location: [37.7749, -122.4194],
		size: 0.05,
	},
	{
		id: "bauchi",
		name: "Bauchi",
		description: "NATCO",
		location: [51.5074, -0.1278],
		size: 0.05,
	},
	{
		id: "oyo",
		name: "Oyo",
		description: "NATCO, Insurance",
		location: [35.6762, 139.6503],
		size: 0.05,
	},
	{
		id: "lagos",
		name: "Lagos",
		description: "NATCO",
		location: [-33.8688, 151.2093],
		size: 0.05,
	},
	{
		id: "abuja",
		name: "Abuja",
		description: "SafeHire",
		location: [-23.5505, -46.6333],
		size: 0.05,
	},
	// { id: 'capetown', name: 'Cape Town', description: 'Africa Office', location: [-33.9249, 18.4241], size: 0.05 },
];

const ARCS: Arc[] = [
	{ from: MARKERS[0].location, to: MARKERS[1].location }, // SF -> Tokyo
	{ from: MARKERS[3].location, to: MARKERS[2].location }, // London -> Cape Town
	{ from: MARKERS[2].location, to: MARKERS[0].location }, // Sydney -> São Paulo
	{ from: MARKERS[3].location, to: MARKERS[0].location }, // Sydney -> São Paulo
	{ from: MARKERS[2].location, to: MARKERS[1].location }, // SF -> London
	{ from: MARKERS[0].location, to: MARKERS[4].location }, // SF -> London
];

const BASE_CONFIG: Omit<
	COBEOptions,
	"width" | "height" | "devicePixelRatio" | "mapSamples"
> = {
	phi: 0,
	theta: 0.25,
	dark: 1, // NOTE: was `light: 1` — not a valid cobe key, `dark` is correct (0 = light mode, 1 = dark mode)
	diffuse: 1.2,
	mapBrightness: 6,
	mapBaseBrightness: 0.06,
	baseColor: [0.9, 0.9, 0.95],
	markerColor: [0.35, 0.55, 1.0],
	glowColor: [0.29, 0.62, 1.0], // #4A9EFF
	arcColor: [0.3, 0.5, 1],
	arcWidth: 0.6,
	arcHeight: 0.3,
	markerElevation: 0.08,
	markers: MARKERS,
	scale: 1,
	arcs: ARCS,
};

// How many pixels of drag = 1 radian of rotation. Lower = more sensitive.
const ROTATION_SENSITIVITY = 200;
const IDLE_ROTATION_SPEED = 0.003;
const MOMENTUM_FRICTION = 0.94;
const MIN_THETA = -1.1;
const MAX_THETA = 1.1;

const clamp = (value: number, min: number, max: number) =>
	Math.max(min, Math.min(max, value));

function getDeviceTier() {
	const nav =
		typeof navigator !== "undefined"
			? (navigator as Navigator & {
					connection?: {
						saveData?: boolean;
						effectiveType?: string;
					};
				})
			: undefined;
	const cores = nav?.hardwareConcurrency ?? 4;
	const connection = nav?.connection;
	const saveData = connection?.saveData ?? false;
	const slowConn = ["slow-2g", "2g", "3g"].includes(
		connection?.effectiveType ?? "",
	);
	const reducedMotion =
		typeof window !== "undefined" &&
		window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
	const isLowEnd = cores <= 4 || saveData || slowConn;

	return {
		isLowEnd,
		reducedMotion,
		mapSamples: isLowEnd ? 8000 : 16000,
		devicePixelRatio: Math.min(
			typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
			isLowEnd ? 1.5 : 2,
		),
	};
}

export default function Globe() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// Accumulated rotation — the single source of truth. Never sprung, so it
	// never "snaps back"; it's only ever added to.
	const phiRef = useRef(0);
	const thetaRef = useRef(BASE_CONFIG.theta);
	// Set while a drag is active: where the pointer started and what rotation was
	// at that moment, so movement maps to rotation 1:1 with no lag.
	const dragRef = useRef<{
		x: number;
		y: number;
		phiAtStart: number;
		thetaAtStart: number;
	} | null>(null);
	// Last pointer sample, used to measure release velocity for momentum.
	const lastMoveRef = useRef<{
		x: number;
		y: number;
		t: number;
		vx: number;
		vy: number;
	} | null>(null);
	const sizeRef = useRef({ width: 0, height: 0 });
	const momentumVelocityRef = useRef({ x: 0, y: 0 });

	const [hoveredId, setHoveredId] = useState<string | null>(null);

	useEffect(() => {
		if (!canvasRef.current || !containerRef.current) return;

		const canvas = canvasRef.current;
		const container = containerRef.current;
		const { reducedMotion, mapSamples, devicePixelRatio } = getDeviceTier();

		let animationFrame = 0;
		let destroyed = false;
		let visible = true;
		let isLooping = false;
		let globe: ReturnType<typeof createGlobe> | null = null;

		const measure = () => {
			const rect = container.getBoundingClientRect();

			return {
				width: Math.max(1, Math.round(rect.width)),
				height: Math.max(1, Math.round(rect.height)),
			};
		};

		const resizeObserver = new ResizeObserver(([entry]) => {
			sizeRef.current = {
				width: Math.max(1, Math.round(entry.contentRect.width)),
				height: Math.max(1, Math.round(entry.contentRect.height)),
			};
		});
		resizeObserver.observe(container);

		const render = () => {
			if (!globe || destroyed || !visible) {
				isLooping = false;
				return;
			}
			isLooping = true;

			const nextSize = sizeRef.current.width > 0 ? sizeRef.current : measure();
			sizeRef.current = nextSize;

			if (dragRef.current === null) {
				if (!reducedMotion) phiRef.current += IDLE_ROTATION_SPEED;
				phiRef.current += momentumVelocityRef.current.x;
				thetaRef.current = clamp(
					thetaRef.current + momentumVelocityRef.current.y,
					MIN_THETA,
					MAX_THETA,
				);

				momentumVelocityRef.current.x *= MOMENTUM_FRICTION;
				momentumVelocityRef.current.y *= MOMENTUM_FRICTION;

				if (Math.abs(momentumVelocityRef.current.x) < 0.0001) {
					momentumVelocityRef.current.x = 0;
				}

				if (
					Math.abs(momentumVelocityRef.current.y) < 0.0001 ||
					thetaRef.current === MIN_THETA ||
					thetaRef.current === MAX_THETA
				) {
					momentumVelocityRef.current.y = 0;
				}
			}

			globe.update({
				phi: phiRef.current,
				theta: thetaRef.current,
				width: nextSize.width,
				height: nextSize.height,
			});

			animationFrame = requestAnimationFrame(render);
		};

		const intersectionObserver = new IntersectionObserver(([entry]) => {
			const wasVisible = visible;
			visible = entry.isIntersecting;
			if (visible && !wasVisible && !isLooping) {
				render();
			}
		});
		intersectionObserver.observe(container);

		const initialize = () => {
			sizeRef.current = measure();

			globe = createGlobe(canvas, {
				...BASE_CONFIG,
				phi: phiRef.current,
				theta: thetaRef.current,
				width: sizeRef.current.width,
				height: sizeRef.current.height,
				devicePixelRatio,
				mapSamples,
			});

			render();
		};

		animationFrame = requestAnimationFrame(initialize);

		return () => {
			destroyed = true;
			cancelAnimationFrame(animationFrame);
			globe?.destroy();
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
		};
	}, []);

	const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
		dragRef.current = {
			x: e.clientX,
			y: e.clientY,
			phiAtStart: phiRef.current,
			thetaAtStart: thetaRef.current,
		};
		lastMoveRef.current = {
			x: e.clientX,
			y: e.clientY,
			t: performance.now(),
			vx: 0,
			vy: 0,
		};
		momentumVelocityRef.current = { x: 0, y: 0 };
		e.currentTarget.setPointerCapture(e.pointerId); // <-- keeps the drag
		// alive even if the cursor leaves the canvas mid-drag; this was the
		// main cause of the drag feeling broken.
		e.currentTarget.style.cursor = "grabbing";
	};

	const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
		if (dragRef.current === null || lastMoveRef.current === null) return;

		// Direct, immediate assignment — the globe tracks the pointer exactly,
		// with no spring easing lag while the drag is active.
		const totalDeltaX = e.clientX - dragRef.current.x;
		const totalDeltaY = e.clientY - dragRef.current.y;
		phiRef.current =
			dragRef.current.phiAtStart + totalDeltaX / ROTATION_SENSITIVITY;
		thetaRef.current = clamp(
			dragRef.current.thetaAtStart + totalDeltaY / ROTATION_SENSITIVITY,
			MIN_THETA,
			MAX_THETA,
		);

		const now = performance.now();
		const dt = now - lastMoveRef.current.t;
		if (dt > 0) {
			const stepDeltaX = e.clientX - lastMoveRef.current.x;
			const stepDeltaY = e.clientY - lastMoveRef.current.y;
			// radians per ms, smoothed slightly against the previous sample
			const instantVX = stepDeltaX / ROTATION_SENSITIVITY / dt;
			const instantVY = stepDeltaY / ROTATION_SENSITIVITY / dt;
			lastMoveRef.current.vx = lastMoveRef.current.vx * 0.7 + instantVX * 0.3;
			lastMoveRef.current.vy = lastMoveRef.current.vy * 0.7 + instantVY * 0.3;
		}

		lastMoveRef.current.x = e.clientX;
		lastMoveRef.current.y = e.clientY;
		lastMoveRef.current.t = now;
	};

	const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
		if (dragRef.current === null) return;
		dragRef.current = null;
		e.currentTarget.style.cursor = "grab";
		if (e.currentTarget.hasPointerCapture(e.pointerId)) {
			e.currentTarget.releasePointerCapture(e.pointerId);
		}

		const FRAME_MS = 16.67;
		const MAX_V = 0.15; // clamp so an erratic flick can fling it wildly
		const rawX = (lastMoveRef.current?.vx ?? 0) * FRAME_MS;
		const rawY = (lastMoveRef.current?.vy ?? 0) * FRAME_MS;

		momentumVelocityRef.current = {
			x: clamp(rawX, -MAX_V, MAX_V),
			y: clamp(rawY, -MAX_V, MAX_V),
		};
	};

	return (
		<div ref={containerRef} className="globe-container">
			<canvas
				ref={canvasRef}
				style={{
					width: "100%",
					height: "100%",
					cursor: "grab",
					touchAction: "none", // prevents mobile browsers from hijacking the drag as a page-scroll
					userSelect: "none",
				}}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerCancel={onPointerUp}
			/>
			{MARKERS.map((m) => (
				<button
					key={m.id}
					data-marker-id={m.id}
					className={`globe-label ${hoveredId === m.id ? "expanded" : ""}`}
					style={getAnchorStyle(m.id)}
					onMouseEnter={() => setHoveredId(m.id)}
					onMouseLeave={() => setHoveredId(null)}
					onFocus={() => setHoveredId(m.id)}
					onBlur={() => setHoveredId(null)}
				>
					<span className="globe-label__name">{m.name}</span>
					{hoveredId === m.id && (
						<span className="globe-label__detail">{m.description}</span>
					)}
				</button>
			))}
		</div>
	);
}
