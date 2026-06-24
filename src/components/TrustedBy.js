"use client";
import { motion } from "framer-motion";
import styles from "./TrustedBy.module.css";

export default function TrustedBy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(4px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.5, type: "spring", bounce: 0.4 } }
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <motion.h3 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          Trusted by Industry Leaders Worldwide
        </motion.h3>
        <motion.div 
          className={styles.logos}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={itemVariants} className={styles.logoItem}>P&G</motion.div>
          <motion.div variants={itemVariants} className={styles.divider}></motion.div>
          <motion.div variants={itemVariants} className={styles.logoItem}>MAERSK</motion.div>
          <motion.div variants={itemVariants} className={styles.divider}></motion.div>
          <motion.div variants={itemVariants} className={styles.logoItem}>BMW</motion.div>
          <motion.div variants={itemVariants} className={styles.divider}></motion.div>
          <motion.div variants={itemVariants} className={styles.logoItem}>3M</motion.div>
        </motion.div>
      </div>
    </section>
  );
}
