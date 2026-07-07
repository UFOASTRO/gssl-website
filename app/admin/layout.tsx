"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else if (session && pathname === '/admin/login') {
        router.push('/admin');
      }
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else if (session && pathname === '/admin/login') {
        router.push('/admin');
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {pathname !== '/admin/login' && (
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-50 relative">
          <h1 className="font-display font-semibold text-xl text-navy-900">NATCO Admin</h1>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
          >
            Sign Out
          </button>
        </header>
      )}
      <main className="relative z-10">{children}</main>
    </div>
  );
}
