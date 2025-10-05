# Hackathon QI Tech - Plataforma de Empréstimos P2P

Este projeto foi desenvolvido durante o Hackathon QI Tech, construindo a base de uma plataforma de empréstimos Peer-to-Peer (P2P) inovadora. O objetivo é conectar investidores a tomadores de crédito de forma digital, eficiente e segura, democratizando o acesso ao crédito e oferecendo taxas mais atrativas através de um modelo de análise de risco diferenciado.

## 🚀 Funcionalidades Principais

* **Autenticação e Segurança Robustas:**
    * Registro e login de usuários (tomadores e investidores).
    * Autenticação em Múltiplos Fatores (MFA) simulada para maior segurança.
    * Geração e validação de JSON Web Tokens (JWT) para acesso seguro à API.
* **Gestão de Carteiras Digitais:**
    * Criação automática de carteiras para novos usuários.
    * Depósitos simulados via PIX para carregar o saldo das carteiras.
    * Solicitação e processamento de saques.
    * Consulta de saldo atual e histórico de transações (depósitos e saques).
* **Marketplace de Empréstimos P2P:**
    * Tomadores podem solicitar empréstimos, especificando valor, prazo e propósito.
    * Investidores podem visualizar um marketplace de empréstimos disponíveis (pendentes de financiamento).
    * Execução da transação P2P: Investidores financiam empréstimos, e o sistema transfere fundos diretamente entre as carteiras dos usuários.
* **Fluxo de Verificação de Identidade (KYC):**
    * Mecanismo seguro para upload de documentos (com Presigned URLs), integrando com um armazenamento S3-compatível.

## 🏗️ Arquitetura da Solução

A plataforma é construída sobre uma arquitetura modular e moderna, orquestrada via Docker Compose.

* **`frontend` (React + Nginx):** Interface do usuário construída com React e Tailwind CSS, servida por um servidor Nginx otimizado para Single-Page Applications (SPAs).
* **`core-api` (Spring Boot):** O microsserviço principal, responsável por toda a lógica de negócio, autenticação, gestão de usuários, carteiras e empréstimos. Expõe uma API RESTful.
* **`db` (PostgreSQL):** Banco de dados relacional para persistência de todos os dados da aplicação.
* **`minio` (S3-compatible Storage):** Um serviço de armazenamento de objetos compatível com a API S3 da AWS, utilizado para guardar documentos de KYC e outros arquivos.
* **`ml-api` (Flask/Python - *Planejado*):** Serviço futuro para análise de risco de crédito utilizando Machine Learning, que será integrado ao `core-api`.

## 🛠️ Tecnologias Utilizadas

* **Backend:** Java 17+, Spring Boot 3, Spring Security, Spring Data JPA, PostgreSQL, Lombok, Maven.
* **Frontend:** React 18, Tailwind CSS, Vite (Build Tool), JavaScript.
* **Containerização:** Docker, Docker Compose.
* **Outros:** MinIO (S3-compatible Storage), JWT (JSON Web Tokens), Swagger/OpenAPI.

## 🚀 Como Rodar o Projeto

### Pré-requisitos

Certifique-se de ter o **Docker** e o **Docker Compose** instalados em sua máquina.

### Configuração do Ambiente

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/Raposito09/Hackathon-QI-Tech.git](https://github.com/Raposito09/Hackathon-QI-Tech.git)
    cd Hackathon-QI-Tech
    ```
2.  **Variáveis de Ambiente:**
    cd frontend e npm install

### Inicialização dos Serviços

No diretório raiz do projeto, execute:

```bash
docker-compose up --build
```

Este comando irá:
1.  Construir as imagens Docker do `frontend` e `core-api`.
2.  Baixar as imagens do `db` (PostgreSQL) e `minio`.
3.  Iniciar todos os serviços.

Aguarde alguns minutos até que todos os serviços estejam em execução.

### Acessando a Aplicação

* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **Swagger UI (Documentação da API):** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
* **MinIO Console (Storage):** [http://localhost:9001](http://localhost:9001) (Credenciais: `minioadmin` / `minioadmin`)

## 💡 Próximos Passos (Roadmap)

-   [ ] **Implementação Real de MFA:** Substituir o mock por uma solução de MFA real (e.g., TOTP, SMS).
-   [ ] **Serviço de Análise de Crédito (`ml-api`):** Desenvolver o microsserviço Python para análise de risco de crédito e integrá-lo ao `core-api`.
-   [ ] **Testes Aprofundados:** Expandir a cobertura de testes unitários e de integração.
-   [ ] **Melhoria na Análise de Risco:** Integrar dados de Open Finance e fontes alternativas para um score de crédito mais preciso.
-   [ ] **Processamento de Pagamentos:** Integração real com gateways de pagamento PIX para depósitos e saques.
-   [ ] **Gestão de Prazos e Juros:** Implementar cálculos de amortização, parcelamento e pagamento de juros para investidores.
-   [ ] **Dashboard do Usuário:** Desenvolver interfaces mais ricas para investidores (acompanhar investimentos) e tomadores (acompanhar pagamentos).

## 🤝 Contribuições

Este projeto foi desenvolvido como parte de um hackathon, mas contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.