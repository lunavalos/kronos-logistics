"use client";
import { useState, useEffect, useRef } from "react";
import { Link, useRouter, usePathname } from "@/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown, Globe } from "lucide-react";
import GlowBorder from "./GlowBorder";
import styles from "./Navbar.module.css";
import locales from "@/i18n/locales.json";

const languageNames = {
  en: "English",
  es: "Español",
  pt: "Português",
  fr: "Français",
  zh: "中文"
};

const serviceItems = [
  { key: "ftl", slug: "full-truckload-ftl" },
  { key: "ltl", slug: "less-than-truckload-ltl" },
  { key: "air", slug: "air-freight" },
  { key: "sea", slug: "sea-freight" },
  { key: "warehousing", slug: "warehousing" },
  { key: "fourpl", slug: "4pl-logistics" },
  { key: "hand", slug: "hand-carrier-service" },
  { key: "bonded", slug: "bonded-carrier" },
  { key: "trailer", slug: "trailer-rental" },
  { key: "hazmat", slug: "hazmat-logistics" },
];

export default function Navbar() {
  const t = useTranslations("Navbar");
  const tServices = useTranslations("OurServices");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const langRef = useRef(null);

  const handleLocaleChange = (nextLocale) => {
    router.replace({ pathname, params }, { locale: nextLocale });
    setLangOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("aboutUs"), href: "/about-us" },
    { name: t("services"), href: "/services", hasDropdown: true },
    { name: t("contact"), href: "/contact" },
  ];

  return (
    <motion.header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${isOpen ? styles.menuOpen : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo-1.png"
            alt="Kronos Logistics"
            width={220}
            height={55}
            style={{ width: "100%", maxWidth: "160px", height: "auto" }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.name}
                className={styles.dropdownWrapper}
                ref={dropdownRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link href={link.href} className={styles.navLink}>
                  {link.name}
                  <ChevronDown size={14} className={`${styles.chevron} ${dropdownOpen ? styles.chevronOpen : ''}`} />
                </Link>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      className={styles.dropdown}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={styles.dropdownGrid}>
                        {serviceItems.map((service) => (
                          <Link
                            key={service.key}
                            href={`/services/${service.slug}`}
                            className={styles.dropdownItem}
                            onClick={() => setDropdownOpen(false)}
                          >
                            {tServices(`services.${service.key}.title`)}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={link.name} href={link.href} className={styles.navLink}>
                {link.name}
              </Link>
            )
          )}
          <div className={styles.langDropdownWrapper} ref={langRef}>
            <button 
              className={styles.langBtn} 
              onClick={() => setLangOpen(!langOpen)}
            >
              <Globe size={16} />
              <span>{locale.toUpperCase()}</span>
              <ChevronDown size={14} className={`${styles.chevron} ${langOpen ? styles.chevronOpen : ""}`} />
            </button>
            
            <AnimatePresence>
              {langOpen && (
                <motion.div 
                  className={styles.langDropdown}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {locales.map((loc) => (
                    <button 
                      key={loc}
                      className={`${styles.langDropdownItem} ${locale === loc ? styles.langDropdownItemActive : ""}`}
                      onClick={() => handleLocaleChange(loc)}
                    >
                      {languageNames[loc] || loc.toUpperCase()}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <GlowBorder>
            <Link href="/track" className={styles.switcherBtn}>
              <span className={styles.btnText}>{t("trackShipment")}</span>
              <span className={styles.btnIconWrapper}>
                <ArrowRight size={16} className={styles.btnIcon} />
              </span>
            </Link>
          </GlowBorder>
        </nav>

        {/* Mobile Toggle */}
        <button className={styles.mobileToggle} onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className={styles.mobileNav}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name} className={styles.mobileDropdown}>
                  <button
                    className={styles.mobileNavLink}
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  >
                    {link.name}
                    <ChevronDown
                      size={16}
                      className={`${styles.chevron} ${mobileServicesOpen ? styles.chevronOpen : ''}`}
                    />
                  </button>
                  {mobileServicesOpen && (
                    <div className={styles.mobileSubMenu}>
                      {serviceItems.map((service) => (
                        <Link
                          key={service.key}
                          href={`/services/${service.slug}`}
                          className={styles.mobileSubItem}
                          onClick={() => setIsOpen(false)}
                        >
                          {tServices(`services.${service.key}.title`)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}
            <Link
              href="/track"
              className={styles.mobileCtaButton}
              onClick={() => setIsOpen(false)}
            >
              <span>{t("trackShipment")}</span>
              <span>
                <ArrowRight size={16} />
              </span>
            </Link>
            <div className={styles.mobileLangSwitcher}>
              <span className={styles.mobileLangTitle}>Language / Idioma</span>
              <div className={styles.mobileLangGrid}>
                {locales.map((loc) => (
                  <button 
                    key={loc}
                    className={`${styles.langDropdownItem} ${locale === loc ? styles.langDropdownItemActive : ""}`} 
                    onClick={() => { handleLocaleChange(loc); setIsOpen(false); }}
                  >
                    {languageNames[loc] || loc.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
