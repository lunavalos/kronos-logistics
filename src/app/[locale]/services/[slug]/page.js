import PageHero from "@/components/PageHero";
import ServiceDetailClient from "./ServiceDetailClient";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

// Video mapping for services PageHero
const videoMap = {
  "4pl-logistics": "/services/4-pl-logistics-video.webm",
  "air-freight": "/services/air-freight-video.webm",
  "bonded-carrier": "/services/bonded-carrier-video.webm",
  "full-truckload-ftl": "/services/trailer-rental-video.webm",
  "hand-carrier-service": "/services/hand-carrier-service-video.webm",
  "hazmat-logistics": "/services/hazmat-service.webm",
  "less-than-truckload-ltl": "/services/less-than-truckload-video.webm",
  "sea-freight": "/services/sea-freight-video.webm",
  "trailer-rental": "/services/trailer-rental-video.webm",
  "warehousing": "/services/warehousing-video.webm"
};

const validSlugs = Object.keys(videoMap);

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  if (!validSlugs.includes(slug)) return {};
  
  const t = await getTranslations({ locale, namespace: `Services.${slug}` });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
  };
}

export default async function ServiceDetailPage({ params }) {
  const { locale, slug } = await params;
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: `Services.${slug}` });

  return (
    <main>
      <PageHero title={t("heroTitle")} video={videoMap[slug]} />
      <ServiceDetailClient slug={slug} />
    </main>
  );
}
