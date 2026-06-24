"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Truck, 
  Shield, 
  DollarSign, 
  Box, 
  Thermometer, 
  Maximize, 
  Layers, 
  AlertTriangle, 
  Zap, 
  RefreshCw, 
  PhoneCall 
} from "lucide-react";
import styles from "../ServiceDetail.module.css";

const servicesList = [
  { title: "Full Truckload (FTL)", slug: "full-truckload-ftl" },
  { title: "Less Than Truckload (LTL)", slug: "less-than-truckload-ltl" },
  { title: "Air Freight", slug: "air-freight" },
  { title: "Sea Freight", slug: "sea-freight" },
  { title: "Warehousing", slug: "warehousing" },
  { title: "4PL Logistics", slug: "4pl-logistics" },
  { title: "Hand Carrier Service", slug: "hand-carrier-service" },
  { title: "Bonded Carrier", slug: "bonded-carrier" },
  { title: "Trailer Rental", slug: "trailer-rental" }
];

const advantages = [
  {
    title: "Direct & Fast Transit",
    desc: "Fastest shipping method by land. Your freight goes directly from point A to point B without any extra stops.",
    icon: <Truck size={24} />
  },
  {
    title: "Dedicated & Safe Cargo",
    desc: "Best option for high volume cargo. Less risk of damage since the trailer is dedicated to your freight and remains closed from departure to destination.",
    icon: <Shield size={24} />
  },
  {
    title: "Cost-Effective Logistics",
    desc: "Allows you to ship large quantities of goods at a lower cost per unit, maximizing your budget efficiency.",
    icon: <DollarSign size={24} />
  }
];

const includedServices = [
  { title: "Dry Van", icon: <Box size={20} /> },
  { title: "Temperature Controlled (Reefer)", icon: <Thermometer size={20} /> },
  { title: "Oversized & Heavy Haul", icon: <Maximize size={20} /> },
  { title: "Flatbed", icon: <Layers size={20} /> },
  { title: "Hazardous Materials (Hazmat)", icon: <AlertTriangle size={20} /> },
  { title: "Expedited Shipping", icon: <Zap size={20} /> },
  { title: "Cross-Docking", icon: <RefreshCw size={20} /> }
];

export default function ServiceDetailClient() {
  const currentSlug = "full-truckload-ftl";

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
                We work closely and count with a very large, reliable, and high-quality carrier network to provide professional services and the best affordable rate for all your truckload needs. When you have a shipment that fills a standard trailer, or when you have a high-value cargo, our FTL shipping service is the best option to move your freight securely and efficiently.
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
