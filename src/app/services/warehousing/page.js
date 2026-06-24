import PageHero from "@/components/PageHero";
import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "Warehousing - Kronos Logistics",
  description: "Kronos Logistics offers secure, flexible, and monitored warehousing solutions. Keep your cargo safe at key strategic distribution points.",
};

export default function WarehousingPage() {
  return (
    <main>
      <PageHero title="Warehousing" video="/services/warehousing-video.webm" />
      <ServiceDetailClient />
    </main>
  );
}
