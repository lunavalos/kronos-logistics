"use client";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { 
  ArrowRight, 
  PhoneCall,
  Globe,
  ShieldCheck,
  Eye,
  UserCheck,
  DollarSign,
  TrendingUp,
  CheckSquare,
  Zap,
  Clock,
  Shield,
  Box,
  Award,
  Plane,
  Briefcase,
  RefreshCw,
  Lock,
  Truck,
  Thermometer,
  Maximize,
  Layers,
  AlertTriangle,
  Activity,
  ShieldAlert,
  FileText,
  MapPin,
  Package,
  ClipboardCheck,
  TrendingDown
} from "lucide-react";
import styles from "../ServiceDetail.module.css";

const serviceIcons = {
  "4pl-logistics": {
    advantages: [
      <Globe size={24} key="g" />,
      <ShieldCheck size={24} key="sc" />,
      <Eye size={24} key="e" />,
      <UserCheck size={24} key="uc" />,
      <DollarSign size={24} key="ds" />,
      <TrendingUp size={24} key="tu" />,
      <CheckSquare size={24} key="cs" />
    ]
  },
  "air-freight": {
    advantages: [
      <Zap size={24} key="z" />,
      <Clock size={24} key="c" />,
      <Shield size={24} key="s" />,
      <Box size={24} key="b" />
    ],
    included: [
      <Zap size={20} key="z2" />,
      <Award size={20} key="aw" />,
      <Plane size={20} key="p" />,
      <Briefcase size={20} key="bc" />,
      <RefreshCw size={20} key="rcw" />,
      <Globe size={20} key="g2" />
    ]
  },
  "bonded-carrier": {
    advantages: [
      <Globe size={24} key="g" />,
      <Box size={24} key="b" />,
      <TrendingDown size={24} key="td" />,
      <Lock size={24} key="l" />
    ]
  },
  "full-truckload-ftl": {
    advantages: [
      <Truck size={24} key="t" />,
      <Shield size={24} key="s" />,
      <DollarSign size={24} key="ds" />
    ],
    included: [
      <Box size={20} key="b" />,
      <Thermometer size={20} key="th" />,
      <Maximize size={20} key="m" />,
      <Layers size={20} key="lay" />,
      <AlertTriangle size={20} key="at" />,
      <Zap size={20} key="z" />,
      <RefreshCw size={20} key="rcw" />
    ]
  },
  "hand-carrier-service": {
    advantages: [
      <Plane size={24} key="p" />,
      <Shield size={24} key="s" />,
      <Clock size={24} key="c" />,
      <Activity size={24} key="act" />
    ]
  },
  "hazmat-logistics": {
    advantages: [
      <ShieldCheck size={24} key="sc" />,
      <ShieldAlert size={24} key="sa" />,
      <FileText size={24} key="ft" />,
      <Eye size={24} key="e" />
    ]
  },
  "less-than-truckload-ltl": {
    advantages: [
      <DollarSign size={24} key="ds" />,
      <Award size={24} key="aw" />,
      <Shield size={24} key="s" />,
      <Clock size={24} key="c" />,
      <RefreshCw size={24} key="rcw" />
    ],
    included: [
      <Truck size={20} key="t" />,
      <Box size={20} key="b" />,
      <AlertTriangle size={20} key="at" />,
      <Globe size={20} key="g" />
    ]
  },
  "sea-freight": {
    advantages: [
      <Maximize size={24} key="m" />,
      <Shield size={24} key="s" />,
      <DollarSign size={24} key="ds" />
    ],
    included: [
      <Box size={20} key="b" />,
      <Layers size={20} key="lay" />,
      <Truck size={20} key="t" />,
      <Globe size={20} key="g" />
    ]
  },
  "trailer-rental": {
    advantages: [
      <DollarSign size={24} key="ds" />,
      <Shield size={24} key="s" />,
      <Layers size={24} key="lay" />,
      <Clock size={24} key="c" />
    ],
    included: [
      <Box size={20} key="b" />,
      <Layers size={20} key="lay" />,
      <Truck size={20} key="t" />
    ]
  },
  "warehousing": {
    advantages: [
      <DollarSign size={24} key="ds" />,
      <MapPin size={24} key="mp" />,
      <Layers size={24} key="lay" />,
      <Briefcase size={24} key="bc" />
    ],
    included: [
      <Package size={20} key="pkg" />,
      <Truck size={20} key="t" />,
      <ClipboardCheck size={20} key="cc" />
    ]
  }
};

export default function ServiceDetailClient({ slug }) {
  const tGlobal = useTranslations("Footer");
  const t = useTranslations(`Services.${slug}`);
  const tSidebar = useTranslations("ServicesSidebar");
  const tServices = useTranslations("OurServices");

  const icons = serviceIcons[slug] || { advantages: [] };

  const advantagesCount = icons.advantages.length;
  const advantages = [];
  for (let i = 0; i < advantagesCount; i++) {
    advantages.push({
      title: t(`advantages.${i}.title`),
      desc: t(`advantages.${i}.desc`),
      icon: icons.advantages[i]
    });
  }

  const included = [];
  if (icons.included) {
    const includedCount = icons.included.length;
    for (let i = 0; i < includedCount; i++) {
      included.push({
        title: t(`included.${i}`),
        icon: icons.included[i]
      });
    }
  }

  const sidebarServicesList = [
    { key: "ftl", slug: "full-truckload-ftl" },
    { key: "ltl", slug: "less-than-truckload-ltl" },
    { key: "air", slug: "air-freight" },
    { key: "hand", slug: "hand-carrier-service" },
    { key: "sea", slug: "sea-freight" },
    { key: "warehousing", slug: "warehousing" },
    { key: "hazmat", slug: "hazmat-logistics" },
    { key: "fourpl", slug: "4pl-logistics" },
    { key: "bonded", slug: "bonded-carrier" },
    { key: "trailer", slug: "trailer-rental" }
  ];

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
              <p>{t("intro")}</p>
            </div>

            <div className={styles.advantagesSection}>
              <h2 className={styles.advantagesTitle}>{t("advantagesTitle")}</h2>
              
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
            {included.length > 0 && (
              <div className={styles.includedSection}>
                <h2 className={styles.includedTitle}>{t("includedTitle")}</h2>
                
                <div className={styles.includedGrid}>
                  {included.map((service, idx) => (
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
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.aside 
            className={styles.sidebar}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h3 className={styles.sidebarTitle}>{tGlobal("servicesTitle")}</h3>
              <div className={styles.sidebarList}>
                {sidebarServicesList.map((service, idx) => (
                  <Link 
                    key={idx}
                    href={`/services/${service.slug}`}
                    className={`${styles.sidebarLink} ${service.slug === slug ? styles.sidebarLinkActive : ""}`}
                  >
                    <span>{tServices(`services.${service.key}.title`)}</span>
                    <ArrowRight size={16} className={styles.sidebarIcon} />
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.ctaBox}>
              <PhoneCall size={32} className={styles.ctaIcon} />
              <h4 className={styles.ctaTitle}>{tSidebar("title")}</h4>
              <p className={styles.ctaText}>{tSidebar("text")}</p>
              <Link href="/contact" className={styles.ctaBtn}>
                {tSidebar("button")}
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
