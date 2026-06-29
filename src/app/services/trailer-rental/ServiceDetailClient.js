"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  DollarSign, 
  Shield, 
  Layers, 
  Clock, 
  Box, 
  Truck, 
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
    title: "Lower Capital Cost",
    desc: "Rental gives you the freedom and flexibility to have exactly the trailers you need at a lower cost than purchasing.",
    icon: <DollarSign size={24} />
  },
  {
    title: "Zero Maintenance Costs",
    desc: "No maintenance cost since we handle regular servicing and inspections, ensuring total compliance and safety.",
    icon: <Shield size={24} />
  },
  {
    title: "No Static Asset Fees",
    desc: "Avoid long-term storage fees and static asset costs by using our trailers only when active and needed.",
    icon: <Layers size={24} />
  },
  {
    title: "Flexible Rental Durations",
    desc: "Trailer rental for the exact time you need—whether you are looking for a short-term rental or a long-term lease contract.",
    icon: <Clock size={24} />
  }
];

const includedServices = [
  { title: "Dry Van Trailers", icon: <Box size={20} /> },
  { title: "Flatbed Trailers", icon: <Layers size={20} /> },
  { title: "Specialized Equipment", icon: <Truck size={20} /> }
];

export default function ServiceDetailClient() {
  const currentSlug = "trailer-rental";

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
                Rental gives you the freedom and flexibility to have exactly the trailers you need, whether you are looking for a short-term rental to meet peak season demand or a lease contract for long-term fleet scaling. We offer well-maintained, reliable trailer equipment ready to move your cargo.
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
              <h2 className={styles.includedTitle}>Equipment Options</h2>
              
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
