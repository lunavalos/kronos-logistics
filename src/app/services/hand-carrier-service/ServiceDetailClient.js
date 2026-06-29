"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Plane, 
  Shield, 
  Clock, 
  Activity, 
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
    title: "Maximum Speed & Urgency",
    desc: "Fastest shipping method. The courier boards the next flight out to deliver the cargo directly to its final destination.",
    icon: <Plane size={24} />
  },
  {
    title: "End-to-End Custody",
    desc: "Total custody and control. The courier maintains hands-on custody of the cargo at all times from pick-up to delivery.",
    icon: <Shield size={24} />
  },
  {
    title: "Accelerated Customs",
    desc: "Reduces custom clearance times. The cargo travels as passenger baggage, which speeds up custom procedures at destination.",
    icon: <Clock size={24} />
  },
  {
    title: "Constant Monitoring",
    desc: "Monitored transit. Real-time updates and direct communication with the courier throughout the entire trip.",
    icon: <Activity size={24} />
  }
];

export default function ServiceDetailClient() {
  const currentSlug = "hand-carrier-service";

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
                The hand-carry / onboard courier is characterized by operating in situations of extreme urgency. When a company needs to deliver cargo immediately (critical parts, prototypes, or high-value items) to avoid line stoppages or heavy penalty fees, this service is the best solution. We will assign a dedicated courier to accompany your cargo on board a passenger flight to ensure custody, speed, and delivery.
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
