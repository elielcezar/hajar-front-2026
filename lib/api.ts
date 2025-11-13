const API_URL = 'https://admin.hajar.com.br/api';

// Interface da resposta da API
interface ApiImovel {
  id: number;
  titulo: string;
  subTitulo: string;
  descricaoCurta: string;
  descricaoLonga: string;
  fotos: string[];
  cidade: string;
  valor: string;
  codigo: string;
  endereco: string;
  createdAt: string;
  updatedAt: string;
  tipo: Array<{
    id: number;
    imovelId: number;
    tipoId: number;
    tipo: {
      id: number;
      nome: string;
      createdAt: string;
      updatedAt: string;
    };
  }>;
  finalidade: Array<{
    id: number;
    imovelId: number;
    finalidadeId: number;
    finalidade: {
      id: number;
      nome: string;
      createdAt: string;
      updatedAt: string;
    };
  }>;
  categorias: any[];
}

// Interface unificada para uso no frontend
export interface Imovel {
  id: number;
  titulo: string;
  subTitulo: string;
  descricao: string;
  descricaoLonga: string;
  preco: number;
  localizacao: string;
  endereco: string;
  fotos: string[];
  tipo: 'venda' | 'aluguel';
  categoria: string;
  codigo: string;
  dataPublicacao: string;
  area?: number;
  quartos?: number;
  banheiros?: number;
  caracteristicas?: string[];
  corretor?: {
    nome: string;
    email: string;
    telefone: string;
  };
  visualizacoes?: number;
  favoritos?: number;
}

// Função para transformar dados da API para o formato do frontend
function transformApiImovel(apiImovel: ApiImovel): Imovel {
  // Extrair tipo e finalidade
  const tipoNome = apiImovel.tipo[0]?.tipo?.nome || 'Casa';
  const finalidadeNome = apiImovel.finalidade[0]?.finalidade?.nome || 'Venda';
  
  // Converter valor para número (remover pontos e vírgulas)
  const valorNumerico = parseFloat(apiImovel.valor.replace(/\./g, '').replace(',', '.')) || 0;
  
  return {
    id: apiImovel.id,
    titulo: apiImovel.titulo,
    subTitulo: apiImovel.subTitulo,
    descricao: apiImovel.descricaoCurta,
    descricaoLonga: apiImovel.descricaoLonga,
    preco: valorNumerico,
    localizacao: apiImovel.cidade,
    endereco: apiImovel.endereco,
    fotos: apiImovel.fotos,
    tipo: finalidadeNome.toLowerCase() === 'aluguel' ? 'aluguel' : 'venda',
    categoria: tipoNome,
    codigo: apiImovel.codigo,
    dataPublicacao: apiImovel.createdAt,
    // Valores padrão para campos que não existem na API
    area: 0,
    quartos: 0,
    banheiros: 0,
    caracteristicas: [],
    visualizacoes: 0,
    favoritos: 0,
  };
}

export async function getImoveis(): Promise<Imovel[]> {
  try {
    const response = await fetch(`${API_URL}/imoveis`, {
      next: { revalidate: 3600 }, // Revalidar a cada 1 hora
      cache: 'no-store', // Forçar busca fresca em desenvolvimento
    });
    
    if (!response.ok) {
      console.error('Erro ao buscar imóveis:', response.statusText);
      return [];
    }
    
    const data: ApiImovel[] = await response.json();
    return data.map(transformApiImovel);
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error);
    return [];
  }
}

export async function getImovel(id: string | number): Promise<Imovel | null> {
  try {
    // Buscar da lista de imóveis e filtrar por ID
    const imoveis = await getImoveis();
    const imovel = imoveis.find(i => i.id === Number(id));
    
    if (!imovel) {
      console.log(`Imóvel ${id} não encontrado`);
      return null;
    }
    
    return imovel;
  } catch (error) {
    console.error('Erro ao buscar imóvel:', error);
    return null;
  }
}

export async function getImoveisFeatured(): Promise<Imovel[]> {
  // Por enquanto, retorna os primeiros 4 imóveis
  const imoveis = await getImoveis();
  return imoveis.slice(0, 4);
}
