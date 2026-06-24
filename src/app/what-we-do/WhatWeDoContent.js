"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Truck, Package, Wind, Waves, Warehouse, Shield, HandHelping, Repeat } from "lucide-react";
import styles from "./WhatWeDo.module.css";

const services = [
  {
    icon: Truck,
    title: "Full Truckload (FTL)",
    description:
      "Full truckload services for domestic and international needs. We work with a large network of reliable carriers providing dry van, temperature-controlled, oversized, and flatbed solutions.",
    href: "/services/full-truckload-ftl",
  },
  {
    icon: Package,
    title: "Less Than Truckload (LTL)",
    description:
      "Reduce freight costs by sharing trailer space with other shipments. Ideal when your cargo doesn't require a full dedicated trailer, offering flexibility and competitive rates.",
    href: "/services/less-than-truckload-ltl",
  },
  {
    icon: Wind,
    title: "Air Freight",
    description:
      "Reliable and efficient air freight services tailored to your specific transportation needs. We analyze your freight size and budget to deliver the most cost-effective airborne solution.",
    href: "/services/air-freight",
  },
  {
    icon: Waves,
    title: "Sea Freight",
    description:
      "Deep sea shipping with the highest quality and security standards. We handle import and export FCL/LCL from all major world ports with full customs compliance.",
    href: "/services/sea-freight",
  },
  {
    icon: Warehouse,
    title: "Warehousing",
    description:
      "Safe and reliable storage solutions at major ports with 24/7 monitored surveillance. We provide the storage flexibility your logistics chain requires.",
    href: "/services/warehousing",
  },
  {
    icon: Repeat,
    title: "4PL Logistics",
    description:
      "A fourth-party logistics provider offering outsourced, integrated operations — including transportation, warehousing, and customs services — under one unified management layer.",
    href: "/services/4pl-logistics",
  },
  {
    icon: HandHelping,
    title: "Hand Carrier Service",
    description:
      "Designed for extreme urgency. Our on-board courier service provides a simple, efficient, and reliable option for your most time-sensitive shipments.",
    href: "/services/hand-carrier-service",
  },
  {
    icon: Shield,
    title: "Bonded Carrier",
    description:
      "Licensed to move freight through U.S. points of entry — FTZ warehouses, ports, and border crossings — without paying duties, taxes, or fees during transit.",
    href: "/services/bonded-carrier",
  },
  {
    icon: Truck,
    title: "Trailer Rental",
    description:
      "Freedom and flexibility to have exactly the trailers you need. Choose between short-term day-to-day rentals or longer-term lease contracts tailored to your operations.",
    href: "/services/trailer-rental",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.07 },
  }),
};

export default function WhatWeDoContent() {
  return (
    <>
      {/* Intro Section */}
      <section className={styles.introSection}>
        <div className="container">
          <motion.div
            className={styles.introWrapper}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.introText}>
              <h2 className={styles.heading}>KRONOS LOGISTICS</h2>
              <div className={styles.redLine} />
              <p className={styles.subtitle}>Full-Service Transportation &amp; Logistics Provider.</p>
              <p className={styles.body}>
                Kronos Logistics is a full-service transportation and logistics provider specialized in
                tailored solutions for your logistical challenges. We offer full truckload services
                (domestic/international), LTL, urgent shipments, air, ocean (FCL/LCL), brokerage, and
                warehousing.
              </p>
              <p className={styles.body}>
                We understand that each customer has their own characteristics and priorities, and also wants
                to keep costs to a minimum. Our main goal is to provide you with the best logistics
                experience at the most competitive rates.
              </p>
              <Link href="/contact" className={styles.ctaBtn}>
                Get a Quote
              </Link>
            </div>

            <div className={styles.introStats}>
              <motion.div
                className={styles.statCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className={styles.statNum}>24/7</span>
                <span className={styles.statLabel}>Support</span>
              </motion.div>
              <motion.div
                className={styles.statCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>Commitment</span>
              </motion.div>
              <motion.div
                className={styles.statCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className={styles.statNum}>9+</span>
                <span className={styles.statLabel}>Services</span>
              </motion.div>
              <motion.div
                className={styles.statCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className={styles.statNum}>3</span>
                <span className={styles.statLabel}>Continents</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className={styles.servicesSection}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.sectionTitle}>SERVICES WE OFFER</h2>
            <div className={styles.sectionLine} />
            <p className={styles.sectionSubtitle}>
              A complete range of logistics solutions — all under one roof.
            </p>
          </motion.div>

          <div className={styles.grid}>
            {services.map((service, i) => (
              <motion.div
                key={i}
                className={styles.card}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className={styles.iconWrap}>
                  <service.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
                <Link href={service.href} className={styles.cardLink}>
                  Learn More →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
