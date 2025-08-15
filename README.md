# Gerenciador de Tarefas

## 📄 Sobre o Projeto

Este é um projeto de uma **Single Page Application (SPA)** construída com **React** para exibir e gerenciar uma lista de tarefas. A aplicação foi projetada para ser interativa, responsiva e com uma excelente experiência de usuário, utilizando ferramentas modernas do ecossistema JavaScript.

O projeto inclui funcionalidades completas de CRUD, uma lista com ordenação customizável, filtros dinâmicos e paginação.

---

## ✨ Funcionalidades

-   **CRUD:** Adição, visualização de detalhes, edição e exclusão de tarefas.
-   **Drag and Drop:** Reordene as tarefas arrastando-as com o mouse. A nova ordem é salva automaticamente.
-   **Lista Interativa:** A funcionalidade de arrastar é ativada ao "segurar" o item, permitindo cliques normais para navegação.
-   **Filtros Dinâmicos:** Filtro por status da tarefa (Concluída, Em Andamento, etc.) e campo de busca por título.
-   **Paginação:** Controle de itens exibidos por página e botões de navegação.
-   **Selo "Novo":** Feedback visual para tarefas recém-criadas, que aparecem com um selo indicativo.
-   **Roteamento:** Navegação entre a lista principal e as telas de detalhes e "Página Não Encontrada" com **React Router**.
-   **Design:** Interface construída com **Styled Components** e layout responsivo.
-   **Testes Unitários:** Cobertura de testes para componentes críticos utilizando **Jest** e **React Testing Library**.

---

## 🚀 Tecnologias Utilizadas

-   **React:** Biblioteca principal para a construção da interface.
-   **Zustand:** Gerenciador de estado global.
-   **Styled Components:** Para estilização de componentes de forma isolada e dinâmica.
-   **React Router:** Para o gerenciamento das rotas da aplicação.
-   **React Icons:** Para a utilização de ícones vetoriais.
-   **Framer Motion:** Para animações fluidas na interface.
-   **Axios:** Para realizar as chamadas à API.
-   **JSON Server:** Para simular uma API RESTful de forma rápida.
-   **Jest** & **React Testing Library:** Para a escrita e execução dos testes unitários.

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar o projeto em seu ambiente local.

### **Pré-requisitos**

-   **Node.js** (versão 16 ou superior)
-   **npm** (ou **yarn**)

### **Instalação**

1.  **Clone o repositório:**
    ```bash
    git clone git@github.com:drypzz/task-manager.git
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd task-manager
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

### **Execução**

Para rodar a aplicação, você precisará de **dois terminais abertos** na pasta do projeto.

1.  **Terminal 1: JSON Server**

    Este comando irá iniciar um servidor fake na porta `3001`.
    ```bash
    npm run api
    ```

2.  **Terminal 2: Aplicação**

    Este comando iniciará o servidor de desenvolvimento na porta `3000`.
    ```bash
    npm start
    ```

Agora a aplicação estará rodando e se comunicando com a API mock.

---

## 🧪 Rodando os Testes

Para executar os testes unitários do projeto, utilize o comando:

```bash
npm test
```

---

## 📂 Estrutura de Pastas

A estrutura de pastas do projeto foi organizada para promover a separação de responsabilidades e a escalabilidade:

```
/src
|-- /api           # Mock da API com JSON Server
|-- /components    # Componentes reutilizáveis
|-- /hooks         # Hooks customizados com a lógica de negócio
|-- /pages         # Componentes que representam as páginas
|-- /store         # Configuração do estado global (Zustand)
|-- /tests         # Arquivos de teste
|-- /theme         # Definição do tema (cores, fontes, etc.)
|-- App.jsx        # Componente principal
|-- globalStyles.js # Estilos globais da aplicação
|-- index.js       # Ponto de entrada da aplicação
|-- router.js      # Componente de rotas da aplicação
```

---

## ✍️ Autor

**Gustavo** ([drypzz](https://github.com/drypzz))
