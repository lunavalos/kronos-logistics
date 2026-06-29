import PageHero from "@/components/PageHero";
import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "Trailer Lease - Kronos Logistics",
  description: "Kronos Logistics provides flexible dry van and flatbed trailer leasing. Lease short-term or long-term to scale your fleet as needed.",
};

export default function TrailerRentalPage() {
  return (
    <main>
      <PageHero title="Trailer Lease" video="/services/trailer-rental-video.webm" />
      <ServiceDetailClient />
    </main>
  );
}
