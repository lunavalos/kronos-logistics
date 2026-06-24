import PageHero from "@/components/PageHero";
import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "4PL Logistics - Kronos Logistics",
  description: "Kronos Logistics offers tailored 4PL Logistics solutions, integrating warehousing, transportation, and inventory management to optimize your supply chain and reduce costs.",
};

export default function Service4PLPage() {
  return (
    <main>
      <PageHero title="4PL Logistics" video="/services/4-pl-logistics-video.webm" />
      <ServiceDetailClient />
    </main>
  );
}
