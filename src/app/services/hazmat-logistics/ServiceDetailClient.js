"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldAlert, 
  FileText, 
  Zap, 
  Eye, 
  ShieldCheck, 
  PhoneCall 
} from "lucide-react";
import styles from "../ServiceDetail.module.css";

const servicesList = [
  { title: "USMCA FTL", slug: "full-truckload-ftl" },
  { title: "USMCA LTL", slug: "less-than-truckload-ltl" },
  { title: "Air Freight", slug: "air-freight" },
  { title: "Sea Freight", slug: "sea-freight" },
  { title: "Warehousing", slug: "warehousing" },
  { title: "4PL Logistics", slug: "4pl-logistics" },
  { title: "Hand Carrier Service", slug: "hand-carrier-service" },
  { title: "Bonded Carrier", slug: "bonded-carrier" },
  { title: "Trailer Lease", slug: "trailer-rental" },
  { title: "Hazmat Logistics", slug: "hazmat-logistics" }
];

const advantages = [
  {
    title: "Certified Across Every Mode",
    desc: "DOT, IATA DGR, and IMDG certified handling for hazardous materials by road, air, and sea — one partner, every mode of transport.",
    icon: <ShieldCheck size={24} />
  },
  {
    title: "Full Class Coverage",
    desc: "From Class 1 explosives to Class 9 miscellaneous dangerous goods, our certified teams are trained and equipped to handle the full spectrum of hazard classifications.",
    icon: <ShieldAlert size={24} />
  },
  {
    title: "Cross-Border Compliance",
    desc: "NOM-002-SCT certified for Mexican road transport, with federally licensed drivers and valid SCT permits at every crossing.",
    icon: <FileText size={24} />
  },
  {
    title: "Real-Time Tracking",
    desc: "Monitor your hazmat shipment’s location, compliance status, and milestone progress in real time via the Kronos App.",
    icon: <Eye size={24} />
  }
];

export default function ServiceDetailClient() {
  const currentSlug = "hazmat-logistics";

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
                Hazardous materials demand zero margin for error. Kronos is fully certified to move dangerous goods by road, air, and sea — under DOT, IATA DGR, IMDG, and NOM-002-SCT standards — with certified specialists managing every checkpoint. Built for the industries that can’t afford a mistake: chemical, petrochemical, pharmaceutical, energy, and industrial manufacturing.
              </p>
            </div>

            <div className={styles.advantagesSection}>
              <h2 className={styles.advantagesTitle}>The Kronos Hazmat Standard</h2>
              
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
