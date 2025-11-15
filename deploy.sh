#!/bin/bash

# 🚀 Script de Deploy Automatizado - Hajar Imóveis
# Execute este script no servidor após fazer git pull

set -e  # Parar em caso de erro

echo "🚀 Iniciando deploy do Hajar Imóveis..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: package.json não encontrado. Execute este script no diretório raiz do projeto.${NC}"
    exit 1
fi

# 1. Instalar dependências
echo -e "${YELLOW}📦 Instalando dependências...${NC}"
npm install

# 2. Fazer build
echo -e "${YELLOW}🔨 Fazendo build de produção...${NC}"
npm run build

# 3. Criar diretório de logs se não existir
echo -e "${YELLOW}📁 Criando diretório de logs...${NC}"
mkdir -p ~/logs

# 4. Verificar se PM2 está instalado
if ! command -v pm2 &> /dev/null; then
    echo -e "${RED}❌ PM2 não está instalado. Instalando...${NC}"
    npm install -g pm2
fi

# 5. Parar aplicação antiga (se existir)
echo -e "${YELLOW}🛑 Parando aplicação antiga (se existir)...${NC}"
pm2 stop hajar-front 2>/dev/null || true

# 6. Iniciar/Reiniciar aplicação
echo -e "${YELLOW}🚀 Iniciando aplicação...${NC}"
if pm2 describe hajar-front &> /dev/null; then
    pm2 restart hajar-front
else
    pm2 start ecosystem.config.cjs
fi

# 7. Salvar configuração do PM2
pm2 save

# 8. Mostrar status
echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
echo ""
pm2 status

echo ""
echo -e "${GREEN}🌐 Site disponível em: https://novo.hajar.com.br/${NC}"
echo -e "${YELLOW}📊 Para ver logs: pm2 logs hajar-front${NC}"

