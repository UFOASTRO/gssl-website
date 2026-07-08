"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

gsap.registerPlugin(ScrollTrigger);

type Event = {
	id: string;
	title: string;
	short_description: string;
	date: string;
	images: string[];
};

function NewsletterSkeleton() {
	return (
		<section className="w-full bg-[#f8f9fa] py-24 sm:py-32">
			<div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
					<div className="max-w-2xl w-full">
						<div className="h-10 bg-gray-200 rounded-lg w-3/4 mb-4 animate-pulse"></div>
						<div className="h-6 bg-gray-200 rounded-lg w-full mb-2 animate-pulse"></div>
						<div className="h-6 bg-gray-200 rounded-lg w-2/3 animate-pulse"></div>
					</div>
					<div className="h-6 bg-gray-200 rounded-lg w-24 hidden md:block animate-pulse"></div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="bg-white rounded-[2rem] overflow-hidden border border-gray-200/60 p-0 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col h-full"
						>
							<div className="w-full h-64 bg-gray-200 animate-pulse relative"></div>
							<div className="p-8 flex-grow">
								<div className="h-8 bg-gray-200 rounded-lg w-5/6 mb-4 animate-pulse"></div>
								<div className="h-5 bg-gray-200 rounded-lg w-full mb-2 animate-pulse"></div>
								<div className="h-5 bg-gray-200 rounded-lg w-4/5 mb-6 animate-pulse"></div>
								<div className="h-6 bg-gray-200 rounded-lg w-1/3 animate-pulse"></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default function NewsletterSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchEvents = async () => {
			const { data } = await supabase
				.from("events")
				.select("id, title, short_description, date, images")
				.order("date", { ascending: false })
				.limit(3);

			if (data) setEvents(data);
			setLoading(false);
		};

		fetchEvents();
	}, []);

	useEffect(() => {
		if (loading || events.length === 0) return;

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 95%",
					toggleActions: "play none none none",
				},
			});

			tl.fromTo(
				".news-header",
				{ y: 35, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
			).fromTo(
				".news-card",
				{ y: 35, opacity: 0 },
				{ y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
				"-=0.5",
			);
		}, sectionRef);

		return () => ctx.revert();
	}, [loading, events]);

	if (loading) {
		return <NewsletterSkeleton />;
	}

	if (events.length === 0) {
		return null; // Don't show the section if there are no events
	}

	return (
		<section
			ref={sectionRef}
			id="news"
			className="w-full bg-[#f8f9fa] py-24 sm:py-32"
		>
			<div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
					<div className="max-w-2xl news-header">
						<h2 className="font-display text-navy-900 text-4xl sm:text-5xl font-semibold leading-tight mb-6">
							Latest News & Events
						</h2>
						<p className="text-gray-600 text-lg leading-relaxed">
							Stay updated with our most recent activities, workshops, and
							milestones as we continue to build and support Nigerian
							enterprises.
						</p>
					</div>
					<Link
						href="/events"
						className="news-header hidden md:flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
					>
						View All Events
						<ArrowRight className="w-4 h-4" />
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{events.map((event) => (
						<Link
							href={`/events/${event.id}`}
							key={event.id}
							className="news-card group block bg-white rounded-[2rem] overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
						>
							<div className="relative w-full h-64 bg-gray-100 overflow-hidden">
								{event.images && event.images.length > 0 ? (
									<Image
										src={event.images[0]}
										alt={event.title}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
									/>
								) : (
									<div className="absolute inset-0 flex items-center justify-center text-gray-300">
										<ImageIcon className="w-12 h-12" />
									</div>
								)}
								<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-navy-900 shadow-sm flex items-center gap-2">
									<Calendar className="w-4 h-4 text-blue-600" />
									{new Date(event.date).toLocaleDateString(undefined, {
										month: "short",
										day: "numeric",
										year: "numeric",
									})}
								</div>
							</div>

							<div className="p-8">
								<h3 className="text-2xl font-display font-semibold text-navy-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
									{event.title}
								</h3>
								<p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
									{event.short_description}
								</p>
								<div className="flex items-center text-blue-600 font-medium group-hover:gap-3 transition-all gap-2">
									Read Full Story
									<ArrowRight className="w-4 h-4" />
								</div>
							</div>
						</Link>
					))}
				</div>

				<div className="mt-12 text-center md:hidden">
					<Link
						href="/events"
						className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
					>
						View All Events
						<ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}
