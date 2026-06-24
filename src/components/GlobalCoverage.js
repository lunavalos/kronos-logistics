"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PlusCircle, Clock, CheckCircle } from "lucide-react";
import styles from "./GlobalCoverage.module.css";

function AnimatedCounter({ value, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

const regions = [
  {
    title: "North America",
    desc: "Key domestic and international FTL/LTL solutions across the US and Mexico."
  },
  {
    title: "Europe",
    desc: "Import and export management through major maritime and air hubs."
  },
  {
    title: "Asia",
    desc: "Seamless supply chain integration for manufacturing and distribution."
  }
];

export default function GlobalCoverage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
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
      {/* Dotted Global Map background at 10% opacity */}
      <div className={styles.mapBackground} />

      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.sectionTitle}>Global Scope & Connectivity</h2>
          <div className={styles.titleLine}></div>
        </motion.div>

        {/* Connectivity Timeline Section */}
        <motion.div 
          className={styles.timelineContainer}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
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

        {/* Stats Row Section */}
        <motion.div 
          className={styles.statsRow}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.statItem}>
            <PlusCircle className={styles.icon} />
            <span><AnimatedCounter value={10000} prefix="+" /> Shipments</span>
          </div>
          <div className={styles.statItem}>
            <Clock className={styles.icon} />
            <span>24/7 Operations</span>
          </div>
          <div className={styles.statItem}>
            <CheckCircle className={styles.icon} />
            <span>Certified Carriers</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
