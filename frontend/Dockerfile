# --- ESTÁGIO 1: Build da Aplicação React ---
# Usamos uma imagem oficial do Node.js (versão 20, Alpine para ser mais leve)
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para o cache de dependências do Docker
COPY package*.json ./

# Instala as dependências. Usar 'npm ci' é melhor para builds de produção
# pois garante uma instalação limpa e exata baseada no package-lock.json
RUN npm ci

# Copia todo o resto do código-fonte da aplicação
COPY . .

# Roda o script de build para gerar os arquivos de produção
# O output geralmente vai para a pasta /app/build ou /app/dist
RUN npm run build

# --- ESTÁGIO 2: Servir a Aplicação com Nginx ---
# Usamos uma imagem super leve do Nginx
FROM nginx:stable-alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia nossa própria configuração do Nginx (que criaremos a seguir)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos gerados no Estágio 1 para a pasta que o Nginx serve
# ATENÇÃO: Se o seu projeto gera uma pasta 'dist' em vez de 'build', troque abaixo
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80, que é a porta padrão do Nginx
EXPOSE 80

# Comando para iniciar o Nginx em modo foreground
CMD ["nginx", "-g", "daemon off;"]