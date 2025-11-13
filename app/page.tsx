import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Newsletter } from "@/components/Newsletter";
import { PropertiesSection } from "@/components/PropertiesSection";
import { CarouselProperties } from "@/components/CarouselProperties";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Newsletter />
      <PropertiesSection />
      <CarouselProperties />
      <FeaturesSection />
      <Footer />
    </div>
  );
}

