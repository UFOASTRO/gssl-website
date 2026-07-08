import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import PartnersMarquee from "@/components/PartnersMarquee";

const CoreFocus = dynamic(() => import("@/components/CoreFocus"));
const ConsultingSolutions = dynamic(
	() => import("@/components/ConsultingSolutions"),
);
const FlagshipProgrammes = dynamic(
	() => import("@/components/FlagshipProgrammes"),
);
const NationalFootprint = dynamic(
	() => import("@/components/NationalFootprint"),
);
const DigitalEcosystem = dynamic(() => import("@/components/DigitalEcosystem"));
const ExecutiveLeadership = dynamic(
	() => import("@/components/ExecutiveLeadership"),
);
const NewsletterSection = dynamic(
	() => import("@/components/NewsletterSection"),
);
const ContactFooter = dynamic(() => import("@/components/ContactFooter"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"));

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between relative">
			<Hero />
			<PartnersMarquee />
			<CoreFocus />
			{/* <GSSLAdvantage /> */}
			<ConsultingSolutions />
			<FlagshipProgrammes />
			<DigitalEcosystem />
			<NationalFootprint />
			<ExecutiveLeadership />
			<NewsletterSection />
			<ContactFooter />
			<WhatsAppButton />
		</main>
	);
}
