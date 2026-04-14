const API_URL = 'https://admin.hajar.com.br/api';

// Interface da resposta da API
interface ApiImovel {
  id: number;
  titulo: string;
  subTitulo: string;
  descricaoCurta: string;
  descricaoLonga: string;
  fotos: string[];
  imagemCapa: string | null;
  cidade: string;
  bairro: string | null;
  valor: string | null;
  valorPromo: string | null;
  codigo: string;
  endereco: string | null;
  dormitorios: number | null;
  banheiros: number | null;
  suites: number | null;
  areaConstruida: number | null;
  terrenoM2: number | null;
  garagem: boolean;
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
  proximidades?: Array<{
    id: number;
    imovelId: number;
    proximidadeId: number;
    proximidade: {
      id: number;
      nome: string;
      createdAt: string;
      updatedAt: string;
    };
  }> | null;
}

// Interface unificada para uso no frontend
export interface Imovel {
  id: number;
  titulo: string;
  subTitulo: string;
  descricao: string;
  descricaoLonga: string;
  preco: number;
  precoPromo?: number;
  localizacao: string;
  bairro: string;
  endereco: string;
  fotos: string[];
  imagemCapa?: string;
  tipo: 'venda' | 'aluguel' | 'vendido';
  categoria: string;
  codigo: string;
  dataPublicacao: string;
  area?: number;
  terrenoM2?: number;
  quartos?: number;
  banheiros?: number;
  suites?: number;
  vagas?: number;
  caracteristicas?: string[];
  proximidades?: string[];
  corretor?: {
    nome: string;
    email: string;
    telefone: string;
  };
  visualizacoes?: number;
  favoritos?: number;
}

// Interface para destaques do Hero
export interface Destaque {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  valor: string | null;
  area: number | null;
  quartos: number | null;
  banheiros: number | null;
  garagem: number | null;
  textoBotao: string;
  link: string;
  ativo: boolean;
  ordem: number;
  createdAt: string;
  updatedAt: string;
}

// Função para transformar dados da API para o formato do frontend
function transformApiImovel(apiImovel: ApiImovel): Imovel {
  // Extrair tipo e finalidade
  const tipoNome = apiImovel.tipo[0]?.tipo?.nome || 'Casa';
  const finalidadeNome = apiImovel.finalidade[0]?.finalidade?.nome || 'Venda';
  
  // Converter valor para número (remover pontos e vírgulas)
  const valorNumerico = apiImovel.valor
    ? parseFloat(apiImovel.valor.replace(/\./g, '').replace(',', '.')) || 0
    : 0;
  
  return {
    id: apiImovel.id,
    titulo: apiImovel.titulo,
    subTitulo: apiImovel.subTitulo,
    descricao: apiImovel.descricaoCurta,
    descricaoLonga: apiImovel.descricaoLonga,
    preco: valorNumerico,
    precoPromo: apiImovel.valorPromo
      ? parseFloat(apiImovel.valorPromo.replace(/\./g, '').replace(',', '.')) || undefined
      : undefined,
    localizacao: apiImovel.cidade,
    bairro: apiImovel.bairro || '',
    endereco: apiImovel.endereco || '',
    fotos: apiImovel.fotos,
    imagemCapa: apiImovel.imagemCapa || undefined,
    tipo:
      finalidadeNome.toLowerCase() === 'vendido'
        ? 'vendido'
        : finalidadeNome.toLowerCase() === 'aluguel'
          ? 'aluguel'
          : 'venda',
    categoria: tipoNome,
    codigo: apiImovel.codigo,
    dataPublicacao: apiImovel.createdAt,
    area: apiImovel.areaConstruida || undefined,
    terrenoM2: apiImovel.terrenoM2 || undefined,
    quartos: apiImovel.dormitorios || undefined,
    banheiros: apiImovel.banheiros || undefined,
    suites: apiImovel.suites || undefined,
    vagas: apiImovel.garagem ? 1 : undefined,
    caracteristicas: [],
    proximidades: Array.isArray(apiImovel.proximidades)
      ? apiImovel.proximidades
          .map(p => p?.proximidade?.nome)
          .filter((nome): nome is string => Boolean(nome))
      : [],
    visualizacoes: 0,
    favoritos: 0,
  };
}

