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
  TrendingDown,
  Users,
  Tag
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
      <Eye size={24} key="e" />,
      <ShieldCheck size={24} key="sc" />,
      <Shield size={24} key="s" />,
      <Box size={24} key="b" />,
      <Globe size={24} key="g" />,
      <ClipboardCheck size={24} key="cc" />
    ],
    included: [
      <DollarSign size={20} key="ds" />,
      <Clock size={20} key="cl2" />,
      <Plane size={20} key="p" />
    ]
  },
  "bonded-carrier": {
    advantages: [
      <DollarSign size={24} key="ds" />,
      <Globe size={24} key="g" />,
      <Clock size={24} key="c" />,
      <ShieldCheck size={24} key="sc" />,
      <ClipboardCheck size={24} key="cc" />
    ]
  },
  "full-truckload-ftl": {
    advantages: [
      <Globe size={24} key="g" />,
      <Clock size={24} key="c" />,
      <ShieldCheck size={24} key="sc" />,
      <Activity size={24} key="act" />,
      <CheckSquare size={24} key="cs" />,
      <FileText size={24} key="ft" />,
      <Truck size={24} key="t" />
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
    ],
    included: [
      <Award size={20} key="aw" />,
      <Globe size={20} key="g" />,
      <Zap size={20} key="z" />,
      <ClipboardCheck size={20} key="cc" />,
      <MapPin size={20} key="mp" />
    ]
  },
  "hazmat-logistics": {
    advantages: [
      <Globe size={24} key="g" />,
      <ShieldAlert size={24} key="sa" />,
      <MapPin size={24} key="mp" />,
      <FileText size={24} key="ft" />,
      <Activity size={24} key="act" />,
      <UserCheck size={24} key="uc" />
    ]
  },
  "less-than-truckload-ltl": {
    advantages: [
      <Globe size={24} key="g" />,
      <Clock size={24} key="c" />,
      <Activity size={24} key="act" />,
      <ShieldCheck size={24} key="sc" />,
      <FileText size={24} key="ft" />,
      <MapPin size={24} key="mp" />,
      <DollarSign size={24} key="ds" />
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
      <Globe size={24} key="g" />,
      <Box size={24} key="b" />,
      <ShieldCheck size={24} key="sc" />,
      <Activity size={24} key="act" />,
      <UserCheck size={24} key="uc" />
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
      <Users size={24} key="us" />,
      <ShieldCheck size={24} key="sc" />
    ],
    included: [
      <Package size={20} key="pkg" />,
      <Truck size={20} key="t" />,
      <RefreshCw size={20} key="rcw" />,
      <Tag size={20} key="tag" />,
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
    try {
      const rawIncluded = t.raw("included");
      if (Array.isArray(rawIncluded)) {
        for (let i = 0; i < rawIncluded.length; i++) {
          const item = rawIncluded[i];
          if (typeof item === 'string') {
            included.push({
              title: item,
              icon: icons.included[i]
            });
          } else {
            included.push({
              title: item.title,
              desc: item.desc,
              icon: icons.included[i]
            });
          }
        }
      }
    } catch(e) {
      // Fallback
      const includedCount = icons.included.length;
      for (let i = 0; i < includedCount; i++) {
        included.push({
          title: t(`included.${i}`),
          icon: icons.included[i]
        });
      }
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
              {Array.isArray(t.raw("intro")) 
                ? t.raw("intro").map((para, idx) => <p key={idx} style={idx > 0 ? {marginTop: '1rem'} : {}}>{para}</p>)
                : <p>{t("intro")}</p>}
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
                      <div className={styles.includedTextContent} style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className={styles.includedText}>{service.title}</span>
                        {service.desc && <span className={styles.includedDesc} style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px', fontWeight: 'normal' }}>{service.desc}</span>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {t.has?.("outro") && t("outro") !== "outro" && t("outro") !== "Services." + slug + ".outro" && (
              <div className={styles.introText} style={{ marginTop: '2.5rem', fontWeight: 'bold' }}>
                <p>{t("outro")}</p>
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
