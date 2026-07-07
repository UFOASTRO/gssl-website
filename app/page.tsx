import Hero from "@/components/Hero";
import PartnersMarquee from "@/components/PartnersMarquee";
import CoreFocus from "@/components/CoreFocus";
import GSSLAdvantage from "@/components/GSSLAdvantage";
import ConsultingSolutions from "@/components/ConsultingSolutions";
import DigitalEcosystem from "@/components/DigitalEcosystem";
import FlagshipProgrammes from "@/components/FlagshipProgrammes";
import NationalFootprint from "@/components/NationalFootprint";
import ExecutiveLeadership from "@/components/ExecutiveLeadership";
import NewsletterSection from "@/components/NewsletterSection";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <PartnersMarquee />
      <CoreFocus />
      {/* <GSSLAdvantage /> */}
      <ConsultingSolutions />
      <FlagshipProgrammes />
      <NationalFootprint />
      <DigitalEcosystem />
      <ExecutiveLeadership />
      <NewsletterSection />
      <ContactFooter />
    </main>
  );
}
