import PageHero from "@/components/PageHero";
import ServiceDetailClient from "./ServiceDetailClient";

export const metadata = {
  title: "Less Than Truckload (LTL) - Kronos Logistics",
  description: "Kronos Logistics provides flexible and cost-effective Less Than Truckload (LTL) shipping. Combine your cargo with others to reduce transit costs and increase efficiency.",
};

export default function LTLPage() {
  return (
    <main>
      <PageHero title="Less Than Truckload (LTL)" video="/services/less-than-truckload-video.webm" />
      <ServiceDetailClient />
    </main>
  );
}
