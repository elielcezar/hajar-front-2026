import { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com a Hajar Imóveis. Nossa equipe está pronta para ajudá-lo a encontrar o imóvel ideal.",
  openGraph: {
    title: "Contato | Hajar Imóveis",
    description: "Entre em contato com a Hajar Imóveis. Nossa equipe está pronta para ajudá-lo.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}

