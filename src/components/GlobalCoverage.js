"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
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

export default function GlobalCoverage() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-50px" });

  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.titleReveal} ref={titleRef}>
            <motion.h2
              className={styles.title}
              initial={{ y: "100%", opacity: 0 }}
              animate={isTitleInView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              GLOBAL COVERAGE
            </motion.h2>
          </div>
          
          <div className={styles.statsRow} ref={containerRef}>
            <motion.div
              className={styles.statItem}
              initial={{ opacity: 0, x: -30 }}
              animate={isContainerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            >
              <PlusCircle className={styles.icon} />
              <span><AnimatedCounter value={10000} prefix="+" /> Shipments</span>
            </motion.div>
            <motion.div
              className={styles.statItem}
              initial={{ opacity: 0, x: -30 }}
              animate={isContainerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Clock className={styles.icon} />
              <span>24/7 Operations</span>
            </motion.div>
            <motion.div
              className={styles.statItem}
              initial={{ opacity: 0, x: -30 }}
              animate={isContainerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <CheckCircle className={styles.icon} />
              <span>Certified Carriers</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
