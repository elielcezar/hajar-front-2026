import { Metadata } from "next";
import PropertiesContent from "./properties-content";

export const metadata: Metadata = {
  title: "Imóveis Disponíveis",
  description: "Explore nossa seleção completa de imóveis para venda e aluguel. Encontre casas, apartamentos e mais.",
  openGraph: {
    title: "Imóveis Disponíveis | Hajar Imóveis",
    description: "Explore nossa seleção completa de imóveis para venda e aluguel.",
  },
};

export default function PropertiesPage() {
  return <PropertiesContent />;
}

