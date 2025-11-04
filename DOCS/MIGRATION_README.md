# 🏠 Hajar Imóveis - Next.js 15 Migration

## ✅ Migração Completa React → Next.js 15

Este projeto foi **completamente migrado** de React + Vite para **Next.js 15 com App Router**, mantendo 100% do layout visual e otimizando para SEO.

---

## 🎯 Objetivos Alcançados

### ✅ SEO Otimizado (Prioridade #1)
- **Meta Tags Dinâmicas**: Cada imóvel tem title, description e keywords únicos
- **Open Graph**: Imagens e descrições para compartilhamento em redes sociais
- **Structured Data (JSON-LD)**: Schema.org RealEstateListing para Rich Snippets do Google
- **Sitemap Dinâmico**: Geração automática com todos os imóveis
- **Robots.txt**: Configurado para indexação ideal
- **SSR/ISR**: Páginas renderizadas no servidor com revalidação automática (1h)

### ✅ Performance
- **Next/Image**: Otimização automática de imagens (WebP, AVIF, lazy loading)
- **Code Splitting**: Carregamento otimizado de JavaScript
- **ISR (Incremental Static Regeneration)**: Páginas estáticas que atualizam automaticamente

### ✅ Estrutura Mantida
- **100% dos componentes** migrados e funcionais
- **Layout visual idêntico** ao projeto original
- **49 componentes UI** (shadcn/ui) totalmente compatíveis
- **Navegação** adaptada para next/link

---

## 📁 Estrutura do Projeto

```
hajar-imoveis-front/
├── app/                          # App Router (Next.js 15)
│   ├── layout.tsx               # Root layout com providers
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Estilos globais
│   ├── sitemap.ts              # Sitemap dinâmico
│   ├── robots.ts               # Robots.txt
│   ├── imoveis/
│   │   ├── page.tsx            # Lista de imóveis
│   │   ├── properties-content.tsx
│   │   └── [id]/
│   │       ├── page.tsx        # ⭐ Detalhes com SEO otimizado
│   │       └── property-details-content.tsx
│   ├── contato/
│   │   ├── page.tsx
│   │   └── contact-content.tsx
│   └── not-found.tsx           # Página 404
│
├── components/                  # Componentes React
│   ├── Header.tsx              # ✅ Adaptado com next/link
│   ├── Hero.tsx                # ✅ Client component
│   ├── PropertyCard.tsx        # ✅ Next/Image + next/link
│   ├── Newsletter.tsx
│   ├── FeaturesSection.tsx
│   ├── PropertiesSection.tsx
│   ├── providers/
│   │   └── query-provider.tsx  # QueryClient provider
│   └── ui/                     # 49 componentes shadcn/ui
│
├── lib/
│   ├── api.ts                  # 🔌 Client HTTP para backend
│   └── utils.ts                # Utilitários
│
├── public/                     # Assets estáticos
│   ├── hero-bg.jpg
│   ├── property-*.jpg
│   └── ...
│
├── next.config.ts              # ⚙️ Configuração Next.js
├── tailwind.config.ts          # Tailwind CSS
├── tsconfig.json               # TypeScript
└── package.json                # Dependências
```

---

## 🚀 Como Rodar o Projeto

### 1. Instalar Dependências
```bash
npm install
# ou
yarn install
```

### 2. Rodar em Desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

### 3. Build de Produção
```bash
npm run build
npm run start
```

---

## 🔌 Integração com Backend

### Configuração da API

O projeto está configurado para integrar com: `https://hajar.ecwd.cloud/api`

**Arquivo**: `lib/api.ts`

#### Endpoints Assumidos:
- `GET /api/imoveis` - Lista todos os imóveis
- `GET /api/imoveis/:id` - Detalhes de um imóvel

#### Modo Fallback:
Enquanto a API não está disponível, o projeto usa dados mockados em `getMockImoveis()`.

Para ativar a API real, certifique-se de que o backend retorna dados no formato:

```typescript
interface Imovel {
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
  corretor?: {
    nome: string;
    email: string;
    telefone: string;
  };
}
```

---

## 🎨 SEO - Detalhes Técnicos

### 1. Meta Tags Dinâmicas

Cada página de imóvel (`/imoveis/[id]`) gera automaticamente:

