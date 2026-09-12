import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ServiceMarquee from "@/components/home/ServiceMarquee";
import AboutPreview from "@/components/home/AboutPreview";
import ProcessSteps from "@/components/home/ProcessSteps";
import ServicesGrid from "@/components/home/ServicesGrid";
import Testimonials from "@/components/home/Testimonials";
import FeaturedWork from "@/components/home/FeaturedWork";
import BlogPreview from "@/components/home/BlogPreview";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ServiceMarquee />
        <AboutPreview />
        <ProcessSteps />
        <ServicesGrid />
        <Testimonials />
        <FeaturedWork />
        <BlogPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
