"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Maximize, 
  Shield, 
  DollarSign, 
  Box, 
  Layers, 
  Truck, 
  Globe, 
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
    title: "Oversized & Heavy Cargo",
    desc: "Heavy cargo capability by covering many types of oversized and high-volume freight formats.",
    icon: <Maximize size={24} />
  },
  {
    title: "Maximum Transit Safety",
    desc: "Vessels are highly capable of carrying hazardous materials and specialized cargo under strict international safety standards.",
    icon: <Shield size={24} />
  },
  {
    title: "Affordable Global Rates",
    desc: "For intercontinental logistics, sea freight allows moving larger cargo volumes at significantly lower costs compared to air freight.",
    icon: <DollarSign size={24} />
  }
];

const includedServices = [
  { title: "Full Container Load (FCL)", icon: <Box size={20} /> },
  { title: "Less than Container Load (LCL)", icon: <Layers size={20} /> },
  { title: "Drayage", icon: <Truck size={20} /> },
  { title: "International Custom Broker Agency", icon: <Globe size={20} /> }
];

export default function ServiceDetailClient() {
  const currentSlug = "sea-freight";

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
                With the highest quality and security standards, we offer deep sea shipping freight services, import, and export from/to all main ports in the world. Kronos Logistics is capable of providing you with the best shipping logistics and comprehensive customs compliance for your international shipments.
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
