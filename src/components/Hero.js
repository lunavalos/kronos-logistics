"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import GlowBorder from "./GlowBorder";
import styles from "./Hero.module.css";

export default function Hero() {
  const sectionRef = useRef(null);
  const [delayOffset, setDelayOffset] = useState(2.0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.__preloaderFinished) {
      setDelayOffset(0);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Content fades & scales as you scroll past
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  // Animate the rounded tab from right to left, completing at 90% of the section scroll
  const tabX = useTransform(scrollYProgress, [0, 0.9], [1150, 150]);
  const tabPath = useTransform(tabX, (x) => {
    // Shorter transition width (100px) to make curves pronounced, but a very wide flat top (500px)
    const left = x - 350;
    const leftC1 = x - 300;
    const leftC2 = x - 300;
    const leftEnd = x - 250;

    const rightStart = x + 250;
    const rightC1 = x + 300;
    const rightC2 = x + 300;
    const rightEnd = x + 350;

    // Y=95 makes the tab only 24px tall above the Y=119 base
    return `M 0,119 L ${left},119 C ${leftC1},119 ${leftC2},95 ${leftEnd},95 L ${rightStart},95 C ${rightC1},95 ${rightC2},119 ${rightEnd},119 L 1440,119 L 1440,120 L 0,120 Z`;
  });

  const handleScrollDown = () => {
    const target = document.getElementById("about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* Video Background */}
      <div className={styles.background}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.bgVideo}
        >
          <source src="/hero-video-new.webm" type="video/webm" />
        </video>
      </div>
      <div className={styles.overlay}></div>

      <motion.div
        className={`container ${styles.content}`}
        style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}
      >
        <div className={styles.textContainer}>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 50, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: delayOffset, ease: [0.22, 1, 0.36, 1] }}
          >
            KRONOS WORLDWIDE <br />SUPPLY CHAIN SOLUTIONS
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: delayOffset + 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Direct Execution. Global Visibility.
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delayOffset + 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlowBorder>
              <Link href="/contact" className={styles.switcherBtn}>
                <span className={styles.btnText}>Request a Quote</span>
                <span className={styles.btnIconWrapper}>
                  <ArrowRight size={18} className={styles.btnIcon} />
                </span>
              </Link>
            </GlowBorder>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.button
        className={styles.scrollDown}
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delayOffset + 1.2 }}
        aria-label="Scroll down"
      >
        <span className={styles.scrollLabel}>Scroll Down</span>
        <motion.span
          className={styles.scrollChevron}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </motion.button>

      {/* Rounded tab divider — animates with scroll */}
      <div className={styles.diagonalCut}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <motion.path
            d={tabPath}
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
