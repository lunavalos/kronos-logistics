import PageHero from "@/components/PageHero";
import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "Hand Carrier Service - Kronos Logistics",
  description: "Kronos Logistics provides high-urgency hand-carrier / onboard courier services. Rest assured that your high-value or critical shipments are under full control, custody, and speed.",
};

export default function HandCarrierPage() {
  return (
    <main>
      <PageHero title="Hand Carrier Service" video="/services/hand-carrier-service-video.webm" />
      <ServiceDetailClient />
    </main>
  );
}
