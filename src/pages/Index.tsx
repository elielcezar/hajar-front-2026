import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Newsletter } from "@/components/Newsletter";
import { PropertiesSection } from "@/components/PropertiesSection";
import { FeaturesSection } from "@/components/FeaturesSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Newsletter />
      <PropertiesSection />
      <FeaturesSection />
    </div>
  );
};

export default Index;
