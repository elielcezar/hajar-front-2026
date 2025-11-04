# 🏠 Hajar Imóveis - Frontend

Portal imobiliário moderno desenvolvido em **Next.js 15** com foco em **SEO** e **performance**, oferecendo uma experiência completa para busca e visualização de imóveis.

---

## 📋 Sobre o Projeto

O **Hajar Imóveis** é uma plataforma web para classificados de imóveis, permitindo que usuários naveguem por casas, apartamentos e outros tipos de propriedades disponíveis para venda e aluguel. O projeto foi construído com as melhores práticas de desenvolvimento web, priorizando ranqueamento em mecanismos de busca (Google) e experiência do usuário.

### ✨ Principais Funcionalidades

- 🔍 **Busca e Filtros Avançados**: Filtre imóveis por tipo, finalidade, preço, localização e características
- 🖼️ **Galeria de Fotos**: Visualize múltiplas fotos de cada imóvel com carousel interativo
- 📱 **Design Responsivo**: Interface adaptada para desktop, tablet e mobile
- 🚀 **Performance Otimizada**: Carregamento rápido com Next.js ISR e otimização de imagens
- 🎯 **SEO Avançado**: Meta tags dinâmicas, Open Graph, JSON-LD para Rich Snippets
- 📊 **Integração com API**: Consumo de dados reais via API REST
- 💬 **Formulário de Contato**: Entre em contato direto com corretores

---

## 🛠️ Tecnologias Utilizadas

