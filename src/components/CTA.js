"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import GlowBorder from "./GlowBorder";
import styles from "./CTA.module.css";

export default function CTA() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const isLeftInView = useInView(leftRef, { once: true, margin: "-80px" });
  const isRightInView = useInView(rightRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax on the background
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const smoothBgY = useSpring(bgY, { stiffness: 100, damping: 30 });

  const tabXTop = useTransform(scrollYProgress, [0, 1], [1150, 150]);
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

  const topTabPath = useTransform(tabXTop, generateTabPath);
  const bottomTabPath = useTransform(tabXBottom, generateTabPath);

  return (
    <section ref={sectionRef} className={styles.cta}>
      {/* Video Background */}
      <video
        className={styles.bgVideo}
        autoPlay
        loop
        muted
        playsInline
        poster="/body-background-1.webp"
      >
        <source src="/body-bg-video.webm" type="video/webm" />
      </video>
      <div className={styles.background}></div>
      
      {/* Top Divider */}
      <div className={styles.topDivider}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <motion.path d={topTabPath} fill="#ffffff" />
        </svg>
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.grid}>
          <div className={styles.left} ref={leftRef}>
            <div className={styles.titleReveal}>
              <motion.h2
                className={styles.title}
                initial={{ y: "100%", opacity: 0 }}
                animate={isLeftInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Ready to Move<br/>Your Freight?
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLeftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlowBorder>
                <Link href="/contact" className={styles.switcherBtn}>
                  <span className={styles.btnText}>Get a Quote Now</span>
                  <span className={styles.btnIconWrapper}>
                    <ArrowRight size={20} className={styles.btnIcon} />
                  </span>
                </Link>
              </GlowBorder>
            </motion.div>
          </div>

          <div className={styles.right} ref={rightRef}>
            <motion.div
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 40, rotate: 3 }}
              animate={isRightInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isRightInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.08, type: "spring", bounce: 0.5 }}
                  >
                    <Star size={18} fill="currentColor" color="#eab308" className={styles.starIcon} />
                  </motion.span>
                ))}
              </div>
              <p className={styles.quote}>
                &ldquo;Kronos Logistics has been essential to our supply chain, providing fast and reliable deliveries every time.&rdquo;
              </p>
              <div className={styles.author}>
                <div className={styles.avatar}>JS</div>
                <div>
                  <h4 className={styles.name}>John Smith</h4>
                  <p className={styles.role}>Supply Chain Manager</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className={styles.bottomDivider}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <motion.path d={bottomTabPath} fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
