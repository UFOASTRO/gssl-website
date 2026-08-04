"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Project = {
	id: string;
	title: string;
	description: string;
	tag: string;
	date: string;
	link: string;
	image_url: string;
};

export default function ProjectNewsModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [projects, setProjects] = useState<Project[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		
		const fetchProjects = async () => {
			const { data, error } = await supabase
				.from("projects")
				.select("*")
				.order("created_at", { ascending: false });

			// Filter only projects that have an image URL
			const projectsWithImages = data?.filter(p => p.image_url) || [];

			if (!error && projectsWithImages.length > 0) {
				setProjects(projectsWithImages);
				
				// Show modal on every reload
				const timer = setTimeout(() => {
					setIsOpen(true);
				}, 2000); // Popup 2 seconds after load
				return () => clearTimeout(timer);
			}
		};

		fetchProjects();
	}, []);

	// Auto-slide effect
	useEffect(() => {
		if (!isOpen || projects.length <= 1 || isPaused) return;
		
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % projects.length);
		}, 5000); // Slide every 5 seconds
		
		return () => clearInterval(interval);
	}, [isOpen, projects.length, isPaused]);

	const handleClose = () => {
		setIsOpen(false);
	};

	const goToNext = () => {
		setCurrentIndex((prev) => (prev + 1) % projects.length);
	};

	const goToPrev = () => {
		setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
	};

	if (!isMounted) return null;
	if (!isOpen || projects.length === 0) return null;

	const currentProject = projects[currentIndex];

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-navy-950/70 backdrop-blur-md transition-opacity duration-300">
			<div className="relative w-full max-w-3xl bg-transparent rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
				
				{/* Close Button - Positioned outside or in corner */}
				<button
					onClick={handleClose}
					className="absolute top-4 right-4 z-20 p-2 text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors"
					aria-label="Close modal"
				>
					<X className="w-5 h-5" />
				</button>

				{/* Slider Container */}
				<div 
					className="relative w-full aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] bg-navy-900 rounded-2xl overflow-hidden shadow-2xl"
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
				>
					
					{/* Image */}
					{currentProject.image_url ? (
						<Image
							src={currentProject.image_url}
							alt={currentProject.title}
							fill
							unoptimized
							className="object-cover transition-transform duration-700 ease-in-out"
							priority
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center bg-gray-800 text-white/50">
							No Image Available
						</div>
					)}

					{/* Gradient Overlay for Text Readability */}
					<div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />

					{/* Navigation Arrows */}
					{projects.length > 1 && (
						<>
							<button
								onClick={(e) => {
									e.stopPropagation();
									goToPrev();
								}}
								className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
							>
								<ChevronLeft className="w-6 h-6" />
							</button>
							<button
								onClick={(e) => {
									e.stopPropagation();
									goToNext();
								}}
								className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all"
							>
								<ChevronRight className="w-6 h-6" />
							</button>
						</>
					)}

					{/* Content Overlay */}
					<div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
						<div className="max-w-xl">
							<div className="flex items-center gap-3 mb-3">
								<span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-blue-100 bg-blue-600/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
									{currentProject.tag}
								</span>
								<span className="text-xs text-gray-300 font-medium">
									{currentProject.date}
								</span>
							</div>
							<h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 leading-tight">
								{currentProject.title}
							</h3>
							<p className="text-sm sm:text-base text-gray-200 line-clamp-2 sm:line-clamp-3">
								{currentProject.description}
							</p>
						</div>

						{(() => {
							const rawLink = currentProject.link?.trim();
							if (!rawLink || rawLink === "#") return null;
							
							// Strip out all internal spaces that might cause the browser to block the link
							let cleanLink = rawLink.replace(/\s+/g, "");
							
							// Fix common database entry typos like leading #
							if (cleanLink.startsWith("#")) {
								cleanLink = cleanLink.slice(1);
							}
							
							let validUrl = cleanLink;
							if (!validUrl.startsWith("http://") && !validUrl.startsWith("https://") && !validUrl.startsWith("/")) {
								validUrl = `https://${validUrl}`;
							}
							
							if (!validUrl) return null;
							
							return (
								<a
									href={validUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex-shrink-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-medium transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95 whitespace-nowrap"
								>
									Visit Website
									<ExternalLink className="w-4 h-4" />
								</a>
							);
						})()}
					</div>

					{/* Dots Indicator */}
					{projects.length > 1 && (
						<div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
							{projects.map((_, idx) => (
								<button
									key={idx}
									onClick={() => setCurrentIndex(idx)}
									className={`transition-all rounded-full ${
										idx === currentIndex
											? "w-4 h-1.5 bg-white"
											: "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
									}`}
									aria-label={`Go to slide ${idx + 1}`}
								/>
							))}
						</div>
					)}

				</div>
			</div>
		</div>
	);
}
