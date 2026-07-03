import Hero from "@/components/Hero";
import PartnersMarquee from "@/components/PartnersMarquee";
import CoreFocus from "@/components/CoreFocus";
import GSSLAdvantage from "@/components/GSSLAdvantage";
import ConsultingSolutions from "@/components/ConsultingSolutions";
import DigitalEcosystem from "@/components/DigitalEcosystem";
import NationalFootprint from "@/components/NationalFootprint";
import ExecutiveLeadership from "@/components/ExecutiveLeadership";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <PartnersMarquee />
      <CoreFocus />
      {/* <GSSLAdvantage /> */}
      <ConsultingSolutions />
      <DigitalEcosystem />
      <NationalFootprint />
      <ExecutiveLeadership />
      <ContactFooter />
    </main>
  );
}
