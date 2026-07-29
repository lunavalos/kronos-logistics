"use client";
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
      <a 
        href={wechatUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.btn} ${styles.wechat}`}
        aria-label="Contact via WeChat"
      >
        <WeChatIcon />
      </a>

      {/* WhatsApp Button */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`${styles.btn} ${styles.whatsapp}`}
        aria-label="Contact via WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}
