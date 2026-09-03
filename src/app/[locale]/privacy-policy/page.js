import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import PageHero from "@/components/PageHero";
import styles from "./page.module.css";
import CTA from "@/components/CTA";

export default function PrivacyPolicyPage({ params: { locale } }) {
  setRequestLocale(locale);
  const t = useTranslations("PrivacyPolicy");
  const d = new Date();
  const dateStr = d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main>
      <PageHero 
        title={t("title")} 
        subtitle={t("lastUpdated").replace("[Date]", dateStr).replace("[Fecha]", dateStr).replace("[Datum]", dateStr).replace("[날짜]", dateStr).replace("[日期]", dateStr)} 
      />
      
      <section className={`container ${styles.contentSection}`}>
        <div className={styles.contentBox}>
          <div className={styles.placeholderBanner}>
            🚧 Placeholder Template
          </div>
          <p className={styles.text}>{t("content")}</p>
        </div>
      </section>
      
      <CTA />
    </main>
  );
}
