import PageHero from "@/components/PageHero";
import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "Hazmat Logistics - Kronos Logistics",
  description: "Kronos is fully certified to move dangerous goods by road, air, and sea under DOT, IATA DGR, IMDG, and NOM-002-SCT standards.",
};

export default function HazmatLogisticsPage() {
  return (
    <main>
      <PageHero title="Hazmat Logistics" video="/services/hazmat-service.webm" />
      <ServiceDetailClient />
    </main>
  );
}
