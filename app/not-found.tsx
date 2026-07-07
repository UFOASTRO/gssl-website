import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8f9fa] px-6">
      <div className="text-center max-w-lg">
        <h1 className="font-display text-navy-900 text-6xl sm:text-7xl font-semibold mb-6">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-display text-navy-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"
        >
          Return Home
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </main>
  );
}