### Core
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[React 18](https://react.dev/)** - Biblioteca para interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização utility-first

### UI & Components
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes reutilizáveis (49 componentes)
- **[Radix UI](https://www.radix-ui.com/)** - Primitivos acessíveis
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousels performáticos

### Gerenciamento de Estado
- **[TanStack Query](https://tanstack.com/query)** - Gerenciamento de estado assíncrono
- **[React Hook Form](https://react-hook-form.com/)** - Formulários performáticos
- **[Zod](https://zod.dev/)** - Validação de esquemas

### Performance & SEO
- **Next/Image** - Otimização automática de imagens (WebP, AVIF)
- **ISR (Incremental Static Regeneration)** - Páginas estáticas com atualização automática
- **Metadata API** - SEO dinâmico por página
- **Sitemap & Robots.txt** - Indexação otimizada

---

## 📁 Estrutura do Projeto

```
hajar-front-2026/
├── app/                          # App Router (Next.js 15)
│   ├── layout.tsx               # Layout raiz com metadata global
│   ├── page.tsx                 # Página inicial
│   ├── globals.css              # Estilos globais Tailwind
│   ├── sitemap.ts               # Sitemap dinâmico
│   ├── robots.ts                # Robots.txt
│   ├── imoveis/                 # Rotas de imóveis
│   │   ├── page.tsx            # Lista de imóveis
│   │   └── [id]/               # Detalhes do imóvel (dinâmico)
│   └── contato/                 # Página de contato
│
├── components/                   # Componentes React
│   ├── Header.tsx               # Cabeçalho e navegação
│   ├── Hero.tsx                 # Banner principal com carousel
│   ├── PropertyCard.tsx         # Card de imóvel
│   ├── PropertiesSection.tsx   # Grid de imóveis
│   ├── Newsletter.tsx           # Barra de busca
│   ├── FeaturesSection.tsx     # Seção de recursos
│   ├── providers/              # Providers (React Query, etc)
│   └── ui/                     # 49 componentes UI shadcn
│
├── lib/
│   ├── api.ts                  # Client HTTP para API backend
│   └── utils.ts                # Funções utilitárias
│
├── hooks/
│   ├── use-toast.ts            # Hook de notificações
│   └── use-mobile.tsx          # Hook de detecção mobile
│
├── public/                      # Assets estáticos
│   ├── hero-bg.jpg             # Imagens do hero
│   └── property-*.jpg          # Imagens de exemplo
│
├── DOCS/                        # Documentação técnica
│   ├── API_INTEGRATION.md      # Guia de integração da API
│   ├── SEO_VALIDATION.md       # Checklist de SEO
│   └── QUICKSTART.md           # Guia rápido
│
├── next.config.ts               # Configuração Next.js
├── tailwind.config.ts           # Configuração Tailwind
├── tsconfig.json                # Configuração TypeScript
└── package.json                 # Dependências do projeto
```

---

## 🌐 API Backend

O frontend consome dados da API REST:

**Base URL**: `https://hajar.ecwd.cloud/api`

### Endpoints Utilizados

- `GET /imoveis` - Lista todos os imóveis
- `GET /imoveis/:id` - Detalhes de um imóvel específico

Para mais informações, consulte: **[DOCS/API_INTEGRATION.md](DOCS/API_INTEGRATION.md)**

---

## 🎯 Recursos de SEO

### Meta Tags Dinâmicas
Cada imóvel possui meta tags únicas geradas automaticamente:
- Title personalizado
- Description otimizada
- Keywords relevantes

### Open Graph
Preview otimizado para compartilhamento em:
- WhatsApp
- Facebook
- LinkedIn
- Twitter

### Structured Data (JSON-LD)
Implementação de Schema.org RealEstateListing para:
- Google Rich Snippets
- Destaque nos resultados de busca
- Maior taxa de cliques (CTR)

### Sitemap Dinâmico
- Geração automática com todos os imóveis
- Atualização via ISR
- Acessível em `/sitemap.xml`

Para detalhes completos: **[DOCS/SEO_VALIDATION.md](DOCS/SEO_VALIDATION.md)**

---

## 📄 Páginas Disponíveis

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial com destaques |
| `/imoveis` | Lista completa de imóveis com filtros |
| `/imoveis/[id]` | Detalhes do imóvel (SEO otimizado) |
| `/contato` | Formulário de contato |
| `/sitemap.xml` | Sitemap para indexação |
| `/robots.txt` | Robots.txt para crawlers |

---

## 🎨 Personalização

### Cores e Tema
Edite `app/globals.css`:
```css
:root {
  --primary: 6 78% 57%;      /* Cor principal (laranja) */
  --background: 0 0% 100%;   /* Fundo branco */
  /* ... outras variáveis */
}
```

### Componentes UI
Todos os componentes shadcn/ui estão em `components/ui/` e podem ser personalizados diretamente.

---

## 📚 Documentação Adicional

- **[API_INTEGRATION.md](DOCS/API_INTEGRATION.md)** - Guia completo de integração com backend
- **[SEO_VALIDATION.md](DOCS/SEO_VALIDATION.md)** - Checklist e validação de SEO
- **[QUICKSTART.md](DOCS/QUICKSTART.md)** - Comandos rápidos e troubleshooting

---

## 🚀 Deploy

### Opção 1: Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Opção 2: VPS com Node.js
```bash
# No servidor
npm run build
pm2 start npm --name "hajar-front" -- start

# Configurar Nginx como proxy reverso para porta 3000
```

---

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Verificar código (ESLint)
```

---

## 🤝 Contribuição

Este é um projeto privado da Hajar Imóveis. Para mudanças:

1. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
2. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
3. Push para a branch: `git push origin feature/nova-funcionalidade`
4. Abra um Pull Request

---

## 📝 Licença

© 2025 Hajar Imóveis. Todos os direitos reservados.

---

## 📞 Suporte

Para dúvidas ou problemas:
- Consulte a documentação em `DOCS/`
- Verifique os logs do console (F12)
- Entre em contato com a equipe de desenvolvimento

---

## ✅ Status do Projeto

- ✅ Interface completa e responsiva
- ✅ Integração com API backend
- ✅ SEO totalmente otimizado
- ✅ Performance (Core Web Vitals)
- ✅ Acessibilidade (WCAG 2.1)
- ✅ TypeScript 100% tipado
- ✅ Pronto para produção

---

**Desenvolvido com ❤️ para Hajar Imóveis**
