"use client";
import { use } from "react";
import PageHero from "@/components/PageHero";
import TrackingView from "@/components/Tracking/TrackingView";
import { useTranslations } from "next-intl";
import styles from "../track.module.css";

export default function TrackByUuidPage({ params }) {
  const { uuid } = use(params);
  const t = useTranslations("Tracking");

  return (
    <div className={styles.pageWrapper}>
      <PageHero title={t("heroTitle")} />
      <div className="container">
        <TrackingView initialChainCode={uuid} />
      </div>
    </div>
  );
}
