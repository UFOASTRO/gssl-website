import GlobeHubSpoke from "@/components/GlobeHubSpoke";
import GlobeConstellation from "@/components/GlobeConstellation";

export default function GlobePrototypesPage() {
	return (
		<main className="min-h-screen bg-white text-black p-10 flex flex-col items-center gap-10">
			<div className="text-center max-w-2xl">
				<h1 className="text-4xl font-bold mb-4">Globe Prototypes: Minimalist</h1>
				<p className="text-gray-600">
					Too many lines can look chaotic. These prototypes use minimalist design 
					to show a global footprint without visual clutter. Which cleaner look do you prefer?
				</p>
			</div>

			<div className="flex flex-col xl:flex-row gap-10 w-full max-w-[1400px]">
				
				{/* PROTOTYPE 1 */}
				<div className="flex-1 border rounded-3xl p-8 shadow-xl bg-gray-50 flex flex-col items-center">
					<h2 className="text-2xl font-bold mb-2">1. Seeds of Expansion (Minimal Arcs)</h2>
					<p className="text-gray-500 mb-8 text-center text-sm">
						Only your established hubs are connected. The "unreached" states have zero lines, 
						acting as subtle "seeds" planted across the globe. Organized and deliberate.
					</p>
					<div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] relative">
						<GlobeHubSpoke />
					</div>
				</div>

				{/* PROTOTYPE 2 */}
				<div className="flex-1 border rounded-3xl p-8 shadow-xl bg-gray-50 flex flex-col items-center">
					<h2 className="text-2xl font-bold mb-2">2. The Node Map (Zero Arcs)</h2>
					<p className="text-gray-500 mb-8 text-center text-sm">
						Absolutely zero lines. Relies entirely on the elegant placement and varied sizes of dots. 
						This is the cleanest, most modern, and "premium" representation of a global footprint.
					</p>
					<div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] relative">
						<GlobeConstellation />
					</div>
				</div>

			</div>
		</main>
	);
}
