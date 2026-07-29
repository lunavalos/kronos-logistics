import { Raleway } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import FloatingChat from "@/components/FloatingChat";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/request";
import "../globals.css";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "Kronos Logistics",
  description: "Global Logistics and Freight Management",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={raleway.className}>
        <Script 
          src="https://www.google.com/recaptcha/api.js?render=6LdYIGwtAAAAAOiB7fRiCALWtAOn58zTowwKDPHe" 
          strategy="afterInteractive" 
        />
        <NextIntlClientProvider messages={messages}>
          <Preloader />
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
          <FloatingChat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
