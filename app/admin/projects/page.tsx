"use client";

import {
	FolderGit2,
	Edit,
	Plus,
	Trash2,
	X,
	CheckCircle,
	AlertCircle,
	Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
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

export default function ProjectsAdmin() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [isFormOpen, setIsFormOpen] = useState(false);

	// Form State
	const [editingId, setEditingId] = useState<string | null>(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [tag, setTag] = useState("Ongoing Project");
	const [date, setDate] = useState("");
	const [link, setLink] = useState("#");
	const [existingImage, setExistingImage] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);

	// Feedback & Confirmation States
	const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
	const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

	const fetchProjects = useCallback(async () => {
		const { data, error } = await supabase
			.from("projects")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) {
			setToast({
				message: error.message || "Failed to load projects.",
				type: "error",
			});
		} else if (data) {
			setProjects(data);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);

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
		setDescription("");
		setTag("Ongoing Project");
		setDate("");
		setLink("#");
		setExistingImage(null);
		setFile(null);
		setIsFormOpen(false);
	};

	const openEditForm = (project: Project) => {
		setEditingId(project.id);
		setTitle(project.title);
		setDescription(project.description);
		setTag(project.tag);
		setDate(project.date);
		setLink(project.link);
		setExistingImage(project.image_url || null);
		setFile(null);
		setIsFormOpen(true);
	};

	const uploadImage = async () => {
		if (!file) return null;
		
		const fileExt = file.name.split(".").pop();
		const fileName = `${Math.random()}.${fileExt}`;
		const filePath = `${fileName}`;

		// We use the "projects" bucket (make sure it's created in Supabase storage and public)
		const { error: uploadError, data } = await supabase.storage
			.from("projects")
			.upload(filePath, file);

		if (uploadError) {
			// fallback to events bucket if projects doesn't exist
			const { error: eventsUploadError, data: eventsData } = await supabase.storage
				.from("events")
				.upload(`projects/${filePath}`, file);
				
			if (eventsUploadError) throw eventsUploadError;
			
			const { data: publicUrlData } = supabase.storage
				.from("events")
				.getPublicUrl(`projects/${filePath}`);
			return publicUrlData.publicUrl;
		}

		if (data) {
			const { data: publicUrlData } = supabase.storage
				.from("projects")
				.getPublicUrl(filePath);
			return publicUrlData.publicUrl;
		}
		
		return null;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setUploading(true);

		try {
			const newImageUrl = await uploadImage();
			const finalImageUrl = newImageUrl || existingImage || "";

			const projectData = {
				title,
				description,
				tag,
				date,
				link,
				image_url: finalImageUrl,
			};

			const { error } = editingId
				? await supabase.from("projects").update(projectData).eq("id", editingId)
				: await supabase.from("projects").insert([projectData]);

			if (error) throw error;

			setToast({
				message: editingId ? "Project updated successfully!" : "Project created successfully!",
				type: "success",
			});
			resetForm();
			fetchProjects();
		} catch (err: unknown) {
			const errorMsg = err instanceof Error ? err.message : "An error occurred while saving the project.";
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
				.from("projects")
				.delete()
				.eq("id", deleteConfirmId);

			if (error) throw error;

			setToast({
				message: "Project deleted successfully!",
				type: "success",
			});
			fetchProjects();
		} catch (err: unknown) {
			const errorMsg = err instanceof Error ? err.message : "Failed to delete the project.";
			setToast({
				message: errorMsg,
				type: "error",
			});
		} finally {
			setDeleteConfirmId(null);
		}
	};

	return (
		<div className="max-w-5xl mx-auto px-6 py-12 relative">
			<div className="flex justify-between items-center mb-10">
				<div>
					<h2 className="text-3xl font-display font-semibold text-navy-950 mb-1.5 tracking-tight">
						Projects
					</h2>
					<p className="text-gray-500 text-sm">Manage ongoing projects and news updates for the website modal.</p>
				</div>
				{!isFormOpen && (
					<button
						onClick={() => setIsFormOpen(true)}
						className="flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-navy-850 transition-all hover:shadow-md cursor-pointer"
					>
						<Plus className="w-5 h-5" />
						Add Project
					</button>
				)}
			</div>

			{isFormOpen && (
				<div className="bg-white p-8 rounded-[2rem] border border-gray-100 mb-12 shadow-[0_10px_30px_rgba(15,27,51,0.04)] transition-all duration-300">
					<div className="flex justify-between items-center mb-6">
						<h3 className="text-2xl font-display font-semibold text-navy-950 tracking-tight">
							{editingId ? "Edit Project" : "Create New Project"}
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
								<label htmlFor="project-title" className="block text-xs font-semibold text-navy-900/60 uppercase tracking-wider mb-2">
									Project Title
								</label>
								<input
									type="text"
									id="project-title"
									required
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									disabled={uploading}
									className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400 shadow-sm"
									placeholder="e.g. Oyo State Raffle Project"
								/>
							</div>
							<div>
								<label htmlFor="project-date" className="block text-xs font-semibold text-navy-900/60 uppercase tracking-wider mb-2">
									Date/Duration Text
								</label>
								<input
									type="text"
									id="project-date"
									required
									value={date}
									onChange={(e) => setDate(e.target.value)}
									disabled={uploading}
									placeholder="e.g. Jul 2026 or Ongoing"
									className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 shadow-sm"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="project-tag" className="block text-xs font-semibold text-navy-900/60 uppercase tracking-wider mb-2">
									Category Tag
								</label>
								<input
									type="text"
									id="project-tag"
									required
									value={tag}
									onChange={(e) => setTag(e.target.value)}
									disabled={uploading}
									className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400 shadow-sm"
									placeholder="e.g. Ongoing Project"
								/>
							</div>
							<div>
								<label htmlFor="project-link" className="block text-xs font-semibold text-navy-900/60 uppercase tracking-wider mb-2">
									Read More Link
								</label>
								<input
									type="text"
									id="project-link"
									required
									value={link}
									onChange={(e) => setLink(e.target.value)}
									disabled={uploading}
									placeholder="e.g. # or /projects/raffle"
									className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 shadow-sm"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="project-desc" className="block text-xs font-semibold text-navy-900/60 uppercase tracking-wider mb-2">
								Short Description
							</label>
							<textarea
								id="project-desc"
								required
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								disabled={uploading}
								className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400 shadow-sm"
								rows={3}
								placeholder="Brief summary for the modal card..."
							/>
						</div>

						<div>
							<label className="block text-xs font-semibold text-navy-900/60 uppercase tracking-wider mb-2">
								Project Flyer/Image
							</label>

							{/* Existing Image */}
							{existingImage && !file && (
								<div className="relative w-48 h-32 rounded-xl overflow-hidden mb-4 shadow-sm border border-gray-100">
									<Image
										src={existingImage}
										alt="Project image"
										fill
										unoptimized
										className="object-cover"
									/>
									<button
										type="button"
										disabled={uploading}
										onClick={() => setExistingImage(null)}
										className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-600 hover:bg-white shadow transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
									>
										<X className="w-4 h-4" />
									</button>
								</div>
							)}

							{/* Upload New */}
							{(!existingImage || file) && (
								<div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-gray-50/50 hover:border-blue-500/40 transition-all">
									<input
										type="file"
										accept="image/*"
										disabled={uploading}
										onChange={(e) => {
											if (e.target.files && e.target.files[0]) {
												setFile(e.target.files[0]);
											}
										}}
										className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
									/>
									<ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
									<p className="text-gray-600 font-medium text-sm">
										Click to upload flyer or drag and drop
									</p>
									{file && (
										<p className="text-xs text-blue-600 font-medium mt-2">
											{file.name} selected
										</p>
									)}
								</div>
							)}
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
										? "Update Project"
										: "Save Project"}
							</button>
						</div>
					</form>
				</div>
			)}

			{loading ? (
				<div className="flex flex-col items-center justify-center py-24 gap-4">
					<div className="w-10 h-10 border-4 border-blue-100 border-t-navy-900 rounded-full animate-spin" />
					<p className="text-navy-900/60 text-sm font-medium animate-pulse">Loading projects...</p>
				</div>
			) : projects.length === 0 ? (
				<div className="text-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(15,27,51,0.02)]">
					<FolderGit2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
					<h3 className="text-xl font-medium text-navy-900 mb-2">
						No projects found
					</h3>
					<p className="text-gray-500 text-sm">
						Click &ldquo;Add Project&rdquo; to create your first project for the modal.
					</p>
				</div>
			) : (
				<div className="grid gap-4">
					{projects.map((project) => (
						<div
							key={project.id}
							className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between group hover:shadow-md hover:border-gray-200/80 transition-all duration-300"
						>
							<div className="flex items-center gap-6 flex-grow">
								{project.image_url ? (
									<div className="w-16 h-16 rounded-xl overflow-hidden relative flex-shrink-0 bg-gray-50 border border-gray-100 shadow-sm">
										<Image
											src={project.image_url}
											alt={project.title}
											fill
											unoptimized
											className="object-cover"
										/>
									</div>
								) : (
									<div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100">
										<FolderGit2 className="w-7 h-7 text-blue-500" />
									</div>
								)}
								<div>
									<h3 className="text-lg font-semibold text-navy-950 mb-1.5 group-hover:text-blue-600 transition-colors">
										{project.title}
									</h3>
									<div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
										<span className="bg-gray-100 px-2 py-0.5 rounded-full">{project.tag}</span>
										<span>•</span>
										<span>{project.date}</span>
									</div>
								</div>
							</div>
							<div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-50">
								<button
									onClick={() => openEditForm(project)}
									className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors cursor-pointer"
									title="Edit"
								>
									<Edit className="w-5 h-5" />
								</button>
								<button
									onClick={() => setDeleteConfirmId(project.id)}
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
							Delete Project?
						</h3>
						<p className="text-gray-500 text-sm mb-6 leading-relaxed">
							Are you sure you want to delete this project? This action cannot be undone.
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
