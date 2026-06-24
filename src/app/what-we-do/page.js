import PageHero from "@/components/PageHero";
import Features from "@/components/Features";
import WhatWeDoContent from "./WhatWeDoContent";

export const metadata = {
  title: "What We Do - Kronos Logistics",
  description:
    "Discover what we do at Kronos Logistics: custom global logistics solutions including FTL, LTL, Air Freight, Sea Freight, Warehousing, Bonded Carrier, and more.",
};

export default function WhatWeDoPage() {
  return (
    <main>
      <PageHero title="What We Do" />
      <WhatWeDoContent />
      <Features />
    </main>
  );
}
