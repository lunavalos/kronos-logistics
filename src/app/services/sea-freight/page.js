import PageHero from "@/components/PageHero";
import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "Sea Freight - Kronos Logistics",
  description: "Kronos Logistics provides high-quality and secure deep sea shipping services, including FCL, LCL, and customs compliance for global import and export.",
};

export default function SeaFreightPage() {
  return (
    <main>
      <PageHero title="Sea Freight" video="/services/sea-freight-video.webm" />
      <ServiceDetailClient />
    </main>
  );
}
