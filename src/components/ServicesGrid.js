"use client";
import { motion } from "framer-motion";
import { Truck, Package, Plane, Ship, Warehouse, Network, Briefcase, ShieldCheck, Key } from "lucide-react";
import styles from "./ServicesGrid.module.css";

const services = [
  {
    title: "Full Truckload (FTL)",
    description: "We work closely and count with a very large, reliable and high quality carriers to provide professional services and the best affordable rate for all your truckload needs.",
    icon: <Truck size={32} />
  },
  {
    title: "Less Than Truckload (LTL)",
    description: "If you want to reduce your freight costs, LTL is your best solution being ideal when your shipment does not require a dedicated trailer.",
    icon: <Package size={32} />
  },
  {
    title: "Air Freight",
    description: "With our global experience we provide reliable and efficient air freight services in order to reach our customer's specific transportations and logistics needs.",
    icon: <Plane size={32} />
  },
  {
    title: "Sea Freight",
    description: "With the highest quality and security standards we offer deep sea shipping freight services, import and export from/to all main ports in the world.",
    icon: <Ship size={32} />
  },
  {
    title: "Warehousing",
    description: "We understand that industries require storage flexibility on their logistics chain, that's why we count with safe and reliable suppliers on the main ports.",
    icon: <Warehouse size={32} />
  },
  {
    title: "4PL Logistics",
    description: "A fourth-party logistics (4PL) provider acts as the main point of contact between the client and multiple logistics providers (3PLs), offering full supply chain management and optimization services.",
    icon: <Network size={32} />
  },
  {
    title: "Hand Carrier Service",
    description: "The hand-carry is characterized by operating in situations of extreme urgency. Provides a simple, efficient, and reliable onboard courier option.",
    icon: <Briefcase size={32} />
  },
  {
    title: "Bonded Carrier",
    description: "Transportation that is licensed to move freight through/across U.S. points of entry without having to pay duties, taxes and/or fees on those goods.",
    icon: <ShieldCheck size={32} />
  },
  {
    title: "Trailer Rental",
    description: "Rental gives you the freedom and flexibility to have exactly the trailers you need, whether you are looking for a short-term rental or a lease contract.",
    icon: <Key size={32} />
  }
];

export default function ServicesGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.title}
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={styles.quote}
          >
            "Price is what you pay. Value is what you get" - Warren Buffet
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={styles.description}
          >
            Companies need to be sure that their transportation provider can offer all types of freight management, high quality, personalized and innovative solutions based on their own business needs that's why we provide Global Logistics Services you can count on.
          </motion.p>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div key={index} className={styles.card} variants={itemVariants}>
              <div className={styles.iconWrapper}>
                {service.icon}
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
