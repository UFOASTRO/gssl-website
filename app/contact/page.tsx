"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";

export default function ContactPage() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		message: "",
	});

	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
		message: "",
	});

	const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

	useEffect(() => {
		// Focus the input when the step changes, with a small delay for animation
		const timer = setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.focus();
			}
		}, 400); // wait for enter animation
		return () => clearTimeout(timer);
	}, [step]);

	const validateStep = () => {
		let isValid = true;
		const newErrors = { firstName: "", lastName: "", email: "", message: "" };

		if (step === 1) {
			if (!formData.firstName.trim()) {
				newErrors.firstName = "First name is required";
				isValid = false;
			}
			if (!formData.lastName.trim()) {
				newErrors.lastName = "Last name is required";
				isValid = false;
			}
		} else if (step === 2) {
			if (!formData.email.trim()) {
				newErrors.email = "Email is required";
				isValid = false;
			} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
				newErrors.email = "Please enter a valid email address";
				isValid = false;
			}
		} else if (step === 3) {
			if (!formData.message.trim()) {
				newErrors.message = "Message cannot be empty";
				isValid = false;
			}
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleNext = () => {
		if (validateStep() && step < 4) {
			setStep((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		if (step > 1 && step < 4) setStep((prev) => prev - 1);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleNext();
		}
	};

	// Animation variants
	const stepVariants = {
		initial: { opacity: 0, scale: 0.95, y: 20 },
		animate: { opacity: 1, scale: 1, y: 0 },
		exit: { opacity: 0, scale: 0.95, y: -20 }, // Exit upwards slightly
	};

	const transitionProps = {
		type: "spring" as const,
		damping: 25,
		stiffness: 300,
	};

	return (
		<main className="min-h-screen bg-[#f8f9fa] flex flex-col pt-24 pb-12 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
			{/* Decorative Blur */}
			<div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

			<div className="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center relative z-10">
				<div className="mb-12">
					<Link
						href="/"
						className="inline-flex items-center text-gray-500 hover:text-navy-900 transition-colors font-medium"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Home
					</Link>
				</div>

				{/* Step Indicator & Progress */}
				{step < 4 && (
					<div className="mb-8 w-full">
						<div className="flex justify-between items-center mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
							<button
								onClick={() => setStep(1)}
								className={`transition-colors hover:text-navy-900 ${step === 1 ? "text-blue-600 font-bold" : ""}`}
							>
								1. Name
							</button>
							<div className="h-[2px] flex-1 bg-gray-200 mx-4" />
							<button
								onClick={() => {
									if (formData.firstName && formData.lastName) setStep(2);
								}}
								disabled={!formData.firstName || !formData.lastName}
								className={`transition-colors disabled:opacity-50 disabled:hover:text-gray-400 ${step === 2 ? "text-blue-600 font-bold" : ""} ${formData.firstName && formData.lastName ? "hover:text-navy-900" : ""}`}
							>
								2. Email
							</button>
							<div className="h-[2px] flex-1 bg-gray-200 mx-4" />
							<button
								onClick={() => {
									if (
										formData.firstName &&
										formData.lastName &&
										formData.email &&
										formData.email.includes("@")
									)
										setStep(3);
								}}
								disabled={
									!formData.firstName ||
									!formData.lastName ||
									!formData.email ||
									!formData.email.includes("@")
								}
								className={`transition-colors disabled:opacity-50 disabled:hover:text-gray-400 ${step === 3 ? "text-blue-600 font-bold" : ""} ${formData.firstName && formData.lastName && formData.email ? "hover:text-navy-900" : ""}`}
							>
								3. Message
							</button>
						</div>
						<div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
							<div
								className="h-full bg-blue-600 transition-all duration-500 ease-out"
								style={{ width: `${(step / 3) * 100}%` }}
							/>
						</div>
					</div>
				)}

				<div className="bg-white rounded-[24px] p-8 sm:p-12 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 min-h-[400px] flex flex-col justify-center relative overflow-hidden">
					<AnimatePresence mode="wait">
						{/* Step 1: Name */}
						{step === 1 && (
							<motion.div
								key="step1"
								variants={stepVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={transitionProps}
								className="w-full"
							>
								<h1 className="text-3xl md:text-4xl font-display font-semibold text-navy-900 mb-8">
									Let&apos;s start with your name.
								</h1>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
									<div>
										<label className="text-sm font-semibold text-gray-500 mb-2 block">
											First Name
										</label>
										<input
											ref={inputRef as React.RefObject<HTMLInputElement>}
											type="text"
											value={formData.firstName}
											onChange={(e) => {
												setFormData({ ...formData, firstName: e.target.value });
												if (errors.firstName)
													setErrors({ ...errors, firstName: "" });
											}}
											onKeyDown={handleKeyDown}
											placeholder="Jane"
											className={`w-full text-2xl border-b-2 pb-4 focus:outline-none bg-transparent transition-colors placeholder:text-gray-300 ${errors.firstName ? "border-red-500 focus:border-red-600" : "border-gray-200 focus:border-blue-600"}`}
										/>
										{errors.firstName && (
											<p className="text-red-500 text-sm mt-2">
												{errors.firstName}
											</p>
										)}
									</div>
									<div>
										<label className="text-sm font-semibold text-gray-500 mb-2 block">
											Last Name
										</label>
										<input
											type="text"
											value={formData.lastName}
											onChange={(e) => {
												setFormData({ ...formData, lastName: e.target.value });
												if (errors.lastName)
													setErrors({ ...errors, lastName: "" });
											}}
											onKeyDown={handleKeyDown}
											placeholder="Doe"
											className={`w-full text-2xl border-b-2 pb-4 focus:outline-none bg-transparent transition-colors placeholder:text-gray-300 ${errors.lastName ? "border-red-500 focus:border-red-600" : "border-gray-200 focus:border-blue-600"}`}
										/>
										{errors.lastName && (
											<p className="text-red-500 text-sm mt-2">
												{errors.lastName}
											</p>
										)}
									</div>
								</div>
								<div className="flex justify-end">
									<button
										onClick={handleNext}
										className="flex items-center gap-2 bg-navy-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-navy-800 transition-colors group"
									>
										Next
										<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
									</button>
								</div>
							</motion.div>
						)}

						{/* Step 2: Email */}
						{step === 2 && (
							<motion.div
								key="step2"
								variants={stepVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={transitionProps}
								className="w-full"
							>
								<h1 className="text-3xl md:text-4xl font-display font-semibold text-navy-900 mb-2">
									Hi {formData.firstName}, what&apos;s your email?
								</h1>
								<p className="text-gray-500 mb-8">
									We&apos;ll use this to get back to you.
								</p>

								<div className="mb-8">
									<input
										ref={inputRef as React.RefObject<HTMLInputElement>}
										type="email"
										value={formData.email}
										onChange={(e) => {
											setFormData({ ...formData, email: e.target.value });
											if (errors.email) setErrors({ ...errors, email: "" });
										}}
										onKeyDown={handleKeyDown}
										placeholder="jane@company.com"
										className={`w-full text-2xl border-b-2 pb-4 focus:outline-none bg-transparent transition-colors placeholder:text-gray-300 ${errors.email ? "border-red-500 focus:border-red-600" : "border-gray-200 focus:border-blue-600"}`}
									/>
									{errors.email && (
										<p className="text-red-500 text-sm mt-2">{errors.email}</p>
									)}
								</div>

								<div className="flex justify-between items-center">
									<button
										onClick={handleBack}
										className="text-gray-500 hover:text-navy-900 font-medium transition-colors"
									>
										Back
									</button>
									<button
										onClick={handleNext}
										className="flex items-center gap-2 bg-navy-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-navy-800 transition-colors group"
									>
										Next
										<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
									</button>
								</div>
							</motion.div>
						)}

						{/* Step 3: Message */}
						{step === 3 && (
							<motion.div
								key="step3"
								variants={stepVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={transitionProps}
								className="w-full"
							>
								<h1 className="text-3xl md:text-4xl font-display font-semibold text-navy-900 mb-2">
									How can we help you?
								</h1>
								<p className="text-gray-500 mb-8">
									Tell us a bit about your project or inquiry.
								</p>

								<div className="mb-8">
									<textarea
										ref={inputRef as React.RefObject<HTMLTextAreaElement>}
										value={formData.message}
										onChange={(e) => {
											setFormData({ ...formData, message: e.target.value });
											if (errors.message) setErrors({ ...errors, message: "" });
										}}
										onKeyDown={handleKeyDown}
										placeholder="Type your message here... (Press Enter to submit)"
										rows={4}
										className={`w-full text-xl border-b-2 pb-4 focus:outline-none bg-transparent transition-colors placeholder:text-gray-300 resize-none ${errors.message ? "border-red-500 focus:border-red-600" : "border-gray-200 focus:border-blue-600"}`}
									/>
									{errors.message && (
										<p className="text-red-500 text-sm mt-2">
											{errors.message}
										</p>
									)}
								</div>

								<div className="flex justify-between items-center">
									<button
										onClick={handleBack}
										className="text-gray-500 hover:text-navy-900 font-medium transition-colors"
									>
										Back
									</button>
									<button
										onClick={handleNext}
										className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors group shadow-lg shadow-blue-600/20"
									>
										Send Message
										<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
									</button>
								</div>
							</motion.div>
						)}

						{/* Step 4: Success */}
						{step === 4 && (
							<motion.div
								key="step4"
								variants={stepVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={transitionProps}
								className="w-full flex flex-col items-center justify-center text-center py-8"
							>
								<div className="relative z-10 mb-6 h-42 w-42">
									<DotLottieReact src="/success.lottie" autoplay loop={false} />
								</div>
								<h1 className="text-3xl md:text-4xl font-display font-semibold text-navy-900 mb-4">
									Message Sent Successfully!
								</h1>
								<p className="text-gray-600 text-lg mb-8 max-w-md">
									Thank you for reaching out, {formData.firstName}. Our team
									will review your message and get back to you shortly at{" "}
									{formData.email}.
								</p>
								<Link
									href="/"
									className="bg-gray-100 text-navy-900 px-8 py-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
								>
									Return to Homepage
								</Link>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{step < 4 && (
					<div className="mt-8 text-center text-sm text-gray-400">
						Press{" "}
						<kbd className="font-sans px-2 py-1 bg-gray-200 text-gray-600 rounded-md mx-1">
							Enter
						</kbd>{" "}
						to continue
					</div>
				)}
			</div>
		</main>
	);
}
