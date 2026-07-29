"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("AboutIntro");
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
              <h2 className={styles.title}>{t("title")}</h2>
            </RevealText>
            <RevealText delay={0.1}>
              <p className={styles.tagline}>{t("tagline")}</p>
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
            <p style={{ fontSize: "20px" }}>
              {t("description")}
            </p>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlowBorder>
              <Link href="/about-us" className={styles.switcherBtn}>
                <span className={styles.btnText}>{t("readMore")}</span>
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
