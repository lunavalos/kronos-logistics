import PageHero from "@/components/PageHero";
import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "USMCA FTL - Kronos Logistics",
  description: "Kronos Logistics provides reliable and professional USMCA Full Truckload (FTL) shipping solutions. We offer dry van, temperature controlled, oversized, and flatbed transportation.",
};

export default function FTLPage() {
  return (
    <main>
      <PageHero title="USMCA FTL" video="/services/trailer-rental-video.webm" />
      <ServiceDetailClient />
    </main>
  );
}
