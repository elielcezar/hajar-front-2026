import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { PropertiesSection } from "@/components/PropertiesSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { GetInTouch } from "@/components/GetInTouch";
import { BannerHome } from "@/components/BannerHome";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <SearchBar />
      <PropertiesSection />
      <BannerHome />
      <FeaturesSection />
      <GetInTouch />
      <Footer />
    </div>
  );
}

