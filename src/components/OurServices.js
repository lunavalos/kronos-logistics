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
    title: "Full Truckload (FTL)",
    description: "We work closely and count with a very large, reliable and high quality carriers to provide professional services and the best affordable rate for all your truckload needs...",
    image: "/services/trailer-rental.webp",
    video: "/services/trailer-rental-video.webm"
  },
  {
    title: "Less Than Truckload (LTL)",
    description: "If you want to reduce your freight costs, LTL is your best solution being ideal when your shipment does not require a dedicated trailer... ",
    image: "/services/less-than-truckload.webp",
    video: "/services/less-than-truckload-video.webm"
  },
  {
    title: "Air Freight",
    description: "With our global experience we provide reliable and efficient air freight services in order to reach our customer's specific transportations and logistics needs...",
    image: "/services/air-freight.webp",
    video: "/services/air-freight-video.webm"
  },
  {
    title: "Sea Freight",
    description: "We offer competitive ocean freight solutions for international shipments, ensuring your cargo arrives safely and on schedule across all major ports...",
    image: "/services/sea-freight.webp",
    video: "/services/sea-freight-video.webm"
  },
  {
    title: "Warehousing",
    description: "Our warehousing services provide secure, climate-controlled storage with inventory management solutions tailored to your supply chain requirements...",
    image: "/services/warehousing.webp",
    video: "/services/warehousing-video.webm"
  },
  {
    title: "4PL Logistics",
    description: "A fourth-party logistics (4PL) provider acts as the main point of contact between the client and multiple logistics providers (4PLs)...",
    image: "/services/4pl-logistics.webp",
    video: "/services/4-pl-logistics-video.webm"
  },
  {
    title: "Hand Carrier Service",
    description: "The hand-carry is characterized by operating in situations of extreme urgency. Provides a simple, efficient, and reliable onboard courier option.",
    image: "/services/hand-carrier-service-v2.webp",
    video: "/services/hand-carrier-service-video.webm"
  },
  {
    title: "Bonded Carrier",
    description: "Transportation that is licensed to move freight through/across U.S. points of entry without having to pay duties, taxes and/or fees on those goods.",
    image: "/services/bonded-carrier.webp",
    video: "/services/bonded-carrier-video.webm"
  },
  {
    title: "Trailer Rental",
    description: "Rental gives you the freedom and flexibility to have exactly the trailers you need, whether you are looking for a short-term rental or a lease contract.",
    image: "/services/trailer-rental.webp",
    video: "/services/trailer-rental-video.webm"
  }
];

const serviceSlugs = {
  "Full Truckload (FTL)": "full-truckload-ftl",
  "Less Than Truckload (LTL)": "less-than-truckload-ltl",
  "Air Freight": "air-freight",
  "Sea Freight": "sea-freight",
  "Warehousing": "warehousing",
  "4PL Logistics": "4pl-logistics",
  "Hand Carrier Service": "hand-carrier-service",
  "Bonded Carrier": "bonded-carrier",
  "Trailer Rental": "trailer-rental",
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
      videoRef.current.playbackRate = 1.5;
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
              &ldquo;Price is what you pay. Value is what you get&rdquo;. Warren Buffet
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

        <div className={`${styles.grid} ${showAll ? styles.gridAll : ""}`}>
          {(showAll ? services : services.slice(0, 6)).map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
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
