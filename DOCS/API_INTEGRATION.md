# 🔌 Integração com API - Hajar Imóveis

## ✅ Status: API Real Conectada!

A aplicação agora está consumindo dados reais da API Hajar.

---

## 🌐 Endpoint da API

**Base URL**: `https://hajar.ecwd.cloud/api`

### Endpoints Disponíveis:

#### 1. Listar Imóveis
```
GET https://hajar.ecwd.cloud/api/imoveis
```

**Resposta:**
```json
[
  {
    "id": 1,
    "titulo": "Casa no Centro",
    "subTitulo": "Praticidade e conforto",
    "descricaoCurta": "Casa com 3 quartos...",
    "descricaoLonga": "Descrição completa...",
    "fotos": ["https://hajar-imoveis.s3..."],
    "cidade": "Palmeira",
    "valor": "478.000",
    "codigo": "IM001",
    "endereco": "Rua Coronel Macedo",
    "tipo": [{
      "tipo": {
        "nome": "Casa"
      }
    }],
    "finalidade": [{
      "finalidade": {
        "nome": "Venda"
      }
    }],
    "createdAt": "2025-11-03T11:02:35.413Z"
  }
]
```

---

## 🔄 Transformação de Dados

### Estrutura da API → Frontend

A aplicação faz uma transformação automática dos dados:

| Campo API | Campo Frontend | Transformação |
|-----------|----------------|---------------|
| `id` | `id` | Direto |
| `titulo` | `titulo` | Direto |
| `subTitulo` | `subTitulo` | Direto |
| `descricaoCurta` | `descricao` | Renomeado |
| `descricaoLonga` | `descricaoLonga` | Direto |
| `valor` | `preco` | Convertido para número |
| `cidade` | `localizacao` | Renomeado |
| `endereco` | `endereco` | Direto |
| `fotos` | `fotos` | Direto |
| `tipo[0].tipo.nome` | `categoria` | Extraído |
| `finalidade[0].finalidade.nome` | `tipo` | Extraído e normalizado |
| `codigo` | `codigo` | Direto |
| `createdAt` | `dataPublicacao` | Direto |

---

## 📝 Interface TypeScript

### Resposta da API (ApiImovel)
```typescript
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
    tipo: { nome: string }
  }>;
  finalidade: Array<{
    finalidade: { nome: string }
  }>;
}
```

### Formato Unificado (Imovel)
```typescript
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
}
```

---

## 🔧 Funções Implementadas

### `getImoveis()` 
Busca todos os imóveis da API.

```typescript
const imoveis = await getImoveis();
// Retorna: Imovel[]
```

**Usado em:**
- Home (PropertiesSection)
- Página de listagem (/imoveis)
- Sitemap
- generateStaticParams

---

### `getImovel(id)`
Busca um imóvel específico por ID.

```typescript
const imovel = await getImovel('1');
// Retorna: Imovel | null
```

**Usado em:**
- Página de detalhes (/imoveis/[id])
- Metadata SEO

---

## 🎯 Onde os Dados São Usados

### 1. Home (`/`)
- **Componente**: `PropertiesSection`
- **Função**: `getImoveis()`
- **Exibe**: Primeiros imóveis da lista

### 2. Lista de Imóveis (`/imoveis`)
- **Componente**: `PropertiesContent`
- **Função**: `getImoveis()`
- **Exibe**: Todos os imóveis com filtros

### 3. Detalhes do Imóvel (`/imoveis/[id]`)
- **Componente**: `PropertyDetailsContent`
- **Função**: `getImovel(id)`
- **Exibe**: Detalhes completos + SEO

### 4. Sitemap (`/sitemap.xml`)
- **Função**: `getImoveis()`
- **Gera**: URLs de todos os imóveis

---

## ⚡ Cache e Performance

### Revalidação (ISR)
```typescript
next: { revalidate: 3600 } // 1 hora
```

- Páginas são geradas estaticamente
- Atualizam automaticamente a cada 1 hora
- Performance de site estático com dados dinâmicos

### Cache em Desenvolvimento
```typescript
cache: 'no-store' // Força busca fresca
```

---

## 🔍 SEO com Dados Reais

### Meta Tags Dinâmicas
```typescript
export async function generateMetadata({ params }) {
  const imovel = await getImovel(params.id);
  
  return {
    title: `${imovel.titulo} - ${imovel.localizacao}`,
    description: imovel.descricao,
    openGraph: {
      images: [imovel.fotos[0]],
    }
  };
}
```

### JSON-LD (Structured Data)
```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": imovel.titulo,
  "price": imovel.preco,
  "image": imovel.fotos,
  // ...
};
```

---

## 🛠️ Desenvolvimento

### Testar API Manualmente
```bash
# Listar imóveis
curl https://hajar.ecwd.cloud/api/imoveis

# Com formatação
curl https://hajar.ecwd.cloud/api/imoveis | jq
```

### Logs de Debug
O código já inclui logs de erro:
```typescript
console.error('Erro ao buscar imóveis:', error);
```

Abra o console do navegador (F12) para ver erros de requisição.

---

## 📊 Status de Integração

- ✅ **Home**: Carregando imóveis reais
- ✅ **Lista**: Carregando imóveis reais
- ✅ **Detalhes**: Carregando imóvel específico
- ✅ **Sitemap**: Gerando com imóveis reais
- ✅ **SEO**: Meta tags com dados reais
- ✅ **Imagens**: URLs S3 funcionando
- ✅ **Filtros**: Funcionando com dados reais
- ✅ **Transformação**: Dados convertidos corretamente

---

## 🚨 Tratamento de Erros

### Sem Dados
Se a API não retornar dados:
```typescript
// Retorna array vazio
return [];
```
- Home/Lista mostram "Nenhum imóvel"
- Aplicação não quebra

### Imóvel Não Encontrado
```typescript
// Retorna null
return null;
```
- Página mostra 404 (not-found)
- SEO não é prejudicado

### Erro de Rede
```typescript
catch (error) {
  console.error('Erro:', error);
  return [];
}
```
- Falha silenciosa
- Aplicação continua funcionando

---

## 🔄 Próximos Passos (Opcional)

### 1. Adicionar Loading States
- Skeleton screens
- Spinners
- Progress bars

### 2. Adicionar Paginação
```typescript
GET /api/imoveis?page=1&limit=10
```

### 3. Adicionar Busca
```typescript
GET /api/imoveis?search=casa&cidade=palmeira
```

### 4. Adicionar Filtros Avançados
```typescript
GET /api/imoveis?tipo=casa&finalidade=venda&minValor=300000
```

### 5. Cache Client-Side
- React Query já está configurado
- Cache automático de 1 minuto
- Pode ser ajustado

---

## ✅ Resumo

**A aplicação está 100% integrada com a API real!**

- ✅ Dados mockados **removidos**
- ✅ API **consumida** em todas as páginas
- ✅ Transformação de dados **automática**
- ✅ Cache e performance **otimizados**
- ✅ SEO com dados **reais**
- ✅ Tratamento de erros **implementado**

**Teste agora:**
1. Visite http://localhost:3000
2. Veja os imóveis reais da API
3. Clique em um imóvel para ver detalhes
4. Verifique o código fonte (Ctrl+U) para ver SEO

🎉 **Tudo funcionando!**

