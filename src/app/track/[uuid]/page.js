"use client";
import { use } from "react";
import PageHero from "@/components/PageHero";
import TrackingView from "@/components/Tracking/TrackingView";
import styles from "../track.module.css";

export default function TrackByUuidPage({ params }) {
  const { uuid } = use(params);

  return (
    <div className={styles.pageWrapper}>
      <PageHero title="Track Your Shipment" />
      <div className="container">
        <TrackingView initialChainCode={uuid} />
      </div>
    </div>
  );
}
