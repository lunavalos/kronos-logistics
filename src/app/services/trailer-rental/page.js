import PageHero from "@/components/PageHero";
import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "Trailer Rental - Kronos Logistics",
  description: "Kronos Logistics provides flexible dry van and flatbed trailer rentals. Rent for days or lease long-term to scale your fleet as needed.",
};

export default function TrailerRentalPage() {
  return (
    <main>
      <PageHero title="Trailer Rental" video="/services/trailer-rental-video.webm" />
      <ServiceDetailClient />
    </main>
  );
}
