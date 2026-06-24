"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  DollarSign, 
  Clock, 
  Shuffle, 
  TrendingUp, 
  MessageSquare, 
  ShieldCheck, 
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
    title: "Low Capital Commitment",
    desc: "Low capital commitment by not needing to invest in warehousing space, technology, transportation and employees to execute the logistics process.",
    icon: <DollarSign size={24} />
  },
  {
    title: "Time Saving",
    desc: "Time saving by eliminating the need of worrying about paperwork, billing, training and optimization involved on the logistics process.",
    icon: <Clock size={24} />
  },
  {
    title: "Flexibility",
    desc: "Flexibility by providing to our customers a much larger variety of services.",
    icon: <Shuffle size={24} />
  },
  {
    title: "Continuous Optimization",
    desc: "Continuously optimization by making custom made adjustments and improvements in your supply chain.",
    icon: <TrendingUp size={24} />
  },
  {
    title: "Effective Communication Management",
    desc: "Effective manage of communication through a single supplier instead of multiple individuals at different companies.",
    icon: <MessageSquare size={24} />
  },
  {
    title: "Clear Communication",
    desc: "Miscommunication and confusion will be avoided.",
    icon: <ShieldCheck size={24} />
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
                A third-party logistics (3PL) offers outsourced logistics services, we specialize in integrated operations that includes transportation, warehousing and customs services. We will make sure that your cargo will be where you need it to be by using the safest, fastest, most efficient and cost effective shipping method.
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
