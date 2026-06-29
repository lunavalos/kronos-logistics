"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Sliders, Globe, Eye, FileText, Cpu, Shield } from "lucide-react";
import styles from "./Features.module.css";

const features = [
  {
    title: "Flexibility to match your operation",
    description: "Choose direct execution, strategic coordination, or a hybrid of both — whatever your supply chain actually needs, shipment by shipment",
    icon: <Sliders size={32} />
  },
  {
    title: "One partner, every provider coordinated",
    description: "worldwide — Whether we're moving your freight or managing the providers who do, you have a single point of accountability across six continents.",
    icon: <Globe size={32} />
  },
  {
    title: "Total visibility through the Kronos App",
    description: "Track every shipment, across every provider and every border, from one real-time dashboard.",
    icon: <Eye size={32} />
  },
  {
    title: "Dedicated customs specialists at every checkpoint",
    description: "Expert clearance management across your entire network, not just the legs Kronos operates directly.",
    icon: <FileText size={32} />
  },
  {
    title: "Technology-driven supply chain orchestration",
    description: "Real-time data and intelligent routing that identify efficiencies no single carrier could see on its own.",
    icon: <Cpu size={32} />
  },
  {
    title: "Built for the industries where precision is non-negotiable",
    description: "Purpose-built for automotive, aerospace, defense, pharmaceutical, and high-technology supply chains operating at global scale.",
    icon: <Shield size={32} />
  }
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    ref.current.style.setProperty("--mouse-x", `${x}px`);
    ref.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <div className={styles.iconWrapper}>
        {feature.icon}
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{feature.title}</h3>
        <p className={styles.cardDescription}>{feature.description}</p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

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
    <section ref={sectionRef} className={styles.section}>
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
      <div className={styles.bgOverlay} />

      {/* Top Divider (rotated 180deg via CSS) */}
      <div className={styles.topDivider}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <motion.path d={topTabPath} fill="#ffffff" />
        </svg>
      </div>

      <div className="container">
        <div className={styles.header} ref={titleRef}>
          <div className={styles.titleReveal}>
            <motion.h2
              className={styles.title}
              initial={{ y: "100%", opacity: 0 }}
              animate={isTitleInView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              WHY KRONOS WORKS FOR YOU
            </motion.h2>
          </div>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
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
