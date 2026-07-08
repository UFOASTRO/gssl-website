import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const instrument = Instrument_Sans({
	variable: "--font-instrument",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "GSSL - Global Sight Services Limited",
	description: "Building what Nigerian enterprise needs to grow.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col font-sans">
				<Background />
				{children}
			</body>
		</html>
	);
}
