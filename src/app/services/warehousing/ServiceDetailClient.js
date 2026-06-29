"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  DollarSign, 
  MapPin, 
  Layers, 
  Briefcase, 
  Package, 
  Truck, 
  ClipboardCheck, 
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
    title: "Operational Cost Savings",
    desc: "Costs savings by eliminating the expenses of facility maintenance, dedicated employees, and specialized storage equipment.",
    icon: <DollarSign size={24} />
  },
  {
    title: "Strategic Distribution",
    desc: "Establish strategic distribution points near main ports and logistics hubs to optimize transit times.",
    icon: <MapPin size={24} />
  },
  {
    title: "Facility Space Optimization",
    desc: "Save valuable floor space in your own facility by storing excess inventory in our secure network.",
    icon: <Layers size={24} />
  },
  {
    title: "Seamless Business Extension",
    desc: "Our warehousing network becomes an extension of your business without the need to increase direct labor or management overhead.",
    icon: <Briefcase size={24} />
  }
];

const includedServices = [
  { title: "Packaging", icon: <Package size={20} /> },
  { title: "Loading / Unloading", icon: <Truck size={20} /> },
  { title: "Cycle Counts & Inventory Control", icon: <ClipboardCheck size={20} /> }
];

export default function ServiceDetailClient() {
  const currentSlug = "warehousing";

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
                We understand that modern industries require high storage flexibility along their logistics chain. That’s why we partner with safe, secure, and reliable warehousing providers at main ports and strategic locations, allowing you to keep your cargo under constant monitored surveillance and professional management.
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
