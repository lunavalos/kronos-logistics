"use client";
import PageHero from "@/components/PageHero";
import TrackingView from "@/components/Tracking/TrackingView";
import styles from "./track.module.css";

export default function TrackPage() {
  return (
    <div className={styles.pageWrapper}>
      <PageHero title="Track Your Shipment" />
      <div className="container">
        <TrackingView />
      </div>
    </div>
  );
}
