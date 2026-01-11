# 🏠 Hajar Imóveis - Frontend 2026

Este é o repositório do portal imobiliário da **Hajar Imóveis**, uma aplicação moderna construída com **Next.js 16** (App Router), focada em performance, SEO e experiência do usuário.

## 🧠 Contexto para IA e Desenvolvedores

### 🛠️ Tech Stack Principal
- **Framework:** Next.js 16.0.10 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + `shadcn/ui` (Componentes baseados em Radix UI)
- **Gerenciamento de Estado/Data Fetching:** TanStack Query (React Query)
- **Formulários:** React Hook Form + Zod
- **Ícones:** Lucide React

### 📂 Estrutura de Diretórios Chave
- `app/`: Rotas da aplicação (App Router).
  - `app/imoveis/`: Página de listagem com suporte a query params para filtros.
  - `app/imoveis/[id]/`: Página de detalhes do imóvel.
- `components/`: Componentes modulares.
  - `ui/`: Componentes primitivos do shadcn/ui.
  - `SearchBar.tsx`: Componente crítico que gerencia o estado dos filtros e navegação via URL.
- `lib/`: Utilitários e configurações.
  - **`api.ts`**: Camada de serviço central. **Importante:** A URL da API está definida via constante (`https://admin.hajar.com.br/api`) e não via .env neste momento. Contém a lógica de transformação de dados (`transformApiImovel`) para adaptar o payload do backend para a interface do frontend.

### 🔄 Fluxo de Dados e API
O frontend consome uma API externa REST. 

1. **Fetching:** Realizado principalmente em `lib/api.ts`.
2. **Transformação:** A interface `ApiImovel` (backend) é diferente da interface `Imovel` (frontend). A função `transformApiImovel` normaliza campos como snake_case para camelCase, trata valores monetários e define tipos (Venda/Aluguel).
3. **Filtros:** A busca funciona via **Query Params**.
   - O `SearchBar` constrói a URL: `/imoveis?tipoImovel=Casa&faixaPreco=500k-1m`.
   - O `api.ts` lê estes filtros e constrói a query string correta para o backend.

### 🎨 Design System e Convenções
- **Cores:** Definidas no `tailwind.config.ts`. Uso frequente de classes como `bg-deepOceanic`.
- **Componentes:** Preferência por componentes funcionais pequenos.
- **Responsividade:** Mobile-first, com hooks dedicados como `use-mobile.tsx`.

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de Produção
npm run build

# Start Produção
npm run start

# Linting
npm run lint
```

## 📍 Status Atual do Projeto (Jan 2026)
- **Versão do Next.js:** Atualizado para v16.
- **Funcionalidade de Busca:** Recentemente refatorada para suportar filtros de URL (Preço, Área, Tipo) integrados diretamente na chamada da API.
- **Deploy:** Configurado via scripts shell (`deploy.sh`) e PM2 (`ecosystem.config.cjs`).

## 🔗 Links Importantes
- **Produção:** https://novo.hajar.com.br/
- **Backend API:** https://admin.hajar.com.br/api

---
© 2026 Hajar Imóveis.