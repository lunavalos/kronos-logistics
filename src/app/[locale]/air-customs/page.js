"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "./AirCustoms.module.css";

// Dynamic import for Leaflet (client-side only)
const AirportsMap = dynamic(() => import("@/components/AirportsMap"), {
  ssr: false,
  loading: () => <div className={styles.mapLoading}>Loading map...</div>
});

export default function AirCustomsPage() {
  const t = useTranslations("Coverage");
  const [activeAirportIndex, setActiveAirportIndex] = useState(null);

  const airports = [
    { name: t("airports.0"), coords: [19.4363, -99.0721], code: "AICM" },
    { name: t("airports.1"), coords: [19.7431, -99.0125], code: "AIFA - NLU" },
    { name: t("airports.2"), coords: [20.5218, -103.3111], code: "GDL" },
    { name: t("airports.3"), coords: [25.7785, -100.1068], code: "MTY" }
  ];

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  const handleAirportClick = (index) => {
    // Toggle active state
    if (activeAirportIndex === index) {
      setActiveAirportIndex(null);
    } else {
      setActiveAirportIndex(index);
    }
  };

  return (
    <main>
      <PageHero title={t("title")} />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper}>
            
            {/* Left Column: Information & Interactive List */}
            <motion.div
              className={styles.textContent}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className={styles.title}>{t("title")}</h2>
              <div className={styles.redLine}></div>

              <p className={styles.paragraph}>
                {t("p1")}
              </p>

              <p className={styles.paragraph}>
                {t("p2")}
              </p>

              <motion.ul
                className={styles.airportList}
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {airports.map((airport, idx) => (
                  <motion.li
                    key={idx}
                    className={`${styles.airportItem} ${activeAirportIndex === idx ? styles.activeItem : ""}`}
                    variants={itemVariants}
                    onClick={() => handleAirportClick(idx)}
                  >
                    <Check className={styles.checkIcon} size={20} strokeWidth={3} />
                    <span className={styles.airportName}>{airport.name}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <p className={styles.paragraph}>
                {t("p3")}
              </p>
            </motion.div>

            {/* Right Column: Sticky Map Container */}
            <motion.div
              className={styles.mapContainer}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AirportsMap
                airports={airports}
                activeAirportIndex={activeAirportIndex}
                onMarkerClick={(index) => setActiveAirportIndex(index)}
              />
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
