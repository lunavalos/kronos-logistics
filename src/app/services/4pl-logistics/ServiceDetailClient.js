"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  PhoneCall,
  Globe,
  Eye,
  UserCheck,
  CheckSquare
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
    title: "Global Reach, Local Execution",
    desc: "Operating across borders and markets through an established international network, moving your cargo wherever your business takes you.",
    icon: <Globe size={24} />
  },
  {
    title: "Secure, Reliable Movement",
    desc: "Cargo is safeguarded and monitored from origin to final destination, minimizing risk at every point of the journey.",
    icon: <ShieldCheck size={24} />
  },
  {
    title: "Technology-Driven Visibility",
    desc: "A fully integrated digital platform delivers real-time tracking and data across every stage of your supply chain, with nothing left to guesswork.",
    icon: <Eye size={24} />
  },
  {
    title: "Expert Hands, Every Step",
    desc: "Supply chain and customs specialists oversee every movement, navigating regulatory complexity to keep your cargo flowing without interruption.",
    icon: <UserCheck size={24} />
  },
  {
    title: "Capital Preserved",
    desc: "Your resources remain invested in your core business, not in warehouses, fleets, or infrastructure.",
    icon: <DollarSign size={24} />
  },
  {
    title: "Continuous Refinement",
    desc: "Your supply chain evolves through deliberate, data-informed adjustments, never a standard template.",
    icon: <TrendingUp size={24} />
  },
  {
    title: "One Relationship, Complete Accountability",
    desc: "A single point of contact at KRONOS orchestrates every moving part, with nothing left to interpretation.",
    icon: <CheckSquare size={24} />
  }
];

export default function ServiceDetailClient() {
  const currentSlug = "4pl-logistics";

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
                A dedicated partner for your supply chain, not merely a provider. As your fourth-party logistics (4PL) partner, KRONOS assumes full ownership of your logistics operation — transportation, warehousing, and customs — orchestrated as a single, seamless system spanning an international network of partners, ports, and gateways. Every shipment is engineered with precision, security, and visibility, powered by an integrated technology platform and overseen by specialists in supply chain and customs management who anticipate complexity before it becomes a delay.
              </p>
            </div>

            <div className={styles.advantagesSection}>
              <h2 className={styles.advantagesTitle}>The KRONOS Advantage</h2>
              
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