```typescript
// app/imoveis/[id]/page.tsx
export async function generateMetadata({ params }: Props) {
  const imovel = await getImovel(params.id);
  
  return {
    title: `${imovel.titulo} - ${imovel.localizacao}`,
    description: `${imovel.quartos} quartos, ${imovel.banheiros} banheiros...`,
    openGraph: {
      images: [imovel.fotos[0]],
      // ...
    }
  };
}
```

### 2. JSON-LD Structured Data

Schema.org RealEstateListing implementado para Google Rich Snippets:

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "Apartamento Central Park",
  "price": "450000",
  "numberOfRooms": "3",
  // ...
}
```

### 3. ISR (Incremental Static Regeneration)

Páginas são geradas estaticamente e revalidadas a cada 1 hora:

```typescript
export const revalidate = 3600; // 1 hora
```

### 4. Sitemap Automático

Acesse: `/sitemap.xml`

Inclui todas as páginas estáticas + dinâmicas (imóveis).

---

## 🖥️ Deploy no VPS

### Pré-requisitos
- Node.js 18.17+ instalado
- PM2 para gerenciar processos
- Nginx como reverse proxy

### Passos:

1. **Build do Projeto**
```bash
npm run build
```

2. **Iniciar com PM2**
```bash
pm2 start npm --name "hajar-front" -- start
pm2 save
```

3. **Configurar Nginx** (`/etc/nginx/sites-available/hajar`)
```nginx
server {
    listen 80;
    server_name hajar.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Ativar Site**
```bash
sudo ln -s /etc/nginx/sites-available/hajar /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 📊 Validação de SEO

### Ferramentas Recomendadas:

1. **Google Search Console**
   - Enviar sitemap.xml
   - Verificar indexação

2. **PageSpeed Insights**
   - Verificar Core Web Vitals
   - Testar performance

3. **Facebook Sharing Debugger**
   - Validar Open Graph tags
   - [https://developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/)

4. **Google Rich Results Test**
   - Validar Structured Data
   - [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)

### Checklist Manual:

- [ ] Abrir `/imoveis/1` e "Ver Código Fonte"
- [ ] Verificar se title está correto
- [ ] Verificar se description está preenchida
- [ ] Procurar por `<script type="application/ld+json">` (JSON-LD)
- [ ] Testar compartilhamento no WhatsApp (deve mostrar preview)
- [ ] Verificar `/sitemap.xml` acessível
- [ ] Verificar `/robots.txt` acessível

---

## 🔄 Diferenças: Vite vs Next.js

| Aspecto | React + Vite | Next.js 15 |
|---------|--------------|------------|
| Rendering | Client-side (CSR) | Server-side (SSR/ISR) |
| SEO | ❌ Ruim | ✅ Excelente |
| Meta Tags | ❌ Estáticas | ✅ Dinâmicas |
| Roteamento | React Router | App Router nativo |
| Imagens | `<img>` | `<Image>` otimizado |
| Build | SPA única | Páginas otimizadas |
| Deploy | Arquivos estáticos | Servidor Node.js |

---

## 📝 Próximos Passos Recomendados

1. **Conectar API Real**
   - Substituir `getMockImoveis()` por chamadas reais
   - Testar com dados do backend

2. **Otimizações**
   - Implementar busca server-side
   - Adicionar paginação na API
   - Cache avançado com React Query

3. **Funcionalidades**
   - Sistema de favoritos (localStorage)
   - Comparador de imóveis
   - Integração com WhatsApp

4. **Analytics**
   - Google Analytics 4
   - Hotjar para heatmaps
   - Tracking de conversões

5. **Performance**
   - Lazy loading de componentes pesados
   - Otimização de fontes
   - PWA (Progressive Web App)

---

## 🆘 Suporte

Para dúvidas sobre a migração, consulte:
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## ✅ Status da Migração

**STATUS: COMPLETO** 🎉

- ✅ Configuração Next.js 15 + TypeScript
- ✅ 49 componentes UI migrados
- ✅ Layout root com providers
- ✅ Página Home
- ✅ Página de listagem de imóveis
- ✅ Página de detalhes com SEO otimizado
- ✅ Página de contato
- ✅ Navegação com next/link
- ✅ Imagens com next/image
- ✅ API client configurado
- ✅ Meta tags dinâmicas
- ✅ Structured Data (JSON-LD)
- ✅ Sitemap dinâmico
- ✅ Robots.txt

**Projeto pronto para desenvolvimento e deploy!** 🚀

