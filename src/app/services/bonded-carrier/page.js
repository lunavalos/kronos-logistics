import PageHero from "@/components/PageHero";
import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "Bonded Carrier - Kronos Logistics",
  description: "Kronos Logistics provides licensed Bonded Carrier services, allowing you to move freight through U.S. points of entry safely and efficiently without immediate duty payments.",
};

export default function BondedCarrierPage() {
  return (
    <main>
      <PageHero title="Bonded Carrier" video="/services/bonded-carrier-video.webm" />
      <ServiceDetailClient />
    </main>
  );
}
