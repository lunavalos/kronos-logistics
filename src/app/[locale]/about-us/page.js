"use client";
import PageHero from "@/components/PageHero";
import Features from "@/components/Features";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./About.module.css";

export default function AboutPage() {
  const t = useTranslations("AboutUs");

  return (
    <main>
      <PageHero title={t("heroTitle")} />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.contentWrapper}>
            <motion.div
              className={styles.textContent}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className={styles.title}>{t("title")}</h2>
              <div className={styles.redLine}></div>
              <p className={styles.subtitle}>{t("subtitle")}</p>

              <div className={styles.textBlock}>
                <p>
                  {t("description")}
                </p>
              </div>
              <div className={styles.columnsContainer}>
                <div className={styles.column}>
                  <h3 className={styles.columnTitle}>{t("col1Title")}</h3>
                  <p className={styles.columnText}>
                    {t("col1Text")}
                  </p>
                </div>
                <div className={styles.column}>
                  <h3 className={styles.columnTitle}>{t("col2Title")}</h3>
                  <p className={styles.columnText}>
                    {t("col2Text")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <Features />
    </main>
  );
}
