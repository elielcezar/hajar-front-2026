import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getImovel, getMockImoveis } from "@/lib/api";
import PropertyDetailsContent from "./property-details-content";

type Props = {
  params: { id: string };
};

// Gerar metadata dinâmica para SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const imovel = await getImovel(params.id);
  
  if (!imovel) {
    return {
      title: "Imóvel não encontrado",
    };
  }

  const priceFormatted = imovel.tipo === 'aluguel' 
    ? `R$ ${imovel.preco.toLocaleString('pt-BR')}/mês` 
    : `R$ ${imovel.preco.toLocaleString('pt-BR')}`;

  const description = `${imovel.titulo} - ${imovel.localizacao}. ${imovel.quartos} quartos, ${imovel.banheiros} banheiros, ${imovel.area}m². ${priceFormatted}. ${imovel.descricao.substring(0, 100)}...`;

  return {
    title: `${imovel.titulo} - ${imovel.localizacao}`,
    description,
    keywords: [
      imovel.categoria,
      imovel.tipo,
      imovel.localizacao,
      `${imovel.quartos} quartos`,
      "imóvel",
      ...(imovel.caracteristicas || [])
    ],
    openGraph: {
      title: `${imovel.titulo} | Hajar Imóveis`,
      description,
      type: "website",
      locale: "pt_BR",
      url: `/imoveis/${imovel.id}`,
      images: [
        {
          url: imovel.fotos[0] || "/property-1.jpg",
          width: 1200,
          height: 630,
          alt: imovel.titulo,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${imovel.titulo} | Hajar Imóveis`,
      description,
      images: [imovel.fotos[0] || "/property-1.jpg"],
    },
    alternates: {
      canonical: `/imoveis/${imovel.id}`,
    },
  };
}

// Gerar parâmetros estáticos para as páginas mais acessadas (ISR)
export async function generateStaticParams() {
  const imoveis = getMockImoveis();
  
  // Gerar páginas estáticas para os primeiros imóveis
  return imoveis.slice(0, 10).map((imovel) => ({
    id: String(imovel.id),
  }));
}

// Revalidar a cada 1 hora
export const revalidate = 3600;

export default async function PropertyDetailsPage({ params }: Props) {
  const imovel = await getImovel(params.id);
  
  if (!imovel) {
    notFound();
  }

  // JSON-LD Structured Data para Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": imovel.titulo,
    "description": imovel.descricao,
    "url": `https://hajar.com.br/imoveis/${imovel.id}`,
    "image": imovel.fotos,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": imovel.localizacao,
      "addressRegion": "BR",
      "streetAddress": imovel.endereco
    },
    "offers": {
      "@type": "Offer",
      "price": imovel.preco,
      "priceCurrency": "BRL",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Hajar Imóveis"
      }
    },
    "numberOfRooms": imovel.quartos,
    "numberOfBathroomsTotal": imovel.banheiros,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": imovel.area,
      "unitCode": "MTK"
    },
    "datePosted": imovel.dataPublicacao,
    ...(imovel.corretor && {
      "broker": {
        "@type": "Person",
        "name": imovel.corretor.nome,
        "email": imovel.corretor.email,
        "telephone": imovel.corretor.telefone
      }
    })
  };

  return (
    <>
      {/* Adicionar JSON-LD ao head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetailsContent imovel={imovel} />
    </>
  );
}

