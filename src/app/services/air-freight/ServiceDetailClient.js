"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Zap, 
  Clock, 
  Shield, 
  Box, 
  Award, 
  Plane, 
  Briefcase, 
  RefreshCw, 
  Globe, 
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
    title: "Fastest Shipping Method",
    desc: "Your cargo can travel long distances in a short period of time, ensuring urgent deliveries meet their deadlines.",
    icon: <Zap size={24} />
  },
  {
    title: "Reliable Scheduling & Tracking",
    desc: "Reliable arrival and departure times with easy real-time tracking allowing you to check the status of your cargo at any moment.",
    icon: <Clock size={24} />
  },
  {
    title: "High Level of Security",
    desc: "Strict airport security controls reduce the risk of theft and eliminate potential cargo contamination.",
    icon: <Shield size={24} />
  },
  {
    title: "Reduced Damage Risk",
    desc: "Fewer touchpoints and minimal handling of items during transit significantly lower the probability of damage.",
    icon: <Box size={24} />
  }
];

const includedServices = [
  { title: "Next Flight Out", icon: <Zap size={20} /> },
  { title: "Priority Shipping", icon: <Award size={20} /> },
  { title: "Charter Services", icon: <Plane size={20} /> },
  { title: "Hand Carrier", icon: <Briefcase size={20} /> },
  { title: "Counter to Counter", icon: <RefreshCw size={20} /> },
  { title: "International Custom Broker Agency", icon: <Globe size={20} /> }
];

export default function ServiceDetailClient() {
  const currentSlug = "air-freight";

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
                With our global experience, we provide reliable and efficient air freight services to meet our customers' specific transportation and logistics needs. We will analyze your freight size and budget so we can offer you the most appropriate, cost-effective solution to move your cargo quickly and securely.
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

            {/* Our Services Include Section */}
            <div className={styles.includedSection}>
              <h2 className={styles.includedTitle}>Our Services Include</h2>
              
              <div className={styles.includedGrid}>
                {includedServices.map((service, idx) => (
                  <motion.div
                    key={idx}
                    className={styles.includedCard}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                  >
                    <div className={styles.includedIconWrapper}>
                      {service.icon}
                    </div>
                    <span className={styles.includedText}>{service.title}</span>
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
