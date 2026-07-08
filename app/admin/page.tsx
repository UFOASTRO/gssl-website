"use client";

import {
	Calendar,
	Edit,
	Image as ImageIcon,
	Plus,
	Trash2,
	X,
} from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Event = {
	id: string;
	title: string;
	short_description: string;
	writeup: string;
	date: string;
	images: string[];
};

export default function AdminDashboard() {
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const [isFormOpen, setIsFormOpen] = useState(false);

	// Form State
	const [editingId, setEditingId] = useState<string | null>(null);
	const [title, setTitle] = useState("");
	const [shortDesc, setShortDesc] = useState("");
	const [writeup, setWriteup] = useState("");
	const [date, setDate] = useState("");
	const [existingImages, setExistingImages] = useState<string[]>([]);
	const [files, setFiles] = useState<FileList | null>(null);
	const [uploading, setUploading] = useState(false);

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		setLoading(true);
		const { data, error } = await supabase
			.from("events")
			.select("*")
			.order("date", { ascending: false });

		if (!error && data) {
			setEvents(data);
		}
		setLoading(false);
	};

	const resetForm = () => {
		setEditingId(null);
		setTitle("");
		setShortDesc("");
		setWriteup("");
		setDate("");
		setExistingImages([]);
		setFiles(null);
		setIsFormOpen(false);
	};

	const openEditForm = (event: Event) => {
		setEditingId(event.id);
		setTitle(event.title);
		setShortDesc(event.short_description);
		setWriteup(event.writeup);
		setDate(event.date);
		setExistingImages(event.images || []);
		setFiles(null);
		setIsFormOpen(true);
	};

	const uploadImages = async () => {
		if (!files || files.length === 0) return [];
		const uploadedUrls: string[] = [];

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const fileExt = file.name.split(".").pop();
			const fileName = `${Math.random()}.${fileExt}`;
			const filePath = `${fileName}`;

			const { error: uploadError, data } = await supabase.storage
				.from("events")
				.upload(filePath, file);

			if (!uploadError && data) {
				const { data: publicUrlData } = supabase.storage
					.from("events")
					.getPublicUrl(filePath);
				uploadedUrls.push(publicUrlData.publicUrl);
			}
		}
		return uploadedUrls;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setUploading(true);

		const newImageUrls = await uploadImages();
		const allImages = [...existingImages, ...newImageUrls];

		const eventData = {
			title,
			short_description: shortDesc,
			writeup,
			date,
			images: allImages,
		};

		if (editingId) {
			await supabase.from("events").update(eventData).eq("id", editingId);
		} else {
			await supabase.from("events").insert([eventData]);
		}

		setUploading(false);
		resetForm();
		fetchEvents();
	};

	const handleDelete = async (id: string) => {
		if (confirm("Are you sure you want to delete this event?")) {
			await supabase.from("events").delete().eq("id", id);
			fetchEvents();
		}
	};

	const removeExistingImage = (indexToRemove: number) => {
		setExistingImages(
			existingImages.filter((_, index) => index !== indexToRemove),
		);
	};

	return (
		<div className="max-w-5xl mx-auto px-6 py-12">
			<div className="flex justify-between items-center mb-10">
				<div>
					<h2 className="text-3xl font-display font-semibold text-navy-900 mb-2">
						Events
					</h2>
					<p className="text-gray-500">Manage newsletters and events.</p>
				</div>
				{!isFormOpen && (
					<button
						onClick={() => setIsFormOpen(true)}
						className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors"
					>
						<Plus className="w-5 h-5" />
						Add Event
					</button>
				)}
			</div>

			{isFormOpen && (
				<div className="bg-white p-8 rounded-[2rem] border border-gray-200 mb-12 shadow-sm">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-2xl font-display font-semibold text-navy-900">
							{editingId ? "Edit Event" : "Create New Event"}
						</h3>
						<button
							onClick={resetForm}
							className="text-gray-400 hover:text-gray-700"
						>
							<X className="w-6 h-6" />
						</button>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">
									Event Title
								</label>
								<input
									type="text"
									required
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
									placeholder="e.g. Annual NATCO Summit"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1.5">
									Event Date
								</label>
								<input
									type="date"
									required
									value={date}
									onChange={(e) => setDate(e.target.value)}
									className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								Short Description
							</label>
							<textarea
								required
								value={shortDesc}
								onChange={(e) => setShortDesc(e.target.value)}
								className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
								rows={2}
								placeholder="Brief summary for the event card..."
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								Full Event Writeup
							</label>
							<textarea
								required
								value={writeup}
								onChange={(e) => setWriteup(e.target.value)}
								className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
								rows={6}
								placeholder="Detailed information about the event..."
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1.5">
								Images
							</label>

							{/* Existing Images */}
							{existingImages.length > 0 && (
								<div className="flex gap-4 mb-4 overflow-x-auto pb-2">
									{existingImages.map((img, idx) => (
										<div
											key={idx}
											className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200"
										>
											<Image
												src={img}
												alt="Event image"
												fill
												className="object-cover"
											/>
											<button
												type="button"
												onClick={() => removeExistingImage(idx)}
												className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-600 hover:bg-white"
											>
												<X className="w-4 h-4" />
											</button>
										</div>
									))}
								</div>
							)}

							{/* Upload New */}
							<div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors">
								<input
									type="file"
									multiple
									accept="image/*"
									onChange={(e) => setFiles(e.target.files)}
									className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
								/>
								<ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
								<p className="text-gray-600 font-medium">
									Click to upload images or drag and drop
								</p>
								{files && files.length > 0 && (
									<p className="text-sm text-blue-600 mt-2">
										{files.length} file(s) selected
									</p>
								)}
							</div>
						</div>

						<div className="flex justify-end pt-4">
							<button
								type="submit"
								disabled={uploading}
								className="bg-navy-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-navy-800 transition-colors disabled:opacity-70"
							>
								{uploading
									? "Saving..."
									: editingId
										? "Update Event"
										: "Save Event"}
							</button>
						</div>
					</form>
				</div>
			)}

			{loading ? (
				<div className="text-center py-20 text-gray-500">Loading events...</div>
			) : events.length === 0 ? (
				<div className="text-center py-20 bg-white rounded-[2rem] border border-gray-200">
					<Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
					<h3 className="text-xl font-medium text-navy-900 mb-2">
						No events found
					</h3>
					<p className="text-gray-500">
						Click "Add Event" to create your first newsletter event.
					</p>
				</div>
			) : (
				<div className="grid gap-4">
					{events.map((event) => (
						<div
							key={event.id}
							className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between group hover:shadow-md transition-all"
						>
							<div className="flex items-center gap-6 flex-grow">
								{event.images && event.images.length > 0 ? (
									<div className="w-20 h-20 rounded-xl overflow-hidden relative flex-shrink-0 bg-gray-100">
										<Image
											src={event.images[0]}
											alt={event.title}
											fill
											className="object-cover"
										/>
									</div>
								) : (
									<div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
										<ImageIcon className="w-8 h-8 text-gray-300" />
									</div>
								)}
								<div>
									<h3 className="text-lg font-semibold text-navy-900 mb-1">
										{event.title}
									</h3>
									<div className="flex items-center gap-3 text-sm text-gray-500">
										<span className="flex items-center gap-1">
											<Calendar className="w-4 h-4" />{" "}
											{new Date(event.date).toLocaleDateString()}
										</span>
									</div>
								</div>
							</div>
							<div className="flex items-center gap-2 w-full sm:w-auto justify-end">
								<button
									onClick={() => openEditForm(event)}
									className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
									title="Edit"
								>
									<Edit className="w-5 h-5" />
								</button>
								<button
									onClick={() => handleDelete(event.id)}
									className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
									title="Delete"
								>
									<Trash2 className="w-5 h-5" />
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
