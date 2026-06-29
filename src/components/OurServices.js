"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PixelCanvas from "./PixelCanvas";
import GlowBorder from "./GlowBorder";
import styles from "./OurServices.module.css";

const services = [
  {
    title: "USMCA FTL",
    description: "Move full truckload freight seamlessly across Mexico, the United States, and Canada under the USMCA trade agreement — with the speed your just-in-time operation demands and the compliance your supply chain requires.",
    image: "/services/trailer-rental.webp",
    video: "/services/trailer-rental-video.webm"
  },
  {
    title: "USMCA LTL",
    description: "Move less-than-truckload freight across Mexico, the United States, and Canada — without paying for space you don't need. We connect you to an extensive network of certified carriers across all three countries.",
    image: "/services/less-than-truckload.webp",
    video: "/services/less-than-truckload-video.webm"
  },
  {
    title: "Air Freight",
    description: "When speed determines outcome, KRONOS delivers air freight engineered for security and reliability, supported by technology that ensures complete traceability from origin to destination.",
    image: "/services/air-freight.webp",
    video: "/services/air-freight-video.webm"
  },
  {
    title: "Hand Carrier Service",
    description: "Kronos Hand Carrier exists for the cargo that cannot be replaced, cannot be delayed, and cannot be trusted to a warehouse floor. Courier airborne within hours.",
    image: "/services/hand-carrier-service-v2.webp",
    video: "/services/hand-carrier-service-video.webm"
  },
  {
    title: "Sea Freight",
    description: "We provide global ocean freight through the commercial ports that matter most, connecting every continent under a single trusted partner with FCL and LCL options.",
    image: "/services/sea-freight.webp",
    video: "/services/sea-freight-video.webm"
  },
  {
    title: "Warehousing",
    description: "Kronos operates a network of certified, monitored warehousing facilities at strategic hubs, giving your cargo a safe, well-placed waypoint between origin and destination.",
    image: "/services/warehousing.webp",
    video: "/services/warehousing-video.webm"
  },
  {
    title: "Hazmat Logistics",
    description: "Precise execution and total compliance for hazardous materials by road, air, and sea under DOT, IATA DGR, IMDG, and NOM-002-SCT standards.",
    image: "/services/hazmat-service.webp",
    video: "/services/hazmat-service.webm"
  },
  {
    title: "4PL Logistics",
    description: "As your fourth-party logistics (4PL) partner, KRONOS assumes full ownership of your logistics operation — transportation, warehousing, and customs — orchestrated as a single, seamless system.",
    image: "/services/4pl-logistics.webp",
    video: "/services/4-pl-logistics-video.webm"
  },
  {
    title: "Bonded Carrier",
    description: "Move your freight through U.S. ports, border crossings, and FTZ warehouses without paying duties or taxes upfront, keeping your cargo compliant and capital working.",
    image: "/services/bonded-carrier.webp",
    video: "/services/bonded-carrier-video.webm"
  },
  {
    title: "Trailer Lease",
    description: "Scale your capacity on demand — without the capital commitment of owning a fleet. Immediate access to a modern, well-maintained trailer fleet.",
    image: "/services/trailer-rental.webp",
    video: "/services/trailer-rental-video.webm"
  }
];

const serviceSlugs = {
  "USMCA FTL": "full-truckload-ftl",
  "USMCA LTL": "less-than-truckload-ltl",
  "Air Freight": "air-freight",
  "Sea Freight": "sea-freight",
  "Warehousing": "warehousing",
  "4PL Logistics": "4pl-logistics",
  "Hand Carrier Service": "hand-carrier-service",
  "Bonded Carrier": "bonded-carrier",
  "Trailer Lease": "trailer-rental",
  "Hazmat Logistics": "hazmat-logistics"
};

const MotionLink = motion(Link);

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const pixelRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const handleMouseEnter = () => {
    // pixelRef.current?.appear();
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video play error:", err));
    }
  };

  const handleMouseLeave = () => {
    // pixelRef.current?.disappear();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const slug = serviceSlugs[service.title] || "";
  const href = slug ? `/services/${slug}` : "/services";

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
        alt={service.title}
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
      {/* <div className={styles.pixelLayer}>
        <PixelCanvas
          ref={pixelRef}
          colors="#fca5a5,#f87171,#ef4444,#ffffff"
          gap={6}
          speed={35}
        />
      </div> */}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{service.title}</h3>
        <p className={styles.cardDescription}>{service.description}</p>
      </div>
    </MotionLink>
  );
}

export default function OurServices({ showAll = false, hideHeader = false, hideButton = false }) {
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
                OUR SERVICES
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
              Reliable Solutions. Global Network. Built on Trust.
            </motion.p>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Companies need to be sure that their transportation provider can offer all types of freight management, high quality, personalized and innovative solutions based on their own business needs that&apos;s why we provide Global Logistics Services you can count on.
            </motion.p>
          </div>
        )}

        <div className={`${styles.grid} ${showAll ? styles.gridAll : styles.gridHome}`}>
          {(showAll ? services : services.slice(0, 7)).map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
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
                <span className={styles.btnText}>Explore All Services</span>
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
