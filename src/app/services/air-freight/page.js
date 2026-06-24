import PageHero from "@/components/PageHero";
import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "Air Freight - Kronos Logistics",
  description: "Kronos Logistics offers fast, secure, and reliable air freight shipping services worldwide. We analyze your cargo size and budget to deliver cost-effective logistics solutions.",
};

export default function AirFreightPage() {
  return (
    <main>
      <PageHero title="Air Freight" video="/services/air-freight-video.webm" />
      <ServiceDetailClient />
    </main>
  );
}
