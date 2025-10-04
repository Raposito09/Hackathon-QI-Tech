# ESTÁGIO 1: Build da Aplicação com Maven e JDK
# Usamos uma imagem que já contém o Maven e o OpenJDK 17.
FROM maven:3.8.5-openjdk-17 AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# 1. Otimização de Cache: Copia primeiro o pom.xml para baixar as dependências.
# O Docker só re-executará este passo se o pom.xml mudar.
COPY pom.xml .
RUN mvn dependency:go-offline

# 2. Copia o restante do código-fonte da sua aplicação.
COPY src ./src

# 3. Compila a aplicação e gera o .jar. `-DskipTests` acelera o build no Docker.
RUN mvn package -DskipTests

# ---

# ESTÁGIO 2: Imagem Final de Execução
# Usamos uma imagem JRE com amplo suporte de plataforma (amd64 e arm64)
FROM eclipse-temurin:17-jre

# Define o diretório de trabalho
WORKDIR /app

# Boa prática de segurança: criar um usuário específico para rodar a aplicação
# Sintaxe para sistemas baseados em Debian (como a imagem eclipse-temurin:17-jre)
RUN addgroup --system spring && adduser --system --ingroup spring spring
USER spring:spring

# Copia o arquivo .jar gerado no estágio 'build' para a imagem final
COPY --from=build /app/target/*.jar app.jar
COPY .env .

# Expõe a porta 8080, que o Spring Boot usa por padrão
EXPOSE 8080

# Comando para iniciar a aplicação quando o container for executado
ENTRYPOINT ["java", "-jar", "app.jar"]