export async function getImoveis(filters?: Record<string, string>): Promise<Imovel[]> {
  try {
    const url = new URL(`${API_URL}/imoveis`);
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (!value) return;

        switch (key) {
          case 'faixaPreco':
            if (value.includes('+')) {
              const min = value.replace('k+', '000').replace('+', '');
              url.searchParams.append('valor_min', min);
            } else if (value.includes('-')) {
              const [min, max] = value.split('-');
              url.searchParams.append('valor_min', min.replace('k', '000'));
              url.searchParams.append('valor_max', max.replace('k', '000'));
            }
            break;
            
          case 'area':
            if (value.includes('+')) {
              const min = value.replace('+', '');
              url.searchParams.append('area_min', min);
            } else if (value.includes('-')) {
              const [min, max] = value.split('-');
              url.searchParams.append('area_min', min);
              url.searchParams.append('area_max', max);
            }
            break;

          case 'tipoImovel':
            url.searchParams.append('tipo', value);
            break;

          case 'quartos':
            url.searchParams.append('dormitorios', value.replace('+', ''));
            break;

          default:
            url.searchParams.append(key, value);
        }
      });
    }

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Revalidar a cada 1 hora
    });
    
    if (!response.ok) {
      console.error('Erro ao buscar imóveis:', response.statusText);
      return [];
    }
    
    const data = await response.json();
    // A API retorna os dados dentro da propriedade 'value'
    const imoveisRaw: ApiImovel[] = Array.isArray(data) ? data : (data.value || []);
    let imoveis = imoveisRaw.map(transformApiImovel);

    // Filtragem Local (Fallback se o backend não filtrar)
    if (filters) {
      imoveis = imoveis.filter(imovel => {
        // Filtro de Faixa de Preço
        if (filters.faixaPreco) {
          if (filters.faixaPreco.includes('+')) {
            const min = parseFloat(filters.faixaPreco.replace('k+', '000').replace('+', ''));
            if (imovel.preco < min) return false;
          } else if (filters.faixaPreco.includes('-')) {
            const [minStr, maxStr] = filters.faixaPreco.split('-');
            const min = parseFloat(minStr.replace('k', '000'));
            const max = parseFloat(maxStr.replace('k', '000'));
            if (imovel.preco < min || imovel.preco > max) return false;
          }
        }

        // Filtro de Área
        if (filters.area) {
          if (filters.area.includes('+')) {
            const min = parseFloat(filters.area.replace('+', ''));
            if ((imovel.area || 0) < min) return false;
          } else if (filters.area.includes('-')) {
            const [min, max] = filters.area.split('-').map(Number);
            if ((imovel.area || 0) < min || (imovel.area || 0) > max) return false;
          }
        }

        // Filtro de Quartos (Mínimo)
        if (filters.quartos) {
          const min = parseInt(filters.quartos.replace('+', ''), 10);
          if ((imovel.quartos || 0) < min) return false;
        }

        // Filtro de Banheiros (Mínimo)
        if (filters.banheiros) {
          const min = parseInt(filters.banheiros.replace('+', ''), 10);
          if ((imovel.banheiros || 0) < min) return false;
        }

        // Filtro de Suítes (Mínimo)
        if (filters.suites) {
          const min = parseInt(filters.suites.replace('+', ''), 10);
          if ((imovel.suites || 0) < min) return false;
        }

        // Filtro de Vagas (Mínimo)
        if (filters.vagas) {
          const min = parseInt(filters.vagas.replace('+', ''), 10);
          if ((imovel.vagas || 0) < min) return false;
        }

        // Filtro de Bairro (busca parcial)
        if (filters.bairro) {
          const termo = filters.bairro.toLowerCase().trim();
          const bairroImovel = (imovel.bairro || '').toLowerCase();
          // Busca parcial: verifica se o termo está contido no bairro
          if (!bairroImovel.includes(termo)) return false;
        }

        // Filtro de Finalidade (venda/aluguel)
        if (filters.finalidade) {
          const finalidadeFiltro = filters.finalidade.toLowerCase();
          if (imovel.tipo !== finalidadeFiltro) return false;
        }

        return true;
      });
    }

    return imoveis;
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

export async function getDestaques(): Promise<Destaque[]> {
  try {
    const response = await fetch(`${API_URL}/destaques`, {
      next: { revalidate: 3600 }, // Revalidar a cada 1 hora
    });
    
    if (!response.ok) {
      console.error('Erro ao buscar destaques:', response.statusText);
      return [];
    }
    
    const data = await response.json();
    const destaques: Destaque[] = Array.isArray(data) ? data : [];
    
    // Filtrar apenas destaques ativos e ordenar por ordem
    return destaques
      .filter(destaque => destaque.ativo)
      .sort((a, b) => a.ordem - b.ordem);
  } catch (error) {
    console.error('Erro ao buscar destaques:', error);
    return [];
  }
}

// Interfaces para o Blog
interface ApiPost {
  id: number;
  titulo: string;
  slug: string;
  chamada: string;
  conteudo: string;
  imagemCapa: string;
  dataPublicacao: string;
  status: 'PUBLICADO' | 'RASCUNHO';
  categoria: {
    id: number;
    nome: string;
  };
}

export interface Post {
  id: number;
  titulo: string;
  slug: string;
  resumo: string;
  conteudo: string;
  imagemCapa: string;
  dataPublicacao: string;
  categoria: string;
}

// Função para transformar dados do post da API
function transformApiPost(apiPost: ApiPost): Post {
  return {
    id: apiPost.id,
    titulo: apiPost.titulo,
    slug: apiPost.slug,
    resumo: apiPost.chamada,
    conteudo: apiPost.conteudo,
    imagemCapa: apiPost.imagemCapa,
    dataPublicacao: new Date(apiPost.dataPublicacao).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    categoria: apiPost.categoria.nome,
  };
}

// Função para buscar todos os posts
export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      next: { revalidate: 3600 }, // Revalidar a cada 1 hora
    });

    if (!response.ok) {
      console.error('Erro ao buscar posts:', response.statusText);
      return [];
    }

    const apiPosts: ApiPost[] = await response.json();
    return apiPosts
      .filter(post => post.status === 'PUBLICADO')
      .map(transformApiPost);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
}

// Função para buscar um post pelo slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // A API de listagem já contém todos os dados que precisamos.
    // Vamos buscar todos e encontrar o post correspondente.
    const posts = await getPosts();
    const post = posts.find(p => p.slug === slug);

    if (!post) {
      console.log(`Post com slug "${slug}" não encontrado.`);
      return null;
    }

    return post;
  } catch (error) {
    console.error(`Erro ao buscar o post "${slug}":`, error);
    return null;
  }
}
