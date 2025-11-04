import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/components/providers/query-provider";

export const metadata: Metadata = {
  title: {
    default: "Hajar Imóveis - Encontre seu imóvel ideal",
    template: "%s | Hajar Imóveis"
  },
  description: "Encontre casas, apartamentos e imóveis para venda e locação. A melhor imobiliária da região com as melhores ofertas.",
  keywords: ["imóveis", "casas", "apartamentos", "venda", "locação", "imobiliária"],
  authors: [{ name: "Hajar Imóveis" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://hajar.com.br",
    siteName: "Hajar Imóveis",
    title: "Hajar Imóveis - Encontre seu imóvel ideal",
    description: "Encontre casas, apartamentos e imóveis para venda e locação.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryProvider>
          <TooltipProvider>
            {children}
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

