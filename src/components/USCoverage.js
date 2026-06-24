"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./USCoverage.module.css";

const regions = [
  {
    title: "Norteamérica",
    desc: "Soluciones clave de FTL/LTL nacional e internacional en todo EE. UU. y México."
  },
  {
    title: "Europa",
    desc: "Gestión de importación y exportación a través de principales centros marítimos y aéreos."
  },
  {
    title: "Asia",
    desc: "Integración fluida de la cadena de suministro para la manufactura y la distribución."
  }
];

export default function USCoverage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Background Map with 10% opacity */}
      <div className={styles.mapBackground} />

      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.sectionTitle}>Alcance y Conectividad Global</h2>
          <div className={styles.titleLine}></div>
        </motion.div>

        <motion.div 
          className={styles.timelineContainer}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Connecting Line (Horizontal on Desktop, Vertical on Mobile) */}
          <div className={styles.connectingLine}></div>

          <div className={styles.regionsGrid}>
            {regions.map((region, idx) => (
              <motion.div 
                key={idx} 
                className={styles.regionCard}
                variants={itemVariants}
              >
                <div className={styles.titleWrapper}>
                  <h3 className={styles.regionTitle}>{region.title}</h3>
                </div>
                
                <div className={styles.dotWrapper}>
                  <div className={styles.outerDot}>
                    <div className={styles.innerDot}></div>
                  </div>
                </div>

                <div className={styles.descWrapper}>
                  <p className={styles.regionDesc}>{region.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
