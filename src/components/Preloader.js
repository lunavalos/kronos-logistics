"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.random() * 15 + 5;
      current = Math.min(current + increment, 100);
      setProgress(Math.round(current));

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsComplete(true);
          if (typeof window !== "undefined") {
            window.__preloaderFinished = true;
          }
        }, 400);
        setTimeout(() => setIsVisible(false), 1200);
      }
    }, 120);

    // Prevent scroll during preloader
    document.body.style.overflow = "hidden";

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  // Restore scroll when done
  useEffect(() => {
    if (!isVisible) {
      document.body.style.overflow = "";
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.preloader}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top curtain */}
          <motion.div
            className={styles.curtainTop}
            animate={isComplete ? { y: "-100%" } : { y: "0%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Bottom curtain */}
          <motion.div
            className={styles.curtainBottom}
            animate={isComplete ? { y: "100%" } : { y: "0%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Center content */}
          <motion.div
            className={styles.content}
            animate={isComplete ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Image
                src="/logo-1.png"
                alt="Kronos Logistics"
                width={200}
                height={50}
                style={{ width: "200px", height: "auto" }}
                priority
              />
            </motion.div>

            {/* Progress bar */}
            <div className={styles.progressContainer}>
              <motion.div
                className={styles.progressBar}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: "linear" }}
              />
            </div>

            {/* Counter */}
            <motion.p
              className={styles.counter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {progress}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
