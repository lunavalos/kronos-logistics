"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Globe, 
  Box, 
  TrendingDown, 
  Lock, 
  PhoneCall 
} from "lucide-react";
import styles from "../ServiceDetail.module.css";

const servicesList = [
  { title: "USMCA FTL", slug: "full-truckload-ftl" },
  { title: "USMCA LTL", slug: "less-than-truckload-ltl" },
  { title: "Air Freight", slug: "air-freight" },
  { title: "Hand Carrier Service", slug: "hand-carrier-service" },
  { title: "Sea Freight", slug: "sea-freight" },
  { title: "Warehousing", slug: "warehousing" },
  { title: "Hazmat Logistics", slug: "hazmat-logistics" },
  { title: "4PL Logistics", slug: "4pl-logistics" },
  { title: "Bonded Carrier", slug: "bonded-carrier" },
  { title: "Trailer Lease", slug: "trailer-rental" }
];

const advantages = [
  {
    title: "Duty Deferral & Transit",
    desc: "Allows you to transport your cargo across international borders before paying any custom duties or taxes.",
    icon: <Globe size={24} />
  },
  {
    title: "Bonded Storage Integration",
    desc: "Allows you to store your goods in a secure bonded warehouse while waiting for their next scheduled transportation.",
    icon: <Box size={24} />
  },
  {
    title: "Time & Cost Efficiency",
    desc: "Saves time and money by significantly reducing paperwork and custom clearance delays at border crossing points.",
    icon: <TrendingDown size={24} />
  },
  {
    title: "Enhanced Transit Security",
    desc: "Provides total security since the cargo must be transported in a sealed trailer and monitored closely during transit.",
    icon: <Lock size={24} />
  }
];

export default function ServiceDetailClient() {
  const currentSlug = "bonded-carrier";

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.contentGrid}>
          {/* Main Content Area */}
          <motion.div 
            className={styles.mainContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.introText}>
              <p>
                Transportation that is licensed to move freight through/across U.S. points of entry without having to pay duties, taxes and/or fees on those goods during transit. By offering this specialized service, we help our customers to speed up their transit times, simplify cross-border procedures, and keep logistics costs low.
              </p>
            </div>

            <div className={styles.advantagesSection}>
              <h2 className={styles.advantagesTitle}>Key Advantages</h2>
              
              <div className={styles.advantagesGrid}>
                {advantages.map((adv, idx) => (
                  <motion.div 
                    key={idx}
                    className={styles.advantageCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div className={styles.advantageHeader}>
                      <span className={styles.advantageIcon}>
                        {adv.icon}
                      </span>
                      <h3 className={styles.advantageTitleText}>{adv.title}</h3>
                    </div>
                    <p className={styles.advantageDesc}>{adv.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside 
            className={styles.sidebar}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h3 className={styles.sidebarTitle}>Our Services</h3>
              <div className={styles.sidebarList}>
                {servicesList.map((service, idx) => (
                  <Link 
                    key={idx}
                    href={`/services/${service.slug}`}
                    className={`${styles.sidebarLink} ${service.slug === currentSlug ? styles.sidebarLinkActive : ""}`}
                  >
                    <span>{service.title}</span>
                    <ArrowRight size={16} className={styles.sidebarIcon} />
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.ctaBox}>
              <PhoneCall size={32} className={styles.ctaIcon} />
              <h4 className={styles.ctaTitle}>Need a Solution?</h4>
              <p className={styles.ctaText}>
                Contact our logistics experts today to find the perfect fit for your supply chain requirements.
              </p>
              <Link href="/contact" className={styles.ctaBtn}>
                Get in Touch
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
