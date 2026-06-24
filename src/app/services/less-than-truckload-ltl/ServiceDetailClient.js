"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  DollarSign, 
  Award, 
  Shield, 
  Clock, 
  RefreshCw, 
  Truck, 
  Box, 
  AlertTriangle, 
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
    title: "Cost-Effective Shipping",
    desc: "Cost effective freight transportation by combining cargo from multiple shippers on a single trailer.",
    icon: <DollarSign size={24} />
  },
  {
    title: "Small Business Friendly",
    desc: "Ideal for small to medium businesses who do not ship in high volumes but require regular departures.",
    icon: <Award size={24} />
  },
  {
    title: "Improved Cargo Security",
    desc: "Improves security since shipments are often packed onto pallets and shrink-wrapped before loading.",
    icon: <Shield size={24} />
  },
  {
    title: "Real-Time Tracking",
    desc: "Easy to track so you always know where your cargo is and when it will arrive at its destination.",
    icon: <Clock size={24} />
  },
  {
    title: "Flexible Scheduling",
    desc: "Ideal for non-critical shipments, offering flexible transit options at a lower price point.",
    icon: <RefreshCw size={24} />
  }
];

const includedServices = [
  { title: "Common Carrier LTL", icon: <Truck size={20} /> },
  { title: "Consolidation", icon: <Box size={20} /> },
  { title: "Hazmat", icon: <AlertTriangle size={20} /> },
  { title: "International Custom Broker Agency", icon: <Globe size={20} /> }
];

export default function ServiceDetailClient() {
  const currentSlug = "less-than-truckload-ltl";

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
                If you want to reduce your freight costs, LTL (Less Than Truckload) is your best solution. It is ideal when your shipment does not require a dedicated trailer. Our LTL service combines shipments from multiple customers on a single trailer, offering more flexibility, efficiency, and significant savings on your daily transport operations.
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
