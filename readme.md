# CepsearchApp

Este é um projeto desenvolvido com **Spring Boot** no backend e **React com Vite** no frontend. O objetivo é permitir que usuários consultem endereços a partir de um CEP via API ViaCEP, preencham seus dados e gerenciem essas informações com persistência em banco de dados SQL.


## ✨ Funcionalidades

- Buscar endereço automaticamente da APÌ viaCEP.
- Preenchimento e validação de dados pessoais (Nome e CPF).
- Persistência de dados em um banco SQL.
- Listar, editar e excluir registros.
- Interface responsiva.
- Comunicação entre frontend e backend via API REST.
---
## 🧾 Tecnologias Utilizadas

### Frontend

- **React + Vite**
- **TypeScript**
- **Axios**
- **React Query**
- **ShadCN UI**
- **CSS Responsivo com Tailwind**

### Backend

- **Java 17+**
- **Spring Boot**
- **Spring Data JPA**
- **API REST**
- **Integração com API ViaCEP utilizando RestTemplate**
- **Banco de dados MySQL**
- **Docker** (para contêineres)
---

## Instalação do projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/w-felipe360/CepSearch-App.git
   
2. **Navegue até o diretório do projeto:**
    ```bash
    cd CepSearch-App
3. **Inicie os contêineres:**
    ```bash
    docker compose up
> Por padrão, o front-end será executado na porta `80` e o back-end na porta `8080`.

# Screenshots:

#### Tela principal:

<img src="https://raw.githubusercontent.com/w-felipe360/images/refs/heads/main/homecep.png" alt="Tela principal" width="600">

#### Adicionar usuário:

<img src="https://raw.githubusercontent.com/w-felipe360/images/refs/heads/main/createcep.png" alt="Tela para adicionar usuários" width="600">

#### Edição de usuário:

<img src="https://raw.githubusercontent.com/w-felipe360/images/refs/heads/main/editcep.png" alt="Tela para editar usuários" width="600">

#### Tela principal (MOBILE):

<img src="https://raw.githubusercontent.com/w-felipe360/images/refs/heads/main/homecepmobile.png" alt="Tela principal na versão móvel">

### Rotas do back-end

> Você pode tentar acessar as rotas através de uma aplicação de requisição, utilizando as rotas /user e /cep com o Insomnia, por exemplo.

<img src="https://raw.githubusercontent.com/w-felipe360/images/00b8812ac03a0d9890301779621c597fbc07066c/insomniaCEP.png" alt="Rotas do back-end" width="600">
