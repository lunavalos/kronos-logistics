import PageHero from "@/components/PageHero";
import OurServices from "@/components/OurServices";
import { getTranslations } from "next-intl/server";

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });

  return (
    <main>
      <PageHero title={t("heroTitle")} />
      <OurServices showAll={true} hideHeader={true} hideButton={true} />
    </main>
  );
}
