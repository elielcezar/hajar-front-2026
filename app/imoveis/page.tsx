import { Metadata } from "next";
import { Suspense } from "react";
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
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Carregando imóveis...</p>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}

