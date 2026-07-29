"use client";
import { motion } from "framer-motion";
import styles from "./FloatingChat.module.css";

// SVG path for WhatsApp
const WhatsAppIcon = () => (
  <img src="/whatsapp.svg" alt="WhatsApp" className={styles.icon} />
);

// SVG path for WeChat
const WeChatIcon = () => (
  <img src="/wechat.svg" alt="WeChat" className={styles.icon} />
);

export default function FloatingChat() {
  const whatsappUrl = "http://wa.me/+19566003606/";
  const wechatUrl = "https://u.wechat.com/kNwplY_XlG_3-44ZIIUvJJc?s=2";

  return (
    <div className={styles.container}>
      {/* WeChat Button */}
      <motion.a 
        href={wechatUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.btn} ${styles.wechat}`}
        aria-label="Contact via WeChat"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <WeChatIcon />
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`${styles.btn} ${styles.whatsapp}`}
        aria-label="Contact via WhatsApp"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <WhatsAppIcon />
      </motion.a>
    </div>
  );
}
