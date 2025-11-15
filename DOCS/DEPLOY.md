# 🚀 Guia de Deploy - Hajar Imóveis

## 📋 Pré-requisitos no Servidor

```bash
# Conectar ao servidor via SSH
ssh hajar-novo@seu-servidor-ip

# Verificar se Node.js está instalado (precisa ser v18+)
node -v

# Verificar se PM2 está instalado
pm2 -v

# Se PM2 não estiver instalado:
npm install -g pm2
```

## 1️⃣ Primeira Vez - Clonar o Repositório

```bash
# Navegar para o diretório do site
cd /home/hajar-novo/htdocs/

# Se já existir o diretório, remova ou faça backup
# rm -rf novo.hajar.com.br

# Clonar o repositório (ajuste a URL do seu repositório)
git clone SEU_REPOSITORIO_GIT novo.hajar.com.br

# Entrar no diretório
cd novo.hajar.com.br
```

## 2️⃣ Instalar Dependências e Fazer Build

```bash
# Instalar dependências
npm install

# Fazer o build de produção
npm run build

# Criar diretório de logs se não existir
mkdir -p /home/hajar-novo/logs
```

## 3️⃣ Configurar Nginx

Edite o Vhost no CloudPanel com esta configuração:

```nginx
server {
  listen 80;
  listen [::]:80;
  listen 443 quic;
  listen 443 ssl;
  listen [::]:443 quic;
  listen [::]:443 ssl;
  http2 on;
  http3 off;
  {{ssl_certificate_key}}
  {{ssl_certificate}}
  server_name novo.hajar.com.br;

  {{nginx_access_log}}
  {{nginx_error_log}}

  # Redirecionar HTTP para HTTPS
  if ($scheme != "https") {
    rewrite ^ https://$host$request_uri permanent;
  }

  # Let's Encrypt
  location ~ /.well-known {
    auth_basic off;
    allow all;
  }

  {{settings}}

  # ==========================================
  # PROXY REVERSO PARA NEXT.JS
  # ==========================================
  location / {
    proxy_pass http://127.0.0.1:3005;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    proxy_read_timeout 60s;
    proxy_connect_timeout 60s;
  }

  # Cache para arquivos estáticos do Next.js
  location /_next/static {
    proxy_pass http://127.0.0.1:3005;
    proxy_cache_valid 200 365d;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }

  # Imagens otimizadas pelo Next.js
  location /_next/image {
    proxy_pass http://127.0.0.1:3005;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  # Arquivos públicos
  location ~* ^.+\.(ico|jpg|jpeg|gif|png|svg|webp)$ {
    proxy_pass http://127.0.0.1:3005;
    expires 30d;
    add_header Cache-Control "public, no-transform";
  }
}
```

Depois de salvar a configuração no CloudPanel, recarregue o nginx:

```bash
sudo nginx -t  # Testar configuração
sudo systemctl reload nginx
```

## 4️⃣ Iniciar a Aplicação com PM2

```bash
# Navegar para o diretório do projeto
cd /home/hajar-novo/htdocs/novo.hajar.com.br

# Iniciar a aplicação com PM2
pm2 start ecosystem.config.js

# Verificar status
pm2 status

# Ver logs em tempo real
pm2 logs hajar-front

# Salvar configuração do PM2 para reiniciar automaticamente
pm2 save
pm2 startup
```

## 5️⃣ Atualizar Backend (CORS)

No backend em `https://admin.hajar.com.br`, adicione ao `.env`:

```env
FRONTEND_URL=http://localhost:8080,http://localhost:3000,http://localhost:3004,http://localhost:3005,https://hajar.ecwd.cloud,https://admin.hajar.com.br,https://novo.hajar.com.br
```

Depois reinicie o backend:
```bash
pm2 restart nome-do-backend
```

## 🔄 Atualizações Futuras

Para atualizar o site no futuro:

```bash
# Conectar ao servidor
ssh hajar-novo@seu-servidor-ip

# Navegar para o diretório
cd /home/hajar-novo/htdocs/novo.hajar.com.br

# Puxar últimas alterações
git pull

# Instalar dependências (se houver novas)
npm install

# Fazer novo build
npm run build

# Reiniciar aplicação
pm2 restart hajar-front

# Ver logs
pm2 logs hajar-front
```

## 🔍 Comandos Úteis do PM2

```bash
# Ver status de todas as aplicações
pm2 status

# Ver logs em tempo real
pm2 logs hajar-front

# Parar aplicação
pm2 stop hajar-front

# Reiniciar aplicação
pm2 restart hajar-front

# Remover aplicação do PM2
pm2 delete hajar-front

# Monitorar recursos
pm2 monit
```

## ✅ Verificar Deploy

Acesse: https://novo.hajar.com.br/

Se tudo estiver correto, você verá o site funcionando!

## 🐛 Troubleshooting

### Site não carrega:
```bash
# Verificar se Next.js está rodando
pm2 status
pm2 logs hajar-front

# Verificar se a porta 3005 está em uso
netstat -tulpn | grep 3005

# Reiniciar tudo
pm2 restart hajar-front
```

### Erro 502 Bad Gateway:
- Verifique se o PM2 está rodando: `pm2 status`
- Verifique os logs: `pm2 logs hajar-front`
- Verifique a configuração do nginx: `sudo nginx -t`

### Erro de CORS:
- Certifique-se que `https://novo.hajar.com.br` está no `FRONTEND_URL` do backend
- Reinicie o backend após adicionar: `pm2 restart nome-do-backend`

---

## 📞 Suporte

Se encontrar problemas, verifique:
1. Logs do PM2: `pm2 logs hajar-front`
2. Logs do Nginx: `/var/log/nginx/error.log`
3. Status do servidor: `pm2 status` e `systemctl status nginx`

