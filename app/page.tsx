import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Stats from "../components/landing/Stats";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Marketplace from "../components/landing/Marketplace";
import Business from "../components/landing/Business";
import Testimonials from "../components/landing/Testimonials";
import FAQ from "../components/landing/FAQ";
import AppDownload from "../components/landing/AppDownload";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <main>
        <Stats />
        <Features />
        <HowItWorks />
        <Marketplace />
        <Business />
        <Testimonials />
        <FAQ />
        <AppDownload />
      </main>
      <Footer />
    </>
  );
}
