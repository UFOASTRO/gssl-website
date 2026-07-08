"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState } from "react";
import "yet-another-react-lightbox/styles.css";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
	ssr: false,
});

interface EventGalleryProps {
	images: string[];
	title: string;
}

export default function EventGallery({ images, title }: EventGalleryProps) {
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	if (!images || images.length === 0) return null;

	const openLightbox = (index: number) => {
		setCurrentIndex(index);
		setLightboxOpen(true);
	};

	const slides = images.map((src) => ({ src }));

	// Helper to render an image block
	const renderImageBlock = (index: number, className: string = "") => (
		<div
			key={index}
			onClick={() => openLightbox(index)}
			className={`relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 hover:shadow-md transition-shadow cursor-pointer group ${className}`}
		>
			<Image
				src={images[index]}
				alt={`${title} gallery image ${index + 1}`}
				fill
				className="object-cover group-hover:scale-105 transition-transform duration-500"
				priority={index === 0}
			/>
			<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
		</div>
	);

	return (
		<div className="mb-16">
			<div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[400px] sm:h-[500px] lg:h-[600px]">
				{images.length === 1 && (
					<div className="col-span-1 md:col-span-4 row-span-2 h-full">
						{renderImageBlock(0, "w-full h-full")}
					</div>
				)}

				{images.length === 2 && (
					<>
						<div className="col-span-1 md:col-span-2 row-span-2 h-full">
							{renderImageBlock(0, "w-full h-full")}
						</div>
						<div className="col-span-1 md:col-span-2 row-span-2 h-full">
							{renderImageBlock(1, "w-full h-full")}
						</div>
					</>
				)}

				{images.length === 3 && (
					<>
						<div className="col-span-1 md:col-span-3 row-span-2 h-full">
							{renderImageBlock(0, "w-full h-full")}
						</div>
						<div className="col-span-1 md:col-span-1 row-span-1 h-full">
							{renderImageBlock(1, "w-full h-full")}
						</div>
						<div className="col-span-1 md:col-span-1 row-span-1 h-full">
							{renderImageBlock(2, "w-full h-full")}
						</div>
					</>
				)}

				{images.length >= 4 && (
					<>
						<div className="col-span-1 md:col-span-2 row-span-2 h-full">
							{renderImageBlock(0, "w-full h-full")}
						</div>
						<div className="col-span-1 md:col-span-2 row-span-1 h-full">
							{renderImageBlock(1, "w-full h-full")}
						</div>
						<div className="col-span-1 md:col-span-1 row-span-1 h-full">
							{renderImageBlock(2, "w-full h-full")}
						</div>
						<div
							className="relative col-span-1 md:col-span-1 row-span-1 h-full cursor-pointer group"
							onClick={() => openLightbox(3)}
						>
							{renderImageBlock(3, "w-full h-full absolute inset-0")}
							{images.length > 4 && (
								<div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl z-10 transition-colors group-hover:bg-black/60">
									<span className="text-white text-2xl font-bold font-display">
										+{images.length - 4}
									</span>
								</div>
							)}
						</div>
					</>
				)}
			</div>

			<Lightbox
				open={lightboxOpen}
				close={() => setLightboxOpen(false)}
				index={currentIndex}
				slides={slides}
			/>
		</div>
	);
}
