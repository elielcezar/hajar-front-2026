import { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Entre em contato com a Hajar Imóveis. Nossa equipe está pronta para ajudá-lo a encontrar o imóvel ideal.",
  openGraph: {
    title: "Sobre | Hajar Imóveis",
    description: "Entre em contato com a Hajar Imóveis. Nossa equipe está pronta para ajudá-lo.",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

