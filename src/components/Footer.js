"use client";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Footer.module.css";

const services = [
  { name: "USMCA FTL", slug: "full-truckload-ftl" },
  { name: "USMCA LTL", slug: "less-than-truckload-ltl" },
  { name: "Air Freight", slug: "air-freight" },
  { name: "Hand Carrier Service", slug: "hand-carrier-service" },
  { name: "Sea Freight", slug: "sea-freight" },
  { name: "Warehousing", slug: "warehousing" },
  { name: "Hazmat Logistics", slug: "hazmat-logistics" },
  { name: "4PL Logistics", slug: "4pl-logistics" },
  { name: "Bonded Carrier", slug: "bonded-carrier" },
  { name: "Trailer Lease", slug: "trailer-rental" }
];

export default function Footer() {
  const t = useTranslations("Footer");

  const quickLinks = [
    { name: t("home"), href: "/" },
    { name: t("aboutUs"), href: "/about-us" },
    { name: t("services"), href: "/services" },
    { name: t("contactUs"), href: "/contact" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring", bounce: 0.2 } }
  };

  return (
    <footer className={styles.footer}>
      <motion.div 
        className={`container ${styles.grid}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        
        {/* Column 1: Brand */}
        <motion.div variants={itemVariants} className={styles.colBrand}>
          <Link href="/" className={styles.logo}>
            <Image 
              src="/logo-1.png" 
              alt="Kronos Logistics" 
              width={220} 
              height={55} 
              style={{ width: "100%", maxWidth: "220px", height: "auto" }}
            />
          </Link>
          <p className={styles.copyright}>
            {t("copyright")} - {new Date().getFullYear()}
          </p>
        </motion.div>

        {/* Column 2: Quick Links */}
        <motion.div variants={itemVariants} className={styles.colLinks}>
          <h4 className={styles.colTitle}>{t("quickLinks")}</h4>
          <ul className={styles.list}>
            {quickLinks.map((link, i) => (
              <li key={i}>
                <Link href={link.href} className={styles.link}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 3: Services */}
        <motion.div variants={itemVariants} className={styles.colServices}>
          <h4 className={styles.colTitle}>{t("servicesTitle")}</h4>
          <ul className={styles.list}>
            {services.map((service, i) => (
              <li key={i}>
                <Link href={`/services/${service.slug}`} className={styles.link}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Column 4: Credits & Policy */}
        <motion.div variants={itemVariants} className={styles.colCredits}>
          <Link href="/privacy-policy" className={styles.privacyLink}>
            {t("privacyPolicy")}
          </Link>
          <div className={styles.divider}></div>
          <p className={styles.createdBy} style={{ marginBottom: "4px" }}>{t("createdBy")}</p>
          <Image
            src="/credits-logo-gray.png"
            alt="LunAvalos"
            width={95}
            height={24}
            className={styles.creditsLogo}
            style={{ width: "100%", maxWidth: "95px", height: "auto" }}
          />
        </motion.div>

      </motion.div>
    </footer>
  );
}
