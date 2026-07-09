"use client";

import {
	Calendar,
	Edit,
	Image as ImageIcon,
	Plus,
	Trash2,
	X,
	CheckCircle,
	AlertCircle,
} from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
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

	// Feedback & Confirmation States
	const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
	const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

	const fetchEvents = useCallback(async () => {
		const { data, error } = await supabase
			.from("events")
			.select("*")
			.order("date", { ascending: false });

		if (error) {
			setToast({
				message: error.message || "Failed to load events.",
				type: "error",
			});
		} else if (data) {
			setEvents(data);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		fetchEvents();
	}, [fetchEvents]);

	// Auto-dismiss toast
	useEffect(() => {
		if (toast) {
			const timer = setTimeout(() => setToast(null), 3500);
			return () => clearTimeout(timer);
		}
	}, [toast]);

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

			if (uploadError) {
				throw uploadError;
			}

			if (data) {
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

		try {
			const newImageUrls = await uploadImages();
			const allImages = [...existingImages, ...newImageUrls];

			const eventData = {
				title,
				short_description: shortDesc,
				writeup,
				date,
				images: allImages,
			};

			const { error } = editingId
				? await supabase.from("events").update(eventData).eq("id", editingId)
				: await supabase.from("events").insert([eventData]);

			if (error) throw error;

			setToast({
				message: editingId ? "Event updated successfully!" : "Event created successfully!",
				type: "success",
			});
			resetForm();
			fetchEvents();
		} catch (err: unknown) {
			const errorMsg = err instanceof Error ? err.message : "An error occurred while saving the event.";
			setToast({
				message: errorMsg,
				type: "error",
			});
		} finally {
			setUploading(false);
		}
	};

	const confirmDelete = async () => {
		if (!deleteConfirmId) return;

		try {
			const { error } = await supabase
				.from("events")
				.delete()
				.eq("id", deleteConfirmId);

			if (error) throw error;

			setToast({
				message: "Event deleted successfully!",
				type: "success",
			});
			fetchEvents();
		} catch (err: unknown) {
			const errorMsg = err instanceof Error ? err.message : "Failed to delete the event.";
			setToast({
				message: errorMsg,
				type: "error",
			});
		} finally {
			setDeleteConfirmId(null);
		}
	};

	const removeExistingImage = (indexToRemove: number) => {
		setExistingImages(
			existingImages.filter((_, index) => index !== indexToRemove),
		);
	};

	return (
		<div className="max-w-5xl mx-auto px-6 py-12 relative">
			<div className="flex justify-between items-center mb-10">
				<div>
					<h2 className="text-3xl font-display font-semibold text-navy-950 mb-1.5 tracking-tight">
						Events
					</h2>
					<p className="text-gray-500 text-sm">Manage newsletters and events.</p>
				</div>
				{!isFormOpen && (
					<button
						onClick={() => setIsFormOpen(true)}
						className="flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-navy-850 transition-all hover:shadow-md cursor-pointer"
					>
						<Plus className="w-5 h-5" />
						Add Event
					</button>
				)}
			</div>

			{isFormOpen && (
				<div className="bg-white p-8 rounded-[2rem] border border-gray-100 mb-12 shadow-[0_10px_30px_rgba(15,27,51,0.04)] transition-all duration-300">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-2xl font-display font-semibold text-navy-950 tracking-tight">
							{editingId ? "Edit Event" : "Create New Event"}
						</h3>
						<button
							onClick={resetForm}
							className="text-gray-400 hover:text-navy-950 transition-colors p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="event-title" className="block text-xs font-semibold text-navy-900/60 uppercase tracking-wider mb-2">
									Event Title
								</label>
								<input
									type="text"
									id="event-title"
									required
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									disabled={uploading}
									className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400 shadow-sm"
									placeholder="e.g. Annual NATCO Summit"
								/>
							</div>
							<div>
								<label htmlFor="event-date" className="block text-xs font-semibold text-navy-900/60 uppercase tracking-wider mb-2">
									Event Date
								</label>
								<input
									type="date"
									id="event-date"
									required
									value={date}
									onChange={(e) => setDate(e.target.value)}
									disabled={uploading}
									className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 shadow-sm"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="event-desc" className="block text-xs font-semibold text-navy-900/60 uppercase tracking-wider mb-2">
								Short Description
							</label>
							<textarea
								id="event-desc"
								required
								value={shortDesc}
								onChange={(e) => setShortDesc(e.target.value)}
								disabled={uploading}
								className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400 shadow-sm"
								rows={2}
								placeholder="Brief summary for the event card..."
							/>
						</div>

						<div>
							<label htmlFor="event-writeup" className="block text-xs font-semibold text-navy-900/60 uppercase tracking-wider mb-2">
								Full Event Writeup
							</label>
							<textarea
								id="event-writeup"
								required
								value={writeup}
								onChange={(e) => setWriteup(e.target.value)}
								disabled={uploading}
								className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400 shadow-sm"
								rows={6}
								placeholder="Detailed information about the event..."
							/>
						</div>

						<div>
							<label className="block text-xs font-semibold text-navy-900/60 uppercase tracking-wider mb-2">
								Images
							</label>

							{/* Existing Images */}
							{existingImages.length > 0 && (
								<div className="flex gap-4 mb-4 overflow-x-auto pb-2">
									{existingImages.map((img, idx) => (
										<div
											key={idx}
											className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-sm"
										>
											<Image
												src={img}
												alt="Event image"
												fill
												className="object-cover"
											/>
											<button
												type="button"
												disabled={uploading}
												onClick={() => removeExistingImage(idx)}
												className="absolute top-1.5 right-1.5 bg-white/90 p-1 rounded-full text-red-600 hover:bg-white shadow transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
											>
												<X className="w-3.5 h-3.5" />
											</button>
										</div>
									))}
								</div>
							)}

							{/* Upload New */}
							<div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-gray-50/50 hover:border-blue-500/40 transition-all">
								<input
									type="file"
									multiple
									accept="image/*"
									disabled={uploading}
									onChange={(e) => setFiles(e.target.files)}
									className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
								/>
								<ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
								<p className="text-gray-600 font-medium text-sm">
									Click to upload images or drag and drop
								</p>
								{files && files.length > 0 && (
									<p className="text-xs text-blue-600 font-medium mt-2">
										{files.length} file(s) selected
									</p>
								)}
							</div>
						</div>

						<div className="flex justify-end pt-4 gap-3">
							<button
								type="button"
								onClick={resetForm}
								disabled={uploading}
								className="px-6 py-3 border border-gray-200 text-gray-650 hover:bg-gray-50 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
							>
								Cancel
							</button>
							<button
								type="submit"
								disabled={uploading}
								className="bg-navy-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-navy-850 hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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
				<div className="flex flex-col items-center justify-center py-24 gap-4">
					<div className="w-10 h-10 border-4 border-blue-100 border-t-navy-900 rounded-full animate-spin" />
					<p className="text-navy-900/60 text-sm font-medium animate-pulse">Loading events...</p>
				</div>
			) : events.length === 0 ? (
				<div className="text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(15,27,51,0.02)]">
					<Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
					<h3 className="text-xl font-medium text-navy-900 mb-2">
						No events found
					</h3>
					<p className="text-gray-500 text-sm">
						Click &ldquo;Add Event&rdquo; to create your first newsletter event.
					</p>
				</div>
			) : (
				<div className="grid gap-4">
					{events.map((event) => (
						<div
							key={event.id}
							className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between group hover:shadow-md hover:border-gray-200/80 transition-all duration-300"
						>
							<div className="flex items-center gap-6 flex-grow">
								{event.images && event.images.length > 0 ? (
									<div className="w-20 h-20 rounded-xl overflow-hidden relative flex-shrink-0 bg-gray-50 border border-gray-100 shadow-sm">
										<Image
											src={event.images[0]}
											alt={event.title}
											fill
											className="object-cover"
										/>
									</div>
								) : (
									<div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
										<ImageIcon className="w-7 h-7 text-gray-300" />
									</div>
								)}
								<div>
									<h3 className="text-lg font-semibold text-navy-950 mb-1.5 group-hover:text-blue-600 transition-colors">
										{event.title}
									</h3>
									<div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
										<span className="flex items-center gap-1">
											<Calendar className="w-4 h-4 text-gray-400" />{" "}
											{new Date(event.date).toLocaleDateString()}
										</span>
									</div>
								</div>
							</div>
							<div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-50">
								<button
									onClick={() => openEditForm(event)}
									className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors cursor-pointer"
									title="Edit"
								>
									<Edit className="w-5 h-5" />
								</button>
								<button
									onClick={() => setDeleteConfirmId(event.id)}
									className="p-2 text-gray-500 hover:text-red-650 hover:bg-red-50/50 rounded-lg transition-colors cursor-pointer"
									title="Delete"
								>
									<Trash2 className="w-5 h-5" />
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Custom Confirmation Modal */}
			{deleteConfirmId && (
				<div className="fixed inset-0 bg-navy-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-[2rem] p-8 max-w-sm w-full border border-gray-100 shadow-[0_20px_50px_rgba(15,27,51,0.15)] transform scale-100 transition-all">
						<h3 className="text-xl font-display font-semibold text-navy-950 mb-3">
							Delete Event?
						</h3>
						<p className="text-gray-500 text-sm mb-6 leading-relaxed">
							Are you sure you want to delete this event? This action cannot be undone.
						</p>
						<div className="flex gap-3 justify-end">
							<button
								onClick={() => setDeleteConfirmId(null)}
								className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors cursor-pointer"
							>
								Cancel
							</button>
							<button
								onClick={confirmDelete}
								className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition-colors cursor-pointer"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Toast Notifications */}
			{toast && (
				<div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-navy-950 text-white px-5 py-4 rounded-2xl shadow-xl border border-navy-900/50">
					{toast.type === "success" ? (
						<CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
					) : (
						<AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
					)}
					<span className="text-sm font-medium pr-1">{toast.message}</span>
					<button
						onClick={() => setToast(null)}
						className="text-white/40 hover:text-white transition-colors ml-auto cursor-pointer"
					>
						<X className="w-4 h-4" />
					</button>
				</div>
			)}
		</div>
	);
}
