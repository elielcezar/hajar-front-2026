import { MetadataRoute } from 'next';
import { getMockImoveis } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hajar.com.br';
  
  // Buscar todos os imóveis
  const imoveis = getMockImoveis();
  
  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/imoveis`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];
  
  // Páginas dinâmicas de imóveis
  const imovelPages = imoveis.map((imovel) => ({
    url: `${baseUrl}/imoveis/${imovel.id}`,
    lastModified: imovel.dataPublicacao ? new Date(imovel.dataPublicacao) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  return [...staticPages, ...imovelPages];
}

