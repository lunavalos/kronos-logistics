import Hero from "@/components/Hero";
import AboutIntro from "@/components/AboutIntro";
import Features from "@/components/Features";
import OurServices from "@/components/OurServices";
import GlobalCoverage from "@/components/GlobalCoverage";
import TrustedBy from "@/components/TrustedBy";
import Coverage from "@/components/Coverage";
import USCoverage from "@/components/USCoverage";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Kronos Logistics | Safe, Efficient & Reliable Solutions",
  description: "Kronos Logistics is an active 4PL supply chain management company focused in provide and implement safe, efficient and reliable solutions in freight management.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutIntro />
      <Features />
      <OurServices />
      <GlobalCoverage />
      <TrustedBy />
      <USCoverage />
      <Coverage />
      <CTA />
    </main>
  );
}

