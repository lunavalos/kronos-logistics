"use client";
import PageHero from "@/components/PageHero";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <main>
      <PageHero title={t("heroTitle")} />
      <div className="container" style={{ padding: "8rem 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem" }}>
          <div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "2rem" }}>{t("getInTouch")}</h2>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#666", marginBottom: "3rem" }}>
              {t("contactDesc")}
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <div style={{ background: "rgba(194, 45, 51, 0.1)", padding: "1rem", borderRadius: "12px", color: "#c22d33" }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: "700", marginBottom: "0.2rem" }}>{t("email")}</h4>
                  <p style={{ color: "#666" }}>info@kronos-logistics.com</p>
                </div>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <div style={{ background: "rgba(194, 45, 51, 0.1)", padding: "1rem", borderRadius: "12px", color: "#c22d33" }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: "700", marginBottom: "0.2rem" }}>{t("phone")}</h4>
                  <p style={{ color: "#666" }}>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <div style={{ background: "rgba(194, 45, 51, 0.1)", padding: "1rem", borderRadius: "12px", color: "#c22d33" }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: "700", marginBottom: "0.2rem" }}>{t("office")}</h4>
                  <p style={{ color: "#666" }}>Laredo, Texas, USA</p>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ background: "#f8f9fa", padding: "3rem", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "2rem" }}>{t("sendMessage")}</h3>
            <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <input type="text" placeholder={t("fullName")} style={{ padding: "1rem 1.5rem", borderRadius: "12px", border: "1px solid #eee", fontSize: "1rem" }} />
              <input type="email" placeholder={t("emailAddress")} style={{ padding: "1rem 1.5rem", borderRadius: "12px", border: "1px solid #eee", fontSize: "1rem" }} />
              <textarea placeholder={t("yourMessage")} rows={5} style={{ padding: "1rem 1.5rem", borderRadius: "12px", border: "1px solid #eee", fontSize: "1rem", resize: "none" }}></textarea>
              <button type="submit" style={{ background: "#c22d33", color: "white", padding: "1rem", borderRadius: "50px", border: "none", fontWeight: "700", cursor: "pointer" }}>
                {t("sendButton")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
