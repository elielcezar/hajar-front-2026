# 🚀 Quick Start - Hajar Imóveis Next.js

## ⚡ Comandos Rápidos

### 1. Instalação
```bash
npm install
```

### 2. Desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:3000

### 3. Build de Produção
```bash
npm run build
npm run start
```

---

## 📂 Páginas Criadas

| URL | Descrição |
|-----|-----------|
| `/` | Home com Hero, busca, imóveis em destaque |
| `/imoveis` | Lista completa de imóveis com filtros |
| `/imoveis/[id]` | Detalhes do imóvel (SEO otimizado) |
| `/contato` | Formulário de contato e equipe |

---

## 🔧 Configurações Importantes

### Variáveis de Ambiente

Crie `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://hajar.ecwd.cloud/api
```

### Domínios de Imagem

Já configurado em `next.config.ts`:
- `hajar.ecwd.cloud`
- `images.unsplash.com`

Para adicionar mais:
```typescript
// next.config.ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'seu-dominio.com' }
  ]
}
```

---

## 🔌 API Backend

### Endpoints Esperados

```
GET /api/imoveis          → Lista de imóveis
GET /api/imoveis/:id      → Detalhes de um imóvel
```

### Formato dos Dados

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

### Modo Mock (Desenvolvimento)

Enquanto a API não está disponível, o sistema usa dados mockados em:
```typescript
// lib/api.ts
getMockImoveis()
```

---

## 🎨 Customização

### Cores (Tailwind)

Editar `app/globals.css`:
```css
:root {
  --primary: 6 78% 57%;  /* Cor principal (laranja) */
  --background: 0 0% 100%;
  /* ... */
}
```

### Componentes UI

Todos em `components/ui/` (shadcn/ui):
- `Button`, `Input`, `Card`, etc.
- Editar diretamente ou via shadcn CLI

---

## 📊 SEO

### Checklist Rápido

Após deploy, verificar:
- [ ] `/sitemap.xml` acessível
- [ ] `/robots.txt` acessível
- [ ] Meta tags aparecendo (Ctrl+U)
- [ ] Preview no WhatsApp funciona
- [ ] Google Rich Results Test OK

### Ferramentas

- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 🐛 Troubleshooting

### Erro: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: Imagens não carregam
Adicionar domínio em `next.config.ts`

### Port 3000 em uso
```bash
# Usar outra porta
PORT=3001 npm run dev
```

### Build falha
```bash
# Verificar erros TypeScript
npm run build 2>&1 | grep error
```

---

## 📚 Documentação Completa

- **Migração**: `MIGRATION_README.md`
- **SEO**: `SEO_VALIDATION.md`
- **Next.js**: https://nextjs.org/docs

---

## ✅ Status

**PROJETO 100% FUNCIONAL** 🎉

Todos os componentes migrados e testados.  
Pronto para desenvolvimento e deploy!

