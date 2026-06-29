"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import GlowBorder from "./GlowBorder";
import styles from "./Navbar.module.css";

const serviceItems = [
  { name: "USMCA FTL", slug: "full-truckload-ftl" },
  { name: "USMCA LTL", slug: "less-than-truckload-ltl" },
  { name: "Air Freight", slug: "air-freight" },
  { name: "Sea Freight", slug: "sea-freight" },
  { name: "Warehousing", slug: "warehousing" },
  { name: "4PL Logistics", slug: "4pl-logistics" },
  { name: "Hand Carrier Service", slug: "hand-carrier-service" },
  { name: "Bonded Carrier", slug: "bonded-carrier" },
  { name: "Trailer Lease", slug: "trailer-rental" },
  { name: "Hazmat Logistics", slug: "hazmat-logistics" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "What We Do", href: "/what-we-do" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Contact", href: "/contact" },
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
                            key={service.name}
                            href={`/services/${service.slug}`}
                            className={styles.dropdownItem}
                            onClick={() => setDropdownOpen(false)}
                          >
                            {service.name}
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
          <GlowBorder>
            <Link href="/track" className={styles.switcherBtn}>
              <span className={styles.btnText}>Track Shipment</span>
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
                          key={service.name}
                          href={`/services/${service.slug}`}
                          className={styles.mobileSubItem}
                          onClick={() => setIsOpen(false)}
                        >
                          {service.name}
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
              <span>Track Shipment</span>
              <span>
                <ArrowRight size={16} />
              </span>
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
