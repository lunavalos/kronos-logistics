"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import GlowBorder from "./GlowBorder";
import styles from "./OurServices.module.css";

const serviceItems = [
  {
    key: "ftl",
    slug: "full-truckload-ftl",
    image: "/services/trailer-rental.webp",
    video: "/services/trailer-rental-video.webm"
  },
  {
    key: "ltl",
    slug: "less-than-truckload-ltl",
    image: "/services/less-than-truckload.webp",
    video: "/services/less-than-truckload-video.webm"
  },
  {
    key: "air",
    slug: "air-freight",
    image: "/services/air-freight.webp",
    video: "/services/air-freight-video.webm"
  },
  {
    key: "hand",
    slug: "hand-carrier-service",
    image: "/services/hand-carrier-service-v2.webp",
    video: "/services/hand-carrier-service-video.webm"
  },
  {
    key: "sea",
    slug: "sea-freight",
    image: "/services/sea-freight.webp",
    video: "/services/sea-freight-video.webm"
  },
  {
    key: "warehousing",
    slug: "warehousing",
    image: "/services/warehousing.webp",
    video: "/services/warehousing-video.webm"
  },
  {
    key: "hazmat",
    slug: "hazmat-logistics",
    image: "/services/hazmat-service.webp",
    video: "/services/hazmat-service.webm"
  },
  {
    key: "fourpl",
    slug: "4pl-logistics",
    image: "/services/4pl-logistics.webp",
    video: "/services/4-pl-logistics-video.webm"
  },
  {
    key: "bonded",
    slug: "bonded-carrier",
    image: "/services/bonded-carrier.webp",
    video: "/services/bonded-carrier-video.webm"
  },
  {
    key: "trailer",
    slug: "trailer-rental",
    image: "/services/trailer-rental.webp",
    video: "/services/trailer-rental-video.webm"
  }
];

const MotionLink = motion(Link);

function ServiceCard({ service, index, t }) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video play error:", err));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const title = t(`services.${service.key}.title`);
  const description = t(`services.${service.key}.description`);
  const href = `/services/${service.slug}`;

  return (
    <MotionLink
      ref={ref}
      href={href}
      className={styles.card}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={service.image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={styles.image}
        loading="eager"
        unoptimized
      />
      {service.video && (
        <video
          ref={videoRef}
          src={service.video}
          loop
          muted
          playsInline
          className={styles.video}
        />
      )}
      <div className={styles.overlay}></div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </MotionLink>
  );
}

export default function OurServices({ showAll = false, hideHeader = false, hideButton = false }) {
  const t = useTranslations("OurServices");
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section className={styles.section}>
      <div className="container">
        {!hideHeader && (
          <div className={styles.header} ref={titleRef}>
            <div className={styles.titleReveal}>
              <motion.h2
                className={styles.title}
                initial={{ y: "100%", opacity: 0 }}
                animate={isTitleInView ? { y: "0%", opacity: 1 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {t("title")}
              </motion.h2>
            </div>
            <motion.div
              className={styles.redLine}
              initial={{ width: 0 }}
              animate={isTitleInView ? { width: 80 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            ></motion.div>
            <motion.p
              className={styles.quote}
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t("quote")}
            </motion.p>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t("subtitle")}
            </motion.p>
          </div>
        )}

        <div className={`${styles.grid} ${showAll ? styles.gridAll : styles.gridHome}`}>
          {(showAll ? serviceItems : serviceItems.slice(0, 7)).map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              t={t}
            />
          ))}
        </div>

        {!hideButton && (
          <motion.div
            className={styles.btnWrapper}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlowBorder>
              <Link href="/services" className={styles.switcherBtn}>
                <span className={styles.btnText}>{t("exploreAll")}</span>
                <span className={styles.btnIconWrapper}>
                  <ArrowRight size={18} className={styles.btnIcon} />
                </span>
              </Link>
            </GlowBorder>
          </motion.div>
        )}
      </div>
    </section>
  );
}
