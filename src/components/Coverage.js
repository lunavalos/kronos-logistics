"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "./Coverage.module.css";

export default function Coverage() {
  const t = useTranslations("Coverage");

  const airports = [
    t("airports.0"),
    t("airports.1"),
    t("airports.2"),
    t("airports.3")
  ];

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>{t("title")}</h2>
          <div className={styles.divider}></div>

          <p className={styles.paragraph}>
            {t("p1")}
          </p>

          <p className={styles.paragraph}>
            {t("p2")}
          </p>

          <motion.ul
            className={styles.airportList}
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {airports.map((airport, index) => (
              <motion.li key={index} className={styles.airportItem} variants={itemVariants}>
                <Check className={styles.checkIcon} size={20} strokeWidth={3} />
                <span>{airport}</span>
              </motion.li>
            ))}
          </motion.ul>

          <p className={styles.paragraph}>
            {t("p3")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
