"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import styles from "./Coverage.module.css";

const airports = [
  "MEXICO CITY INTERNATIONAL AIRPORT CUSTOMS (AICM)",
  "FELIPE ÁNGELES INTERNATIONAL AIRPORT CUSTOMS (AIFA - NLU)",
  "GUADALAJARA INTERNATIONAL AIRPORT CUSTOMS (GDL)",
  "MONTERREY INTERNATIONAL AIRPORT CUSTOMS (MTY) - General Mariano Escobedo"
];

export default function Coverage() {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>COVERAGE IN MEXICO'S AIR CUSTOMS</h2>
          <div className={styles.divider}></div>

          <p className={styles.paragraph}>
            Kronos Logistics holds full authorization to operate within bonded facilities and customs zones at Mexico’s principal international airports — clearance that opens doors most carriers simply can’t access.
          </p>

          <p className={styles.paragraph}>
            Our drivers are extensively trained across general dry cargo and hazardous materials — authorized operators carrying ID badge and ANAM TAG credentials that grant access to the federal zone and enable the clearance and dispatch of import and export shipments without delay.
          </p>

          <motion.ul
            className={styles.airportList}
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {airports.map((airport, index) => (
              <motion.li key={index} className={styles.airportItem} variants={itemVariants}>
                <Check className={styles.checkIcon} size={20} strokeWidth={3} />
                <span>{airport}</span>
              </motion.li>
            ))}
          </motion.ul>

          <p className={styles.paragraph}>
            Backed by deep operational experience and advanced tracking technology, every shipment moves with the precision and security your cargo demands.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
