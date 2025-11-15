# 📝 Atualiz ações e Correções - Deploy em Produção

## ✅ Deploy Concluído com Sucesso

**Data:** 15/11/2024  
**URL:** https://novo.hajar.com.br/  
**Status:** ✅ Em produção

---

## 🔧 Correções Aplicadas Durante o Deploy

### 1. **Problemas de Build Resolvidos**
- ✅ Adicionadas dependências faltantes (`globals`, `typescript-eslint`, `eslint-plugin-react-refresh`)
- ✅ Corrigido tipo `params` para Next.js 15 (agora é `Promise`)
- ✅ Simplificada configuração do ESLint (de Vite para Next.js)
- ✅ Removida propriedade duplicada `secondary` no Tailwind
- ✅ Alterada estratégia de build de estático para dinâmico (ISR)

### 2. **Configuração do Servidor**
- ✅ Porta configurada: **3008** (backend também usa 3008)
- ✅ PM2 configurado com `ecosystem.config.cjs`
- ✅ Nginx configurado como proxy reverso
- ✅ CORS configurado no backend para aceitar `https://novo.hajar.com.br`

### 3. **Arquivos Criados/Atualizados**
- ✅ `ecosystem.config.cjs` - Configuração do PM2
- ✅ `deploy.sh` - Script automatizado de deploy
- ✅ `.eslintrc.json` - Configuração simplificada do ESLint
- ✅ `nginx.conf` - Template de configuração do Nginx
- ✅ `DOCS/DEPLOY.md` - Documentação completa de deploy
- ✅ `DOCS/COMANDOS-DEPLOY.txt` - Lista de comandos prontos
- ✅ `README.md` - Simplificado e focado no projeto

---

## 📊 Configuração Final

### **Porta da Aplicação**
```
Next.js rodando na porta: 3008
Nginx fazendo proxy para: http://127.0.0.1:3008
```

### **PM2 Ecosystem**
```javascript
// ecosystem.config.cjs
PORT: 3008
instances: 1
exec_mode: 'cluster'
```

### **Nginx Vhost**
```nginx
location / {
  proxy_pass http://127.0.0.1:3008;
  // ... configurações de proxy
}

location /_next/static/ {
  proxy_pass http://127.0.0.1:3008;
  // Cache agressivo: 365 dias
}

location /_next/image {
  proxy_pass http://127.0.0.1:3008;
  // Cache: 7 dias
}
```

### **CORS Backend**
```env
FRONTEND_URL=...,https://novo.hajar.com.br
```

---

## 🚀 Comandos de Deploy

### **Deploy Automatizado**
```bash
cd /home/hajar-novo/htdocs/novo.hajar.com.br
git pull
./deploy.sh
```

### **Deploy Manual**
```bash
npm install
npm run build
pm2 restart hajar-front
```

### **Verificar Status**
```bash
pm2 status
pm2 logs hajar-front
netstat -tulpn | grep 3008
```

---

## 📚 Diferença: React vs Next.js

### **React (SPA)**
- Build gera pasta `/dist` com arquivos estáticos
- Nginx serve arquivos direto (root /dist)
- `try_files $uri /index.html`

### **Next.js (SSR)**
- Build gera pasta `/.next` (código Node.js)
- Aplicação roda no PM2 (porta 3008)
- Nginx faz proxy reverso
- **SEM** `root` ou `try_files`

---

## ⚠️ Lições Aprendidas

1. **No Next.js, NUNCA use `root` no nginx** - Tudo passa pelo proxy
2. **`params` no Next.js 15 é Promise** - Precisa de `await`
3. **ESLint do Vite não funciona com Next.js** - Usar `.eslintrc.json`
4. **`cache: 'no-store'` conflita com `revalidate`** - Remover
5. **`generateStaticParams()` pode travar o build** - Usar páginas dinâmicas
6. **`ecosystem.config.js` precisa ser `.cjs`** quando `package.json` tem `"type": "module"`

---

## ✅ Checklist de Deploy

- [x] Build local sem erros
- [x] Dependências instaladas no servidor
- [x] Build no servidor concluído
- [x] PM2 rodando e status "online"
- [x] Nginx configurado corretamente
- [x] CORS configurado no backend
- [x] Site acessível em https://novo.hajar.com.br/
- [x] Imóveis carregando da API
- [x] Documentação atualizada

---

## 🎯 Próximos Passos (Opcional)

- [ ] Configurar PM2 startup (reiniciar após reboot)
- [ ] Configurar monitoramento (ex: UptimeRobot)
- [ ] Configurar backups automáticos
- [ ] Otimizar imagens do hero
- [ ] Implementar analytics (Google Analytics)
- [ ] Implementar error tracking (Sentry)

---

**Deploy realizado com sucesso! 🎉**

