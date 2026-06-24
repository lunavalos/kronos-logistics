"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import styles from "./USCoverage.module.css";

const coveragePoints = [
  "Licensed Bonded Carrier",
  "Port & Border Crossing Specialists",
  "FTZ Warehouse Access",
  "Laredo, TX Hub Operations"
];

export default function USCoverage() {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    fetch("/coverage-map.svg")
      .then((res) => res.text())
      .then((data) => {
        // Clean up XML declaration if it exists, though browsers parse it fine
        const cleanSvg = data.replace(/<\?xml.*\?>/g, "");
        setSvgContent(cleanSvg);
      })
      .catch((err) => console.error("Error loading coverage map SVG:", err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 className={styles.title} variants={itemVariants}>
            US Service Coverage
          </motion.h2>
          
          <motion.div className={styles.divider} variants={itemVariants}></motion.div>
          
          <motion.p className={styles.paragraph} variants={itemVariants}>
            Dedicated infrastructure and logistics networks across North America, with a focus on seamless US points of entry.
          </motion.p>

          <motion.ul 
            className={styles.list}
            variants={listVariants}
          >
            {coveragePoints.map((point, index) => (
              <motion.li key={index} className={styles.listItem} variants={listItemVariants}>
                <div className={styles.checkWrapper}>
                  <Check size={14} strokeWidth={3} />
                </div>
                <span>{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className={styles.mapContainer}
          variants={mapVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div 
            className={styles.mapWrapper}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </motion.div>
      </div>
    </section>
  );
}
