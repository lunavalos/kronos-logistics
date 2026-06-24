import PageHero from "@/components/PageHero";
import OurServices from "@/components/OurServices";

export default function ServicesPage() {
  return (
    <main>
      <PageHero title="Our Services" />
      <OurServices showAll={true} hideHeader={true} hideButton={true} />
    </main>
  );
}
