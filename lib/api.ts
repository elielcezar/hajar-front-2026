const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hajar.ecwd.cloud/api';

export interface Imovel {
  id: string | number;
  titulo: string;
  descricao: string;
  preco: number;
  localizacao: string;
  endereco: string;
  area: number;
  quartos: number;
  banheiros: number;
  fotos: string[];
  tipo: 'venda' | 'aluguel';
  categoria: 'casa' | 'apartamento' | 'terreno' | 'comercial';
  caracteristicas?: string[];
  dataPublicacao?: string;
  corretor?: {
    nome: string;
    email: string;
    telefone: string;
  };
  visualizacoes?: number;
  favoritos?: number;
}

export async function getImoveis(): Promise<Imovel[]> {
  try {
    const response = await fetch(`${API_URL}/imoveis`, {
      next: { revalidate: 3600 } // Revalidar a cada 1 hora
    });
    
    if (!response.ok) {
      console.error('Erro ao buscar imóveis:', response.statusText);
      return [];
    }
    
    return response.json();
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error);
    return [];
  }
}

export async function getImovel(id: string | number): Promise<Imovel | null> {
  try {
    const response = await fetch(`${API_URL}/imoveis/${id}`, {
      next: { revalidate: 3600 } // Revalidar a cada 1 hora
    });
    
    if (!response.ok) {
      console.error('Erro ao buscar imóvel:', response.statusText);
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.error('Erro ao buscar imóvel:', error);
    return null;
  }
}

export async function getImoveisFeatured(): Promise<Imovel[]> {
  try {
    const response = await fetch(`${API_URL}/imoveis?featured=true`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      console.error('Erro ao buscar imóveis em destaque:', response.statusText);
      return [];
    }
    
    return response.json();
  } catch (error) {
    console.error('Erro ao buscar imóveis em destaque:', error);
    return [];
  }
}

// Dados mockados para desenvolvimento (caso API não esteja disponível)
export const getMockImoveis = (): Imovel[] => [
  {
    id: 1,
    titulo: "Apartamento Central Park",
    descricao: "Belo apartamento em localização privilegiada com vista panorâmica da cidade.",
    preco: 450000,
    localizacao: "Centro, São Paulo",
    endereco: "Av. Paulista, 1000",
    area: 85,
    quartos: 3,
    banheiros: 2,
    fotos: ["/property-1.jpg", "/property-2.jpg"],
    tipo: "venda",
    categoria: "apartamento",
    caracteristicas: ["Ar condicionado", "Garagem", "Piscina", "Academia"],
    dataPublicacao: new Date().toISOString(),
    corretor: {
      nome: "João Silva",
      email: "joao@hajar.com.br",
      telefone: "(11) 98765-4321"
    },
    visualizacoes: 1234,
    favoritos: 42
  },
  {
    id: 2,
    titulo: "Casa Moderna em Condomínio",
    descricao: "Casa espaçosa com acabamento de luxo em condomínio fechado.",
    preco: 850000,
    localizacao: "Alphaville, Barueri",
    endereco: "Alameda das Flores, 250",
    area: 250,
    quartos: 4,
    banheiros: 3,
    fotos: ["/property-2.jpg", "/property-3.jpg"],
    tipo: "venda",
    categoria: "casa",
    caracteristicas: ["Churrasqueira", "Jardim", "Garagem para 3 carros", "Piscina"],
    dataPublicacao: new Date().toISOString(),
    corretor: {
      nome: "Maria Santos",
      email: "maria@hajar.com.br",
      telefone: "(11) 98765-4322"
    },
    visualizacoes: 856,
    favoritos: 28
  },
  {
    id: 3,
    titulo: "Apartamento Studio Moderno",
    descricao: "Studio compacto e funcional, ideal para jovens profissionais.",
    preco: 2500,
    localizacao: "Vila Madalena, São Paulo",
    endereco: "Rua Harmonia, 150",
    area: 35,
    quartos: 1,
    banheiros: 1,
    fotos: ["/property-3.jpg", "/property-4.jpg"],
    tipo: "aluguel",
    categoria: "apartamento",
    caracteristicas: ["Mobiliado", "Ar condicionado", "Internet"],
    dataPublicacao: new Date().toISOString(),
    corretor: {
      nome: "Pedro Costa",
      email: "pedro@hajar.com.br",
      telefone: "(11) 98765-4323"
    },
    visualizacoes: 642,
    favoritos: 15
  },
  {
    id: 4,
    titulo: "Cobertura de Luxo",
    descricao: "Cobertura duplex com piscina privativa e vista espetacular.",
    preco: 1200000,
    localizacao: "Itaim Bibi, São Paulo",
    endereco: "Av. Brigadeiro Faria Lima, 3000",
    area: 180,
    quartos: 4,
    banheiros: 4,
    fotos: ["/property-4.jpg", "/property-1.jpg"],
    tipo: "venda",
    categoria: "apartamento",
    caracteristicas: ["Piscina privativa", "Sauna", "Garagem para 4 carros", "Elevador privativo"],
    dataPublicacao: new Date().toISOString(),
    corretor: {
      nome: "Ana Paula",
      email: "ana@hajar.com.br",
      telefone: "(11) 98765-4324"
    },
    visualizacoes: 2145,
    favoritos: 89
  }
];

