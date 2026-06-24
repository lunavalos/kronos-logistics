"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./PageHero.module.css";

export default function PageHero({ title, video = "/hero-video-new.webm" }) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const tabXBottom = useTransform(scrollYProgress, [0, 1], [1150, 150]);

  const generateTabPath = (x) => {
    const left = x - 350;
    const leftC1 = x - 300;
    const leftC2 = x - 300;
    const leftEnd = x - 250;

    const rightStart = x + 250;
    const rightC1 = x + 300;
    const rightC2 = x + 300;
    const rightEnd = x + 350;

    return `M 0,119 L ${left},119 C ${leftC1},119 ${leftC2},95 ${leftEnd},95 L ${rightStart},95 C ${rightC1},95 ${rightC2},119 ${rightEnd},119 L 1440,119 L 1440,120 L 0,120 Z`;
  };

  const bottomTabPath = useTransform(tabXBottom, generateTabPath);

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* Video Background */}
      <div className={styles.background}>
        <video
          key={video}
          autoPlay
          loop
          muted
          playsInline
          className={styles.bgVideo}
        >
          <source src={video} type="video/webm" />
        </video>
      </div>
      <div className={styles.overlay}></div>

      <div className={`container ${styles.content}`}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
      </div>

      {/* Moving Tab Divider */}
      <div className={styles.bottomDivider}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <motion.path d={bottomTabPath} fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
