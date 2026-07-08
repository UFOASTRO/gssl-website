import { Building2, Laptop, Workflow } from "lucide-react";

export default function GSSLAdvantage() {
	const advantages = [
		{
			title: "Public-Sector Insight",
			description:
				"Deep understanding of government operations allows us to navigate public sector challenges and deliver structured, state-partnered programmes.",
			icon: Building2,
		},
		{
			title: "Technology Integration",
			description:
				"We don't just advise; we build. Our custom software portals and data collation tools act as the infrastructure for real-world impact.",
			icon: Laptop,
		},
		{
			title: "End-to-end Project Management",
			description:
				"From the initial concept to fieldwork execution and impact reporting, we take full ownership of the promises we make.",
			icon: Workflow,
		},
	];

	return (
		<section className="w-full bg-white py-24 sm:py-32 border-t border-gray-100">
			<div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
				<div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
					<h2 className="font-display text-navy-900 text-4xl sm:text-5xl tracking-tight font-semibold mb-6">
						The GSSL Advantage
					</h2>
					<p className="text-gray-600 text-lg leading-relaxed">
						Positioned on local-market understanding, professionalism, and deep
						community roots. We emphasize trust and results-driven delivery in
						everything we do.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
					{advantages.map((adv, index) => {
						const Icon = adv.icon;
						return (
							<div
								key={index}
								className="flex flex-col items-center text-center group"
							>
								<div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110">
									<Icon className="w-8 h-8 text-blue-600" />
								</div>
								<h3 className="text-2xl font-display font-semibold text-navy-900 mb-4">
									{adv.title}
								</h3>
								<p className="text-gray-600 leading-relaxed max-w-sm">
									{adv.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
