"use client";

import { ArrowRight, Lock, Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Background from "@/components/Background";

export default function AdminLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setError(error.message);
		}
		setLoading(false);
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-white">
			{/* Brand-consistent dynamic background */}
			<Background />

			<div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(15,27,51,0.08)] border border-white/60 w-full max-w-md relative z-10 transition-all duration-300">
				<div className="mb-8 text-center">
					<h2 className="text-3xl font-display font-semibold text-navy-950 tracking-tight mb-2">
						Admin Access
					</h2>
					<p className="text-gray-500 text-sm">Sign in to manage NATCO events.</p>
				</div>

				{error && (
					<div className="mb-6 p-4 bg-red-50/80 border border-red-100 text-red-600 rounded-xl text-sm text-center font-medium">
						{error}
					</div>
				)}

				<form onSubmit={handleLogin} className="space-y-5">
					<div>
						<label
							className="block text-xs font-semibold text-navy-900/60 uppercase tracking-wider mb-2"
							htmlFor="email"
						>
							Email Address
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
								<Mail className="h-5 w-5 text-gray-400" />
							</div>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="block w-full pl-11 pr-4 py-3 bg-white/70 border border-gray-200/80 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all shadow-sm"
								placeholder="admin@example.com"
							/>
						</div>
					</div>

					<div>
						<label
							className="block text-xs font-semibold text-navy-900/60 uppercase tracking-wider mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
								<Lock className="h-5 w-5 text-gray-400" />
							</div>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="block w-full pl-11 pr-4 py-3 bg-white/70 border border-gray-200/80 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white transition-all shadow-sm"
								placeholder="••••••••"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full flex items-center justify-center gap-2 bg-navy-900 text-white py-3.5 px-4 rounded-xl font-medium transition-all hover:bg-navy-850 hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed mt-4 cursor-pointer"
					>
						{loading ? "Signing in..." : "Sign In"}
						{!loading && <ArrowRight className="w-4 h-4" />}
					</button>
				</form>
			</div>
		</div>
	);
}
