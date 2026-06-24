"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./DiagonalDivider.module.css";

export default function DiagonalDivider({ fromColor = "#e6ebf0", toColor = "#ffffff", flip = false }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const lineX = useTransform(scrollYProgress, [0, 0.5], ["-100%", "0%"]);
  const accentX = useTransform(scrollYProgress, [0.1, 0.6], ["100%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={ref} className={styles.wrapper} style={{ background: toColor }}>
      <svg
        className={styles.svg}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ transform: flip ? "scaleX(-1)" : "none" }}
      >
        {/* Main diagonal shape */}
        <motion.path
          d="M0,0 L1440,0 L1440,40 L0,120 Z"
          fill={fromColor}
          style={{ opacity }}
        />
      </svg>

      {/* Animated accent line */}
      <motion.div
        className={styles.accentLine}
        style={{ x: lineX }}
      >
        <svg
          viewBox="0 0 1440 4"
          preserveAspectRatio="none"
          className={styles.lineSvg}
          style={{ transform: flip ? "scaleX(-1)" : "none" }}
        >
          <line
            x1="0" y1="2" x2="1440" y2="2"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Secondary thin line */}
      <motion.div
        className={styles.secondLine}
        style={{ x: accentX }}
      >
        <svg
          viewBox="0 0 1440 2"
          preserveAspectRatio="none"
          className={styles.lineSvg}
          style={{ transform: flip ? "scaleX(-1)" : "none" }}
        >
          <line
            x1="200" y1="1" x2="1240" y2="1"
            stroke="rgba(194, 45, 51, 0.3)"
            strokeWidth="1"
            strokeDasharray="8 6"
          />
        </svg>
      </motion.div>
    </div>
  );
}
