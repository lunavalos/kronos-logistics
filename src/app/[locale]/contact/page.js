"use client";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    if (typeof window === "undefined" || !window.grecaptcha) {
      console.error("ReCaptcha script is not loaded yet.");
      setStatus("error");
      return;
    }

    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute("6LdYIGwtAAAAAOiB7fRiCALWtAOn58zTowwKDPHe", {
          action: "contact_submit",
        });

        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            token,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Form submission error:", err);
        setStatus("error");
      }
    });
  };

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
                  <p style={{ color: "#666" }}>{t("emailValue")}</p>
                </div>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <div style={{ background: "rgba(194, 45, 51, 0.1)", padding: "1rem", borderRadius: "12px", color: "#c22d33" }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: "700", marginBottom: "0.2rem" }}>{t("phone")}</h4>
                  <p style={{ color: "#666" }}>{t("phoneValue")}</p>
                </div>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <div style={{ background: "rgba(194, 45, 51, 0.1)", padding: "1rem", borderRadius: "12px", color: "#c22d33" }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: "700", marginBottom: "0.2rem" }}>{t("office")}</h4>
                  <p style={{ color: "#666" }}>{t("officeValue")}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ background: "#f8f9fa", padding: "3rem", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "2rem" }}>{t("sendMessage")}</h3>
            
            {status === "success" ? (
              <div style={{ padding: "2rem 0", textAlign: "center" }}>
                <div style={{ color: "#2e7d32", fontSize: "1.2rem", fontWeight: "700", marginBottom: "1.5rem" }}>
                  {t("success")}
                </div>
                <button 
                  onClick={() => setStatus("idle")}
                  style={{ background: "#c22d33", color: "white", padding: "1rem 2rem", borderRadius: "50px", border: "none", fontWeight: "700", cursor: "pointer" }}
                >
                  {t("sendMessage")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder={t("fullName")} 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ padding: "1rem 1.5rem", borderRadius: "12px", border: "1px solid #eee", fontSize: "1rem" }} 
                />
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder={t("emailAddress")} 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ padding: "1rem 1.5rem", borderRadius: "12px", border: "1px solid #eee", fontSize: "1rem" }} 
                />
                <textarea 
                  name="message"
                  required
                  placeholder={t("yourMessage")} 
                  rows={5} 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ padding: "1rem 1.5rem", borderRadius: "12px", border: "1px solid #eee", fontSize: "1rem", resize: "none" }}
                ></textarea>
                
                {status === "error" && (
                  <div style={{ color: "#d32f2f", fontSize: "0.9rem", fontWeight: "600" }}>
                    {t("error")}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  style={{ 
                    background: status === "submitting" ? "#888" : "#c22d33", 
                    color: "white", 
                    padding: "1rem", 
                    borderRadius: "50px", 
                    border: "none", 
                    fontWeight: "700", 
                    cursor: status === "submitting" ? "not-allowed" : "pointer" 
                  }}
                >
                  {status === "submitting" ? `${t("sendButton")}...` : t("sendButton")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
