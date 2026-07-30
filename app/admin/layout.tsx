"use client";

import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const checkUser = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (!session && pathname !== "/admin/login") {
				router.push("/admin/login");
			} else if (session && pathname === "/admin/login") {
				router.push("/admin");
			}
			setLoading(false);
		};

		checkUser();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			if (!session && pathname !== "/admin/login") {
				router.push("/admin/login");
			} else if (session && pathname === "/admin/login") {
				router.push("/admin");
			}
		});

		return () => subscription.unsubscribe();
	}, [pathname, router]);

	if (loading) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-400/5 pointer-events-none" />
				<div className="relative z-10 flex flex-col items-center gap-4">
					<div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
					<p className="text-navy-700 text-sm font-medium tracking-wide animate-pulse">
						Verifying session...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 font-sans">
			{pathname !== "/admin/login" && (
				<header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-50 relative">
					<div className="flex items-center gap-8">
						<h1 className="font-display font-semibold text-xl text-navy-900 tracking-tight">
							GSSL Admin
						</h1>
						<nav className="hidden sm:flex items-center gap-4">
							<a href="/admin" className={`text-sm font-medium transition-colors ${pathname === '/admin' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>
								Events
							</a>
							<a href="/admin/projects" className={`text-sm font-medium transition-colors ${pathname === '/admin/projects' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}>
								Projects
							</a>
						</nav>
					</div>
					<div className="flex items-center gap-4">
						<button
							onClick={() => supabase.auth.signOut()}
							className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
						>
							Sign Out
						</button>
					</div>
				</header>
			)}
			<main className="relative z-10">{children}</main>
		</div>
	);
}
