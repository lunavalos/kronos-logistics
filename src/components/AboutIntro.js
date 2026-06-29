"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GlowBorder from "./GlowBorder";
import styles from "./AboutIntro.module.css";

function RevealText({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <span ref={ref} className={styles.revealWrapper}>
      <motion.span
        className={styles.revealInner}
        initial={{ y: "100%" }}
        animate={isInView ? { y: "0%" } : { y: "100%" }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function AboutIntro() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.3], [0, 80]);
  const smoothLineWidth = useSpring(lineWidth, { stiffness: 100, damping: 30 });

  return (
    <section id="about" ref={sectionRef} className={styles.section}>
      <div className={`container ${styles.container}`} ref={contentRef}>
        <div className={styles.content}>
          <div className={styles.titleBlock}>
            <RevealText>
              <h2 className={styles.title}>KRONOS LOGISTICS</h2>
            </RevealText>
            <RevealText delay={0.1}>
              <p className={styles.tagline}>Global Logistics You Can Count On.</p>
            </RevealText>
          </div>

          <motion.div
            className={styles.redLine}
            style={{ width: smoothLineWidth }}
          ></motion.div>

          <motion.div
            className={styles.textBlock}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              Kronos Logistics is a global supply chain partner trusted by industries where precision cannot be compromised. Your supply chain deserves precise solutions engineered for reliability, speed, and cost efficiency — and that’s exactly what we deliver, anywhere in the world. We secure every link in your supply chain with certified customs specialists managing clearance across borders worldwide, and a single point of contact who delivers exactly the level of control your operation needs — whether that means moving your cargo directly, orchestrating an entire network of providers, or both. One global partner. Every solution. Total security, end to end.
            </p>

            <div className={styles.columnsContainer}>
              <div className={styles.column}>
                <h3 className={styles.columnTitle}>3PL — Direct Execution</h3>
                <p className={styles.columnText}>
                  We manage transportation, warehousing, and customs services directly — a single, accountable partner handling your physical supply chain end to end, backed by certified specialists and real-time tracking through the Kronos App.
                </p>
              </div>
              <div className={styles.column}>
                <h3 className={styles.columnTitle}>4PL — Strategic Orchestration</h3>
                <p className={styles.columnText}>
                  When your logistics network spans multiple carriers, warehouses, and providers across borders and continents, Kronos becomes the central point of control — coordinating your full network, including providers outside our own fleet, under one unified strategy.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlowBorder>
              <Link href="/about" className={styles.switcherBtn}>
                <span className={styles.btnText}>Read More</span>
                <span className={styles.btnIconWrapper}>
                  <ArrowRight size={18} className={styles.btnIcon} />
                </span>
              </Link>
            </GlowBorder>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
