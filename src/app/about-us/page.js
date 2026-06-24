"use client";
import PageHero from "@/components/PageHero";
import Features from "@/components/Features";
import { motion } from "framer-motion";
import styles from "./About.module.css";

export default function AboutPage() {
  return (
    <main>
      <PageHero title="About Us" />
      
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
              <h2 className={styles.title}>KRONOS LOGISTICS</h2>
              <div className={styles.redLine}></div>
              <p className={styles.subtitle}>Global Logistics You Can Count On.</p>
              
              <div className={styles.textBlock}>
                <p>
                  Kronos Logistics is an active 4PL supply chain management company focused in provide and implement safe, efficient and reliable solutions in freight and logistics throughout North America, Europe and Asia.
                </p>
                <p>
                  Whether you need expedited services, hot shot, ocean, air shipping or more we are able to offer our customers a complete variety of solutions to meet all your requirements. We achieve this by simplifying processes, providing the right service and costs options with our multiple carriers.
                </p>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>24/7</div>
                  <div className={styles.statLabel}>Support</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>100%</div>
                  <div className={styles.statLabel}>Commitment</div>
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
