import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Background from "@/components/Background";
import { Analytics } from "@vercel/analytics/next"

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
	metadataBase: new URL("https://globalsightservicesltd.com"),
	icons: {
		icon: "/favicon.png",
	},
	title: {
		default: "GSSL - Global Sight Services Limited | Enterprise Development",
		template: "%s | GSSL",
	},
	description:
		"Global Sight Services Limited (GSSL) provides premier business consulting, enterprise development, and digital solutions in Nigeria. Building what Nigerian enterprise needs to grow.",
	keywords: [
		"Global Sight Services Limited",
		"GSSL",
		"Business Consulting Nigeria",
		"Enterprise Development",
		"Capacity Building",
		"Digital Solutions Nigeria",
		"Public Sector Consulting",
		"Nigerian Enterprise",
	],
	authors: [{ name: "GSSL" }],
	creator: "GSSL",
	openGraph: {
		type: "website",
		locale: "en_NG",
		url: "https://globalsightservicesltd.com",
		siteName: "GSSL - Global Sight Services Limited",
		title: "GSSL - Global Sight Services Limited",
		description:
			"Building what Nigerian enterprise needs to grow through premium consulting and digital solutions.",
		images: [
			{
				url: "/GSSL logo.png",
				width: 1200,
				height: 630,
				alt: "GSSL - Global Sight Services Limited",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "GSSL - Global Sight Services Limited",
		description: "Building what Nigerian enterprise needs to grow.",
		images: ["/GSSL logo.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
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
			suppressHydrationWarning
		>
			<body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
				<Background />
				<Analytics />
				{children}
			</body>
		</html>
	);
}
